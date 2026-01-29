export function initParticles() {
  if (!window.particlesJS) {
    console.warn('particlesJS not loaded');
    return;
  }

  const elements = document.querySelectorAll('.particles');
  if (!elements.length) return;

  elements.forEach((el, index) => {
    if (el.dataset.particlesInit) return;

    el.dataset.particlesInit = 'true';
    el.id = `particles-${index}`;

    window.particlesJS(el.id, {
      particles: {
        number: { value: 40, density: { enable: true, value_area: 800 } },
        color: { value: "#f27a53" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 4 },
          image: { src: "img/github.svg", width: 100, height: 100 }
        },
        opacity: {
          value: 1,
          random: false,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
          value: 5,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
        },
        line_linked: {
          enable: true,
          distance: 200,
          color: "#ffffff",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "bubble" },
          onclick: { enable: false, mode: "repulse" },
          resize: true
        },
        modes: {
          grab: { distance: 300, line_linked: { opacity: 1 } },
          bubble: {
            distance: 311.6883116883117,
            size: 13,
            duration: 6.153846153846154,
            opacity: 8,
            speed: 3
          },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: true
    });
  });
}
