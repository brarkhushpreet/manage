import { currentProfile } from "@/lib/currentProfile";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";


const Dashboard = async () => {
  try {
    const user = await currentProfile();

    if (!user) {
      redirect("/login");
    }

    switch (user.role) {
      case Role.TEACHER:
        redirect("/dashboard/teacher");
      case Role.STUDENT:
        redirect("/dashboard/student");
      case Role.ADMIN:
        redirect("/admin_dashboard");
      default:
        redirect("/error");
    }
  } catch (error) {
    if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
      console.error("Error in Dashboard:", error);
      redirect("/error");
    }
    throw error; // Re-throw the redirect "error" so Next.js can handle it
  }

  // This point should never be reached due to the redirects above
  return null;
};

export default Dashboard;