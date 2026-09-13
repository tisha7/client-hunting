"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Lead = {
  id: string;
  company_name: string;
  website?: string | null;
  country?: string | null;
  city?: string | null;
  niche?: string | null;
  business_type?: string | null;
  decision_maker?: string | null;
  role?: string | null;
  email?: string | null;
  phone?: string | null;
  lead_score?: number | null;
  priority?: string | null;
  status?: string | null;
  service_opportunity?: string | null;
  research_notes?: string | null;
};

export default function LeadDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadLead() {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setLead(data);
      }

      setLoading(false);
    }

    loadLead();
  }, [params.id]);

  async function deleteLead() {
    if (!confirm("Are you sure you want to delete this lead?")) {
      return;
    }

    setDeleting(true);

    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", params.id);

    if (error) {
      alert("Failed to delete lead: " + error.message);
      setDeleting(false);
      return;
    }

    router.push("/leads");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        Loading lead...
      </main>
    );
  }

  if (!lead) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        <p>Lead not found.</p>

        <Link
          href="/leads"
          className="mt-4 inline-block text-blue-400"
        >
          ← Back to Leads
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl p-6 md:p-10">

        <Link
          href="/leads"
          className="text-sm text-slate-400 hover:text-white"
        >
          ← Back to Leads
        </Link>

        <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-start">

          <div>
            <p className="text-sm text-blue-400">
              Lead Details
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              {lead.company_name}
            </h1>

            <div className="mt-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-orange-500/10 px-3 py-1 text-sm text-orange-400">
                🔥 Score: {lead.lead_score ?? 0}
              </span>

              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                {lead.status ?? "New"}
              </span>

              <span className="rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                {lead.priority ?? "Low"}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href={`/leads/${lead.id}/edit`}
              className="rounded-lg border border-slate-700 px-5 py-3 hover:bg-slate-800"
            >
              ✏️ Edit
            </Link>

            <button
              onClick={deleteLead}
              disabled={deleting}
              className="rounded-lg bg-red-600 px-5 py-3 hover:bg-red-500 disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "🗑️ Delete"}
            </button>
          </div>

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold">
              🏢 Business Information
            </h2>

            <div className="mt-6 space-y-4 text-sm">

              <Info
                label="Website"
                value={lead.website}
              />

              <Info
                label="Country"
                value={lead.country}
              />

              <Info
                label="City"
                value={lead.city}
              />

              <Info
                label="Niche"
                value={lead.niche}
              />

              <Info
                label="Business Type"
                value={lead.business_type}
              />

            </div>
          </section>

          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold">
              👤 Contact Information
            </h2>

            <div className="mt-6 space-y-4 text-sm">

              <Info
                label="Decision Maker"
                value={lead.decision_maker}
              />

              <Info
                label="Role"
                value={lead.role}
              />

              <Info
                label="Email"
                value={lead.email}
              />

              <Info
                label="Phone"
                value={lead.phone}
              />

            </div>
          </section>

        </div>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="text-lg font-semibold">
            💼 Opportunity
          </h2>

          <p className="mt-4 text-slate-300">
            {lead.service_opportunity || "No service opportunity added."}
          </p>

        </div>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="text-lg font-semibold">
            📝 Research Notes
          </h2>

          <p className="mt-4 whitespace-pre-wrap text-slate-300">
            {lead.research_notes || "No research notes added."}
          </p>

        </div>

      </div>
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex justify-between gap-6 border-b border-slate-800 pb-3 last:border-0">
      <span className="text-slate-400">
        {label}
      </span>

      <span className="text-right text-slate-200">
        {value || "-"}
      </span>
    </div>
  );
}
