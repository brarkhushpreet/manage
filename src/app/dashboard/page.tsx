import { currentProfile } from "@/lib/currentProfile";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

const Dashboard = async () => {
  try {
    const user = await currentProfile();

    if (!user) {
      return redirect("/login");
    }

    switch (user.role) {
      case Role.TEACHER:
        return redirect("/dashboard/teacher");
      case Role.STUDENT:
        return redirect("/dashboard/student");
      case Role.ADMIN:
        return redirect("/admin_dashboard");
      default:
        return redirect("/error");
    }
  } catch (error) {
    console.error("Error in Dashboard:", error);
    return redirect("/error");
  }
};

export default Dashboard;