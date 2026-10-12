"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AuthSuccessPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    toast.success("সফলভাবে Sign In হয়েছে! ", {
      id: "auth-success-toast",
      duration: 2000,
    });

    const timer = setTimeout(() => {
      router.replace(callbackUrl);
    }, 500);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  return null;
}
