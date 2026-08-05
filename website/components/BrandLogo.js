import Image from "next/image";

// The full logo (mark + wordmark + tagline, stacked vertically) reads as a
// blurry smudge at navbar/footer scale — the tagline in particular becomes
// illegible below ~120px tall. Using the icon mark alone plus real HTML
// text is legible at any size and matches the logo's navy/gold brand
// colors (sampled from public/logo.png).
export default function BrandLogo({ variant = "light", className = "" }) {
  const indusColor = variant === "dark" ? "text-white" : "text-[#052146]";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image src="/icon.png" alt="" width={88} height={88} className="h-9 w-9 sm:h-10 sm:w-10" />
      <span className={`text-lg font-bold tracking-wide sm:text-xl ${indusColor}`}>
        Indus <span className="text-[#cb933b]">Impex</span>
      </span>
    </span>
  );
}
