//https://youtu.be/Uj9y3X9LO9A
//https://youtu.be/Kk78RuIWgT4

let juego;
let pantallaInicio;
let pantallaCreditos;
let pantallaActual = "INICIO";

let imgFondoRuta, imgAutoPepe, imgAutoJorge, imgObstaculo;
let sonidoMotor, sonidoChoque, sonidoVictoria;

let imagenFondo;

// CARGA DE IMAGENES Y SONIDOS
function preload() {
  // Imagenes del juego
  imgFondoRuta = loadImage('ruta.jpg');
  imgAutoPepe = loadImage('auto_pepe.png');
  imgAutoJorge = loadImage('auto_jorge.png');
  imgObstaculo = loadImage('obstaculo.png');

  // Sonidos
  sonidoMotor = loadSound('motor.mp3');
  sonidoChoque = loadSound('choque.mp3');
  sonidoVictoria = loadSound('victoria.mp3');

  // Imagen de creditos
  imagenFondo = loadImage("fondoCreditos.png");
}


// INICIO DEL PROGRAMA
function setup() {
  createCanvas(800, 400);

  pantallaInicio = new Inicio();
  pantallaCreditos = new Creditos();

  juego = new GestorJuego();
}


// DIBUJO DE LAS PANTALLAS
function draw() {
  background(220);

  if (pantallaActual == "INICIO") {
    pantallaInicio.dibujar();
  }

  else if (pantallaActual == "CREDITOS") {
    pantallaCreditos.dibujar();
  }

  else if (pantallaActual == "juego") {
    juego.actualizarYMostrar();
  }
}


// TECLADO
function keyPressed() {
  if (pantallaActual == "juego") {
    juego.teclado();
  }
}


function mousePressed() {

  // BOTONES DE INICIO
    if (pantallaActual == "INICIO") {

    if (mouseX > 250 && mouseX < 550 &&
        mouseY > 190 && mouseY < 245) {

      pantallaActual = "juego";
      juego.estado = 1;
    }

    if (mouseX > 250 && mouseX < 550 &&
        mouseY > 270 && mouseY < 325) {

      pantallaCreditos.reiniciar();
      pantallaActual = "CREDITOS";
    }
  }

  else if (pantallaActual == "CREDITOS") {

    if (mouseX > 120 && mouseX < 370 &&
        mouseY > 340 && mouseY < 385) {

      pantallaActual = "INICIO";
    }

    if (mouseX > 430 && mouseX < 680 &&
        mouseY > 340 && mouseY < 385) {

      pantallaCreditos.reiniciar();
    }
  }

  else if (pantallaActual == "juego") {

    if ((juego.estado === 2 || juego.estado === 3) &&
        mouseX > 275 && mouseX < 525 &&
        mouseY > 270 && mouseY < 315) {

      pantallaActual = "INICIO";
      juego.estado = 0;
    }
  }
}



// CLASE INICIO
class Inicio {

  dibujar() {
    background(30, 35, 50);

    // Titulo
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(45);
    text("EXPEDIENTE 064", 400, 100);

    // Boton para iniciar
    fill(180);
    rect(250, 190, 300, 55);

    fill(0);
    textSize(22);
    text("INICIO", 400, 217);

    // Boton de creditos
    fill(180);
    rect(250, 270, 300, 55);

    fill(0);
    text("CREDITOS", 400, 297);
  }
}


// CLASE CREDITOS
class Creditos {

  constructor() {
    this.imagenFondo = imagenFondo;

    this.titulo = "CREDITOS";
    this.tiempoI = millis();

    // Texto de creditos
    this.lineas = [
      "Creadores: Matias Grandal - Gabriela Escalante",
      "Materia: PMIW",
      "Imagenes: Chat"
    ];

    this.velocidad = 1;
  }

  // Reiniciar animacion
  reiniciar() {
    this.tiempoI = millis();
  }

  dibujar() {

    image(this.imagenFondo, 0, 0, 800, 400);

    // Tiempo
    let tiempo = millis() - this.tiempoI;

    // Texto que sube
    textAlign(CENTER);
    textSize(20);
    fill(255);

    for (let i = 0; i < this.lineas.length; i++) {
      let posicionY = 450 + (i * 55) - (tiempo * 0.035);
      text(this.lineas[i], 400, posicionY);
    }

    // Cortar el texto
    fill(30, 30, 30);
    rect(0, 35, 800, 80);

    // Maquina de escribir
    let letras = floor(tiempo / 150);
    let tituloActual = this.titulo.substring(0, letras);

    textSize(35);
    fill(255);
    textAlign(CENTER);
    text(tituloActual, 400, 85);

    // Boton volver al inicio
    fill(180);
    rect(120, 340, 250, 45);

    fill(0);
    textSize(18);
    text("VOLVER", 245, 362);

    // Boton repetir
    fill(180);
    rect(430, 340, 250, 45);

    fill(0);
    text("REPETIR", 555, 362);
  }
}


// CLASE GESTOR DEL JUEGO
class GestorJuego {

  constructor() {
    this.estado = 0;
    this.jugador = new AutoJugador(400, 280);
    this.obstaculos = [];
    this.meta = new Meta(400, -500);
    this.vidas = 3;
    this.distancia = 0;
    this.metaDistancia = 1500;

    this.yFondo1 = 0;
    this.yFondo2 = -400;

    for (let i = 0; i < 3; i++) {
      this.obstaculos.push(
        new Obstaculo(random(320, 480), random(-400, -50))
      );
    }
  }

  actualizarYMostrar() {

    if (this.estado === 0) {

      background(20, 30, 50);
      fill(255);
      textSize(22);
      textAlign(CENTER, CENTER);

      text("PERSECUCIÓN EN LA RUTA - EXPEDIENTE 064", width / 2, 70);

      textSize(16);
      text("Instrucciones: Usa las flechas IZQUIERDA y DERECHA para esquivar los obstáculos.\nAlcanza la camioneta de Jorge sin perder tus 3 vidas para ganar.", width / 2, 140);

      text("Créditos: Matias Grandal y Gabriela Escalante", width / 2, 210);

      fill(50, 150, 200);
      rect(width / 2 - 100, 260, 200, 45, 8);

      fill(255);
      text("COMENZAR JUEGO", width / 2, 282.5);

    }

    else if (this.estado === 1) {

      if (imgFondoRuta) {

        this.yFondo1 += 4;
        this.yFondo2 += 4;

        if (this.yFondo1 >= height) {
          this.yFondo1 = -height;
        }

        if (this.yFondo2 >= height) {
          this.yFondo2 = -height;
        }

        image(imgFondoRuta, 0, this.yFondo1, width, height);
        image(imgFondoRuta, 0, this.yFondo2, width, height);

      } else {
        background(50);
      }

      this.distancia += 2;

      fill(255);
      textSize(16);
      textAlign(LEFT, TOP);

      text("Vidas: " + this.vidas, 20, 20);
      text("Distancia: " + this.distancia + " / " + this.metaDistancia, 20, 45);

      this.jugador.mover();
      this.jugador.mostrar();

      for (let i = 0; i < this.obstaculos.length; i++) {

        this.obstaculos[i].mover();
        this.obstaculos[i].mostrar();

        if (this.jugador.colisiona(this.obstaculos[i])) {

          if (sonidoChoque && typeof sonidoChoque.play === 'function' && !sonidoChoque.isPlaying()) {
            sonidoChoque.play();
          }

          this.vidas--;
          this.obstaculos[i].reiniciarPosicion();

          if (this.vidas <= 0) {
            this.estado = 3;
          }
        }
      }

      if (this.distancia >= this.metaDistancia) {

        this.meta.mostrar();
        this.meta.mover();

        if (this.jugador.colisionaConMeta(this.meta)) {

          if (sonidoVictoria && typeof sonidoVictoria.play === 'function') {
            sonidoVictoria.play();
          }

          this.estado = 2;
        }
      }
    }

    else if (this.estado === 2) {

      // Pantalla de victoria
      background(10, 80, 30);
      fill(255);
      textSize(24);
      textAlign(CENTER, CENTER);

      text("¡LO ALCANZASTE!\nDetuviste la camioneta de Jorge y salvaste el caso.", width / 2, height / 2 - 40);

      textSize(16);
      text("Presiona R para reiniciar", width / 2, height / 2 + 50);
      
      //boton de inicio
      fill(180);
      rect(275, 270, 250, 45);
      
      fill(0);
     textSize(18);
     text("VOLVER AL INICIO", 400, 292);
    }

    else if (this.estado === 3) {

      // Pantalla de derrota
      background(100, 20, 20);
      fill(255);
      textSize(24);
      textAlign(CENTER, CENTER);

      text("¡CHOCASTE!\nJorge logró escapar en la oscuridad de la ruta.", width / 2, height / 2 - 40);

      textSize(16);
      text("Presiona R para reiniciar", width / 2, height / 2 + 50);
      
       //boton de inicio
      fill(180);
      rect(275, 270, 250, 45);
      
      fill(0);
     textSize(18);
     text("VOLVER AL INICIO", 400, 292);
    }
  }

  teclado() {

    if ((this.estado === 2 || this.estado === 3) &&
        (key === 'r' || key === 'R')) {

      this.reiniciar();
    }
  }

  clicsRaton() {

    if (this.estado === 0) {

      if (mouseX > width / 2 - 100 &&
          mouseX < width / 2 + 100 &&
          mouseY > 260 && mouseY < 305) {

        this.estado = 1;

        if (sonidoMotor && typeof sonidoMotor.loop === 'function' && !sonidoMotor.isPlaying()) {
          sonidoMotor.loop();
          sonidoMotor.setVolume(2);
        }
      }
    }
  }

  reiniciar() {

    this.vidas = 3;
    this.distancia = 0;
    this.estado = 1;

    this.jugador.x = 400;
    this.meta.y = -500;

    for (let i = 0; i < this.obstaculos.length; i++) {
      this.obstaculos[i].reiniciarPosicion();
    }
  }
}


// CLASE AUTO DEL JUGADOR
class AutoJugador {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ancho = 110;
    this.alto = 68;
    this.velocidad = 5;
  }

  mover() {

    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.velocidad;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.velocidad;
    }

    this.x = constrain(this.x, 310, 490);
  }

  mostrar() {

    imageMode(CENTER);

    if (imgAutoPepe) {
      image(imgAutoPepe, this.x, this.y, this.ancho, this.alto);
    } else {
      fill(0, 100, 255);
      rectMode(CENTER);
      rect(this.x, this.y, this.ancho, this.alto);
    }

    imageMode(CORNER);
  }

  colisiona(objeto) {

    let d = dist(this.x, this.y, objeto.x, objeto.y);

    return d < 35;
  }

  colisionaConMeta(metaObj) {

    let d = dist(this.x, this.y, metaObj.x, metaObj.y);

    return d < 45;
  }
}


// CLASE OBSTACULOS
class Obstaculo {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ancho = 70;
    this.alto = 70;
    this.velocidad = random(3, 5);
  }

  mover() {

    this.y += this.velocidad;

    if (this.y > height + 50) {
      this.reiniciarPosicion();
    }
  }

  mostrar() {

    imageMode(CENTER);

    if (imgObstaculo) {
      image(imgObstaculo, this.x, this.y, this.ancho, this.alto);
    } else {
      fill(200, 50, 50);
      rectMode(CENTER);
      rect(this.x, this.y, this.ancho, this.alto);
    }

    imageMode(CORNER);
  }

  reiniciarPosicion() {

    this.y = random(-500, -100);
    this.x = random(315, 485);
    this.velocidad = random(3, 5);
  }
}


// CLASE META
class Meta {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ancho = 110;
    this.alto = 72;
    this.velocidad = 2;
  }

  mover() {

    this.y += this.velocidad;

    if (this.y > height + 100) {
      this.y = -200;
    }
  }

  mostrar() {

    imageMode(CENTER);

    if (imgAutoJorge) {
      image(imgAutoJorge, this.x, this.y, this.ancho, this.alto);
    } else {
      fill(0, 255, 0);
      rectMode(CENTER);
      rect(this.x, this.y, this.ancho, this.alto);
    }

    imageMode(CORNER);
  }
}
