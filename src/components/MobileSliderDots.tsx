/** Dezente Bronze-Pagination — nur auf Mobile sichtbar (hideAt). */
export default function MobileSliderDots({
  count,
  active,
  hideAt = 'md'
}: {
  count: number;
  active: number;
  hideAt?: 'sm' | 'md' | 'lg';
}) {
  if (count <= 1) return null;

  const hiddenClass =
    hideAt === 'sm' ? 'sm:hidden' : hideAt === 'lg' ? 'lg:hidden' : 'md:hidden';
  const safeActive = Math.min(active, Math.max(0, count - 1));

  return (
    <div
      role="tablist"
      aria-label="Slider Navigation"
      className={`mt-6 flex items-center justify-center gap-2 ${hiddenClass}`}
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === safeActive;
        return (
          <span
            key={i}
            role="tab"
            aria-selected={isActive}
            aria-hidden
            className="block h-1 rounded-full transition-all duration-500 ease-out"
            style={{
              width: isActive ? '22px' : '6px',
              backgroundColor: isActive
                ? 'rgba(214, 168, 94, 0.85)'
                : 'rgba(234, 221, 203, 0.20)',
              boxShadow: isActive ? '0 0 12px rgba(214, 168, 94, 0.45)' : 'none'
            }}
          />
        );
      })}
    </div>
  );
}
