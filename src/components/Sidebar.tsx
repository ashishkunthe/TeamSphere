import { FolderKanban, Users, Plus } from "lucide-react";

interface SidebarProps {
  activeTab: "myRooms" | "joinedRooms";
  setActiveTab: React.Dispatch<React.SetStateAction<"myRooms" | "joinedRooms">>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Sidebar({ activeTab, setActiveTab, setIsOpen }: SidebarProps) {
  return (
    <div className="w-72 bg-white border-r border-zinc-200 p-6">
      <h1 className="text-2xl font-bold mb-8">TeamSphere</h1>

      <div className="space-y-2">
        <button
          onClick={() => setActiveTab("myRooms")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activeTab === "myRooms"
              ? "bg-black text-white"
              : "hover:bg-zinc-100"
          }`}
        >
          <FolderKanban size={18} />
          Your Rooms
        </button>

        <button
          onClick={() => setActiveTab("joinedRooms")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activeTab === "joinedRooms"
              ? "bg-black text-white"
              : "hover:bg-zinc-100"
          }`}
        >
          <Users size={18} />
          Joined Rooms
        </button>
      </div>

      {activeTab === "myRooms" && (
        <button
          onClick={() => setIsOpen(true)}
          className="mt-8 w-full flex items-center justify-center gap-2 py-3 bg-black text-white rounded-lg hover:bg-zinc-800"
        >
          <Plus size={18} />
          Create Room
        </button>
      )}
    </div>
  );
}
