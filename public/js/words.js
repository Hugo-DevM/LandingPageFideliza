document.addEventListener("DOMContentLoaded", () => {
    const words = [
        { text: "recompensas", color: "#03D56A" },
        { text: "puntos", color: "#007bff" },
        { text: "beneficios", color: "#ffb400" },
        { text: "premios", color: "#ff4d4d" },
    ];

    const span = document.getElementById("changing-word");
    if (!span) return;

    let index = 0;

    span.style.backgroundColor = words[index].color;

    setInterval(() => {
        span.classList.add("fade-out");
        setTimeout(() => {
            index = (index + 1) % words.length;
            span.textContent = words[index].text;
            span.style.backgroundColor = words[index].color;
            span.classList.remove("fade-out");
        }, 400);
    }, 2000);
});