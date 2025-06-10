"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../../services/supabase/server";
import { validateLogin, validateSignup } from "./schemas";

export async function emailLogin(formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validation = validateLogin(rawData);

  if (!validation.success) {
    console.error("Login validation failed:", validation.errors);
    redirect("/login?error=validation");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(validation.data);

  if (error) {
    console.error("Supabase login error:", error.message);
    redirect("/login?error=auth");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    repeatPassword: formData.get("repeatPassword") as string,
  };

  const validation = validateSignup(rawData);

  if (!validation.success) {
    console.error("Signup validation failed:", validation.errors);
    redirect("/register?error=validation");
  }

  const supabase = await createClient();

  const { email, password } = validation.data;
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error("Supabase signup error:", error.message);
    redirect("/register?error=auth");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
