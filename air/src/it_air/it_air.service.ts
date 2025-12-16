import { Injectable } from '@nestjs/common';
import { CreateItAirDto } from './dto/create-it_air.dto';
import { UpdateItAirDto } from './dto/update-it_air.dto';
import { ItAir } from './entities/it_air.entity';

@Injectable()
export class ItAirService {
  itAir: ItAir[] = [
    {
      flightName: 'IT101',
      passengerCapacity: 180,
      flightSchedule: {
        origin: 'New York',
        destination: 'Los Angeles',
        departureDate: new Date('2024-07-01'),
        departureTime: '10:00',
      },
    },
    {
      flightName: 'IT202',
      passengerCapacity: 220,
      flightSchedule: {
        origin: 'Chicago',
        destination: 'Miami',
        departureDate: new Date('2024-07-02'),
        departureTime: '02:30',
      },
    },
    {
      flightName: 'IT303',
      passengerCapacity: 150,
      flightSchedule: {
        origin: 'San Francisco',
        destination: 'Seattle',
        departureDate: new Date('2024-07-03'),
        departureTime: '06:00',
      },
    },
  ];

  create(createItAirDto: CreateItAirDto) {
    const { flightName, passengerCapacity } = createItAirDto;
    this.itAir.push({
      flightName,
      passengerCapacity,
    });

    return `${flightName} 추가 완료함`;
  }

  findAll() {
    return this.itAir;
  }

  findOne(name: string) {
    const target = this.itAir.find((v) => v.flightName === name);
    return target ?? '존재하지 않는 비행기입니다.';
  }

  update(name: string, updateItAirDto: UpdateItAirDto) {
    const target = this.itAir.find((v) => v.flightName === name);
    if (!target) {
      return '존재하지 않는 비행기입니다.';
    }
    const { newFlightName, passengerCapacity, newFlightSchedule } =
      updateItAirDto;
    this.itAir = this.itAir.map((v) => {
      if (v.flightName == name) {
        return {
          flightName: newFlightName ?? name,
          passengerCapacity: passengerCapacity ?? v.passengerCapacity,
          flightSchedule: newFlightSchedule ?? v.flightSchedule,
        };
      } else {
        return v;
      }
    });
    return `${name} 정보 수정 완료됨`;
  }

  remove(name: string) {
    const target = this.itAir.find((v) => v.flightName === name);
    if (!target) {
      return '존재하지 않는 비행기입니다.';
    }
    this.itAir = this.itAir.filter((v) => v.flightName != name);
    return `해당 비행기의 정보가 삭제되었습니다.`;
  }
}
