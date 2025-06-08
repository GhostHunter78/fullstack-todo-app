"use server";

import { createClient } from "@supabase/supabase-js";

interface FilterParams {
  priority?: string;
  category?: string;
  status?: string;
}

export async function getTodos(filters?: FilterParams, sortBy?: string) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);

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
