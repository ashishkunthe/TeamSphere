import axios from "../axios/axios";
import { FileText, Loader, Trash2, Upload, User } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { backendUrl } from "../backendBaseUrl";
import { FileUpload } from "./FileUpload";

export function Files({ roomId, newFile }: { roomId: string; newFile: any }) {
  const [files, setFiles] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);

  async function getFiles() {
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendUrl}/file/files/${roomId}`,
        {}
      );

      setLoading(false);
      setFiles(response.data.files);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  async function deleteFile(fileId: string) {
    try {
      setDeletingFileId(fileId);

      const response = await axios.delete(
        `${backendUrl}/file/delete-file/${roomId}/${fileId}`
      );

      toast.success(response.data.message);

      setFiles((prev) => prev.filter((file) => file._id !== fileId));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setDeletingFileId(null);
    }
  }

  useEffect(() => {
    getFiles();
  }, []);

  useEffect(() => {
    if (!newFile) return;

    setFiles((prev) => {
      const alreadyExists = prev.some((notice) => notice._id === newFile._id);

      if (alreadyExists) {
        return prev;
      }

      return [newFile, ...prev];
    });
  }, [newFile]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Files</h2>

          <p className="text-zinc-500 mt-1">Upload and manage room files.</p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-lg hover:bg-zinc-800"
        >
          <Upload size={18} />
          Upload File
        </button>
      </div>

      {isOpen && (
        <FileUpload
          roomId={roomId}
          setIsOpen={setIsOpen}
          refreshFile={getFiles}
        />
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white border border-zinc-200 rounded-xl p-5 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-zinc-200"></div>

                <div className="flex-1">
                  <div className="h-5 w-48 bg-zinc-200 rounded mb-2"></div>

                  <div className="h-4 w-72 bg-zinc-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : files.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-xl p-10 text-center">
          <h3 className="text-lg font-semibold">No files uploaded</h3>

          <p className="text-zinc-500 mt-2">Upload your first file.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {files.map((file) => (
            <div
              key={file._id}
              className="bg-white border border-zinc-200 rounded-xl p-5 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <FileText />

                <div>
                  <h3 className="font-semibold">{file.fileName}</h3>

                  <p className="text-sm text-zinc-500">{file.description}</p>
                  <p className="text-sm text-zinc-500 flex items-center gap-1.5 mt-1">
                    <User className="w-4 h-4" />
                    <span>{file.uploadedBy.username}</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={file.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 border rounded-lg hover:bg-zinc-100"
                >
                  Open
                </a>

                <button
                  onClick={() => deleteFile(file._id)}
                  className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                >
                  {deletingFileId === file._id ? (
                    <Loader className="animate-spin" size={18} />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
