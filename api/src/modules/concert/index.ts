import hapi from '@hapi/hapi';
import routes from './Concert.routes';
export function init(server: hapi.Server ){
    routes(server);
}