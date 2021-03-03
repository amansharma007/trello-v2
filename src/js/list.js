import { getCard } from './card'
import { getNewElement } from './utils'

function createCloseListButton(listElement, listIndex) {
    let closeListButton = getNewElement("X", "header__close-button")

    closeListButton.onclick = function () {
        let listCloseEvent = new CustomEvent('list-deleted', { detail: { listIndex } })
        document.dispatchEvent(listCloseEvent)
    }

    let listHeader = listElement.getElementsByClassName("list__header")[0]
    listHeader.appendChild(closeListButton)
}

function createAddCardButton(listElement, listIndex) {
    let addCardButton = getNewElement("+", "list__add-card-button")
    let cardForm = document.getElementsByClassName('card__form')[0]
    
    addCardButton.onclick = function () {
        cardForm.classList.remove('hidden')
        localStorage.setItem("listIndexToAddCardIn", listIndex)
    }

    listElement.appendChild(addCardButton)
}

function addDragEvents(listElement, listIndex) {
    listElement.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.className = 'list hovered';
    });
    listElement.addEventListener('dragenter', function (e) {
        e.preventDefault();
    });
    listElement.addEventListener('dragleave', function () {
        this.className = 'list';
    });
    listElement.addEventListener('drop', function () {
        this.className = 'list';
        let heldCard = JSON.parse(localStorage.getItem("heldCard"))
        let cardAddEvent = new CustomEvent('card-added', {
            detail: {
                listIndex,
                card: heldCard.data
            }
        })
        document.dispatchEvent(cardAddEvent)

        let cardCloseEvent = new CustomEvent('card-deleted', {
            detail: {
                listIndex: heldCard.listIndex,
                cardIndex: heldCard.cardIndex
            }
        })
        document.dispatchEvent(cardCloseEvent)

        localStorage.removeItem("heldCard")
    });
}

export function getList(list, listIndex) {
    let listElement = getNewElement(`
        <div class="list__header">
            <div class="header__title">${list.title}</div>
        </div>
        <div class="list__body">
        </div>
    `, 'list')

    createCloseListButton(listElement, listIndex)
    createAddCardButton(listElement, listIndex)
    addDragEvents(listElement, listIndex)

    let listBody = listElement.getElementsByClassName('list__body')[0]
    list.cards.map((card, index) => listBody.appendChild(getCard(card, listIndex, index)))

    return listElement
}