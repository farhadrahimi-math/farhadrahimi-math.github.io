# بازی دنباله‌های حسابی 🧮

## 🎯 هدف بازی
- تقویت مهارت تشخیص الگوهای ریاضی
- بهبود سرعت محاسبات ذهنی

## 🕹️ روش بازی
1. دنباله اعداد را مشاهده کنید (مثال: ۲, ۵, ۸, ?)
2. جمله بعدی را از بین گزینه‌ها انتخاب کنید
3. برای هر پاسخ صحیح ۱۰ امتیاز بگیرید

## 🌐 لینک بازی
[https://farhadrahimi-math.github.io/farhadrahimi-math/](https://farhadrahimi-math.github.io/farhadrahimi-math/)

## 📱 قابلیت‌ها
- طراحی واکنش‌گرا (مخصوص موبایل و تبلت)
- سیستم سطح‌بندی خودکار
- رابط کاربری فارسی

## 🛠️ فناوری‌ها
- HTML5
- CSS3
- JavaScript

<img src="preview.jpg" width="300" alt="پیش‌نمایش بازی">

## 📬 ارتباط با من
[ایمیل من](mailto:your-email@example.com)
# 🎮 بازی دنباله‌های حسابی

<div dir="rtl" align="right">
یک بازی تعاملی جذاب برای تقویت مهارت‌های ریاضی!
</div>

## 🚀 شروع فوری
کد زیر را دقیقاً کپی و در فایل `index.html` ذخیره کنید:

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>بازی دنباله‌های حسابی</title>
    <style>
        body {
            font-family: 'B Nazanin', Tahoma, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            text-align: center;
            padding: 20px;
            line-height: 1.6;
            margin: 0;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            margin-bottom: 30px;
            font-size: 28px;
        }
        .sequence {
            font-size: 26px;
            margin: 25px 0;
            color: #e74c3c;
            font-weight: bold;
            letter-spacing: 2px;
        }
        .options {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 25px;
            flex-wrap: wrap;
        }
        button {
            padding: 12px 25px;
            font-size: 18px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            font-family: 'B Nazanin';
        }
        button:hover {
            background: #2980b9;
            transform: translateY(-2px);
        }
        #result {
            font-size: 22px;
            min-height: 40px;
            margin: 20px 0;
            font-weight: bold;
            padding: 10px;
            border-radius: 8px;
        }
        .correct {
            color: #27ae60;
            background: rgba(39, 174, 96, 0.1);
        }
        .wrong {
            color: #e74c3c;
            background: rgba(231, 76, 60, 0.1);
        }
        .score {
            font-size: 20px;
            margin: 20px 0;
            color: #2c3e50;
        }
        .next-btn {
            background: #2ecc71;
            margin-top: 15px;
            width: 200px;
        }
        .next-btn:hover {
            background: #27ae60;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>بازی دنباله‌های حسابی</h1>
        <div class="score">امتیاز: <span id="score">0</span></div>
        <div class="sequence" id="sequence"></div>
        <div class="options" id="options"></div>
        <div id="result"></div>
        <button class="next-btn" id="nextBtn" onclick="nextQuestion()">سوال بعدی</button>
    </div>

    <script>
        let score = 0;
        let correctAnswer;
        let currentSequence = [];

        function generateQuestion() {
            document.getElementById('result').innerHTML = '';
            
            const a1 = Math.floor(Math.random() * 10) + 1;
            const d = Math.floor(Math.random() * 5) + 1;
            const length = Math.floor(Math.random() * 2) + 4;
            
            currentSequence = [];
            for (let i = 0; i < length; i++) {
                currentSequence.push(a1 + i * d);
            }
            
            correctAnswer = currentSequence[currentSequence.length - 1];
            document.getElementById('sequence').textContent = 
                currentSequence.slice(0, -1).join(' ، ') + ' ، ؟';
            
            generateOptions();
        }

        function generateOptions() {
            const optionsContainer = document.getElementById('options');
            optionsContainer.innerHTML = '';
            
            let options = [correctAnswer];
            while (options.length < 4) {
                const randomOffset = Math.floor(Math.random() * 10) - 5;
                const wrongAnswer = correctAnswer + randomOffset;
                if (wrongAnswer !== correctAnswer && !options.includes(wrongAnswer)) {
                    options.push(wrongAnswer);
                }
            }
            
            options = shuffleArray(options);
            
            options.forEach((option) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.onclick = function() { checkAnswer(option); };
                optionsContainer.appendChild(button);
            });
        }

        function checkAnswer(selectedAnswer) {
            const resultElement = document.getElementById('result');
            
            if (selectedAnswer == correctAnswer) {
                score += 10;
                document.getElementById('score').textContent = score;
                resultElement.innerHTML = '<span class="correct">آفرین! پاسخ صحیح است ✔️</span>';
            } else {
                resultElement.innerHTML = `<span class="wrong">پاسخ اشتباه! جواب صحیح: ${correctAnswer}</span>`;
            }
            
            const buttons = document.querySelectorAll('#options button');
            buttons.forEach(button => {
                button.disabled = true;
                if (button.textContent == correctAnswer) {
                    button.style.background = '#2ecc71';
                } else if (button.textContent == selectedAnswer) {
                    button.style.background = '#e74c3c';
                }
            });
            
            document.getElementById('nextBtn').style.display = 'inline-block';
        }

        function nextQuestion() {
            document.getElementById('nextBtn').style.display = 'none';
            generateQuestion();
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        generateQuestion();
    </script>
</body>
</html>
