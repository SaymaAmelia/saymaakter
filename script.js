// Scroll reveal
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
faders.forEach(el => observer.observe(el));

// Auto year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('✅ Thank you for your message! We’ll be in touch soon.');
  e.target.reset();
});

// 🌊 Wavy Cursor Effect
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');
let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = document.querySelector('.hero').offsetHeight;
}
window.addEventListener('resize', resize);
resize();

let points = [];
const numPoints = 40;
for (let i = 0; i <= numPoints; i++) {
  points.push({ x: (i / numPoints) * w, y: h / 2, baseY: h / 2 });
}

let mouse = { x: w / 2, y: h / 2 };

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  ctx.clearRect(0, 0, w, h);
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(points[0].x, points[0].y);
  for (let i = 0; i < numPoints; i++) {
    const p = points[i];
    const dx = mouse.x - p.x;
    const dy = mouse.y - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const force = Math.max(100 - dist, 0) / 100;
    p.y = p.baseY + Math.sin((i * 0.5) + performance.now() / 600) * 15 + force * 20;
    ctx.lineTo(p.x, p.y);
  }
  ctx.lineTo(w, h);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(59,130,246,0.25)');
  grad.addColorStop(1, 'rgba(13,17,23,1)');
  ctx.fillStyle = grad;
  ctx.fill();

  requestAnimationFrame(animate);
}
animate();
