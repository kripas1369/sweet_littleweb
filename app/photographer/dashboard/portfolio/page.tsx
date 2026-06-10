"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { TopBar } from "@/app/components/admin/TopBar";
import { Card, GoldButton } from "@/app/components/admin/Card";
import { useToast } from "@/app/components/admin/Toast";
import { photographers } from "@/lib/mock-data";

const PHOTOGRAPHER_ID = "ph_001";

export default function PhotographerPortfolioPage() {
  const me = photographers.find((p) => p.id === PHOTOGRAPHER_ID)!;
  const [photos, setPhotos] = useState<string[]>(me.portfolio);
  const toast = useToast();

  return (
    <>
      <TopBar
        greeting="My Portfolio"
        subtitle={`${photos.length} of 10 photos`}
      />
      <main className="space-y-6 p-6">
        <Card
          title="Portfolio Photos"
          subtitle="Drag to reorder — best photo first wins more bookings"
          action={
            <GoldButton size="sm" onClick={() => toast.info("Upload from your camera roll (mock)")}>
              <Plus className="h-3.5 w-3.5" />
              Add Photos
            </GoldButton>
          }
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {photos.map((url, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-xl border border-lsp-border"
              >
                <Image
                  src={url}
                  alt={`Portfolio ${i + 1}`}
                  fill
                  sizes="240px"
                  className="object-cover transition group-hover:scale-105"
                />
                {i === 0 && (
                  <span className="absolute top-2 left-2 rounded-full bg-lsp-gold px-2 py-0.5 text-[10px] font-bold text-white">
                    FEATURED
                  </span>
                )}
                <button
                  onClick={() => {
                    setPhotos((arr) => arr.filter((_, idx) => idx !== i));
                    toast.success("Photo removed");
                  }}
                  className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </>
  );
}
