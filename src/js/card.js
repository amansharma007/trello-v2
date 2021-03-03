import { getNewElement } from './utils'

function addDragEvents(cardElement, cardData, listIndex, cardIndex) {
    cardElement.addEventListener('dragstart', function () {
        setTimeout(() => (this.className = 'invisible'), 0);
        localStorage.setItem("heldCard", `{
            "data": ${JSON.stringify(cardData)}, 
            "cardIndex": ${cardIndex}, 
            "listIndex":  ${listIndex}
        }`)
    });

    cardElement.addEventListener('dragend', function () {
        this.className = 'card';
    });
}

export function getCard(cardData, listIndex, cardIndex) {
    let cardElement = getNewElement(`
        <div class="card__header">
        <div class="header__title">${cardData.title}</div>
        </div>
        <div class="card__body">${cardData.description}</div>
    `, 'card')
    cardElement.draggable = true

    addDragEvents(cardElement, cardData, listIndex, cardIndex)

    let cardCloseButton = getNewElement('X', 'header__close-button')
    cardCloseButton.onclick = function () {
        let cardCloseEvent = new CustomEvent('card-deleted', {
            detail: {
                listIndex,
                cardIndex
            }
        })
        document.dispatchEvent(cardCloseEvent)
    }

    let cardHeader = cardElement.getElementsByClassName("card__header")[0]
    cardHeader.appendChild(cardCloseButton)
    return cardElement
}