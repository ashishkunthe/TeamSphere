import { useState } from "react";
import { createRoomTypes } from "../types/roomTypes";
import toast from "react-hot-toast";
import axios from "axios";
import { backendUrl } from "../backendBaseUrl";
interface CreateRoomsProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateRooms({ onClose, onSuccess }: CreateRoomsProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function createRoom() {
    try {
      const inputs = createRoomTypes.safeParse({ name, description });

      if (!inputs.success) {
        toast.error("Invalid Inputs");
        return;
      }

      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/room/create-room`,
        {
          name,
          description,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      toast.success(response.data.message);

      setName("");
      setDescription("");
      setLoading(false);
      onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Room</h2>

          <button onClick={onClose} className="text-zinc-500 hover:text-black">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Room Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-zinc-300 rounded-lg p-3 outline-none focus:border-black"
          />

          <textarea
            placeholder="Room Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-zinc-300 rounded-lg p-3 outline-none focus:border-black h-28 resize-none"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-zinc-300 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={createRoom}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800"
            >
              {loading ? "Loading.." : "Create Room"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
