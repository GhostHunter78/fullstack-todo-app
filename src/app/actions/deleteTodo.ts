"use server";

import { createClient } from "../../../services/supabase/server";

export async function deleteTodo(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
