
$(document).ready(function () {
    const chemicalData = {
        elements: [
            { id: 'Li', name: 'ليثيوم', symbol: 'Li', color: '#ff8080' },
            { id: 'Na', name: 'صوديوم', symbol: 'Na', color: '#ffffcc' },
            { id: 'K', name: 'بوتاسيوم', symbol: 'K', color: '#b3ffb3' },
            { id: 'Mg', name: 'مغنيسيوم', symbol: 'Mg', color: '#ccffcc' },
            { id: 'Ca', name: 'كالسيوم', symbol: 'Ca', color: '#e6ffe6' },
            { id: 'F', name: 'فلور', symbol: 'F', color: '#ccffff' },
            { id: 'Cl', name: 'كلور', symbol: 'Cl', color: '#ccffcc' },
            { id: 'Br', name: 'بروم', symbol: 'Br', color: '#ffe6cc' },
            { id: 'I', name: 'يود', symbol: 'I', color: '#e6ccff' },
            { id: 'H', name: 'هيدروجين', symbol: 'H', color: '#ffcccc' },
            { id: 'He', name: 'هيليوم', symbol: 'He', color: '#ffb3ff' },
            { id: 'C', name: 'كربون', symbol: 'C', color: '#d9d9d9' },
            { id: 'N', name: 'نيتروجين', symbol: 'N', color: '#b3d9ff' },
            { id: 'O', name: 'أكسجين', symbol: 'O', color: '#cce5ff' },
            { id: 'Si', name: 'سيليكون', symbol: 'Si', color: '#e6e6e6' },
            { id: 'P', name: 'فوسفور', symbol: 'P', color: '#ffcc99' },
            { id: 'S', name: 'كبريت', symbol: 'S', color: '#ffff99' },
            { id: 'Fe', name: 'حديد', symbol: 'Fe', color: '#e67373' },
            { id: 'Cu', name: 'نحاس', symbol: 'Cu', color: '#b87333' },
            { id: 'Zn', name: 'زنك', symbol: 'Zn', color: '#a6a6a6' },
            { id: 'Ag', name: 'فضة', symbol: 'Ag', color: '#c0c0c0' },
            { id: 'Au', name: 'ذهب', symbol: 'Au', color: '#ffd700' }
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
            { resultId: 'AuCl3', name: 'كلوريد الذهب (III)', formula: 'AuCl₃', color: '#ff4500', reactants: ['Au', 'Cl'], wrongChoices: ['أكسيد الذهب', 'كلوريد الفضة'] }
        ]
    };

    // حالة اللعبة ومتحولات
    let currentLevel = 1;
    let elementsInMixer = [];
    let currentCompound = null;
    let discoveredCompounds = [];

    const $elementsContainer = $('#elements-container');
    const $mixerTube = $('#mixer-tube');
    const $mixedResult = $('#mixed-result');
    const $mixButton = $('#mix-button');
    const $questionArea = $('#question-area');
    const $choicesContainer = $('#choices-container');
    const $senseiSpeech = $('#sensei-speech-bubble');
    const $levelInfo = $('#level-info');

    // تحديث رسالة المرشد تدريجياً بدون وميض
    let messageTimeout;
    function updateSenseiMessage(message) {
        clearTimeout(messageTimeout);
        $senseiSpeech.fadeTo(150, 0.1, function() {
            $(this).text(message).fadeTo(150, 1);
        });
    }

    // تحميل العناصر المتاحة والتهيئة
    function loadGame() {
        elementsInMixer = [];
        currentCompound = null;
        $mixedResult.css({ height: '0%', backgroundColor: 'transparent' });
        $mixButton.prop('disabled', true).attr('aria-disabled', 'true');
        $questionArea.hide();
        $elementsContainer.empty();

        $levelInfo.text(`المركبات المكتشفة: ${discoveredCompounds.length} / ${chemicalData.compounds.length}`);

        // عناصر متاحة حسب تقدم اللاعب (حاليا الكل مفتوح)
        let availableElements = chemicalData.elements.map(e => e.id);

        availableElements.forEach((elementId) => {
            const element = chemicalData.elements.find(e => e.id === elementId);
            if (element) {
                const $tube = $('<div>', {
                    class: 'element-tube',
                    'data-element-id': element.id,
                    tabindex: 0,
                    role: 'button',
                    'aria-grabbed': 'false',
                    'aria-label': `عنصر ${element.name} (${element.symbol})`
                });
                $tube.append($('<div>', { class: 'element-name', text: element.symbol }));
                $tube.css('background', element.color);
                $elementsContainer.append($tube);
            }
        });

        updateSenseiMessage('مرحبًا مجددًا! اسحب أي عنصرين إلى منطقة المزج واكتشف تفاعلًا جديدًا.');
        initDragAndDrop();
    }

    // تهيئة السحب والإسقاط مع دعم وصولي
    function initDragAndDrop() {
        $('.element-tube').attr('aria-grabbed', 'false').draggable({
            revert: 'invalid',
            zIndex: 1100,
            start: function(event, ui) { ui.helper.css('transform', 'rotate(5deg) scale(1.1)'); $(this).attr('aria-grabbed', 'true'); },
            stop: function(event, ui) { ui.helper.css('transform', 'rotate(0deg) scale(1)'); $(this).attr('aria-grabbed', 'false'); }
        });

        $mixerTube.droppable({
            accept: '.element-tube',
            drop: function(event, ui) {
                const elementId = ui.draggable.data('element-id');
                if (elementsInMixer.length < 2 && !elementsInMixer.includes(elementId)) {
                    elementsInMixer.push(elementId);
                    ui.draggable.fadeOut(400);
                    const element = chemicalData.elements.find(e => e.id === elementId);
                    const currentHeight = elementsInMixer.length * 50;
                    $mixedResult.css('height', `${currentHeight}%`);
                    updateSenseiMessage(`تمت إضافة ${element.name}!`);
                    if (elementsInMixer.length === 2) {
                        $mixButton.prop('disabled', false).attr('aria-disabled', 'false');
                        updateSenseiMessage('ممتاز! الآن اضغط على زر "مزج الآن" لترى النتيجة.');
                    }
                } else {
                    updateSenseiMessage('لقد أضفت هذا العنصر بالفعل أو أن المنطقة ممتلئة!');
                }
            }
        });
    }

    // عرض السؤال والاختيارات بعد المزج
    function showQuestion() {
        $questionArea.show();
        $choicesContainer.empty();

        const choices = [...currentCompound.wrongChoices, currentCompound.name];
        shuffleArray(choices); // خلط الاجابات

        choices.forEach(choice => {
            const $button = $('<button>', {
                class: 'choice-button',
                role: 'radio',
                'aria-checked': 'false',
                text: choice,
                tabindex: 0
            });
            $button.on('click keypress', function(e) {
                if (e.type === 'click' || (e.type === 'keypress' && (e.key === 'Enter' || e.key === ' '))) {
                    checkAnswer($button, choice);
                }
            });
            $choicesContainer.append($button);
        });
        updateSenseiMessage('واو! لون جديد. ماذا تعتقد أن هذا المركب؟');
        $choicesContainer.find('.choice-button').first().focus();
    }

    // التحقق من الإجابة
    function checkAnswer($button, selectedAnswer) {
        $('.choice-button').attr('disabled', true).attr('aria-disabled', 'true');
        $('.choice-button').attr('aria-checked', 'false');

        if (selectedAnswer === currentCompound.name) {
            $button.addClass('correct').attr('aria-checked', 'true');
            updateSenseiMessage(`مذهل! لقد اكتشفت ${currentCompound.name} (${currentCompound.formula}). أضيف إلى سجل اكتشافاتك!`);
            if (!discoveredCompounds.includes(currentCompound.resultId)) {
                discoveredCompounds.push(currentCompound.resultId);
            }
            setTimeout(() => loadGame(), 2800);
        } else {
            $button.addClass('incorrect').attr('aria-checked', 'true');
            updateSenseiMessage('للأسف، هذه ليست الإجابة الصحيحة. حاول مرة أخرى لمعرفة هذا المركب الغامض.');
            setTimeout(() => loadGame(), 3200);
        }
    }

    // خلط عناصر مصفوفة
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // حدث ثم زر المزج
    $mixButton.on('click', function () {
        if (elementsInMixer.length === 2) {
            const sortedReactants = [...elementsInMixer].sort();
            currentCompound = chemicalData.compounds.find(c => {
                return [...c.reactants].sort().every((val, index) => val === sortedReactants[index]);
            });
            if (currentCompound) {
                $mixedResult.css('background', `linear-gradient(to top, ${currentCompound.color}, ${currentCompound.color}cc)`);
                updateSenseiMessage('تفاعل ناجح! انظر إلى هذا اللون الرائع.');
                $(this).prop('disabled', true).attr('aria-disabled', 'true');
                setTimeout(showQuestion, 1600);
            } else {
                $mixedResult.css('background', 'linear-gradient(to top, #555555, #777777)');
                updateSenseiMessage('هذان العنصران لا يتحدان لتكوين مركب معروف في معملنا. حاول مزيجًا آخر!');
                $(this).prop('disabled', true).attr('aria-disabled', 'true');
                setTimeout(() => loadGame(), 2800);
            }
        }
    });

    loadGame();
});


