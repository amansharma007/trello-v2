export function getCard(cardData, listIndex, cardIndex) {
    let cardElement = document.createElement('div')
    cardElement.classList.add('card')
    cardElement.draggable = true
    cardElement.innerHTML = `
    <div class="card__header">
        <div class="header__title">${cardData.title}</div>
    </div>
    <div class="card__body">${cardData.description}</div>
    `

    let cardCloseButton = document.createElement('div')
    cardCloseButton.classList.add('header__close-button')
    cardCloseButton.innerHTML = "X"

    let cardCloseEvent = new CustomEvent('card-deleted', { detail: {
        listIndex,
        cardIndex
    }})
    cardCloseButton.onclick = function () {
        document.dispatchEvent(cardCloseEvent)
    }

    let cardHeader = cardElement.getElementsByClassName("card__header")[0]
    cardHeader.appendChild(cardCloseButton)
    return cardElement
}