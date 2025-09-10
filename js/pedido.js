document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ pedido.js cargado");

    // Inicializar EmailJS
    emailjs.init({
        publicKey: "o0hmv95frzB3csrnf", // tu clave pública
    });

    const form = document.getElementById("pedidoForm");

    if (!form) {
        console.error("❌ No se encontró el formulario #pedidoForm");
        return;
    }

    // Capturamos la ID del producto desde la URL
    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get("id"); // Ejemplo: "anillo-sol-golden"
    console.log("Producto ID capturada:", idProducto);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("🚀 Submit capturado");

        // Generar un ID único para el pedido
        const idUnico = "PED-" + Date.now();

        // Recopilamos todos los datos del formulario + ID del producto
        const formData = {
            nombre: form.nombre.value,
            apellidos: form.apellidos.value,
            telefono: form.telefono.value,
            email: form.email.value,
            direccion: form.direccion.value,
            comunidad: form.comunidad.value,
            municipio: form.municipio.value,
            codigo_postal: form.codigo_postal.value,
            id: idUnico,
            productoId: idProducto,          // ID del producto
            productoNombre: productoNombre,  // Nombre del producto
            cantidad: 1                       // Puedes agregar la cantidad si quieres
        };

        console.log("Datos a enviar:", formData);

        // Enviar datos usando EmailJS
        emailjs.send("service_qsq7jak", "template_z5necjk", formData)
            .then(() => {
                alert("✅ Pedido enviado con éxito. ID: " + idUnico);
                form.reset();
            })
            .catch(err => {
                console.error("❌ Error al enviar:", err);
                alert("❌ Error al enviar: " + JSON.stringify(err));
            });
    });
});
