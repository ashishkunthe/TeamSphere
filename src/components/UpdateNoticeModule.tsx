import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { backendUrl } from "../backendBaseUrl";

interface UpdateNoticeModuleProps {
  roomId: string;
  notice: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UpdateNoticeModule({
  roomId,
  notice,
  setIsOpen,
}: UpdateNoticeModuleProps) {
  const [title, setTitle] = useState(notice.title);
  const [description, setDescription] = useState(notice.description);

  const [loading, setLoading] = useState(false);

  async function updateNotice() {
    if (!title.trim() || !description.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.patch(
        `${backendUrl}/notice/update-notice/${notice._id}/${roomId}`,
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

      setIsOpen(false);

      window.location.reload();
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
          <h2 className="text-2xl font-bold">Update Notice</h2>

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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your notice..."
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
              onClick={updateNotice}
              disabled={loading}
              className="px-5 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Notice"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
