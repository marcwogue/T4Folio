import GameHero from '../components/gameportfolio/GameHero';
import SkillsCircular from '../components/gameportfolio/SkillsCircular';
import QuestLog from '../components/gameportfolio/QuestLog';
import ExperienceLog from '../components/gameportfolio/ExperienceLog';
import GameCTA from '../components/gameportfolio/GameCTA';

export default function GamePortfolio() {
    return (
        <div className="bg-base-100 min-h-screen text-base-content">
            <GameHero />
            <SkillsCircular />
            <QuestLog />
            <ExperienceLog />
            <GameCTA />
        </div>
    );
}
