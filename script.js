const display = document.getElementById('display')
const mainText = document.getElementById('mainText')
const pixelElem = document.getElementById('canvas')
const defuseBtn = document.getElementById('defuse')
const explodeBtn = document.getElementById('explode')

const cubes = [
    {id:0, clicked: false},
    {id:1, clicked: false},
    {id:2, clicked: false},
    {id:3, clicked: false},
    {id:4, clicked: false}
  ]

function getRandomInt() {
    const newCubes = cubes.filter(cube => cube.clicked === false).map(cubes => cubes.id)
    return newCubes[Math.floor(Math.random() * newCubes.length)]
}

let exploding = true
function explode() {
    explodeBtn.onclick = null
    defuseBtn.onclick = null
    function* counter() {
        for(let i = 10; i > -1; i--) {
            display.textContent = i
            yield
            if(i === 0 && exploding) {
                mainText.textContent = 'BOOM'
                document.body.style.cssText = 'background-image: url(boom.gif)'
            } else if(!exploding) {
                mainText.textContent = 'Complete. You defused the bomb'
                document.body.style.cssText = 'background-image: url(complete.jpg)'
            }
        }
    }

    let iterator = counter()

    setInterval(() => iterator.next(), 1000)
}

function createPanel() {
    defuseBtn.onclick = null
    explodeBtn.onclick = null
    explode()
    for(let i = 0; i < 5; i++) {
        pixelElem.appendChild(document.createElement('div')).className = 'pixel'
    }
    
    let pixels = document.getElementsByClassName('pixel')
    const greenSquare = () => {
        const cubesClicked = cubes.filter(cube => cube.clicked === true).map(cubes => cubes.id)
        if (cubesClicked.length === 5) completeDefuse()
        const randomInt = getRandomInt(5)
        pixels[randomInt].classList.add('green')
        pixels[randomInt].onclick = startDefuse = () => {
            cubes.forEach((cube) => {
                if(randomInt === cube.id) cube.clicked = true
            })
            pixels[randomInt].onclick = null
            pixels[randomInt].onclick = pixels[randomInt].classList.remove('green')
            greenSquare()
        }
        
    }
    greenSquare()
}

function completeDefuse() {
    exploding = false
}

explodeBtn.onclick = explode
defuseBtn.onclick = createPanel
