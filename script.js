 $(document).ready(function() {

    // --- قاعدة البيانات الموسعة ---
    // تم تنظيم العناصر والمركبات لتغطية نطاق أوسع من الجدول الدوري والتفاعلات الشائعة
    const chemicalData = {
        elements: [
            // الفلزات القلوية (Alkali Metals)
            { id: 'Li', name: 'ليثيوم', symbol: 'Li', color: '#ff8080' },
            { id: 'Na', name: 'صوديوم', symbol: 'Na', color: '#ffffcc' },
            { id: 'K', name: 'بوتاسيوم', symbol: 'K', color: '#b3ffb3' },

            // الفلزات القلوية الترابية (Alkaline Earth Metals)
            { id: 'Mg', name: 'مغنيسيوم', symbol: 'Mg', color: '#ccffcc' },
            { id: 'Ca', name: 'كالسيوم', symbol: 'Ca', color: '#e6ffe6' },

            // الهالوجينات (Halogens)
            { id: 'F', name: 'فلور', symbol: 'F', color: '#ccffff' },
            { id: 'Cl', name: 'كلور', symbol: 'Cl', color: '#ccffcc' },
            { id: 'Br', name: 'بروم', symbol: 'Br', color: '#ffe6cc' },
            { id: 'I', name: 'يود', symbol: 'I', color: '#e6ccff' },

            // اللافلزات الأخرى
            { id: 'H', name: 'هيدروجين', symbol: 'H', color: '#ffcccc' },
            { id: 'He', name: 'هيليوم', symbol: 'He', color: '#ffb3ff' },
            { id: 'C', name: 'كربون', symbol: 'C', color: '#d9d9d9' },
            { id: 'N', name: 'نيتروجين', symbol: 'N', color: '#b3d9ff' },
            { id: 'O', name: 'أكسجين', symbol: 'O', color: '#cce5ff' },
            { id: 'Si', name: 'سيليكون', symbol: 'Si', color: '#e6e6e6' },
            { id: 'P', name: 'فوسفور', symbol: 'P', color: '#ffcc99' },
            { id: 'S', name: 'كبريت', symbol: 'S', color: '#ffff99' },

            // فلزات الانتقال (Transition Metals)
            { id: 'Fe', name: 'حديد', symbol: 'Fe', color: '#e67373' },
            { id: 'Cu', name: 'نحاس', symbol: 'Cu', color: '#b87333' },
            { id: 'Zn', name: 'زنك', symbol: 'Zn', color: '#a6a6a6' },
            { id: 'Ag', name: 'فضة', symbol: 'Ag', color: '#c0c0c0' },
            { id: 'Au', name: 'ذهب', symbol: 'Au', color: '#ffd700' },
        ],
        compounds: [
            // --- المركبات الثنائية البسيطة ---
            {
                resultId: 'NaCl',
                name: 'كلوريد الصوديوم (ملح الطعام)',
                formula: 'NaCl',
                color: '#ffffff',
                reactants: ['Na', 'Cl'],
                wrongChoices: ['بروميد الصوديوم', 'فلوريد الصوديوم']
            },
            {
                resultId: 'H2O',
                name: 'ماء',
                formula: 'H₂O',
                color: '#80dfff',
                reactants: ['H', 'O'],
                wrongChoices: ['بيروكسيد الهيدروجين', 'أوزون']
            },
            {
                resultId: 'CO2',
                name: 'ثاني أكسيد الكربون',
                formula: 'CO₂',
                color: '#f0f0f0',
                reactants: ['C', 'O'],
                wrongChoices: ['أول أكسيد الكربون', 'حمض الكربونيك']
            },
            {
                resultId: 'NaF',
                name: 'فلوريد الصوديوم',
                formula: 'NaF',
                color: '#e6ffff',
                reactants: ['Na', 'F'],
                wrongChoices: ['كلوريد الصوديوم', 'أكسيد الصوديوم']
            },
            {
                resultId: 'KBr',
                name: 'بروميد البوتاسيوم',
                formula: 'KBr',
                color: '#f2e6d9',
                reactants: ['K', 'Br'],
                wrongChoices: ['يوديد البوتاسيوم', 'كلوريد البوتاسيوم']
            },
            {
                resultId: 'MgO',
                name: 'أكسيد المغنيسيوم',
                formula: 'MgO',
                color: '#f5f5dc',
                reactants: ['Mg', 'O'],
                wrongChoices: ['هيدروكسيد المغنيسيوم', 'كربونات المغنيسيوم']
            },
            {
                resultId: 'CaO',
                name: 'أكسيد الكالسيوم (الجير الحي)',
                formula: 'CaO',
                color: '#ffffff',
                reactants: ['Ca', 'O'],
                wrongChoices: ['كربونات الكالسيوم', 'هيدروكسيد الكالسيوم']
            },
            {
                resultId: 'Fe2O3',
                name: 'أكسيد الحديد (III) (صدأ)',
                formula: 'Fe₂O₃',
                color: '#8b4513',
                reactants: ['Fe', 'O'],
                wrongChoices: ['أكسيد الحديد (II)', 'كبريتيد الحديد']
            },
            {
                resultId: 'CuO',
                name: 'أكسيد النحاس (II)',
                formula: 'CuO',
                color: '#000000',
                reactants: ['Cu', 'O'],
                wrongChoices: ['كبريتيد النحاس', 'نترات النحاس']
            },
            {
                resultId: 'ZnS',
                name: 'كبريتيد الزنك',
                formula: 'ZnS',
                color: '#ffffe0',
                reactants: ['Zn', 'S'],
                wrongChoices: ['أكسيد الزنك', 'كربونات الزنك']
            },
            {
                resultId: 'AgCl',
                name: 'كلوريد الفضة',
                formula: 'AgCl',
                color: '#f0f8ff',
                reactants: ['Ag', 'Cl'],
                wrongChoices: ['بروميد الفضة', 'يوديد الفضة']
            },
            {
                resultId: 'AuCl3',
                name: 'كلوريد الذهب (III)',
                formula: 'AuCl₃',
                color: '#ff4500',
                reactants: ['Au', 'Cl'],
                wrongChoices: ['أكسيد الذهب', 'كلوريد الفضة']
            },
            
            // --- مركبات ثلاثية العناصر (للمستويات المتقدمة) ---
            // ملاحظة: آلية اللعب الحالية تدعم عنصرين. هذه المركبات يمكن استخدامها في وضع "التحليل" أو كأهداف للمستويات الأكثر تقدمًا.
            // سنتركها هنا كقاعدة بيانات للمستقبل.
            /*
            {
                resultId: 'CaCO3',
                name: 'كربونات الكالسيوم (الجير)',
                formula: 'CaCO₃',
                color: '#f5f5f5',
                reactants: ['Ca', 'C', 'O'], // سيتطلب تعديل آلية اللعب
                wrongChoices: ['أكسيد الكالسيوم', 'هيدروكسيد الكالسيوم']
            },
            {
                resultId: 'H2SO4',
                name: 'حمض الكبريتيك',
                formula: 'H₂SO₄',
                color: '#d4d4d4',
                reactants: ['H', 'S', 'O'], // سيتطلب تعديل آلية اللعب
                wrongChoices: ['حمض الهيدروكلوريك', 'حمض النيتريك']
            }
            */
        ]
    };

    // --- متغيرات حالة اللعبة ---
    let currentLevel = 1;
    let elementsInMixer = [];
    let currentCompound = null;
    let availableLevels = ['NaCl', 'H2O', 'CO2', 'NaF', 'KBr', 'MgO', 'CaO', 'Fe2O3', 'CuO', 'ZnS', 'AgCl', 'AuCl3']; // قائمة بمعرفات المركبات للمستويات
    let currentLevelIndex = 0;

    // --- عناصر واجهة المستخدم ---
    const $elementsContainer = $('#elements-container');
    const $mixerTube = $('#mixer-tube');
    const $mixedResult = $('#mixed-result');
    const $mixButton = $('#mix-button');
    const $questionArea = $('#question-area');
    const $choicesContainer = $('#choices-container');
    const $senseiSpeech = $('#sensei-speech-bubble');
    const $levelInfo = $('#level-info');

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
            updateSenseiMessage("حدث خطأ في تحميل المستوى! ربما لم يتم العثور على المركب.");
            console.error("Compound not found:", levelCompoundId);
            return;
        }

        // تحديث معلومات المستوى
        $levelInfo.text(`المستوى: ${currentLevelIndex + 1} / ${availableLevels.length} - تكوين ${currentCompound.name}`);

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
                    
                    // لون المزج النهائي سيتم تحديده عند الضغط على زر المزج
                    if (elementsInMixer.length === 1) {
                        $mixedResult.css('background-color', element.color);
                    } else {
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

        const choices = [currentCompound.name, ...currentCompound.wrongChoices];
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
        $('.choice-button').prop('disabled', true);

        if (selectedAnswer === currentCompound.name) {
            $button.addClass('correct');
            updateSenseiMessage(`إجابة صحيحة! لقد تكونت ${currentCompound.name} (${currentCompound.formula}). أحسنت!`);
            
            // الانتقال للمستوى التالي
            setTimeout(() => {
                currentLevelIndex++;
                if (currentLevelIndex < availableLevels.length) {
                    loadLevel(availableLevels[currentLevelIndex]);
                } else {
                    // انتهت جميع المستويات
                    updateSenseiMessage("لقد أكملت جميع المستويات المتاحة! أنت عبقري حقيقي في الكيمياء. شكرًا للعب!");
                    $elementsContainer.empty();
                    $mixerTube.hide();
                    $questionArea.hide();
                }
            }, 2500);

        } else {
            $button.addClass('incorrect');
            updateSenseiMessage(`آه لا! الإجابة الصحيحة هي ${currentCompound.name}. حاول مرة أخرى!`);
            setTimeout(() => {
                loadLevel(availableLevels[currentLevelIndex]); // إعادة تحميل نفس المستوى
            }, 3000);
        }
    }

    // --- أحداث اللعبة ---
    $mixButton.on('click', function() {
        if (elementsInMixer.length === 2) {
            $mixedResult.css('background-color', currentCompound.color);
            updateSenseiMessage(`تم المزج بنجاح! لون المركب الجديد هو ${currentCompound.name}.`);
            $(this).prop('disabled', true);
            setTimeout(showQuestion, 1500);
        }
    });

    // --- بدء اللعبة ---
    loadLevel(availableLevels[currentLevelIndex]);

});
