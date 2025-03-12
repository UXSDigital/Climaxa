document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("emailForm");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // Evitar recargar la página

            const isIndexPage = document.getElementById("fileInput") !== null; // Detecta si hay un input de archivos

            let formData;
            
            if (isIndexPage) {
                // 🟢 En index.html -> Enviar con archivo adjunto
                formData = new FormData(this);
                formData.append("destinatario", "dcpyahir@gmail.com");
            } else {
                // 🔵 En aires.html -> Enviar solo datos sin archivo
                const nombre = document.querySelector('input[name="nombre"]').value.trim();
                const email = document.querySelector('input[name="email"]').value.trim();
                const telefono = document.querySelector('input[name="telefono"]').value.trim();

                if (!nombre || !email || !telefono) {
                    alert("Por favor, completa todos los campos.");
                    return;
                }

                formData = JSON.stringify({ nombre, email, telefono, destinatario: "dcpyahir@gmail.com" });
            }

            // Mostrar modal de carga
            const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
            loadingModal.show();

            try {
                const response = await fetch("https://climaxaserver.onrender.com/send-email", {
                    method: "POST",
                    headers: isIndexPage ? {} : { "Content-Type": "application/json" },
                    body: formData,
                });

                const result = await response.json();
                loadingModal.hide();

                // Mostrar mensaje de éxito o error
                const emailToastEl = document.getElementById('emailToast');
                const emailToast = new bootstrap.Toast(emailToastEl, { delay: 3000 });

                if (response.ok) {
                    emailToastEl.classList.replace("text-bg-danger", "text-bg-success");
                    document.querySelector("#emailToast .toast-body").textContent = result.message || "¡Correo enviado exitosamente!";
                    emailToast.show();
                    
                    // Limpiar formulario después de enviarlo
                    form.reset();

                    if (isIndexPage) {
                        // Restaurar vista previa del archivo en index.html
                        document.getElementById("file-preview").innerHTML = '<i class="fa fa-solid fa-upload load-icon fa-3x"></i>';
                        document.getElementById("file-message").textContent = 'Adjunte su recibo de luz en formato PDF o Imagen';
                    }
                } else {
                    throw new Error(result.error || "Error al enviar el correo.");
                }
            } catch (error) {
                loadingModal.hide();
                console.error("Error en el envío:", error);

                const emailToastEl = document.getElementById('emailToast');
                emailToastEl.classList.replace("text-bg-success", "text-bg-danger");
                document.querySelector("#emailToast .toast-body").textContent = "Hubo un error al enviar los datos.";
                new bootstrap.Toast(emailToastEl, { delay: 3000 }).show();
            }
        });
    }
});



//------------------------------------------
document.getElementById('fileInput').addEventListener('change', function() {
    const file = this.files[0];
    const filePreview = document.getElementById('file-preview');
    const fileMessage = document.getElementById('file-message');

    if (file) {
        let iconClass = 'fa fa-file';
        let fileType = file.type;

        if (fileType === 'application/pdf') {
            iconClass = 'fa fa-file-pdf';
        } else if (fileType.startsWith('image/')) {
            iconClass = 'fa fa-file-image';
        }

        filePreview.innerHTML = `<i class="${iconClass} fa-3x"></i>`;
        fileMessage.textContent = file.name; // ✅ Muestra el nombre del archivo sin modificaciones
    } else {
        filePreview.innerHTML = '<i class="fa fa-solid fa-upload load-icon fa-3x"></i>';
        fileMessage.textContent = 'Adjunte su recibo de luz en formato PDF o Imagen';
    }
});



async function enviarDatosSinArchivo() {
    const nombre = document.querySelector('input[name="nombre"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const telefono = document.querySelector('input[name="telefono"]').value;

    const formData = { nombre, email, telefono };

    console.log("Datos enviados:", formData); // ✅ Verificar en consola antes de enviar

    try {
        // Simulación de envío (cambia la URL según tu destino real)
        const response = await fetch("https://ejemplo.com/guardar-datos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        // Mostrar mensaje en consola
        if (response.ok) {
            alert("¡Datos enviados correctamente!");
            console.log("Respuesta del servidor:", result);

            // Limpiar formulario
            document.getElementById("emailForm").reset();
        } else {
            throw new Error(result.error || "Error al enviar los datos.");
        }
    } catch (error) {
        console.error("Error en el envío:", error);
        alert("Hubo un error al enviar los datos.");
    }
}
