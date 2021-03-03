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

    document.addEventListener('list-added', function (event) {
        let { list } = event.detail
        lists.push(list)
        renderBoard(lists)
    })

    renderBoard(lists)
}
