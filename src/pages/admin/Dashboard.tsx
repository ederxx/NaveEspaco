import { useEffect, useState } from "react";
import { collection, query, where, orderBy, limit, getDocs, getCountFromServer } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { Loader2 } from "lucide-react";

interface DashboardData {
  artistsCount: number;
  bookingsCount: number;
  productionsCount: number;
  activeProductionsCount: number;
  recentProductions: any[];
  upcomingBookings: any[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all counts and data in parallel
      const [
        artistsCount,
        bookingsCount,
        productionsCount,
        activeProductionsCount,
        recentProductions,
        upcomingBookings,
      ] = await Promise.all([
        getCountFromServer(collection(db, "artists")),
        getCountFromServer(collection(db, "schedule_bookings")),
        getCountFromServer(collection(db, "productions")),
        getCountFromServer(query(collection(db, "productions"), where("status", "==", "in_progress"))),
        getDocs(query(collection(db, "productions"), orderBy("created_at", "desc"), limit(5))),
        getDocs(query(collection(db, "schedule_bookings"), where("start_time", ">=", new Date().toISOString()), orderBy("start_time", "asc"), limit(5))),
      ]);

      setData({
        artistsCount: artistsCount.data().count,
        bookingsCount: bookingsCount.data().count,
        productionsCount: productionsCount.data().count,
        activeProductionsCount: activeProductionsCount.data().count,
        recentProductions: recentProductions.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        upcomingBookings: upcomingBookings.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do estúdio Espaço Nave
        </p>
      </div>

      {data && (
        <>
          <DashboardStats
            artistsCount={data.artistsCount}
            bookingsCount={data.bookingsCount}
            productionsCount={data.productionsCount}
            activeProductionsCount={data.activeProductionsCount}
          />
          <RecentActivity
            productions={data.recentProductions}
            bookings={data.upcomingBookings}
          />
        </>
      )}
    </div>
  );
}
