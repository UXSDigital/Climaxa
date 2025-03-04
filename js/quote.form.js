document.getElementById("emailForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    formData.append("destinatario", "dcpyahir@gmail.com");

    const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
    const emailToastEl = document.getElementById('emailToast');
    const emailToast = new bootstrap.Toast(emailToastEl, { delay: 3000 }); // Se mostrará por 3 segundos

    // Mostrar modal de carga
    loadingModal.show();

    try {
        const response = await fetch("https://climaxaserver.onrender.com/send-email", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        // Ocultar modal de carga
        loadingModal.hide();

        // Mostrar Toast con el resultado
        if (response.ok) {
            emailToastEl.classList.replace("text-bg-danger", "text-bg-success");
            document.querySelector("#emailToast .toast-body").textContent = result.message || "¡Correo enviado exitosamente!";
            emailToast.show();

            // ✅ Limpiar el formulario después de enviarlo
            this.reset();

            // ✅ Restaurar vista previa del archivo
            document.getElementById("file-preview").innerHTML = '<i class="fa fa-solid fa-upload load-icon fa-3x"></i>';
            document.getElementById("file-message").textContent = 'Adjunte su recibo de luz en formato PDF o Imagen';
        } else {
            emailToastEl.classList.replace("text-bg-success", "text-bg-danger");
            document.querySelector("#emailToast .toast-body").textContent = result.error || "Error al enviar el correo.";
            emailToast.show();
        }
    } catch (error) {
        loadingModal.hide();
        emailToastEl.classList.replace("text-bg-success", "text-bg-danger");
        document.querySelector("#emailToast .toast-body").textContent = "Hubo un error al enviar la solicitud.";
        emailToast.show();
    }
});

document.getElementById('fileInput').addEventListener('change', function() {
    const file = this.files[0];
    const filePreview = document.getElementById('file-preview');
    const fileMessage = document.getElementById('file-message');

    if (file) {
        let iconClass = 'fa fa-file';
        if (file.type === 'application/pdf') {
            iconClass = 'fa fa-file-pdf';
        } else if (file.type.startsWith('image/')) {
            iconClass = 'fa fa-file-image';
        }

        filePreview.innerHTML = `<i class="${iconClass} fa-3x"></i>`;
        fileMessage.textContent = file.name;
    } else {
        filePreview.innerHTML = '<i class="fa fa-solid fa-upload load-icon fa-3x"></i>';
        fileMessage.textContent = 'Adjunte su recibo de luz en formato PDF o Imagen';
    }
});