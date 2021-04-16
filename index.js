window.onload = function () {
    const startBtn = document.createElement("button");
    startBtn.innerHTML = "Start listening";
    const result = document.createElement("div");
    const processing = document.createElement("p");

    document.getElementById("data").appendChild(startBtn);
    document.getElementById("data").appendChild(result);
    document.getElementById("data").appendChild(processing);


    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (typeof SpeechRecognition === "undefined") {
        startBtn.remove();
        result.innerHTML = "<b>Browser does not support Speech API. Please download latest chrome.<b>";
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    console.log(recognition)
    function process(speech_text) {
        return "....";
    }
    recognition.onresult = event => {
        const last = event.results.length - 1;
        const res = event.results[last];
        const text = res[0].transcript;
        if (res.isFinal) {
            processing.innerHTML = "processing ....";
            const response = process(text);

            const p = document.createElement("p");
            p.innerHTML = `You said: ${text} </br>Siri said: ${response}`;
            processing.innerHTML = "";
            result.appendChild(p);
            // add text to speech later
        } else {
            processing.innerHTML = `listening: ${text}`;
        }
    }
    let listening = false;
    toggleBtn = () => {
        console.log(listening)
        if (listening) {
            recognition.stop();
            startBtn.textContent = "Start listening";
        } else {
            recognition.start();
            startBtn.textContent = "Stop listening";
        }
        listening = !listening;
    };
    startBtn.addEventListener("click", toggleBtn);
    function process(rawText) {
        // remove space and lowercase text
        let text = rawText.replace(/\s/g, "");
        text = text.toLowerCase();
        let response = null;
        switch (text) {
            case "hello":
                response = "hi, how are you doing?"; break;
            case "what'syourname":
                response = "My name's Siri."; break;
            case "howareyou":
                response = "I'm good."; break;
            case "whattimeisit":
                response = new Date().toLocaleTimeString(); break;
            case "stop":
                response = "Bye!!";
                toggleBtn(); // stop listening
        }
        if (!response) {
            window.open(`http://google.com/search?q=${rawText.replace("search", "")}`, "_blank");
            return "I found some information for " + rawText;
        }
        speechSynthesis.speak(new SpeechSynthesisUtterance(response));
        return response;
    }

}