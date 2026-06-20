import axios from "axios";
import { ArrowLeft, Bell, FileText, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { backendUrl } from "../backendBaseUrl";
import toast from "react-hot-toast";

import { Notices } from "../components/Notices";
import { Files } from "../components/Files";
import { Members } from "../components/Members";

export function Room() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  const [roomName, setRoomName] = useState("");

  const [activeTab, setActiveTab] = useState<"notices" | "files" | "members">(
    "notices"
  );
  const navigate = useNavigate();

  useEffect(() => {
    async function getRoomDetails() {
      const endPoint =
        type === "my" ? "/room/get-my-rooms" : "/room/joined-rooms";
      try {
        const response = await axios.get(`${backendUrl}${endPoint}/${roomId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setRoomName(response.data.room.name);
      } catch (error: any) {
        toast.error(error ? error.message : "Something went wrong");
      }
    }
    getRoomDetails();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-zinc-200 p-6">
        <h1 className="text-2xl font-bold mb-2">Room Details</h1>

        <p className="text-zinc-500 text-sm mb-8">
          {type === "my" ? "Owner View" : "Member View"}
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex items-center gap-2 w-full px-4 py-3 border border-zinc-300 rounded-lg text-zinc-700 hover:bg-zinc-100 hover:border-zinc-400 transition-all duration-200"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="space-y-2">
          <button
            onClick={() => setActiveTab("notices")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === "notices"
                ? "bg-black text-white"
                : "hover:bg-zinc-100"
            }`}
          >
            <Bell size={18} />
            Notices
          </button>

          <button
            onClick={() => setActiveTab("files")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === "files"
                ? "bg-black text-white"
                : "hover:bg-zinc-100"
            }`}
          >
            <FileText size={18} />
            Files
          </button>

          {type === "my" && (
            <button
              onClick={() => setActiveTab("members")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === "members"
                  ? "bg-black text-white"
                  : "hover:bg-zinc-100"
              }`}
            >
              <Users size={18} />
              Members
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900">{roomName}</h1>

          <p className="text-zinc-500 mt-2">
            Manage notices, files, and team members.
          </p>
        </div>

        {activeTab === "notices" && <Notices roomId={roomId!} />}

        {activeTab === "files" && <Files roomId={roomId!} />}

        {activeTab === "members" && type === "my" && (
          <Members roomId={roomId!} />
        )}
      </div>
    </div>
  );
}
