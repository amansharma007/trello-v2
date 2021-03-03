import { getCard } from './card'

function createListCloseButton(listElement, listIndex) {
    let listCloseButton = document.createElement('div')
    listCloseButton.classList.add('header__close-button')
    listCloseButton.innerHTML = "X"

    let listCloseEvent = new CustomEvent('list-deleted', {
        detail: {
            listIndex
        }
    })
    listCloseButton.onclick = function () {
        document.dispatchEvent(listCloseEvent)
    }

    let listHeader = listElement.getElementsByClassName("list__header")[0]
    listHeader.appendChild(listCloseButton)
}

function createCardAddButton(listElement, listIndex) {
    let cardAddButton = document.createElement('div')
    cardAddButton.classList.add('list__add-card-button')
    cardAddButton.innerHTML = "+"

    let cardAddEvent = new CustomEvent('card-added', {
        detail: {
            listIndex,
            card: {
                title: "New List"
            }
        }
    })
    cardAddButton.onclick = function () {
        document.dispatchEvent(cardAddEvent)
    }

    listElement.appendChild(cardAddButton)
}

function dragOver(e) {
    e.preventDefault();
    this.className = 'list hovered';
}

function dragEnter(e) {
    e.preventDefault();
    // this.className += ' hovered';
}

function dragLeave() {
    this.className = 'list';
}

export function getList(list, listIndex) {
    let listElement = document.createElement('div')
    listElement.classList.add('list')
    listElement.innerHTML = `
    <div class="list__header">
        <div class="header__title">${list.title}</div>
    </div>
    <div class="list__body">
    </div>
    `

    createListCloseButton(listElement, listIndex)

    createCardAddButton(listElement, listIndex)

    listElement.addEventListener('dragover', dragOver);
    listElement.addEventListener('dragenter', dragEnter);
    listElement.addEventListener('dragleave', dragLeave);
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

    let listBody = listElement.getElementsByClassName('list__body')[0]
    list.cards.map((card, index) => listBody.appendChild(getCard(card, listIndex, index)))

    return listElement
}