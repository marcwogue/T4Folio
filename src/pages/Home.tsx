import Hero from '../components/home/Hero';
import ServiceCards from '../components/home/ServiceCards';
import Achievements from '../components/home/Achievements';
import HireMeCard from '../components/home/HireMeCard';

export default function Home() {
    return (
        <div className="flex flex-col">
            <Hero />
            <div className="bg-base-100">
                <ServiceCards />
                <div className="grid grid-cols-1 lg:grid-cols-8 items-stretch gap-4 md:gap-0">
                    <Achievements />
                    <HireMeCard />
                </div>
            </div>
        </div>
    );
}
