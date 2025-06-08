"use server";

import { createClient } from "@supabase/supabase-js";

export async function editStatus(formData: FormData) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const id = formData.get("id")!;
  const currentStatus = formData.get("completed")!;
  console.log(currentStatus);

  const { error } = await supabase
    .from("todos")
    .update({ completed: currentStatus === "false" })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
