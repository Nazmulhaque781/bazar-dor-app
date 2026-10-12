export default function Footer() {
  return (
    <footer className="border-t border-[#dce6de] bg-[#eaf2eb] px-4 py-5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        {/* Left Side */}
        <p className="text-xs text-[#202b24] sm:text-sm">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right Side */}
        <p className="text-sm  text-[#202b24]">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
