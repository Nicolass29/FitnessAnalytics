import WeightChart from '../components/peso/WeightChart ';
import CurrentMetrics from '../components/peso/CurrentMetrics';
import EvaluationHistory from '../components/peso/EvaluationHistory';
import ImportExcel from '../components/peso/ImportExcel';
import ManualEvaluation from '../components/peso/ManualEvaluation';
import BodyAnalysis from '../components/peso/BodyAnalysis';
export default function Peso() {
    return (
        <div className="min-h-full bg-slate-950 p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">
                    Peso e medidas
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                    Acompanhe sua evolução e composição corporal.
                </p>
            </div>

            {/* Indicadores atuais */}
            <CurrentMetrics />

            {/* Análise corporal */}
            <BodyAnalysis />

            {/* Gráficos de evolução */}
            <div className="mt-8">
                <WeightChart />
            </div>

            {/* Histórico */}
            <div className="mt-8">
                <EvaluationHistory />
            </div>

            {/* Cadastro e importação */}
            <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-2">
                <ImportExcel />
                <ManualEvaluation />
            </div>
        </div>
    );
}