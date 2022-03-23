const colors = ['#F26DF8', '#FF5C00', '#FFE500', '#00FF29', '#00FFF0', '#4B3BFF']
const numFaces = 5000
const pad = 10
let sizeMin
let sizeMax
let dfaceMin
let dfaceMax
let logoSize
let frameW
let frameH
let n
let occupated = []

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function getFrame() {
  return document.getElementsByClassName('frame')[0]
}

function drawLogo(circleElement) {

  const deepface = document.createElement('img')
  logoSize = 0.23 * frameW
  deepface.setAttribute('src', `./images/ADCLogo.svg`)
  //deepface.style.width = logoSize
  let n = 3
  deepface.classList.add(`deepface3`)
  circleElement.appendChild(deepface)
  return n
}



function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function changeSVGColor(circle, color) {
  var ob = circle.querySelector(".face")
  console.log(ob)
  let w;
  let h;
  if (createHat(circle) || (createItem(circle))) {
    h = 0.6 * circle.clientHeight
    w = 0.6 * circle.clientWidth
    ob.style.left = '20%'
    createEyes(circle, 'eyesSm')
    createEyeBrows(circle, 'eyeBrowsSm')
    createNose(circle, 'noseSm')
    createMouth(circle, 'mouthSm')

  } else {
    h = circle.clientHeight
    w = circle.clientWidth
    createEyes(circle, 'eyes')
    createEyeBrows(circle, 'eyeBrows')
    createNose(circle, 'nose')
    createMouth(circle, 'mouth')
  }
  let svg;
  ob.addEventListener("load", function () {
    svg = ob.contentDocument;
    console.log(svg);

    let svgTag = svg.querySelector("svg")
    svgTag.setAttribute("width", w)
    svgTag.setAttribute("height", h)
    svgTag.querySelector("path").setAttribute("fill", color)
  }, false);
  console.log('changed')
}

function dist(x1, y1, x2, y2) {
  return Math.floor(Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)))-4
}
function generateLogo() {
  let top = getRandomArbitrary(pad, frameH - sizeMax - logoSize)
  let left = getRandomArbitrary(pad, frameW - sizeMax - logoSize)
  let size = getRandomArbitrary(dfaceMin, dfaceMax)
  occupated.push([left, top, size+7])
    const circleElement = document.createElement('div')
    circleElement.classList.add('deepface')

    circleElement.style.top = [top, 'px'].join('')
    circleElement.style.left = [left, 'px'].join('')
    circleElement.style.width = [size, 'px'].join('')
    circleElement.style.height = [size, 'px'].join('')

    frame.appendChild(circleElement)

    const face = document.createElement('object')

    face.setAttribute('data', `./images/deepface${Math.floor(getRandomArbitrary(1,4))}.svg`)
    face.classList.add('face')
    face.setAttribute('type', "image/svg+xml")
    circleElement.appendChild(face)
    h = circleElement.clientHeight
    w = circleElement.clientWidth
    let svg;
    var ob = circleElement.querySelector(".face")
  ob.addEventListener("load", function () {
    svg = ob.contentDocument;
    console.log(svg);

    let svgTag = svg.querySelector("svg")
    svgTag.setAttribute("width", w)
    svgTag.setAttribute("height", h)
  }, false);
    console.log('deep')
}
function createCircle(frame, n) {
  let overlap = false;

  let top = getRandomArbitrary(pad, frameH - sizeMax)
  let left = getRandomArbitrary(pad, frameW - sizeMax)
  let size = getRandomArbitrary(sizeMin, sizeMax)
  for (let i = 0; i < occupated.length; i++) {

    if (dist(left, top, occupated[i][0], occupated[i][1]) < Math.max(size, occupated[i][2])) {
      overlap = true;
      break;
    }
  }
  if ((n == 1) & ((top < logoSize) & (left < logoSize))) {
    overlap = true
  }
  if ((n == 2) & ((top < logoSize) & ((left + size) > (frameW - logoSize)))) {
    overlap = true
  }

  if ((n == 3) & (((top + size) > (frameH - logoSize)) & ((left + size) > (frameW - logoSize)))) {
    overlap = true
  }

  if ((n == 4) & (((top + size) > (frameH - logoSize)) & (left < logoSize))) {
    overlap = true
  }

  if (!overlap) {

    occupated.push([left, top, size])
    const circleElement = document.createElement('div')
    circleElement.classList.add('circle')

    circleElement.style.top = [top, 'px'].join('')
    circleElement.style.left = [left, 'px'].join('')
    circleElement.style.width = [size, 'px'].join('')
    circleElement.style.height = [size, 'px'].join('')

    frame.appendChild(circleElement)

    const face = document.createElement('object')

    face.setAttribute('data', `./images/ch${Math.floor(getRandomArbitrary(1,10))}.svg`)
    face.classList.add('face')
    face.setAttribute('type', "image/svg+xml")
    circleElement.appendChild(face)
    changeSVGColor(circleElement, sample(colors))

    circleElement.style.transform = `rotate(${getRandomArbitrary(-15, 15)}deg)`
    circleElement.style.opacity = 1
  }
}

function randomChance(crit) {
  const number = Math.floor(Math.random() * 100) + 1
  switch (true) {
    case number < crit:
      return 1

    default:
      return 0
  }
}

function randomChance2(crit, crit2) {
  const number = Math.floor(Math.random() * 100) + 1
  switch (true) {
    case number < crit:
      return 1

    case number < (crit + crit2):
      return 2

    default:
      return 0
  }
}

function createHat(circleElement) {
  if (randomChance(50) == 1) {
    const hat = document.createElement('img')

    hat.setAttribute('src', `./images/hat${Math.floor(getRandomArbitrary(1,12))}.svg`)
    hat.classList.add('hat')
    circleElement.appendChild(hat)
    return true
  }
  return false
}

function createEyeBrows(circleElement, cl) {
  const eyeBrows = document.createElement('img')

  eyeBrows.setAttribute('src', `./images/eyebrows${Math.floor(getRandomArbitrary(1,13))}.svg`)
  eyeBrows.classList.add(cl)

  circleElement.appendChild(eyeBrows)
}

function createEyes(circleElement, cl) {
  const eyes = document.createElement('img')

  eyes.setAttribute('src', `./images/eye${Math.floor(getRandomArbitrary(1,35))}.svg`)
  eyes.classList.add(cl)

  circleElement.appendChild(eyes)
}

function createNose(circleElement, cl) {
  if (randomChance(15) == 1) {
    const nose = document.createElement('img')

    nose.setAttribute('src', `./images/nose${Math.floor(getRandomArbitrary(1,9))}.svg`)
    nose.classList.add(cl)
    circleElement.appendChild(nose)
  }
}

function createMouth(circleElement, cl) {
  const mouth = document.createElement('img')

  mouth.setAttribute('src', `./images/mouth${Math.floor(getRandomArbitrary(1,31))}.svg`)
  mouth.classList.add(cl)

  circleElement.appendChild(mouth)
}

function createItem(circleElement) {
  let chance = randomChance2(5, 5)
  if (chance == 1) {
    const item = document.createElement('img')

    item.setAttribute('src', `./images/itemLeft${Math.floor(getRandomArbitrary(1,4))}.svg`)
    item.classList.add('itemLeft')
    circleElement.appendChild(item)
    return true
  } else if (chance == 2) {
    const item = document.createElement('img')

    item.setAttribute('src', `./images/itemRight${Math.floor(getRandomArbitrary(1,4))}.svg`)
    item.classList.add('itemRight')
    circleElement.appendChild(item)
    return true
  } else {
    return false;
  }
}
let container
let frame

document.querySelector(".but").onclick = function (event) {
  event.stopPropagation()
  frame.innerHTML = '';
  occupated = []
  frameW = frame.clientWidth;
  frameH = frame.clientHeight;
  sizeMin = 0.14 * frameW
  sizeMax = 0.2 * frameW
  dfaceMin = 0.24 * frameW
  dfaceMax = 0.30 * frameW
  n = drawLogo(frame)
  generateLogo()
  for (var i = 0; i < numFaces; i++) {
    createCircle(frame, n)
  }
}

window.addEventListener('resize', function () {
  frame.innerHTML = ''
  occupated = []
  // if (container.clientWidth < 840) {
  //   frame.style.width = (container.clientWidth * 0.8) + 'px'
  //   frame.style.height = (container.clientWidth ) + 'px'
    
  // } else {
  //   frame.style.width = (container.clientWidth * 0.5) + 'px'
  //   frame.style.height = (container.clientWidth * 0.7) + 'px'
  // }

  frameW = frame.clientWidth
  frameH = frame.clientHeight
  sizeMin = 0.14 * frameW
  sizeMax = 0.20 * frameW
  dfaceMin = 0.24 * frameW
  dfaceMax = 0.30 * frameW
  n = drawLogo(frame)
  generateLogo()
  for (var i = 0; i < numFaces; i++) {
    createCircle(frame, n)
  }
})

document.addEventListener('DOMContentLoaded', () => {
  container = document.getElementsByClassName('prototype_11')[0]
  frame = document.createElement('div')

  frame.classList.add('frame')
  container.appendChild(frame)

  frameW = frame.clientWidth
  frameH = frame.clientHeight
  sizeMin = 0.14 * frameW
  sizeMax = 0.20 * frameW
  dfaceMin = 0.24 * frameW
  dfaceMax = 0.30 * frameW
  console.log(sizeMin, sizeMax)

  n = drawLogo(frame)

  generateLogo()
  for (var i = 0; i < numFaces; i++) {
    createCircle(frame, n)
  }

})