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
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C9A96E]/30 bg-[#C9A96E]/5 font-serif text-sm font-bold text-[#C9A96E] shadow-sm">
        {name ? name.charAt(0).toUpperCase() : "G"}
      </div>
    );
  }

  return (
    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#C9A96E]/20 bg-black shadow-sm">
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
