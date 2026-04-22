import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ParticleField from './ParticleField';
import Sidebar from './Sidebar';
import MinecraftTransition from './MinecraftTransition';
import WaveTransition from './WaveTransition';

import MobileHelper from './MobileHelper';

export default function Layout() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    return (
        <div className="min-h-screen relative bg-base-100 text-base-content selection:bg-neon-cyan/30 overflow-x-hidden transition-colors duration-300">
            <ParticleField />
            <MinecraftTransition />
            <WaveTransition />
            <MobileHelper />

            <Sidebar isExpanded={isSidebarExpanded} onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)} />

            <div className={`transition-all duration-300 flex flex-col min-h-screen ${isSidebarExpanded ? 'md:pl-[280px]' : 'md:pl-[88px]'} pl-0`}>
                <div className="flex-1 flex flex-col p-4 md:p-8">
                    <main className="flex-1">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
