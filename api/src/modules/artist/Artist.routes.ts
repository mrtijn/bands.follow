import hapi from '@hapi/hapi';
import ArtistController from "./Artist.controller";
import * as ArtistValidations from "./Artist.validations";
export default function(server: hapi.Server){
    const artistController = new ArtistController();
    server.route([
        {
          method: "GET",
          path: "/artist/all",
          handler: artistController.getAllArtist
        },
        {
          method: "GET",
          path: "/artist/{id}",
          handler: artistController.getArtistById
        },
        {
          method: "POST",
          path: "/artist/create",
          handler: artistController.createArtist,
          options: {
            validate: {
              payload: ArtistValidations.createArtist
            }
          }
        }
      ]);
}
