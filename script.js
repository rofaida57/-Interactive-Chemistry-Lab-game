 $(document).ready(function() {

    // --- قاعدة البيانات الموسعة (لم يتم تغييرها) ---
    const chemicalData = {
        elements: [
            { id: 'Li', name: 'ليثيوم', symbol: 'Li', color: '#ff8080' }, { id: 'Na', name: 'صوديوم', symbol: 'Na', color: '#ffffcc' },
            { id: 'K', name: 'بوتاسيوم', symbol: 'K', color: '#b3ffb3' }, { id: 'Mg', name: 'مغنيسيوم', symbol: 'Mg', color: '#ccffcc' },
            { id: 'Ca', name: 'كالسيوم', symbol: 'Ca', color: '#e6ffe6' }, { id: 'F', name: 'فلور', symbol: 'F', color: '#ccffff' },
            { id: 'Cl', name: 'كلور', symbol: 'Cl', color: '#ccffcc' }, { id: 'Br', name: 'بروم', symbol: 'Br', color: '#ffe6cc' },
            { id: 'I', name: 'يود', symbol: 'I', color: '#e6ccff' }, { id: 'H', name: 'هيدروجين', symbol: 'H', color: '#ffcccc' },
            { id: 'He', name: 'هيليوم', symbol: 'He', color: '#ffb3ff' }, { id: 'C', name: 'كربون', symbol: 'C', color: '#d9d9d9' },
            { id: 'N', name: 'نيتروجين', symbol: 'N', color: '#b3d9ff' }, { id: 'O', name: 'أكسجين', symbol: 'O', color: '#cce5ff' },
            { id: 'Si', name: 'سيليكون', symbol: 'Si', color: '#e6e6e6' }, { id: 'P', name: 'فوسفور', symbol: 'P', color: '#ffcc99' },
            { id: 'S', name: 'كبريت', symbol: 'S', color: '#ffff99' }, { id: 'Fe', name: 'حديد', symbol: 'Fe', color: '#e67373' },
            { id: 'Cu', name: 'نحاس', symbol: 'Cu', color: '#b87333' }, { id: 'Zn', name: 'زنك', symbol: 'Zn', color: '#a6a6a6' },
            { id: 'Ag', name: 'فضة', symbol: 'Ag', color: '#c0c0c0' }, { id: 'Au', name: 'ذهب', symbol: 'Au', color: '#ffd700' },
        ],
        compounds: [
            { resultId: 'NaCl', name: 'كلوريد الصوديوم (ملح الطعام)', formula: 'NaCl', color: '#ffffff', reactants: ['Na', 'Cl'], wrongChoices: ['بروميد الصوديوم', 'فلوريد الصوديوم'] },
            { resultId: 'H2O', name: 'ماء', formula: 'H₂O', color: '#80dfff', reactants: ['H', 'O'], wrongChoices: ['بيروكسيد الهيدروجين', 'أوزون'] },
            { resultId: 'CO2', name: 'ثاني أكسيد الكربون', formula: 'CO₂', color: '#f0f0f0', reactants: ['C', 'O'], wrongChoices: ['أول أكسيد الكربون', 'حمض الكربونيك'] },
            { resultId: 'NaF', name: 'فلوريد الصوديوم', formula: 'NaF', color: '#e6ffff', reactants: ['Na', 'F'], wrongChoices: ['كلوريد الصوديوم', 'أكسيد الصوديوم'] },
            { resultId: 'KBr', name: 'بروميد البوتاسيوم', formula: 'KBr', color: '#f2e6d9', reactants: ['K', 'Br'], wrongChoices: ['يوديد البوتاسيوم', 'كلوريد البوتاسيوم'] },
            { resultId: 'MgO', name: 'أكسيد المغنيسيوم', formula: 'MgO', color: '#f5f5dc', reactants: ['Mg', 'O'], wrongChoices: ['هيدروكسيد المغنيسيوم', 'كربونات المغنيسيوم'] },
            { resultId: 'CaO', name: 'أكسيد الكالسيوم (الجير الحي)', formula: 'CaO', color: '#ffffff', reactants: ['Ca', 'O'], wrongChoices: ['كربونات الكالسيوم', 'هيدروكسيد الكالسيوم'] },
            { resultId: 'Fe2O3', name: 'أكسيد الحديد (III) (صدأ)', formula: 'Fe₂O₃', color: '#8b4513', reactants: ['Fe', 'O'], wrongChoices: ['أكسيد الحديد (II)', 'كبريتيد الحديد'] },
            { resultId: 'CuO', name: 'أكسيد النحاس (II)', formula: 'CuO', color: '#000000', reactants: ['Cu', 'O'], wrongChoices: ['كبريتيد النحاس', 'نترات النحاس'] },
            { resultId: 'ZnS', name: 'كبريتيد الزنك', formula: 'ZnS', color: '#ffffe0', reactants: ['Zn', 'S'], wrongChoices: ['أكسيد الزنك', 'كربونات الزنك'] },
            { resultId: 'AgCl', name: 'كلوريد الفضة', formula: 'AgCl', color: '#f0f8ff', reactants: ['Ag', 'Cl'], wrongChoices: ['بروميد الفضة', 'يوديد الفضة'] },
            { resultId: 'AuCl3', name: 'كلوريد الذهب (III)', formula: 'AuCl₃', color: '#ff4500', reactants: ['Au', 'Cl'], wrongChoices: ['أكسيد الذهب', 'كلوريد الفضة'] },
        ]
    };

    // --- متغيرات حالة اللعبة (لم يتم تغييرها) ---
    let currentLevel = 1;
    let elementsInMixer = [];
    let currentCompound = null;
    let availableLevels = ['NaCl', 'H2O', 'CO2', 'NaF', 'KBr', 'MgO', 'CaO', 'Fe2O3', 'CuO', 'ZnS', 'AgCl', 'AuCl3'];
    let currentLevelIndex = 0;

    // --- عناصر واجهة المستخدم (لم يتم تغييرها) ---
    const $elementsContainer = $('#elements-container');
    const $mixerTube = $('#mixer-tube');
    const $mixedResult = $('#mixed-result');
    const $mixButton = $('#mix-button');
    const $questionArea = $('#question-area');
    const $choicesContainer = $('#choices-container');
    const $senseiSpeech = $('#sensei-speech-bubble');
    const $levelInfo = $('#level-info');

    // --- وظائف مساعدة (لم يتم تغييرها) ---
    function updateSenseiMessage(message) {
        $senseiSpeech.fadeOut(200, function() {
            $(this).text(message).fadeIn(200);
        });
    }

    function loadLevel(levelCompoundId) {
        elementsInMixer = [];
        $mixedResult.css('height', '0%').css('background-color', 'transparent');
        $mixButton.prop('disabled', true);
        $questionArea.hide();
        $elementsContainer.empty();

        currentCompound = chemicalData.compounds.find(c => c.resultId === levelCompoundId);
        if (!currentCompound) {
            updateSenseiMessage("حدث خطأ في تحميل المستوى!");
            console.error("Compound not found:", levelCompoundId);
            return;
        }

        $levelInfo.text(`المستوى: ${currentLevelIndex + 1} / ${availableLevels.length} - تكوين ${currentCompound.name}`);

        currentCompound.reactants.forEach(elementId => {
            const element = chemicalData.elements.find(e => e.id === elementId);
            if (element) {
                const $tube = $(`<div class="element-tube" data-element-id="${element.id}" style="background-color: ${element.color};">
                                    <div class="element-name">${element.symbol}</div>
                                 </div>`);
                $elementsContainer.append($tube);
            }
        });

        updateSenseiMessage(`حاول تكوين مركب ${currentCompound.name}. اسحب العناصر إلى منطقة المزج.`);
        initDragAndDrop();
    }

    function initDragAndDrop() {
        $('.element-tube').draggable({
            revert: 'invalid', zIndex: 1000,
            start: function(event, ui) { ui.helper.css('transform', 'rotate(5deg)'); },
            stop: function(event, ui) { ui.helper.css('transform', 'rotate(0deg)'); }
        });
        $mixerTube.droppable({
            accept: '.element-tube',
            drop: function(event, ui) {
                const elementId = ui.draggable.data('element-id');
                if (elementsInMixer.length < 2 && !elementsInMixer.includes(elementId)) {
                    elementsInMixer.push(elementId); ui.draggable.hide();
                    const element = chemicalData.elements.find(e => e.id === elementId);
                    const currentHeight = (elementsInMixer.length) * 50;
                    $mixedResult.css('height', `${currentHeight}%`);
                    if (elementsInMixer.length === 1) { $mixedResult.css('background-color', element.color); }
                    else { $mixedResult.css('background-color', currentCompound.color); }
                    updateSenseiMessage(`تمت إضافة ${element.name}!`);
                    if (elementsInMixer.length === 2) { $mixButton.prop('disabled', false); updateSenseiMessage(`رائع! اضغط على زر "مزج الآن".`); }
                } else { updateSenseiMessage(`لقد أضفت هذا العنصر بالفعل أو أن المنطقة ممتلئة!`); }
            }
        });
    }

    function showQuestion() {
        $questionArea.show(); $choicesContainer.empty();
        const choices = [currentCompound.name, ...currentCompound.wrongChoices]; choices.sort(() => Math.random() - 0.5);
        choices.forEach(choice => {
            const $button = $(`<button class="choice-button">${choice}</button>`);
            $button.on('click', function() { checkAnswer($(this), choice); });
            $choicesContainer.append($button);
        });
        updateSenseiMessage(`ماذا نتج لدينا؟ اختر الإجابة الصحيحة!`);
    }

    // --- التعديل الرئيسي هنا ---
    function checkAnswer($button, selectedAnswer) {
        $('.choice-button').prop('disabled', true); // تعطيل جميع الأزرار فورًا

        if (selectedAnswer === currentCompound.name) {
            $button.addClass('correct');
            updateSenseiMessage(`أحسنت! إجابة صحيحة تمامًا. لقد تكونت ${currentCompound.name} (${currentCompound.formula}).`);
            setTimeout(() => {
                currentLevelIndex++;
                if (currentLevelIndex < availableLevels.length) { loadLevel(availableLevels[currentLevelIndex]); }
                else {
                    updateSenseiMessage("مذهل! لقد أكملت جميع المستويات. أنت الآن كيميائي حقيقي!");
                    $elementsContainer.empty(); $mixerTube.hide(); $questionArea.hide();
                }
            }, 2500);
        } else {
            $button.addClass('incorrect');
            // --- التعديل: رسالة خطأ لا تكشف الإجابة ---
            updateSenseiMessage(`آه، هذه ليست الإجابة الصحيحة. لا تيأس، فشل التجربة هو جزء من العلم! حاول مرة أخرى.`);
            setTimeout(() => {
                loadLevel(availableLevels[currentLevelIndex]); // إعادة تحميل نفس المستوى
            }, 3000);
        }
    }

    // --- أحداث اللعبة (لم يتم تغييرها) ---
    $mixButton.on('click', function() {
        if (elementsInMixer.length === 2) {
            $mixedResult.css('background-color', currentCompound.color);
            updateSenseiMessage(`تم المزج بنجاح! انظر إلى اللون الرائع.`);
            $(this).prop('disabled', true);
            setTimeout(showQuestion, 1500);
        }
    });

    // --- بدء اللعبة (لم يتم تغييرها) ---
    loadLevel(availableLevels[currentLevelIndex]);

});
