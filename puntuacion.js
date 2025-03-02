const apuntador = {
  puntos: localStorage.getItem("puntos"),
  tiempo: localStorage.getItem("tiempo"),
  vidas: localStorage.getItem("vidas"),
  vidaMax: localStorage.getItem("vidaMax"),
  aciertos: localStorage.getItem("aciertos"),
  porAciertos: localStorage.getItem("porAciertos"),
  numParejas: localStorage.getItem("numParejas"),
  player:
    localStorage.getItem("player") === ""
      ? null
      : localStorage.getItem("player"),
  racha: localStorage.getItem("racha"),
  trampas: localStorage.getItem("trampas"),

  jugar: document.getElementById("jugar"),
  puntuacion: document.getElementById("puntuacion"),
  mensaje: document.getElementById("mensaje"),
  pVidas: document.getElementById("pVidas"),
  pRacha: document.getElementById("pRacha"),
  pPorc: document.getElementById("pPorc"),
  pParejas: document.getElementById("pParejas"),
  pTiempo: document.getElementById("pTiempo"),

  apuntar() {
    if (this.player === null) {
      this.mensaje.textContent = `Espera un momento... aun no has jugado. ¿A que esperas para ser recordado?`;
      this.jugar.textContent = `Jugar ahora`
      this.puntuacion.innerHTML = "";
    } else {
      const mensajeMuer = `En memoria de ${this.player} que perdio todas sus vidas por alcanzar ${this.puntos} puntos`;
      const mensajeVic = `Alabado sea ${this.player} que completo su hazaña con ${this.puntos} puntos`;
      const mensajeTiem = `La borrachera le hizo perder el tiempo pero ${this.player} logro ${this.puntos} puntos`;
      const mensajeTramp = `La rata almizclera de ${this.player} quiso engañarnos haciendo trampas`;
      let mensajeFinal = "";
      if (this.trampas === "true") {
        mensajeFinal = mensajeTramp;
      } else if (this.tiempo === "0") {
        mensajeFinal = mensajeTiem;
      } else if (this.vidas === "0") {
        mensajeFinal = mensajeMuer;
      } else {
        mensajeFinal = mensajeVic;
      }
      this.mensaje.textContent = mensajeFinal;
      this.pVidas.textContent = `${this.vidas}/${this.vidaMax}`;
      this.pRacha.textContent = this.racha;
      this.pPorc.textContent = `${this.porAciertos}%`;
      this.pParejas.textContent = `${this.aciertos}/${this.numParejas}`;
      this.pTiempo.textContent = `${this.tiempo} segundos`;
    }
  },
};

apuntador.apuntar();
