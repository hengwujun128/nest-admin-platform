/*
 * @Author: 张泽全 hengwujun128@gmail.com
 * @Date: 2024-12-23 16:31:44
 * @LastEditors: 张泽全 hengwujun128@gmail.com
 * @LastEditTime: 2024-12-23 18:59:23
 * @Description:
 * @FilePath: /meimei-prisma-vue3/nest-prisma-api/src/modules/auth/strategies/wechat.strategy.ts
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { AuthService } from '../auth.service';

@Injectable()
export class WechatStrategy extends PassportStrategy(Strategy, 'wechat') {
  constructor(private readonly authService: AuthService) {
    super({
      passReqToCallback: true, //设置回调函数第一个参数为 request
    });
  }

  async validate(req: any): Promise<any> {
    // Wechat login logic
    const code = req.query.code;
    const user = await this.authService.validateWechat(code);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
