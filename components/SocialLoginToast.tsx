"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SocialLoginToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.get("socialLogin") !== "success") {
      return;
    }

    toast.success("সফলভাবে Sign In হয়েছে! ", {
      id: "social-login-success",
      duration: 2000,
    });

    const params = new URLSearchParams(searchParams.toString());
    params.delete("socialLogin");

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.replace(newUrl);
  }, [searchParams, router, pathname]);

  return null;
}
