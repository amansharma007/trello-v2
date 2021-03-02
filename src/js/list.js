import { getCard } from './card'

export function getList(list) {
    let renderedCards = list.cards.map(card => getCard(card))
    let listElement = document.createElement('div')
    listElement.classList.add('list')
    listElement.innerHTML = `
    <div class="list__header">
        <div class="header__title">${list.title}</div>
        <div class="header__close_icon">X</div>
    </div>
    <div class="list__body">
    </div>
    `
    listElement.getElementsByClassName('list__body')[0].appendChild(...renderedCards)
    return listElement
}