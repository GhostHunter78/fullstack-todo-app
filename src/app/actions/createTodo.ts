"use server";

import { createClient } from "@supabase/supabase-js";

export async function createTodo(formData: FormData) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as string;
  const category = formData.get("category") as string;
  const dueDate = formData.get("dueDate") as string;

  const { error } = await supabase.from("todos").insert({
    title,
    description,
    priority,
    category,
    due_date: dueDate || null,
  });

  if (error) {
    throw new Error(error.message);
  }
}
