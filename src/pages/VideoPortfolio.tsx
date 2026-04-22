import { useEffect, useState } from 'react';
import VideoHero from '../components/video-portfolio/VideoHero';
import Showreel from '../components/video-portfolio/Showreel';
import RetroTVSection from '../components/video-portfolio/RetroTVSection';
import VideoGallery from '../components/video-portfolio/VideoGallery';
import CoreDisciplines from '../components/video-portfolio/CoreDisciplines';
import ContactCTA from '../components/video-portfolio/ContactCTA';
import FloatingNav from '../components/video-portfolio/FloatingNav';

export default function VideoPortfolio() {
    const [activeSection, setActiveSection] = useState('studio');

    // Intersection Observer for active section tracking
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        const sections = ['studio', 'showreel', 'retrotv', 'work', 'services', 'contact'];

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-base-100 text-base-content font-sans selection:bg-purple-500/30 transition-colors duration-300">
            {/* Grid Background Pattern */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: `radial-gradient(var(--bc) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:px-12">
                <VideoHero />
                <Showreel />
                <RetroTVSection />
                <VideoGallery />
                <CoreDisciplines />
                <ContactCTA />
                <FloatingNav activeSection={activeSection} scrollToSection={scrollToSection} />
            </main>
        </div>
    );
}
