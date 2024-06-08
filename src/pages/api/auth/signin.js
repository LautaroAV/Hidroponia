import { supabase } from "../../../data/supabase";

export const POST = async ({ request, cookies, redirect }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return redirect(`/login?error=${encodeURIComponent("Email and password are required")}`);
    }

    if (!email.includes("@")) {
      return redirect(`/login?error=${encodeURIComponent("El correo electrónico debe contener un '@'")}`);
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const errorMessage = error.message === "Invalid login credentials" ? 
        "Credenciales de inicio de sesión inválidas" : 
        "Se produjo un error al iniciar sesión";
      return redirect(`/login?error=${encodeURIComponent(errorMessage)}`);
    }

    const { access_token, refresh_token } = data.session;
    cookies.set("sb-access-token", access_token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    cookies.set("sb-refresh-token", refresh_token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return redirect("/");
  } catch (err) {
    return redirect(`/login?error=${encodeURIComponent("Failed to process request")}`);
  }
};
