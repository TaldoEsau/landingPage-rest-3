"use client";

import { useState } from "react";

interface ReviewAvatarProps {
  photoUrl?: string;
  name: string;
}

export function ReviewAvatar({ photoUrl, name }: ReviewAvatarProps) {
  const [imgError, setImgError] = useState(false);

  if (!photoUrl || imgError) {
    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E63946]/30 bg-[#E63946]/10 font-serif text-sm font-bold text-[#E63946] shadow-sm">
        {name ? name.charAt(0).toUpperCase() : "G"}
      </div>
    );
  }

  return (
    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#F4A261]/40 bg-white shadow-sm">
      <img
        src={photoUrl}
        alt={name}
        aria-hidden="true"
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
