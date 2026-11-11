
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export default function BodyEvolutionChart({
    title,
    data,
    dataKey,
    color = '#10b981',
    unit
}) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

            <h3 className="mb-1 text-base font-semibold text-white">
                {title}
            </h3>

            <p className="mb-5 text-xs text-slate-400">
                Histórico de evolução
            </p>

            <div className="h-64 w-full">

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>

                        <CartesianGrid
                            stroke="#334155"
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            stroke="#94a3b8"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                        />

                        <YAxis
                            stroke="#94a3b8"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                            domain={['auto', 'auto']}
                            width={45}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '12px',
                                color: '#fff'
                            }}
                            formatter={(value) => [
                                `${value} ${unit}`,
                                title
                            ]}
                        />

                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={color}
                            strokeWidth={3}
                            dot={{
                                fill: color,
                                strokeWidth: 2,
                                r: 4
                            }}
                            activeDot={{ r: 7 }}
                        />

                    </LineChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
}
