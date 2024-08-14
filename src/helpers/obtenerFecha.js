const obtenerFechaHora = () => {
    const ahora = new Date();

    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, "0");
    const dia = String(ahora.getDate()).padStart(2, "0");
    const hora = String(ahora.getHours()).padStart(2, "0");
    const minuto = String(ahora.getMinutes()).padStart(2, "0");
    const segundo = String(ahora.getSeconds()).padStart(2, "0");

    return `${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
  }

  export default obtenerFechaHora;