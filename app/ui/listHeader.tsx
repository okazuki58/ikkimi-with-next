import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Manga } from "../lib/definitions";
import Link from "next/link";

type Props = {
  sectionTitle: string;
  buttonText: string;
  buttonLink?: string;
};

export function MangaListHeader({
  sectionTitle,
  buttonText,
  buttonLink,
}: Props) {
  return (
    <div className="flex items-end justify-between mb-6">
      <Link href={`/manga/${buttonLink}`}>
        <h2 className="inline-block tracking-light text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200">
          {sectionTitle}
        </h2>
      </Link>
      <Link
        href={`/manga/${buttonLink}`}
        className="flex items-center gap-1 text-sm text-indigo-600 md:hover:text-indigo-500 font-medium dark:text-white"
      >
        <span>{buttonText}</span>
        <ArrowRightIcon className="h-3 w-3 stroke-2" />
      </Link>
    </div>
  );
}
