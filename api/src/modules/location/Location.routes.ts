import hapi from '@hapi/hapi';
import LocationController from './Location.controller';
// import * as Concertvalidations from './Location.validations';

export default function(server: hapi.Server){
    const locationController = new LocationController();
    server.route([
        {
            method: 'GET',
            path: '/locations/all',
            handler: locationController.getAllLocations,
        },
        // {
        //     method: 'GET',
        //     path: '/concert/{id}',
        //     handler: concertController.getConcertById
        // },
        // {
        //     method: 'POST',
        //     path: '/concert/create',
        //     handler: concertController.createConcert,
        //     options: {
        //         validate: {
        //             payload: Concertvalidations.createConcertDto
        //         }
        //     }
        // },
      ]);
}

