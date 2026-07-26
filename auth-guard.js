console.log("auth-guard loaded ✅");
const supabaseUrl = "https://ypjmkigvghybkwyxndcz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwam1raWd2Z2h5Ymt3eXhuZGN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMTc1NTgsImV4cCI6MjA5OTY5MzU1OH0.lJ5RddKmDdPfLecBsqL9XMGejL9Owbv1ZH2PXSqqdv4";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

async function authGuard(requiredGrade = null){
console.log("authGuard running...");
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

  if(profile.role === "admin"){
    showPage();
    return;
  }

  if(requiredGrade && profile.grade !== requiredGrade){
    window.location.href = "grade"+profile.grade+".html";
    return;
  }

  showPage();
}

// ✅ نمایش صفحه بعد از تأیید
function showPage(){
  const loading = document.getElementById("loading");
  const content = document.getElementById("content");

  if(loading) loading.style.display="none";
  if(content) content.style.display="block";
}
