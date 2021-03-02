import { getList } from './list'

export function renderViews(lists) {
    let appContainer = document.querySelector('.app__container')
    let renderedLists = lists.map(list => getList(list))
    console.log(renderedLists)

    appContainer.appendChild(...renderedLists)
}