"use server";

import { createClient } from "../../../services/supabase/server";

export async function createTodo(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title")!;
  const description = formData.get("description")!;
  const priority = formData.get("priority")!;
  const category = formData.get("category")!;
  const dueDate = formData.get("dueDate")!;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("todos")
      .insert([
        {
          title,
          description,
          priority,
          category,
          due_date: dueDate || null,
          user_id: user.id,
        },
      ])
      .select();

    if (error) {
      console.error("Error adding todo:", error);
      throw new Error("Failed to add todo: " + error.message);
    } else {
      console.log("Todo added successfully:", data);
      return data;
    }
  } else {
    console.warn("No authenticated user found for this action.");
    throw new Error("Authentication required to create a todo.");
  }
}
