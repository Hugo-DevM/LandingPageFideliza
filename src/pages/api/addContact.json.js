import { createContact } from "../../utils/brevo.js";

export async function POST({ request }) {
    try {
        const data = await request.json();

        const contact = {
            name: data.name,
            phone: data.phone,
            software: data.preference,
            email: `${data.phone}@fideliza.mx`,
            listIds: [7],
        };

        const response = await createContact(contact);

        if (response.status !== 201 && response.status !== 204) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: response.message || "Error al registrar contacto en Brevo",
                }),
                { status: response.status }
            );
        }
        return new Response(
            JSON.stringify({
                success: true,
                message: "Contacto agregado correctamente",
            }),
            { status: 201 }
        );
    } catch (err) {
        console.error("Error en addContact:", err);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error interno del servidor",
            }),
            { status: 500 }
        );
    }
}
