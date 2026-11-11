import {
    LayoutDashboard,
    Scale,
    Utensils,
    Dumbbell,
    ChartNoAxesCombined,
    Activity,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

const menuItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Peso e medidas', path: '/peso', icon: Scale },
    { label: 'Alimentação', path: '/alimentacao', icon: Utensils },
    { label: 'Treinos', path: '/treinos', icon: Dumbbell },
    // { label: 'Análises', path: '/analises', icon: ChartNoAxesCombined },
]

export default function Slidebar() {
    return (
        <aside className="fixed flex h-full w-64 flex-col border-r border-slate-800 bg-slate-950 p-5 text-white">

            <div className="mb-10 flex items-center gap-3">
                <div className="rounded-xl bg-emerald-500 p-2 text-slate-950">
                    <Activity size={24} />
                </div>

                <div>
                    <h1 className="text-xl font-bold">Fitness Analytics</h1>
                    <p className="text-sm text-slate-400">
                        Gerencie seu treino e nutrição
                    </p>
                </div>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Menu
            </p>

            <nav className="flex flex-col gap-2">
                {menuItems.map(({ label, path, icon: Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end={path === '/'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition
                            ${isActive
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        <Icon size={19} />
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}