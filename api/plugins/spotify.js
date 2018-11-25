async function register(server, options) {
    // declare and install dependency to bell
    await server.register({
        plugin: require('bell')
    })
    //https://futurestud.io/tutorials/hapi-authenticate-with-github-and-remember-the-login
    const client_id = 'fc54277fa14147e28e480b04a5b3da31'; 
    const client_secret = '658d68c610754dc79cb465b21e572910'; 

    server.auth.strategy('spotify', 'bell', {
        provider: 'spotify',
        password: 'supersupersupersupersupersecretpassword',
        clientId: client_id,
        clientSecret: client_secret,
        isSecure: process.env.NODE_ENV === 'production'
    })

    server.log('info', 'Plugin registered: bell authentication with spotify');
}




exports.plugin = {
    register,
    name: 'authentication',
    version: '1.0.0',
    once: true
}

