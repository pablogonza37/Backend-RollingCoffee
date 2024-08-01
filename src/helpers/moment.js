import moment from "moment-timezone";

const convertirAHoraArgentina = (fechaUTC) => {
  return moment(fechaUTC)
    .tz("America/Argentina/Buenos_Aires")
    .format("YYYY-MM-DD HH:mm:ss");
};

export default convertirAHoraArgentina;