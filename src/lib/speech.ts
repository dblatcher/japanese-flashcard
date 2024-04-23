const isJapanese = (voice: SpeechSynthesisVoice) => voice.lang === 'ja-JP'

const pickVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined => {
    const japaneseVoice = voices.find(isJapanese)
    const ukVoice = voices.find(voice => voice.lang === 'en-GB')
    const usVoice = voices.find(voice => voice.lang === 'en-US')
    return japaneseVoice ?? ukVoice ?? usVoice ?? voices[0]
}
const pickJapaneseVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined => {
    console.log(voices.filter(isJapanese))
    const japaneseVoice = voices.find(isJapanese)
    return japaneseVoice
}

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
        console.error("SpeechSynthesisUtterance.onerror", event);
    };

    utterThis.voice = voice


    utterThis.pitch = pitch;
    utterThis.rate = rate;
    utterThis.volume = .5
    synth.speak(utterThis);
}

export { speak, pickVoice, isJapanese, pickJapaneseVoice }