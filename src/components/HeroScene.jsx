export default function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <div className="scene-glow" />
      <div className="orbit-world">
        <div className="orbit-ring orbit-ring-one"><i /></div>
        <div className="orbit-ring orbit-ring-two"><i /></div>
        <div className="orbit-ring orbit-ring-three"><i /></div>
        <div className="orbit-core"><span>AC</span></div>
        <div className="orbit-spark spark-one" />
        <div className="orbit-spark spark-two" />
      </div>
    </div>
  );
}
