"use server";

import { supabase } from "../../../services/supabase";

export async function editStatus(formData: FormData) {
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
