import Router from 'koa-joi-router';
const router = Router();
import Controller from "./Artist.controller";
import * as ArtistValidations from "./Artist.validations";

const ArtistController = new Controller();

router.get('/artists/all',  (ctx) => ArtistController.getAllArtists(ctx));

router.get('/artist/{id}', (ctx) => ArtistController.getArtistById(ctx));

router.post('/artist/create', (ctx) => ArtistController.createArtist(ctx));

router.get('/artist/search', (ctx) => ArtistController.findArtist(ctx));


router.route( [{
  method: "GET",
  path: "/artists/all",
  handler: (ctx) => ArtistController.getAllArtists(ctx)
},
{
  method: "GET",
  path: "/artist/:id",
  handler: (ctx) => ArtistController.getArtistById(ctx)
},
{
  method: "POST",
  path: "/artist/create",
  handler:  (ctx) => ArtistController.createArtist(ctx),
  validate: {
    body: ArtistValidations.createArtist,
    type: 'json'
  }
},
{
  method: "GET",
  path: "/artist/search",
  handler: (ctx) => ArtistController.findArtist(ctx),
  validate: {
    params: ArtistValidations.searchArtist
  }
}
]);





export default router;