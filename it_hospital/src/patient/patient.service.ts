import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  patient: Patient[] = [
    { id: 1, name: '홍길동', injury: '골절', severity: '중상' },
    { id: 2, name: '김영희', injury: '화상', severity: '응급' },
    { id: 3, name: '이철수', injury: '두부외상', severity: '심정지' },
  ];

  create(createPatientDto: CreatePatientDto) {
    const { name, injury, severity } = createPatientDto;
    this.patient.push({ id: this.patient.length + 1, name, injury, severity });
    return `${name} 의 정보가 등록되었습니다.`;
  }

  findAll() {
    return this.patient;
  }

  findOne(id: number) {
    if (id < 1 || isNaN(id)) return '유효하지 않은 id입니다.';
    const target = this.patient.find((v) => v.id == id);
    if (!target) return '해당 id의 환자가 없습니다.';
    return target;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    if (id < 1 || isNaN(id)) return '유효하지 않은 id입니다.';
    const target = this.patient.find((v) => v.id == id);
    if (!target) return '해당 id의 환자가 없습니다.';
    const { name, injury, severity } = updatePatientDto;
    this.patient = this.patient.map((v) => {
      if (v.id == id) {
        return {
          id: v.id,
          name: name ?? v.name,
          injury: injury ?? v.injury,
          severity: severity ?? v.severity,
        };
      } else {
        return v;
      }
    });
    return `해당 환자의 정보가 수정되었습니다.`;
  }

  remove(id: number) {
    if (id < 1 || isNaN(id)) return '유효하지 않은 환자 id입니다.';
    const target = this.patient.find((v) => v.id == id);
    if (!target) return '해당 id의 환자가 없습니다.';
    this.patient = this.patient.filter((v) => v.id != id);
    return `해당 환자의 정보가 삭제되었습니다.`;
  }
}
