export default function Divider() {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-200" />
      </div>
    </div>
  );
}
