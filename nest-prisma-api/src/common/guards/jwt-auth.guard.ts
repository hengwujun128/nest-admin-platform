/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-04-23 15:21:54
 * @LastEditors: 张泽全 hengwujun128@gmail.com
 * @LastEditTime: 2024-12-23 14:04:03
 * @FilePath: /meimei-prisma-vue3/nest-prisma-api/src/common/guards/jwt-auth.guard.ts
 * @Description: jwt 校验守卫
 *
 */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'node_modules/rxjs/dist/types';
import { PUBLIC_KEY } from '../contants/decorator.contant';
import { ApiException } from '../exceptions/api.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // getHandler 值将覆盖 getClass上面的值
    // 不拦截 PUBLIC_KEY 修饰的接口
    const noInterception = this.reflector.getAllAndOverride(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (noInterception) return true;
    return super.canActivate(context);
  }

  /* 主动处理错误 */
  handleRequest(err, user, info) {
    if (err || !user || !user.userName) {
      throw err || new ApiException('登录状态已过期', 401);
    }
    // 返回值会被挂载到request的user上
    return user;
  }
}
