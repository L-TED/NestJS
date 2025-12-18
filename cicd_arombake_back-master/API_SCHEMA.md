# AromBake API 스키마 문서

## 기본 정보

- **Base URL**: `http://localhost:3000`
- **Swagger UI**: `http://localhost:3000/api`
- **API 버전**: 1.0

## 공통 응답 형식

모든 API는 다음 형식의 응답을 반환합니다:

```json
{
  "success": true,
  "data": {},
  "message": "성공 메시지"
}
```

에러 발생 시:

```json
{
  "success": false,
  "data": null,
  "message": "에러 메시지"
}
```

---

## 1. Staffs (직원) API

### 1.1 직원 생성

**POST** `/staffs`

**요청 본문 (Request Body):**

```json
{
  "name": "홍길동",
  "age": 25,
  "year": "2024-01-01"
}
```

**요청 스키마:**

| 필드 | 타입 | 필수 | 설명 | 제약조건 |
|------|------|------|------|----------|
| name | string | ✅ | 직원 이름 | 최소 2자 이상 |
| age | number | ✅ | 직원 나이 | 양수 (1 이상) |
| year | string | ✅ | 입사년도 | 날짜 형식 (YYYY-MM-DD) |

**응답:**

- **201 Created**: 직원이 성공적으로 생성되었습니다.
- **400 Bad Request**: 유효성 검사 실패

**응답 예시:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "홍길동",
    "age": 25,
    "year": "2024-01-01"
  },
  "message": "직원이 성공적으로 생성되었습니다."
}
```

---

### 1.2 모든 직원 조회

**GET** `/staffs`

**응답:**

- **200 OK**: 직원 목록을 반환합니다.

**응답 예시:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "홍길동",
      "age": 25,
      "year": "2024-01-01"
    },
    {
      "id": 2,
      "name": "김철수",
      "age": 30,
      "year": "2023-06-15"
    }
  ],
  "message": "직원 목록을 반환합니다."
}
```

---

### 1.3 직원 조회

**GET** `/staffs/:id`

**경로 파라미터:**

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| id | number | 직원 ID |

**응답:**

- **200 OK**: 직원 정보를 반환합니다.
- **404 Not Found**: 직원을 찾을 수 없습니다.

**응답 예시:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "홍길동",
    "age": 25,
    "year": "2024-01-01"
  },
  "message": "직원 정보를 반환합니다."
}
```

---

### 1.4 직원 삭제

**DELETE** `/staffs/:id`

**경로 파라미터:**

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| id | number | 직원 ID |

**응답:**

- **200 OK**: 직원이 성공적으로 삭제되었습니다.
- **404 Not Found**: 직원을 찾을 수 없습니다.

**응답 예시:**

```json
{
  "success": true,
  "data": null,
  "message": "직원이 성공적으로 삭제되었습니다."
}
```

---

## 2. Guests (고객) API

### 2.1 고객 생성

**POST** `/guests`

**요청 본문 (Request Body):**

```json
{
  "name": "김철수",
  "expenditure": 50000,
  "tierId": 1
}
```

**요청 스키마:**

| 필드 | 타입 | 필수 | 설명 | 제약조건 |
|------|------|------|------|----------|
| name | string | ✅ | 고객 이름 | - |
| expenditure | number | ✅ | 지출 금액 | 양수 (1 이상) |
| tierId | number | ✅ | 등급 ID | 양수 (1 이상) |

**응답:**

- **201 Created**: 고객이 성공적으로 생성되었습니다.
- **400 Bad Request**: 유효성 검사 실패

**응답 예시:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "김철수",
    "expenditure": 50000,
    "tierId": 1
  },
  "message": "고객이 성공적으로 생성되었습니다."
}
```

---

### 2.2 모든 고객 조회

**GET** `/guests`

**응답:**

- **200 OK**: 고객 목록을 반환합니다.

**응답 예시:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "김철수",
      "expenditure": 50000,
      "tierId": 1
    },
    {
      "id": 2,
      "name": "이영희",
      "expenditure": 100000,
      "tierId": 2
    }
  ],
  "message": "고객 목록을 반환합니다."
}
```

---

### 2.3 고객 조회

**GET** `/guests/:id`

**경로 파라미터:**

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| id | number | 고객 ID |

**응답:**

- **200 OK**: 고객 정보를 반환합니다.
- **404 Not Found**: 고객을 찾을 수 없습니다.

**응답 예시:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "김철수",
    "expenditure": 50000,
    "tierId": 1
  },
  "message": "고객 정보를 반환합니다."
}
```

---

### 2.4 고객 삭제

**DELETE** `/guests/:id`

**경로 파라미터:**

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| id | number | 고객 ID |

**응답:**

- **200 OK**: 고객이 성공적으로 삭제되었습니다.
- **404 Not Found**: 고객을 찾을 수 없습니다.

**응답 예시:**

```json
{
  "success": true,
  "data": null,
  "message": "고객이 성공적으로 삭제되었습니다."
}
```

---

## 3. Tiers (등급) API

### 3.1 등급 생성

**POST** `/tiers`

**요청 본문 (Request Body):**

```json
{}
```

**참고:** 현재 CreateTierDto는 비어있습니다. 추후 필드가 추가될 수 있습니다.

**응답:**

- **201 Created**: 등급이 성공적으로 생성되었습니다.

**응답 예시:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "브론즈"
  },
  "message": "등급이 성공적으로 생성되었습니다."
}
```

---

### 3.2 모든 등급 조회

**GET** `/tiers`

**응답:**

- **200 OK**: 등급 목록을 반환합니다.

**응답 예시:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "브론즈"
    },
    {
      "id": 2,
      "name": "실버"
    },
    {
      "id": 3,
      "name": "골드"
    }
  ],
  "message": "등급 목록을 반환합니다."
}
```

---

### 3.3 등급 조회

**GET** `/tiers/:id`

**경로 파라미터:**

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| id | number | 등급 ID |

**응답:**

- **200 OK**: 등급 정보를 반환합니다.
- **404 Not Found**: 등급을 찾을 수 없습니다.

**응답 예시:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "브론즈"
  },
  "message": "등급 정보를 반환합니다."
}
```

---

### 3.4 등급 수정

**PATCH** `/tiers/:id`

**경로 파라미터:**

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| id | number | 등급 ID |

**요청 본문 (Request Body):**

```json
{}
```

**참고:** UpdateTierDto는 CreateTierDto의 모든 필드를 선택적으로 받을 수 있습니다.

**응답:**

- **200 OK**: 등급이 성공적으로 수정되었습니다.
- **404 Not Found**: 등급을 찾을 수 없습니다.

**응답 예시:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "수정된 등급명"
  },
  "message": "등급이 성공적으로 수정되었습니다."
}
```

---

### 3.5 등급 삭제

**DELETE** `/tiers/:id`

**경로 파라미터:**

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| id | number | 등급 ID |

**응답:**

- **200 OK**: 등급이 성공적으로 삭제되었습니다.
- **404 Not Found**: 등급을 찾을 수 없습니다.

**응답 예시:**

```json
{
  "success": true,
  "data": null,
  "message": "등급이 성공적으로 삭제되었습니다."
}
```

---

## 4. 엔티티 스키마

### 4.1 Staffs (직원) 엔티티

```typescript
{
  id: number;        // 자동 생성 ID
  name: string;      // 직원 이름 (최대 255자)
  age: number;       // 직원 나이
  year: string;      // 입사년도 (날짜 형식)
}
```

---

### 4.2 Guests (고객) 엔티티

```typescript
{
  id: number;           // 자동 생성 ID
  name: string;         // 고객 이름 (최대 255자)
  expenditure: number;  // 지출 금액 (기본값: 0)
  tierId: number | null; // 등급 ID (nullable)
  tier?: Tiers;         // 등급 관계 (조회 시 포함될 수 있음)
}
```

---

### 4.3 Tiers (등급) 엔티티

```typescript
{
  id: number;        // 자동 생성 ID
  name: string;      // 등급 이름 (최대 255자)
  guests?: Guests[]; // 고객 목록 (조회 시 포함될 수 있음)
}
```

---

## 5. 에러 코드

| 상태 코드 | 설명 |
|-----------|------|
| 200 | 성공 |
| 201 | 생성 성공 |
| 400 | 잘못된 요청 (유효성 검사 실패) |
| 404 | 리소스를 찾을 수 없음 |
| 500 | 서버 내부 오류 |

---

## 6. 유효성 검사 규칙

### Staffs (직원)

- `name`: 필수, 문자열, 최소 2자 이상
- `age`: 필수, 숫자, 양수 (1 이상)
- `year`: 필수, 날짜 문자열 형식 (YYYY-MM-DD)

### Guests (고객)

- `name`: 필수, 문자열
- `expenditure`: 필수, 숫자, 양수 (1 이상)
- `tierId`: 필수, 숫자, 양수 (1 이상)

---

## 7. 참고사항

1. 모든 날짜는 ISO 8601 형식 (YYYY-MM-DD)을 사용합니다.
2. 모든 숫자 ID는 양의 정수입니다.
3. API 응답은 공통 응답 형식을 따릅니다.
4. Swagger UI (`http://localhost:3000/api`)에서 실제 API를 테스트할 수 있습니다.
5. 유효성 검사는 `class-validator`를 사용하며, 실패 시 400 에러를 반환합니다.

---

**문서 버전**: 1.0  
**최종 업데이트**: 2024

