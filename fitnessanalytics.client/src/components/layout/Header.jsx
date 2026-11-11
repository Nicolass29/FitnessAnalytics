import { CalendarDays } from 'lucide-react'

export default function Header() {
    return (
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 bg-slate-950 px-8 py-5">
            <div>
                <h2 className="text-xl font-bold text-white">
                    Visão geral
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                    Acompanhe sua evolução física.
                </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400">
                <CalendarDays size={18} />
                <span>Seu acompanhamento</span>
            </div>
        </header>
    );
}