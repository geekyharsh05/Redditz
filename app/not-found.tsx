"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Frown } from "lucide-react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/30 flex items-center justify-center p-4">
      <Card
        className={`w-full max-w-md overflow-hidden transition-all duration-500 ${
          mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 z-0" />

          <div className="relative z-10 p-6 md:p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <div className="text-8xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    404
                  </div>
                  <Frown className="w-12 h-12 text-muted-foreground absolute -top-1 -right-8" />
                </div>

                <h2 className="text-xl md:text-2xl font-semibold">
                  Page Not Found
                </h2>
              </div>

              <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full" />

              <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
                <p className="text-sm md:text-base text-muted-foreground px-4 py-3 italic border-l-2 border-primary">
                  &ldquo;In the vast realm of the internet, some pages are like
                  socks in a dryer - they just vanish!&rdquo;
                </p>
              </div>

              <Button className="group" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>Return to Home</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
