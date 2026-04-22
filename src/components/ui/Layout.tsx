import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ParticleField from './ParticleField';
import Sidebar from './Sidebar';
import MinecraftTransition from './MinecraftTransition';
import WaveTransition from './WaveTransition';

export default function Layout() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    return (
        <div className="min-h-screen relative bg-base-100 text-base-content selection:bg-neon-cyan/30 overflow-x-hidden transition-colors duration-300">
            <ParticleField />
            <MinecraftTransition />
            <WaveTransition />

            <Sidebar isExpanded={isSidebarExpanded} onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)} />

            <div className={`transition-all duration-300 flex flex-col min-h-screen ${isSidebarExpanded ? 'pl-[280px]' : 'pl-[88px]'}`}>
                <div className="flex-1 flex flex-col p-8">
                    <main className="flex-1">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
