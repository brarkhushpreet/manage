import { currentProfile } from "@/lib/currentProfile";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  try {
    const user = await currentProfile();

    if (!user) {
      // Handle case where user is not found
      return redirect("/login"); // or wherever you want to redirect unauthenticated users
    }

    switch (user.role) {
      case Role.TEACHER:
        return redirect("/dashboard/teacher");
      case Role.STUDENT:
        return redirect("/dashboard/student");
      case Role.ADMIN:
        return redirect("/admin_dashboard");
      default:
        // Handle unexpected role
        return redirect("/error"); // or some default page
    }
  } catch (error) {
    console.error("Error in Dashboard:", error);
    // Handle error - you might want to redirect to an error page or show an error message
    return redirect("/error");
  }
};

export default Dashboard;