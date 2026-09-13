"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Lead = {
  id: string;
  company_name: string;
  follow_up_date: string | null;
  follow_up_notes: string | null;
  priority: string | null;
  status: string | null;
};

export default function FollowUpsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFollowUps() {
      const { data, error } = await supabase
        .from("leads")
        .select(
          "id, company_name, follow_up_date, follow_up_notes, priority, status"
        )
        .not("follow_up_date", "is", null)
        .order("follow_up_date", { ascending: true });

      if (error) {
        console.error(error);
        alert("Failed to load follow-ups: " + error.message);
      } else {
        setLeads(data || []);
      }

      setLoading(false);
    }

    loadFollowUps();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const overdue = leads.filter(
    (lead) => lead.follow_up_date && lead.follow_up_date < today
  );

  const todayLeads = leads.filter(
    (lead) => lead.follow_up_date === today
  );

  const upcoming = leads.filter(
    (lead) => lead.follow_up_date && lead.follow_up_date > today
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        Loading follow-ups...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl p-6 md:p-10">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/"
              className="text-sm text-slate-400 hover:text-white"
            >
              ← Dashboard
            </Link>

            <h1 className="mt-3 text-3xl font-bold">
              📅 Follow-ups
            </h1>

            <p className="mt-2 text-slate-400">
              Manage your upcoming client follow-ups.
            </p>
          </div>

          <Link
            href="/leads"
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-500"
          >
            👥 View Leads
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <p className="text-sm text-slate-400">
              Overdue
            </p>

            <p className="mt-2 text-3xl font-bold text-red-400">
              {overdue.length}
            </p>
          </div>

          <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
            <p className="text-sm text-slate-400">
              Due Today
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-400">
              {todayLeads.length}
            </p>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
            <p className="text-sm text-slate-400">
              Upcoming
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-400">
              {upcoming.length}
            </p>
          </div>

        </div>

        <FollowUpSection
          title="🔴 Overdue"
          leads={overdue}
          emptyMessage="No overdue follow-ups."
        />

        <FollowUpSection
          title="🟠 Due Today"
          leads={todayLeads}
          emptyMessage="No follow-ups due today."
        />

        <FollowUpSection
          title="🔵 Upcoming"
          leads={upcoming}
          emptyMessage="No upcoming follow-ups."
        />

      </div>
    </main>
  );
}

function FollowUpSection({
  title,
  leads,
  emptyMessage,
}: {
  title: string;
  leads: Lead[];
  emptyMessage: string;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      {leads.length === 0 ? (
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          {emptyMessage}
        </div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          {leads.map((lead) => (
            <Link
              key={lead.id}
              href={`/leads/${lead.id}`}
              className="block border-b border-slate-800 p-5 last:border-0 hover:bg-slate-800/50"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                <div>
                  <h3 className="font-semibold">
                    {lead.company_name}
                  </h3>

                  {lead.follow_up_notes && (
                    <p className="mt-1 text-sm text-slate-400">
                      {lead.follow_up_notes}
                    </p>
                  )}
                </div>

                <div className="text-sm sm:text-right">
                  <p className="text-blue-400">
                    📅 {lead.follow_up_date}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {lead.priority || "Low"} · {lead.status || "New"}
                  </p>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
