prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach(camera);


function snapshot() {
    Webcam.snap(function (dataURI) {
        document.getElementById("result").innerHTML = "<img id= 'snapshot' src=" + dataURI + ">";
    });




}
console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-NrK6lMXh/model.json', modelloaded);

function modelloaded() {
    console.log("model is loaded ");
}
function speak() {
    var synth = window.speechSynthesis;
    speakdata1 = "The First Prediction is:" + prediction1;
    speakdata2 = "The Second Prediction is:" + prediction2;
    utterthis = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
    synth.speak(utterthis);



}

function check() {
    img = document.getElementById("snapshot");

    classifier.classify(img, gotresults);

}
function gotresults(error, results) {
    if (error) {
        console.error(error);

    }
    else {
        console.log(results);
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        document.getElementById("emotion1").innerHTML = prediction1;
        document.getElementById("emotion2").innerHTML = prediction2;
        speak();
        if (prediction1 == "happy") {
            document.getElementById("emoji1").innerHTML = "&#128522";
        }
        if (prediction1 == "sad") {
            document.getElementById("emoji1").innerHTML = "&#128532";
        }
        if (prediction1 == "angry") {
            document.getElementById("emoji1").innerHTML = "&#128548";
        }
        if (prediction2 == "happy") {
            document.getElementById("emoji2").innerHTML = "&#128522";
        }
        if (prediction2 == "sad") {
            document.getElementById("emoji2").innerHTML = "&#128532";
        }
        if (prediction2 == "angry") {
            document.getElementById("emoji2").innerHTML = "&#128548";
        }




    }
}



