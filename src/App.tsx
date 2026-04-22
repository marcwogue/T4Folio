import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TransitionProvider } from './context/TransitionContext';
import Layout from './components/ui/Layout';
import Home from './pages/Home';
import GamePortfolio from './pages/GamePortfolio';
import VideoPortfolio from './pages/VideoPortfolio';
import './i18n';

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <TransitionProvider>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/video" element={<VideoPortfolio />} />
                            <Route path="/gamedev" element={<GamePortfolio />} />
                        </Route>
                    </Routes>
                </TransitionProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}
