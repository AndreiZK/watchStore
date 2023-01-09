import reviews from "./reviews.js"
import watchesArray from "./watches.js"

const reviewEl1 = document.getElementById('review-1')
const reviewEl2 = document.getElementById('review-2')
const arrowRight = document.getElementById('arrow-right')
const arrowLeft = document.getElementById('arrow-left')
const dots = document.querySelectorAll('.dot')
const form = document.querySelector('form')
const usersFromForm = []
const modal = document.getElementById('modal')
let pageNum = 2

form.addEventListener('submit', function(e) {
    e.preventDefault()
    let formName = document.getElementById('input-name')
    let formPhone = document.getElementById('input-phone')
    usersFromForm.push({name: formName.value, phone: formPhone.value})
    localStorage.setItem('leads', JSON.stringify(usersFromForm))
    console.log(JSON.parse(localStorage.getItem('leads')))
    formName.value = ''
    formPhone.value = ''

    modal.classList.remove('hidden')
    setTimeout(() => {
        modal.classList.add('hidden')
    }, 3000)
})

arrowRight.addEventListener('click', function() {
    if (pageNum > 6) {
        pageNum = 0
    }
    getReviewsHtml(pageNum)
    
    dotsColor(pageNum)
    pageNum += 2
})

arrowLeft.addEventListener('click', function() {
    pageNum -= 2
    if (pageNum < 0) {
        pageNum = 6
    }

    getReviewsHtml(pageNum)
    
    dotsColor(pageNum)
})

document.addEventListener('click', function(e) {
    const dotsArray = document.getElementsByClassName('dot')
    if (e.target.classList.contains('dot')) {
        for (let i = 0; i < dotsArray.length; i++) {
            if (e.target === dotsArray[i]) {
                pageNum = (i === 0) ? 0 : i*2
                getReviewsHtml(pageNum)
                dotsColor(pageNum)
            }
        }
        }
})

function renderWatchList() {
    let watchesListHTML = ''
    for (let watch of watchesArray) {
        watchesListHTML += `
        <div class="watch">
            <h3 class="watch-title">${watch.name}</h3>
                <ul>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                </ul>
                <a class="price" href="#">${watch.price} руб</a>
                <img class="watch-image" src="${watch.img}" alt="">
        </div>
        `
    }
    document.getElementById('watches-catalogue-container').innerHTML += watchesListHTML
}

function getReviewsHtml(pagenum) {
    reviewEl1.innerHTML = `<h4 class="review-title">"${reviews[pageNum].title}"</h4>
    <img class="customer-img" src="${reviews[pageNum].img}" alt="">
    <p class="review-text">${reviews[pageNum].text}</p>
    <p class="customer">${reviews[pageNum].name}</p>`
    reviewEl2.innerHTML = `<h4 class="review-title">"${reviews[pageNum+1].title}"</h4>
    <img class="customer-img" src="${reviews[pageNum+1].img}" alt="">
    <p class="review-text">${reviews[pageNum+1].text}</p>
    <p class="customer">${reviews[pageNum+1].name}</p>`
}


function dotsColor(num) {
    let dotNum = num/2
    for (let i = 0; i < dots.length; i++) {
        dots[i].id = ''
    }
    dots[dotNum].id = 'black-dot'
}

reviewEl1.innerHTML = `<h4 class="review-title">"${reviews[0].title}"</h4>
    <img class="customer-img" src="${reviews[0].img}" alt="">
    <p class="review-text">${reviews[0].text}</p>
    <p class="customer">${reviews[0].name}</p>`
reviewEl2.innerHTML = `<h4 class="review-title">"${reviews[1].title}"</h4>
    <img class="customer-img" src="${reviews[1].img}" alt="">
    <p class="review-text">${reviews[1].text}</p>
    <p class="customer">${reviews[1].name}</p>`

dots[0].id = 'black-dot'

renderWatchList()
