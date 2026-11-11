
import { useState } from 'react';
import BodyEvolutionChart from './BodyEvolutionChart';

const evolutionData = {
    weight: [
        { month: 'Dez/25', value: 101 },
        { month: 'Jan/26', value: 100 },
        { month: 'Fev/26', value: 99 },
        { month: 'Mar/26', value: 98.5 },
        { month: 'Abr/26', value: 98 },
        { month: 'Mai/26', value: 97.5 },
        { month: 'Jun/26', value: 97 },
        { month: 'Jul/26', value: 96.8 },
        { month: 'Ago/26', value: 96.5 },
        { month: 'Set/26', value: 96.3 },
        { month: 'Out/26', value: 96.1 },
        { month: 'Nov/26', value: 96 }
    ],

    fat: [
        { month: 'Dez/25', value: 27 },
        { month: 'Jan/26', value: 26.5 },
        { month: 'Fev/26', value: 26 },
        { month: 'Mar/26', value: 25.5 },
        { month: 'Abr/26', value: 25 },
        { month: 'Mai/26', value: 24.5 },
        { month: 'Jun/26', value: 24 },
        { month: 'Jul/26', value: 23.8 },
        { month: 'Ago/26', value: 23.5 },
        { month: 'Set/26', value: 23 },
        { month: 'Out/26', value: 22.8 },
        { month: 'Nov/26', value: 22.5 }
    ],

    muscle: [
        { month: 'Dez/25', value: 35 },
        { month: 'Jan/26', value: 35.5 },
        { month: 'Fev/26', value: 36 },
        { month: 'Mar/26', value: 36.5 },
        { month: 'Abr/26', value: 37 },
        { month: 'Mai/26', value: 37.2 },
        { month: 'Jun/26', value: 37.5 },
        { month: 'Jul/26', value: 38 },
        { month: 'Ago/26', value: 38.3 },
        { month: 'Set/26', value: 38.5 },
        { month: 'Out/26', value: 39 },
        { month: 'Nov/26', value: 39.2 }
    ],

    measurements: [
        { month: 'Dez/25', value: 98 },
        { month: 'Jan/26', value: 97 },
        { month: 'Fev/26', value: 96 },
        { month: 'Mar/26', value: 95 },
        { month: 'Abr/26', value: 94 },
        { month: 'Mai/26', value: 93 },
        { month: 'Jun/26', value: 92 },
        { month: 'Jul/26', value: 91.5 },
        { month: 'Ago/26', value: 91 },
        { month: 'Set/26', value: 90.5 },
        { month: 'Out/26', value: 90 },
        { month: 'Nov/26', value: 89 }
    ]
};

const periods = {
    '3M': 3,
    '6M': 6,
    '1A': 12
};

export default function WeightChart() {
    const [selectedPeriod, setSelectedPeriod] = useState('6M');

    const monthsToShow = periods[selectedPeriod];

    const filterData = (data) => data.slice(-monthsToShow);

    return (
        <section>
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-xl font-bold text-white">
                        Evolução corporal
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        Compare seus indicadores ao longo do tempo.
                    </p>
                </div>

                <div className="flex w-fit rounded-lg border border-slate-700 bg-slate-900 p-1">
                    {Object.keys(periods).map((period) => (
                        <button
                            key={period}
                            onClick={() => setSelectedPeriod(period)}
                            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${selectedPeriod === period
                                    ? 'bg-emerald-500 text-white'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                <BodyEvolutionChart
                    title="Peso corporal"
                    data={filterData(evolutionData.weight)}
                    dataKey="value"
                    color="#10b981"
                    unit="kg"
                />

                <BodyEvolutionChart
                    title="Gordura corporal"
                    data={filterData(evolutionData.fat)}
                    dataKey="value"
                    color="#f59e0b"
                    unit="%"
                />

                <BodyEvolutionChart
                    title="Massa muscular"
                    data={filterData(evolutionData.muscle)}
                    dataKey="value"
                    color="#38bdf8"
                    unit="kg"
                />

                <BodyEvolutionChart
                    title="Circunferência da cintura"
                    data={filterData(evolutionData.measurements)}
                    dataKey="value"
                    color="#a78bfa"
                    unit="cm"
                />
            </div>
        </section>
    );
}
