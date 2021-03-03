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
    let listForm = document.getElementsByClassName('list__form')[0]
    
    addListButton.onclick = () => {
        listForm.classList.remove('hidden')
    }

    let board = document.querySelector('.board')
    board.appendChild(addListButton)
    lists.map((list, index) => board.appendChild(getList(list, index)))
}