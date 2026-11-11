import './App.css';
import Dashboard from './pages/Dashboard';
import Peso from './pages/Peso';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Alimentacao from './pages/Alimentacao';
import Treinos from './pages/Treinos';
// import Analises from './pages/Analises';
import MainLayout from '../src/components/layout/MainLayout';
function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/peso" element={<Peso />} />
                    <Route path="/alimentacao" element={<Alimentacao />} />
                       <Route path="/treinos" element={<Treinos />} />
                    {/*            <Route path="/analises" element={<Analises />} /> */}
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;