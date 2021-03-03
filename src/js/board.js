import { getList } from './list'

function clearBoard() {
    let board = document.querySelector('.board')
    board.innerHTML = ""
}

export function renderBoard(lists) {
    clearBoard()
    let addListButton = document.createElement('div')
    addListButton.classList.add('board__add-list-btn')
    addListButton.innerHTML = "Add List"

    let addListEvent = new CustomEvent('list-added', {
        detail: {
            list: {
                title: 'New List',
                cards: []
            }
        }
    })
    addListButton.onclick = function () {
        document.dispatchEvent(addListEvent)
    }

    let board = document.querySelector('.board')
    board.appendChild(addListButton)
    lists.map((list, index) => board.appendChild(getList(list, index)))
}