import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function BlackButton({
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={clsx(
        "rounded-md bg-gray-900 px-3.5 py-2.5 h-10 text-sm font-medium text-white shadow-smfocus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition",
        {
          "hover:bg-gray-900/90": !disabled, // disabledでないときのみホバー効果を適用
          "cursor-not-allowed opacity-50": disabled, // disabledのときのスタイル
        },
        className
      )}
    >
      {children}
    </button>
  );
}
