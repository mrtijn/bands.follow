
import Router from 'koa-joi-router';
import ConcertController from './Concert.controller';
import * as Concertvalidations from './Concert.validations';
const router = Router();
// const concertController = new ConcertController();
// router.get('/concerts/all', (ctx) =>  ConcertController.getAllConcerts(ctx));
// router.get('/concert/{id}', (ctx) => ConcertController.getConcertById(ctx));
// router.post('/concert/create', (ctx) => ConcertController.createConcert(ctx))

router.route([
    {
        method: 'GET',
        path: '/concerts/all',
        handler: (ctx) =>  ConcertController.getAllConcerts(ctx)
    },
    {
        method: 'GET',
        path: '/concert/:id',
        handler: (ctx) => ConcertController.getConcertById(ctx)
    },
    {
        method: 'POST',
        path: '/concert/create',
        handler: (ctx) => ConcertController.createConcert(ctx),
        validate: {
            body: Concertvalidations.createConcertDto,
            type: 'json'
        }
    },
])

export default router;


