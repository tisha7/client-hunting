import Link from "next/link";

const leads = [
  {
    name: "Toddler Growth Coach",
    niche: "Parenting Coach",
    location: "USA",
    score: 94,
    status: "Follow-up",
    priority: "Hot",
  },
  {
    name: "Little Learners Academy",
    niche: "Education",
    location: "USA",
    score: 91,
    status: "New",
    priority: "Hot",
  },
  {
    name: "Happy Parent Club",
    niche: "Digital Product",
    location: "UK",
    score: 87,
    status: "Contacted",
    priority: "High",
  },
  {
    name: "Toddler Sleep Expert",
    niche: "Parenting",
    location: "Canada",
    score: 82,
    status: "Researched",
    priority: "High",
  },
  {
    name: "Parenting Success Hub",
    niche: "Coaching",
    location: "Australia",
    score: 76,
    status: "New",
    priority: "Medium",
  },
];

export default function LeadsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">

        <aside className="hidden w-64 border-r border-slate-800 bg-slate-900 p-6 md:block">
          <Link href="/" className="mb-10 block text-xl font-bold">
            🎯 Client Hunter
          </Link>

          <nav className="space-y-2 text-sm">
            <Link
              href="/"
              className="block rounded-lg px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              Dashboard
            </Link>

            <a className="block rounded-lg px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white">
              🔎 Lead Finder
            </a>

            <Link
              href="/leads"
              className="block rounded-lg bg-blue-600 px-4 py-3 font-medium"
            >
              👥 Leads
            </Link>

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

        <section className="flex-1 p-6 md:p-10">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm text-slate-400">
                Client Database
              </p>

              <h1 className="text-3xl font-bold">
                Leads
              </h1>
            </div>

            <Link
              href="/leads/new"
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-500"
            >
              + Add New Lead
            </Link>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Search leads..."
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none placeholder:text-slate-500 focus:border-blue-500"
            />

            <select className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500">
              <option>All Statuses</option>
              <option>New</option>
              <option>Researched</option>
              <option>Contacted</option>
              <option>Follow-up</option>
            </select>

            <select className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500">
              <option>All Priorities</option>
              <option>Hot</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="px-5 py-4">Company</th>
                  <th className="px-5 py-4">Niche</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Score</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Priority</th>
                </tr>
              </thead>

              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.name}
                    className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50"
                  >
                    <td className="px-5 py-4 font-medium">
                      {lead.name}
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {lead.niche}
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {lead.location}
                    </td>

                    <td className="px-5 py-4 font-semibold text-orange-400">
                      🔥 {lead.score}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                        {lead.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-slate-300">
                        {lead.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
