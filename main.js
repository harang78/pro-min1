const translations = {
    en: {
        subtitle: "Your Daily Dose of Luck",
        lottoNumbers: "Lotto Numbers",
        drawButton: "Draw Numbers",
        winningNumbers: "Winning Numbers",
        bonusNumber: "Bonus Number",
        partnershipInquiry: "Partnership Inquiry",
        formName: "Name:",
        formEmail: "Email:",
        formMessage: "Message:",
        formButton: "Send Inquiry",
        comments: "Comments",
    },
    ko: {
        subtitle: "오늘의 행운을 시험해보세요",
        lottoNumbers: "로또 번호",
        drawButton: "번호 뽑기",
        winningNumbers: "당첨 번호",
        bonusNumber: "보너스 번호",
        partnershipInquiry: "제휴 문의",
        formName: "이름:",
        formEmail: "이메일:",
        formMessage: "내용:",
        formButton: "문의 보내기",
        comments: "댓글",
    }
};

const setLanguage = (lang) => {
    document.querySelectorAll('[data-i18n-key]').forEach(element => {
        const key = element.getAttribute('data-i18n-key');
        element.textContent = translations[lang][key];
    });
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
    updateLangButtons(lang);
};

const updateLangButtons = (lang) => {
    document.getElementById('lang-ko').classList.toggle('active', lang === 'ko');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
};

class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: #0A1931;
                    background-color: #EFEFEF;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                :host(.drawn) {
                    background-color: #FFD700;
                    transform: scale(1.1);
                    box-shadow: 0 0 15px #FFD700, 0 0 25px #FFD700;
                }
            </style>
            <div>${number}</div>
        `;
    }
}

customElements.define('lotto-ball', LottoBall);

document.addEventListener('DOMContentLoaded', () => {
    // i18n setup
    const langKoButton = document.getElementById('lang-ko');
    const langEnButton = document.getElementById('lang-en');

    langKoButton.addEventListener('click', () => setLanguage('ko'));
    langEnButton.addEventListener('click', () => setLanguage('en'));

    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);

    // Lotto machine setup
    const numbersPool = document.getElementById('numbers-pool');
    const drawButton = document.getElementById('draw-button');
    const winningNumbersContainer = document.getElementById('winning-numbers');
    const bonusNumberContainer = document.getElementById('bonus-number');

    const numbers = Array.from({ length: 45 }, (_, i) => i + 1);

    function renderNumbersPool() {
        numbersPool.innerHTML = '';
        numbers.forEach(num => {
            const ball = document.createElement('lotto-ball');
            ball.setAttribute('number', num);
            numbersPool.appendChild(ball);
        });
    }

    function drawNumbers() {
        winningNumbersContainer.innerHTML = '';
        bonusNumberContainer.innerHTML = '';
        renderNumbersPool();

        let availableNumbers = [...numbers];
        let winningNumbers = [];

        for (let i = 0; i < 7; i++) {
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * availableNumbers.length);
                const drawnNumber = availableNumbers.splice(randomIndex, 1)[0];

                const ballInPool = numbersPool.querySelector(`lotto-ball[number="${drawnNumber}"]`);
                if (ballInPool) {
                    ballInPool.classList.add('drawn');
                }

                if (i < 6) {
                    winningNumbers.push(drawnNumber);
                    const winningBall = document.createElement('lotto-ball');
                    winningBall.setAttribute('number', drawnNumber);
                    winningBall.classList.add('drawn');
                    winningNumbersContainer.appendChild(winningBall);
                } else {
                    const bonusBall = document.createElement('lotto-ball');
                    bonusBall.setAttribute('number', drawnNumber);
                    bonusBall.classList.add('drawn');
                    bonusNumberContainer.appendChild(bonusBall);
                }
            }, i * 1000);
        }
    }

    drawButton.addEventListener('click', drawNumbers);

    renderNumbersPool();
});