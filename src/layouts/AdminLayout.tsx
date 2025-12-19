import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Loader2 } from "lucide-react";

export default function AdminLayout() {
  const { user, isLoading, isAdmin, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/login");
      } else if (userRole && userRole !== "admin" && userRole !== "member") {
        // User is logged in but doesn't have proper role
        navigate("/");
      }
    }
  }, [user, isLoading, userRole, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || (userRole && userRole !== "admin" && userRole !== "member")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex w-full">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
