
let juego;
let imgFondoRuta, imgAutoPepe, imgAutoJorge, imgObstaculo;
let sonidoMotor, sonidoChoque, sonidoVictoria;

function preload() {
  imgFondoRuta = loadImage('ruta.jpg');
  imgAutoPepe = loadImage('auto_pepe.png');
  imgAutoJorge = loadImage('auto_jorge.png');
  imgObstaculo = loadImage('obstaculo.png');

 
  sonidoMotor = loadSound('motor.mp3');
  sonidoChoque = loadSound('choque.mp3');
  sonidoVictoria = loadSound('victoria.mp3');
}

function setup() {
  createCanvas(800, 400);
  juego = new GestorJuego();
}

function draw() {
  background(30);
  juego.actualizarYMostrar();
}

function keyPressed() {
  juego.teclado();
}

function mousePressed() {
  juego.clicsRaton();
}


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
      this.obstaculos.push(new Obstaculo(random(320, 480), random(-400, -50)));
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

      // Botón para iniciar
      fill(50, 150, 200);
      rect(width / 2 - 100, 260, 200, 45, 8);
      fill(255);
      text("COMENZAR JUEGO", width / 2, 282.5);

    } else if (this.estado === 1) {
 
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
            this.estado = 3
          }
        }
      }

      if (this.distancia >= this.metaDistancia) {
        this.meta.mostrar();
        this.meta.mover();

        if (this.jugador.colisionaConMeta(this.meta)) {
          if (sonidoVictoria && typeof sonidoVictoria.play === 'function') sonidoVictoria.play();
          this.estado = 2; 
        }
      }

    } else if (this.estado === 2) {
      // Pantalla de Victoria
      background(10, 80, 30);
      fill(255);
      textSize(24);
      textAlign(CENTER, CENTER);
      text("¡LO ALCANZASTE!\nDetuviste la camioneta de Jorge y salvaste el caso.", width / 2, height / 2 - 40);
      
      textSize(16);
      text("Presiona R para reiniciar", width / 2, height / 2 + 50);

    } else if (this.estado === 3) {
      // Pantalla de Derrota
      background(100, 20, 20);
      fill(255);
      textSize(24);
      textAlign(CENTER, CENTER);
      text("¡CHOCASTE!\nJorge logró escapar en la oscuridad de la ruta.", width / 2, height / 2 - 40);
      
      textSize(16);
      text("Presiona R para reiniciar", width / 2, height / 2 + 50);
    }
  }

  teclado() {
    if ((this.estado === 2 || this.estado === 3) && (key === 'r' || key === 'R')) {
      this.reiniciar();
    }
  }

  clicsRaton() {
    if (this.estado === 0) {
      if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > 260 && mouseY < 305) {
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
