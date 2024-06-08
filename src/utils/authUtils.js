export async function checkAuthentication(Astro) {
    const { cookies, redirect } = Astro;
    
    const accessToken = cookies.get("sb-access-token");
    const refreshToken = cookies.get("sb-refresh-token");
    
    if (!accessToken || !refreshToken) {
      return redirect("/login");
    }
  
    return { accessToken, refreshToken };
  }
  
