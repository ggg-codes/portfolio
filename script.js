new TypeIt("#typing", {
  strings: `Hey👋🏻 I'm <span class="name"> Ghali!</span>`,
}).go();

gsap.registerPlugin(SplitText, DrawSVGPlugin)


const it = 'Information Technology'
  
const wordContainer = (text) => {
    const container = document.createElement('span')

    container.textContent = text
    container.classList.add('it-container')
    return container
}

const replaceElement = (targetText, node) => {
    let container = null

    container = wordContainer(targetText)

    if (container) {
      node.firstChild.replaceWith(container)
    }
}

const node = document.getElementById('it')

node.addEventListener('mouseover', () => {
  replaceElement(it, node)
  let split = SplitText.create('.it-container', {
        type: "chars, words",
        wordsClass: "it-word-container",
        charsClass: 'pop'
  })

  const wordContainer = node.querySelectorAll('.it-word-container')
  wordContainer.forEach((el) => {
    const popLetters = el.querySelectorAll('.pop')
    gsap.from(popLetters, {
      y: -50,
      autoAlpha: 0,
      stagger: 0.05
    })
  })

  const underline = node.querySelector('svg')
  node.classList.remove('dashed-line')
  underline.classList.remove("none")
  const path = underline.querySelector('path')
  gsap.from(path, {duration:1.5, drawSVG: 0 });
}, {once: true})

const svg = document.querySelectorAll('.particule-svg path')

gsap.to(svg, {duration: 1, y: -100, transformOrigin:"50% 50%"});