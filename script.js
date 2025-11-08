/* إعدادات عامة */
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');

/* --- لوحة ألوان بسيطة ومحفزة --- */
:root {
    --bg-main: #f0f8ff;      /* خلفية رئيسية زرقاء فاتحة جدًا */
    --bg-white: #ffffff;     /* أبيض نقي للبطاقات */
    --primary-blue: #007bff; /* أزرق أساسي */
    --primary-green: #28a745;/* أخضر أساسي */
    --text-dark: #343a40;    /* نص داكن */
    --text-light: #6c757d;   /* نص ثانوي باهت */
    --border-color: #dee2e6; /* لون الحدود */
    --shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    --tube-shadow: inset 0 -5px 10px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.15); /* ظل داخلي وخارجي للأنبوب */
}

body {
    font-family: 'Tajawal', sans-serif;
    background-color: var(--bg-main);
    color: var(--text-dark);
    margin: 0;
    padding: 20px;
    min-height: 100vh;
    /* --- إضافة صورة الخلفية --- */
    background-image: url('lab-bg.jpg');
    background-size: cover; /* لتغطية كامل الشاشة */
    background-position: center; /* لتوسيط الصورة */
    background-attachment: fixed; /* لجعل الخلفية ثابتة عند التمرير */
}

#game-container {
    background-color: rgba(255, 255, 255, 0.92); /* خلفية بيضاء شفافة قليلاً */
    border-radius: 12px;
    padding: 25px 40px;
    max-width: 1000px;
    width: 100%;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); /* ظل أقوى للبروز فوق الخلفية */
    border: 1px solid var(--border-color);
}

header {
    text-align: center;
    margin-bottom: 25px;
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 15px;
}

header h1 {
    margin: 0;
    font-size: 2.2em;
    color: var(--primary-blue);
}

#level-info {
    font-size: 1em;
    color: var(--text-light);
    margin-top: 5px;
}

/* --- التخطيط الرئيسي --- */
#game-main-area {
    display: flex;
    gap: 30px;
    align-items: flex-start;
}

#sensei-area {
    flex: 1;
    text-align: center;
    padding: 20px;
    background-color: rgba(240, 248, 255, 0.7); /* خلفية شفافة لمنطقة المرشد */
    border-radius: 10px;
    border: 1px solid var(--border-color);
}

#play-area {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* --- منطقة المرشد --- */
#sensei-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid var(--primary-blue);
    margin-bottom: 15px;
}

#sensei-speech-bubble {
    background-color: var(--bg-white);
    color: var(--text-dark);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid var(--primary-blue);
    font-size: 1em;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
}

/* --- مناطق اللعب --- */
#elements-area, #mixer-area, #question-area {
    background-color: rgba(255, 255, 255, 0.8); /* خلفية شفافة */
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 20px;
    box-shadow: var(--shadow);
}

#elements-area h2, #mixer-area h2, #question-area h2 {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--primary-blue);
    text-align: center;
    font-size: 1.3em;
}

/* --- منطقة التجربة الأفقية --- */
#experiment-area {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
}

/* --- العناصر (كأنابيب) --- */
#elements-container {
    display: flex;
    flex-direction: column;
    gap: 20px; /* مسافة أكبر بين الأنابيب */
    align-items: center;
}

.element-tube {
    width: 70px;
    height: 150px;
    cursor: grab;
    position: relative;
    user-select: none;
    transition: transform 0.2s ease-in-out;
}

/* --- شكل الأنبوب باستخدام CSS --- */
.element-tube::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, var(--primary-blue), #0056b3); /* تدرج لوني */
    border-radius: 0 0 35px 35px; /* قاعدة مستديرة */
    border: 2px solid #004085; /* حدود داكنة */
    box-shadow: var(--tube-shadow);
    z-index: 1;
}

/* -- فتحة الأنبوب في الأعلى -- */
.element-tube::after {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 15px;
    background: linear-gradient(to bottom, #004085, var(--primary-blue));
    border-radius: 5px 5px 0 0;
    border: 2px solid #004085;
    border-bottom: none;
    z-index: 0;
}

.element-tube .element-name {
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;
    color: var(--bg-white);
    font-weight: bold;
    font-size: 1.4em;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5); /* ظل للنص ليظهر بوضوح */
    z-index: 2; /* ليكون فوق الأنبوب */
}

.element-tube:hover {
    transform: translateY(-5px) scale(1.05);
}

.element-tube.ui-draggable-dragging {
    cursor: grabbing;
    transform: rotate(5deg) scale(1.1);
    z-index: 1000;
    opacity: 0.9;
}

/* --- منطقة المزج (كأنبوب كبير) --- */
#mixer-area {
    text-align: center;
    flex-grow: 1;
}

#mixer-tube {
    width: 120px;
    height: 220px;
    margin: 15px auto;
    position: relative;
    cursor: default;
}

#mixer-tube::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, #e9ecef, #ced4da); /* تدرج رمادي */
    border-radius: 0 0 50px 50px; /* قاعدة مستديرة أكبر */
    border: 3px dashed var(--primary-blue); /* حدود متقطعة زرقاء */
    box-shadow: var(--tube-shadow);
    z-index: 1;
}

#mixer-tube::after {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 18px;
    background: linear-gradient(to bottom, var(--border-color), #e9ecef);
    border-radius: 8px 8px 0 0;
    border: 3px dashed var(--primary-blue);
    border-bottom: none;
    z-index: 0;
}

#mixed-result {
    position: absolute;
    bottom: 0;
    left: 10px; /* ترك مساحة للحدود */
    right: 10px;
    height: 0%;
    background: linear-gradient(to top, var(--primary-green), #5cb85c); /* تدرج أخضر عند المزج */
    border-radius: 0 0 40px 40px; /* يتبع شكل قاعدة الأنبوب */
    transition: height 0.5s ease-in-out;
    z-index: 2; /* ليكون فوق الأنبوب الرمادي */
}

#mixer-tube p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--text-light);
    font-size: 0.9em;
    z-index: 3; /* ليكون فوق كل شيء */
}

#mix-button {
    background-color: var(--primary-green);
    color: var(--bg-white);
    border: none;
    padding: 12px 30px;
    font-size: 1.1em;
    border-radius: 25px;
    cursor: pointer;
    font-family: 'Tajawal', sans-serif;
    font-weight: bold;
    transition: background-color 0.3s, transform 0.2s;
}

#mix-button:hover:not(:disabled) {
    background-color: #218838;
    transform: scale(1.05);
}

#mix-button:disabled {
    background-color: var(--text-light);
    cursor: not-allowed;
    transform: scale(1);
}

/* --- منطقة السؤال والاختيارات (تبقى كما هي) --- */
#choices-container {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
}

.choice-button {
    background-color: var(--bg-white);
    color: var(--text-dark);
    border: 2px solid var(--primary-blue);
    padding: 12px 25px;
    font-size: 1em;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Tajawal', sans-serif;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
}

.choice-button:hover {
    background-color: var(--primary-blue);
    color: var(--bg-white);
    transform: translateY(-2px);
}

.choice-button.correct {
    background-color: var(--primary-green);
    border-color: var(--primary-green);
    color: var(--bg-white);
    animation: pulse 0.6s;
    pointer-events: none;
}

.choice-button.incorrect {
    background-color: #dc3545;
    border-color: #dc3545;
    color: var(--bg-white);
    animation: shake 0.5s;
    pointer-events: none;
}

/* --- رسوم متحركة --- */
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.08); }
    100% { transform: scale(1); }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
}
