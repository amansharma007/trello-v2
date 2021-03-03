import './css/index.css'
import { renderBoard } from './js/board'

window.onload = function () {
    let dummyLists = [
        {
            id: 1,
            title: 'Todo',
            cards: [
                {
                    id: 1,
                    title: 'Workout',
                    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam'
                },
                {
                    id: 2,
                    title: 'Make dinner',
                    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam'
                }
            ]
        },
        {
            id: 2,
            title: 'Doing',
            cards: [
                {
                    id: 1,
                    title: 'Interview prep',
                    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam'
                }
            ]
        }
    ]

    let lists = localStorage.getItem("lists") ? JSON.parse(localStorage.getItem("lists")) : dummyLists
    
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
