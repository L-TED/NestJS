import { Injectable } from '@nestjs/common';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { UpdateCafeDto } from './dto/update-cafe.dto';
import { CafeMenus } from './entities/cafemenus';
import { CafeStaffs } from './entities/cafestaffs';

@Injectable()
export class CafeService {
  // 메뉴
  cafeMenuInfo: CafeMenus[] = [
    { name: 'Espresso', price: 3, shots: 1 },
    { name: 'Latte', price: 4, shots: 2 },
    { name: 'Cappuccino', price: 4.5, shots: 2 },
  ];
  createMenu(createCafeDto: CreateCafeDto) {
    return 'This action adds a new cafe';
  }

  findAllMenu() {
    return this.cafeMenuInfo;
  }

  findOneMenu(id: number) {
    if (id < 0 || isNaN(id)) return '잘못된 ID입니다.';
    const target = this.cafeMenuInfo[id - 1];
    if (!target) return '해당 ID의 메뉴가 없습니다.';
    return this.cafeMenuInfo[id - 1];
  }

  updateMenu(id: number, updateCafeDto: UpdateCafeDto) {
    return `This action updates a #${id} cafe`;
  }

  removeMenu(id: number) {
    if (id < 0 || isNaN(id)) return '잘못된 ID입니다.';
    const target = this.cafeMenuInfo[id - 1];
    if (!target) return '해당 ID의 메뉴가 없습니다.';
    this.cafeMenuInfo = this.cafeMenuInfo.filter(
      (_, index) => index !== id - 1,
    );
    return `${target.name}을/를 메뉴에서 삭제했습니다.`;
  }

  // 스태프
  cafeStaffInfo: CafeStaffs[] = [
    { nickname: 'Alice', position: '바리스타', since: new Date('2020-01-15') },
    { nickname: 'Bob', position: '슈퍼바이저', since: new Date('2019-03-22') },
    { nickname: 'Charlie', position: '부점장', since: new Date('2021-06-10') },
  ];
  createStaff(createCafeDto: CreateCafeDto) {
    return 'This action adds a new cafe';
  }

  findAllStaff() {
    return this.cafeStaffInfo;
  }

  findOneStaff(id: number) {
    if (id < 0 || isNaN(id)) return '잘못된 ID입니다.';
    const target = this.cafeStaffInfo[id - 1];
    if (!target) return '해당 ID의 스태프가 없습니다.';
    return this.cafeStaffInfo[id - 1];
  }

  updateStaff(id: number, updateCafeDto: UpdateCafeDto) {
    return `This action updates a #${id} cafe`;
  }

  removeStaff(id: number) {
    if (id < 0 || isNaN(id)) return '잘못된 ID입니다.';
    const target = this.cafeStaffInfo[id - 1];
    if (!target) return '해당 ID의 스태프가 없습니다.';
    this.cafeStaffInfo = this.cafeStaffInfo.filter(
      (_, index) => index !== id - 1,
    );
    return `${target.nickname} 정보를 삭제했습니다.`;
  }
}
