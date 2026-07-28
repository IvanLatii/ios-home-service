// Технічна сторінка звірки токенів із DESIGN-TOKENS.md. Не частина сценарію прототипу.

type Swatch = {
  token: string;
  hex: string;
  usage: string;
  className: string;
  onDark?: boolean;
};

const neutralSwatches: Swatch[] = [
  { token: "neutral-0", hex: "#ffffff", usage: "Білий, картки", className: "bg-hs-neutral-0" },
  { token: "neutral-50", hex: "#f7f4f0", usage: "Тло сторінки", className: "bg-hs-neutral-50" },
  { token: "neutral-100", hex: "#efeae5", usage: "Тло блоків, роздільники", className: "bg-hs-neutral-100" },
  { token: "neutral-200", hex: "#ddd6cf", usage: "Межі, неактивні стани", className: "bg-hs-neutral-200" },
  { token: "neutral-400", hex: "#afa39d", usage: "Плейсхолдери, вимкнений текст", className: "bg-hs-neutral-400" },
  { token: "neutral-600", hex: "#786c6e", usage: "Вторинний текст", className: "bg-hs-neutral-600", onDark: true },
  { token: "neutral-700", hex: "#63515f", usage: "Текст середньої ваги", className: "bg-hs-neutral-700", onDark: true },
  { token: "neutral-800", hex: "#553c54", usage: "Основний текст", className: "bg-hs-neutral-800", onDark: true },
];

const pinkSwatches: Swatch[] = [
  { token: "pink-400", hex: "#ea5ea5", usage: "Основний акцент, підсвітка збігів у пошуку", className: "bg-hs-pink-400" },
  { token: "pink-1000", hex: "#380c23", usage: "Темний акцент, тло", className: "bg-hs-pink-1000", onDark: true },
];

const blueSwatches: Swatch[] = [
  { token: "blue-500", hex: "#0364ca", usage: "Вторинний", className: "bg-hs-blue-500", onDark: true },
  { token: "blue-800", hex: "#283694", usage: "Вторинний", className: "bg-hs-blue-800", onDark: true },
];

function ColorGroup({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <div>
      <h3 className="font-alumni text-2xl font-semibold text-hs-neutral-800">{title}</h3>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {swatches.map((s) => (
          <div key={s.token} className="rounded-8 border border-hs-neutral-200 overflow-hidden">
            <div
              className={`h-20 flex items-end p-2 ${s.className}`}
            >
              <span
                className={`text-xs font-medium ${
                  s.onDark ? "text-hs-neutral-0" : "text-hs-neutral-800"
                }`}
              >
                {s.hex}
              </span>
            </div>
            <div className="p-2 bg-hs-neutral-0">
              <p className="text-sm font-medium text-hs-neutral-800">{s.token}</p>
              <p className="text-xs text-hs-neutral-600">{s.usage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 bg-hs-neutral-50 min-h-screen">
      <header className="mb-12">
        <h1 className="font-alumni text-6xl font-semibold tracking-[-0.01em] text-hs-neutral-800">
          Styleguide
        </h1>
        <p className="mt-2 text-base text-hs-neutral-600">
          Токени з DESIGN-TOKENS.md — для звірки з макетом. Не частина сценарію застосунку.
        </p>
      </header>

      {/* ─── Кольори ─────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="font-alumni text-4xl font-semibold text-hs-neutral-800">Кольори</h2>

        <div className="mt-6 space-y-10">
          <ColorGroup title="Neutral" swatches={neutralSwatches} />
          <ColorGroup title="Pink" swatches={pinkSwatches} />
          <ColorGroup title="Blue" swatches={blueSwatches} />

          <div>
            <h3 className="font-alumni text-2xl font-semibold text-hs-neutral-800">Службові</h3>
            <div className="mt-3 max-w-xs rounded-8 border border-hs-neutral-200 overflow-hidden">
              <div className="h-20 bg-hs-neutral-100 relative">
                <div className="absolute inset-0 bg-hs-opacity-8" />
              </div>
              <div className="p-2 bg-hs-neutral-0">
                <p className="text-sm font-medium text-hs-neutral-800">opacity-8</p>
                <p className="text-xs text-hs-neutral-600">
                  #553c5414 — neutral-800 з альфою 8%, поверх neutral-100
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Типографіка ─────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="font-alumni text-4xl font-semibold text-hs-neutral-800">Типографіка</h2>

        <div className="mt-6 space-y-8">
          <div>
            <p className="text-xs font-medium text-hs-neutral-600 mb-1">
              Headline/H1 — Alumni Sans SemiBold, 72 / 0.66
            </p>
            <p className="font-alumni text-7xl leading-[0.66] font-semibold tracking-[-0.01em] text-hs-neutral-800">
              Home Service
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-hs-neutral-600 mb-1">
              Headline/H3 — Alumni Sans SemiBold, 36 / 32
            </p>
            <p className="font-alumni text-4xl leading-8 font-semibold tracking-[-0.01em] text-hs-neutral-800">
              Popular categories
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-hs-neutral-600 mb-1">
              Headline/H4 — Alumni Sans SemiBold, 20 / 18
            </p>
            <p className="font-alumni text-xl leading-[18px] font-semibold tracking-[-0.01em] text-hs-neutral-800">
              Faucet repair
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-hs-neutral-600 mb-1">
              Body/16 Medium — Geist Medium 500, 16 / 24
            </p>
            <p className="text-base leading-6 font-medium tracking-[-0.01em] text-hs-neutral-800">
              We find the best available master based on ratings and proximity.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-hs-neutral-600 mb-1">
              Body/14 Medium — Geist Medium 500, 14 / 20
            </p>
            <p className="text-sm leading-5 font-medium tracking-[-0.01em] text-hs-neutral-800">
              It may take longer and cost more than usual.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-hs-neutral-600 mb-1">
              Label/14 Medium — Geist Medium 500, 14 / 14
            </p>
            <p className="text-sm leading-[14px] font-medium tracking-[-0.01em] text-hs-neutral-800">
              Continue
            </p>
          </div>
        </div>
      </section>

      {/* ─── Радіуси ─────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="font-alumni text-4xl font-semibold text-hs-neutral-800">Радіуси</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {[
            { token: "radius-4", className: "rounded-4" },
            { token: "radius-6", className: "rounded-6" },
            { token: "radius-8", className: "rounded-8" },
            { token: "radius-16", className: "rounded-16" },
            { token: "radius-full", className: "rounded-full" },
          ].map((r) => (
            <div key={r.token} className="text-center">
              <div className={`h-20 w-20 mx-auto bg-hs-pink-400 ${r.className}`} />
              <p className="mt-2 text-xs font-medium text-hs-neutral-600">{r.token}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Тіні ─────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="font-alumni text-4xl font-semibold text-hs-neutral-800">Тіні</h2>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="text-center">
            <div className="h-32 rounded-16 bg-hs-neutral-0 shadow-inner flex items-center justify-center">
              <span className="text-sm font-medium text-hs-neutral-600">
                втоплений елемент
              </span>
            </div>
            <p className="mt-2 text-xs font-medium text-hs-neutral-600">shadow-inner</p>
          </div>
          <div className="text-center">
            <div className="h-32 rounded-16 bg-hs-neutral-0 shadow-xl flex items-center justify-center">
              <span className="text-sm font-medium text-hs-neutral-600">
                модалка / плаваюча панель
              </span>
            </div>
            <p className="mt-2 text-xs font-medium text-hs-neutral-600">shadow-xl</p>
          </div>
        </div>
      </section>
    </main>
  );
}
