# 👗 FITLOOP - 순환형 패션 커뮤니티 플랫폼

<br />

<p align="center">
  <img src="https://github.com/user-attachments/assets/f3189ecb-934e-4aa0-bdac-cdb00acacc49" width="900" alt="FITLOOP Banner"/>
</p>

<br />

**FITLOOP**은 패션 아이템을 사고팔고, 룩북과 챌린지를 통해 스타일을 공유하는  
**순환형 패션 커뮤니티 플랫폼**입니다.

지속 가능한 패션을 위해 **REUSE · ECO · COMMUNITY · STYLE** 가치를 기반으로 설계했습니다.

---

## 주요 기능 (사용자 흐름 기준)


### 1) 메인 홈 (탐색 시작)

<img src="https://github.com/user-attachments/assets/4a75a072-6719-4211-a12b-c43d02a88075" width="260" alt="메인"/>

- 시즌 배너/이벤트 노출
- 최근 등록/인기/카테고리 탐색 진입점 제공
- 빠른 탐색 중심 UI 구성

---

### 2) 상품 탐색 (최근 등록 · 인기 · 카테고리)

| 최근 등록된 상품 | 인기 상품 | 카테고리별 |
|---|---|---|
| <img src="https://github.com/user-attachments/assets/7ad08c3b-34de-4a1c-b2a3-cd7b89388c4c" width="220" alt="최근 등록된 상품"/> | <img src="https://github.com/user-attachments/assets/deefbe8e-3177-484a-ab9b-6ebf578dd520" width="220" alt="인기 상품"/> | <img src="https://github.com/user-attachments/assets/6ef6912d-4a68-4962-bd92-a056bc7ae293" width="220" alt="카테고리별"/> |

- **최근 등록**: 최신 상품을 빠르게 확인할 수 있는 브라우징 흐름 제공  
- **인기 상품**: 좋아요/반응 기반 랭킹 노출로 트렌드 탐색 지원  
- **카테고리별**: 대분류/소분류 + 성별 탭 기반 탐색 UX 제공  

---

### 3) 상품 정보 (상품 상세 · 마이샵)

| 상품 상세 | 마이샵 |
|---|---|
| <img src="https://github.com/user-attachments/assets/dd066a3f-6954-46f4-a2e2-4eee85dba5c1" width="240" alt="상품 보기"/> | <img src="https://github.com/user-attachments/assets/c22e0efd-fa47-443f-a50a-9a1a85f5c241" width="240" alt="마이샵"/> |

- **상품 상세**: 이미지/태그/카테고리/설명 및 좋아요(찜) 제공  
- **마이샵**: 판매 중/판매 완료 관리, 프로필/평점/취향 태그 노출  

---

### 4) 장바구니 (구매 준비)

<img src="https://github.com/user-attachments/assets/9a051969-1392-44eb-9420-319d512a4893" width="260" alt="장바구니"/>

- 전체/개별 선택
- 판매자별 금액 분리 및 합산
- 결제 예상 금액 실시간 표시

---

### 5) 쿠폰 (혜택 적용)

| 쿠폰 등록 | 쿠폰 확인 |
|---|---|
| <img src="https://github.com/user-attachments/assets/61e33dca-c638-4ca1-bc0c-a9a431645d98" width="240" alt="쿠폰 등록"/> | <img src="https://github.com/user-attachments/assets/e94a1426-cca2-4c66-8ff1-286489e3354d" width="240" alt="쿠폰 확인"/> |

- 쿠폰 등록/조회 UI
- 사용 조건/적용 가능 여부 확인
- 결제 경험에서 혜택 요소 제공

---

### 6) FITPAY 충전 & 결제 (결제 플로우)

| FITPAY 구매화면 | QR 결제 |
|---|---|
| <img src="https://github.com/user-attachments/assets/027a746b-b0c0-4153-ae45-32e89eb57e38" width="240" alt="FITPAY 구매화면"/> | <img src="https://github.com/user-attachments/assets/65ed784b-02fd-4a41-a223-897c49312121" width="240" alt="QR결제"/> |

- FitPay 잔액 확인 및 충전 금액 선택
- 카카오페이 QR 결제 연동
- QR 스캔 → 결제 화면 이동

---

### 7) 관리자 페이지 (운영/관리)

<img src="https://github.com/user-attachments/assets/0a6c413e-5477-423c-964b-373fdfa43558" width="900" alt="관리자 페이지"/>

- 사용자 상태 관리 (ACTIVE / SUSPENDED)
- 누적 주문/결제 정보 확인
- CSV 내보내기
- ADMIN/MEMBER 권한 기반 접근 제어

---

## Tech Stack (어필 포인트)

### Frontend
- **Next.js 15** / **React 19** / **TypeScript**
- **Tailwind CSS** + **Ant Design** 기반 UI 구성
- **TanStack Query**로 서버 상태 관리 및 캐싱/리패칭 최적화
- **Axios** 기반 API 통신 레이어 분리
- **Zustand**로 전역 상태(예: 좋아요/유저 상태 등) 관리
- **Recharts**로 데이터 시각화 구성
- **react-cookie**로 쿠키 기반 인증 처리
- **lottie-react**로 인터랙션/모션 UX 강화

---

### Backend
- **Spring Boot** 기반 REST API
- **MySQL** + **JPA/Hibernate** 기반 데이터 모델링 및 영속성 관리
- **Spring Security + JWT** 인증/인가 구조
- **Google OAuth2 로그인** 연동
- **AWS S3** 이미지 업로드/조회 처리
- **Redis** 기반 캐싱/상태 데이터 처리 (예: 좋아요/실시간 카운트 확장)
- **Kafka** 기반 이벤트 처리 구조(Producer/Consumer, JsonSerializer/Deserializer)
- **Spring Batch**
  - **Redis에 누적된 좋아요 수(실시간 카운트)를 일정 주기로 DB에 일괄 반영**하기 위한 배치 처리로 활용
- **아임포트(Iamport) 결제 연동** 기반 외부 결제 API 연계

> ⚠️ 보안: API Key/Secret, DB 비밀번호, JWT Secret 등 민감정보는  
> `.env` 또는 `application-secret.yml`로 분리하고 Git에 포함하지 않습니다.

---


## 코드 컨벤션

### ESLint 설정 (Flat Config)

```js
rules: {
  indent: ["error", 2],                      // 들여쓰기 2칸
  semi: ["error", "always"],                 // 세미콜론 필수
  camelcase: ["error", { properties: "always" }], // 카멜케이스 사용
  "no-var": "error",                         // var 금지
  "prefer-arrow-callback": "error",         // 화살표 함수 권장
  "prefer-template": "error",               // 템플릿 리터럴 사용 권장
  "space-infix-ops": "error"                // 연산자 사이 공백 필수
}
```

---

## 📅 개발 히스토리

### 2024.04 ~ 06
- 서비스 구조 확정 및 도메인 분리(유저/상품/결제/운영)
- 인증/인가(JWT + Security) 설계
- 관리자 페이지 초기 구현
- UI 컴포넌트 시스템 정리

### 2024.07 ~ 09
- S3 이미지 업로드 연동
- 장바구니/좋아요/카테고리 기능 고도화
- FitPay 결제 UX 완성 및 외부 결제 연동 확장
- **Redis + Batch 기반 좋아요 수 DB 일괄 반영 구조 적용**
- Kafka 이벤트 처리 구조 적용
- UI/UX 리팩토링 및 안정화

---



## 🌱 마무리

FITLOOP은 단순 중고 거래를 넘어,  
**패션 콘텐츠와 커뮤니티를 연결하고 재사용을 촉진하는 순환형 플랫폼**을 목표로 개발했습니다.
