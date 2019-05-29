import hapi from '@hapi/hapi';
import routes from './Artist.routes';
export async function init(server: hapi.Server ){
    routes(server);
}