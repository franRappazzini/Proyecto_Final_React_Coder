import jsPDF from "jspdf";
import Swal from "sweetalert2";
import { getFirebase } from "../services/getFirebase";

// loader mientras se se envia la peticion de compra
export function checkoutLoader() {
  let timerInterval;
  Swal.fire({
    title: "Aguarde, estamos procesando su pedido..",
    html: "<b></b>",
    timer: 4000,
    timerProgressBar: false,
    didOpen: () => {
      Swal.showLoading();
      // const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        // b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
}

// para descargar factura de la compra
export function createPDF(orden, id) {
  let { nombre, apellido } = orden.comprador;
  let { carrito } = orden;
  let fecha = new Date();

  const pdf = new jsPDF();
  pdf.text(`Comprador: ${nombre + " " + apellido}`, 5, 10);
  pdf.text(`Total: $${new Intl.NumberFormat().format(orden.total)}`, 5, 20);
  pdf.text(`Numero de seguimiento: ${id}`, 5, 30);
  pdf.text(
    `Fecha: ${
      fecha.getDay() +
      "/" +
      fecha.getMonth() +
      "/" +
      fecha.getFullYear() +
      ", " +
      fecha.getHours() +
      ":" +
      fecha.getMinutes() +
      "hs"
    }`,
    5,
    40
  );
  pdf.text(
    `Compra:\n${carrito.map(
      (p) =>
        `*Producto: ${
          p.producto
        } / Precio (unidad): $${new Intl.NumberFormat().format(
          p.precio
        )} / Cantidad: ${p.cant}\n`
    )}`,
    5,
    50
  );

  pdf.save(`factura-${id}.pdf`);
}

// valida que los mail sean validos
export function emailValidator(email, email2, sendToFirebase, checkoutLoader) {
  if (email === email2) {
    sendToFirebase();
    checkoutLoader();
  } else {
    Swal.fire(
      "Error",
      "Los email ingresados no coinciden. Ponga el mismo email para poder realizar la compra.",
      "error"
    );
  }
}

// envia los datos a firebase
export function putToFirebase(orden, nombre, apellido, history, setCarrito) {
  const db = getFirebase();

  db.collection("compras")
    .add(orden)
    .then((res) => {
      Swal.fire(
        `Felicidades ${nombre} ${apellido}!`,
        `Su compra se realizo exitosamente, pronto recibira un mail para seguir el envio. A continuación se le descargara la factura de la compra.`,
        "success"
      );
      createPDF(orden, res.id);
    })
    .catch((err) => Swal.fire(`Error:`, `${err}.`, "error"))
    .finally(() => {
      history.push("/");
      setCarrito([]);
    });
}
