let animReposo = [];
let animMovimiento = [];
let fondo;
let estadoActual = "REPOSO"; 
let posX = 400;
let posY = 300;
let velocidadDesplazamiento = 3; 
let escalaReposo = 2.3; 
let escalaMovimiento = 2.0;

function preload() {
  fondo = loadImage('data/fondo.png');

  for (let i = 0; i < 3; i++) {
    animReposo[i] = loadImage('data/reposo_' + i + '.png');
  }

  for (let i = 0; i < 6; i++) {
    animMovimiento[i] = loadImage('data/movimiento_' + i + '.png');
  }
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  imageMode(CORNER);
  image(fondo, 0, 0, width, height);

  imageMode(CENTER);

  switch (estadoActual) {
    case "REPOSO":
      dibujarAnimacion(animReposo, posX, posY, 15, escalaReposo);
      
      if (frameCount > 120) {
        cambiarEstado("MOVIMIENTO");
      }
      break;

    case "MOVIMIENTO":
      posX += velocidadDesplazamiento;
      
      if (posX > width + 100) {
        posX = -100;
      }
      
      if (posX >= 400 && (posX - velocidadDesplazamiento) < 400) {
        posX = 400; 
        cambiarEstado("REPOSO"); 
      }
      
      dibujarAnimacion(animMovimiento, posX, posY, 6, escalaMovimiento);
      break;
  }
  
  fill(255);
  textSize(16);
  textAlign(LEFT);
  text('Reiniciar con "R"', 20, 30);
}

function obtenerIndiceFrame(totalFrames, velocidad) {
  let indice = floor(frameCount / velocidad) % totalFrames;
  return indice;
}

function dibujarAnimacion(arrayFrames, x, y, velocidad, escala) {
  let indiceActual = obtenerIndiceFrame(arrayFrames.length, velocidad);
  let frameActual = arrayFrames[indiceActual];
  
  let nuevoAncho = frameActual.width * escala;
  let nuevoAlto = frameActual.height * escala;
  
  image(frameActual, x, y, nuevoAncho, nuevoAlto);
}

function cambiarEstado(nuevoEstado) {
  estadoActual = nuevoEstado;
  frameCount = 0;
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    cambiarEstado("REPOSO");
    posX = 400;
  }
}
