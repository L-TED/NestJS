import { Injectable } from '@nestjs/common';
import { CreateItAirPassengerDto } from './dto/create-it_air_passenger.dto';
import { UpdateItAirPassengerDto } from './dto/update-it_air_passenger.dto';
import { ItAirPassenger } from './entities/it_air_passenger.entity';

@Injectable()
export class ItAirPassengersService {
  itAirPassengers: ItAirPassenger[] = [
    {
      passengerName: 'John Doe',
      passportNumber: 'A12345678',
      membershipStatus: 'Gold',
    },
    {
      passengerName: 'Jane Smith',
      passportNumber: 'B98765432',
      membershipStatus: 'Silver',
    },
    {
      passengerName: 'Alice Johnson',
      passportNumber: 'C45678912',
      membershipStatus: 'Bronze',
    },
  ];
  create(createItAirPassengerDto: CreateItAirPassengerDto) {
    const { passengerName, passportNumber } = createItAirPassengerDto;
    this.itAirPassengers.push({
      passengerName,
      passportNumber,
      membershipStatus: 'None',
    });

    return `승객 정보 추가 완료: ${passengerName}`;
  }

  findAll() {
    return this.itAirPassengers;
  }

  findOne(passport: string) {
    const target = this.itAirPassengers.find(
      (v) => v.passportNumber === passport,
    );
    if (!target) {
      return '존재하지 않는 승객입니다.';
    }
    return this.itAirPassengers.find((v) => v.passportNumber === passport);
  }

  update(passport: string, updateItAirPassengerDto: UpdateItAirPassengerDto) {
    const target = this.itAirPassengers.find(
      (v) => v.passportNumber === passport,
    );
    if (!target) {
      return '존재하지 않는 승객입니다.';
    }
    const { newPassengerName, passportNumber, newMembershipStatus } =
      updateItAirPassengerDto;
    this.itAirPassengers = this.itAirPassengers.map((v) =>
      v.passportNumber === passport
        ? {
            passengerName: newPassengerName ?? v.passengerName,
            passportNumber: passportNumber ?? v.passportNumber,
            membershipStatus: newMembershipStatus ?? v.membershipStatus,
          }
        : v,
    );
    return `승객 정보 수정 완료 여권 아이디: ${passport}`;
  }

  remove(passport: string) {
    const target = this.itAirPassengers.find(
      (v) => v.passportNumber === passport,
    );
    if (!target) {
      return '존재하지 않는 승객입니다.';
    }
    this.itAirPassengers = this.itAirPassengers.filter(
      (v) => v.passportNumber != passport,
    );
    return `해당 승객의 정보가 삭제되었습니다.`;
  }
}
