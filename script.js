new TypeIt("#typing", {
  strings: `Hey👋🏻 I'm <span class="name"> Ghali!</span>`,
}).go();

gsap.registerPlugin(
  SplitText,
  DrawSVGPlugin,
  CustomEase,
  CustomWiggle,
  Observer,
  ScrollTrigger,
  Flip,
  MorphSVGPlugin
);

const dot = document.querySelector(".cursor-dot");

window.addEventListener("mousemove", (e) => {
  gsap.to(dot, {
    x: e.clientX,
    y: e.clientY,
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
  });
});

document.addEventListener("mouseleave", () => {
  console.log("Mouse left the window");
  gsap.to(dot, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => (dot.style.display = "none"),
  });
});

document.addEventListener("mouseenter", () => {
  gsap.to(dot, {
    opacity: 1,
    duration: 0.5,
    onStart: () => (dot.style.display = "block"),
  });
});

const links = document.querySelectorAll("a, button");

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    gsap.to(dot, {
      width: 75,
      height: 75,
      backgroundColor: "rgba(240, 209, 159, 0.5)",
      border: "2px solid rgba(240, 209, 159, 1)",
    });
  });
  link.addEventListener("mouseleave", () => {
    gsap.to(dot, {
      width: "12px",
      height: "12px",
      backgroundColor: "var(--accent-color)",
      border: "none",
    });
  });
});

const hero = document.querySelector(".hero-link");

const active = (section) => {
  // const svgIcon = `
  //   <svg width="1em" height="1em" viewBox="0 0 156 122" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-active">
  //   <path d="M78 117H155.909"  stroke-width="10" />
  //   <path d="M16 111.419L65.3648 57.7097L16 4" stroke-width="15"/>
  //   </svg>
  //   `;

  let sectionObeserver = section ? section : hero;
  console.log("🚀 ~ active ~ sectionObeserver:", sectionObeserver);

  const lastSection = document.querySelector(".active");
  const navItems = sectionObeserver.querySelector("a");
  const svg = navItems.querySelector("svg");
  const state = Flip.getState(navItems.querySelectorAll("span, svg"));
  if (lastSection) {
    const lastSectionState = Flip.getState(
      lastSection.querySelectorAll("span, svg")
    );
    const lastSvg = lastSection.querySelector("svg");

    lastSection.classList.remove("active");

    gsap.to(lastSvg, {
      duration: 1,
      // rotate: -30,
      scale: 0.1,
      opacity: 0,
    });

    setTimeout(() => {
      lastSvg.classList.add("none");
      Flip.from(lastSectionState, {
        duration: 0.5,
        ease: "power1.inOut",
      });
      gsap.killTweensOf([lastSection, lastSvg]);
    }, 300);
  }

  gsap.set(svg, {
    rotate: 0,
    scale: 1,
    opacity: 1,
  });
  navItems.classList.add("active");
  svg.classList.remove("none");

  Flip.from(state, {
    duration: 0.5,
    // absolute: true,
    ease: "power1.inOut",
    onEnter: (element) => {
      const tl = gsap
        .timeline()
        .from(
          element,
          {
            duration: 1,
            rotate: -30,
            // scale: 0.1,
            // opacity: 0,
          },
          0
        )
        .from(
          element,
          {
            duration: 1,
            // rotate: -30,
            scale: 0.1,
            opacity: 0,
            ease: "back.out(2)",
          },
          0
        );
    },
  });

  const movingAnimationActive = gsap.to([".svg-active", ".active"], {
    duration: 1,
    x: 5,
    ease: "power1.out",
    repeat: -1,
    yoyo: true,
    stagger: 0.5,
    // onComplete: function () {
    //   console.log("complete");
    // },
  });

  Observer.create({
    target: ".active",
    type: "wheel,touch,scroll,pointer",
    onHover: () => {
      setTimeout(() => {
        movingAnimationActive.pause();
        // .updateTo({
        //   //onRepeatParams:["{self}"],
        //   onRepeat: function(tl) {
        //     this.pause();
        //   }
        // });
      }, 1000);
    },
    onHoverEnd: () => movingAnimationActive.resume(),
  });
};

document.addEventListener("DOMContentLoaded", (event) => {
  active();
  gsap.from(".scroll-down.of-hero", {
    delay: 1.5,
    duration: 1,
    opacity: 0,
  });

  gsap.set(dot, { opacity: 0 });

  function setInitialPosition(e) {
    gsap.set(dot, { x: e.clientX, y: e.clientY });
    window.removeEventListener("mousemove", setInitialPosition);
  }

  window.addEventListener("mousemove", setInitialPosition);

  // if (window.matchMedia("(max-width: 768px)").matches) {
  //   document.querySelector(".nav-toggle-btn").addEventListener("click", () => {
  //     const tl = gsap
  //       .timeline()
  //       .to(".sidebar", {
  //         height: "100vh",
  //         duration: 0.3,
  //       })
  //       .to(".nav-links", {
  //         y: 0,
  //         duration: 0.3,
  //       });
  //   });
  // }
});

const it = "Information Technology";

const wordContainer = (text) => {
  const container = document.createElement("span");

  container.textContent = text;
  container.classList.add("it-container");
  return container;
};

const replaceElement = (targetText, node) => {
  let container = null;

  container = wordContainer(targetText);

  if (container) {
    node.firstChild.replaceWith(container);
  }
};

const node = document.getElementById("it");

node.addEventListener(
  "mouseover",
  () => {
    const state = Flip.getState(".about-text", node);
    replaceElement(it, node);
    node.style.opacity = "0";
    Flip.from(state, {
      duration: 0.5,
      ease: "power1.inOut",
      onComplete: () => {
        node.style.opacity = "1";
        let split = SplitText.create(".it-container", {
          type: "chars, words",
          wordsClass: "it-word-container",
          charsClass: "pop",
        });

        const wordContainers = node.querySelectorAll(".it-word-container");
        wordContainers.forEach((el) => {
          const popLetters = el.querySelectorAll(".pop");
          gsap.from(popLetters, {
            y: -50,
            autoAlpha: 0,
            stagger: 0.07,
            duration: 0.45,
          });
        });

        const underline = node.querySelector("svg");
        node.classList.remove("dashed-line");
        underline.classList.remove("none");
        const path = underline.querySelector("path");
        gsap.from(path, { duration: 1.5, drawSVG: 0 });
      },
    });
  },
  { once: true }
);

// const svgBottom = document.querySelector('.particule-svg')
// const paths = svgBottom.querySelectorAll('path')

// const svgTrianglesUp = document.querySelector('.triangles-svg')
// const svgTriangles = svgTrianglesUp.querySelectorAll('path')
// const PUpOver = svgPUp.querySelectorAll('.p.over')

const wiggle = CustomWiggle.create("wiggle", {
  wiggles: 3,
  type: "random",
});

const tl = gsap.timeline();

// tl.to(paths, {
//   duration: 5,
//   y: -10,
//   // x: -5,
//   repeat: -1,
//   yoyo: true,
//   // ease: "none",
//   ease: "wiggle",
//   stagger: {
//     each: 0.1,
//     // from: "center"
//   }
// }).to(paths, {
//   duration: 5,
//   // y: -10,
//   x: -10,
//   repeat: -1,
//   yoyo: true,
//   // ease: "none",
//   ease: "wiggle",
//   stagger: {
//     each: 0.1,
//     // from: "center"
//   }
// })

// const svgTrianglesAnimation = gsap.to(svgTriangles, {
//   duration: 2,
//   x: -10,
//   y: -10,
//   repeat: -1,
//   yoyo: true,
//   stagger: {
//     each: 0.1
//   },
//   ease: "power1.out"
// })

const svgTrianglesProjectSecAnimation = gsap.to(
  ".svg-triangles-project-sec path",
  {
    y: -10,
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    stagger: 0.25,
    ease: "power1.out",
  }
);

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

const svgDotsAnimationtl = gsap.timeline();

svgDotsAnimationtl
  .to(".svg-dots-project-sec path", {
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
    },
  })
  .to(".svg-dots-project-sec path", {
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
    },
  });

// const svgsToObserve = [svgBottom, svgTrianglesUp, ".welcome", ".about-text"]

// svgsToObserve.forEach(target => {
//   Observer.create({
//     target: target,
//     type: "wheel,touch,scroll,pointer",
//     onHover: (self) => {
//       if (self.target === svgBottom) {
//         tl.pause()
//       } else if (self.target === svgTrianglesUp || '.welcome' || ".about-text") {
//         svgTrianglesAnimation.pause()
//       }
//     },
//     onHoverEnd: (self) => {
//       if (self.target === svgBottom) {
//         tl.resume()
//       } else if (self.target === svgTrianglesUp || '.welcome' || ".about-text") {
//         svgTrianglesAnimation.resume()
//       }
//     }
//   });
// })

const card1 = document.querySelector(".of-line1");
const card2 = document.querySelector(".of-line2");

const cardLink1 = document.querySelector(".for-line1");
const cardLink2 = document.querySelector(".for-line2");

const cardsToObserve = [card1, card2, cardLink1, cardLink2];

cardsToObserve.forEach((target) => {
  Observer.create({
    target: target,
    type: "wheel,touch,scroll,pointer",
    onHover: (self) => {
      if (self.target === card1) {
        document.querySelector(".for-line1").classList.toggle("card-hovered");
      } else if (self.target === card2) {
        document.querySelector(".for-line2").classList.toggle("card-hovered");
      } else if (self.target === cardLink1) {
        card1.classList.toggle("card-hovered");
      } else if (self.target === cardLink2) {
        card2.classList.toggle("card-hovered");
      }
    },
    onHoverEnd: (self) => {
      if (self.target === card1) {
        document.querySelector(".for-line1").classList.toggle("card-hovered");
      } else if (self.target === card2) {
        document.querySelector(".for-line2").classList.toggle("card-hovered");
      } else if (self.target === cardLink1) {
        card1.classList.toggle("card-hovered");
      } else if (self.target === cardLink2) {
        card2.classList.toggle("card-hovered");
      }
    },
  });
});

const scrollAnimation = (isMobile) => {
  const sections = document.querySelectorAll(".sec");
  let currentIndex = 0;
  let isAnimating = false;
  let aboutMeAnimated = false;
  let projectsAnimated = false;
  let connectAnimated = false;

  const goToSection = (index, currentSection) => {
    index = gsap.utils.wrap(0, sections.length, index);
    let current = sections[currentIndex];
    let next = sections[index];

    if (current === next) return;

    isAnimating = true;

    gsap.killTweensOf([current, next]);

    let tl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
      onComplete: () => {
        isAnimating = false;
        gsap.set(current, { scale: 1 });
      },
    });

    tl.to(current, { autoAlpha: 0, scale: 0.8 }).fromTo(
      next,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        onStart: () => sectionAnimation(next),
      }
    );

    current.classList.remove("active-sec");
    next.classList.add("active-sec");

    currentIndex = index;
  };

  const sectionAnimation = (section) => {
    if (section.classList.contains("about-me")) {
      const sectionLink = document.querySelector(".about-me-link");
      active(sectionLink);
      if (aboutMeAnimated) return;
      aboutMeAnimated = true;
      const aboutMeTitle = section.querySelector(".about-me-header");
      const aboutMeImg = section.querySelector(".about-me-img");
      const sectionText = section.querySelectorAll(".about-me-text p");
      const socialTitle = section.querySelector(".socials h3");
      const socials = section.querySelectorAll(".socials a");
      const scrollDown = document.querySelector(".scroll-down.of-about");
      const scrollDownText = scrollDown.querySelector("p");
      const mouse = scrollDown.querySelector(".mouse");

      gsap.set(aboutMeTitle, { y: 500 });
      gsap.set(aboutMeImg, { scale: 0.9, autoAlpha: 0, borderRadius: "50%" });
      gsap.set(sectionText, { y: 100, autoAlpha: 0 });
      gsap.set(socialTitle, { y: 50, opacity: 0 });
      gsap.set(socials, { x: 50, opacity: 0 });
      gsap.set(scrollDownText, { y: 30, opacity: 0 });
      gsap.set(mouse, { x: -50, opacity: 0 });

      const tl = gsap.timeline();
      tl.to(aboutMeTitle, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      })
        .to(
          sectionText,
          {
            duration: 1,
            ease: "back.out(1.7)",
            y: 0,
            autoAlpha: 1,
            stagger: {
              amount: 0.5,
            },
          },
          ">+0.5"
        )
        .to(
          aboutMeImg,
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.7,
            borderRadius: "25%",
            ease: "expoScale(1,2,power2.inOut)",
            stagger: 0.1,
          },
          "<0.5"
        )
        .to(socialTitle, {
          duration: 1,
          y: 0,
          opacity: 1,
          ease: "power2.out",
        })
        .to(socials, {
          duration: 1,
          x: 0,
          opacity: 1,
          ease: "back.out(1.7)",
          stagger: {
            amount: 0.5,
          },
        })
        .to(
          scrollDownText,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "+=1"
        )
        .to(mouse, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
        });

      return tl;
    } else if (section.classList.contains("projects")) {
      const sectionLink = document.querySelector(".projects-link");
      active(sectionLink);
      if (projectsAnimated) return;
      projectsAnimated = true;
      const projectTitle = section.querySelector(".title");
      const mask = section.querySelector(".mask");

      const line1 = section.querySelector(".of-line1");
      const line1Content = line1.querySelectorAll("h3, p, h4, .tech-list");
      const line1BlobStart = section.querySelector(".first-card #first-start");
      const line1BlobMid = section.querySelector(".first-card #first-mid");
      const line1CardLink = section.querySelector(".card-link.for-line1");
      const line1CardLinkLine = section.querySelector(
        ".card-link-line.for-link1 path"
      );

      const line = section.querySelectorAll(".svg-projects-line path");

      const line2 = section.querySelector(".of-line2");
      const line2Content = line2.querySelectorAll("h3, p, h4, .tech-list");
      const line2BlobStart = section.querySelector(
        ".second-card #second-start"
      );
      const line2BlobMid = section.querySelector(".second-card #second-mid");
      const line2CardLink = section.querySelector(".card-link.for-line2");
      const line2CardLinkLine = section.querySelector(
        ".card-link-line.for-link2 path"
      );

      const scrollDown = document.querySelector(".scroll-down.of-projects");
      const scrollDownText = scrollDown.querySelector("p");
      const mouse = scrollDown.querySelector(".mouse");

      gsap.set(projectTitle, { y: 500 });

      gsap.set(line1BlobStart, { scale: 0.8, autoAlpha: 0 });
      gsap.set(line1Content, { y: 50, autoAlpha: 0 });
      gsap.set(line1CardLinkLine, { drawSVG: 0 });
      gsap.set(line1CardLink, { scale: 0, color: "transparent" });

      gsap.set(line, { drawSVG: 0 });

      gsap.set(line2BlobStart, { scale: 0.8, autoAlpha: 0 });
      gsap.set(line2Content, { y: 50, autoAlpha: 0 });
      gsap.set(line2CardLinkLine, { drawSVG: "0% 0%" });
      gsap.set(line2CardLink, { scale: 0, color: "transparent" });

      gsap.set(scrollDownText, { y: 30, opacity: 0 });
      gsap.set(mouse, { x: -50, opacity: 0 });

      /* a small comment: i just realized if i wanted to add a card it would hustle,
      i need to make this code dynamic but not today i'm really tired and just want to finish this project*/
      const tl = gsap.timeline();
      tl.to(projectTitle, {
        y: 0,
        opacity: 1,
        duration: 1,
        // ease: "back.out(1.7)",
        ease: "power2.out",
        onComplete: () => {
          mask.style.overflow = "visible";
        },
      })
        .to(
          line1BlobStart,
          {
            // delay: 1,
            scale: 1,
            autoAlpha: 1,
            duration: 0.8,
            morphSVG: line1BlobMid,
            // ease: "back.inOut(3)",
          },
          "<1"
        )
        .to(line1BlobStart, {
          duration: 1.7,
          morphSVG: {
            shape: "#first-end",
            shapeIndex: 1,
          },
          ease: "back.out(3)",
        })
        .to(
          line1Content,
          {
            duration: 0.8,
            y: 0,
            autoAlpha: 1,
            stagger: {
              each: 0.5,
            },
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(line1CardLinkLine, {
          drawSVG: true,
          duration: 0.8,
          ease: "power2.out",
        })
        .to(
          line1CardLink,
          {
            scale: 1,
            transformOrigin: "25% 0%",
            duration: 0.5,
            ease: "power1.out",
          },
          "-=0.5"
        )
        .to(
          line1CardLink,
          {
            color: "var(--dominant-color)",
            duration: 0.5,
          },
          "-=0.15"
        )
        .to(
          line,
          {
            drawSVG: true,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=2"
        )
        // line 2
        .to(
          line2BlobStart,
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.5,
            morphSVG: line2BlobMid,
            // ease: "back.inOut(3)",
          },
          "<0.5"
        )
        .to(line2BlobStart, {
          duration: 1,
          morphSVG: {
            shape: "#second-end",
            shapeIndex: 3,
          },
          // ease: "back.out(3)",
        })
        .to(
          line2Content,
          {
            duration: 0.5,
            y: 0,
            autoAlpha: 1,
            stagger: {
              each: 0.5,
            },
          },
          "-=0.5"
        )
        .to(
          line2CardLinkLine,
          {
            drawSVG: "100% 0%",
            transformOrigin: "bottom",
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(
          line2CardLink,
          {
            scale: 1,
            transformOrigin: "52.95% 100%",
            duration: 0.5,
            ease: "power1.out",
          },
          "-=0.7"
        )
        .to(
          line2CardLink,
          {
            color: "var(--dominant-color)",
            duration: 0.5,
          },
          "-=0.15"
        )
        .to(
          scrollDownText,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "+=1"
        )
        .to(mouse, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
        });

      projectTitle.addEventListener("mouseenter", () => {
        gsap.to(projectTitle, {
          scale: 1.075,
          duration: 0.4,
          ease: "power1.inOut",
        });
      });

      projectTitle.addEventListener("mouseleave", () => {
        gsap.to(projectTitle, {
          scale: 1,
          duration: 0.4,
          ease: "power1.inOut",
        });
      });

      return tl;
    } else if (section.classList.contains("connect")) {
      const sectionLink = document.querySelector(".connect-link");
      active(sectionLink);
      if (connectAnimated) return;
      connectAnimated = true;

      const connectTitle = section.querySelector(".connect-title");
      const connectText = section.querySelector(".connect-text");

      let split = SplitText.create(connectText, {
        type: "lines", // only split into words and lines (not characters)
        mask: "lines", // adds extra wrapper element around lines with overflow: clip (v3.13.0+)
        // linesClass: "line", // adds "line" class to each line element, plus an incremented one too ("line1", "line2", "line3", etc.)

        // there are many other options - see below for a complete list
      });

      const connectLinks = section.querySelector(".contact-links");
      const btn = connectLinks.querySelector(".btn");
      const or = connectLinks.querySelector("span.or");
      const contactLinks = connectLinks.querySelectorAll(".contact");

      const techStackTitle = section.querySelector(".tech-stack");
      const techStackList = section.querySelectorAll(".tech-list-stack .tech");
      const techStackIcon = section.querySelectorAll(
        ".tech-list-stack .tech-icon"
      );

      const scrollDown = document.querySelector(".scroll-down.of-connect");
      const scrollDownText = scrollDown.querySelector("p");
      const mouse = scrollDown.querySelector(".mouse");

      gsap.set(connectTitle, { y: 500 });
      gsap.set(split.lines, { y: 100, autoAlpha: 0 });

      gsap.set(btn, { y: 50, autoAlpha: 0 });
      gsap.set(or, { autoAlpha: 0 });
      gsap.set(contactLinks, { y: 50, autoAlpha: 0 });

      gsap.set(techStackTitle, { y: 50, autoAlpha: 0 });
      gsap.set(".tech-list-stack", { autoAlpha: 0 });
      gsap.set(techStackList, { autoAlpha: 0 });

      gsap.set(".html", { color: "#e34c26" });
      gsap.set(".css", { color: "rebeccapurple" });
      gsap.set(".js", { color: "#f0db4f" });
      gsap.set(".node", { color: "#3c873a" });
      gsap.set(".express", { color: "#444444" });
      gsap.set(".discordjs", { color: "#5865f2" });
      gsap.set(techStackIcon, { filter: "none" });
      gsap.set(".tech-icon-express", { fill: "#444444" });

      gsap.set(scrollDownText, { y: 30, opacity: 0 });
      gsap.set(mouse, { x: -50, opacity: 0 });

      const tl = gsap
        .timeline()
        .to(connectTitle, {
          y: 0,
          duration: 0.5,
          ease: "power1.out",
        })
        .to(split.lines, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power1.out",
        })
        .to(btn, {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: "power1.out",
        })
        .to(or, {
          autoAlpha: 1,
          duration: 0.5,
          ease: "power1.out",
        })
        .to(contactLinks, {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: {
            amount: 0.3,
          },
          ease: "power1.out",
        })
        .to(techStackTitle, {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: "power1.out",
        })
        .to(".tech-list-stack", {
          autoAlpha: 1,
          duration: 0.5,
          ease: "power1.out",
        })
        .to(techStackList, {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          color: "var(--text-color)",
          stagger: {
            each: 0.3,
          },
          ease: "power1.out",
        })
        .to(
          ".tech-icon-express",
          {
            fill: "#f4f1eb",
          },
          "<1.5"
        )
        .to(
          techStackIcon,
          {
            duration: 0.5,
            filter: "brightness(0) invert(1)",
          },
          "<"
        )
        .to(
          scrollDownText,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "+=1"
        )
        .to(mouse, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
        });

      return tl;
    } else {
      active();
    }
  };

  const goToSectionBtn = (sectionTo) => {
    // if (isAnimating) return;
    const targetSection = document.querySelector(
      sectionTo.getAttribute("href")
    );
    const index = [...sections].indexOf(targetSection);
    goToSection(index, 1);
  };

  if (isMobile) {
    sections.forEach((section, index, sections) => {
      if (index > 0) {
        let prevSection = sections[index - 1];

        ScrollTrigger.create({
          trigger: section,
          start: "50px bottom",
          onEnter: () => sectionAnimation(section),
          onLeaveBack: () => sectionAnimation(prevSection),
          // markers: true,
        });
      }
    });
  } else {
    Observer.create({
      type: "wheel",
      onDown: () => !isAnimating && goToSection(currentIndex - 1, -1),
      onUp: () => !isAnimating && goToSection(currentIndex + 1, 1),
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
    });
  }

  gsap.set(sections[0], { autoAlpha: 1 });

  return { goToSection, goToSectionBtn };
};

let scrollController;

document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(min-width: 769px)").matches) {
    scrollController = scrollAnimation();
  } else {
    scrollController = scrollAnimation(true);
  }
});

// gsap.timeline({
//   ScrollTrigger: {
//     trigger: sec,
//     start: 'top top',
//     scrub: true,
//     markers: true,
//   }
// }).to(sec, {
//   scale: 0.5,
//   opacity: 0
// })

// const sectionTl = gsap.timeline({
//   ScrollTrigger: {
//     trigger: '.sec.about',
//     start: 'top top',
//     toggleActions: "play none none reverse",
//     scrub: true,
//     markers: true,
//     pin: true,
//     scrub: true,
//   }
// })

// sectionTl.to('.sec', {
//   duration: 1.5,
//   scale: 0.5,
//   opacity: 0
// })

const sideBar = document.querySelector(".sidebar");

const sidebarAnimation = () => {
  const sideBarTl = gsap.timeline({
    paused: true,
  });
  const navbarItems = document.querySelector(".navbar ul");
  const navbarItem = navbarItems.querySelectorAll(".navbar-item");

  const navbarState = Flip.getState(navbarItems);

  sideBarTl
    .to(".navbar-item", {
      // paused: true,
      duration: 0.3,
      y: 30,
      rotate: 2.5,
      stagger: {
        from: "end",
        amount: 0.5,
      },
      opacity: 0,
      ease: "power1.in",
      onComplete: () => {
        setTimeout(() => {
          navbarItems.innerHTML = `
        <li class="navbar-item hero-link iconazid" style="opacity: 0;"><a href="#home"><i data-lucide="compass"></i></a></li>
        <li class="navbar-item blogs-link iconazid" style="opacity: 0;"><a href="#about"><i data-lucide="fingerprint"></i></a></li>
        <li class="navbar-item projects-link iconazid" style="opacity: 0;"><a href="#projects"><i data-lucide="braces"></i></a></li>`;

          lucide.createIcons({
            attrs: {
              class: ["lucida-icon"],
            },
            nameAttr: "data-lucide", // attribute for the icon name.
          });

          sideBarTl.to(".navbar-item", {
            duration: 0.5,
            // y: -30,
            opacity: 1,
            stagger: {
              amount: 0.5,
            },
          });
        }, 500);
      },
    })
    .to(".sidebar", {
      duration: 1,
      width: 200,
    });

  // sideBarTl.to('.sidebar', {
  //   duration: 1,
  //   width: 250,
  // })

  let scrollTimeout;

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      sideBarTl.play();

      const state = Flip.getState(".main");
      document.body.classList.add("unfocus");
      Flip.from(state, {
        // targets: '.main',
        duration: 1,
        delay: 0.5,
        ease: "power1.in",
      });

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        document.body.classList.remove("unfocus");

        sideBarTl.reverse();
      }, 300);
    },
  });
};

// sidebarAnimation()

// sideBarTl.to(sideBar, {
//   width: 200,
//   duration: 1.2,
//   ease: "power1.inOut"
// }).to()

// Observer.create({
//   target: window,
//   type: "wheel,scroll",
//   onUp:
// })

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
