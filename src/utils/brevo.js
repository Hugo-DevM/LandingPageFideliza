const { BREVO_API_KEY } = import.meta.env;

export async function createContact(contact) {
    contact.listIds = contact.listIds ?? [];

    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({
            email: contact.email,
            attributes: {
                NOMBRE: contact.name,
                TELEFONO: contact.phone,
                SOFTWARE: contact.software,
            },
            listIds: contact.listIds,
            updateEnabled: true,
        }),
    };

    let response;

    try {
        response = await fetch("https://api.brevo.com/v3/contacts", options);
    } catch (err) {
        console.error(`Error de conexión con Brevo: ${err}`);
        return { status: 500, message: "Error de conexión" };
    }

    if (response.status !== 201 && response.status !== 204) {
        return {
            status: response.status,
            message: "El contacto no pudo ser creado o actualizado",
        };
    }

    return { status: response.status };
}
