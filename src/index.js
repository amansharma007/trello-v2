import './css/index.css'
import { renderBoard } from './js/board'
import dummyLists from './dummy-board'

window.dummyLists = dummyLists
window.onload = () => {

    let lists = localStorage.getItem("lists") ? JSON.parse(localStorage.getItem("lists")) : window.dummyLists

    document.addEventListener('card-deleted', function (event) {
        let { listIndex, cardIndex } = event.detail
        lists[listIndex].cards.splice(cardIndex, 1)
        renderBoard(lists)
    })

    document.addEventListener('list-deleted', function (event) {
        let { listIndex } = event.detail
        lists.splice(listIndex, 1)
        renderBoard(lists)
    })

    document.addEventListener('card-added', function (event) {
        let { listIndex, card } = event.detail
        lists[listIndex].cards.unshift(card)
        renderBoard(lists)
    })

    let addCardFormButton = document.querySelector(".card__form button")
    addCardFormButton.onclick = function () {
        let title = document.querySelector('.card__form .title').value
        let description = document.querySelector('.card__form .description').value
        let listIndex = localStorage.getItem("listIndexToAddCardIn")
        lists[listIndex].cards.unshift({
            title,
            description
        })

        let cardForm = document.getElementsByClassName('card__form')[0]
        cardForm.classList.add('hidden')
        localStorage.removeItem("listIndexToAddCardIn")
        renderBoard(lists)
    }

    let addListFormButton = document.querySelector(".list__form button")
    addListFormButton.onclick = function () {
        let title = document.querySelector('.list__form .title').value
        lists.push({
            title,
            cards: []
        })

        let listForm = document.getElementsByClassName('list__form')[0]
        listForm.classList.add('hidden')
        renderBoard(lists)
    }

    renderBoard(lists)
}
