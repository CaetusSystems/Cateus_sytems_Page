import type { Lang } from "@/i18n";

/**
 * Bandeiras em SVG (emoji de bandeira não aparece no Windows). Redondas, 24x24.
 * Português = Brasil, inglês = Estados Unidos, espanhol = Espanha.
 */
export function Flag({ lang, className }: { lang: Lang; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <defs>
        <clipPath id={`flag-${lang}`}>
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#flag-${lang})`}>
        {lang === "pt" && (
          <>
            <rect width="24" height="24" fill="#009b3a" />
            <polygon points="12,3.6 22,12 12,20.4 2,12" fill="#fedf00" />
            <circle cx="12" cy="12" r="4.6" fill="#002776" />
            <path d="M7.6 11.2 Q12 9.6 16.4 12.6" stroke="#fff" strokeWidth="1" fill="none" />
          </>
        )}
        {lang === "en" && (
          <>
            <rect width="24" height="24" fill="#fff" />
            {[0, 2, 4, 6].map((i) => (
              <rect key={i} y={(i * 24) / 7} width="24" height={24 / 7} fill="#b22234" />
            ))}
            <rect width="12" height={(24 / 7) * 4} fill="#3c3b6e" />
            {[
              [3, 3],
              [6.5, 3],
              [10, 3],
              [4.7, 6],
              [8.2, 6],
              [3, 9],
              [6.5, 9],
              [10, 9],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="0.7" fill="#fff" />
            ))}
          </>
        )}
        {lang === "es" && (
          <>
            <rect width="24" height="24" fill="#c60b1e" />
            <rect y="6" width="24" height="12" fill="#ffc400" />
          </>
        )}
      </g>
      <circle cx="12" cy="12" r="11.6" fill="none" stroke="rgb(0 0 0 / 0.15)" strokeWidth="0.8" />
    </svg>
  );
}
