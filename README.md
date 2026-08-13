# 🏆 باشگاه نخبگان ریاضی

وب‌اپ آموزشی ریاضی برای پایه‌های هفتم، هشتم و نهم با دو بخش اصلی:

1. سامانه دانش‌آموزی و آزمون‌ها
2. بازی‌های آموزشی عمومی و رقابتی

Frontend پروژه روی GitHub Pages اجرا می‌شود و Backend توسط Supabase تأمین شده است.

---

## 🏗 معماری پروژه

```text
Browser
   │
   ▼
GitHub Pages
HTML + CSS + Vanilla JavaScript
   │
   ├─────────────┐
   │             │
   ▼             ▼
Supabase       GitHub
   │
   ├ Auth
   ├ PostgreSQL
   ├ RLS
   ├ RPC
   └ Edge Functions
          │
          ▼
      GitHub API
          │
          ▼
    انتشار خودکار بازی
```

تکنولوژی‌ها:

```text
Frontend:
HTML
CSS
Vanilla JavaScript ES Modules

Hosting:
GitHub Pages

Backend:
Supabase

Authentication:
Supabase Auth

Database:
PostgreSQL

Security:
Row Level Security (RLS)

Server-side Logic:
Supabase Edge Functions

Game Hosting:
GitHub Pages

Game Publishing:
GitHub Contents API
```

---

## 📁 ساختار پروژه

```text
/
├── assets/
│   └── css/
│       └── main.css
│
├── components/
│   ├── dashboard/
│   ├── drawer/
│   ├── adminGames.js
│   ├── appLayout.js
│   ├── authLayout.js
│   ├── button.js
│   ├── card.js
│   ├── input.js
│   ├── modal.js
│   └── toast.js
│
├── config/
│   └── chapters.js
│
├── core/
│
├── games/
│   ├── game-sdk.js
│   ├── template.html
│   │
│   ├── grade7/
│   │   ├── chapter1/
│   │   │   ├── ball.html
│   │   │   ├── pattern.html
│   │   │   └── ...
│   │   └── ...
│   │
│   ├── grade8/
│   └── grade9/
│
├── ghadimi/
│   └── فایل‌های قدیمی پروژه
│
├── pages/
│   ├── login.js
│   ├── dashboard.js
│   ├── admin.js
│   ├── chapter.js
│   ├── game.js
│   └── exam.js
│
├── router/
│   └── router.js
│
├── services/
│   ├── studentService.js
│   ├── contentService.js
│   ├── chapterService.js
│   ├── dashboardService.js
│   ├── examService.js
│   ├── menuService.js
│   └── profileService.js
│
├── store/
│   └── appStore.js
│
├── utils/
│   └── navigation.js
│
├── app.js
├── auth.js
├── config.js
├── index.html
├── session.js
└── README.md
```

---

## 🧭 Routing

پروژه یک SPA ساده با Hash Router است.

`app.js`:

```js
window.addEventListener("load", router);
window.addEventListener("hashchange", router);
```

Navigation در:

```text
utils/navigation.js
```

انجام می‌شود.

Routeهای اصلی:

```text
#login
#dashboard
#chapter
#admin
#game
```

صفحه `game` عمومی است و نیاز به Authentication ندارد.

---

## 🔐 Authentication

اتصال به Supabase در:

```text
config.js
```

ساخته می‌شود.

Frontend فقط از:

```text
anon / public key
```

استفاده می‌کند.

هیچ `service_role` نباید در Frontend قرار بگیرد.

---

## 👤 ورود کاربران

کاربران با شماره موبایل و رمز عبور وارد می‌شوند.

شماره موبایل به Email داخلی تبدیل می‌شود:

```text
09123456789
        ↓
09123456789@school.local
        ↓
Supabase Auth
```

ورود توسط:

```js
supabase.auth.signInWithPassword()
```

انجام می‌شود.

پس از Login، Profile از جدول:

```text
public.profiles
```

خوانده می‌شود.

---

## 👥 Roleها

دو Role اصلی:

```text
admin
student
```

Profile شامل:

```text
id
name
phone
grade
role
is_active
created_at
```

`profiles.id` همان `auth.users.id` است.

---

## 🛡 تشخیص Admin

تابع PostgreSQL:

```text
public.is_admin()
```

برای بررسی دسترسی مدیر استفاده می‌شود.

شرایط:

```text
auth.uid() = profiles.id
role = admin
is_active = true
```

تابع با:

```text
SECURITY DEFINER
```

اجرا می‌شود.

---

## 🗄 جداول اصلی Supabase

```text
profiles
contents
exams
exam_questions
exam_results
game_results
user_progress
game_scores
```

---

## 📚 جدول contents

محتوای آموزشی سایت در:

```text
public.contents
```

قرار دارد.

ساختار:

```text
id
grade
chapter
title
type
url
order_no
created_at
```

نوع محتوا:

```text
game
video
pdf
link
```

تعداد بازی‌های هر فصل محدود نیست.

مثال:

```text
پایه 7
فصل 1
├── بازی توپ
├── بازی الگو
├── بازی سوم
└── ...
```

---

## 📖 پایه‌ها و فصل‌ها

پایه‌ها و فصل‌ها در:

```text
config/chapters.js
```

تعریف شده‌اند.

پایه‌های فعلی:

```text
7
8
9
```

هر پایه ۹ فصل دارد.

---

# 🎮 سیستم بازی‌های عمومی

بازی‌ها مستقل از حساب دانش‌آموز هستند.

برای ورود به بازی Login لازم نیست.

جریان بازیکن:

```text
صفحه Login
    ↓
ورود به بازی‌های ریاضی
    ↓
وارد کردن نام
    ↓
انتخاب پایه
    ↓
انتخاب فصل
    ↓
انتخاب بازی
    ↓
اجرای بازی
    ↓
ثبت امتیاز
    ↓
Leaderboard
```

نام بازیکن در:

```text
sessionStorage
```

با Key:

```text
publicGamePlayer
```

ذخیره می‌شود.

---

## 🎮 ساختار فایل بازی‌ها

بازی‌ها HTML مستقل هستند.

ساختار استاندارد:

```text
games/
├── grade7/
│   ├── chapter1/
│   │   ├── ball.html
│   │   └── pattern.html
│   └── chapter2/
│
├── grade8/
└── grade9/
```

---

# 🧩 Game SDK

فایل مشترک:

```text
/games/game-sdk.js
```

تمام بازی‌ها باید آن را Load کنند:

```html
<script src="/games/game-sdk.js"></script>
```

سپس:

```js
const GAME_ID = __GAME_ID__;

const player =
    GameSDK.init(GAME_ID);
```

نام بازیکن:

```js
player.playerName
```

است.

---

## ⚠️ GAME_ID

هنگام ساخت فایل بازی جدید نباید ID واقعی نوشته شود.

باید دقیقاً:

```js
const GAME_ID = __GAME_ID__;
```

باشد.

پنل Admin هنگام انتشار:

```text
__GAME_ID__
```

را با:

```text
contents.id
```

جایگزین می‌کند.

مثال:

```text
__GAME_ID__
↓
12
```

---

# 🎯 استاندارد بازی‌ها

```text
تعداد سؤال: 10

زمان هر سؤال:
30 ثانیه

حداکثر امتیاز:
100
```

امتیاز پاسخ صحیح براساس زمان:

```text
0 تا 5 ثانیه
→ 10 امتیاز

5 تا 10 ثانیه
→ 8 امتیاز

10 تا 15 ثانیه
→ 6 امتیاز

15 تا 20 ثانیه
→ 4 امتیاز

20 تا 30 ثانیه
→ 2 امتیاز

پاسخ غلط
→ 0

اتمام زمان
→ 0
```

زمان واقعی باید توسط:

```js
Date.now()
```

محاسبه شود.

---

## 🏁 پایان بازی

در پایان:

```js
await GameSDK.finishGame(score);
```

اجرا می‌شود.

بازی نباید مستقیماً به Supabase وصل شود.

---

## 🏆 Leaderboard

Leaderboard با:

```js
await GameSDK.getLeaderboard(10);
```

گرفته می‌شود.

رتبه‌ها:

```text
🥇
🥈
🥉
4.
5.
...
```

هر بازیکن فقط با بهترین رکورد خود نمایش داده می‌شود.

---

## 🔄 بازی دوباره

قبل از شروع دور جدید:

```js
GameSDK.reset();
```

باید اجرا شود.

---

# 📊 game_scores

امتیازات در:

```text
public.game_scores
```

ذخیره می‌شوند.

ساختار:

```text
id
game_id
player_name
score
created_at
```

`game_id` به:

```text
contents.id
```

مرتبط است.

---

# 🏆 Leaderboard RPC

برای دریافت بهترین رکورد هر بازیکن از:

```text
public.get_game_leaderboard
```

استفاده می‌شود.

پارامترها:

```text
p_game_id
p_limit
```

منطق:

```text
GROUP BY player_name
MAX(score)
```

بنابراین اگر یک بازیکن چند بار بازی کند فقط بهترین امتیازش نمایش داده می‌شود.

---

# ⚡ submit-game-score

ثبت نتیجه بازی توسط Edge Function:

```text
submit-game-score
```

انجام می‌شود.

جریان:

```text
Game
↓
GameSDK.finishGame()
↓
submit-game-score
↓
Validation
↓
game_scores
```

Edge Function بررسی می‌کند:

```text
gameId معتبر باشد
playerName معتبر باشد
score بین 0 و 100 باشد
بازی واقعاً وجود داشته باشد
```

---

# 👨‍🎓 مدیریت دانش‌آموز

پنل Admin می‌تواند:

```text
مشاهده دانش‌آموز
افزودن دانش‌آموز
فعال کردن
غیرفعال کردن
```

را انجام دهد.

---

# ⚡ create-student

ساخت دانش‌آموز از Edge Function:

```text
create-student
```

انجام می‌شود.

جریان:

```text
Admin
↓
studentService
↓
create-student
↓
بررسی JWT
↓
بررسی Admin
↓
auth.admin.createUser()
↓
profiles.insert()
```

اگر ساخت Profile شکست بخورد، Auth User ایجادشده حذف می‌شود.

---

# 🎛 پنل مدیریت

پنل Admin دسته‌بندی شده است:

```text
پنل مدیریت
│
├── 👨‍🎓 دانش‌آموزان
│
├── 🎮 بازی‌ها
│
└── 📝 آزمون‌ها
    (در حال توسعه)
```

---

# 🎮 مدیریت بازی‌ها

Admin می‌تواند:

```text
افزودن بازی
انتشار بازی
اجرای بازی
ویرایش اطلاعات
جایگزینی فایل HTML
حذف بازی
جستجوی بازی
فیلتر پایه
فیلتر فصل
```

را انجام دهد.

---

# 🚀 انتشار خودکار بازی

انتشار بازی توسط Edge Function:

```text
publish-game
```

انجام می‌شود.

جریان:

```text
Admin
↓
انتخاب HTML
↓
contentService.publishGame()
↓
publish-game
↓
بررسی Admin
↓
INSERT contents
↓
دریافت game.id
↓
جایگزینی __GAME_ID__
↓
GitHub Contents API
↓
Commit فایل
↓
GitHub Pages
↓
انتشار بازی
```

---

## 📂 مسیر انتشار

مسیر به شکل خودکار ساخته می‌شود:

```text
games/grade{grade}/chapter{chapter}/{filename}
```

مثال:

```text
games/grade7/chapter1/fraction-game.html
```

---

# 🔄 جایگزینی فایل بازی

Admin می‌تواند نسخه HTML یک بازی را جایگزین کند.

در این حالت:

```text
game ID ثابت می‌ماند
URL ثابت می‌ماند
Leaderboard حفظ می‌شود
امتیازات قبلی حفظ می‌شوند
```

Edge Function ابتدا SHA فایل را از GitHub دریافت می‌کند و سپس Update Commit انجام می‌دهد.

---

# 🔑 GitHub API

انتشار بازی توسط:

```text
GitHub Contents API
```

انجام می‌شود.

Repository:

```text
farhadrahimi-math/farhadrahimi-math.github.io
```

Branch:

```text
main
```

Token از نوع:

```text
Fine-grained Personal Access Token
```

است.

Permission:

```text
Repository:
farhadrahimi-math.github.io

Contents:
Read and write
```

---

# 🔒 GitHub Token

Token نباید وارد Repository شود.

در Supabase Secrets ذخیره شده:

```text
GITHUB_TOKEN
```

Edge Function از:

```js
Deno.env.get("GITHUB_TOKEN")
```

استفاده می‌کند.

---

# 🔐 Security

این موارد هرگز نباید وارد Frontend شوند:

```text
SUPABASE_SERVICE_ROLE_KEY
GitHub Token
Database Password
Private API Keys
```

Frontend فقط می‌تواند:

```text
Supabase anon/public key
```

داشته باشد.

---

# 🛡 RLS

Row Level Security روی جداول پروژه فعال است.

Admin بودن در UI امنیت محسوب نمی‌شود.

عملیات حساس باید با یکی از موارد زیر محافظت شوند:

```text
RLS
Edge Functions
Server-side Validation
```

---

# 🎮 امنیت فایل بازی

بازی‌ها نباید مستقیماً به:

```text
game_scores
profiles
auth.users
```

وصل شوند.

تنها رابط Backend بازی‌ها:

```text
GameSDK
```

است.

---

# 🎨 CSS

CSS اصلی پروژه:

```text
assets/css/main.css
```

است.

`index.html`:

```html
<link
    rel="stylesheet"
    href="assets/css/main.css">
```

را Load می‌کند.

فایل:

```text
style.css
```

در Root در حال حاضر CSS اصلی Runtime نیست.

---

# 🖋 Font

فونت اصلی:

```text
Vazirmatn
```

از Google Fonts دریافت می‌شود.

---

# 🧪 بازی‌های مرجع

بازی‌های استاندارد فعلی:

```text
games/grade7/chapter1/ball.html
games/grade7/chapter1/pattern.html
```

این بازی‌ها مرجع مناسبی برای توسعه بازی‌های بعدی هستند.

---

# 🤖 ساخت بازی با AI

حداقل ساختار بازی:

```html
<script src="/games/game-sdk.js"></script>

<script>

const GAME_ID = __GAME_ID__;

const TOTAL_QUESTIONS = 10;
const QUESTION_TIME = 30;

const player =
    GameSDK.init(GAME_ID);

</script>
```

فایل تولیدشده مستقیماً از Admin قابل انتشار است.

---

# 🚫 موارد ممنوع در فایل بازی

بازی نباید شامل موارد زیر باشد:

```text
Supabase URL
anon key
service_role
createClient
GitHub Token
Login Logic
profiles access
game_scores access
```

---

# ⚠️ Anti-Cheat

بازی‌ها Client-side هستند.

بنابراین جلوگیری صددرصدی از جعل Score در مرورگر ممکن نیست.

Edge Function فعلاً موارد زیر را Validate می‌کند:

```text
game validity
score range
player name
```

برای رقابت جدی‌تر باید Anti-Cheat سمت Server توسعه پیدا کند.

---

# 📝 سیستم آزمون

زیرساخت دیتابیس آزمون وجود دارد:

```text
exams
exam_questions
exam_results
```

رابط جدید آزمون هنوز کامل نشده است.

هدف:

```text
Admin
↓
ساخت آزمون
↓
تعریف سؤال
↓
تعریف گزینه‌ها
↓
تعیین پاسخ صحیح
↓
انتخاب پایه
↓
انتخاب فصل
```

دانش‌آموز:

```text
Login
↓
آزمون
↓
ثبت نتیجه
↓
کارنامه
```

---

# 📌 Edge Functions

Edge Functionهای فعلی:

```text
create-student
submit-game-score
publish-game
```

وظایف:

```text
create-student
→ ساخت امن دانش‌آموز

submit-game-score
→ ثبت امتیاز بازیکن مهمان

publish-game
→ انتشار و بروزرسانی فایل بازی در GitHub
```

---

# 🔄 GitHub Token Rotation

Fine-grained Token تاریخ انقضا دارد.

قبل از Expiration باید Token جدید ساخته شود.

سپس مقدار Secret:

```text
GITHUB_TOKEN
```

در Supabase جایگزین شود.

هیچ تغییر کدی لازم نیست.

---

# 🚧 TODO

موارد توسعه آینده:

```text
[ ] تکمیل سیستم آزمون

[ ] پنل مدیریت آزمون

[ ] تعریف سؤال و گزینه‌ها

[ ] Exam Player

[ ] تکمیل RLS آزمون‌ها

[ ] گزارش نمرات دانش‌آموز

[ ] کارنامه

[ ] Analytics بازی‌ها

[ ] مشاهده رکورد بازی از Admin

[ ] حذف فایل GitHub هنگام حذف کامل بازی

[ ] مدیریت Expiration توکن GitHub

[ ] Error Logging بهتر

[ ] Anti-Cheat پیشرفته
```

---

# 👨‍💻 راهنمای توسعه‌دهنده بعدی

قبل از تغییر معماری این فایل‌ها بررسی شوند:

```text
router/router.js
auth.js
config.js
services/
pages/
components/
games/game-sdk.js
config/chapters.js
```

همچنین در Supabase:

```text
RLS Policies
Database Functions
Edge Functions
Secrets
```

بررسی شوند.

اصول مهم:

```text
Secret وارد Frontend نشود.

GameSDK استاندارد حفظ شود.

عملیات Admin فقط با UI امن فرض نشود.

عملیات حساس سمت Server اعتبارسنجی شوند.
```

---

# 🧱 اصل معماری پروژه

برای عملیات معمولی:

```text
Frontend
    ↓
Services
    ↓
Supabase
```

برای عملیات حساس:

```text
Frontend
    ↓
Service
    ↓
Edge Function
    ↓
Validation
    ↓
Service Role / GitHub API
```

Secretها هرگز نباید وارد Browser شوند.

---

# 🏆 پروژه

```text
باشگاه نخبگان ریاضی

یادگیری
•
تمرین
•
بازی
•
رقابت
•
آزمون
```
