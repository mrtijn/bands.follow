import hapi from '@hapi/hapi';
import UserController from './User.controller';
import * as UserValidations from './User.validations';
export default function(server: hapi.Server){
    const userController = new UserController();

    // bind this to all usercontroller methods
    server.bind(userController);

    server.route([
        {
            method: 'GET',
            path: '/user/all',
            handler:  userController.getAllUsers,
        },
        {
            method: 'GET',
            path: '/user/self',
            handler: userController.getSelf
        },
        {
            method: 'POST',
            path: '/user/login',
            handler: userController.loginUser,
            options: {
                auth: false,
                validate: {
                    payload: UserValidations.loginUserDto
                },
            }
        },
        {
            method: 'POST',
            path: '/user/register',
            handler: userController.createUser,
            options: {
                auth: false,
                validate: {
                    payload: UserValidations.createUserDto
                },
            }
        },
      ]);
}

