"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AddItem() {
  const [name, setName] = useState("");

  const addItem = async () => {
    const { data, error } = await supabase
      .from("test") // テーブル名を指定
      .insert([{ name }]);

    if (error) {
      console.error(error);
    } else {
      console.log("Item added:", data);
    }
  };

  return (
    <div className="flex gap-3">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-[240px] h-10 text-black border rounded-md p-2"
      />
      <button
        onClick={addItem}
        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
      >
        Add Item
      </button>
    </div>
  );
}
