import { BellPlus, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateNoticeModule } from "./CreateNoticeModule";
import axios from "axios";
import { backendUrl } from "../backendBaseUrl";
import toast from "react-hot-toast";
import { UpdateNoticeModule } from "./UpdateNoticeModule";

export function Notices({ roomId }: { roomId: string }) {
  const [notices, setNotices] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedNotice, setSelectedNotice] = useState<any>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  async function getNotices() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/notice/notices/${roomId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setNotices(response.data.notices);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error ? error.message : "Something went wrong");
    }
  }

  useEffect(() => {
    getNotices();
  }, []);

  async function deleteNotice(noticeId: string) {
    try {
      const response = await axios.delete(
        `${backendUrl}/notice/delete-notice/${noticeId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      toast.success(response.data.message);

      setNotices((prev) => prev.filter((notice) => notice._id !== noticeId));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  function updateNotice(notice: any) {
    setSelectedNotice(notice);
    setIsUpdateOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Notices</h2>

          <p className="text-zinc-500 mt-1">
            Share updates and announcements with room members.
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition"
        >
          <BellPlus size={18} />
          Create Notice
        </button>
      </div>

      {isOpen && (
        <CreateNoticeModule
          roomId={roomId}
          setIsOpen={setIsOpen}
          refreshNotices={getNotices}
        />
      )}

      {isUpdateOpen && selectedNotice && (
        <UpdateNoticeModule
          roomId={roomId}
          notice={selectedNotice}
          setIsOpen={setIsUpdateOpen}
        />
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white border border-zinc-200 rounded-xl p-6 animate-pulse"
            >
              <div className="h-6 w-48 bg-zinc-200 rounded mb-4"></div>

              <div className="h-4 w-full bg-zinc-200 rounded mb-2"></div>

              <div className="h-4 w-4/5 bg-zinc-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : notices.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-xl p-10 text-center">
          <h3 className="text-lg font-semibold">No notices yet</h3>

          <p className="text-zinc-500 mt-2">
            Create your first notice to keep everyone informed.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice._id}
              className="bg-white border border-zinc-200 rounded-xl p-6 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900">
                    {notice.title}
                  </h3>

                  <p className="text-zinc-500 text-sm mt-1">
                    By {notice.ownerId?.username}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => updateNotice(notice)}
                    className="p-2 rounded-lg hover:bg-zinc-100"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => deleteNotice(notice._id)}
                    className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <p className="mt-4 text-zinc-700 whitespace-pre-wrap">
                {notice.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
