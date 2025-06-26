document.addEventListener('DOMContentLoaded', () => {
    const englishPhraseEl = document.getElementById('english-phrase');
    const japaneseTranslationEl = document.getElementById('japanese-translation');
    const answerInputEl = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-button');
    const showAnswerButton = document.getElementById('show-answer-button');
    const nextButton = document.getElementById('next-button');
    const resultAreaEl = document.getElementById('result-area');

    // 英会話カードのデータ (例)
    const conversationCards = [
        { english: "Hello", japanese: "こんにちは" },
        { english: "Good morning", japanese: "おはようございます" },
        { english: "How are you?", japanese: "元気ですか？" },
        { english: "Thank you", japanese: "ありがとう" },
        { english: "Excuse me", japanese: "すみません" },
        { english: "What time is it?", japanese: "今何時ですか？" },
        { english: "Where is the bathroom?", japanese: "トイレはどこですか？" },
        { english: "I'm hungry.", japanese: "お腹が空きました。" },
        { english: "Can I have some water?", japanese: "お水をいただけますか？" },
        { english: "Nice to meet you.", japanese: "はじめまして。" }
    ];

    let currentCardIndex = 0;
    let currentCard = {};

    function loadCard() {
        if (conversationCards.length === 0) {
            englishPhraseEl.textContent = "カードがありません。";
            japaneseTranslationEl.style.display = 'none';
            answerInputEl.style.display = 'none';
            submitButton.style.display = 'none';
            showAnswerButton.style.display = 'none';
            nextButton.style.display = 'none';
            resultAreaEl.textContent = '';
            return;
        }
        currentCardIndex = Math.floor(Math.random() * conversationCards.length);
        currentCard = conversationCards[currentCardIndex];

        englishPhraseEl.textContent = currentCard.japanese; // 日本語訳を表示
        japaneseTranslationEl.textContent = currentCard.english; // 英語のフレーズは最初は非表示
        japaneseTranslationEl.style.display = 'none';

        answerInputEl.value = '';
        resultAreaEl.textContent = '';
        answerInputEl.disabled = false;
        submitButton.style.display = 'inline-block';
        showAnswerButton.style.display = 'inline-block';
        nextButton.style.display = 'none';
    }

    function checkAnswer() {
        const userAnswer = answerInputEl.value.trim().toLowerCase();
        const correctAnswer = currentCard.english.trim().toLowerCase();

        if (userAnswer === correctAnswer) {
            resultAreaEl.textContent = '正解！';
            resultAreaEl.className = 'correct';
        } else {
            resultAreaEl.textContent = `不正解。正解は: ${currentCard.english}`;
            resultAreaEl.className = 'incorrect';
        }
        japaneseTranslationEl.style.display = 'block'; // 答えを表示
        answerInputEl.disabled = true;
        submitButton.style.display = 'none';
        showAnswerButton.style.display = 'none';
        nextButton.style.display = 'inline-block';
    }

    function showAnswer() {
        japaneseTranslationEl.textContent = currentCard.english;
        japaneseTranslationEl.style.display = 'block';
        resultAreaEl.textContent = `正解は: ${currentCard.english}`;
        resultAreaEl.className = ''; // Remove correct/incorrect styling
        answerInputEl.disabled = true;
        submitButton.style.display = 'none';
        showAnswerButton.style.display = 'none';
        nextButton.style.display = 'inline-block';
    }

    submitButton.addEventListener('click', checkAnswer);
    answerInputEl.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
    showAnswerButton.addEventListener('click', showAnswer);
    nextButton.addEventListener('click', loadCard);

    // 初期カードの読み込み
    loadCard();
});
