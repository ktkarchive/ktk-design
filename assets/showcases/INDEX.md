# Design Philosophy Showcases — 샘플 에셋 인덱스

> 8개 시나리오 × 3가지 스타일 = 24개 프리빌트 디자인 샘플
> Phase 3 추천 디자인 방향 제시 시, "이 스타일로 만들면 이렇게 보인다"고 직접 보여주기 위한 용도

## 스타일 설명

| 코드명 | 학파 | 스타일명 | 비주얼 특성 |
|--------|------|---------|------------|
| **Pentagram** | 정보 건축파 | Pentagram / Michael Bierut | 흑백 절제, 스위스 그리드(Swiss Grid), 강한 타이포그래피 계층, #E63946 레드 포인트 |
| **Build** | 미니멀리즘파 | Build Studio | 럭셔리급 여백(70%+), 미세한 폰트 웨이트(200-600), #D4A574 웜 골드, 섬세함 |
| **Takram** | 동양 철학파 | Takram | 부드러운 테크 감성, 자연색(베이지/그레이/그린), 둥근 모서리, 차트가 예술처럼 |

## 시나리오 빠른 참조표

### 콘텐츠 디자인 시나리오

| # | 시나리오 | 사이즈 | Pentagram | Build | Takram |
|---|---------|--------|-----------|-------|--------|
| 1 | 공식 계정 커버 | 1200×510 | `cover/cover-pentagram` | `cover/cover-build` | `cover/cover-takram` |
| 2 | PPT 데이터 페이지 | 1920×1080 | `ppt/ppt-pentagram` | `ppt/ppt-build` | `ppt/ppt-takram` |
| 3 | 세로형 인포그래픽 | 1080×1920 | `infographic/infographic-pentagram` | `infographic/infographic-build` | `infographic/infographic-takram` |

### 웹사이트 디자인 시나리오

| # | 시나리오 | 사이즈 | Pentagram | Build | Takram |
|---|---------|--------|-----------|-------|--------|
| 4 | 개인 홈페이지 | 1440×900 | `website-homepage/homepage-pentagram` | `website-homepage/homepage-build` | `website-homepage/homepage-takram` |
| 5 | AI 네비게이션 사이트 | 1440×900 | `website-ai-nav/ainav-pentagram` | `website-ai-nav/ainav-build` | `website-ai-nav/ainav-takram` |
| 6 | AI 라이팅 도구 | 1440×900 | `website-ai-writing/aiwriting-pentagram` | `website-ai-writing/aiwriting-build` | `website-ai-writing/aiwriting-takram` |
| 7 | SaaS 랜딩 페이지 | 1440×900 | `website-saas/saas-pentagram` | `website-saas/saas-build` | `website-saas/saas-takram` |
| 8 | 개발자 문서 | 1440×900 | `website-devdocs/devdocs-pentagram` | `website-devdocs/devdocs-build` | `website-devdocs/devdocs-takram` |

> 각 항목은 `.html`(소스코드)와 `.png`(스크린샷) 두 파일로 구성되어 있습니다

## 사용 방법

### Phase 3 추천 시 인용
디자인 방향을 추천한 후, 해당 시나리오의 프리빌트 스크린샷을 보여줄 수 있습니다:
```
"Pentagram 스타일로 공식 계정 커버를 만든 결과입니다 → [cover/cover-pentagram.png 보여주기]"
"Takram 스타일로 PPT 데이터 페이지를 만든 느낌입니다 → [ppt/ppt-takram.png 보여주기]"
```

### 시나리오 매칭 우선순위
1. 당신의 요구사항 시나리오가 정확히 일치함 → 해당 시나리오를 바로 보여주기
2. 정확히 일치하지 않지만 유사한 유형 → 가장 비슷한 시나리오 보여주기 (예: "제품 공식 홈페이지" → SaaS 랜딩 페이지 보여주기)
3. 전혀 맞지 않음 → 프리빌트 샘플은 걸너뛰고 바로 Phase 3.5 실시간 생성으로 진행

### 횡단 비교 보여주기
같은 시나리오의 3가지 스타일을 나란히 보여주면 직관적으로 비교할 수 있습니다:
- "같은 공식 계정 커버를 3가지 스타일로 구현한 결과입니다"
- 보여주기 순서: Pentagram(이성적 절제) → Build(럭셔리 미니멀) → Takram(부드러운 온기)

## 콘텐츠 상세

### 공식 계정 커버 (cover/)
- 콘텐츠: Claude Code Agent 워크플로우 — 8개 병렬 Agent 아키텍처
- Pentagram: 거대한 레드 "8" + 스위스 그리드 라인 + 데이터 바
- Build: 초박자 웨이트(ultra-light weight)의 "Agent"가 70% 여백 위에 떠 있음 + 웜 골드 가는 선
- Takram: 8개 노드 방사형 플로우차트를 예술처럼 + 베이지 배경

### PPT 데이터 페이지 (ppt/)
- 콘텐츠: GLM-4.7 오픈소스 모델 Coding 능력 돌파 (AIME 95.7 / SWE-bench 73.8% / τ²-Bench 87.4)
- Pentagram: 260px "95.7" 앵커 + 레드/그레이/라이트그레이 대비 바 차트
- Build: 3개 그룹 120px 초박자 웨이트 숫자가 떠 있음 + 웜 골드 그라데이션 대비 바
- Takram: SVG 레이더 차트 + 3색 오버레이 + 둥근 모서리 데이터 카드

### 세로형 인포그래픽 (infographic/)
- 콘텐츠: AI 메모리 시스템 CLAUDE.md를 93KB에서 22KB로 최적화
- Pentagram: 거대한 "93→22" 숫자 + 넘버링 블록 + CSS 데이터 바
- Build: 극도의 여백 + 소프트 섀도우 카드 + 웜 골드 커넥팅 라인
- Takram: SVG 도넛 차트 + 유기적 곡선 플로우차트 + 글래스모피즘(Glassmorphism) 카드

### 개인 홈페이지 (website-homepage/)
- 콘텐츠: 인디 개발자 Alex Chen의 포트폴리오 홈페이지
- Pentagram: 112px 대형 이름 + 스위스 그리드 멀티컬럼 + 에디터리얼 넘버
- Build: 글래스모피즘 네비게이션 + 플로팅 통계 카드 + 초박자 웨이트
- Takram: 종이 질감 + 작은 원형 아바타 + 헤어라인 구분선 + 비대칭 레이아웃

### AI 네비게이션 사이트 (website-ai-nav/)
- 콘텐츠: AI Compass — 500+ AI 툴 디렉토리
- Pentagram: 직각 검색창 + 넘버링 툴 리스트 + 대문자 분류 태그
- Build: 둥근 모서리 검색창 + 섬세한 화이트 툴 카드 + 필 태그(Pill Tag)
- Takram: 유기적 오프셋 카드 레이아웃 + 부드러운 분류 태그 + 차트식 커넥팅

### AI 라이팅 도구 (website-ai-writing/)
- 콘텐츠: Inkwell — AI 라이팅 어시스턴트
- Pentagram: 86px 대형 타이틀 + 와이어프레임 에디터 모형 + 그리드 피처 컬럼
- Build: 플로팅 에디터 카드 + 웜 골드 CTA(Call-to-Action) + 럭셔리 라이팅 경험
- Takram: 시적 세리프(serif) 타이틀 + 유기적 에디터 + 플로우차트

### SaaS 랜딩 페이지 (website-saas/)
- 콘텐츠: Meridian — 비즈니스 인텔리전스(BI) 분석 플랫폼
- Pentagram: 흑백 멀티컬럼 + 스트럭처드 대시보드 + 140px "3x" 앵커
- Build: 플로팅 대시보드 카드 + SVG 에어리어 차트 + 웜 골드 그라데이션
- Takram: 둥근 모서리 바 차트 + 플로우 노드 + 부드러운 어스 톤

### 개발자 문서 (website-devdocs/)
- 콘텐츠: Nexus API — 통합 AI 모델 게이트웨이
- Pentagram: 좌측 사이드바 네비게이션 + 직각 코드 블록 + 레드 문자열 하이라이트
- Build: 센터 플로팅 코드 카드 + 소프트 섀도우 + 웜 골드 아이콘
- Takram: 베이지 코드 블록 + 플로우차트 커넥팅 + 대시 라인 피처 카드

## 파일 통계

- HTML 소스 파일: 24개
- PNG 스크린샷: 24개
- 총 에셋: 48개 파일

---

**버전**: v1.0
**생성일**: 2026-02-13
**적용 대상**: design-philosophy skill Phase 3 추천 링크
