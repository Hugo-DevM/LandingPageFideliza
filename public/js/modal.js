const modal = document.getElementById('form-modal');
const closeBtn = document.getElementById('close-modal');
const form = document.getElementById('waitlist-form');
const submitBtn = form.querySelector('button[type="submit"]');

document.querySelectorAll('[data-modal="open"]').forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
});

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; }

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

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());

    submitBtn.disabled = true;
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span class="loader-center"></span>`;

    try {
        const res = await fetch("/api/addContact.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            showToast("¡Gracias por unirte! Te avisaremos lo más pronto posible", "success");
            e.target.reset();
            modal.style.display = "none";
        } else {
            const errorData = await res.json();
            console.error("Error de Brevo:", errorData);
            showToast("Hubo un problema al registrar tus datos.", "error");
        }
    } catch (err) {
        console.error(err);
        showToast("Error al conectar con el servidor.", "error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
    }
});
