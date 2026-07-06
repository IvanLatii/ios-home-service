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
    <div className="relative flex w-full items-center gap-4 rounded-[8px] bg-[linear-gradient(166.648deg,var(--color-hs-pink-300)_0%,var(--color-hs-pink-600)_47.617%)] p-4">
      {/* Master/worker photo — exact asset from the Figma "main-banner" layer */}
      <img
        src="/figma/promo-person-blur.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[-29px] left-[117px] h-[197px] w-[273px] object-bottom opacity-10 blur-[12px]"
      />
      <img
        src="/figma/promo-person.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[-59px] left-[110px] h-[227px] w-[287px] object-cover"
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
