import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CreateRooms } from "../components/CreateRooms";
import { backendUrl } from "../backendBaseUrl";
import { Sidebar } from "../components/Sidebar";

export function Dashboard() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<"myRooms" | "joinedRooms">(
    "myRooms"
  );

  useEffect(() => {
    async function getRooms() {
      try {
        setLoading(true);

        const endpoint =
          activeTab === "myRooms" ? "/room/get-my-rooms" : "/room/joined-rooms";

        const response = await axios.get(`${backendUrl}${endpoint}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setRooms(response.data.rooms);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    getRooms();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsOpen={setIsOpen}
      />

      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-8">
          {activeTab === "myRooms" ? "Your Rooms" : "Joined Rooms"}
        </h1>

        {isOpen && (
          <CreateRooms
            onClose={() => setIsOpen(false)}
            onSuccess={() => {
              setIsOpen(false);
            }}
          />
        )}

        {loading ? (
          <div className="text-zinc-500 flex justify-center">
            Loading rooms...
          </div>
        ) : rooms.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-xl p-8 text-center">
            <h2 className="text-xl font-semibold">No rooms available</h2>

            <p className="text-zinc-500 mt-2">
              {activeTab === "myRooms"
                ? "Create your first room to get started."
                : "You haven't joined any rooms yet."}
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
