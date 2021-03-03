export function getNewElement(text, classes) {
    let elem = document.createElement('div')
    elem.className = classes
    elem.innerHTML = text
    return elem
}