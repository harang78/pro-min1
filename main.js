// More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/jl_z0qpqE/";

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // Hide the start button
        document.querySelector('.start-btn').style.display = 'none';
        // Show webcam container
        document.getElementById("webcam-container").style.display = 'block';

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        // Clear previous labels if any, and prepare for new predictions
        labelContainer.innerHTML = ''; 
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        
        let highestPrediction = prediction[0];
        for (let i = 1; i < maxPredictions; i++) {
            if (prediction[i].probability > highestPrediction.probability) {
                highestPrediction = prediction[i];
            }
        }

        let resultText = "";
        if (highestPrediction.className === "dog") {
            resultText = "당신은 멍뭉미 넘치는 강아지상! (확률: " + (highestPrediction.probability * 100).toFixed(2) + "%)";
        } else if (highestPrediction.className === "cat") {
            resultText = "당신은 시크한 매력의 고양이상! (확률: " + (highestPrediction.probability * 100).toFixed(2) + "%)";
        } else {
            // Fallback for unexpected class names, though with 'dog' and 'cat' it should ideally not be hit.
            resultText = "분류 결과: " + highestPrediction.className + " (확률: " + (highestPrediction.probability * 100).toFixed(2) + "%)";
        }
        labelContainer.innerHTML = resultText; // Display only the highest prediction
    }