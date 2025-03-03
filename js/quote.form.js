document.getElementById("emailForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    
    // Aquí agregamos el destinatario al FormData para enviarlo al servidor
    formData.append("destinatario", "dcpyahir@gmail.com"); // Puedes modificar este valor dinámicamente si es necesario

    try {
        const response = await fetch("https://expressuxdigital.onrender.com/send-email", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        alert(result.message || result.error);
    } catch (error) {
        alert("Hubo un error al enviar la solicitud. Intenta nuevamente.");
    }
});

document.getElementById('fileInput').addEventListener('change', function() {
    const file = this.files[0];
    const filePreview = document.getElementById('file-preview');
    const fileMessage = document.getElementById('file-message');

    if (file) {
        let iconClass = 'fa fa-file'; // Icono por defecto
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