document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        const email = document.querySelector('input[type="email"]').value;
        if (!email.includes('@')) {
            alert('Por favor, introduce un correo electrónico válido.');
            event.preventDefault();
        }
    });
});