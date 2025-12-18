import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// Decorator 생성
export const TIME_RESTRICTION_KEY = 'timeRestriction';
export const TimeRestriction = (startHour: number, endHour: number) =>
  SetMetadata(TIME_RESTRICTION_KEY, { startHour, endHour });
// Guard 수정
@Injectable()
export class TimeRestrictionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const timeRestriction = this.reflector.get<{
      startHour: number;
      endHour: number;
    }>('timeRestriction', context.getHandler());

    if (!timeRestriction) {
      return true; // 설정이 없으면 통과
    }

    const now = new Date();
    const currentHour = now.getHours();
    const { startHour, endHour } = timeRestriction;

    if (currentHour < startHour || currentHour >= endHour) {
      throw new ForbiddenException(
        `접근 가능 시간: ${startHour}:00 - ${endHour}:00`,
      );
    }

    return true;
  }
}
