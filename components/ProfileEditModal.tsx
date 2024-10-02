import { useProfile } from "@/app/context/ProfileContext";
import { getAvatarUrl } from "@/app/lib/data";
import { supabase } from "@/utils/supabaseClient";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose }) => {
  const { profile } = useProfile();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [name, setName] = useState(profile?.name || "");
  const [bio, setBio] = useState(profile?.bio || "");

  useEffect(() => {
    if (isOpen) {
      setName(profile?.name || "");
      setBio(profile?.bio || "");
    }
  }, [isOpen, profile]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSizeInBytes = 2 * 1024 * 1024; // 5MB の制限

      // ファイルサイズの制限を超えている場合はエラーメッセージを表示
      if (file.size > maxSizeInBytes) {
        alert("画像のサイズが大きすぎます。5MB以下の画像を選択してください。");
        return;
      }

      // ファイルを読み込んでプレビューURLを作成
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string); // プレビュー用URLを保存
      };
      reader.readAsDataURL(file);

      console.log("画像が選択されました:", file);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full sm:max-w-2xl sm:p-4 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <form
                onSubmit={async (event) => {
                  event.preventDefault();

                  const target = event.target as typeof event.target & {
                    name: { value: string };
                    bio: { value: string };
                    avatar: { files: FileList };
                  };

                  const name = target.name.value;
                  const bio = target.bio.value;
                  const avatarFile = target.avatar.files?.[0];

                  try {
                    let avatarUrl = profile?.avatar_url;

                    // 画像が選択されている場合にアップロード処理
                    if (avatarFile) {
                      const { error: storageError } = await supabase.storage
                        .from("avatars")
                        .upload(
                          `${profile?.id}/${avatarFile.name}`,
                          avatarFile,
                          {
                            cacheControl: "3600",
                            upsert: true, // 既存のファイルがあれば上書き
                          }
                        );

                      if (storageError) {
                        console.error(
                          "画像のアップロード中にエラーが発生しました:",
                          storageError
                        );
                        return;
                      }

                      // アップロード成功時にファイル名を生成
                      avatarUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${profile?.id}/${avatarFile.name}`;
                    }

                    const { data, error } = await supabase
                      .from("profiles")
                      .update({
                        name: name,
                        bio: bio,
                        avatar_url: avatarUrl,
                      })
                      .eq("id", profile?.id); // ユーザーのIDを指定

                    if (error) {
                      console.error(
                        "プロフィールの更新中にエラーが発生しました:",
                        error
                      );
                    } else {
                      console.log("プロフィールが更新されました:", data);
                      window.location.reload();
                      onClose();
                    }
                  } catch (error) {
                    console.error("データベース更新時にエラー", error);
                  }
                }}
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center">
                  <button className="md:hover:bg-gray-100 transition rounded-full p-2">
                    <XMarkIcon className="size-5" />
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2 bg-gray-900 rounded-full text-white font-bold md:hover:bg-gray-700"
                  >
                    保存
                  </button>
                </div>

                {profile && (
                  <div className="mt-3 text-center sm:mt-5">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden">
                      <Image
                        src={previewUrl || profile.avatar_url}
                        alt={`${profile.name}のアバター`}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gray-900/30"></div>
                      {/* ファイル選択用のinputを非表示にする */}
                      <input
                        type="file"
                        accept="image/*"
                        id="avatar"
                        className="hidden"
                        onChange={(e) => handleImageChange(e)} // ファイルが選択されたら実行される関数
                      />
                      <label
                        htmlFor="avatar"
                        className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] rounded-full bg-gray-900/50 md:hover:bg-gray-900/40 p-4 cursor-pointer"
                      >
                        <CameraIcon className="size-6 text-slate-300" />
                      </label>
                    </div>
                    <div className="my-6 flex flex-col gap-4">
                      <div className="flex flex-col justify-start">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="name"
                            className="w-full text-left text-sm text-gray-600 mb-2"
                          >
                            名前
                          </label>
                          <span className="text-sm text-gray-500">
                            {name.length}/50
                          </span>
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                          maxLength={50}
                          onChange={handleNameChange}
                          className="p-2 w-full rounded-md border border-gray-300 text-md"
                        />
                      </div>

                      <div className="flex flex-col justify-start">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="bio"
                            className="w-full text-left text-sm text-gray-600 mb-2"
                          >
                            自己紹介
                          </label>
                          <span className="text-sm text-gray-500">
                            {bio.length}/160
                          </span>
                        </div>
                        <textarea
                          id="bio"
                          name="bio"
                          value={bio}
                          onChange={handleBioChange}
                          maxLength={160}
                          className="p-2 w-full rounded-md border border-gray-300 text-md"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalComponent;
