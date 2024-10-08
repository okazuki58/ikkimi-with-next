export default function TermsOfService() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-center py-20">
        <h1 className="text-3xl font-bold">利用規約</h1>
      </div>
      <p className="mb-14">
        この利用規約（以下、「本規約」といいます。）は、Ikkimi（以下、「本サービス」といいます。）を利用するすべてのユーザー（以下、「ユーザー」といいます。）に適用されます。
      </p>

      <h2 className="text-2xl font-semibold mb-4">1. 適用範囲</h2>
      <p className="mb-14">
        本規約は、ユーザーが本サービスを利用する際に適用されます。本規約に同意しない場合、本サービスを利用することはできません。
      </p>

      <h2 className="text-2xl font-semibold mb-4">2. ユーザーの責任</h2>
      <p className="mb-14">
        ユーザーは、本サービスを利用するにあたり、以下の点に留意する必要があります。法律および本規約に違反しないこと、不正行為や他のユーザーの迷惑となる行為を行わないこと。
      </p>

      <h2 className="text-2xl font-semibold mb-4">3. 禁止事項</h2>
      <ul className="list-disc list-inside mb-14">
        <li>違法行為</li>
        <li>著作権侵害</li>
        <li>他のユーザーへの迷惑行為</li>
        <li>サーバーへの負荷を増やす行為</li>
        <li>スクレイピング</li>
        <li>ログイン情報の不正取得</li>
        <li>不正行為</li>
        <li>その他、本サービスの運営に支障をきたす行為</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">4. 免責事項</h2>
      <p className="mb-14">
        本サービスは、可能な限り正確な情報を提供するよう努めますが、その内容の正確性や完全性を保証するものではありません。本サービスの利用により発生した損害について、当社は一切の責任を負いません。
      </p>

      <h2 className="text-2xl font-semibold mb-4">5. 規約の変更</h2>
      <p className="mb-14">
        当社は、必要に応じて本規約を変更することができるものとします。変更後の規約は、本サイトに掲載された時点で効力を持ちます。
      </p>

      <h2 className="text-2xl font-semibold mb-4">6. お問い合わせ</h2>
      <p className="mb-14">
        本規約に関するご質問がある場合は、
        <a href="#" className="text-indigo-600">
          公式Xアカウント
        </a>
        からご連絡ください。
      </p>
    </div>
  );
}
