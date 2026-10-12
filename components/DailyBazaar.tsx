import React from "react";
export default function DailyBazaar() {
  return (
    <section className="bg-[#f1f6f2] px-4 py-6 sm:py-8">
      {" "}
      <div className="mx-auto flex min-h-[320px] max-w-[1100px] items-center overflow-hidden rounded-[24px] border border-[#dfe5e0] bg-[#fbfcfb] px-6 py-8 sm:px-10 sm:py-10">
        {" "}
        {/* Left Content */}{" "}
        <div className="flex-1">
          {" "}
          {/* Date Badge */}{" "}
          <div className="inline-flex rounded-full bg-[#e4f3e8] px-4 py-2">
            {" "}
            <span className="text-xs font-medium text-[#168344] sm:text-sm">
              {" "}
              শুক্রবার, ৯ অক্টোবর, ২০২৬{" "}
            </span>{" "}
          </div>{" "}
          {/* Heading */}{" "}
          <h1 className=" mt-5 max-w-[600px] text-[32px] font-extrabold leading-[1.2] tracking-[-1px] text-[#202a23] sm:text-[40px] ">
            {" "}
            আজকের বাজারের দাম এক নজরে{" "}
          </h1>{" "}
          {/* Description */}{" "}
          <p className=" mt-5 max-w-[520px] text-sm leading-6 text-[#69716c] sm:text-base ">
            {" "}
            প্রতিদিনের প্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর দেখুন। সহজেই জানুন কোন
            পণ্যের দাম বেড়েছে আর কোন পণ্যের দাম কমেছে।{" "}
          </p>{" "}
          {/* Button */}{" "}
          <a
            href="#সব-পণ্য"
            className=" mt-6 inline-flex items-center rounded-xl bg-[#168344] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#116b37] sm:text-base "
          >
            {" "}
            সব পণ্যের দাম দেখুন →{" "}
          </a>{" "}
        </div>{" "}
        {/* Right Image */}{" "}
        <div className="hidden h-[270px] w-[40%] items-center justify-center sm:flex">
          {" "}
          <img
            src="/bazar-hero.png"
            alt="বাজারের পণ্য"
            className="max-h-[250px] w-auto object-contain"
          />{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
