
import { CalendarDays, CheckCircle2, TrendingUp, Utensils } from 'lucide-react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

// Dados fictícios de adesão semanal
const weeklyData = [
    { day: 'Seg', planned: 5, completed: 4 },
    { day: 'Ter', planned: 5, completed: 5 },
    { day: 'Qua', planned: 5, completed: 4 },
    { day: 'Qui', planned: 5, completed: 5 },
    { day: 'Sex', planned: 5, completed: 3 },
    { day: 'Sáb', planned: 5, completed: 5 },
    { day: 'Dom', planned: 5, completed: 4 },
];

export default function DietAdherence() {
    // Calcula os indicadores com base nos dados fictícios
    const totalPlanned = weeklyData.reduce(
        (total, day) => total + day.planned,
        0
    );

    const totalCompleted = weeklyData.reduce(
        (total, day) => total + day.completed,
        0
    );

    const adherence = Math.round(
        (totalCompleted / totalPlanned) * 100
    );

    const totalPending = totalPlanned - totalCompleted;

    return (
        <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-5">

            {/* Cabeçalho */}
            <div className="mb-6">
                <div className="flex items-center gap-2">
                    <TrendingUp size={21} className="text-emerald-400" />

                    <h2 className="text-xl font-bold text-white">
                        Adesão à dieta
                    </h2>
                </div>

                <p className="mt-1 text-sm text-slate-400">
                    Acompanhe a frequência com que você está seguindo sua dieta.
                </p>
            </div>

            {/* Indicadores */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                {/* Percentual */}
                <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400">
                            Adesão semanal
                        </p>

                        <TrendingUp size={18} className="text-emerald-400" />
                    </div>

                    <p className="mt-3 text-3xl font-bold text-emerald-400">
                        {adherence}%
                    </p>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">
                        <div
                            className="h-full rounded-full bg-emerald-500 transition-all"
                            style={{ width: `${adherence}%` }}
                        />
                    </div>
                </div>

                {/* Concluídas */}
                <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400">
                            Refeições realizadas
                        </p>

                        <CheckCircle2 size={18} className="text-emerald-400" />
                    </div>

                    <p className="mt-3 text-3xl font-bold text-white">
                        {totalCompleted}
                        <span className="ml-1 text-base font-normal text-slate-500">
                            / {totalPlanned}
                        </span>
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                        Refeições concluídas na semana
                    </p>
                </div>

                {/* Pendentes */}
                <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400">
                            Não concluídas
                        </p>

                        <Utensils size={18} className="text-amber-400" />
                    </div>

                    <p className="mt-3 text-3xl font-bold text-white">
                        {totalPending}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                        Refeições sem registro de conclusão
                    </p>
                </div>

            </div>

            {/* Gráfico */}
            <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">

                <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                        <h3 className="font-semibold text-white">
                            Frequência semanal
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                            Refeições planejadas x concluídas
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-sm bg-slate-500" />
                            <span className="text-slate-400">Planejadas</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
                            <span className="text-slate-400">Concluídas</span>
                        </div>
                    </div>
                </div>

                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={weeklyData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            barGap={8}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#334155"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="day"
                                stroke="#64748b"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 12 }}
                            />

                            <YAxis
                                stroke="#64748b"
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                                tick={{ fontSize: 12 }}
                            />

                            <Tooltip
                                cursor={{ fill: '#334155', opacity: 0.2 }}
                                contentStyle={{
                                    backgroundColor: '#0f172a',
                                    border: '1px solid #334155',
                                    borderRadius: '8px',
                                    color: '#fff',
                                }}
                                labelStyle={{ color: '#cbd5e1' }}
                            />

                            <Bar
                                dataKey="planned"
                                name="Planejadas"
                                fill="#64748b"
                                radius={[4, 4, 0, 0]}
                            />

                            <Bar
                                dataKey="completed"
                                name="Concluídas"
                                fill="#10b981"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>

            {/* Período */}
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <CalendarDays size={15} />
                <span>Período demonstrativo: últimos 7 dias</span>
            </div>

        </section>
    );
}
