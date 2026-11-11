import { useState } from 'react';
import {
    Dumbbell,
    CheckCircle2,
    Plus,
    Trash2,
    Timer,
    Weight,
    Send
} from 'lucide-react';

// Dados fictícios do plano de treino
const initialWorkouts = [
    {
        id: 'A',
        name: 'Treino A',
        focus: 'Peito e tríceps',
        exercises: [
            { id: 'a1', name: 'Supino reto', targetSets: 4, targetReps: '8-10', rest: '90s' },
            { id: 'a2', name: 'Supino inclinado com halteres', targetSets: 3, targetReps: '10-12', rest: '90s' },
            { id: 'a3', name: 'Crucifixo na máquina', targetSets: 3, targetReps: '12', rest: '60s' },
            { id: 'a4', name: 'Tríceps na polia', targetSets: 3, targetReps: '12', rest: '60s' }
        ]
    },
    {
        id: 'B',
        name: 'Treino B',
        focus: 'Costas e bíceps',
        exercises: [
            { id: 'b1', name: 'Puxada frontal', targetSets: 4, targetReps: '10', rest: '90s' },
            { id: 'b2', name: 'Remada curvada', targetSets: 4, targetReps: '8-10', rest: '90s' },
            { id: 'b3', name: 'Rosca direta', targetSets: 3, targetReps: '12', rest: '60s' }
        ]
    },
    {
        id: 'C',
        name: 'Treino C',
        focus: 'Pernas e ombros',
        exercises: [
            { id: 'c1', name: 'Agachamento livre', targetSets: 4, targetReps: '8', rest: '120s' },
            { id: 'c2', name: 'Leg press', targetSets: 3, targetReps: '10-12', rest: '90s' },
            { id: 'c3', name: 'Desenvolvimento com halteres', targetSets: 3, targetReps: '10', rest: '90s' },
            { id: 'c4', name: 'Elevação lateral', targetSets: 3, targetReps: '15', rest: '45s' }
        ]
    }
];

// Cria as séries iniciais de um exercício (vazias, prontas para preencher)
function createSets(count) {
    return Array.from({ length: count }, () => ({
        weight: '',
        reps: '',
        done: false
    }));
}

// Monta o estado inicial com todas as séries de todos os exercícios
function buildInitialLogs(workouts) {
    const logs = {};

    workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
            logs[exercise.id] = createSets(exercise.targetSets);
        });
    });

    return logs;
}

export default function CurrentWorkout() {
    const [workouts] = useState(initialWorkouts);
    const [activeWorkoutId, setActiveWorkoutId] = useState(initialWorkouts[0].id);

    // Registro de séries: { [exerciseId]: [{ weight, reps, done }] }
    const [logs, setLogs] = useState(() => buildInitialLogs(initialWorkouts));

    const [message, setMessage] = useState('');

    const activeWorkout = workouts.find((w) => w.id === activeWorkoutId);

    // Atualiza carga ou repetições de uma série
    function handleChangeSet(exerciseId, setIndex, field, value) {
        // Aceita apenas números (e vírgula/ponto para cargas fracionadas)
        if (!/^\d*[.,]?\d*$/.test(value)) {
            return;
        }

        setLogs((current) => ({
            ...current,
            [exerciseId]: current[exerciseId].map((set, index) =>
                index === setIndex ? { ...set, [field]: value } : set
            )
        }));

        setMessage('');
    }

    // Registra (ou desfaz) uma série
    function handleToggleSet(exerciseId, setIndex) {
        const set = logs[exerciseId][setIndex];

        // Só registra se tiver carga e repetições preenchidas
        if (!set.done && (!set.weight || !set.reps)) {
            setMessage('Preencha a carga e as repetições antes de registrar a série.');
            return;
        }

        setLogs((current) => ({
            ...current,
            [exerciseId]: current[exerciseId].map((s, index) =>
                index === setIndex ? { ...s, done: !s.done } : s
            )
        }));

        setMessage(set.done ? '' : `Série ${setIndex + 1} registrada!`);
    }

    // Adiciona uma série extra
    function handleAddSet(exerciseId) {
        setLogs((current) => ({
            ...current,
            [exerciseId]: [...current[exerciseId], { weight: '', reps: '', done: false }]
        }));
    }

    // Remove uma série (mantém pelo menos uma)
    function handleRemoveSet(exerciseId, setIndex) {
        setLogs((current) => {
            if (current[exerciseId].length <= 1) {
                return current;
            }

            return {
                ...current,
                [exerciseId]: current[exerciseId].filter((_, index) => index !== setIndex)
            };
        });
    }

    // Simula o envio do treino completo (aqui entra a chamada ao back depois)
    function handleFinishWorkout() {
        const payload = activeWorkout.exercises.map((exercise) => ({
            exerciseId: exercise.id,
            sets: logs[exercise.id]
                .filter((set) => set.done)
                .map((set, index) => ({
                    set: index + 1,
                    weight: Number(String(set.weight).replace(',', '.')),
                    reps: Number(set.reps)
                }))
        }));

        console.log('Treino finalizado:', { workoutId: activeWorkout.id, exercises: payload });

        setMessage('Treino registrado com sucesso!');
    }

    // Cálculos do resumo do treino ativo
    const activeSets = activeWorkout.exercises.flatMap((exercise) => logs[exercise.id]);
    const doneSets = activeSets.filter((set) => set.done);

    const totalVolume = doneSets.reduce((total, set) => {
        const weight = Number(String(set.weight).replace(',', '.'));
        return total + weight * Number(set.reps);
    }, 0);

    const completedExercises = activeWorkout.exercises.filter((exercise) =>
        logs[exercise.id].every((set) => set.done)
    ).length;

    return (
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            {/* Cabeçalho */}
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                <div>
                    <div className="flex items-center gap-2">
                        <Dumbbell size={20} className="text-emerald-400" />

                        <h2 className="text-xl font-bold text-white">
                            Treino atual
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-slate-400">
                        Registre a carga de cada série.
                    </p>
                </div>

                <span className="w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                    Treino ativo
                </span>

            </div>

            {/* Seleção do treino (A, B, C...) */}
            <div className="mb-5 flex flex-wrap gap-2">
                {workouts.map((workout) => {
                    const isActive = workout.id === activeWorkoutId;

                    return (
                        <button
                            key={workout.id}
                            onClick={() => {
                                setActiveWorkoutId(workout.id);
                                setMessage('');
                            }}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                                }`}
                        >
                            {workout.name}
                        </button>
                    );
                })}
            </div>

            {/* Informações do treino */}
            <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-4">

                <div className="rounded-lg bg-slate-800/70 p-3">
                    <p className="text-xs text-slate-400">Foco</p>
                    <p className="mt-1 font-medium text-white">
                        {activeWorkout.focus}
                    </p>
                </div>

                <div className="rounded-lg bg-slate-800/70 p-3">
                    <p className="text-xs text-slate-400">Exercícios concluídos</p>
                    <p className="mt-1 font-medium text-white">
                        {completedExercises} de {activeWorkout.exercises.length}
                    </p>
                </div>

                <div className="rounded-lg bg-slate-800/70 p-3">
                    <p className="text-xs text-slate-400">Séries registradas</p>
                    <p className="mt-1 font-medium text-white">
                        {doneSets.length} de {activeSets.length}
                    </p>
                </div>

                <div className="rounded-lg bg-slate-800/70 p-3">
                    <p className="text-xs text-slate-400">Volume total</p>
                    <p className="mt-1 font-medium text-white">
                        {totalVolume.toLocaleString('pt-BR')} kg
                    </p>
                </div>

            </div>

            {/* Lista de exercícios */}
            <div className="space-y-4">
                {activeWorkout.exercises.map((exercise) => {
                    const sets = logs[exercise.id];
                    const isExerciseDone = sets.every((set) => set.done);

                    return (
                        <div
                            key={exercise.id}
                            className="rounded-lg border border-slate-800 bg-slate-900"
                        >

                            {/* Cabeçalho do exercício */}
                            <div className="flex flex-col justify-between gap-2 border-b border-slate-800 px-4 py-3 sm:flex-row sm:items-center">

                                <div>
                                    <p className="font-medium text-white">
                                        {exercise.name}
                                    </p>

                                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                                        <span>
                                            Meta: {exercise.targetSets} x {exercise.targetReps}
                                        </span>

                                        <span className="inline-flex items-center gap-1.5">
                                            <Timer size={13} />
                                            Descanso {exercise.rest}
                                        </span>
                                    </div>
                                </div>

                                {isExerciseDone ? (
                                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                                        <CheckCircle2 size={13} />
                                        Concluído
                                    </span>
                                ) : (
                                    <span className="w-fit rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                                        Em andamento
                                    </span>
                                )}

                            </div>

                            {/* Tabela de séries */}
                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[480px] text-left">

                                    <thead>
                                        <tr className="border-b border-slate-800 text-xs uppercase text-slate-500">
                                            <th className="px-4 py-3 font-medium">
                                                Série
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Carga (kg)
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Reps
                                            </th>

                                            <th className="px-4 py-3 text-center font-medium">
                                                Registrar
                                            </th>

                                            <th className="px-4 py-3 text-center font-medium">
                                                <span className="sr-only">Remover</span>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {sets.map((set, index) => (
                                            <tr
                                                key={index}
                                                className="border-b border-slate-800/70 last:border-b-0 transition-colors hover:bg-slate-800/30"
                                            >

                                                {/* Número da série */}
                                                <td className="px-4 py-3">
                                                    <span className="text-sm font-medium text-white">
                                                        Série {index + 1}
                                                    </span>
                                                </td>

                                                {/* Carga */}
                                                <td className="px-4 py-3">
                                                    <div className="relative w-28">
                                                        <Weight
                                                            size={14}
                                                            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500"
                                                        />

                                                        <input
                                                            type="text"
                                                            inputMode="decimal"
                                                            value={set.weight}
                                                            disabled={set.done}
                                                            placeholder="0"
                                                            aria-label={`Carga da série ${index + 1} de ${exercise.name}`}
                                                            onChange={(e) =>
                                                                handleChangeSet(exercise.id, index, 'weight', e.target.value)
                                                            }
                                                            className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-8 pr-2 text-sm text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-400"
                                                        />
                                                    </div>
                                                </td>

                                                {/* Repetições */}
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        value={set.reps}
                                                        disabled={set.done}
                                                        placeholder={exercise.targetReps}
                                                        aria-label={`Repetições da série ${index + 1} de ${exercise.name}`}
                                                        onChange={(e) =>
                                                            handleChangeSet(exercise.id, index, 'reps', e.target.value)
                                                        }
                                                        className="w-20 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-400"
                                                    />
                                                </td>

                                                {/* Registrar / desfazer */}
                                                <td className="px-4 py-3 text-center">
                                                    <button
                                                        onClick={() => handleToggleSet(exercise.id, index)}
                                                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${set.done
                                                                ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                                                                : 'bg-emerald-500 text-white hover:bg-emerald-600'
                                                            }`}
                                                    >
                                                        <CheckCircle2 size={13} />
                                                        {set.done ? 'Desfazer' : 'Registrar'}
                                                    </button>
                                                </td>

                                                {/* Remover série */}
                                                <td className="px-4 py-3 text-center">
                                                    <button
                                                        onClick={() => handleRemoveSet(exercise.id, index)}
                                                        disabled={sets.length <= 1}
                                                        aria-label={`Remover série ${index + 1}`}
                                                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-800 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>

                                </table>

                            </div>

                            {/* Adicionar série */}
                            <div className="border-t border-slate-800 px-4 py-3">
                                <button
                                    onClick={() => handleAddSet(exercise.id)}
                                    className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                                >
                                    <Plus size={13} />
                                    Adicionar série
                                </button>
                            </div>

                        </div>
                    );
                })}
            </div>

            {/* Mensagem de confirmação */}
            {message && (
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400">
                    <CheckCircle2 size={17} />
                    {message}
                </div>
            )}

            {/* Rodapé */}
            <div className="mt-4 flex flex-col justify-between gap-3 border-t border-slate-800 pt-4 sm:flex-row sm:items-center">
                <p className="text-xs text-slate-500">
                    Preencha carga e repetições, registre cada série e finalize o treino.
                </p>

                <button
                    onClick={handleFinishWorkout}
                    disabled={doneSets.length === 0}
                    className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
                >
                    <Send size={14} />
                    Finalizar treino
                </button>
            </div>

        </section>
    );
}