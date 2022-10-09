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
    translator()
})

function translator(){
    let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    if(!text){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1800,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'info',
            title: 'Seems The Input is Empty'
          })
          document.querySelector('.swal2-popup').style.background = '#1b1a1a'
        document.querySelector('.swal2-popup').style.color = 'white' 
        document.querySelector('.swal2-timer-progress-bar').style.background = 'rgb(102, 101, 101)'
        return
    }
    toText.setAttribute('placeholder', 'Translating...')
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}&de=shubhammaurya996633@gmail.com`
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText
        toText.setAttribute('placeholder', 'Translation')

    })
}

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


var widths = [0, 636, 3840];
function resizeFns() {
  if (window.innerWidth<widths[1]) {
     
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonColor: 'red',
          
          confirmButtonText: 'Close',
          text: 'Your Screen Size must be greator than 636px to run the Todo',
          footer: 'Please Try on a device whose width Greator than 636px '
        }).then((result) => {
          if (result.isConfirmed) {
           
            window.close()
          }
        })
      

      document.querySelector('.container').style.transform = 'scale(0)'
     
      

    




  }else{

      document.querySelector('.container').style.transform = 'scale(1)'
  }
}

window.onload = resizeFns;
resizeFns();

window.onresize = resizeFns