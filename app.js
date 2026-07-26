alert("app.js اجرا شد ✅");
// ✅ تنظیم Supabase
const supabaseUrl = "https://ypjmkigvghybkwyxndcz.supabase.co";
const supabaseKey = "// ✅ تنظیم Supabase
const supabaseUrl = "https://ypjmkigvghybkwyxndcz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwam1raWd2Z2h5Ymt3eXhuZGN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMTc1NTgsImV4cCI6MjA5OTY5MzU1OH0.lJ5RddKmDdPfLecBsqL9XMGejL9Owbv1ZH2PXSqqdv4";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const app = document.getElementById("app");

// ✅ Router ساده
function router(){

  const hash = window.location.hash || "#/";

  if(hash === "#/" || hash === ""){
    loadHome();
  }

  else if(hash.startsWith("#/grade/")){
    const grade = hash.split("/")[2];
    loadGrade(grade);
  }

  else if(hash.startsWith("#/admin")){
    loadAdmin();
  }

  else{
    app.innerHTML = "<h2 style='text-align:center;margin-top:100px;'>صفحه یافت نشد</h2>";
  }
}

// ✅ صفحه خانه
function loadHome(){
  app.innerHTML = `
    <div style="padding:40px;text-align:center;">
      <h1>🏆 باشگاه نخبگان ریاضی</h1>
      <p>سیستم آموزشی هوشمند</p>
      <a href="#/grade/7">پایه هفتم</a><br>
      <a href="#/admin">پنل مدیریت</a>
    </div>
  `;
}

// ✅ صفحه پایه
function loadGrade(grade){
  app.innerHTML = `
    <div style="padding:40px;text-align:center;">
      <h2>پایه ${grade}</h2>
      <p>اینجا فصل‌ها نمایش داده می‌شود</p>
      <a href="#/">بازگشت</a>
    </div>
  `;
}

// ✅ صفحه ادمین
function loadAdmin(){
  app.innerHTML = `
    <div style="padding:40px;text-align:center;">
      <h2>پنل مدیریت</h2>
      <p>در حال ساخت...</p>
      <a href="#/">بازگشت</a>
    </div>
  `;
}

// ✅ گوش دادن به تغییر URL
window.addEventListener("hashchange", router);
router();";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const app = document.getElementById("app");

// ✅ Router ساده
function router(){

  const hash = window.location.hash || "#/";

  if(hash === "#/" || hash === ""){
    loadHome();
  }

  else if(hash.startsWith("#/grade/")){
    const grade = hash.split("/")[2];
    loadGrade(grade);
  }

  else if(hash.startsWith("#/admin")){
    loadAdmin();
  }

  else{
    app.innerHTML = "<h2 style='text-align:center;margin-top:100px;'>صفحه یافت نشد</h2>";
  }
}

// ✅ صفحه خانه
function loadHome(){
  app.innerHTML = `
    <div style="padding:40px;text-align:center;">
      <h1>🏆 باشگاه نخبگان ریاضی</h1>
      <p>سیستم آموزشی هوشمند</p>
      <a href="#/grade/7">پایه هفتم</a><br>
      <a href="#/admin">پنل مدیریت</a>
    </div>
  `;
}

// ✅ صفحه پایه
function loadGrade(grade){
  app.innerHTML = `
    <div style="padding:40px;text-align:center;">
      <h2>پایه ${grade}</h2>
      <p>اینجا فصل‌ها نمایش داده می‌شود</p>
      <a href="#/">بازگشت</a>
    </div>
  `;
}

// ✅ صفحه ادمین
function loadAdmin(){
  app.innerHTML = `
    <div style="padding:40px;text-align:center;">
      <h2>پنل مدیریت</h2>
      <p>در حال ساخت...</p>
      <a href="#/">بازگشت</a>
    </div>
  `;
}

// ✅ گوش دادن به تغییر URL
window.addEventListener("hashchange", router);
router();
