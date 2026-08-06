import { Eyebrow, H1, Standfirst } from "@/components/ui/typography";

export default function Home() {
  return (
    <section className="gutter-x section-y">
      <div className="mx-auto flex max-w-page flex-col gap-6">
        <Eyebrow>Naaya Aayam Multi-Disciplinary Institute</Eyebrow>
        <H1 className="max-w-5xl">Transform yourself, to lead the world</H1>
        <Standfirst className="max-w-2xl">
          Kathmandu, Nepal. Established 2012.
        </Standfirst>
      </div>
    </section>
  );
}
