import AwarenessModule from '../components/AwarenessModule';
import TransformationSlider from '../components/TransformationSlider';

/** Homepage-Inhalte „Unbewusst/Bewusst“ + Transformations-Karten — ohne Canvas-Journey (siehe /methodik). */
export default function Transformation() {
  return (
    <div className="min-h-screen bg-black">
      <AwarenessModule variant="cardsOnly" />
      <TransformationSlider />
    </div>
  );
}
