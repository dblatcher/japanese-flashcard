



function speak(synth: SpeechSynthesis, text: string, voice: SpeechSynthesisVoice, pitch: number, rate: number) {
    if (synth.speaking) {
        console.error("speechSynthesis.speaking");
        return;
    }

    const utterThis = new SpeechSynthesisUtterance(text);

    utterThis.onend = function (event) {
        console.log("SpeechSynthesisUtterance.onend");
    };

    utterThis.onerror = function (event) {
        console.error("SpeechSynthesisUtterance.onerror");
    };

    utterThis.voice = voice


    utterThis.pitch = pitch;
    utterThis.rate = rate;
    utterThis.volume= .5
    synth.speak(utterThis);
    console.log('utterance', utterThis)
}


export { speak }