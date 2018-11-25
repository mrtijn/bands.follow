const request = require('request-promise'); 
const Joi = require('joi');
const Boom = require('boom');

const Auth = {

}

const getUser = {
    async handler(req,h) {

        console.log(req);
        try{
            let token = req.headers.token;
            let access_token = '';
            var options = {
                url: 'https://api.spotify.com/v1/me',
                headers: { 'Authorization': 'Bearer ' + token },
                json: true
            };

            // use the access token to access the Spotify Web API
            let me = await request.get(options);

            return h.response(me).code(200);
            
        } catch(e){
            return h.response(e);
        }



        
    }
}

export {
    getUser
}