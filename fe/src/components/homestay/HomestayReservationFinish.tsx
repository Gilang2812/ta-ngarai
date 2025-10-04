"use client";
import React, { useState, useEffect } from "react";
import { Check, Link } from "lucide-react";
import { cn } from "@/utils/common/cn";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/data/routes";

interface ReservationSuccessProps {
  redirectDelay?: number;
  currentStep?: number;
  reservationId?: string | null;
}

const HomestayReservationFinish: React.FC<ReservationSuccessProps> = ({
  redirectDelay = 3,
  currentStep,
  reservationId = "123",
}) => {
  const [countdown, setCountdown] = useState(redirectDelay);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (currentStep !== 3) return;
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsRedirecting(true);
      
      if (reservationId) { 
        router.push(ROUTES.HOMESTAY_RESERVATION_DETAIL(reservationId));
      }
    }
  }, [countdown, currentStep, reservationId, router]);

  return (
    <section
      className={cn("  w-full  p-8 text-center", {
        hidden: currentStep !== 3,
      })}
      role="main"
      aria-live="polite"
    >
      {/* Success Icon */}
      <figure
        className="flex justify-center mb-6"
        aria-label="Success confirmation"
      >
        <div
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-pulse"
          role="img"
          aria-label="Success checkmark"
        >
          <Check className="w-8 h-8 text-white" strokeWidth={3} />
        </div>
      </figure>

      {/* Thank You Heading */}
      <header>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h1>
      </header>

      {/* Success Message */}
      <article className="mb-8">
        <p className="text-gray-600 leading-relaxed">
          Your reservation has been successfully submitted. Please wait for
          verification from the admin.
        </p>
      </article>

      {/* Divider */}
      <hr className="border-t border-gray-200 mb-8" />

      {/* Actions Section */}
      <nav className="space-y-6">
        <Button type="button" className="h-fit py-1 mx-auto" asChild>
          <Link href={ROUTES.HOMESTAY_RESERVATION_DETAIL(reservationId || "1")}>
            View My Reservation Details
          </Link>
        </Button>

        {/* Redirect Notice */}
        <aside
          id="redirect-notice"
          className="text-sm text-gray-500"
          aria-live="polite"
        >
          {isRedirecting
            ? "Redirecting..."
            : `You will be redirected in ${countdown} second${
                countdown !== 1 ? "s" : ""
              }.`}
        </aside>
      </nav>
    </section>
  );
};

export default HomestayReservationFinish;
