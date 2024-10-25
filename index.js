import { catsData } from "./data"

const emotionEl = document.querySelector('#emotion-radios')
const getImageBtn = document.querySelector('#get-image-btn')
const isGifEl = document.querySelector('#gifs-only-option')


getImageBtn.addEventListener('click', renderCat)

emotionEl.addEventListener('change', highlightCheckedOption)

function getMatchingCatsArray() {

    if (document.querySelector('input[type=radio]:checked')) {
        const selectedItem = document.querySelector('input[type=radio]:checked').value
        console.log(selectedItem);
        const isGifChecked = isGifEl.checked
    
        if (!isGifChecked) {
            const catMood = catsData.filter(function(cat) {
                return cat.emotionTags.includes(selectedItem)
            })
            console.log(catMood);
        } else {
            const catMood = catsData.filter(function(cat) {
                return cat.isGif === true && cat.emotionTags.includes(selectedItem)           
            })
        return catMood
        }   
    }    
}

    
function highlightCheckedOption(e) {

    const radios = document.querySelectorAll('.radio')
    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}
    
function getSingleCatObject() {
    console.log(getMatchingCatsArray());
    
}

function renderCat() {
    getSingleCatObject()
}

function getEmotionsArray(cats){
    const listEmotion = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!listEmotion.includes(emotion)) {
                listEmotion.push(emotion)
            }
        }
    }
    return listEmotion
}



function renderEmotionRadios(cats) {
    let emotionDiv = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions) {
        emotionDiv += `
        <div class='radio'>
            <label for=${emotion}>${emotion}</label>
            <input 
            type='radio'
            id=${emotion}
            value=${emotion}
            name='emotions'
            > 
        </div>
        `
    }
    emotionEl.innerHTML = emotionDiv
    // console.log(emotionDiv);
    
}

renderEmotionRadios(catsData)
