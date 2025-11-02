const modal2 = document.getElementById('form-modal2');
const openBtn2 = document.getElementById('open-modal2');
const closeBtn2 = document.getElementById('close-modal2');
const form2 = document.getElementById('waitlist-form2');
const submitBtn2 = form2.querySelector('button[type="submit"]');

openBtn2.onclick = () => modal2.style.display = 'flex';
closeBtn2.onclick = () => modal2.style.display = 'none';
window.onclick = e => { if (e.target === modal2) modal2.style.display = 'none'; }

function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

form2.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());

    submitBtn2.disabled = true;
    const originalHTML = submitBtn2.innerHTML;
    submitBtn2.innerHTML = `<span class="loader-center"></span>`;

    try {
        const res = await fetch("/api/addContact.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            showToast("¡Gracias por unirte! Te avisaremos lo mas pronto posible", "success");
            e.target.reset();
            modal2.style.display = "none";
        } else {
            const errorData = await res.json();
            console.error("Error de Brevo:", errorData);
            showToast("Hubo un problema al registrar tus datos.", "error");
        }
    } catch (err) {
        console.error(err);
        showToast("Error al conectar con el servidor.", "error");
    } finally {

        submitBtn2.disabled = false;
        submitBtn2.innerHTML = originalHTML;
    }
});
