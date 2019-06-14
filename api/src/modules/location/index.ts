import hapi from '@hapi/hapi';
import routes from './Location.routes';
export async function init(server: hapi.Server ){
    routes(server);
}