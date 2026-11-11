
import { useState } from 'react';
import { Send, CheckCircle2, Utensils, Clock } from 'lucide-react';

// Dados fictícios da dieta atual
const initialMeals = [
    {
        id: 1,
        name: 'Café da manhã',
        time: '07:00',
        foods: [
            '3 ovos mexidos',
            '2 fatias de pão integral',
            '1 banana',
            '200ml de leite'
        ]
    },
    {
        id: 2,
        name: 'Lanche da manhã',
        time: '10:00',
        foods: [
            '1 iogurte natural',
            '30g de castanhas'
        ]
    },
    {
        id: 3,
        name: 'Almoço',
        time: '12:30',
        foods: [
            '150g de frango grelhado',
            '150g de arroz',
            '100g de feijão',
            'Salada à vontade'
        ]
    },
    {
        id: 4,
        name: 'Lanche da tarde',
        time: '16:00',
        foods: [
            '30g de whey protein',
            '1 banana',
            '40g de aveia'
        ]
    },
    {
        id: 5,
        name: 'Jantar',
        time: '20:00',
        foods: [
            '150g de carne magra',
            '200g de batata-doce',
            'Legumes'
        ]
    }
];

export default function CurrentDiet() {
    const [meals] = useState(initialMeals);

    // Refeições selecionadas pelo usuário
    const [selectedMeals, setSelectedMeals] = useState([]);

    // Refeições já enviadas
    const [completedMeals, setCompletedMeals] = useState([]);

    const [message, setMessage] = useState('');

    // Seleciona ou desmarca uma refeição
    function handleSelectMeal(mealId) {
        setSelectedMeals((current) =>
            current.includes(mealId)
                ? current.filter((id) => id !== mealId)
                : [...current, mealId]
        );

        setMessage('');
    }

    // Simula o envio da refeição
    function handleSendMeal(mealId) {
        if (!selectedMeals.includes(mealId)) {
            return;
        }

        setCompletedMeals((current) => [...current, mealId]);

        setSelectedMeals((current) =>
            current.filter((id) => id !== mealId)
        );

        setMessage('Refeição registrada com sucesso!');
    }

    const completedCount = completedMeals.length;

    return (
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            {/* Cabeçalho */}
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                <div>
                    <div className="flex items-center gap-2">
                        <Utensils size={20} className="text-emerald-400" />

                        <h2 className="text-xl font-bold text-white">
                            Dieta atual
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-slate-400">
                        Acompanhe suas refeições diárias.
                    </p>
                </div>

                <span className="w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                    Dieta ativa
                </span>

            </div>

            {/* Informações da dieta */}
            <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

                <div className="rounded-lg bg-slate-800/70 p-3">
                    <p className="text-xs text-slate-400">Objetivo</p>
                    <p className="mt-1 font-medium text-white">
                        Hipertrofia
                    </p>
                </div>

                <div className="rounded-lg bg-slate-800/70 p-3">
                    <p className="text-xs text-slate-400">Calorias diárias</p>
                    <p className="mt-1 font-medium text-white">
                        2.800 kcal
                    </p>
                </div>

                <div className="rounded-lg bg-slate-800/70 p-3">
                    <p className="text-xs text-slate-400">Refeições concluídas</p>
                    <p className="mt-1 font-medium text-white">
                        {completedCount} de {meals.length}
                    </p>
                </div>

            </div>

            {/* Tabela de refeições */}
            <div className="overflow-x-auto">

                <table className="w-full min-w-[700px] text-left">

                    <thead>
                        <tr className="border-b border-slate-800 text-xs uppercase text-slate-500">
                            <th className="px-4 py-3 font-medium">
                                Refeição
                            </th>

                            <th className="px-4 py-3 font-medium">
                                Alimentos
                            </th>

                            <th className="px-4 py-3 text-center font-medium">
                                Status
                            </th>

                            <th className="px-4 py-3 text-center font-medium">
                                Concluir
                            </th>

                            <th className="px-4 py-3 text-center font-medium">
                                Enviar
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {meals.map((meal) => {
                            const isSelected = selectedMeals.includes(meal.id);
                            const isCompleted = completedMeals.includes(meal.id);

                            return (
                                <tr
                                    key={meal.id}
                                    className="border-b border-slate-800/70 transition-colors hover:bg-slate-800/30"
                                >

                                    {/* Refeição e horário */}
                                    <td className="px-4 py-4">
                                        <p className="font-medium text-white">
                                            {meal.name}
                                        </p>

                                        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                            <Clock size={13} />
                                            {meal.time}
                                        </div>
                                    </td>

                                    {/* Alimentos */}
                                    <td className="px-4 py-4">
                                        <div className="space-y-1">
                                            {meal.foods.map((food, index) => (
                                                <p
                                                    key={index}
                                                    className="text-sm text-slate-400"
                                                >
                                                    {food}
                                                </p>
                                            ))}
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-4 text-center">
                                        {isCompleted ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                                                <CheckCircle2 size={13} />
                                                Concluída
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                                                Pendente
                                            </span>
                                        )}
                                    </td>

                                    {/* Checkbox */}
                                    <td className="px-4 py-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={isSelected || isCompleted}
                                            disabled={isCompleted}
                                            onChange={() => handleSelectMeal(meal.id)}
                                            className="h-4 w-4 cursor-pointer accent-emerald-500 disabled:cursor-not-allowed"
                                        />
                                    </td>

                                    {/* Enviar */}
                                    <td className="px-4 py-4 text-center">
                                        <button
                                            onClick={() => handleSendMeal(meal.id)}
                                            disabled={!isSelected || isCompleted}
                                            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
                                        >
                                            <Send size={13} />
                                            Enviar
                                        </button>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>

                </table>

            </div>

            {/* Mensagem de confirmação */}
            {message && (
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400">
                    <CheckCircle2 size={17} />
                    {message}
                </div>
            )}

            {/* Rodapé */}
            <div className="mt-4 border-t border-slate-800 pt-4">
                <p className="text-xs text-slate-500">
                    Selecione uma refeição e clique em enviar para registrar
                    sua conclusão.
                </p>
            </div>

        </section>
    );
}
