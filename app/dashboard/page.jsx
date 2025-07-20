import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import UserInfo from "@/components/UserInfo";

export default async function Dashboard() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/");
  }

  return (
    <div className="grid place-items-center h-screen">
      <UserInfo />
    </div>
  );
}