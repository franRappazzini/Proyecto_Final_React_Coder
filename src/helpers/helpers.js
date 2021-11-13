import jsPDF from "jspdf";
import Swal from "sweetalert2";

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
        } / Precio (unidad): ${new Intl.NumberFormat().format(
          p.precio
        )} / Cantidad: ${p.cant}\n`
    )}`,
    5,
    50
  );

  pdf.save(`factura-${id}.pdf`);
}
