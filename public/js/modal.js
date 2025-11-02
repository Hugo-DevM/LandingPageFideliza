const modal = document.getElementById('form-modal');
document.getElementById('open-modal').onclick = () => modal.style.display = 'flex';
document.getElementById('close-modal').onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; }

document.getElementById('waitlist-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());

    try {
        const res = await fetch("/api/addContact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (res.ok) {
            alert("¡Gracias por unirte! Te avisaremos pronto 😄");
            e.target.reset();
            modal.style.display = "none";
        } else {
            const errorData = await res.json();
            console.error("Error de Brevo:", errorData);
            alert("Hubo un problema al registrar tus datos.");
        }
    } catch (err) {
        console.error(err);
        alert("Error al conectar con el servidor.");
    }
});