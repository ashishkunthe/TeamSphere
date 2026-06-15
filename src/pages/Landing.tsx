import {
  Users,
  Bell,
  FileText,
  ShieldCheck,
  Zap,
  FolderKanban,
  Rocket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">TeamSphere </h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-lg border border-zinc-300 hover:bg-zinc-100 transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-5 py-2 rounded-lg bg-black text-white hover:bg-zinc-800 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="bg-linear-to-b from-white via-zinc-50 to-zinc-100 pt-40 pb-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-300 text-sm mb-8 bg-white">
            <Rocket size={16} />
            Modern Team Collaboration Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Build Better Teams.
            <br />
            Work Smarter Together.
          </h1>

          <p className="max-w-3xl mx-auto mt-8 text-lg md:text-xl text-zinc-600">
            TeamSphere is a modern collaboration platform that helps teams stay
            connected, organized, and productive. Create workspaces, manage
            members, share files, publish notices, and keep everyone aligned
            from one central hub.
          </p>

          <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-zinc-800 transition"
            >
              Start Collaborating
            </button>

            <button className="px-8 py-4 border border-zinc-300 rounded-xl hover:bg-zinc-100 transition">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            <div>
              <h3 className="text-2xl font-semibold">Secure</h3>
              <p className="text-zinc-500">Protected Workspaces</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold">Fast</h3>
              <p className="text-zinc-500">Real Productivity</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold">Organized</h3>
              <p className="text-zinc-500">Structured Teams</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold">Focused</h3>
              <p className="text-zinc-500">Less Noise</p>
            </div>
          </div>

          <div className="mt-24 max-w-4xl mx-auto">
            <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-2xl">
              <div className="border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
                <h3 className="font-semibold">Frontend Team</h3>

                <div className="flex gap-6 text-sm text-zinc-500">
                  <span>Members</span>
                  <span>Notices</span>
                  <span>Files</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-zinc-50 rounded-xl p-4 text-left border border-zinc-200">
                  <h4 className="font-medium">Meeting Tomorrow</h4>
                  <p className="text-zinc-500 text-sm mt-1">
                    Team sync scheduled for 5:00 PM.
                  </p>
                </div>

                <div className="bg-zinc-50 rounded-xl p-4 text-left border border-zinc-200">
                  <h4 className="font-medium">requirements.pdf</h4>
                  <p className="text-zinc-500 text-sm mt-1">
                    Shared by Ashish.
                  </p>
                </div>

                <div className="bg-zinc-50 rounded-xl p-4 text-left border border-zinc-200">
                  <h4 className="font-medium">Deployment Update</h4>
                  <p className="text-zinc-500 text-sm mt-1">
                    Production deployment planned for tonight.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">
            Everything You Need To Run A Team
          </h2>

          <p className="text-center text-zinc-600 mb-16 max-w-2xl mx-auto">
            Designed to help teams stay productive without juggling multiple
            tools and platforms.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Team Workspaces",
                desc: "Create dedicated rooms for projects, departments, study groups, and communities.",
              },
              {
                icon: Bell,
                title: "Smart Announcements",
                desc: "Share updates, deadlines, meetings, and important information with your team.",
              },
              {
                icon: FileText,
                title: "File Sharing",
                desc: "Upload PDFs, images, documents, and resources so everyone has access to the latest information.",
              },
              {
                icon: ShieldCheck,
                title: "Secure Access",
                desc: "Manage room members and keep access limited to authorized users.",
              },
              {
                icon: Zap,
                title: "Fast Collaboration",
                desc: "Stay productive with a lightweight and focused collaboration experience.",
              },
              {
                icon: FolderKanban,
                title: "Organized Workspaces",
                desc: "Keep projects, notices, files, and members organized in one place.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-zinc-200 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-xl hover:border-zinc-400 transition-all duration-300"
              >
                <feature.icon size={40} className="text-zinc-700" />

                <h3 className="text-xl font-semibold mt-5 mb-3">
                  {feature.title}
                </h3>

                <p className="text-zinc-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Why Choose TeamSphere?</h2>

          <p className="text-lg text-zinc-600 leading-relaxed">
            Most teams waste time switching between messaging apps, cloud
            storage platforms, and project management tools.
            <br />
            <br />
            TeamSphere brings everything together into one focused workspace
            where communication, files, notices, and team members stay connected
            and organized.
          </p>
        </div>
      </section>

      <section className="bg-zinc-900 py-24 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold">Ready To Organize Your Team?</h2>

          <p className="mt-6 text-zinc-300 text-lg">
            Create your first workspace in minutes and experience a simpler way
            to collaborate.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="mt-10 px-10 py-4 bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 transition"
          >
            Create Workspace
          </button>
        </div>
      </section>

      <footer className="bg-black border-t border-zinc-800 py-8 text-center text-zinc-500">
        © 2026 TeamSphere • Built for modern collaboration.
      </footer>
    </div>
  );
}
