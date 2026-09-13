import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*");

  const allLeads = leads || [];

  const totalLeads = allLeads.length;

  const hotLeads = allLeads.filter(
    (lead) => Number(lead.lead_score) >= 17
  ).length;

  const warmLeads = allLeads.filter((lead) => {
    const score = Number(lead.lead_score) || 0;
    return score >= 13 && score < 17;
  }).length;

  const lowLeads = allLeads.filter(
    (lead) => Number(lead.lead_score) < 13
  ).length;

  const followUps = allLeads.filter(
    (lead) =>
      lead.status?.toLowerCase() === "follow-up" ||
      lead.status?.toLowerCase() === "follow up"
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-6 md:p-10">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">
              🎯 Client Hunting CRM
            </h1>

            <p className="mt-2 text-slate-400">
              Track, organize and manage your potential clients.
            </p>
          </div>

          <Link
            href="/leads/new"
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-500"
          >
            + Add New Lead
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
            Error loading dashboard data: {error.message}
          </div>
        )}

        {/* Stats */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Total Leads
            </p>

            <p className="mt-3 text-3xl font-bold">
              {totalLeads}
            </p>

            <Link
              href="/leads"
              className="mt-3 inline-block text-sm text-blue-400 hover:text-blue-300"
            >
              View all leads →
            </Link>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
            <p className="text-sm text-slate-400">
              🔥 Hot Leads
            </p>

            <p className="mt-3 text-3xl font-bold text-red-400">
              {hotLeads}
            </p>

            <p className="mt-3 text-sm text-slate-400">
              Score 17+
            </p>
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <p className="text-sm text-slate-400">
              🟡 Warm Leads
            </p>

            <p className="mt-3 text-3xl font-bold text-yellow-400">
              {warmLeads}
            </p>

            <p className="mt-3 text-sm text-slate-400">
              Score 13–16
            </p>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
            <p className="text-sm text-slate-400">
              🔵 Low Priority
            </p>

            <p className="mt-3 text-3xl font-bold text-blue-400">
              {lowLeads}
            </p>

            <p className="mt-3 text-sm text-slate-400">
              Score below 13
            </p>
          </div>

        </section>

        {/* Main Grid */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* Quick Actions */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">
              ⚡ Quick Actions
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Continue your client hunting workflow.
            </p>

            <div className="mt-6 space-y-3">

              <Link
                href="/leads"
                className="block w-full rounded-lg bg-blue-600 p-4 hover:bg-blue-500"
              >
                🔎 Find Potential Clients
              </Link>

              <Link
                href="/leads/new"
                className="block w-full rounded-lg border border-slate-700 p-4 hover:bg-slate-800"
              >
                👥 Add New Lead
              </Link>

              <Link
                href="/leads/import"
                className="block w-full rounded-lg border border-slate-700 p-4 hover:bg-slate-800"
              >
                📥 Import CSV Leads
              </Link>

              <Link
                href="/follow-ups"
                className="block w-full rounded-lg border border-slate-700 p-4 hover:bg-slate-800"
              >
                📅 View Follow-ups
              </Link>

              <Link
                href="/pipeline"
                className="block w-full rounded-lg border border-slate-700 p-4 hover:bg-slate-800"
              >
                📊 View Pipeline
              </Link>

            </div>
          </div>

          {/* Lead Summary */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">
              📈 Lead Summary
            </h2>

            <div className="mt-6 space-y-5">

              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    Hot Leads
                  </span>

                  <span className="font-medium text-red-400">
                    {hotLeads}
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{
                      width: `${
                        totalLeads
                          ? (hotLeads / totalLeads) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    Warm Leads
                  </span>

                  <span className="font-medium text-yellow-400">
                    {warmLeads}
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-yellow-500"
                    style={{
                      width: `${
                        totalLeads
                          ? (warmLeads / totalLeads) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    Low Priority
                  </span>

                  <span className="font-medium text-blue-400">
                    {lowLeads}
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{
                      width: `${
                        totalLeads
                          ? (lowLeads / totalLeads) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="border-t border-slate-800 pt-5">
                <p className="text-sm text-slate-400">
                  Follow-ups
                </p>

                <p className="mt-2 text-3xl font-bold text-emerald-400">
                  {followUps}
                </p>
              </div>

            </div>
          </div>

        </section>

        {/* Today's Focus */}
        <section className="mt-8 rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
          <h3 className="font-semibold">
            🎯 Today's Focus
          </h3>

          <p className="mt-2 text-slate-300">
            You currently have{" "}
            <span className="font-bold text-blue-400">
              {followUps} follow-ups
            </span>{" "}
            and{" "}
            <span className="font-bold text-red-400">
              {hotLeads} hot leads
            </span>{" "}
            waiting for action.
          </p>
        </section>

      </div>
    </main>
  );
}
