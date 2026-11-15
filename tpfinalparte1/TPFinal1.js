// https://youtu.be/jXxZgEizZ98 (video gabriela)
// https://youtu.be/n2g6YbwI8cc (video matias)

let pantallaActual = 0;
let fondos = [];
let textos = [];
let boton1Texto = [];
let boton1Destino = [];
let boton2Texto = [];
let boton2Destino = [];

let musicaFondo;
let sonidoDerrota; 
let sonidoVictoria; 

function preload() {
  // Cargamos los fondos del 0 al 13 en un arreglo
  for (let i = 0; i <= 13; i++) {
    fondos[i] = loadImage('pantalla' + i + '.jpg');
  }
  
  musicaFondo = loadSound('musicaTension.wav');
  sonidoDerrota = loadSound('derrota.wav'); 
  sonidoVictoria = loadSound('victoria.wav'); 
}

function setup() {
  createCanvas(800, 450);

  // Textos narrativos de cada pantalla (0 al 14)
  textos = [
    "Expediente 064\n\nMenú Principal", // Pantalla 0
    "El jefe José te llama a su oficina. -Pepe, tu desempeño ha sido excelente en estos meses. Tengo un caso de desapariciones para ti. Si lo resuelves rápido, el ascenso es tuyo y podrás pagar todas tus deudas.", // Pantalla 1
    "Te asignan a Jorge. Notas que hay demasiadas desapariciones y crees que están conectadas. Jorge te responde de mala manera y le resta importancia al asunto.", // Pantalla 2
    "Llega el reporte de un robo extraño en una farmacia. Debes decidir a qué darle prioridad en tu investigación el día de hoy.", // Pantalla 3
    "Decides ignorar la farmacia. Pasan los días revisando expedientes viejos de las desapariciones, pero no encuentras ningún hilo conductor. El caso se enfría.", // Pantalla 4
    "El jefe José está furioso. Al no resolver el caso y dejar que las desapariciones continúen, te culpa por la ineficiencia. Eres despedido de la fuerza policial.", // Pantalla 5 (Final 1)
    "En la farmacia, descubres que robaron cajas de fuertes somníferos. El dueño se pone agresivo al preguntarle. Vuelves con la información a la comisaría.", // Pantalla 6
    "Le cuentas a Jorge sobre los somníferos. Se pone muy nervioso, dice que esto es una pérdida de tiempo y abandona repentinamente el caso.", // Pantalla 7
    "Cruzas la pista de los somníferos a solas. Descubres un patrón: todos los desaparecidos tienen la misma edad, altura y color de pelo.", // Pantalla 8
    "Sigues a tu ex compañero Jorge por la noche. Conduce durante horas hasta llegar a una zona rural muy alejada de la ciudad.", // Pantalla 9
    "Siguiendo el rastro de la furgoneta del ladrón de la farmacia, llegas a un campo oscuro en las afueras de la ciudad.", // Pantalla 10
    "Encuentras un viejo búnker oculto. Escuchas voces adentro. Es la guarida de los secuestradores. Debes tomar una decisión rápida.", // Pantalla 11
    "Entras solo. Jorge está adentro esperándote. Te golpea por la espalda. Todo se vuelve oscuro. Te conviertes en una víctima más y nunca nadie vuelve a verte.", // Pantalla 12 (Final 2)
    "Irrumpes con el jefe José y un escuadrón. Rescatan a las víctimas y arrestan a Jorge. Eres el héroe de la ciudad. El ascenso es tuyo y tus deudas están pagadas.", // Pantalla 13 (Final 3)
    "Desarrollado por: Matias Grandal y Gabriela Escalante" // Pantalla 14 (Créditos)
  ];

  // Textos y destinos del Botón 1 para cada pantalla
  boton1Texto = [
    "Jugar", 
    "Aceptar el caso y conocer a tu compañero", 
    "Ignorar su mala actitud y seguir", 
    "Investigar el robo de la farmacia", 
    "Explicarle al jefe la falta de avances", 
    "Volver al Inicio", 
    "Comentárselo a Jorge", 
    "Investigar a Jorge en secreto", 
    "Rastrear las compras de somníferos", 
    "Acercarse al lugar", 
    "Acercarse al lugar", 
    "Entrar solo para atraparlos por sorpresa", 
    "Volver al Inicio", 
    "Volver al Inicio", 
    "Volver al Menú Principal"
  ];

  boton1Destino = [1, 2, 3, 6, 5, 0, 7, 9, 10, 11, 11, 12, 0, 0, 0];

  // Textos y destinos del Botón 2 para cada pantalla (si no tiene, va vacío "")
  boton2Texto = [
    "Créditos", 
    "", 
    "", 
    "Quedarse en la comisaría viendo expedientes", 
    "", 
    "", 
    "Guardar el dato en secreto", 
    "Ignorar su comportamiento y revisar archivos", 
    "", 
    "", 
    "", 
    "Retirarse y pedir refuerzos al jefe", 
    "", 
    "", 
    ""
  ];

  boton2Destino = [14, 0, 0, 4, 0, 0, 8, 5, 0, 0, 0, 13, 0, 0, 0];
}

function draw() {
  background(20);

  // Dibuja imagen de fondo si existe para la pantalla actual (excepto en créditos)
  if (pantallaActual >= 0 && pantallaActual <= 13 && fondos[pantallaActual]) {
    image(fondos[pantallaActual], 0, 0, width, height);
  }

  // Si es la pantalla de créditos (14), aplicamos una animación de color con seno
  if (pantallaActual === 14) {
    background(20, 15, 35);
    fill(sin(frameCount * 0.05) * 55 + 200, 210, 255);
  } else {
    fill(255);
  }

  // Tamaño y posición de los textos narrativos
  textSize(18);
  textAlign(CENTER, TOP);
  text(textos[pantallaActual], 100, 80, 600, 200); 

  // Dibujar Botón 1 si tiene texto asignado
  if (boton1Texto[pantallaActual] !== "") {
    dibujarBoton(100, 300, 600, 45, boton1Texto[pantallaActual]);
  }

  // Dibujar Botón 2 si tiene texto asignado
  if (boton2Texto[pantallaActual] !== "") {
    dibujarBoton(100, 360, 600, 45, boton2Texto[pantallaActual]);
  }
}

function dibujarBoton(x, y, w, h, textoBoton) {
  let sobreBoton = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  
  if (sobreBoton) {
    fill(80, 150, 200);
  } else {
    fill(50);
  }
  
  rect(x, y, w, h, 8); 
  
  fill(255); 
  textSize(16);
  textAlign(CENTER, CENTER);
  text(textoBoton, x + w / 2, y + h / 2);
}

function mousePressed() {
  // Iniciar música de fondo al presionar por primera vez en el menú
  if (pantallaActual === 0) {
    if (musicaFondo && !musicaFondo.isPlaying()) {
      musicaFondo.loop();
      musicaFondo.setVolume(0.5);
    }
  }

  // Verificar clics en el Botón 1
  if (boton1Texto[pantallaActual] !== "") {
    if (mouseX > 100 && mouseX < 700 && mouseY > 300 && mouseY < 345) {
      let destino = boton1Destino[pantallaActual];
      manejarSonidosFinales(destino);
      pantallaActual = destino; 
    }
  }

  // Verificar clics en el Botón 2
  if (boton2Texto[pantallaActual] !== "") {
    if (mouseX > 100 && mouseX < 700 && mouseY > 360 && mouseY < 405) {
      let destino = boton2Destino[pantallaActual];
      manejarSonidosFinales(destino);
      pantallaActual = destino; 
    }
  }
}

function manejarSonidosFinales(destino) {
  // Control de música y efectos según el final o reinicio
  if (destino === 5 || destino === 12) { // Finales malos
    if (musicaFondo) musicaFondo.stop();
    if (sonidoDerrota) sonidoDerrota.play();
  } else if (destino === 13) { // Final bueno
    if (musicaFondo) musicaFondo.stop();
    if (sonidoVictoria) sonidoVictoria.play();
  } else if (destino === 0 && musicaFondo) {
    // Si vuelve al inicio por derrota/victoria y quiere reintentar
    if (!musicaFondo.isPlaying()) {
      musicaFondo.loop();
    }
  }
}
