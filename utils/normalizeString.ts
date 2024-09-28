export default function normalizeString(str: string) {
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
}

// utils/normalizeText.js
import { toHiragana, toKana } from "wanakana";

export function normalizeText(text: string) {
  // 全角・半角の統一
  let normalized = text.normalize("NFKC");
  // カタカナをひらがなに変換
  normalized = toHiragana(normalized);
  // ローマ字をひらがなに変換
  normalized = toKana(normalized);
  // 小文字化
  normalized = normalized.toLowerCase();
  // スペースの除去
  normalized = normalized.replace(/\s+/g, "");
  return normalized;
}
