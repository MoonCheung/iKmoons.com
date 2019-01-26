import router from 'koa-router'
import UserController from '../controllers/UserController'

let UserCtrl = new UserController();

//用户模块
router.post('/api/user/login', UserCtrl.login)
      .get('/api/user/userinfo', UserCtrl.userInfo);
      // .put('xxx')
      // .delete('xxx')

export default router
