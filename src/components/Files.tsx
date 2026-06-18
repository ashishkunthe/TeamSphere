import axios from "axios";
import { FileText, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { backendUrl } from "../backendBaseUrl";
import { FileUpload } from "./FileUpload";

export function Files({ roomId }: { roomId: string }) {
  const [files, setFiles] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  async function getFiles() {
    try {
      const response = await axios.get(`${backendUrl}/file/files/${roomId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setFiles(response.data.files);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  async function deleteFile(fileId: string) {
    try {
      const response = await axios.delete(
        `${backendUrl}/file/delete-file/${roomId}/${fileId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      toast.success(response.data.message);

      setFiles((prev) => prev.filter((file) => file._id !== fileId));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    getFiles();
  }, []);

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

      {isOpen && <FileUpload roomId={roomId} setIsOpen={setIsOpen} />}

      {files.length === 0 ? (
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
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
