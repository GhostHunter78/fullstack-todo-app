import { redirect } from "next/navigation";
import TodoAppHomePage from "./components/TodoAppHomePage";
import { createClient } from "../../services/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const userEmail = data?.user?.email;

  return <TodoAppHomePage userEmail={userEmail || ""} />;
}
