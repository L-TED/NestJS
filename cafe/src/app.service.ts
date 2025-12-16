import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome(): string {
    return 'Welcome to Cafe Management System';
  }
  getCafe(): string {
    return 'Get /menus, Get /staffs';
  }
}
