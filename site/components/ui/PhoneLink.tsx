"use client";

import Link from "next/link";
import { trackGAEvent, trackYMGoal, trackFBEvent } from "@/components/analytics/Analytics";

type PhoneLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  location?: string; // header, footer, cta, contacts, blog
};

export function PhoneLink({ href, children, className, location = "unknown" }: PhoneLinkProps) {
  const handleClick = () => {
    trackGAEvent("phone_click", { location });
    trackYMGoal("phone_click", { location });
    trackFBEvent("Contact", { content_name: location });
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
