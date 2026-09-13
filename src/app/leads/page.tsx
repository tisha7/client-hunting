import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Lead = {
  id: string;
  company_name: string;
  website: string | null;
  country: string | null;
  city: string | null;
  niche: string | null;
  lead_score: number | null;
  priority: string | null;
  status: string | null;
};

function getPriority(score: number) {
  if (score >= 17) {
    return {
      label: "🔥 Hot",
      className:
        "bg-red-500/10 text-red-400 border-red-500/20",
    };
  }

  if (score >= 13) {
    return {
      label: "🟡 Warm",
      className:
        "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    };
  }

  return {
    label: "🔵 Low",
    className:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
}

export default async function LeadsPage() {
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-6 md:p-10">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <Link
              href="/"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              ← Dashboard
            </Link>

            <h1 className="mt-4 text-3xl font-bold">
              👥 Leads
            </h1>

            <p className="mt-2 text-slate-400">
              Manage and track your potential clients.
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

        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900">

          <div className="flex items-center justify-between border-b border-slate-800 p-6">
            <div>
              <h2 className="font-semibold">
                All Leads
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {leads?.length || 0} leads in your database
              </p>
            </div>
          </div>

          {error && (
            <div className="p-6 text-red-400">
              Error loading leads: {error.message}
            </div>
          )}

          {!error && (!leads || leads.length === 0) && (
            <div className="p-10 text-center">
              <p className="text-slate-400">
                No leads found yet.
              </p>

              <Link
                href="/leads/import"
                className="mt-4 inline-block text-blue-400"
              >
                Import your first CSV →
              </Link>
            </div>
          )}

          {leads && leads.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">

                <thead className="border-b border-slate-800 text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Company</th>
                    <th className="px-5 py-4">Location</th>
                    <th className="px-5 py-4">Niche</th>
                    <th className="px-5 py-4">Score</th>
                    <th className="px-5 py-4">Priority</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {leads.map((lead: Lead) => {
                    const score =
                      Number(lead.lead_score) || 0;

                    const priority =
                      getPriority(score);

                    return (
                      <tr
                        key={lead.id}
                        className="border-b border-slate-800 transition hover:bg-slate-800/50 last:border-0"
                      >
                        <td className="px-5 py-4">
                          <Link
                            href={`/leads/${lead.id}`}
                            className="font-medium text-white hover:text-blue-400"
                          >
                            {lead.company_name}
                          </Link>

                          {lead.website && (
                            <a
                              href={lead.website}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-1 block text-xs text-blue-400 hover:underline"
                            >
                              Visit website ↗
                            </a>
                          )}
                        </td>

                        <td className="px-5 py-4 text-slate-300">
                          {lead.city ||
                            lead.country ||
                            "-"}
                        </td>

                        <td className="px-5 py-4 text-slate-400">
                          {lead.niche ||
                            "Cleaning Service"}
                        </td>

                        <td className="px-5 py-4">
                          <span className="font-semibold text-orange-400">
                            🔥 {score}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${priority.className}`}
                          >
                            {priority.label}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                            {lead.status || "New"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
