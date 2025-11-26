import Frankl from "@/components/Frankl";
import Lady from "@/components/Lady";
import Niche from "@/components/Niche";
import Pink from "@/components/Pink";
import Section1 from "@/components/section1";
import Section2 from "@/components/section2";
import Section3 from "@/components/Section3";
import Tobacco from "@/components/Tobacco";
import Watches from "@/components/Watches";
import Image from "next/image";


export default function HomePage() {
  return (
    <>
<div className="w-full relative">
  <Image
    src="/icon/header sm.webp"
    alt="Header Small"
    width={1920}
    height={1080}
    className="w-full h-auto object-cover block md:hidden"
    priority
  />

  <Image
    src="/icon/header.webp"
    alt="Header Large"
    width={1920}
    height={1080}
    className="w-full h-auto object-cover hidden md:block"
    priority
  />
</div>


      <Section1 />
      <Lady params={{ locale: "" }} />
      <Pink params={{ locale: "" }} />
      <Section2 />
      <Frankl params={{ locale: "" }} />
      <Section3 />
      <Niche params={{ locale: "" }} />
      <Watches params={{ locale: "" }} />
      <Tobacco params={{ locale: "" }} />
    </>
  );
}