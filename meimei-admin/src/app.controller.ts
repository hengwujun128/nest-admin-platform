/*
 * @Author: 张泽全 hengwujun128@gmail.com
 * @Date: 2024-09-30 16:55:30
 * @LastEditors: 张泽全 hengwujun128@gmail.com
 * @LastEditTime: 2024-12-17 17:19:17
 * @Description:
 * @FilePath: /meimei-admin/src/app.controller.ts
 */
import { Controller, Get } from '@nestjs/common';
import { ApiException } from './common/exceptions/api.exception';
import { PrismaService } from 'nestjs-prisma';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}
  @Get()
  async che() {
    return await this.prisma.sysUser.findMany({});
  }
}
