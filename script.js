const display = document.getElementById('display')
const mainText = document.getElementById('mainText')
const pixelElem = document.getElementById('canvas')
const defuseBtn = document.getElementById('defuse')
const explodeBtn = document.getElementById('explode')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function explode() {
    explodeBtn.onclick = null
    function* counter() {
        for(let i = 10; i > -1; i--) {
            display.textContent = i
            yield
            if(i === 1) {
                mainText.textContent = 'BOOM'
                document.body.style.cssText = 'background-image: url(boom.gif)'
                defuseBtn = null
            }
        }
    }

    let iterator = counter()

    setInterval(() => iterator.next(), 1000)
}

function createPanel() {
    defuseBtn.onclick = null
    //explode()
    for(let i = 0; i < 5; i++) {
        pixelElem.appendChild(document.createElement('div')).className = 'pixel'
    }

    const startDefuse = () => {
        randomInt = getRandomInt(5)
        let pixels = document.getElementsByClassName('pixel')
        pixels[randomInt].onclick = null
        pixels[randomInt].style.backgroundColor = 'white'
        if(pixels[0].style.backgroundColor === 'green' && pixels[2].style.backgroundColor === 'green' && pixels[4].style.backgroundColor === 'green' && pixels[1].style.backgroundColor === 'white' && pixels[3].style.backgroundColor === 'white') {
            mainText.textContent = 'The bomb was defused'
        }
        greenSquare(randomInt)
    }
    
    const greenSquare = () => {
        let pixels = document.getElementsByClassName('pixel')
        let randomInt = getRandomInt(5)
        pixels[randomInt].style.backgroundColor = 'green'
        pixels[randomInt].onclick = startDefuse
        
    }
    greenSquare()
    
}


explodeBtn.onclick = explode
defuseBtn.onclick = createPanel
