"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// While an order is still "pending" (waiting on the PhonePe webhook to
// arrive), refresh the server-rendered page every few seconds so the
// status updates automatically once the webhook lands.
export default function OrderStatusPoll({ pending }) {
  const router = useRouter();
  const attempts = useRef(0);
  const [maxedOut, setMaxedOut] = useState(false);

  useEffect(() => {
    if (!pending) return;
    const interval = setInterval(() => {
      attempts.current += 1;
      if (attempts.current > 20) {
        setMaxedOut(true);
        clearInterval(interval);
        return;
      }
      router.refresh();
    }, 3000);
    return () => clearInterval(interval);
  }, [pending, router]);

  if (!pending) return null;

  return (
    <p className="lt-fineprint" style={{ marginTop: 12 }}>
      {maxedOut ? (
        <button className="lt-link-btn" onClick={() => router.refresh()}>
          Still waiting — tap to check again
        </button>
      ) : (
        "Waiting for PhonePe to confirm your payment…"
      )}
    </p>
  );
}
