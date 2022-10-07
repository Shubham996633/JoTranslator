const fromText = document.querySelector('.from-text')
const toText = document.querySelector('.to-text')
const selectTag = document.querySelectorAll("select")
const exchangeIcon = document.querySelector(".exchange")
const translateBtn = document.querySelector('button')
const icons = document.querySelectorAll('.row i')
selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "hi-IN" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

exchangeIcon.addEventListener('click', () => {
    let tempText = fromText.value
    let tempLang = selectTag[0].value
    fromText.value = toText.value
    selectTag[0].value = selectTag[1].value

    toText.value = tempText
    selectTag[1].value = tempLang

})

translateBtn.addEventListener('click', () => {
    let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    if(!text) return
    toText.setAttribute('placeholder', 'Translating...')
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}&de=shubhammaurya996633@gmail.com`
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data)
        toText.value = data.responseData.translatedText
        toText.setAttribute('placeholder', 'Translation')

    })
})

icons.forEach(icon => {
    icon.addEventListener('click', ({target}) => {
        if(target.classList.contains('fa-copy')){
            if(target.id == 'from'){
                navigator.clipboard.writeText(fromText.value)
            }else{
                navigator.clipboard.writeText(toText.value)


            }
        }else{
            let utterance
            if(target.id == 'from'){
                utterance = new SpeechSynthesisUtterance(fromText.value)
                 utterance.lang = selectTag[0].value
            }else{
                
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = selectTag[1].value

            }
            speechSynthesis.speak(utterance)
        }
    })
})