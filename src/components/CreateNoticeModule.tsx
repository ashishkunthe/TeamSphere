import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { backendUrl } from "../backendBaseUrl";

export function CreateNoticeModule({
  roomId,
  setIsOpen,
}: {
  roomId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function createNotice() {
    if (!title.trim() || !description.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${backendUrl}/notice/create-notice/${roomId}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      toast.success(response.data.message);

      setTitle("");
      setDescription("");

      setIsOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Create Notice</h2>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-zinc-100 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Notice Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-zinc-300 rounded-lg p-3 outline-none focus:border-black"
          />

          <textarea
            placeholder="Write your notice..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-40 border border-zinc-300 rounded-lg p-3 outline-none resize-none focus:border-black"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="px-5 py-3 border border-zinc-300 rounded-lg hover:bg-zinc-100"
            >
              Cancel
            </button>

            <button
              onClick={createNotice}
              disabled={loading}
              className="px-5 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Notice"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
