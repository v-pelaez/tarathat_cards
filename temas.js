let indiceColor = localStorage.getItem("indiceColor") ? parseInt(localStorage.getItem("indiceColor")) : 0;
let colores = [
  {
    colortransp: "rgba(95, 158, 160, 0.473)",
    colorboton: "goldenrod",
    colorletrasboton: "#333",
    colortitulo: "cadetblue",
    colorletras: "bisque",
  },
  {
    colortransp: "#4b80257d",
    colorboton: "#b75d2a",
    colorletrasboton: "#ffeccc",
    colortitulo: "#c49645",
    colorletras: "bisque",
  },
  {
    colortransp: "#106e537d",
    colorboton: "#dc461b",
    colorletrasboton: "#ffe5cc",
    colortitulo: "#20755a",
    colorletras: "#ffe4c4",
  },
  {
    colortransp: "#64636b8a",
    colorboton: "#c4281b",
    colorletrasboton: "#fff3ca",
    colortitulo: "#c4281b",
    colorletras: "#ffe4c4",
  },
  {
    colortransp: "#6038238f",
    colorboton: "#b9302c",
    colorletrasboton: "##fffec1",
    colortitulo: "#c93125",
    colorletras: "bisque",
  },
  {
    colortransp: "#009f8982",
    colorboton: "#edb53c",
    colorletrasboton: "#333",
    colortitulo: "#edb53c",
    colorletras: "bisque",
  },
];
function cambiarColor() {
  const root = document.documentElement;
  const color = colores[indiceColor];
  root.style.setProperty("--colortransp", color.colortransp);
  root.style.setProperty("--colorboton", color.colorboton);
  root.style.setProperty("--colorletras", color.colorletras);
  root.style.setProperty("--colortitulo", color.colortitulo);
  root.style.setProperty("--colorletrasboton", color.colorletrasboton);
}

cambiarColor();
document.getElementById("skinIzq").addEventListener("click", () => {
    indiceColor = (indiceColor - 1 + colores.length) % colores.length;
    localStorage.setItem("indiceColor",indiceColor)
    cambiarColor();
  });
  
  document.getElementById("skinDer").addEventListener("click", () => {
    indiceColor = (indiceColor + 1) % colores.length;
    localStorage.setItem("indiceColor",indiceColor)
    cambiarColor();
  });