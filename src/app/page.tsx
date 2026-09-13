export default function Home() {
  const stats = [
    { label: "Total Leads", value: "142", change: "+12 this week" },
    { label: "New Leads", value: "18", change: "+5 today" },
    { label: "Follow-ups Today", value: "5", change: "Needs attention" },
    { label: "Clients Won", value: "3", change: "+1 this month" },
  ];

  const hotLeads = [
    {
      name: "Toddler Growth Coach",
      niche: "Parenting Coach",
      score: 94,
      status: "Follow-up",
      action: "Today",
    },
    {
      name: "Little Learners Academy",
      niche: "Education",
      score: 91,
      status: "New",
      action: "Contact",
    },
    {
      name: "Happy Parent Club",
      niche: "Digital Product",
      score: 87,
      status: "Contacted",
      action: "Sep 15",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-slate-800 bg-slate-900 p-6 md:block">
          <h1 className="mb-10 text-xl font-bold">
            🎯 Client Hunter
          </h1>

          <nav className="space-y-2 text-sm">
            <a className="block rounded-lg bg-blue-600 px-4 py-3 font-medium">
              Dashboard
            </a>

            <a className="block rounded-lg px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white">
              🔎 Lead Finder
            </a>

            <a className="block rounded-lg px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white">
              👥 Leads
            </a>

            <a className="block rounded-lg px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white">
              📊 Pipeline
            </a>

            <a className="block rounded-lg px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white">
              📅 Follow-ups
            </a>

            <a className="block rounded-lg px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white">
              📝 Templates
            </a>

            <a className="block rounded-lg px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white">
              ⚙️ Settings
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-6 md:p-10">

          {/* Header */}
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm text-slate-400">
                Client Acquisition Workspace
              </p>

              <h2 className="text-3xl font-bold">
                Dashboard 👋
              </h2>
            </div>

            <button className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-500">
              + Add New Lead
            </button>
          </div>

          {/* Stats */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                <p className="text-sm text-slate-400">
                  {stat.label}
                </p>

                <h3 className="mt-3 text-3xl font-bold">
                  {stat.value}
                </h3>

                <p className="mt-3 text-xs text-emerald-400">
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="mt-8 grid gap-8 xl:grid-cols-3">

            {/* Hot Leads */}
            <div className="xl:col-span-2 rounded-xl border border-slate-800 bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-800 p-5">
                <div>
                  <h3 className="font-semibold">
                    🔥 Hot Leads
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    High priority prospects
                  </p>
                </div>

                <button className="text-sm text-blue-400">
                  View all →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-800 text-slate-400">
                    <tr>
                      <th className="px-5 py-4">Lead</th>
                      <th className="px-5 py-4">Score</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Next Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {hotLeads.map((lead) => (
                      <tr
                        key={lead.name}
                        className="border-b border-slate-800 last:border-0"
                      >
                        <td className="px-5 py-4">
                          <p className="font-medium">
                            {lead.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {lead.niche}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span className="font-semibold text-orange-400">
                            🔥 {lead.score}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                            {lead.status}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-slate-300">
                          {lead.action}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="font-semibold">
                Quick Actions
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Continue your client hunting workflow
              </p>

              <div className="mt-6 space-y-3">
                <button className="w-full rounded-lg bg-blue-600 p-4 text-left hover:bg-blue-500">
                  🔎 Find Potential Clients
                </button>

                <button className="w-full rounded-lg border border-slate-700 p-4 text-left hover:bg-slate-800">
                  👥 Add New Lead
                </button>

                <button className="w-full rounded-lg border border-slate-700 p-4 text-left hover:bg-slate-800">
                  📅 View Follow-ups
                </button>

                <button className="w-full rounded-lg border border-slate-700 p-4 text-left hover:bg-slate-800">
                  📊 View Pipeline
                </button>
              </div>
            </div>
          </div>

          {/* Today's Focus */}
          <div className="mt-8 rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
            <h3 className="font-semibold">
              🎯 Today's Focus
            </h3>

            <p className="mt-2 text-slate-300">
              You have <span className="font-bold text-blue-400">5 follow-ups</span> due today
              and <span className="font-bold text-orange-400">3 hot leads</span> waiting for action.
            </p>
          </div>

        </section>
      </div>
    </main>
  );
}
