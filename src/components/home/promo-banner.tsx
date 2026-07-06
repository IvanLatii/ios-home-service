interface PromoBannerProps {
  heading: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
}

export function PromoBanner({
  heading,
  primaryActionLabel,
  secondaryActionLabel,
}: PromoBannerProps) {
  return (
    <div className="relative flex w-full items-center gap-4 overflow-hidden rounded-[8px] bg-[linear-gradient(166.648deg,var(--color-hs-pink-300)_0%,var(--color-hs-pink-600)_47.617%)] p-4">
      {/* Decorative placeholders standing in for the unavailable photo assets */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 right-[-40px] size-[220px] rounded-full bg-white/15 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 right-[10px] size-[180px] rounded-full bg-white/10 blur-xl"
      />
      <div className="relative flex w-[191px] flex-col items-start gap-5">
        <p className="font-alumni text-4xl leading-8 font-semibold tracking-[-0.36px] text-hs-neutral-0">
          {heading}
        </p>
        <div className="flex w-full items-start gap-5">
          <button
            type="button"
            className="font-sans text-sm leading-5 font-medium tracking-[-0.14px] text-hs-neutral-0 underline-offset-4 hover:underline"
          >
            {primaryActionLabel}
          </button>
          <button
            type="button"
            className="font-sans text-sm leading-5 font-medium tracking-[-0.14px] text-hs-neutral-0 underline-offset-4 hover:underline"
          >
            {secondaryActionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
