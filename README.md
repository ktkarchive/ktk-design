<sub>🌐 <a href="README.en.md">English</a> · <a href="README.zh.md">中文</a> · <b>한국어</b></sub>

<div align="center">

# KTK Design

> HTML-Native Design Skill · 한국어 버전
> 원작: huashu-design by 花生（花叔）/ alchaincyf

[![License](https://img.shields.io/badge/License-Personal%20Use%20Only-orange.svg)](LICENSE)
[![Agent-Agnostic](https://img.shields.io/badge/Agent-Agnostic-blueviolet)](https://skills.sh)
[![Skills](https://img.shields.io/badge/skills.sh-Compatible-green)](https://skills.sh)

<br>

**에이전트에게 한 마디 던지면, 바로 쓸 수 있는 디자인을 얻는다.**

<br>

3분에서 30분이면 **제품 런칭 애니메이션**, 클릭 가능한 App 프로토타입, 편집 가능한 PPT, 인쇄급 인포그래픽을 만들 수 있다.

「AI가 그럭저럭 만들었네」 수준이 아니라 — 대기업 디자인 팀이 만든 것처럼 보이는 수준이다. 브랜드 자산(로고, 색상 팔레트, UI 스크린샷)을 주면 브랜드의 아이덴티티를 읽어낸다. 아무것도 주지 않아도 내장된 20가지 디자인 어휘가 AI slop 없이 커버한다.

**이 README에 보이는 모든 애니메이션은 KTK Design 스스로 만든 것이다.** 피그마도, 애프터이펙트도 아니다. 단 한 문장의 프롬프트와 스킬로 완성했다. 다음 제품 런칭에 홍보 영상이 필요하다고? 이제 당신도 할 수 있다.

</div>

---

## 🎯 빠른 시작 (3가지 방법)

### 방법 A: 스킬로 사용 (권장)

```bash
npx skills add ktkarchive/ktk-design
```

Claude Code, Cursor, Codex 등에서 바로 말하면 됩니다:

```
「AI 심리학 프레젠테이션 PPT를 만들어줘, 3가지 스타일 방향을 추천해줘」
「AI 포모도로 타이머 iOS 프로토타입을 만들어줘, 4개 핵심 화면이 실제로 클릭할 수 있어야 해」
「이 로직을 60초 애니메이션으로 만들어줘, MP4와 GIF로 낼 수 있어?」
「이 디자인에 대해 5차원 평가를 해줘」
```

버튼도, 패널도, 피그마 플러그인도 없습니다.

### 방법 B: 웹 UI로 사용

```bash
git clone https://github.com/ktkarchive/ktk-design.git
cd ktk-design/web
npm install && npm run dev
# 브라우저가 자동으로 열립니다
```

Kimi CLI와 함께 사용하는 로컬 워크벤치입니다. 스킬의 디자인 엔진을 브라우저에서 직접 체험할 수 있습니다.

### 방법 C: 오케스트레이션에 통합

`orchestrator/SKILL.md`에 Design Task Routing 규칙을 추가하세요.

자세한 내용은 [orchestrator/design_integration.md](orchestrator/design_integration.md)를 참조하세요.

---

## 📦 프로젝트 구조

```
ktk-design/
├── SKILL.md              ← 에이전트용 스킬 정의 (메인 문서)
├── README.md             ← 이 파일 (사용자가 읽음)
├── references/           ← 19개 심화 문서
│   ├── animation-pitfalls.md
│   ├── design-styles.md  ← 20가지 디자인 철학 상세 라이브러리
│   ├── slide-decks.md
│   ├── editable-pptx.md
│   ├── critique-guide.md
│   ├── video-export.md
│   └── ...
├── assets/               ← React 컴포넌트, 효과음, 스타터 키트
│   ├── animations.jsx    ← Stage + Sprite + Easing + interpolate
│   ├── ios_frame.jsx     ← iPhone 15 Pro 베젤
│   ├── deck_stage.js     ← HTML 슬라이드 엔진
│   ├── design_canvas.jsx ← 나란히 변형 보여주기
│   ├── showcases/        ← 프리셋 샘플
│   └── bgm-*.mp3         ← 장면화 배경음악
├── web/                  ← 웹 UI (Vite + React + Tailwind)
│   ├── src/
│   ├── communication/    ← Kimi CLI ↔ 웹 브리지
│   └── package.json
├── orchestrator/         ← 오케스트레이션 통합 가이드
│   └── design_integration.md
├── scripts/              ← 나이브 내기 툴체인
│   ├── render-video.js   ← HTML → MP4
│   ├── convert-formats.sh
│   ├── export_deck_pptx.mjs
│   ├── html2pptx.js
│   └── verify.py
└── demos/                ← 19개 데모 HTML (c*/w*), 한중영
```

---

## ✨ 7가지 핵심 기능

| 능력 | 결과물 | 일반 소요 시간 |
|------|--------|---------------|
| 상호작용 프로토타입 (App / Web) | 단일 파일 HTML · 실제 iPhone 베젤 · 클릭 가능 · Playwright 검증 | 10–15분 |
| 프레젠테이션 슬라이드 | HTML 덱 (브라우저 프레젠테이션) + 편집 가능한 PPTX (텍스트 상자 보존) | 15–25분 |
| 타임라인 애니메이션 | MP4 (25fps / 60fps 보간) + GIF (팔레트 최적화) + BGM | 8–12분 |
| 디자인 변형 | 3개 이상 나란히 비교 · Tweaks 실시간 조정 · 다차원 탐색 | 10분 |
| 인포그래픽 / 시각화 | 인쇄급 타이포그래피 · PDF/PNG/SVG 나이브 내기 | 10분 |
| 디자인 방향 고문 | 5 학파 × 20가지 디자인 철학 · 3 방향 추천 · 병렬로 Demo 생성 | 5분 |
| 5차원 전문가 평가 | 레이더 차트 + Keep/Fix/Quick Wins · 바로 실행할 수 있는 수정 목록 | 3분 |

---

## 🏛️ 5학파 20가지 디자인 철학

KTK Design은 브랜드 자산이 없을 때도 내장된 20가지 디자인 어휘로 AI slop 없이 작동합니다. 5개 학파에서 각각 4가지 철학을 제공합니다:

- **디지털 미니멀리즘** — Swiss International, Brutalism, Neumorphism, Glassmorphism
- **기업 B2B** — Corporate SaaS, Dashboard/Dataviz, Editorial Minimal, Trust/Security
- **소비자 모바일** — Social/Messaging, E-commerce, Health/Wellness, Education
- **크리에이티브/브랜드** — DTC/ lifestyle, Luxury, Entertainment, Cultural/Institution
- **테크/스타트업** — Developer Tools, AI/ML, Fintech, Sustainability

각 철학은 대표작, 기질 키워드, 대표 디자이너, 시각적 특징을 포함합니다. 자세한 내용은 [`references/design-styles.md`](references/design-styles.md)를 참조하세요.

---

## 🔧 설치 및 사용

### 스킬 설치

```bash
npx skills add ktkarchive/ktk-design
```

Claude Code, Cursor, Codex, OpenClaw, Hermes — 모든 에이전트에서 설치 가능합니다.

### 웹 UI 설치

```bash
cd web
npm install && npm run dev
```

자세한 내용은 [web/README.md](web/README.md)를 참조하세요.

### 오케스트레이션 통합

멀티 에이전트 워크플로우에서 디자인 태스크를 KTK Design 스킬로 라우팅하려면:

```bash
# orchestrator/design_integration.md의 라우팅 규칙을 참조하세요
cat orchestrator/design_integration.md
```

---

## 🎨 3가지 사용 시나리오

### 시나리오 1: 개인 사용자 (스킬)

터미널에서 에이전트와 대화하며 디자인을 만듭니다. Claude Code나 Cursor에서 "AI 심리학 PPT 만들어줘"라고 한 마디면 됩니다. 피그마를 열 필요도, UI를 학습할 필요도 없습니다.

**적합한 분:** 개발자, 작가, 독립 창작자, 터미널 중심 워크플로우 사용자

### 시나리오 2: 팀 워크플로우 (오케스트레이션)

여러 에이전트가 협업하는 환경에서 디자인 태스크를 KTK Design으로 자동 라우팅합니다. 기획 에이전트 → 디자인 에이전트(KTK Design) → 검증 에이전트 파이프라인을 구축할 수 있습니다.

**적합한 분:** AI 오케스트레이션을 사용하는 팀, 자동화 워크플로우 구축자

### 시나리오 3: GUI 선호 사용자 (웹 UI)

브라우저에서 KTK Design의 디자인 엔진을 직접 체험합니다. 스킬의 모든 기능을 시각적 인터페이스로 탐색하고, Kimi CLI와 함께 로컬에서 작업합니다.

**적합한 분:** GUI를 선호하는 디자이너, 비주얼 피드백이 필요한 사용자

---

## 데모 갤러리

### 디자인 방향 고문

요구사항이 모호할 때의 fallback: 5 학파 × 20가지 디자인 철학에서 3개의 차별화된 방향을 골라, 병렬로 3개의 Demo를 만들어 선택하게 합니다.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/w3-fallback-advisor.gif" width="100%"></p>

### iOS App 프로토타입

iPhone 15 Pro 정확한 외관 (다이내믹 아일랜드 / 상태 표시줄 / 홈 인디케이터) · 상태 기반 다중 화면 전환 · 진짜 이미지는 Wikimedia/Met/Unsplash에서 가져옴 · Playwright 자동 클릭 테스트.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c1-ios-prototype.gif" width="100%"></p>

### 모션 디자인 엔진

Stage + Sprite 타임라인 세그먼트 모델 · `useTime` / `useSprite` / `interpolate` / `Easing` 4개 API로 모든 애니메이션 요구사항 커버 · 한 줄 명령으로 MP4 / GIF / 60fps 보간 / BGM이 포함된 완성물 나이브 내기.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c3-motion-design.gif" width="100%"></p>

### HTML Slides → 편집 가능한 PPTX

HTML 덱 브라우저 프레젠테이션 · `html2pptx.js`가 DOM의 computedStyle을 읽고 요소별로 PowerPoint 객체로 번역 · 나이브 내는 것은 **진짜 텍스트 상자**이지, 이미지를 깔아놓은 것이 아닙니다.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c2-slides-pptx.gif" width="100%"></p>

### Tweaks · 실시간 변형 전환

색상 / 서체 / 정보밀도 등 파라미터화 · 사이드 패널 전환 · 순수 프론트엔드 + `localStorage` 영속화 · 새로고침해도 날아가지 않습니다.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c4-tweaks.gif" width="100%"></p>

### 인포그래픽 / 데이터 시각화

잡지급 타이포그래피 · CSS Grid 정밀 분할 · `text-wrap: pretty` 조판 디테일 · 실제 데이터 기반 · PDF 벡터 / PNG 300dpi / SVG 나이브 내기.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c5-infographic.gif" width="100%"></p>

### 5차원 전문가 평가

철학적 일관성 · 시각적 계층 · 디테일 실행 · 기능성 · 혁신성 각 0–10점 · 레이더 차트 시각화 · Keep / Fix / Quick Wins 목록 출력.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c6-expert-review.gif" width="100%"></p>

### Junior Designer 워크플로우

혼자서 큰 그림을 그리지 않습니다: 먼저 assumptions + placeholders + reasoning을 쓰고, 가능한 한 일찍 사용자에게 보여준 뒤 반복합니다. 이해가 틀렸을 때 일찍 고치는 게 늦게 고치는 것보다 100배 쌉니다.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/w2-junior-designer.gif" width="100%"></p>

### 브랜드 자산 프로토콜 5단계 강제 프로세스

구체적인 브랜드 관련 시 강제 실행: 묻기 → 검색 → 다운로드 (3단계 대비) → grep 색상 추출 → `brand-spec.md` 작성.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/w1-brand-protocol.gif" width="100%"></p>

---

## 핵심 메커니즘

### 브랜드 자산 프로토콜

스킬에서 가장 엄격한 규칙입니다. 구체적인 브랜드 (Stripe, Linear, Anthropic, 자사 등) 관련 시 5단계 강제 실행:

| 단계 | 동작 | 목적 |
|------|------|------|
| 1 · 묻기 | 브랜드 가이드라인이 있으신가요? | 기존 자산 존중 |
| 2 · 공식 브랜드 페이지 검색 | `<brand>.com/brand` · `brand.<brand>.com` · `<brand>.com/press` | 권위 있는 색상 확보 |
| 3 · 자산 다운로드 | SVG 파일 → 공식 홈페이지 HTML 전문 → 제품 스크린샷 색상 추출 | 3단계 대비, 앞 단계가 실패하면 바로 다음 단계로 |
| 4 · grep 색상 추출 | 자산에서 모든 `#xxxxxx`를 잡아 빈도순으로 정렬, 흑백 회색 필터 | **절대 기억으로 브랜드 색상을 추측하지 않음** |
| 5 · spec 고정 | `brand-spec.md` 작성 + CSS 변수, 모든 HTML은 `var(--brand-*)`를 참조 | 고정하지 않으면 잊어버림 |

A/B 테스트 (v1 vs v2, 각 6개 에이전트 실행): **v2의 안정성 분산이 v1보다 5배 낮습니다**. 안정성의 안정성, 이것이 스킬의 진정한 해자입니다.

### 디자인 방향 고문 (Fallback)

사용자 요구사항이 모호해서 손을 댈 수 없을 때 트리거됩니다:

- 범용 직관으로 억지로 만들지 않고, Fallback 모드 진입
- 5 학파 × 20가지 디자인 철학에서 **반드시 다른 학파에서 나온** 3개의 차별화된 방향을 추천
- 각 방향에 대표작, 기질 키워드, 대표 디자이너를 배치
- 병렬로 3개의 시각적 Demo를 생성하여 사용자가 선택하게 함
- 선택 후 주 Junior Designer 프로세스로 진입

### Junior Designer 워크플로우

모든 작업에 적용되는 기본 작업 모드입니다:

- 작업 시작 전에 질문 목록을 한 번에 보여주고, 사용자가 일괄 답변할 때까지 기다림
- HTML에 먼저 assumptions + placeholders + reasoning comments를 작성
- 가능한 한 일찍 사용자에게 보여줌 (회색 사각형이라도)
- 실제 내용 채우기 → variations → Tweaks 이 3단계를 각각 다시 한 번 보여줌
- 전달 전에 Playwright로 브라우저를 눈으로 한 번 훑어봄

### 반 AI slop 규칙

한눈에 AI가 만든 것처럼 보이는 시각적 최대공약수 (보라 그라데이션 / 이모지 아이콘 / 둥근 모서리+왼쪽 테두리 강조 / SVG로 얼굴 그리기 / Inter를 display용으로 쓰기)를 피합니다. `text-wrap: pretty` + CSS Grid + 정성껏 선택한 serif display와 oklch 색상을 사용합니다.

---

## Claude Design과의 관계

솔직히 인정합니다: 브랜드 자산 프로토콜의 철학은 Claude Design에서 유출된 프롬프트에서 배운 것입니다. 그 프롬프트는 반복해서 강조했습니다 — **좋은 고품질 디자인은 백지에서 시작하는 것이 아니라, 이미 존재하는 디자인 맥락에서 자라나는 것이다**. 이 원칙이 65점 작품과 90점 작품의 분수령입니다.

포지셔닝 차이:

| | Claude Design | KTK Design |
|---|---|---|
| 형태 | 웹 제품 (브라우저에서 사용) | 스킬 (Claude Code에서 사용) + 웹 UI + 오케스트레이션 |
| 할당량 | 구독 quota | API 소비 · 병렬로 에이전트 실행 시 quota 제한 없음 |
| 결과물 | 캔버스 내 + Figma로 나이브 내기 가능 | HTML / MP4 / GIF / 편집 가능한 PPTX / PDF |
| 조작 방식 | GUI (클릭, 드래그, 수정) | 대화 (말하고, 에이전트가 끝날 때까지 기다림) + 웹 UI |
| 복잡한 애니메이션 | 제한적 | Stage + Sprite 타임라인 · 60fps 나이브 내기 |
| 에이전트 간 호환 | Claude.ai 전용 | 모든 스킬 호환 에이전트 |

Claude Design은 **더 나은 그래픽 도구**이고, KTK Design은 **그래픽 도구라는 레이어를 없애는 것**입니다. 두 갈래 길, 다른 대상입니다.

---

## Limitations

- **레이어 단위 편집 가능한 PPTX를 Figma로 나이브 내기는 지원하지 않습니다**. 결과물은 HTML이며, 스크린샷, 녹화, 그래프 낼 수 있지만, Keynote로 끌어다가 텍스트 위치를 수정할 수는 없습니다.
- **Framer Motion 수준의 복잡한 애니메이션은 안 됩니다**. 3D, 물리 시뮬레이션, 입자 시스템은 스킬의 범위를 벗어납니다.
- **완전히 빈 브랜드를 처음부터 디자인하면 품질이 60–65점으로 떨어집니다**. 공중에 hi-fi를 그리는 것은 원래 최후의 수단입니다.

이것은 80점짜리 스킬이지, 100점짜리 제품이 아닙니다. 그래픽 인터페이스를 열고 싶지 않은 사람에게, 80점짜리 스킬이 100점짜리 제품보다 낫습니다.

---

## 기원

Anthropic이 Claude Design을 발표한 날, 나는 새벽 4시까지 놀았다. 며칠 후, 나는 그것을 다시 열지 않았다 — 그것이 나쁘다는 게 아니다 — 이 분야에서 가장 성숙한 제품이다 — 나는 에이전트가 터미널에서 일을 도와주는 걸 원했지, 어떤 그래픽 인터페이스도 열고 싶지 않았다.

그래서 에이전트에게 Claude Design 자체를 분해하도록 했다 (커뮤니티에서 유출된 시스템 프롬프트, 브랜드 자산 프로토콜, 컴포넌트 메커니즘 포함), 구조화된 spec으로 증류하고, 다시 스킬로 써서 내 Claude Code에 집어넣었다.

Anthropic이 Claude Design의 프롬프트를 명확하게 써줘서 감사하다. 다른 제품의 영감을 바탕으로 한 이런 2차 창작은, AI 시대의 오픈소스 문화의 새로운 형태이다.

---

## 🤝 기여

기여 가이드는 [CONTRIBUTING.md](CONTRIBUTING.md)를 참조하세요.

버그 신고, 기능 제안, 번역 오류 제보, 한국어 버전 관련 문의 → 이 저장소의 Issues를 이용해 주세요.

---

## 📄 라이선스

원작 huashu-design과 동일합니다:

**개인 사용 무료** — 학습, 연구, 창작, 자신을 위한 작업, 글 쓰기, 부업, 블로그/공식 계정 발표, 마음대로 쓰되 인사할 필요 없습니다.

**기업 상업 사용 금지** — 임의의 회사, 팀, 또는 영리 목적의 조직이 이 스킬을 제품에 통합하거나, 대외 서비스에 사용하거나, 고객에게 전달하는 작업에 사용하고자 한다면, **반드시 원작자와 연락하여 허가를 받아야 합니다**. 포함되되 이에 국한되지 않음:
- 스킬을 사내 툴체인의 일부로 사용
- 스킬 결과물을 대외 전달물의 주요 창작 수단으로 사용
- 스킬을 기반으로 2차 개발하여 상업 제품화
- 고객 상업 프로젝트에서 사용

**상업 허가 연락처**는 아래 소셜 플랫폼을 참조하세요.

---

## 🙏 원작자

- **花生（花叔）** / alchaincyf
- 원본 저장소: https://github.com/alchaincyf/huashu-design
- 한국어 버전: [ktkarchive/ktk-design](https://github.com/ktkarchive/ktk-design)

花生은 AI Native Coder, 독립 개발자, AI 미디어 크리에이터입니다. 대표작: 고양이 보조등 (AppStore 유료 순위 Top 1), 《一本书玩转 DeepSeek》, 누와 .skill (GitHub 12000+ star). 미디어 전 플랫폼 30만+ 팔로워.

| 플랫폼 | 계정 | 링크 |
|---|---|---|
| X / Twitter | @AlchainHust | https://x.com/AlchainHust |
| 유튜브 | 花叔 | https://www.youtube.com/@Alchain |
| 공식 홈페이지 | huasheng.ai | https://www.huasheng.ai/ |
| 개발자 홈페이지 | bookai.top | https://bookai.top |

상업 허가, 협업 문의, 미디어 기고 → 위 임의 플랫폼에서 花生에게 DM.

---

## 한국어 버전 정보

| 항목 | 내용 |
|---|---|
| **포크 저장소** | [ktkarchive/ktk-design](https://github.com/ktkarchive/ktk-design) |
| **원작자** | 花生 (花叔) / alchaincyf |
| **한국어 버전 maintainer** | ktkarchive |
| **번역 범위** | README, SKILL.md, references (진행 중) |
| **라이선스** | 원본 LICENSE와 동일 (개인 사용 무료 / 기업 상업 사용 금지) |

한국어 버전 관련 문의, 번역 오류 제보, 기여 → 이 저장소의 Issues를 이용해 주세요.
