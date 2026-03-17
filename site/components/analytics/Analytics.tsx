"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, Suspense } from "react";
import { siteConfig } from "@/lib/site-config";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-K746KL9T34";
const ymId = process.env.NEXT_PUBLIC_YM_COUNTER_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ym?: (id: number, action: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function AnalyticsInner() {
  const pathname = usePathname();

  // Отслеживание смены страницы при клиентской навигации
  useEffect(() => {
    if (!pathname) return;
    const url = `${siteConfig.siteUrl}${pathname}`;

    // Google Analytics 4
    if (gaId && typeof window.gtag === "function") {
      window.gtag("config", gaId, { page_path: pathname });
    }

    // Яндекс Метрика
    if (ymId && typeof window.ym === "function") {
      window.ym(Number(ymId), "hit", url);
    }
  }, [pathname]);

  return null;
}

/** Отправить событие в Google Analytics 4 */
export function trackGAEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (gaId && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
}

/** Отправить достижение цели в Яндекс Метрику */
export function trackYMGoal(goalId: string, params?: Record<string, string | number>) {
  if (ymId && typeof window.ym === "function") {
    window.ym(Number(ymId), "reachGoal", goalId, params);
  }
}

export function Analytics() {
  return (
    <>
      {/* Google Analytics 4 */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}

      {/* Яндекс Метрика */}
      {ymId && (
        <>
          <Script id="ym-init" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) { return; }
                }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${ymId}, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
              });
            `}
          </Script>
          <noscript>
            <div>
              <img
                src={`https://mc.yandex.ru/watch/${ymId}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        </>
      )}

      <Suspense fallback={null}>
        <AnalyticsInner />
      </Suspense>
    </>
  );
}
