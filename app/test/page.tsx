"use client"; // クライアントコンポーネントとして宣言
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { XMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import AddItem from "./supaform";

// データの型定義
interface DataItem {
  id: number;
  name: string;
}

export default function Home() {
  const [data, setData] = useState<DataItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newName, setNewName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // 初期データの取得とリアルタイム監視
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("test").select("*");
      if (error) {
        setError(error.message);
      } else {
        setData(data || []);
      }
    };

    fetchData(); // 初回データ取得

    // Supabaseのリアルタイム機能でINSERTイベントを監視
    const channel = supabase
      .channel("public:test")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "test" },
        (payload) => {
          setData((prevData) => [...prevData, payload.new as DataItem]); // 新しいデータを追加
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "test" },
        (payload) => {
          setData((prevData) =>
            prevData.filter((item) => item.id !== payload.old.id)
          ); // 削除されたデータをリストから削除
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "test" },
        (payload) => {
          setData((prevData) =>
            prevData.map((item) =>
              item.id === payload.new.id ? (payload.new as DataItem) : item
            )
          ); // 更新されたデータをリストに反映
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // クリーンアップ
    };
  }, []);

  // データの削除処理
  const deleteItem = async (id: number) => {
    await supabase.from("test").delete().eq("id", id); // Supabaseでデータ削除
  };

  // 編集モードに切り替える
  const editItem = (id: number, name: string) => {
    setEditingId(id);
    setNewName(name);
  };

  // 編集内容を保存
  const saveItem = async (id: number) => {
    await supabase.from("test").update({ name: newName }).eq("id", id);
    setEditingId(null); //　編集モードを解除
  };

  return (
    <div className="container mx-auto w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-bold">Supabase Data</h1>

        {/* データの表示部分 */}
        {error ? (
          <div>Error loading data: {error}</div>
        ) : (
          <ul>
            {data.map((item: DataItem) => (
              <li
                key={item.id}
                className="flex gap-1 items-center justify-between py-2"
              >
                {editingId === item.id ? (
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveItem(item.id)}
                    className="border p-2 rounded-md w-full"
                  />
                ) : (
                  <>
                    {item.name}
                    <div className="flex gap-4 items-center">
                      <button onClick={() => editItem(item.id, item.name)}>
                        <PencilIcon className="w-3 h-3 text-gray-500" />
                      </button>
                      <button onClick={() => deleteItem(item.id)}>
                        <XMarkIcon className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                  </>
                )}
                {/* 保存ボタン */}
                {editingId === item.id && (
                  <button
                    onClick={() => saveItem(item.id)}
                    className="px-3 py-2 bg-blue-600 rounded-md text-white flex-shrink-0"
                  >
                    保存
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* フォームは常に表示 */}
        <AddItem />
      </div>
    </div>
  );
}
