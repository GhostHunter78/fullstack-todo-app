"use server";

import { createClient } from "@supabase/supabase-js";

export async function deleteTodo(id: string) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
