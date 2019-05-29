import hapi from '@hapi/hapi';
import routes from './User.routes';
export async function init(server: hapi.Server ){
    routes(server);
}