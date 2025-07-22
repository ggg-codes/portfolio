const { animate, stagger, eases, createTimeline, } = anime;

new TypeIt("#typing", {
  strings: "Hey👋🏻 I'm Ghali!",
}).go();


const splitTarget = 'Information Technology'

const wordContainer = (text, index) => {
        const container = document.createElement('span')

        container.textContent = text
        container.classList.add(`it-container`)
        container.classList.add(index)
        return container
}

const span = (text) => {
    const node = document.createElement('span')

    node.textContent = text
    node.classList.add('pop')
    node.style.display = 'inline-block'
    node.style.whiteSpace = 'break-spaces'
    return node
}

const splitWord = text => text.split(' ').map(wordContainer)

const splitLetter = text => text.split('').map(span)

const splitFunction = (targetText, node) => {
    let containers = null

    containers = splitWord(targetText)

    if (containers) {
        node.firstChild.replaceWith(...containers)
        
        const container = document.querySelectorAll('.it-container')

        container.forEach((el) => {
            const results = splitLetter(el.innerText)
            
            if (results) {
                el.firstChild.replaceWith(...results)
            }
        })
    }
}

const node = document.getElementById('it')

node.addEventListener('mouseover', () => {
    splitFunction(splitTarget, node)
    const popLettersContainer = node.querySelectorAll('.it-container')

    popLettersContainer.forEach((n) => {
        const popLetters = n.querySelectorAll('.pop')
        animate(popLetters, {
            scale: { from: .1},
            y: [0,-20, 0],
            opacity: { from: 0, delay: 100},
            delay: stagger(25),
            ease: eases.linear(),
            duration: 250,
            loop: false,
        })    
    })

    node.classList.add('hovered')
}, {once: true})

