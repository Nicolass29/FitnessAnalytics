import {
    Weight,
    Percent,
    Dumbbell,
    Ruler,
    TrendingDown,
    TrendingUp
} from 'lucide-react';

// Cores dos ícones (classes completas para o Tailwind reconhecer)
const colorStyles = {
    emerald: {
        tile: 'bg-emerald-500/10',
        icon: 'text-emerald-400'
    },
    amber: {
        tile: 'bg-amber-500/10',
        icon: 'text-amber-400'
    },
    sky: {
        tile: 'bg-sky-500/10',
        icon: 'text-sky-400'
    },
    violet: {
        tile: 'bg-violet-500/10',
        icon: 'text-violet-400'
    }
};

// trend: direção da variação ('up' | 'down')
// favorable: se a variação é boa para o objetivo (verde) ou não (âmbar)
const metrics = [
    {
        title: 'Peso atual',
        value: '96',
        unit: 'kg',
        variation: '1 kg',
        description: 'em relação ao mês anterior',
        icon: Weight,
        color: 'emerald',
        trend: 'down',
        favorable: true
    },
    {
        title: 'Gordura corporal',
        value: '22,5',
        unit: '%',
        variation: '0,5%',
        description: 'em relação ao mês anterior',
        icon: Percent,
        color: 'amber',
        trend: 'down',
        favorable: true
    },
    {
        title: 'Massa muscular',
        value: '39,2',
        unit: 'kg',
        variation: '0,4 kg',
        description: 'em relação ao mês anterior',
        icon: Dumbbell,
        color: 'sky',
        trend: 'up',
        favorable: true
    },
    {
        title: 'Circunferência da cintura',
        value: '89',
        unit: 'cm',
        variation: '1 cm',
        description: 'em relação ao mês anterior',
        icon: Ruler,
        color: 'violet',
        trend: 'down',
        favorable: true
    }
];

export default function CurrentMetrics() {
    return (
        <section>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric) => {
                    const Icon = metric.icon;
                    const styles = colorStyles[metric.color];
                    const TrendIcon = metric.trend === 'down' ? TrendingDown : TrendingUp;

                    return (
                        <div
                            key={metric.title}
                            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-400">
                                    {metric.title}
                                </p>

                                <div className={`rounded-xl p-2 ${styles.tile}`}>
                                    <Icon size={20} className={styles.icon} />
                                </div>
                            </div>

                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-white">
                                    {metric.value}
                                </span>

                                <span className="text-sm text-slate-400">
                                    {metric.unit}
                                </span>
                            </div>

                            <div className="mt-3 flex items-center gap-1.5 text-xs">
                                <span
                                    className={`inline-flex items-center gap-1 font-medium ${metric.favorable ? 'text-emerald-400' : 'text-amber-400'
                                        }`}
                                >
                                    <TrendIcon size={14} />
                                    {metric.variation}
                                </span>

                                <span className="text-slate-400">
                                    {metric.description}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}