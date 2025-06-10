"use server";

import { createClient } from "../../../services/supabase/server";

interface FilterParams {
  priority?: string;
  category?: string;
  status?: string;
}

export async function getTodos(
  filters?: FilterParams,
  sortBy?: string,
  search?: string
) {
  const supabase = await createClient();

  let query = supabase.from("todos").select("*");

  if (filters) {
    if (filters.priority && filters.priority !== "all") {
      query = query.eq("priority", filters.priority);
    }
    if (filters.category && filters.category !== "all") {
      query = query.eq("category", filters.category);
    }
    if (filters.status && filters.status !== "all") {
      query = query.eq("completed", filters.status === "completed");
    }
  }

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data, error } = await query.order("created_at", {
    ascending: sortBy === "newest" ? false : true,
  });

  if (error) {
    console.error("Error fetching todos:", error);
    throw new Error(error.message);
  }

  console.log("All todos:", data);
  return data;
}
