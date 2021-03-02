export function getCard(cardData) {
    let cardElement = document.createElement('div')
    cardElement.classList.add('card')
    cardElement.draggable = true
    cardElement.innerHTML = `
    <div class="card__header">
        <div class="header__title">${cardData.title}</div>
        <div class="header__close_icon">X</div>
    </div>
    <div class="card__body">${cardData.description}</div>
    `

    cardElement.onclick = function() {
        console.log(cardData)
    }
    return cardElement
}