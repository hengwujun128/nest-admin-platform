/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-09 14:30:28
 * @LastEditTime: 2024-12-03 13:49:39
 * @LastEditors: 张泽全 hengwujun128@gmail.com
 * @Description: 登录守卫 ，可进行登录日志记录
 * @FilePath: /meimei-admin/src/common/guards/local-auth.guard.ts
 * You can you up，no can no bb！！
 */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ApiException } from '../exceptions/api.exception';
import { LoginInforService } from 'src/modules/monitor/login-infor/login-infor.service';

@Injectable()
//  @UseGuards() 装饰器中引用local名称，以便将它与 Passport-local 包提供的代码关联起来
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private readonly loginInforService: LoginInforService) {
    super();
  }
  context: ExecutionContext;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.context = context;
    return super.canActivate(context);
  }

  /* 主动处理错误 */
  handleRequest(err, user, info) {
    if (err || !user) {
      const request = this.context.switchToHttp().getRequest();
      this.loginInforService.addLoginInfor(request, err.response, '1');
      throw err || new ApiException('用户名或密码错误');
    }
    // 返回值会被挂载到request的user上
    return user;
  }
}
