import Link from "next/link";
import { supabase } from "@/lib/supabase";

function getDateOnly(date: Date) {
  return date.toISOString().split("T")[0];
}

export default async function Home() {
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*");

  const today = getDateOnly(new Date());

  const followUps = (leads || []).filter(
    (lead) => lead.follow_up_date
  );

  const overdue = followUps.filter(
    (lead) => lead.follow_up_date < today
  );

  const todayFollowUps = followUps.filter(
    (lead) => lead.follow_up_date === today
  );

  const upcoming = followUps.filter(
    (lead) => lead.follow_up_date > today
  );

  const hotLeads = (leads || []).filter(
    (lead) => Number(lead.lead_score) >= 17
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-6 md:p-10">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-400">
              CLIENT HUNTING DASHBOARD
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Welcome back 👋
            </h1>

            <p className="mt-2 text-slate-400">
              Track your leads, pipeline, and follow-ups in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/leads/import"
              className="rounded-lg border border-slate-700 px-5 py-3 font-medium hover:bg-slate-800"
            >
              📥 Import CSV
            </Link>

            <Link
              href="/leads/new"
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-500"
            >
              + Add New Lead
            </Link>
          </div>
        </div>

        {error && (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-400">
            Error loading dashboard: {error.message}
          </div>
        )}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Total Leads
            </p>

            <p className="mt-2 text-3xl font-bold">
              {leads?.length || 0}
            </p>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
            <p className="text-sm text-red-400">
              🔴 Overdue
            </p>

            <p className="mt-2 text-3xl font-bold text-red-400">
              {overdue.length}
            </p>
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <p className="text-sm text-yellow-400">
              🟡 Follow-up Today
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-400">
              {todayFollowUps.length}
            </p>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
            <p className="text-sm text-blue-400">
              🔥 Hot Leads
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-400">
              {hotLeads.length}
            </p>
          </div>

        </section>

        <section className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-xl font-bold">
                📅 Follow-up Center
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {overdue.length > 0
                  ? `You have ${overdue.length} overdue follow-up${
                      overdue.length === 1 ? "" : "s"
                    }.`
                  : todayFollowUps.length > 0
                    ? `You have ${todayFollowUps.length} follow-up${
                        todayFollowUps.length === 1 ? "" : "s"
                      } scheduled for today.`
                    : upcoming.length > 0
                      ? `${upcoming.length} upcoming follow-up${
                          upcoming.length === 1 ? "" : "s"
                        } scheduled.`
                      : "No follow-ups scheduled yet."}
              </p>
            </div>

            <Link
              href="/follow-ups"
              className="inline-flex w-fit rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-500"
            >
              Open Follow-ups →
            </Link>

          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">

          <Link
            href="/leads"
            className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500/40 hover:bg-slate-800"
          >
            <h2 className="text-lg font-semibold">
              👥 Manage Leads
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Search, filter, edit, and manage all your leads.
            </p>
          </Link>

          <Link
            href="/pipeline"
            className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500/40 hover:bg-slate-800"
          >
            <h2 className="text-lg font-semibold">
              📊 Pipeline
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              View leads grouped by their current pipeline stage.
            </p>
          </Link>

          <Link
            href="/follow-ups"
            className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500/40 hover:bg-slate-800"
          >
            <h2 className="text-lg font-semibold">
              📅 Follow-ups
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Stay on top of upcoming and overdue follow-ups.
            </p>
          </Link>

        </section>

      </div>
    </main>
  );
}
