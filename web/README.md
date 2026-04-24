# KTK Design 워크벤치

> Kimi CLI와 함께 사용하는 로컬 디자인 워크벤치

## 개요

KTK Design 워크벤치는 브라우저에서 KTK Design의 디자인 엔진을 직접 체험할 수 있는 로컬 GUI입니다.

**특징:**
- 왼쪽: 채팅 패널 (Kimi CLI와 동일한 자연어 입력)
- 오른쪽: 실시간 HTML 미리보기 (iframe sandbox)
- 파일 기반 통신: Kimi CLI ↔ 웹 UI가 로컬 파일 시스템으로 연동
- 낮은 진입장벽: API 키나 서버 불필요

## 설치

```bash
cd ktk-design/web
npm install
```

## 실행

### 개발 모드

```bash
npm run dev
```

Vite dev 서버가 시작되고 브라우저가 자동으로 열립니다.

### 프로덕션 빌드

```bash
npm run build
```

`dist/` 폴터에 정적 파일이 생성됩니다.

### Python 정적 서버로 제공

```bash
npm run build
cd dist
python3 -m http.server 3456
```

브라우저에서 `http://localhost:3456`로 접속합니다.

## Kimi CLI와 연동

### 통신 아키텍처

```
ktk-design/communication/
├── input/          ← 웹 UI가 사용자 프롬프트를 .md 파일로 저장
├── output/         ← Kimi CLI가 생성한 HTML을 저장
└── status/         ← Kimi CLI가 처리 상태를 저장
```

### 워크플로우

1. **웹 UI**에서 프롬프트 입력 → `communication/input/prompt_001.md` 생성
2. **Kimi CLI**가 `communication/input/` 폴터 감시 → 새 파일 발견
3. **Kimi CLI**가 KTK Design 규칙으로 처리 → `communication/output/result_001.html` 생성
4. **웹 UI**가 `communication/output/` 폴터 감시 → 자동으로 미리보기 갱신

### Kimi CLI에서 워크벤치 시작

Kimi CLI에서 다음 명령을 실행하세요:

```bash
# 터미널 1: Kimi CLI (이미 실행 중)
# 터미널 2: 워크벤치 서버
cd ktk-design/web && npm run dev

# 또는 프로덕션 빌드 후 Python 서버
cd ktk-design/web && npm run build && python3 -m http.server 3456 --directory dist
```

## 기술 스택

| 구성요소 | 선택 | 이유 |
|---------|------|------|
| 번들러 | Vite | Next.js보다 가볍고 빠름 |
| 프레임워크 | React 18 | 익숙하고 생태계 풍부 |
| 언어 | TypeScript | 타입 안전성 |
| 스타일 | Tailwind CSS | 유틸리티 퍼스트, 빠른 개발 |
| 폰트 | Newsreader (Google Fonts) | KTK Design 철학: Serif display |
| 통신 | 파일 기반 폴터 감시 | Kimi CLI 수정 불필요, 로컬-only |

## 프로젝트 구조

```
web/
├── index.html              ← 진입점
├── package.json            ← 의존성
├── vite.config.ts          ← Vite 설정
├── tsconfig.json           ← TypeScript 설정
├── tailwind.config.js      ← Tailwind 설정
├── postcss.config.js       ← PostCSS 설정
├── src/
│   ├── main.tsx            ← React 진입점
│   ├── App.tsx             ← 메인 레이아웃
│   ├── index.css           ← 전역 스타일
│   ├── components/
│   │   ├── ChatPanel.tsx   ← 채팅 패널
│   │   ├── PreviewPanel.tsx ← 미리보기 + 파일 목록
│   │   └── FileList.tsx    ← 생성된 파일 목록
│   ├── hooks/
│   │   └── useFileWatcher.ts ← 파일 감시 훅
│   └── lib/
│       └── fileSystem.ts   ← 파일 시스템 유틸리티
```

## 디자인 철학

이 워크벤치 UI 자첏도 KTK Design의 철학을 따릅니다:

- **Serif display + system body**: Newsreader (헤더) + 시스템 산세리프 (본문)
- **oklch() 색상**: 남색 계열 메인, 따뜻한 갈색 악센트
- **NO 별라 그라데이션, NO 이모지**
- **CSS Grid / Flexbox**: 깔끔한 패널 분리
- **하나의 디테일 120%**: 헤더 타이포그래피와 브랜드 마크
