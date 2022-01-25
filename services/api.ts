import axios from 'axios';
import { parseCookies } from 'nookies';

/**
 * Create an connector with token getting from cookies
 * @param ctx This param is the `context` when using server
 * @returns api connector
 */
export function createApiConnector(ctx?: any) {
    const { ['@marioportfolio:token']: token } = parseCookies(ctx);

    const api = axios.create({
        baseURL: process.env.APP_URL,
    });

    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return api;
}

const api = createApiConnector();

export default api;