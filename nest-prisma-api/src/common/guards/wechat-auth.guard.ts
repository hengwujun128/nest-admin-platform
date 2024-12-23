/*
 * @Author: 张泽全 hengwujun128@gmail.com
 * @Date: 2024-12-23 17:24:36
 * @LastEditors: 张泽全 hengwujun128@gmail.com
 * @LastEditTime: 2024-12-23 18:47:57
 * @Description:
 * @FilePath: /meimei-prisma-vue3/nest-prisma-api/src/common/guards/wechat-auth.guard.ts
 */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ApiException } from '../../common/exceptions/api.exception';

@Injectable()
export class WechatAuthGuard extends AuthGuard('wechat') {
  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.query.code) {
      throw new ApiException('缺少 code');
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new Error(info.message);
    }
    return user;
  }
}
