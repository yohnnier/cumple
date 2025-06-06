// ------------------------------
// 1. Configuración del canvas
// ------------------------------
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

// Ajustar el tamaño del canvas al de la ventana
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// ------------------------------
// 2. Definir colores y parámetros
// ------------------------------
const confettiColors = [
  "#ff0", "#f0f", "#0ff", "#f00", "#0f0", "#00f", "#ffa500", "#800080"
]; // Amarillo, Magenta, Cyan, Rojo, Verde, Azul, Naranja, Púrpura

const gravity = 0.3;      // Flujo de gravedad
const friction = 0.99;    // Fricción para desacelerar partículas
const particleCount = 150; // Cantidad de confetis

// ------------------------------
// 3. Clase para cada partícula
// ------------------------------
class ConfettiParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 7 + 5; // Tamaño aleatorio entre 5 y 12 px

    // Velocidad inicial explosiva en cualquier dirección
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2; // Velocidad entre 2 y 8
    this.velX = Math.cos(angle) * speed;
    this.velY = Math.sin(angle) * speed;

    this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    this.opacity = 1;
    this.fade = Math.random() * 0.01 + 0.005; // Velocidad de desvanecimiento
  }

  update() {
    // Aplicar gravedad
    this.velY += gravity * 0.1;

    // Aplicar fricción
    this.velX *= friction;
    this.velY *= friction;

    // Mover partícula
    this.x += this.velX;
    this.y += this.velY;

    // Disminuir opacidad
    this.opacity -= this.fade;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    // Dibujar como un rectángulo (confeti cuadrado) girado aleatoriamente
    ctx.translate(this.x, this.y);
    ctx.rotate((this.velX + this.velY) * 0.1);
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

// ------------------------------
// 4. Crear y animar las partículas
// ------------------------------
let particles = [];

function explodeConfetti() {
  particles = [];
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Crear 'particleCount' partículas en el centro
  for (let i = 0; i < particleCount; i++) {
    particles.push(new ConfettiParticle(centerX, centerY));
  }

  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar y actualizar cada partícula
  particles.forEach((p, i) => {
    if (p.opacity <= 0) {
      // Eliminar partícula cuando su opacidad llegue a 0
      particles.splice(i, 1);
    } else {
      p.update();
      p.draw(ctx);
    }
  });

  // Mientras haya partículas, seguir animando
  if (particles.length > 0) {
    requestAnimationFrame(animateConfetti);
  }
}

// ------------------------------
// 5. Disparar confeti al cargar la página
// ------------------------------
window.addEventListener("load", () => {
  // Un pequeño retraso opcional para que se vea mejor
  setTimeout(() => {
    explodeConfetti();
  }, 500);
});

// ------------------------------
// 6. (Opcional) Función para volver a disparar confeti
// ------------------------------
function triggerConfettiAgain() {
  explodeConfetti();
}

// Si quieres enlazarlo a un botón, por ejemplo:
// document.getElementById("mi-boton-confetti").addEventListener("click", triggerConfettiAgain);
