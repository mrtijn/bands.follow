import { controller, get} from 'hapi-decorators';

@controller('/concerts')
class concertController {
    constructor(){

    }
    @get('/')
    sayHello(request, reply) {
        reply({ message: `hello` })
    }
}