const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight], false);

class Firework{
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.sx = Math.random() * 3 - 1.5;
        this.sy = Math.random() * -2 - 3;
        this.size = Math.random() * 2 + 1;
        const colorVal = Math.round(0xffffff * Math.random());
        [this.r, this.g, this.b] = [colorVal >> 16, (colorVal >> 8) & 255, colorVal & 255];
        this.shouldExplode = false;

    }
    update() {
        this.shouldExplode = this.sy >= -1 || this.y <= 100 || this.x <= 0 || this.x >= canvas.width;
        this.sy += 0.01;
        [this.x, this.y] = [this.x + this.sx, this.y + this.sy];
    }

    draw() {
        ctx.fillStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Particle{
    constructor(x, y, r, g, b) {
        [this.x, this.y, this.sx, this.sy, this.r, this.g, this.b] = [x, y, Math.random() * 3 - 1.5, Math.random() * 3 - 1.5, r, g, b];
        this.size = Math.random() * 2 + 1;
        this.life = 100;
    }

    update() {
        [this.x, this.y, this.life] = [this.x + this.sx, this.y + this.sy, this.life - 1];

    } 

    draw() {
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.life/100})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const fireworks = [new Firework()];
const particles = [];

function animateFireworks() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    Math.random() < 0.10 && fireworks.push(new Firework());

    fireworks.forEach((firework, i) => {
        firework.update();
        firework.draw();
        if (firework.shouldExplode) {
            for (let j = 0; j < 50; j++) particles.push(new Particle(firework.x, firework.y, firework.r, firework.g, firework.b));
            fireworks.splice(i, 1);
        }
    });
    particles.forEach((particle, i) => {
        particle.update();
        particle.draw();
        if(particle.life <= 0) particles.splice(i,1);
    });

    requestAnimationFrame(animateFireworks);
}


const emojiContainer = document.getElementById('emoji-container');
const image1 = document.getElementById('introImage');
const usContainer = document.getElementById('usContainer');
const message = document.getElementById('pictureMessage');

function showEmojis(x, y) {
  // Create heart and kiss emojis
  const heart = document.createElement('div');
  heart.textContent = '❤️';
  heart.style.left = `${x - 30}px`;
  heart.style.top = `${y - 50}px`;
  emojiContainer.appendChild(heart);

  const kiss = document.createElement('div');
  kiss.textContent = '😘';
  kiss.style.left = `${x + 30}px`;
  kiss.style.top = `${y - 50}px`;
  emojiContainer.appendChild(kiss);

  // Animate the emojis
  heart.animate(
    [
      { opacity: 1, transform: 'scale(0)' },
      { opacity: 1, transform: 'scale(1.5)' },
      { opacity: 0, transform: 'scale(1)' }
    ],
    {
      duration: 2000,
      easing: 'ease-out',
      fill: 'forwards'
    }
  );

  kiss.animate(
    [
      { opacity: 1, transform: 'scale(0)' },
      { opacity: 1, transform: 'scale(1.5)' },
      { opacity: 0, transform: 'scale(1)' }
    ],
    {
      duration: 1000,
      easing: 'ease-out',
      fill: 'forwards'
    }
  );

  // Remove the emojis after the animation
  setTimeout(() => {
    heart.remove();
    kiss.remove();
  }, 1000);
}


function handleClick() {
  // Calculate the center of the image
  const x = image1.offsetLeft + image1.offsetWidth / 2;
  const y = image1.offsetTop + image1.offsetHeight / 2;

  // Optionally hide the message (or hide the entire intro screen)
  message.style.display = 'none';
  
  // Show emojis at the image's center
  showEmojis(x, y);
  
  // Remove the click event to prevent duplicate calls
  image1.removeEventListener('click', handleClick);
  
  // After a short delay, hide the intro screen and start the fireworks
  setTimeout(() => {
    document.getElementById('introScreen').style.display = 'none';
    canvas.style.display = 'block';
    animateFireworks();
    usContainer.style.display = 'block';
  }, 1000); // Delay to allow the emoji animation to finish
}

image1.addEventListener('click', handleClick);


  
 


