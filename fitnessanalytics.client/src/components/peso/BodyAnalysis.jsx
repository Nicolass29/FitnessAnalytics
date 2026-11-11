import {
    Activity,
    Scale,
    Percent,
    Dumbbell,
    Ruler,
    Flame,
    Info,
    TrendingUp,
    AlertTriangle,
    CheckCircle2,
} from 'lucide-react';

// Dados fictícios para a primeira versão visual
const bodyAnalysis = {
    profile: {
        age: 22,
        sex: 'Masculino',
        height: 1.87,
    },

    indicators: {
        bmi: {
            value: 27.5,
            classification: 'Sobrepeso',
            description:
                'Seu IMC está acima da faixa considerada adequada para adultos.',
            status: 'warning',
        },

        bodyFat: {
            value: 22.5,
            classification: 'Atenção',
            description:
                'O percentual de gordura deve ser interpretado considerando idade, sexo e método de avaliação.',
            status: 'warning',
        },

        muscle: {
            value: 39.2,
            classification: 'Massa muscular registrada',
            description:
                'Acompanhe a evolução da massa muscular nas próximas avaliações.',
            status: 'success',
        },

        waist: {
            value: 89,
            classification: 'Acompanhar',
            description:
                'A circunferência abdominal deve ser interpretada considerando referências específicas.',
            status: 'warning',
        },
    },

    basalMetabolism: 1950,
};

const statusStyles = {
    warning: {
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        icon: 'text-amber-400',
    },
    success: {
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        icon: 'text-emerald-400',
    },
};

function IndicatorCard({ title, value, unit, classification, description, icon: Icon, status }) {
    const styles = statusStyles[status];

    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                    <Icon size={20} className="text-slate-300" />
                </div>

                <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-medium ${styles.badge}`}
                >
                    {classification}
                </span>
            </div>

            <p className="text-sm text-slate-400">{title}</p>

            <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">{value}</span>
                <span className="text-sm text-slate-400">{unit}</span>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-500">
                {description}
            </p>
        </div>
    );
}

export default function BodyAnalysis() {
    const { profile, indicators, basalMetabolism } = bodyAnalysis;

    return (
        <section className="mt-8">
            {/* Cabeçalho */}
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Activity size={21} className="text-emerald-400" />
                        <h2 className="text-xl font-bold text-white">
                            Análise corporal
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-slate-400">
                        Entenda seus indicadores com base no seu perfil corporal.
                    </p>
                </div>

                <span className="w-fit rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-400">
                    Dados demonstrativos
                </span>
            </div>

            {/* Perfil utilizado na análise */}
            <div className="mb-5 flex flex-wrap gap-x-6 gap-y-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
                <div>
                    <p className="text-xs text-slate-500">Idade</p>
                    <p className="mt-1 text-sm font-medium text-white">
                        {profile.age} anos
                    </p>
                </div>

                <div>
                    <p className="text-xs text-slate-500">Sexo</p>
                    <p className="mt-1 text-sm font-medium text-white">
                        {profile.sex}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-slate-500">Altura</p>
                    <p className="mt-1 text-sm font-medium text-white">
                        {profile.height.toFixed(2).replace('.', ',')} m
                    </p>
                </div>
            </div>

            {/* Resultado principal: IMC */}
            <div className="mb-5 rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-slate-900 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <Scale size={19} className="text-amber-400" />
                            <p className="text-sm font-medium text-slate-300">
                                Índice de Massa Corporal (IMC)
                            </p>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-white">
                                {indicators.bmi.value.toFixed(1).replace('.', ',')}
                            </span>

                            <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
                                {indicators.bmi.classification}
                            </span>
                        </div>

                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
                            {indicators.bmi.description}
                        </p>
                    </div>

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10">
                        <Activity size={30} className="text-amber-400" />
                    </div>
                </div>
            </div>

            {/* Outros indicadores */}
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <IndicatorCard
                    title="Gordura corporal"
                    value={indicators.bodyFat.value}
                    unit="%"
                    classification={indicators.bodyFat.classification}
                    description={indicators.bodyFat.description}
                    icon={Percent}
                    status={indicators.bodyFat.status}
                />

                <IndicatorCard
                    title="Massa muscular"
                    value={indicators.muscle.value}
                    unit="kg"
                    classification={indicators.muscle.classification}
                    description={indicators.muscle.description}
                    icon={Dumbbell}
                    status={indicators.muscle.status}
                />

                <IndicatorCard
                    title="Circunferência abdominal"
                    value={indicators.waist.value}
                    unit="cm"
                    classification={indicators.waist.classification}
                    description={indicators.waist.description}
                    icon={Ruler}
                    status={indicators.waist.status}
                />

                <IndicatorCard
                    title="Metabolismo basal estimado"
                    value={basalMetabolism.toLocaleString('pt-BR')}
                    unit="kcal/dia"
                    classification="Estimativa"
                    description="Estimativa de energia que o organismo utiliza em repouso por dia."
                    icon={Flame}
                    status="success"
                />
            </div>

            {/* Interpretação geral */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                <div className="mb-4 flex items-center gap-2">
                    <TrendingUp size={20} className="text-emerald-400" />
                    <h3 className="font-semibold text-white">
                        Interpretação dos indicadores
                    </h3>
                </div>

                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-400" />
                        <div>
                            <p className="text-sm font-medium text-white">
                                IMC acima da faixa de referência
                            </p>
                            <p className="mt-1 text-sm text-slate-400">
                                O resultado merece atenção, mas o IMC não diferencia massa
                                muscular de gordura corporal.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                        <div>
                            <p className="text-sm font-medium text-white">
                                Acompanhe a composição corporal
                            </p>
                            <p className="mt-1 text-sm text-slate-400">
                                Avaliar peso, gordura, massa muscular e medidas em conjunto
                                oferece uma visão mais completa.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex items-start gap-2 border-t border-slate-800 pt-4">
                    <Info size={16} className="mt-0.5 shrink-0 text-slate-500" />
                    <p className="text-xs leading-relaxed text-slate-500">
                        Esta análise é demonstrativa e não representa diagnóstico médico.
                        As classificações definitivas deverão utilizar referências
                        apropriadas para idade, sexo e método de medição.
                    </p>
                </div>
            </div>
        </section>
    );
}