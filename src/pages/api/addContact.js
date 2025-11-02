export async function POST({ request }) {
    const body = await request.json();
    const { name, phone, preference } = body;

    try {
        const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                "api-key": import.meta.env.BREVO_API_KEY,
            },
            body: JSON.stringify({
                attributes: {
                    NOMBRE: name,
                    TELEFONO: phone,
                    SOFTWARE: preference,
                },
                listIds: [7],
            }),
        });

        const data = await brevoResponse.json();

        if (!brevoResponse.ok) {
            return new Response(
                JSON.stringify({ success: false, error: data.message }),
                { status: brevoResponse.status }
            );
        }

        return new Response(
            JSON.stringify({ success: true, message: "Contacto agregado correctamente" }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ success: false, error: "Error interno del servidor" }),
            { status: 500 }
        );
    }
}
