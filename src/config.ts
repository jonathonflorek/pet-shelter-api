export const port = required('PORT');

function required(name: string) {
    const result = process.env[name];
    if (!result) {
        throw new Error(`environment variable ${name} is required`);
    }
    return result;
}
