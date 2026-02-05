// Teachable Machine 모델 URL
const URL = "https://teachablemachine.withgoogle.com/models/jl_z0qpqE/";

let model, labelContainer, maxPredictions;

// DOM 요소 가져오기
const uploadInput = document.getElementById('upload');
const imagePreview = document.getElementById('image-preview');
const labelContainerElem = document.getElementById('label-container');

// 페이지 로드 시 모델 초기화
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // 모델과 메타데이터 로드
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainerElem.innerHTML = "사진을 업로드하여 테스트를 시작하세요!";
}

// 이미지 예측 함수
async function predict(image) {
    // 예측 실행
    const prediction = await model.predict(image);

    // 가장 확률이 높은 클래스 찾기
    let highestPrediction = prediction[0];
    for (let i = 1; i < maxPredictions; i++) {
        if (prediction[i].probability > highestPrediction.probability) {
            highestPrediction = prediction[i];
        }
    }
    
    // 결과 표시
    let resultText = "";
    if (highestPrediction.className === "dog") {
        resultText = "당신은 멍뭉미 넘치는 강아지상! (확률: " + (highestPrediction.probability * 100).toFixed(2) + "%)";
    } else if (highestPrediction.className === "cat") {
        resultText = "당신은 시크한 매력의 고양이상! (확률: " + (highestPrediction.probability * 100).toFixed(2) + "%)";
    } else {
        // Fallback for unexpected class names, though with 'dog' and 'cat' it should ideally not be hit.
        resultText = "분류 결과: " + highestPrediction.className + " (확률: " + (highestPrediction.probability * 100).toFixed(2) + "%)";
    }
    labelContainerElem.innerHTML = resultText;
}

// 파일 업로드 이벤트 리스너
uploadInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            // 이미지 미리보기 업데이트
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="업로드된 이미지">`;
            
            // 예측 실행
            const image = new Image();
            image.src = e.target.result;
            image.onload = () => predict(image);
        };
        reader.readAsDataURL(file);
    }
});


// 앱 시작
init();
