 $(document).ready(function() {

    // --- قاعدة البيانات ---
    // يمكن توسيع هذه القائمة لتشمل كل العناصر والمركبات التي تريدها
    const chemicalData = {
        elements: [
            { id: 'H', name: 'هيدروجين', symbol: 'H', color: '#ffcccc' },
            { id: 'O', name: 'أكسجين', symbol: 'O', color: '#cce5ff' },
            { id: 'Na', name: 'صوديوم', symbol: 'Na', color: '#ffffcc' },
            { id: 'Cl', name: 'كلور', symbol: 'Cl', color: '#ccffcc' },
            { id: 'C', name: 'كربون', symbol: 'C', color: '#d9d9d9' }
        ],
        compounds: [
            { 
                resultId: 'H2O', 
                name: 'ماء', 
                formula: 'H₂O', 
                color: '#80dfff', 
                reactants: ['H', 'O'], 
                wrongChoices: ['أكسيد الصوديوم', 'ثاني أكسيد الكربون'] 
            },
            {
                resultId: 'NaCl',
                name: 'كلوريد الصوديوم (ملح الطعام)',
                formula: 'NaCl',
                color: '#ffffff',
                reactants: ['Na', 'Cl'],
                wrongChoices: ['كلوريد البوتاسيوم', 'بروميد الصوديوم']
            }
        ]
    };

    // --- متغيرات حالة اللعبة ---
    let currentLevel = 1;
    let elementsInMixer = [];
    let currentCompound = null;

    // --- عناصر واجهة المستخدم ---
    const $elementsContainer = $('#elements-container');
    const $mixerTube = $('#mixer-tube');
    const $mixedResult = $('#mixed-result');
    const $mixButton = $('#mix-button');
    const $questionArea = $('#question-area');
    const $choicesContainer = $('#choices-container');
    const $senseiSpeech = $('#sensei-speech-bubble');

    // --- وظائف مساعدة ---
    function updateSenseiMessage(message) {
        $senseiSpeech.fadeOut(200, function() {
            $(this).text(message).fadeIn(200);
        });
    }

    function loadLevel(levelCompoundId) {
        // إعادة تعيين الحالة
        elementsInMixer = [];
        $mixedResult.css('height', '0%').css('background-color', 'transparent');
        $mixButton.prop('disabled', true);
        $questionArea.hide();
        $elementsContainer.empty();

        // العثور على المركب المطلوب لهذا المستوى
        currentCompound = chemicalData.compounds.find(c => c.resultId === levelCompoundId);
        if (!currentCompound) {
            updateSenseiMessage("حدث خطأ في تحميل المستوى!");
            return;
        }

        // تحميل العناصر المطلوبة للمركب
        currentCompound.reactants.forEach(elementId => {
            const element = chemicalData.elements.find(e => e.id === elementId);
            if (element) {
                const $tube = $(`<div class="element-tube" data-element-id="${element.id}" style="background-color: ${element.color};">
                                    <div class="element-name">${element.symbol}</div>
                                 </div>`);
                $elementsContainer.append($tube);
            }
        });

        updateSenseiMessage(`ممتاز! حاول تكوين مركب ${currentCompound.name}. اسحب العناصر إلى منطقة المزج.`);
        initDragAndDrop();
    }

    function initDragAndDrop() {
        $('.element-tube').draggable({
            revert: 'invalid',
            zIndex: 1000,
            start: function(event, ui) {
                ui.helper.css('transform', 'rotate(5deg)');
            },
            stop: function(event, ui) {
                ui.helper.css('transform', 'rotate(0deg)');
            }
        });

        $mixerTube.droppable({
            accept: '.element-tube',
            drop: function(event, ui) {
                const elementId = ui.draggable.data('element-id');
                
                // منع إضافة نفس العنصر مرتين (لتبسيط اللعبة)
                if (elementsInMixer.length < 2 && !elementsInMixer.includes(elementId)) {
                    elementsInMixer.push(elementId);
                    ui.draggable.hide(); // إخفاء الأنبوب بعد سحبه
                    
                    // تحديث منطقة المزج بصريًا
                    const element = chemicalData.elements.find(e => e.id === elementId);
                    const currentHeight = (elementsInMixer.length) * 50; // 50% لكل عنصر
                    $mixedResult.css('height', `${currentHeight}%`);
                    
                    // مزج الألوان (بشكل بسيط)
                    if (elementsInMixer.length === 1) {
                        $mixedResult.css('background-color', element.color);
                    } else {
                        // لون المزج النهائي سيتم تحديده عند الضغط على زر المزج
                        $mixedResult.css('background-color', currentCompound.color);
                    }

                    updateSenseiMessage(`تمت إضافة ${element.name}!`);

                    if (elementsInMixer.length === 2) {
                        $mixButton.prop('disabled', false);
                        updateSenseiMessage(`رائع! الآن اضغط على زر "مزج الآن".`);
                    }
                } else {
                     updateSenseiMessage(`لقد أضفت هذا العنصر بالفعل أو أن المنطقة ممتلئة!`);
                }
            }
        });
    }

    function showQuestion() {
        $questionArea.show();
        $choicesContainer.empty();

        // إنشاء قائمة الخيارات (الإجابة الصحيحة + الإجابات الخاطئة)
        const choices = [currentCompound.name, ...currentCompound.wrongChoices];
        
        // خلط الخيارات عشوائيًا
        choices.sort(() => Math.random() - 0.5);

        choices.forEach(choice => {
            const $button = $(`<button class="choice-button">${choice}</button>`);
            $button.on('click', function() {
                checkAnswer($(this), choice);
            });
            $choicesContainer.append($button);
        });

        updateSenseiMessage(`ماذا نتج لدينا؟ اختر الإجابة الصحيحة!`);
    }

    function checkAnswer($button, selectedAnswer) {
        // تعطيل جميع الأزرار بعد الاختيار
        $('.choice-button').prop('disabled', true);

        if (selectedAnswer === currentCompound.name) {
            $button.addClass('correct');
            updateSenseiMessage(`إجابة صحيحة! لقد تكونت ${currentCompound.name} (${currentCompound.formula}). أحسنت!`);
            // هنا يمكنك إضافة منطق الانتقال للمستوى التالي
            setTimeout(() => {
                alert("مبروك! لقد أكملت المستوى. سيتم تحميل المستوى التالي قريبًا.");
                // مثال للانتقال: loadLevel('NaCl');
            }, 2000);

        } else {
            $button.addClass('incorrect');
            updateSenseiMessage(`آه لا! الإجابة الصحيحة هي ${currentCompound.name}. حاول مرة أخرى!`);
            // إعادة تعيين المستوى بعد فترة
            setTimeout(() => {
                loadLevel(currentCompound.resultId); // إعادة تحميل نفس المستوى
            }, 3000);
        }
    }

    // --- أحداث اللعبة ---
    $mixButton.on('click', function() {
        if (elementsInMixer.length === 2) {
            // تأثير بصري للمزج
            $mixedResult.css('background-color', currentCompound.color);
            updateSenseiMessage(`تم المزج بنجاح! لون المركب الجديد هو ${currentCompound.name}.`);
            $(this).prop('disabled', true); // تعطيل زر المزج
            setTimeout(showQuestion, 1500); // إظهار السؤال بعد ثانية ونصف
        }
    });

    // --- بدء اللعبة ---
    loadLevel('H2O'); // بدء اللعبة بأول مستوى (تكوين الماء)

});
