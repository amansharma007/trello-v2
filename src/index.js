import './css/index.css'
import { renderViews } from './js/app'

function func(a) {
    console.log(a)
}

window.onload = function () {
    let lists = [
        {
            id: 1,
            title: 'List 1',
            cards: [
                {
                    id: 1,
                    title: 'Card 1',
                    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam'
                },
                {
                    id: 2,
                    title: 'Card 2',
                    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam'
                }
            ]
        },
        {
            id: 2,
            title: 'List 2',
            cards: [
                {
                    id: 1,
                    title: 'Card 1',
                    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam'
                }
            ]
        }
    ]
    renderViews(lists)
}
