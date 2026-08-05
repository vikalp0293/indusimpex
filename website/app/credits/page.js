export const metadata = {
  title: "Image Credits — Indus Impex",
};

// Stand-in photography sourced from Wikimedia Commons pending real product
// and facility photography. Several are licensed CC BY / CC BY-SA, which
// require attribution — this page provides it. Replace with real
// photography (and retire this page) once available.
const CREDITS = [
  {
    file: "hero-leaves.jpg",
    title: "Areca vestiaria – trunk, fruit and leaves",
    author: "Forest & Kim Starr",
    license: "CC BY 3.0 US",
    url: "https://commons.wikimedia.org/wiki/File:Starr-120522-6030-Areca_vestiaria-trunk_fruit_and_leaves-Iao_Tropical_Gardens_of_Maui-Maui_(25143041155).jpg",
  },
  {
    file: "plate-round.jpg",
    title: "Areca Leaf Plate",
    author: "Rumi Borah",
    license: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Areca_Leaf_Plate.jpg",
  },
  {
    file: "plate-square.jpg",
    title: "Areca palm leaf plates",
    author: "Robyraj97",
    license: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:81p5P-US%2BGL.jpg",
  },
  {
    file: "press.jpg",
    title: "Arecanut leaf plate press machine, VGKK BR Hills",
    author: "Prashanthns",
    license: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Arecanut_leaf_plate_press_machine_VGKK_BR_Hills.jpg",
  },
  {
    file: "cutlery.jpg",
    title: "Fork, knife and spoon made of bamboo on a plate",
    author: "Cupofjoy",
    license: "CC0 (Public Domain)",
    url: "https://commons.wikimedia.org/wiki/File:Fork,_knife_and_spoon_made_of_bamboo_on_a_plate.jpg",
  },
  {
    file: "cup.png",
    title: "Paper Cups – isolated",
    author: "Alanthebox",
    license: "CC0 (Public Domain)",
    url: "https://commons.wikimedia.org/wiki/File:Paper_Cups_-_isolated.png",
  },
  {
    file: "boxes.jpg",
    title: "Cardboard boxes",
    author: "Henry Söderlund",
    license: "CC BY 2.0",
    url: "https://commons.wikimedia.org/wiki/File:Cardboard_boxes_by_Henry_S%C3%B6derlund.jpg",
  },
  {
    file: "straws.jpg",
    title: "Drinking straws made of paper",
    author: "Asurnipal",
    license: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Drinking_straws_made_of_paper-02ASD.jpg",
  },
  {
    file: "stirrer.jpg",
    title: "Wooden coffee stirrer",
    author: "Corn cheese",
    license: "CC BY 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Wooden_coffee_stirrer.jpg",
  },
];

export default function CreditsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Image Credits</h1>
      <p className="mt-4 text-black/70">
        Real product and facility photography hasn&apos;t been supplied yet, so this site uses
        openly licensed stand-in photos from Wikimedia Commons. They&apos;ll be replaced as real
        photography becomes available. Attribution below as required by each photo&apos;s
        license.
      </p>
      <ul className="mt-8 flex flex-col gap-4">
        {CREDITS.map((c) => (
          <li key={c.file} className="rounded-lg border border-black/10 p-4 text-sm">
            <p className="font-medium">{c.title}</p>
            <p className="mt-1 text-black/60">
              by {c.author} &middot; {c.license} &middot;{" "}
              <a href={c.url} className="text-teal-800 underline" target="_blank" rel="noopener noreferrer">
                source on Wikimedia Commons
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
