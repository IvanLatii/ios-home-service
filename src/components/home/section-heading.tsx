interface SectionHeadingProps {
  title: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export function SectionHeading({
  title,
  actionLabel,
  onActionClick,
}: SectionHeadingProps) {
  return (
    <div className="flex w-full items-center gap-2 px-6 pt-8 pb-4">
      <h2 className="flex-1 font-alumni text-4xl leading-8 font-semibold tracking-[-0.36px] text-hs-neutral-800">
        {title}
      </h2>
      {actionLabel ? (
        <button
          type="button"
          onClick={onActionClick}
          className="shrink-0 rounded-[6px] bg-[linear-gradient(166.078deg,var(--color-hs-blue-500)_0%,var(--color-hs-blue-800)_47.617%)] bg-clip-text font-sans text-sm leading-5 font-medium tracking-[-0.14px] text-transparent"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
