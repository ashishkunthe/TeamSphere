import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CreateRooms } from "../components/CreateRooms";
import { backendUrl } from "../backendBaseUrl";

export function Dashboard() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function getRooms() {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/room/get-my-rooms`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setRooms(response.data.rooms);
        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
    getRooms();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">My Rooms</h1>

          <button
            onClick={() => setIsOpen(true)}
            className="px-5 py-3 bg-black text-white rounded-lg hover:bg-zinc-800"
          >
            + Create Room
          </button>
        </div>
        {isOpen && (
          <CreateRooms
            onClose={() => setIsOpen(false)}
            onSuccess={() => {
              setIsOpen(false);
            }}
          />
        )}

        {loading ? (
          <div className="text-zinc-500">Loading rooms...</div>
        ) : rooms.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-xl p-8 text-center">
            <h2 className="text-xl font-semibold">No rooms yet</h2>

            <p className="text-zinc-500 mt-2">
              Create your first room to get started.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room: any) => (
              <div
                key={room._id}
                className="bg-white border border-zinc-200 rounded-xl p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold">{room.name}</h2>

                <p className="text-zinc-500 mt-2">{room.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
