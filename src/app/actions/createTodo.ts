"use server";

import { createClient } from "../../../services/supabase/server";

export async function createTodo(formData: FormData) {
  const title = formData.get("title")!;
  const description = formData.get("description")!;
  const priority = formData.get("priority")!;
  const category = formData.get("category")!;
  const dueDate = formData.get("dueDate")!;

  const supabase = await createClient();

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
