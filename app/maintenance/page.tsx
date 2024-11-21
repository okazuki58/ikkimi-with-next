import Link from "next/link";

export default function Maintenance() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 text-center my-24">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">メンテナンス中</h1>
      <p className="text-lg text-gray-600 mb-8">
        現在、システムのメンテナンスを行っております。しばらくお待ちください。
      </p>
      <p className="text-sm text-gray-500 mb-8">
        ご不便をおかけして申し訳ございません。メンテナンスが完了次第、サービスを再開いたします。
      </p>
    </div>
  );
}
