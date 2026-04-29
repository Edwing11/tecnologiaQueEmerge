document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioComentarios');
    const listaComentarios = document.getElementById('listaComentarios');

    // Función para cargar comentarios del servidor
    const cargarComentarios = async () => {
        try {
            const respuesta = await fetch('/api/comentarios');
            const comentarios = await respuesta.json();
            
            listaComentarios.innerHTML = '';
            comentarios.reverse().forEach(c => {
                const div = document.createElement('div');
                div.className = 'comentario-item';
                div.innerHTML = `
                    <strong>${c.nombre}</strong> <small>(${c.fecha})</small>
                    <p>${c.mensaje}</p>
                `;
                listaComentarios.appendChild(div);
            });
        } catch (error) {
            console.error('Error cargando comentarios:', error);
        }
    };

    // Función para enviar nuevo comentario
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const mensaje = document.getElementById('mensaje').value;

        try {
            const respuesta = await fetch('/api/comentarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, mensaje })
            });

            if (respuesta.ok) {
                formulario.reset();
                cargarComentarios(); // Recargar lista
            }
        } catch (error) {
            alert('Error al enviar el comentario');
        }
    });

    // Carga inicial
    cargarComentarios();
});