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

    // --- متغيرات حالة اللعبة (تعديل طفيف) ---
    let currentLevel = 1;
    let elementsInMixer = [];
    let currentCompound = null;
    let availableElements = ['Na', 'Cl', 'H', 'O', 'C', 'K', 'Br', 'Mg', 'Ca', 'Fe', 'Cu', 'Zn', 'Ag', 'Au']; // قائمة بالعناصر المتاحة في كل مرة
    let discoveredCompounds = []; // لتتبع المركبات التي اكتشفها اللاعب

    // --- عناصر واجهة المستخدم (لم يتم تغييرها) ---
    const $elementsContainer = $('#elements-container');
    const $mixerTube = $('#mixer-tube');
    const $mixedResult = $('#mixed-result');
    const $mixButton = $('#mix-button');
    const $questionArea = $('#question-area');
    const $choicesContainer = $('#choices-container');
    const $senseiSpeech = $('#sensei-speech-bubble');
    const $levelInfo = $('#level-info');

    // --- وظائف مساعدة (تعديل طفيف) ---
    function updateSenseiMessage(message) {
        $senseiSpeech.fadeOut(200, function() {
            $(this).text(message).fadeIn(200);
        });
    }

    // --- التعديل الرئيسي في منطق تحميل المستوى ---
    function loadGame() {
        // إعادة تعيين الحالة
        elementsInMixer = [];
        currentCompound = null;
        $mixedResult.css('height', '0%').css('background-color', 'transparent');
        $mixButton.prop('disabled', true);
        $questionArea.hide();
        $elementsContainer.empty();

        // تحديث معلومات المستوى
        $levelInfo.text(`المركبات المكتشفة: ${discoveredCompounds.length} / ${chemicalData.compounds.length}`);

        // تحميل مجموعة من العناصر العشوائية أو الثابتة
        availableElements.forEach(elementId => {
            const element = chemicalData.elements.find(e => e.id === elementId);
            if (element) {
                const $tube = $(`<div class="element-tube" data-element-id="${element.id}" style="background-color: ${element.color};">
                                    <div class="element-name">${element.symbol}</div>
                                 </div>`);
                $elementsContainer.append($tube);
            }
        });

        updateSenseiMessage(`مرحبًا مجددًا! اسحب أي عنصرين إلى منطقة المزج واكتشف تفاعلًا جديدًا.`);
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
                    // لا نحدد اللون النهائي هنا، بل ننتظر زر المزج
                    updateSenseiMessage(`تمت إضافة ${element.name}!`);
                    if (elementsInMixer.length === 2) { $mixButton.prop('disabled', false); updateSenseiMessage(`ممتاز! الآن اضغط على زر "مزج الآن" لترى النتيجة.`); }
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
        updateSenseiMessage(`واو! لون جديد. ماذا تعتقد أن هذا المركب؟`);
    }

    // --- التعديل في دالة التحقق من الإجابة ---
    function checkAnswer($button, selectedAnswer) {
        $('.choice-button').prop('disabled', true);

        if (selectedAnswer === currentCompound.name) {
            $button.addClass('correct');
            updateSenseiMessage(`مذهل! لقد اكتشفت ${currentCompound.name} (${currentCompound.formula}). أضيف إلى سجل اكتشافاتك!`);
            
            // إضافة المركب إلى قائمة المكتشفات إذا لم يكن موجودًا بالفعل
            if (!discoveredCompounds.includes(currentCompound.resultId)) {
                discoveredCompounds.push(currentCompound.resultId);
            }

            setTimeout(() => {
                // إعادة تحميل اللعبة لاستكشاف المزيد
                loadGame();
            }, 3000);

        } else {
            $button.addClass('incorrect');
            updateSenseiMessage(`للأسف، هذه ليست الإجابة الصحيحة. حاول مرة أخرى لمعرفة هذا المركب الغامض.`);
            setTimeout(() => {
                // إعادة تحميل نفس التفاعل مرة أخرى
                $questionArea.hide();
                loadGame(); // ببساطة أعد تحميل اللعبة للسماح له بالمحاولة مرة أخرى
            }, 3000);
        }
    }

    // --- التعديل في حدث زر المزج ---
    $mixButton.on('click', function() {
        if (elementsInMixer.length === 2) {
            // البحث عن المركب الذي يتكون من هذين العنصرين
            const sortedReactants = [...elementsInMixer].sort();
            currentCompound = chemicalData.compounds.find(c => {
                return [...c.reactants].sort().every((val, index) => val === sortedReactants[index]);
            });

            if (currentCompound) {
                // إذا كان المزج ناجحًا
                $mixedResult.css('background-color', currentCompound.color);
                updateSenseiMessage(`تفاعل ناجح! انظر إلى هذا اللون الرائع.`);
                $(this).prop('disabled', true);
                setTimeout(showQuestion, 1500);
            } else {
                // إذا لم يكن هناك مركب معرف لهذين العنصرين
                $mixedResult.css('background-color', '#555555'); // لون رمادي للفشل
                updateSenseiMessage(`هذان العنصران لا يتحدان لتكوين مركب معروف في معملنا. حاول مزيجًا آخر!`);
                $(this).prop('disabled', true);
                setTimeout(() => {
                    loadGame(); // إعادة تحميل اللعبة
                }, 2500);
            }
        }
    });

    // --- بدء اللعبة ---
    loadGame(); // استدعاء دالة loadGame بدلاً من loadLevel

});
