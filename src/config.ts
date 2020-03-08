export const port = required('PORT');

export const postgresConfig = {
    type: 'postgres' as const,
    url: required('DATABASE_URL'),
};

function required(name: string) {
    const result = process.env[name];
    if (!result) {
        throw new Error(`environment variable ${name} is required`);
    }
    return result;
}
