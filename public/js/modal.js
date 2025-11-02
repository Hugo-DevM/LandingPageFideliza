const modal = document.getElementById('form-modal');
const openBtn = document.getElementById('open-modal');
const closeBtn = document.getElementById('close-modal');
const form = document.getElementById('waitlist-form');
const submitBtn = form.querySelector('button[type="submit"]');

openBtn.onclick = () => modal.style.display = 'flex';
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; }

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = `<span class="loader"></span> Enviando...`;

    try {
        const res = await fetch("/api/addContact.json", {
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
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});
