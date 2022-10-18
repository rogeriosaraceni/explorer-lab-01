import "./css/index.css"

const ccBgCoor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path')
const ccBgCoor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img')

function setCardType(type) {
    const colors = {
        visa: ['#436D99', '#2D57F2'],
        mastercard: ['#DF6F29', '#C69347'],
        default: ['black', 'grey'],
    }

    ccBgCoor01.setAttribute('fill', colors[type][0])
    ccBgCoor02.setAttribute('fill', colors[type][1])
    ccLogo.setAttribute('src', `cc-${type}.svg`)
}

globalThis.setCardType = setCardType
