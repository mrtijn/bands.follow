import LocationController from './Location.controller';
import Router from 'koa-joi-router';
// import * as Concertvalidations from './Location.validations';

const router = Router();

router.get('/locations/all', (ctx) => LocationController.getAllLocations(ctx));

export default router;