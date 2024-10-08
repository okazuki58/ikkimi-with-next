// app/privacy/page.tsx
export default function PrivacyPolicy() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center gap-4 justify-center py-20">
        <h1 className="text-3xl font-bold">プライバシーポリシー</h1>
        <p className="text-sm text-gray-500">最終更新日: 2024年10月8日</p>
      </div>
      <div className="flex flex-col gap-6"></div>
      <p className="mb-14">
        このプライバシーポリシー（以下、「本ポリシー」といいます。）は、Ikkimi（以下、「本サービス」といいます。）が、ユーザーの個人情報をどのように取り扱うかを説明するものです。本サービスをご利用いただくにあたり、本ポリシーに同意いただいたものとみなします。
      </p>

      <h2 className="text-2xl font-semibold mb-4">1. 収集する情報</h2>
      <p className="mb-4">
        本サービスでは、以下の個人情報を収集することがあります。
      </p>
      <ul className="list-disc list-inside mb-14">
        <li>氏名、メールアドレス、その他の連絡先情報</li>
        <li>サービスの利用履歴やブックマーク情報</li>
        <li>その他、サービス提供のために必要な情報</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">2. 情報の利用目的</h2>
      <p className="mb-4">収集した情報は、以下の目的で利用されます。</p>
      <ul className="list-disc list-inside mb-14">
        <li>サービスの提供および改善</li>
        <li>ユーザーサポートおよびお問い合わせへの対応</li>
        <li>サービスに関連する情報の提供</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">3. 情報の共有</h2>
      <p className="mb-4">
        本サービスは、ユーザーの個人情報を以下の場合を除き、第三者に提供することはありません。
      </p>
      <ul className="list-disc list-inside mb-14">
        <li>ユーザーの同意がある場合</li>
        <li>法律に基づく場合</li>
        <li>サービスの運営に必要な範囲で業務委託先に提供する場合</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        4. クッキー（Cookie）の利用
      </h2>
      <p className="mb-14">
        本サービスでは、ユーザーの利便性向上や利用状況の分析のためにクッキーを使用することがあります。ユーザーはブラウザの設定によりクッキーを無効にすることができますが、その場合、本サービスの一部機能が利用できなくなることがあります。
      </p>

      <h2 className="text-2xl font-semibold mb-4">5. セキュリティ対策</h2>
      <p className="mb-14">
        本サービスは、ユーザーの個人情報を適切に管理し、不正アクセスや漏洩を防止するためのセキュリティ対策を講じます。
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        6. プライバシーポリシーの変更
      </h2>
      <p className="mb-14">
        本ポリシーは、必要に応じて変更されることがあります。変更後のポリシーは、本サービスに掲載された時点で効力を持ちます。
      </p>

      <h2 className="text-2xl font-semibold mb-4">7. お問い合わせ</h2>
      <p className="mb-14">
        本プライバシーポリシーに関するご質問がある場合は、
        <a href="#" className="text-indigo-600">
          公式Xアカウント
        </a>
        からご連絡ください。
      </p>
    </div>
  );
}
