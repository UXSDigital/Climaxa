document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("emailForm");
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // Evitar recargar la página
            const isIndexPage = document.getElementById("fileInput") !== null; // Detecta si hay un input de archivos
            let formData;
            if (isIndexPage) {
                formData = new FormData(this);
                formData.append("destinatario", "ialessandra.reyes@gmail.com");
            } else {
                const nombre = document.querySelector('input[name="nombre"]').value.trim();
                const email = document.querySelector('input[name="email"]').value.trim();
                const telefono = document.querySelector('input[name="telefono"]').value.trim();
                if (!nombre || !email || !telefono) {
                    alert("Por favor, completa todos los campos.");
                    return;
                }
                formData = JSON.stringify({ nombre, email, telefono, destinatario: "dcpyahir@gmail.com" });
            }
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
                const emailToastEl = document.getElementById('emailToast');
                const emailToast = new bootstrap.Toast(emailToastEl, { delay: 3000 });
                if (response.ok) {
                    emailToastEl.classList.replace("text-bg-danger", "text-bg-success");
                    document.querySelector("#emailToast .toast-body").textContent = result.message || "¡Correoaaaaaaa enviado exitosamente!";
                    emailToast.show();
                    form.reset();
                    if (isIndexPage) {
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