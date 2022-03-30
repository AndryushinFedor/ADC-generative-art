const colors = ['#F26DF8', '#FF5C00', '#FFE500', '#00FF29', '#00FFF0', '#4B3BFF']
const numFaces = 5000
const paddingEdge = 20
const button = document.querySelector(".but")
let sizeMin, sizeMax, dfaceMin, dfaceMax, logoSize, frameW, frameH, occupated = [],container, frame

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
  deepface.classList.add(`deepface3`)
  circleElement.appendChild(deepface)
}

function faceFill(circle, color) {
  let ob = circle.querySelector(".face")
  let w, h, svg
  if (createHat(circle) || (createItem(circle))) {
    h = 0.6 * circle.clientHeight
    w = 0.6 * circle.clientWidth
    ob.style.left = '20%'
    createFaceDetail(circle, 'eyesSm', 'eye', 35) 
    createFaceDetail(circle, 'eyeBrowsSm', 'eyebrows', 13) 
    createFaceDetail(circle, 'mouthSm', 'mouth', 31) 
    createNose(circle, 'noseSm')
  } else {
    h = circle.clientHeight
    w = circle.clientWidth
    createFaceDetail(circle, 'eyes', 'eye', 35) 
    createFaceDetail(circle, 'eyeBrows', 'eyebrows', 13) 
    createFaceDetail(circle, 'mouth', 'mouth', 31) 
    createNose(circle, 'nose')
  }
  ob.addEventListener("load", function () {
    svg = ob.contentDocument;
    let svgTag = svg.querySelector("svg")
    svgTag.setAttribute("width", w)
    svgTag.setAttribute("height", h)
    svgTag.querySelector("path").setAttribute("fill", color)
  }, false);
}

// корень из суммы квадратов катетов (гипотинуза)

function dist(x1, y1, x2, y2) {
  return Math.floor(Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)))-4
}

function generateLogo() {
    let top = getRandomArbitrary(paddingEdge, frameH - sizeMax - logoSize)
    let left = getRandomArbitrary(paddingEdge, frameW - sizeMax - logoSize)
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
    let svg;
    var ob = circleElement.querySelector(".face")
    ob.addEventListener("load", function () {
      svg = ob.contentDocument;
      console.log(svg);

      let svgTag = svg.querySelector("svg")
      svgTag.setAttribute("width", circleElement.clientWidth)
      svgTag.setAttribute("height",circleElement.clientHeight)
    }, false);

}

function createCircle(frame) {
  let overlap = false;

  let top = getRandomArbitrary(paddingEdge, frameH - sizeMax)
  let left = getRandomArbitrary(paddingEdge, frameW - sizeMax)
  let size = getRandomArbitrary(sizeMin, sizeMax)
  for (let i = 0; i < occupated.length; i++) {
    if (dist(left, top, occupated[i][0], occupated[i][1]) < Math.max(size, occupated[i][2])) {
      overlap = true;
      break;
    }
  }

  if (((top + size) > (frameH - logoSize)) & ((left + size) > (frameW - logoSize))) {
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
    faceFill(circleElement, sample(colors))

    circleElement.style.transform = `rotate(${getRandomArbitrary(-15, 15)}deg)`
    circleElement.style.opacity = 1
  }
}

function randomChance1Crit(crit) {
  const number = Math.floor(Math.random() * 100) + 1
  switch (true) {
    case number < crit:
      return 1

    default:
      return 0
  }
}

function randomChance2Crit(crit, crit2) {
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
  if (randomChance1Crit(50) == 1) {
    const hat = document.createElement('img')
    hat.setAttribute('src', `./images/hat${Math.floor(getRandomArbitrary(1,12))}.svg`)
    hat.classList.add('hat')
    circleElement.appendChild(hat)
    return true
  }
  return false
}

function createFaceDetail(circleElement, cl, fName, numb) {
  const detail = document.createElement('img')
  detail.setAttribute('src', `./images/${fName}${Math.floor(getRandomArbitrary(1,numb))}.svg`)
  detail.classList.add(cl)
  circleElement.appendChild(detail)
}

function createNose(circleElement, cl) {
  if (randomChance1Crit(15) == 1) {
    createFaceDetail(circleElement, cl, 'nose', 9)
  }
}

function createItem(circleElement) {
  let chance = randomChance2Crit(5, 5)
  if (chance == 1) {
    createFaceDetail(circleElement, 'itemLeft', 'itemLeft', 4)
    return true
  } else if (chance == 2) {
    createFaceDetail(circleElement, 'itemRight', 'itemRight', 4)
    return true
  } else {
    return false;
  }
}

function generate(){
  frame.innerHTML = '';
  occupated = []
  frameW = frame.clientWidth;
  frameH = frame.clientHeight;
  sizeMin = 0.14 * frameW
  sizeMax = 0.2 * frameW
  dfaceMin = 0.24 * frameW
  dfaceMax = 0.30 * frameW
  drawLogo(frame)
  generateLogo()
  for (var i = 0; i < numFaces; i++) {
    createCircle(frame)
  }
}

button.onclick = function (event) {
  event.stopPropagation()
  generate()
}

window.addEventListener('resize', generate)

document.addEventListener('DOMContentLoaded', () => {
  container = document.getElementsByClassName('prototype_11')[0]
  frame = document.createElement('div')
  frame.classList.add('frame')
  container.appendChild(frame)
  generate()

})