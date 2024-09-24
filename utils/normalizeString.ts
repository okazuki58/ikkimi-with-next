export default function normalizeString (str: string) {
  if (!str) return ""; // undefined または null の場合は空文字を返す
  return (
    str
      .normalize("NFKC")
      // カタカナをひらがなに変換
      .replace(/[\u30A1-\u30FA]/g, (match) =>
        String.fromCharCode(match.charCodeAt(0) - 0x60)
      )
      // 半角カナを全角に変換
      .replace(/[\uff66-\uff9d]/g, (match) =>
        String.fromCharCode(match.charCodeAt(0) - 0xcf25)
      )
  );
};
