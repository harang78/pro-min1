const URL = "https://teachablemachine.withgoogle.com/models/uftNTflll/";

let model, resultContainer;
const imageUpload = document.getElementById('image-upload');
const uploadedImage = document.getElementById('uploaded-image');

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Load the model and metadata
    try {
        model = await tmImage.load(modelURL, metadataURL);
    } catch (e) {
        console.error("Error loading the model:", e);
        resultContainer.innerHTML = "모델을 로드하는 데 실패했습니다. 페이지를 새로고침해주세요.";
        return;
    }
    
    resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = "사진을 업로드해주세요."; // Initial prompt
}

async function predict(image) {
    if (!model) {
        console.error("Model not loaded yet");
        return;
    }
    const prediction = await model.predict(image);
    let highestProb = 0;
    let bestClass = "";

    for (let i = 0; i < prediction.length; i++) {
        if (prediction[i].probability > highestProb) {
            highestProb = prediction[i].probability;
            bestClass = prediction[i].className;
        }
    }

    if (bestClass === "웰시코기") {
        resultContainer.innerHTML = `당신은 ${Math.round(highestProb * 100)}% 확률로 웰시코기상! 🐕`;
    } else if (bestClass === "포메라니안") {
        resultContainer.innerHTML = `당신은 ${Math.round(highestProb * 100)}% 확률로 포메라니안상! 🐶`;
    } else {
         resultContainer.innerHTML = "얼굴을 명확하게 보여주는 사진을 업로드해주세요!";
    }
}

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';
            
            // Wait for image to be fully loaded into the img tag before predicting
            uploadedImage.onload = () => {
                resultContainer.innerHTML = "분석 중..."; // Show loading message
                setTimeout(() => predict(uploadedImage), 100); // Add a small delay for rendering
            };
        };
        reader.readAsDataURL(file);
    }
});

// Initialize the application
init();