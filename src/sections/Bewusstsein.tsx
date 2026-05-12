import ConsciousnessComparison from '../components/ConsciousnessComparison';
import FinaleSection from '../components/FinaleSection';
import AwarenessModule from '../components/AwarenessModule';

/** Tiefe Bewusstseins-Inhalte, die nicht mehr auf der Startseite stehen sollen. */
export default function Bewusstsein() {
  return (
    <div className="min-h-screen bg-black">
      <ConsciousnessComparison />
      <FinaleSection showHero showJourneyAndLevels={false} showStats={false} />
      <AwarenessModule variant="paradigmaOnly" />
    </div>
  );
}
