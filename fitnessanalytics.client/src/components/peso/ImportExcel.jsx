
import { useState } from 'react';
import { FileSpreadsheet, Upload, X, CheckCircle2 } from 'lucide-react';

export default function ImportExcel() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
    };

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-emerald-500/10 p-2">
                    <FileSpreadsheet className="text-emerald-400" size={22} />
                </div>

                <div>
                    <h3 className="font-semibold text-white">
                        Importar Excel
                    </h3>
                    <p className="text-xs text-slate-400">
                        Importe suas avaliações corporais.
                    </p>
                </div>
            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/40 px-4 py-8 text-center transition hover:border-emerald-500/60 hover:bg-slate-800">
                <Upload size={28} className="mb-3 text-emerald-400" />

                <p className="text-sm font-medium text-white">
                    Clique para selecionar uma planilha
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    Formatos aceitos: .xlsx e .xls
                </p>

                <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>

            {selectedFile && (
                <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 p-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <CheckCircle2 size={20} className="shrink-0 text-emerald-400" />

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white">
                                {selectedFile.name}
                            </p>

                            <p className="text-xs text-slate-400">
                                {(selectedFile.size / 1024).toFixed(1)} KB
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="ml-2 rounded-md p-1 text-slate-400 hover:bg-slate-700 hover:text-white"
                        aria-label="Remover arquivo"
                    >
                        <X size={18} />
                    </button>
                </div>
            )}

            <p className="mt-4 text-xs text-slate-500">
                Os dados da planilha poderão ser revisados antes de serem adicionados ao histórico.
            </p>
        </div>
    );
}
