
import Frankl from "@/components/Frankl";
import Lady from "@/components/Lady";
import Niche from "@/components/Niche";
import Pink from "@/components/Pink";
import Section1 from "@/components/section1";
import Section2 from "@/components/section2";
import Section3 from "@/components/Section3";
import Tobacco from "@/components/Tobacco";
import Watches from "@/components/Watches";


export default function HomePage() {

  return (

    <>
      <div className="relative w-screen h-screen overflow-hidden">
        <video
          src="/video/3saf0012.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <Section1 />
      <Lady params={{
        locale: ""
      }} />
      <Pink params={{
        locale: ""
      }} />
      <Section2 />
      <Frankl params={{
        locale: ""
      }} />
      <Section3 />
      <Niche params={{
        locale: ""
      }} />
      <Watches params={{
        locale: ""
      }} />
      <Tobacco params={{
        locale: ""
      }} />
    </>
  );
}
