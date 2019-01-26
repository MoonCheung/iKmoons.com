export default class UserController {
  // 用户登录
  async login(ctx, next){
    //获取请求提交数据
    let name = ctx.request.body.name || '';
    let pwd = ctx.request.body.pws || '';
    console.log(name, pwd);

    ctx.body = {
      status: true,
      token: '123'
    }
  }

  // 用户信息
  async userInfo(ctx, next){
    let data = {
      name: 'jk',
      age: 25
    }
    ctx.body = {
      status: true,
      data
    };
  }
}
