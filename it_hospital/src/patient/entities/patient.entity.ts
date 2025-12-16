export class Patient {
  id: number;
  name: string;
  injury: string;
  severity: '경상' | '중상' | '응급' | '심정지';
}
