import "./css/index.css"
import IMask from "imask";

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


const securityCode = document.querySelector('#security-code')
const securityCodePattern = {
    mask: "0000"
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)


const expirationDate = document.querySelector('#expiration-date')
const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 10).slice(2)
        },        
    }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)


const cardNumber = document.querySelector('#card-number')
const cardNumberPattern = {
    mask: [
        {
            mask: "0000 0000 0000 0000",
            //visa: inicia em 4 com digitos de 0 até 15
            regex: /^4\d{0,15}/,
            cardtype: "visa"
        },
        {
            mask: "0000 0000 0000 0000",

            /*
            mastercard:
            
            inicia em 5, próximo digito entre 1 e 5, entre 0 e 2
            ou |
            inicia em 22, próximo digito entre 2 e 9, por ter + 1 digito
            ou |
            inicia em 2, próximo digito entre 3 e 7, entre 0 e 2

            tudo ok
            entre 0 + 12 digitos
            */
            
            regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
            cardtype: "mastercard"
        },
        {
            mask: "0000 0000 0000 0000",
            cardtype: "default"
        },
    ],

    dispatch: function (appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, "");
        const foundMask = dynamicMasked.compiledMasks.find(function (item) {
            return number.match(item.regex)
        })

        //console.log(foundMask)

        return foundMask
    }
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)
