import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { content } from "@/lib/content";

export async function CampusLife() {
  const pillars = await content.getCampusLife();
  const band = pillars.find((pillar) => pillar.image !== null)?.image ?? null;

  if (band === null) return null;

  return (
    <section className="field-ink gutter-x section-y" id="campus-life">
      <Reveal className="bleed-x" y={24}>
        <figure className="relative h-72 overflow-hidden md:h-96 lg:h-140 xl:h-150">
          <Parallax
            className="absolute inset-x-0 -inset-y-24 lg:-inset-y-48"
            speed={0.9}
          >
            <Image
              alt={band.alt}
              className="h-full w-full object-cover"
              height={band.height}
              loading="lazy"
              sizes="100vw"
              src={band.src}
              width={band.width}
            />
          </Parallax>
        </figure>
      </Reveal>
    </section>
  );
}
