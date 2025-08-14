new TypeIt("#typing", {
  strings: `Hey👋🏻 I'm <span class="name"> Ghali!</span>`,
}).go();

gsap.registerPlugin(SplitText, DrawSVGPlugin, CustomEase, CustomWiggle, Observer)

// const hover = () => {
//   gsap.to(".navbar-item", {
//     color: 'var(--accent-color)'
//   })
// }

// const sidebarHover = Observer.create({
//       target: ".navbar-item", // can be any element (selector text is fine)
//       type: "wheel,touch,scroll,pointer", // comma-delimited list of what to listen for
//       onHover: hover()
//     });

const hero = document.querySelector('.hero-link')

const active = (section) => {
  const svgIcon = `
    <svg width="1em" height="1em" viewBox="0 0 156 122" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-active">
    <path d="M78 117H155.909"  stroke-width="10" />
    <path d="M16 111.419L65.3648 57.7097L16 4" stroke-width="15"/>
    </svg>
    `
  let sectionObeserver = section ? section : hero;
  const navItems = sectionObeserver.querySelector('a')
  sectionObeserver.classList.toggle('active')
  navItems.insertAdjacentHTML('afterbegin', svgIcon)
}

document.addEventListener('DOMContentLoaded', () => {
  active()
  const movingAnimationActive = gsap.to(['.svg-active','.active a'], {
    duration: 1,
    x: 5,
    ease: "power1.out",
    repeat: -1,
    yoyo: true,
    stagger: .5,
    onComplete: function() {
      console.log("complete");
    }
    });
  Observer.create({
    target: ".active",
    type: "wheel,touch,scroll,pointer",
    onHover: () => {
      setTimeout(() => {
      movingAnimationActive.pause()
      // .updateTo({
      //   //onRepeatParams:["{self}"],
      //   onRepeat: function(tl) {
      //     this.pause();
      //   }
      // });
    }, 1000)
  },
    onHoverEnd: () => movingAnimationActive.resume()
  })
  // console.log(movingAnimationActive.duration()); do later (lock on active)
})

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
      stagger: 0.07
    })
  })

  const underline = node.querySelector('svg')
  node.classList.remove('dashed-line')
  underline.classList.remove("none")
  const path = underline.querySelector('path')
  gsap.from(path, {duration:1.5, drawSVG: 0 });
}, {once: true})

const svgBottom = document.querySelector('.particule-svg')
const paths = svgBottom.querySelectorAll('path')

const svgTrianglesUp = document.querySelector('.triangles-svg')
const svgTriangles = svgTrianglesUp.querySelectorAll('path')
// const PUpOver = svgPUp.querySelectorAll('.p.over')


const wiggle = CustomWiggle.create("wiggle", {
    wiggles:3,
    type: "random"
})

const tl = gsap.timeline()

tl.to(paths, {
  duration: 5,
  y: -10,
  // x: -5,
  repeat: -1,
  yoyo: true,
  // ease: "none",
  ease: "wiggle",
  stagger: {
    each: 0.1,
    // from: "center"
  }
}).to(paths, {
  duration: 5,
  // y: -10,
  x: -10,
  repeat: -1,
  yoyo: true,
  // ease: "none",
  ease: "wiggle",
  stagger: {
    each: 0.1,
    // from: "center"
  }
})

const svgTrianglesAnimation = gsap.to(svgTriangles, {
    duration: 2,
    x: -10,
    y: -10,
    repeat: -1,
    yoyo: true,
    stagger: {
      each: 0.1
    },
    ease: "power1.out"
})

const svgTrianglesProjectSecAnimation = gsap.to('.svg-triangles-project-sec path', {
  y: -10,
  repeat: -1,
  yoyo: true,
  duration: 1.5,
  stagger: 0.25,
  ease: 'power1.out'
})

// const svgDotsTriangleAnimation = gsap.to('.svg-dots-triangle', {
//   y: -15,
//   x: 15,
//   duration: 1.5,
//   stagger: {
//     each: 1
//   },
//   repeat: -1,
//   yoyo: true,
//   ease: 'power1.out'
// })

const svgDotsAnimationtl = gsap.timeline()

svgDotsAnimationtl.to('.svg-dots-project-sec path', {
  duration: 5,
  y: -10,
  // x: -5,
  repeat: -1,
  yoyo: true,
  // ease: "none",
  ease: "wiggle",
  stagger: {
    each: 0.1,
    // from: "center"
  }
}).to('.svg-dots-project-sec path', {
  duration: 5,
  // y: -10,
  x: -10,
  repeat: -1,
  yoyo: true,
  // ease: "none",
  ease: "wiggle",
  stagger: {
    each: 0.1,
    // from: "center"
  }
})


const svgsToObserve = [svgBottom, svgTrianglesUp, ".welcome", ".about-text"]

svgsToObserve.forEach(target => {
  Observer.create({
    target: target,
    type: "wheel,touch,scroll,pointer",
    onHover: (self) => {
      if (self.target === svgBottom) { 
        tl.pause()
      } else if (self.target === svgTrianglesUp || '.welcome' || ".about-text") { 
        svgTrianglesAnimation.pause()
      }
    },
    onHoverEnd: (self) => {
      if (self.target === svgBottom) {
        tl.resume()
      } else if (self.target === svgTrianglesUp || '.welcome' || ".about-text") {
        svgTrianglesAnimation.resume()
      }
    }
  });
})


const card1 = document.querySelector('.of-line1')
const card2 = document.querySelector('.of-line2')

const cardLink1 = document.querySelector('.for-line1')
const cardLink2 = document.querySelector('.for-line2')

const cardsToObserve = [card1, card2, cardLink1, cardLink2]

cardsToObserve.forEach(target => {
  Observer.create({
    target: target,
    type: 'wheel,touch,scroll,pointer',
    onHover: (self) => {
      if (self.target === card1) {
        document.querySelector('.for-line1').classList.toggle('card-hovered')
      } else if (self.target === card2) {
        document.querySelector('.for-line2').classList.toggle('card-hovered')
      } else if (self.target === cardLink1) { 
        card1.classList.toggle('card-hovered')
      } else if (self.target === cardLink2) {
        card2.classList.toggle('card-hovered')
      }
    },
    onHoverEnd: (self) => {
      if (self.target === card1) {
        document.querySelector('.for-line1').classList.toggle('card-hovered')
      } else if (self.target === card2) {
        document.querySelector('.for-line2').classList.toggle('card-hovered')
      } else if (self.target === cardLink1) {
        card1.classList.toggle('card-hovered')
      } else if (self.target === cardLink2) {
        card2.classList.toggle('card-hovered')
      }
    }
  })
})

// const particulePushingAnimation = () => {} will work on it later


// svgTrianglesUp.addEventListener("mouseenter", () => {
//   console.log("hovered!");
// });


// 499 86
// const box = document.getElementById('box')

// document.addEventListener("click", function(e) {
//   localX = e.clientX - box.offsetLeft - 2
//   localY = e.clientY - box.offsetTop - 2
//   console.log(localX, localY)
// })


// gsap.to(paths, {
//     duration: 5,
//     keyframes: {
//       "50%": { y: -20,},
//       "100%": { x: -20},
//     },
//     // y: -10,
//     // x: -5,
//     repeat: -1,
//     yoyo: true,
//     // ease: "none",
//     ease: "wiggle",
//     stagger: {
//       each: 0.1,
//       // from: "center"
//     }
//   })

// function swarm(elements, x, y, duration, wiggles) {
// 		elements = gsap.utils.toArray(elements);
// 		var tl = gsap.timeline(),
// 			  i = elements.length,
// 				delay;
// 		duration = duration || 2;
// 		while (--i > -1) {
// 			delay = Math.random() * duration;
//       //set to random color
//       //animate x and y separately so that they're more randomized (putting x and y in the same tween using the same ease would make the changes coincide and always travel diagonally)
// 			tl.to(elements[i], duration, {x:"+=" + x, repeat:-1, ease:CustomWiggle.create("", {type:"random", wiggles:wiggles})}, delay)
// 			  .to(elements[i], duration, {y:"+=" + y, repeat:-1, ease:CustomWiggle.create("", {type:"random", wiggles:wiggles})}, delay);
// 		}
//     tl.time(duration); //jump ahead so that we start with everything spread out. 
// 		return tl;
// }

// swarm(paths, 10, 10, 5, 3)