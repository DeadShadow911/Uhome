"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, Suspense } from "react";
import { siteConfig } from "@/lib/site-config";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-K746KL9T34";
const ymId = process.env.NEXT_PUBLIC_YM_COUNTER_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1326992945905023";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ym?: (id: number, action: string, ...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
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

    // Meta Pixel — PageView при SPA-навигации
    if (metaPixelId && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
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

/** Отправить событие в Meta (Facebook) Pixel */
export function trackFBEvent(event: string, params?: Record<string, string | number>) {
  if (metaPixelId && typeof window.fbq === "function") {
    window.fbq("track", event, params);
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

      {/* Meta (Facebook) Pixel */}
      {metaPixelId && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
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
