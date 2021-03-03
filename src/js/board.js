import { getList } from './list'
import { getNewElement } from './utils'

function clearBoard() {
    let board = document.querySelector('.board')
    board.innerHTML = ""
}

function initLocalStorage(lists) {
    localStorage.setItem("lists", JSON.stringify(lists))
}

export function renderBoard(lists) {
    clearBoard()
    initLocalStorage(lists)

    let addListButton = getNewElement('Add List', 'board__add-list-btn')

    addListButton.onclick = () => {
        let addListEvent = new CustomEvent('list-added', {
            detail: {
                list: {
                    title: 'New List',
                    cards: []
                }
            }
        })
        document.dispatchEvent(addListEvent)
    }

    let board = document.querySelector('.board')
    board.appendChild(addListButton)
    lists.map((list, index) => board.appendChild(getList(list, index)))
}