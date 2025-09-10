document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ pedido.js cargado");

    
    emailjs.init({
        publicKey: "o0hmv95frzB3csrnf", // tu clave pública
    });

    const form = document.getElementById("pedidoForm");

    if (!form) {
        console.error("❌ No se encontró el formulario #pedidoForm");
        return;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault(); 
        console.log("🚀 Submit capturado");

        
        const idUnico = "PED-" + Date.now();

        
        const productoNombre = document.querySelector('.cantidad-producto-carrito h2')?.textContent || '';
        const cantidad = document.querySelector('.cantidad-producto-carrito p:last-child')?.textContent.replace('Cantidad: ', '') || '1';

        
        const formData = {
            nombre: form.nombre.value,
            apellidos: form.apellidos.value,
            telefono: form.telefono.value,
            email: form.email.value,
            direccion: form.direccion.value,
            comunidad: form.comunidad.value,
            municipio: form.municipio.value,
            codigo_postal: form.codigo_postal.value,
            nombreProducto:form.nombreProducto.value,
            cantidadProducto:form.cantidadProducto.textContent,
            totalPedido:form.totalPedido.value,
            id: idUnico,

        };

        console.log("Datos a enviar:", formData);

        // Enviar correo con EmailJS
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




