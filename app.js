const supabaseUrl = "https://ypjmkigvghybkwyxndcz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwam1raWd2Z2h5Ymt3eXhuZGN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMTc1NTgsImV4cCI6MjA5OTY5MzU1OH0.lJ5RddKmDdPfLecBsqL9XMGejL9Owbv1ZH2PXSqqdv4";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

async function globalAuth(){

  const publicPages = ["index.html"];

  const currentPage = window.location.pathname.split("/").pop();

  if(publicPages.includes(currentPage)){
    return; // صفحه عمومی است
  }

  const { data:{session} } = await supabaseClient.auth.getSession();

  if(!session){
    window.location.href = "index.html";
    return;
  }

  const { data: profile } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if(!profile){
    window.location.href = "index.html";
    return;
  }

  if(profile.is_active === false){
    await supabaseClient.auth.signOut();
    alert("حساب شما غیرفعال شده است.");
    window.location.href = "index.html";
    return;
  }

}

globalAuth();
