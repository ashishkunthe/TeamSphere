export function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      {" "}
      <nav className="flex items-center justify-between px-8 py-6 border-b bg-white">
        {" "}
        <h1 className="text-2xl font-bold">TeamSphere</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 border rounded-lg hover:bg-slate-100">
            Login
          </button>

          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-slate-800">
            Get Started
          </button>
        </div>
      </nav>
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Collaborate Better.
          <br />
          Manage Teams Smarter.
        </h1>

        <p className="mt-8 text-lg text-slate-600 max-w-3xl mx-auto">
          TeamSphere is a collaborative workspace designed for teams,
          freelancers, students, and organizations to work together in one
          place. Create rooms, invite members, share files, publish notices, and
          keep everyone aligned without switching between multiple tools.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-slate-800">
            Create Workspace
          </button>

          <button className="px-6 py-3 border rounded-lg hover:bg-slate-100">
            Learn More
          </button>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything Your Team Needs
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-3">
              Create Collaboration Rooms
            </h3>

            <p className="text-slate-600">
              Organize projects, departments, study groups, or teams into
              dedicated rooms where members can collaborate effectively.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-3">
              Share Important Notices
            </h3>

            <p className="text-slate-600">
              Keep everyone informed with announcements, project updates,
              deadlines, meeting schedules, and important information.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-3">Secure File Sharing</h3>

            <p className="text-slate-600">
              Upload and manage documents, PDFs, images, and resources so every
              team member has access to the latest information.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose TeamSphere?
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-3">
                Simplified Team Management
              </h3>

              <p className="text-slate-600">
                Create rooms, manage members, organize discussions, and keep
                work structured without unnecessary complexity.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Built for Productivity
              </h3>

              <p className="text-slate-600">
                Reduce communication gaps by keeping files, notices, and team
                members connected in a single workspace.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Lightweight and Fast
              </h3>

              <p className="text-slate-600">
                TeamSphere focuses on essential collaboration features without
                overwhelming users with unnecessary tools.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Perfect for Modern Teams
              </h3>

              <p className="text-slate-600">
                Whether you're working on a startup, college project, freelance
                team, or company initiative, TeamSphere helps your team stay
                organized.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold">Bring Your Team Together</h2>

          <p className="mt-6 text-slate-600 text-lg">
            Create rooms, invite members, share files, publish notices, and
            build a more organized workflow with TeamSphere.
          </p>

          <button className="mt-8 px-8 py-4 bg-black text-white rounded-lg hover:bg-slate-800">
            Get Started Today
          </button>
        </div>
      </section>
      <footer className="border-t bg-white py-6 text-center text-slate-500">
        © 2026 TeamSphere. Built for seamless collaboration.
      </footer>
    </div>
  );
}
