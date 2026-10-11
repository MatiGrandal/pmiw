// https://youtu.be/jXxZgEizZ98 (video gabriela)
// https://youtu.be/n2g6YbwI8cc (video matias)

  let pantallaActual = 0;
  let pantallas = [];
  let fondo = [];
  let musicaFondo;
  let sonidoDerrota; 
  let sonidoVictoria; 

  function preload() {
    
  fondo[0] = loadImage('pantalla0.jpg');
  fondo[1] = loadImage('pantalla1.jpg');
  fondo[2] = loadImage('pantalla2.jpg');
  fondo[3] = loadImage('pantalla3.jpg');
  fondo[4] = loadImage('pantalla4.jpg');
  fondo[5] = loadImage('pantalla5.jpg');
  fondo[6] = loadImage('pantalla6.jpg');
  fondo[7] = loadImage('pantalla7.jpg');
  fondo[8] = loadImage('pantalla8.jpg');
  fondo[9] = loadImage('pantalla9.jpg');
  fondo[10] = loadImage('pantalla10.jpg');
  fondo[11] = loadImage('pantalla11.jpg');
  fondo[12] = loadImage('pantalla12.jpg');
  fondo[13] = loadImage('pantalla13.jpg');
  
  musicaFondo = loadSound('musicaTension.wav');
  sonidoDerrota = loadSound('derrota.wav'); 
  sonidoVictoria = loadSound('victoria.wav'); 
  }
  function setup() {
  createCanvas(800, 450);

  pantallas = [
    // Pantalla 0: Menú
    {
      img: fondo[0],
      texto: "Expediente 064\n\nMenú Principal",
      boton1: { dialogo: "Jugar", destino: 1 },
      boton2: { dialogo: "Créditos", destino: 14 }
    },
    // Pantalla 1
    {
      texto: "El jefe José te llama a su oficina. -Pepe, tu desempeño ha sido excelente en estos meses. Tengo un caso de desapariciones para ti. Si lo resuelves rápido, el ascenso es tuyo y podrás pagar todas tus deudas.",
      img: fondo[1],
      boton1: { dialogo: "Aceptar el caso y conocer a tu compañero", destino: 2 }
    },
    // Pantalla 2
    {
      texto: "Te asignan a Jorge. Notas que hay demasiadas desapariciones y crees que están conectadas. Jorge te responde de mala manera y le resta importancia al asunto.",
      img: fondo[2],
      boton1: { dialogo: "Ignorar su mala actitud y seguir", destino: 3 }
    },
    // Pantalla 3
    {
      texto: "Llega el reporte de un robo extraño en una farmacia. Debes decidir a qué darle prioridad en tu investigación el día de hoy.",
      img: fondo[3],
      boton1: { dialogo: "Investigar el robo de la farmacia", destino: 6 },
      boton2: { dialogo: "Quedarse en la comisaría viendo expedientes", destino: 4 }
    },
    // Pantalla 4 (Ruta perdedora)
    {
      texto: "Decides ignorar la farmacia. Pasan los días revisando expedientes viejos de las desapariciones, pero no encuentras ningún hilo conductor. El caso se enfría.",
      img: fondo[4],
      boton1: { dialogo: "Explicarle al jefe la falta de avances", destino: 5 }
    },
    // Pantalla 5: FINAL 1
    {
      texto: "El jefe José está furioso. Al no resolver el caso y dejar que las desapariciones continúen, te culpa por la ineficiencia. Eres despedido de la fuerza policial.",
      img: fondo[5],
      boton1: { dialogo: "Volver al Inicio", destino: 0 }
    },
    // Pantalla 6 (Ruta investigación)
    {
      texto: "En la farmacia, descubres que robaron cajas de fuertes somníferos. El dueño se pone agresivo al preguntarle. Vuelves con la información a la comisaría.",
      img: fondo[6],
      boton1: { dialogo: "Comentárselo a Jorge", destino: 7 },
      boton2: { dialogo: "Guardar el dato en secreto", destino: 8 }
    },
    // Pantalla 7
    {
      texto: "Le cuentas a Jorge sobre los somníferos. Se pone muy nervioso, dice que esto es una pérdida de tiempo y abandona repentinamente el caso.",
      img: fondo[7],
      boton1: { dialogo: "Investigar a Jorge en secreto", destino: 9 },
      boton2: { dialogo: "Ignorar su comportamiento y revisar archivos", destino: 5 }
    },
    // Pantalla 8
    {
      texto: "Cruzas la pista de los somníferos a solas. Descubres un patrón: todos los desaparecidos tienen la misma edad, altura y color de pelo.",
      img: fondo[8],
      boton1: { dialogo: "Rastrear las compras de somníferos", destino: 10 }
    },
    // Pantalla 9
    {
      texto: "Sigues a tu ex compañero Jorge por la noche. Conduce durante horas hasta llegar a una zona rural muy alejada de la ciudad.",
      img: fondo[9],
      boton1: { dialogo: "Acercarse al lugar", destino: 11 }
    },
    // Pantalla 10
    {
      texto: "Siguiendo el rastro de la furgoneta del ladrón de la farmacia, llegas a un campo oscuro en las afueras de la ciudad.",
      img: fondo[10],
      boton1: { dialogo: "Acercarse al lugar", destino: 11 }
    },
    // Pantalla 11
    {
      texto: "Encuentras un viejo búnker oculto. Escuchas voces adentro. Es la guarida de los secuestradores. Debes tomar una decisión rápida.",
      img: fondo[11],
      boton1: { dialogo: "Entrar solo para atraparlos por sorpresa", destino: 12 },
      boton2: { dialogo: "Retirarse y pedir refuerzos al jefe", destino: 13 }
    },
    // Pantalla 12: FINAL 2
    {
      texto: "Entras solo. Jorge está adentro esperándote. Te golpea por la espalda. Todo se vuelve oscuro. Te conviertes en una víctima más y nunca nadie vuelve a verte.",
      img: fondo[12],
      boton1: { dialogo: "Volver al Inicio", destino: 0 }
    },
    // Pantalla 13: FINAL 3
    {
      texto: "Irrumpes con el jefe José y un escuadrón. Rescatan a las víctimas y arrestan a Jorge. Eres el héroe de la ciudad. El ascenso es tuyo y tus deudas están pagadas.",
      img: fondo[13],
      boton1: { dialogo: "Volver al Inicio", destino: 0 }
    },
    // Pantalla 14: Créditos
    {
      texto: "Desarrollado por: Matias Grandal y Gabriela Escalante",
      img: null,
      boton1: { dialogo: "Volver al Menú Principal", destino: 0 }
    }
  ];
  }

  function draw() {
  background(20);

  let datos = pantallas[pantallaActual];
  
  if (datos.img) {
  image(datos.img, 0, 0, width, height);
  }
  //Tamaño y posicion de textos
  fill(255);
  textSize(18);
  textAlign(CENTER, TOP);
  text(datos.texto, 100, 80, 600, 200); 

  //si existe el boton 1 se dibuja
  if (datos.boton1) {
    dibujarBoton(100, 300, 600, 45, datos.boton1.dialogo);
  }

  //si existe el boton 2 se dibuja
  if (datos.boton2) {
    dibujarBoton(100, 360, 600, 45, datos.boton2.dialogo);
  }
  }


  function dibujarBoton(x, y, w, h, textoBoton) {
  let sobreBoton = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  
  //cambia color del mouse si esta arriba del boton
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
  let datos = pantallas[pantallaActual];
  
  if (pantallaActual === 0) {
    if (musicaFondo && !musicaFondo.isPlaying()) {
      musicaFondo.loop();
      musicaFondo.setVolume(0.5);
    }
  }

  if (datos.boton1) {
    if (mouseX > 100 && mouseX < 700 && mouseY > 300 && mouseY < 345) {
      let destino = datos.boton1.destino;
      
      // Control de música y efectos según el final al que se entra
      if (destino === 5 || destino === 12) { // Finales malos (5 y 12)
        if (musicaFondo) musicaFondo.stop();
        if (sonidoDerrota) sonidoDerrota.play();
      } else if (destino === 13) { // Final bueno (13)
        if (musicaFondo) musicaFondo.stop();
        if (sonidoVictoria) sonidoVictoria.play();
      }
      
      pantallaActual = destino; 
    }
  }

  if (datos.boton2) {
    if (mouseX > 100 && mouseX < 700 && mouseY > 360 && mouseY < 405) {
      let destino = datos.boton2.destino;
      
      // Control de música y efectos según el final al que se entra
      if (destino === 5 || destino === 12) {
        if (musicaFondo) musicaFondo.stop();
        if (sonidoDerrota) sonidoDerrota.play();
      } else if (destino === 13) {
        if (musicaFondo) musicaFondo.stop();
        if (sonidoVictoria) sonidoVictoria.play();
      }
      
      pantallaActual = destino; 
    }
  }
}
