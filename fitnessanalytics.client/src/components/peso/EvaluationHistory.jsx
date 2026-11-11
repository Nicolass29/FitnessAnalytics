
import { useState } from 'react';
import { ChevronDown, ChevronUp, CalendarDays } from 'lucide-react';

const evaluations = [
    {
        id: 1,
        date: '11/11/2026',
        weight: '96',
        fat: '22,5',
        muscle: '39,2',
        waist: '89',
        imc: '27,4',
        basalMetabolism: '1950'
    },
    {
        id: 2,
        date: '11/10/2026',
        weight: '97',
        fat: '23',
        muscle: '38,8',
        waist: '90',
        imc: '27,7',
        basalMetabolism: '1940'
    },
    {
        id: 3,
        date: '11/09/2026',
        weight: '97,5',
        fat: '23,5',
        muscle: '38,3',
        waist: '91',
        imc: '27,9',
        basalMetabolism: '1930'
    }
];

export default function EvaluationHistory() {
    const [expandedId, setExpandedId] = useState(1);

    const handleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section className="mt-10">
            <div className="mb-5">
                <h2 className="text-xl font-bold text-white">
                    Histórico de avaliações
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                    Consulte os detalhes das suas avaliações anteriores.
                </p>
            </div>

            <div className="space-y-3">
                {evaluations.map((evaluation, index) => (
                    <div
                        key={evaluation.id}
                        className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900"
                    >
                        <button
                            onClick={() => handleExpand(evaluation.id)}
                            className="flex w-full items-center justify-between p-5 text-left hover:bg-slate-800/50 transition-colors"
                        >
                            <div>
                                <div className="flex items-center gap-2">
                                    <CalendarDays size={16} className="text-emerald-400" />

                                    <span className="font-semibold text-white">
                                        {evaluation.date}
                                    </span>

                                    {index === 0 && (
                                        <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400">
                                            Mais recente
                                        </span>
                                    )}
                                </div>

                                <p className="mt-2 text-sm text-slate-400">
                                    {evaluation.weight} kg · {evaluation.fat}% gordura · {evaluation.muscle} kg músculo
                                </p>
                            </div>

                            {expandedId === evaluation.id ? (
                                <ChevronUp className="text-slate-400" />
                            ) : (
                                <ChevronDown className="text-slate-400" />
                            )}
                        </button>

                        {expandedId === evaluation.id && (
                            <div className="grid grid-cols-2 gap-3 border-t border-slate-800 p-5 sm:grid-cols-3">
                                <MetricDetail label="Peso corporal" value={`${evaluation.weight} kg`} />
                                <MetricDetail label="Gordura corporal" value={`${evaluation.fat}%`} />
                                <MetricDetail label="Massa muscular" value={`${evaluation.muscle} kg`} />
                                <MetricDetail label="Cintura" value={`${evaluation.waist} cm`} />
                                <MetricDetail label="IMC" value={evaluation.imc} />
                                <MetricDetail label="Metabolismo basal" value={`${evaluation.basalMetabolism} kcal`} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

function MetricDetail({ label, value }) {
    return (
        <div className="rounded-lg bg-slate-800/60 p-3">
            <p className="text-xs text-slate-400">{label}</p>
            <p className="mt-1 font-semibold text-white">{value}</p>
        </div>
    );
}
