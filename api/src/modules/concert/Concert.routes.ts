import hapi from '@hapi/hapi';
import ConcertController from './Concert.controller';
import * as Concertvalidations from './Concert.validations';

export default function(server: hapi.Server){
    const concertController = new ConcertController();
    server.route([
        {
            method: 'GET',
            path: '/concert/all',
            handler: concertController.getAllConcerts,
        },
        {
            method: 'GET',
            path: '/concert/{id}',
            handler: concertController.getConcertById
        },
        {
            method: 'POST',
            path: '/concert/create',
            handler: concertController.createConcert,
            options: {
                validate: {
                    payload: Concertvalidations.createConcertDto
                }
            }
        },
      ]);
}

