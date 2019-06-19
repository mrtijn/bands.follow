
import Router from 'koa-joi-router';
import UserController from './User.controller';
import * as UserValidations from './User.validations';

const router = Router();

router.route([
    {
        method: 'GET',
        path: '/user/all',
        handler: (ctx) => UserController.getAllUsers(ctx),
    },
    {
        method: 'GET',
        path: '/user/self',
        handler:  (ctx) => UserController.getSelf(ctx)
    },
    {
        method: 'POST',
        path: '/user/login',
        handler:  (ctx) => UserController.loginUser(ctx),
        validate: {
            body: UserValidations.loginUserDto,
            type: 'json'
        }
    },
    {
        method: 'POST',
        path: '/user/register',
        handler: (ctx) => UserController.createUser(ctx),
        validate: {
            body: UserValidations.createUserDto,
            type: 'json'
        }
    },
  ]);

export default router;