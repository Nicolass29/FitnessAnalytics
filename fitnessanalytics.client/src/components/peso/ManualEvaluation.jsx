
import { useState } from 'react';
import { ClipboardPenLine, X } from 'lucide-react';

const initialForm = {
    date: '',
    weight: '',
    fat: '',
    muscle: '',
    waist: '',
    imc: '',
    basalMetabolism: ''
};

export default function ManualEvaluation() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setSubmitted(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Temporário: futuramente enviaremos esses dados para a API.
        console.log('Nova avaliação:', formData);

        setSubmitted(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setSubmitted(false);
    };

    return (
        <>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-sky-500/10 p-2">
                        <ClipboardPenLine className="text-sky-400" size={22} />
                    </div>

                    <div>
                        <h3 className="font-semibold text-white">
                            Cadastro manual
                        </h3>

                        <p className="text-xs text-slate-400">
                            Registre uma nova avaliação corporal.
                        </p>
                    </div>
                </div>

                <div className="flex min-h-[148px] flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-800/40 p-5 text-center">
                    <p className="mb-4 text-sm text-slate-400">
                        Preencha os indicadores da sua avaliação manualmente.
                    </p>

                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600"
                    >
                        + Nova avaliação
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    Nova avaliação
                                </h2>

                                <p className="mt-1 text-sm text-slate-400">
                                    Informe os dados da sua avaliação corporal.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleClose}
                                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                aria-label="Fechar formulário"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <FormField
                                    label="Data da avaliação"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />

                                <FormField
                                    label="Peso (kg)"
                                    name="weight"
                                    type="number"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    placeholder="Ex.: 96"
                                    step="0.1"
                                    required
                                />

                                <FormField
                                    label="Gordura corporal (%)"
                                    name="fat"
                                    type="number"
                                    value={formData.fat}
                                    onChange={handleChange}
                                    placeholder="Ex.: 22.5"
                                    step="0.1"
                                />

                                <FormField
                                    label="Massa muscular (kg)"
                                    name="muscle"
                                    type="number"
                                    value={formData.muscle}
                                    onChange={handleChange}
                                    placeholder="Ex.: 39.2"
                                    step="0.1"
                                />

                                <FormField
                                    label="Cintura (cm)"
                                    name="waist"
                                    type="number"
                                    value={formData.waist}
                                    onChange={handleChange}
                                    placeholder="Ex.: 89"
                                    step="0.1"
                                />

                                <FormField
                                    label="IMC"
                                    name="imc"
                                    type="number"
                                    value={formData.imc}
                                    onChange={handleChange}
                                    placeholder="Ex.: 27.4"
                                    step="0.1"
                                />

                                <FormField
                                    label="Metabolismo basal (kcal)"
                                    name="basalMetabolism"
                                    type="number"
                                    value={formData.basalMetabolism}
                                    onChange={handleChange}
                                    placeholder="Ex.: 1950"
                                />
                            </div>

                            {submitted && (
                                <p className="mt-4 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-400">
                                    Dados preenchidos! O salvamento será integrado ao banco de dados posteriormente.
                                </p>
                            )}

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600"
                                >
                                    Registrar avaliação
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

function FormField({
    label,
    name,
    type,
    value,
    onChange,
    placeholder,
    step,
    required
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-medium text-slate-300"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                step={step}
                required={required}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-500"
            />
        </div>
    );
}
