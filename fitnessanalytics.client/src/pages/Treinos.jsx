import CurrentWorkout from '../components/treinos/CurrentWorkout';
import WorkoutAdherence from '../components/treinos/WorkoutAdherence';
import ImportTraining from '../components/treinos/ImportTraining';
export default function Treinos() {
    return (
        <div className="min-h-full bg-slate-950 p-8">

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">
                    Treino
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                    Acompanhe sua tabela de treino.
                </p>
            </div>

            <CurrentWorkout />
            <WorkoutAdherence />
            <ImportTraining />

         

        </div>
    );
}