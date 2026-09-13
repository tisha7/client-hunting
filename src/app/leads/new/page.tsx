import Link from "next/link";

export default function NewLeadPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">

        {/* Sidebar */}
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
          </nav>
        </aside>

        {/* Main */}
        <section className="flex-1 p-6 md:p-10">
          <div className="mx-auto max-w-4xl">

            <div className="mb-8">
              <Link
                href="/leads"
                className="text-sm text-slate-400 hover:text-white"
              >
                ← Back to Leads
              </Link>

              <h1 className="mt-4 text-3xl font-bold">
                Add New Lead
              </h1>

              <p className="mt-2 text-slate-400">
                Save a potential client to your CRM.
              </p>
            </div>

            <form className="space-y-8">

              {/* Business Information */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-6 text-lg font-semibold">
                  🏢 Business Information
                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Company Name *
                    </label>

                    <input
                      type="text"
                      placeholder="Example Company"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Website
                    </label>

                    <input
                      type="url"
                      placeholder="https://example.com"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Country
                    </label>

                    <input
                      type="text"
                      placeholder="USA"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      City / Area
                    </label>

                    <input
                      type="text"
                      placeholder="Orlando"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Niche
                    </label>

                    <input
                      type="text"
                      placeholder="Cleaning Services"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Business Type
                    </label>

                    <input
                      type="text"
                      placeholder="Local Business"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
                    />
                  </div>

                </div>
              </div>

              {/* Contact Information */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-6 text-lg font-semibold">
                  👤 Contact Information
                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Decision Maker
                    </label>

                    <input
                      type="text"
                      placeholder="Full name"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Role
                    </label>

                    <input
                      type="text"
                      placeholder="Owner / Founder"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Email
                    </label>

                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Phone
                    </label>

                    <input
                      type="tel"
                      placeholder="+1 000 000 0000"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
                    />
                  </div>

                </div>
              </div>

              {/* Lead Qualification */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-6 text-lg font-semibold">
                  🎯 Lead Qualification
                </h2>

                <div className="grid gap-5 md:grid-cols-3">

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Lead Score
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="85"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Priority
                    </label>

                    <select className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500">
                      <option>Medium</option>
                      <option>Hot</option>
                      <option>High</option>
                      <option>Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Status
                    </label>

                    <select className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500">
                      <option>New</option>
                      <option>Researched</option>
                      <option>Contacted</option>
                      <option>Replied</option>
                      <option>Follow-up</option>
                      <option>Won</option>
                      <option>Closed</option>
                    </select>
                  </div>

                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm text-slate-300">
                    Service Opportunity
                  </label>

                  <input
                    type="text"
                    placeholder="Landing Page, Website Redesign, CRO..."
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
                  />
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm text-slate-300">
                    Research Notes
                  </label>

                  <textarea
                    rows={6}
                    placeholder="Website problems, business information, potential opportunities..."
                    className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Link
                  href="/leads"
                  className="rounded-lg border border-slate-700 px-6 py-3 text-center hover:bg-slate-800"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-500"
                >
                  Save Lead
                </button>
              </div>

            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
