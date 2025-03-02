class Carta {
  constructor(nombre, imagen, dorso) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.dorso = dorso;
    this.revelada = true;
    this.emparejada = false;

    this.elemento = document.createElement("div");
    this.elemento.classList.add("carta", "bocarriba");

    this.inner = document.createElement("div");
    this.inner.classList.add("carta-inner");

    this.cara = document.createElement("div");
    this.cara.classList.add("cara");
    const caraImg = document.createElement("img");
    caraImg.src = this.imagen;
    this.cara.appendChild(caraImg);

    this.reverso = document.createElement("div");
    this.reverso.classList.add("reverso");
    const reversoImg = document.createElement("img");
    reversoImg.src = this.dorso;
    this.reverso.appendChild(reversoImg);

    this.inner.appendChild(this.cara);
    this.inner.appendChild(this.reverso);
    this.elemento.appendChild(this.inner);
  }

  destacar() {
    if (this.revelada && !this.emparejada) {
      this.elemento.style.animation = "none";
      setTimeout(() => {
        this.elemento.style.animation = "";
        this.cara.classList.add("enEspera");
      }, 10);
    } else {
      setTimeout(() => {
        this.cara.classList.remove("enEspera");
      }, 20);
    }
  }

  voltear() {
    if (this.revelada) {
      // poner bocabajo
      this.elemento.classList.remove("bocarriba");
      this.revelada = false;
    } else {
      // poner bocarriba
      this.elemento.classList.add("bocarriba");
      this.revelada = true;
    }
    this.destacar();
  }
}

const dm = {
  dorsoElegido: "imagenes/reversos/basic.png",
  coleccion: [
    {
      nombre: "Gaela",
      imagen: "imagenes/caras/Gaela.png",
      dorso: "imagenes/reversos/basic.png",
    },
    {
      nombre: "Arvis",
      imagen: "imagenes/caras/Arvis.png",
      dorso: "imagenes/reversos/basic.png",
    },
    {
      nombre: "Astaro",
      imagen: "imagenes/caras/Astaro.png",
      dorso: "imagenes/reversos/basic.png",
    },
    {
      nombre: "Magnus",
      imagen: "imagenes/caras/Magnus.png",
      dorso: "imagenes/reversos/basic.png",
    },
    {
      nombre: "Wololo",
      imagen: "imagenes/caras/Wololo.png",
      dorso: "imagenes/reversos/basic.png",
    },
    {
      nombre: "Tarrasca",
      imagen: "imagenes/caras/Tarrasca.png",
      dorso: "imagenes/reversos/basic.png",
    },
    {
      nombre: "Chen",
      imagen: "imagenes/caras/Chen.png",
      dorso: "imagenes/reversos/basic.png",
    },
  ],
  dorsos: [
    { imagen: "imagenes/reversos/basic.png" },
    { imagen: "imagenes/reversos/alleria.png" },
    { imagen: "imagenes/reversos/darkspear.png" },
    { imagen: "imagenes/reversos/thirdwar.png" },
    { imagen: "imagenes/reversos/thrall.png" },
    { imagen: "imagenes/reversos/zuldazar.png" },
  ],

  menu: document.getElementById("menu"),
  iniciar: document.getElementById("iniciar"),
  reiniciar: document.getElementById("reiniciar"),
  marcador: document.getElementById("marcador"),
  tablero: document.getElementById("tablero"),

  baraja: [],
  primeraCarta: null,
  segundaCarta: null,
  dificultad: null,
  tiempoRestante: null,
  numParejas: null,
  numVidas: null,
  trampas: false,
  reinicio: false,
  player: null,
  indiceDorso: 0,

  tiempoInicial: 0,
  vidasInicial: 0,
  aciertos: 0,
  intentos: 0,
  puntos: 0,
  rachaMax: 0,
  racha: 0,
  mRacha: document.getElementById("racha"),
  mPuntos: document.getElementById("puntos"),
  mAciertos: document.getElementById("porcentaje"),
  contador: document.getElementById("contador"),
  // Configuración Inicial
  cambiarDorso() {
    const dorsoPreview = document.getElementById("dorsoVista");
    this.dorsoElegido = this.dorsos[this.indiceDorso].imagen;
    dorsoPreview.src = this.dorsoElegido;

    // Recorrer el array de cartas en la colección inicial y actualizar el dorso
    this.coleccion.forEach((carta) => {
      carta.dorso = this.dorsoElegido;
    });
  },

  crearBaraja() {
    for (let i = 0; i < this.numParejas; i++) {
      const carta = this.coleccion[i % this.coleccion.length];
      this.baraja.push(new Carta(carta.nombre, carta.imagen, carta.dorso));
      this.baraja.push(new Carta(carta.nombre, carta.imagen, carta.dorso));
    }
    this.baraja.sort(() => 0.5 - Math.random()); // Barajar las cartas
  },
  crearVidas() {
    if (!this.divVidas) {
      this.divVidas = document.createElement("div");
      this.divVidas.classList.add("divVidas");
      this.marcador.insertBefore(this.divVidas, this.reiniciar);
    }
    this.divVidas.innerHTML = ""; // Limpiar las vidas actuales
    for (let i = 0; i < this.numVidas; i++) {
      const imagen = document.createElement("img");
      imagen.src = "imagenes/vidas.png";
      imagen.classList.add("vida");
      this.divVidas.appendChild(imagen);
    }
  },
  crearTablero() {
    this.tablero.innerHTML = ""; // Limpiar el tablero
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < this.baraja.length; i++) {
      const carta = this.baraja[i];

      carta.elemento.addEventListener("click", () => this.revelarCarta(carta));
      carta.revelada = true;
      carta.emparejada = false;

      fragment.appendChild(carta.elemento);
    }

    this.tablero.appendChild(fragment);
    setTimeout(() => {
      this.baraja.forEach((carta) => carta.voltear());
    }, 1000 * (this.dificultad / 1.5));
  },

  mostrarMarcador() {
    this.marcador.style.display = "flex";
    this.mRacha.textContent = 0;
    this.mPuntos.textContent = 0;
    this.mAciertos.textContent = Math.max(
      0,
      this.intentos > 0 ? (this.aciertos / this.intentos) * 100 : 0
    );
  },
  actualizarMarcador() {
    this.mRacha.textContent = this.racha;
    this.mPuntos.textContent = this.puntos;
    this.mAciertos.textContent = Math.round(
      Math.max(0, (this.aciertos / this.intentos) * 100),
      2
    );
    this.crearVidas();
  },

  // Gestión del Juego
  antiCheat() {
    if (this.numParejas < 5 || this.numVidas > 5) {
      this.trampas = true;
    }
  },

  iniciarPartida() {
    this.menu.style.display = "none";
    this.player = document.getElementById("player").value;
    this.numParejas = parseInt(document.getElementById("parejas").value);
    this.numVidas = parseInt(document.getElementById("vidas").value);
    this.vidasInicial = this.numVidas;
    this.dificultad = this.numParejas / this.numVidas;
    this.crearBaraja(this.numParejas);
    this.crearTablero();
    this.crearVidas();
    this.mostrarMarcador();
    this.iniciarCuentaAtras();
    this.antiCheat();
  },

  reiniciarPartida() {
    this.reinicio = true;
    this.menu.style.display = "flex";
    this.marcador.style.display = "none";
    this.tablero.innerHTML = ""; // Limpiar el tablero
    this.aciertos = 0;
    this.puntos = 0;
    this.racha = 0;
    this.dificultad = null;
    this.tiempoRestante = null;
    this.primeraCarta = null;
    this.segundaCarta = null;
    this.mRacha.textContent = 0;
    this.mPuntos.textContent = 0;
    this.numParejas = 0;
    this.baraja = [];
  },

  iniciarCuentaAtras() {
    this.tiempoRestante = Math.round(10 * this.dificultad);
    this.tiempoInicial = this.tiempoRestante;
    let intervalo;
    this.contador.textContent = this.tiempoRestante;
    intervalo = setInterval(() => {
      this.tiempoRestante--;
      this.contador.textContent = this.tiempoRestante;
      if (this.tiempoRestante <= 0) {
        clearInterval(intervalo);
        this.finalizarPartida();
      }
    }, 1000);
  },

  finalizarPartida() {
    if (!this.reinicio) {
      if (this.trampas) {
        this.puntos = 0;
        this.actualizarMarcador;
        alert(`¡Sucio y ruin tramposo! tu puntuación es ${this.puntos}`);
      } else if (this.tiempoRestante > 0 && this.numVidas > 0) {
        this.puntos = this.puntos * this.dificultad;

        this.actualizarMarcador;
        alert(
          `¡Felicidades, valiente héroe! Has completado la misión con éxito. Tu puntuación final es ${this.puntos}.`
        );
      } else if (this.numVidas === 0 && this.tiempoRestante > 0) {
        alert(
          `Has luchado con honor, pero has perdido todas tus vidas en la batalla. Tu puntuación final es ${this.puntos}.`
        );
      } else if (this.tiempoRestante === 0) {
        alert(
          `¡El tiempo se ha agotado! Tu aventura ha llegado a su fin. Tu puntuación final es ${this.puntos}.`
        );
      }
      localStorage.setItem("puntos", this.puntos);
      localStorage.setItem("tiempo", this.tiempoInicial - this.tiempoRestante);
      localStorage.setItem("vidas", this.numVidas);
      localStorage.setItem("vidaMax", this.vidasInicial);
      localStorage.setItem("aciertos", this.aciertos);
      localStorage.setItem(
        "porAciertos",
        Math.round(Math.max(0, (this.aciertos / this.intentos) * 100), 2)
      );
      localStorage.setItem("numParejas", this.numParejas);
      localStorage.setItem("player", this.player);
      localStorage.setItem("racha", this.rachaMax);
      localStorage.setItem("trampas", this.trampas);
      window.location.href = "puntuacion.html";
      this.trampas = false;
    }
    this.reinicio = false;
  },

  // Gestión de Cartas
  revelarCarta(carta) {
    if (!carta.revelada && !carta.emparejada) {
      if (this.primeraCarta === null) {
        this.primeraCarta = carta;
        carta.voltear();
      } else if (this.segundaCarta === null) {
        this.segundaCarta = carta;
        carta.voltear();
        this.compararCartas();
      }
    }
  },

  compararCartas() {
    this.intentos++;
    if (this.primeraCarta.nombre === this.segundaCarta.nombre) {
      this.primeraCarta.emparejada = true;
      this.segundaCarta.emparejada = true;
      this.primeraCarta.destacar();
      this.segundaCarta.destacar();
      this.aciertos++;
      this.racha++;
      if (this.racha > this.rachaMax) {
        this.rachaMax = this.racha;
      }
      this.puntos += 1 * Math.max(1, this.racha) * this.tiempoRestante;
      this.resetearCartas();

      // Si toda la baraja es emparejada, finalizarpartida
      if (this.aciertos === this.numParejas) {
        setTimeout(() => {
          this.finalizarPartida();
        }, 1000);
      }
    } else {
      this.racha = 0;
      this.numVidas--;
      setTimeout(() => {
        this.primeraCarta.voltear();
        this.segundaCarta.voltear();
        this.resetearCartas();
        if (this.numVidas === 0) {
          this.finalizarPartida();
        }
      }, 1000);
    }
    this.actualizarMarcador();
  },

  resetearCartas() {
    this.primeraCarta = null;
    this.segundaCarta = null;
  },
};

// Inicializar el juego
document.addEventListener("DOMContentLoaded", (event) => {
  const form = document.getElementById("juegoForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    dm.iniciarPartida();
  });
});
document.getElementById("reiniciar").addEventListener("click", () => {
  dm.reiniciarPartida();
});

document.getElementById("dorsoIzq").addEventListener("click", () => {
  dm.indiceDorso = (dm.indiceDorso - 1 + dm.dorsos.length) % dm.dorsos.length;
  dm.cambiarDorso();
});

document.getElementById("dorsoDer").addEventListener("click", () => {
  dm.indiceDorso = (dm.indiceDorso + 1) % dm.dorsos.length;
  dm.cambiarDorso();
});
