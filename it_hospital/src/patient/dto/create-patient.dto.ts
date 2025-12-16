export class CreatePatientDto {
  name: string;
  injury: string;
  severity: '경상' | '중상' | '응급' | '심정지';
}
