const GrainOverlay = () => {
  return (
    <>
      {/* Film grain */}
      <div className="grain-overlay" />
      
      {/* Vignette effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, hsl(var(--noir-deep) / 0.4) 100%)`
        }}
      />
    </>
  );
};

export default GrainOverlay;
