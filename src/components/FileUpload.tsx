import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { backendUrl } from "../backendBaseUrl";

export function FileUpload({
  roomId,
  setIsOpen,
}: {
  roomId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function uploadFile() {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("description", description);

      const response = await axios.post(
        `${backendUrl}/file/upload-file/${roomId}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);

      setIsOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upload File</h2>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-zinc-100 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.docx"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];

              if (!selectedFile) return;

              const allowedTypes = [
                "application/pdf",
                "image/png",
                "image/jpeg",
                "image/jpg",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ];

              if (!allowedTypes.includes(selectedFile.type)) {
                toast.error(
                  "Only PDF, PNG, JPG, JPEG and DOCX files are allowed"
                );
                return;
              }

              setFile(selectedFile);
            }}
            className="w-full border border-zinc-300 rounded-lg p-3"
          />

          <p className="text-sm text-zinc-500">
            Supported formats: PDF, PNG, JPG, JPEG, DOCX
          </p>

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-zinc-300 rounded-lg p-3 h-32 resize-none"
          />

          <button
            onClick={uploadFile}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-zinc-800"
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      </div>
    </div>
  );
}
