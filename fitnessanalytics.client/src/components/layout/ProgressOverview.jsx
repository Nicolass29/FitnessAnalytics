import { Scale, Flame, Beef, Dumbbell, TrendingDown, TrendingUp } from 'lucide-react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

// Dados fictícios de pesagens semanais
const weightHistory = [
    { date: '22/09', weight: 100.2 },
    { date: '29/09', weight: 99.4 },
    { date: '06/10', weight: 98.9 },
    { date: '13/10', weight: 98.1 },
    { date: '20/10', weight: 97.6 },
    { date: '27/10', weight: 97.0 },
    { date: '03/11', weight: 96.4 },
    { date: '10/11', weight: 96.0 },
];

// Tooltip do gráfico
function WeightTooltip({ active, payload, label }) {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    return (
        <div className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm">
            <p className="text-xs text-slate-400">{label}</p>
            <p className="mt-0.5 font-semibold text-white">
                {payload[0].value.toLocaleString('pt-BR')} kg
            </p>
        </div>
    );
}

export default function ProgressOverview() {
    // Indicadores calculados a partir do histórico de peso
    const firstWeight = weightHistory[0].weight;
    const currentWeight = weightHistory[weightHistory.length - 1].weight;
    const weightDiff = Number((currentWeight - firstWeight).toFixed(1));
    const isLoss = weightDiff < 0;

    const metrics = [
        {
            title: 'Peso atual',
            value: `${currentWeight.toLocaleString('pt-BR')} kg`,
            description: 'Último registro',
            icon: Scale,
        },
        {
            title: 'Calorias diárias',
            value: '2.600 kcal',
            description: 'Meta estimada',
            icon: Flame,
        },
        {
            title: 'Proteína',
            value: '180 g',
            description: 'Meta diária estimada',
            icon: Beef,
        },
        {
            title: 'Treinos',
            value: '0',
            description: 'Treinos registrados',
            icon: Dumbbell,
        },
    ];

    return (
        <div className="min-h-full space-y-6 bg-slate-950 p-8">

            {/* Título */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">
                    Resumo do seu progresso
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                    Seus principais indicadores em um só lugar.
                </p>
            </div>

            {/* Indicadores */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map(({ title, value, description, icon: Icon }) => (
                    <article
                        key={title}
                        className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400">{title}</p>

                            <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400">
                                <Icon size={20} />
                            </div>
                        </div>

                        <p className="mt-4 text-2xl font-bold text-white">
                            {value}
                        </p>

                        <p className="mt-2 text-xs text-slate-400">
                            {description}
                        </p>
                    </article>
                ))}
            </section>

            {/* Evolução do peso */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                        <h3 className="font-semibold text-white">
                            Evolução do peso
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                            Suas pesagens das últimas {weightHistory.length} semanas.
                        </p>
                    </div>

                    <span
                        className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${isLoss
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-amber-500/10 text-amber-400'
                            }`}
                    >
                        {isLoss ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                        {weightDiff > 0 ? '+' : ''}
                        {weightDiff.toLocaleString('pt-BR')} kg no período
                    </span>
                </div>

                <div className="mt-6 h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={weightHistory}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#334155"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="date"
                                stroke="#64748b"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 12 }}
                            />

                            <YAxis
                                stroke="#64748b"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 12 }}
                                domain={[
                                    (min) => Math.floor(min - 1),
                                    (max) => Math.ceil(max + 1),
                                ]}
                                tickFormatter={(value) => `${value}`}
                            />

                            <Tooltip
                                cursor={{ stroke: '#475569', strokeDasharray: '3 3' }}
                                content={<WeightTooltip />}
                            />

                            <Area
                                type="monotone"
                                dataKey="weight"
                                name="Peso"
                                stroke="#10b981"
                                strokeWidth={2.5}
                                fill="url(#weightGradient)"
                                dot={{ r: 4, fill: '#10b981', stroke: '#0f172a', strokeWidth: 2 }}
                                activeDot={{ r: 6, fill: '#10b981', stroke: '#0f172a', strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                    Dados demonstrativos. Os valores reais aparecerão conforme você registrar suas pesagens.
                </p>

            </section>
        </div>
    );
}