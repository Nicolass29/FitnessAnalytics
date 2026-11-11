
import { useState } from 'react';
import {
    UploadCloud,
    FileSpreadsheet,
    X,
    CheckCircle2,
    AlertCircle,
} from 'lucide-react';

export default function ImportTraining() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');

    // Seleciona o arquivo
    function handleFileChange(event) {
        const file = event.target.files[0];

        if (!file) return;

        const allowedExtensions = ['.xlsx', '.xls'];
        const extension = file.name
            .substring(file.name.lastIndexOf('.'))
            .toLowerCase();

        if (!allowedExtensions.includes(extension)) {
            setMessage('Formato inválido. Selecione um arquivo Excel.');
            setSelectedFile(null);
            event.target.value = '';
            return;
        }

        setSelectedFile(file);
        setMessage('');
    }

    // Remove o arquivo selecionado
    function handleRemoveFile() {
        setSelectedFile(null);
        setMessage('');

        const input = document.getElementById('diet-file');

        if (input) {
            input.value = '';
        }
    }

    // Simula a preparação da importação
    function handleImport() {
        if (!selectedFile) return;

        setMessage('Arquivo selecionado! A integração da importação será implementada posteriormente.');
    }

    // Converte bytes para KB ou MB
    function formatFileSize(size) {
        if (size < 1024 * 1024) {
            return `${(size / 1024).toFixed(1)} KB`;
        }

        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }

    return (
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            {/* Cabeçalho */}
            <div className="mb-5 flex items-center gap-2">
                <FileSpreadsheet size={21} className="text-emerald-400" />

                <div>
                    <h2 className="text-xl font-bold text-white">
                        Importar novo treino
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        Atualize seu planejamento de treinamento através de uma planilha.
                    </p>
                </div>
            </div>

            {/* Área de upload */}
            <label
                htmlFor="diet-file"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-800/30 px-5 py-10 text-center transition-colors hover:border-emerald-500/50 hover:bg-slate-800/60"
            >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                    <UploadCloud size={28} className="text-emerald-400" />
                </div>

                <p className="font-medium text-white">
                    Clique para selecionar seu treino
                </p>

                <p className="mt-2 text-sm text-slate-400">
                    Ou arraste seu arquivo até aqui
                </p>

                <span className="mt-4 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-300">
                    Selecionar arquivo
                </span>

                <p className="mt-3 text-xs text-slate-500">
                    Formatos aceitos: XLS e XLSX
                </p>

                <input
                    id="diet-file"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>

            {/* Arquivo selecionado */}
            {selectedFile && (
                <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-slate-700 bg-slate-800/50 p-4">

                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                            <FileSpreadsheet
                                size={20}
                                className="text-emerald-400"
                            />
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white">
                                {selectedFile.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                {formatFileSize(selectedFile.size)}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleRemoveFile}
                        className="shrink-0 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-red-400"
                        title="Remover arquivo"
                    >
                        <X size={18} />
                    </button>

                </div>
            )}

            {/* Mensagem */}
            {message && (
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
                    <p>{message}</p>
                </div>
            )}

            {/* Erro de formato */}
            {!selectedFile && message && message.includes('inválido') && (
                <div className="mt-4 flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle size={16} />
                    {message}
                </div>
            )}

            {/* Botão */}
            <div className="mt-5 flex justify-end">
                <button
                    onClick={handleImport}
                    disabled={!selectedFile}
                    className="flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
                >
                    <UploadCloud size={17} />
                    Preparar importação
                </button>
            </div>

        </section>
    );
}
