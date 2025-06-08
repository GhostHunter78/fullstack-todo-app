"use server";

import { createClient } from "@supabase/supabase-js";

export async function editTodo(formData: FormData, id: string) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const title = formData.get("title")!;
  const description = formData.get("description")!;
  const priority = formData.get("priority")!;
  const category = formData.get("category")!;
  const dueDate = formData.get("dueDate")!;

  const { error } = await supabase
    .from("todos")
    .update({
      title,
      description,
      priority,
      category,
      due_date: dueDate || null,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
