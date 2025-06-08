"use server";

import { createClient } from "@supabase/supabase-js";

export async function getTodos() {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching todos:", error);
    throw new Error(error.message);
  }

  console.log("All todos:", data);
  return data;
}
