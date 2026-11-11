
import Slidebar from '../layout/Slidebar';
import Header from '../layout/Header';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="hidden md:block">
                <Slidebar />
            </div>

            <div className="min-w-0 flex-1 md:ml-64">
                <Header />

                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}
