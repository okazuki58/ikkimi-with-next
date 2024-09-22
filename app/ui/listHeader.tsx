import { ArrowRightIcon } from "@heroicons/react/24/outline";

type Props = {
  sectionTitle: string;
  subSectionTitle: string;
  buttonText: string;
};

export function MangaListHeader({
  sectionTitle,
  subSectionTitle,
  buttonText,
}: Props) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div className="flex flex-col">
        {/* <span className="text-indigo-600 dark:text-[#FC4747] pl-1 text-sm font-semibold font-inter mb-2 leading-6">
          {subSectionTitle}
        </span> */}
        <h2 className="inline-block tracking-light text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200">
          {sectionTitle}
        </h2>
      </div>
      <a
        href="#"
        className="flex items-center gap-1 text-sm text-indigo-600 md:hover:text-indigo-500 font-medium dark:text-white"
      >
        <span>{buttonText}</span>
        <ArrowRightIcon className="h-3 w-3 stroke-2" />
      </a>
    </div>
  );
}
