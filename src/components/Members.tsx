import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../backendBaseUrl";
import toast from "react-hot-toast";
import { Search, UserMinus, UserPlus } from "lucide-react";

export function Members({ roomId }: { roomId: string }) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  const [searchLoading, setSearchLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    async function searchUsers() {
      if (!query.trim()) {
        setUsers([]);
        return;
      }

      try {
        setSearchLoading(true);
        const response = await axios.get(
          `${backendUrl}/user/search-users?query=${query}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        console.log("SEARCH RESPONSE:", response.data);

        setUsers(response.data.users);
      } catch (error) {
        console.log("SEARCH ERROR:", error);
      } finally {
        setSearchLoading(false);
      }
    }

    const timer = setTimeout(() => {
      searchUsers();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  async function addMember(memberId: any) {
    try {
      setActionLoading(memberId);
      const response = await axios.post(
        `${backendUrl}/room/add-member/${roomId}`,
        { memberId },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setActionLoading(null);
    }
  }

  async function removeMember(memberId: any) {
    try {
      setActionLoading(memberId);
      const response = await axios.delete(
        `${backendUrl}/room/delete-member/${roomId}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
          data: { memberId },
        }
      );
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-2">Manage Members</h2>

        <p className="text-zinc-500 mb-6">
          Search users and add them to your room.
        </p>

        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            type="text"
            placeholder="Search users by username..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-zinc-300 rounded-lg outline-none focus:border-black"
          />
        </div>
      </div>

      {searchLoading && (
        <div className="mt-4 text-zinc-500 flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-zinc-300 border-t-black rounded-full animate-spin"></div>
          Searching users...
        </div>
      )}

      {query && users.length === 0 && (
        <div className="bg-white border border-zinc-200 rounded-xl p-8 text-center">
          <p className="text-zinc-500">No users found.</p>
        </div>
      )}

      {users.length > 0 && (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white border border-zinc-200 rounded-xl p-5 flex items-center justify-between hover:shadow-sm transition"
            >
              <div>
                <h3 className="font-semibold text-lg">{user.username}</h3>

                <p className="text-zinc-500 text-sm">{user.email}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => addMember(user._id)}
                  disabled={actionLoading === user._id}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition disabled:opacity-50"
                >
                  {actionLoading === user._id ? (
                    <div className="w-4 h-4 border-2 border-zinc-300 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <UserPlus size={16} />
                      Add
                    </>
                  )}
                </button>

                <button
                  onClick={() => removeMember(user._id)}
                  disabled={actionLoading === user._id}
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-100 transition disabled:opacity-50"
                >
                  {actionLoading === user._id ? (
                    <div className="w-4 h-4 border-2 border-zinc-300 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <UserMinus size={16} />
                      Remove
                    </>
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
