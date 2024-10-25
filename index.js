import { catsData } from "./data"

const emotionEl = document.querySelector('#emotion-radios')
const getImageBtn = document.querySelector('#get-image-btn')
const isGifEl = document.querySelector('#gifs-only-option')
const modalEl = document.querySelector('#meme-modal-inner')
const memeModalEL = document.querySelector('#meme-modal')
const cancelBtn = document.querySelector('#meme-modal-close-btn')


emotionEl.addEventListener('change', highlightCheckedOption)

cancelBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)


function highlightCheckedOption(e) {

    const radios = document.querySelectorAll('.radio')
    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal() {

    modalEl.innerHTML = ""
    memeModalEL.style.display = "none"
}

function renderCat() {
    const catObject = getSingleCatObject()
    modalEl.innerHTML = `
    <img
    class="cat-img"
    src="./images/${catObject.image}"
    alt="CAT ALT TEXT"
    >
    `
    console.log(catObject.image);
    
    memeModalEL.style.display = "flex"
}

function getMatchingCatsArray() {

    if (document.querySelector('input[type=radio]:checked')) {
        const selectedItem = document.querySelector('input[type=radio]:checked').value
        console.log(selectedItem);
        const isGifChecked = isGifEl.checked
    
        const matchingCatsArray = catsData.filter(function(cat) {

            if (!isGifChecked) {
                return cat.emotionTags.includes(selectedItem)
            }
            else {
                return cat.isGif === true && cat.emotionTags.includes(selectedItem)           
            }
        })
        return matchingCatsArray   
    }    
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray();
    
    if (catsArray.length === 1) {
        return catsArray[0]
    }
    else {
        const randonNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randonNumber]         
        
        
    }
    
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
