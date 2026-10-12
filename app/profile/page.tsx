import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileForm from "@/components/ProfileForm";

export const instant = false;

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-[#f1f6f2] px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-[#202b24] sm:text-3xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        {/* Profile Card */}
        <section className="rounded-2xl border border-[#dce6de] bg-[#f7faf7] p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#eaf2eb] text-5xl">
              👤
            </div>

            {/* Current Name */}
            <h2 className="mt-4 text-2xl font-bold text-[#202b24]">
              {session.user.name}
            </h2>
          </div>

          {/* Update Form */}
          <ProfileForm currentName={session.user.name} />
        </section>
      </div>
    </main>
  );
}
