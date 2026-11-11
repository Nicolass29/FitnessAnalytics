import CurrentDiet from '../components/alimentacao/CurrentDiet';
import DietAdherence from '../components/alimentacao/DietAdherence';
import ImportDiet from '../components/alimentacao/ImportDiet';

export default function Alimentacao() {
    return (
        <div className="min-h-full bg-slate-950 p-8">

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">
                    Alimentação
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                    Acompanhe sua dieta e seus hábitos alimentares.
                </p>
            </div>

            <CurrentDiet />

            <DietAdherence />

            <ImportDiet />

        </div>
    );
}