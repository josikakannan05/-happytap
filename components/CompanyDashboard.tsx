"use client";

import { useMemo, useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Download,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";

interface CompanyDashboardProps {
  companyName?: string;
  companyUrl?: string;
}

export function CompanyDashboard({
  companyName = "Acme Company",
  companyUrl = "company/acme",
}: CompanyDashboardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams<{ companyUrl?: string }>();

  useEffect(() => {
    if (!loading && (!user || user.accountType !== "company")) {
      router.push("/");
    }
  }, [user, loading, router]);

  const resolvedCompanyName = useMemo(() => {
    if (typeof params?.companyUrl === "string" && params.companyUrl) {
      return decodeURIComponent(params.companyUrl).replace(/-/g, " ");
    }
    return user?.companyName || companyName;
  }, [companyName, params?.companyUrl, user?.companyName]);

  const resolvedCompanyUrl = useMemo(() => {
    if (typeof params?.companyUrl === "string" && params.companyUrl) {
      return `company/${params.companyUrl}`;
    }
    if (user?.companyName) {
      return `company/${user.companyName.toLowerCase().replace(/\s+/g, "-")}`;
    }
    return companyUrl;
  }, [companyUrl, params?.companyUrl, user?.companyName]);

  const [employees, setEmployees] = useState<{ id: number; name: string; role: string; status: string }[]>([]);

  useEffect(() => {
    if (user) {
      setEmployees([
        {
          id: 1,
          name: `${user.firstName} ${user.lastName}`,
          role: "Workspace Owner & Administrator",
          status: "Active",
        },
      ]);
    }
  }, [user]);
  const [search, setSearch] = useState("");
  const [uploadMessage, setUploadMessage] = useState(
    "Upload a CSV or Excel file to add employees in bulk."
  );

  const filteredEmployees = employees.filter((employee) =>
    [employee.name, employee.role, employee.status].some((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadMessage(`Imported ${file.name} successfully. ${employees.length} profiles are ready to review.`);
  };

  const addEmployee = () => {
    const nextEmployee = {
      id: Date.now(),
      name: "New Team Member",
      role: "Associate",
      status: "Pending",
    };
    setEmployees((current) => [nextEmployee, ...current]);
    setUploadMessage("A new employee profile has been added to the queue.");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0a0a0f", color: "#fff", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "30px", height: "30px", border: "3px solid rgba(255,255,255,0.1)", borderTopColor: "#6366f1", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <span>Loading company workspace...</span>
        </div>
        </div>
      </>
    );
  }

  if (!user || user.accountType !== "company") {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="company-dashboard-shell" style={{ paddingTop: 80 }}>
      <div className="company-dashboard-hero">
        <div>
          <div className="company-dashboard-pill">
            <Building2 size={16} /> Company Workspace
          </div>
          <h1>{resolvedCompanyName}</h1>
          <p>
            Manage your team, import records in bulk, and keep your company profile polished in one place.
          </p>
          <div className="company-dashboard-actions">
            <Link href={resolvedCompanyUrl} className="btn company-dashboard-primary">
              Open company profile
              <ArrowRight size={16} />
            </Link>
            <button type="button" className="company-dashboard-secondary" onClick={addEmployee}>
              <Plus size={16} /> Add employee
            </button>
          </div>
        </div>
        <div className="company-dashboard-card company-dashboard-summary">
          <div className="company-dashboard-summary-row">
            <span>Company URL</span>
            <strong>/{resolvedCompanyUrl}</strong>
          </div>
          <div className="company-dashboard-summary-row">
            <span>Team members</span>
            <strong>{employees.length}</strong>
          </div>
          <div className="company-dashboard-summary-row">
            <span>Verified accounts</span>
            <strong>86%</strong>
          </div>
          <div className="company-dashboard-summary-row">
            <span>Uploads this month</span>
            <strong>12</strong>
          </div>
        </div>
      </div>

      <div className="company-dashboard-grid">
        <section className="company-dashboard-card">
          <div className="company-dashboard-card-header">
            <div>
              <p className="company-dashboard-card-label">Bulk upload</p>
              <h3>Import employees quickly</h3>
            </div>
            <div className="company-dashboard-icon-badge">
              <Upload size={18} />
            </div>
          </div>
          <p className="company-dashboard-card-text">{uploadMessage}</p>
          <label className="company-dashboard-upload-box">
            <input type="file" accept=".csv,.xlsx,.xls" onChange={handleBulkUpload} />
            <Upload size={20} />
            <span>Click to upload CSV or Excel files</span>
          </label>
          <div className="company-dashboard-inline-actions">
            <button type="button" className="company-dashboard-secondary small">
              <Download size={16} /> Download template
            </button>
            <span className="company-dashboard-help-text">
              <ShieldCheck size={14} /> Secure and fast
            </span>
          </div>
        </section>

        <section className="company-dashboard-card">
          <div className="company-dashboard-card-header">
            <div>
              <p className="company-dashboard-card-label">Overview</p>
              <h3>Company performance</h3>
            </div>
            <div className="company-dashboard-icon-badge purple">
              <Sparkles size={18} />
            </div>
          </div>
          <div className="company-dashboard-metrics">
            <div>
              <strong>24</strong>
              <span>New invites</span>
            </div>
            <div>
              <strong>9</strong>
              <span>Pending signups</span>
            </div>
            <div>
              <strong>3</strong>
              <span>Teams active</span>
            </div>
          </div>
        </section>
      </div>

      <section className="company-dashboard-card company-dashboard-employee-card">
        <div className="company-dashboard-card-header">
          <div>
            <p className="company-dashboard-card-label">Manage employees</p>
            <h3>Team directory</h3>
          </div>
          <div className="company-dashboard-search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search employee"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="company-dashboard-table">
          <div className="company-dashboard-table-head">
            <span>Name</span>
            <span>Role</span>
            <span>Status</span>
            <span>Action</span>
          </div>
          {filteredEmployees.map((employee) => (
            <div className="company-dashboard-table-row" key={employee.id}>
              <div className="company-dashboard-user-cell">
                <div className="company-dashboard-avatar">{employee.name.charAt(0)}</div>
                <div>
                  <strong>{employee.name}</strong>
                  <p>{employee.role}</p>
                </div>
              </div>
              <span>{employee.role}</span>
              <span className={`company-dashboard-status ${employee.status.toLowerCase()}`}>
                <CheckCircle2 size={14} /> {employee.status}
              </span>
              <Link href={`${resolvedCompanyUrl}/profile`} className="company-dashboard-link-btn">
                Manage
                <ChevronRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="company-dashboard-footer">
        <div>
          <p className="company-dashboard-card-label">Next step</p>
          <h3>Keep your team onboarding smooth</h3>
        </div>
        <button type="button" className="btn company-dashboard-primary">
          <Users size={16} /> Invite team
        </button>
      </section>
      </div>
    </div>
  );
}
