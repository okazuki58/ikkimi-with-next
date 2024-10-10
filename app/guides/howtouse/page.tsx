// app/how-to-use/page.tsx
export default function HowToUse() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-center py-20">
        <h1 className="text-3xl font-bold text-indigo-600">Ikkimiの使い方</h1>
      </div>

      <section className="mb-14">
        <p className="text-indigo-300 text-5xl font-bold mb-2">01</p>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          アカウントの作成
        </h2>
        <p>
          Ikkimiを利用するには、最初にアカウントを作成する必要があります。Googleアカウントを使用して簡単に登録できます。※現在はGoogleアカウントのみでの登録が可能です。
        </p>
      </section>

      <section className="mb-14">
        <p className="text-indigo-300 text-5xl font-bold mb-2">02</p>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          ブックマークの活用
        </h2>
        <p>
          気になる漫画を見つけたら、ブックマーク機能を使って保存しましょう。ブックマークした作品は、後から簡単にマイページから確認できます。
        </p>
      </section>

      <section className="mb-14">
        <p className="text-indigo-300 text-5xl font-bold mb-2">03</p>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          おすすめ作品の確認
        </h2>
        <p>
          あなたがブックマークした作品や、他のユーザーがブックマークしている作品を基に、Ikkimiが新しいおすすめ作品を提案します。毎日更新されるのでチェックしてみてください。
        </p>
      </section>

      <section className="mb-14">
        <p className="text-indigo-300 text-5xl font-bold mb-2">04</p>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          ランキングと急上昇作品
        </h2>
        <p>
          ランキングや急上昇の漫画セクションを活用して、今人気の作品を確認できます。ブックマーク数に基づいてランキング付けされているので、今注目されている作品をすぐに把握できます。
        </p>
      </section>

      <section className="mb-14">
        <p className="text-indigo-300 text-5xl font-bold mb-2">05</p>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          プロフィールの編集
        </h2>
        <p>
          マイページでプロフィールを編集し、自分のアバターやユーザー名を自由にカスタマイズできます。また、ブックマークした作品のリストも確認可能です。
        </p>
      </section>

      <section className="mb-14">
        <p className="text-indigo-300 text-5xl font-bold mb-2">06</p>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          作品の詳細モーダル
        </h2>
        <p>
          各作品の詳細モーダルでは、作品のあらすじや著者情報を確認できます。また、他のユーザーのブックマーク数も表示されますので、人気の度合いも把握できます。
        </p>
      </section>
    </div>
  );
}
