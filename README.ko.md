<sub>🌐 <a href="README.en.md">English</a> · <a href="README.md">中文</a> · <b>한국어</b></sub>

<div align="center">

# KTK Design

> *「타자를 치고 엔터를 누른다. 배달 가능한 디자인이 손에 들어온다.」*
> *"Type. Hit enter. A finished design lands in your lap."*

[![License](https://img.shields.io/badge/License-Personal%20Use%20Only-orange.svg)](LICENSE)
[![Agent-Agnostic](https://img.shields.io/badge/Agent-Agnostic-blueviolet)](https://skills.sh)
[![Skills](https://img.shields.io/badge/skills.sh-Compatible-green)](https://skills.sh)

<br>

**에이전트에게 한 마디만 던지면, 배달 가능한 디자인을 돌려받는다.**

<br>

3분에서 30분이면, **제품 런칭 애니메이션**을 만들고, 클릭할 수 있는 App 프로토타입을 만들고, 편집 가능한 PPT를 만들고, 인쇄급 인포그래픽을 만들 수 있다.

「AI가 그럭저럭 잘 만들었네」 수준이 아니라—대기업 디자인 팀이 만든 것처럼 보이는 수준이다. 스킬에 브랜드 자산(로고, 색상 팔레트, UI 스크린샷)을 주면, 브랜드의 기질을 읽어낸다. 아무것도 주지 않아도, 내장된 20가지 디자인 어휘가 AI slop 없이 받쳐준다.

**이 README에 보이는 모든 애니메이션은 KTK Design 스스로 만든 것이다.** 피그마도, 애프터이펙트도 아니다. 단 한 문장의 프롬프트 + 스킬로 완성했다. 다음 제품 런칭에 홍보 영상이 필요하다고? 이제 당신도 할 수 있다.

```
npx skills add ktkarchive/ktk-design
```

에이전트 상호 호환—Claude Code, Cursor, Codex, OpenClaw, Hermes 모두 설치 가능.

[효과 보기](#데모-갤러리) · [설치](#설치) · [할-수-있는-것](#할-수-있는-것) · [핵심-메커니즘](#핵심-메커니즘) · [Claude-Design과의-관계](#claude-design과의-관계)

</div>

---

<p align="center">
  <img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/hero-animation-v10-en.gif" alt="KTK Design Hero · 타자 → 방향 선택 → 갤러리 펼침 → 포커스 → 브랜드 드러남" width="100%">
</p>

<p align="center"><sub>
  ▲ 25초 · Terminal → 4 방향 → Gallery ripple → 4회 Focus → Brand reveal<br>
  👉 <a href="https://www.huasheng.ai/huashu-design-hero/">소리가 포함된 HTML 인터랙티브 버전 방문</a> ·
  <a href="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/hero-animation-v10-en.mp4">MP4 다운로드 (BGM+SFX 포함 · 10MB)</a>
</sub></p>

---

## 설치

```bash
npx skills add ktkarchive/ktk-design
```

그리고 Claude Code에서 바로 말필요:

```
「AI 심리학 프레젠테이션 PPT를 만들어줘, 3가지 스타일 방향을 추천해줘」
「AI 포모도로 타이머 iOS 프로토타입을 만들어줘, 4개 핵심 화면이 실제로 클릭되어야 해」
「이 로직을 60초 애니메이션으로 만들어줘, MP4와 GIF로 낼 수 있어?」
「이 디자인에 대해 5차원 평가를 해줘」
```

버튼도, 패널도, 피그마 플러그인도 없다.

---

## Star 추이

<p align="center">
  <a href="https://star-history.com/#ktkarchive/ktk-design&Date">
    <img src="https://api.star-history.com/svg?repos=ktkarchive/ktk-design&type=Date" alt="KTK Design Star History" width="80%">
  </a>
</p>

---

## 할 수 있는 것

| 능력 | 산출물 | 일반 소요 시간 |
|------|--------|---------------|
| 상호작용 프로토타입 (App / Web) | 단일 파일 HTML · 진짜 iPhone 베젤 · 클릭 가능 · Playwright 검증 | 10–15분 |
| 프레젠테이션 슬라이드 | HTML 덱 (브라우저 프레젠테이션) + 편집 가능한 PPTX (텍스트 상자 보존) | 15–25분 |
| 타임라인 애니메이션 | MP4 (25fps / 60fps 보간) + GIF (팔레트 최적화) + BGM | 8–12분 |
| 디자인 변형 | 3개+ 나란히 비교 · Tweaks 실시간 조정 · 다차원 탐색 | 10분 |
| 인포그래픽 / 시각화 | 인쇄급 타이포그래피 · PDF/PNG/SVG 낼 수 있음 | 10분 |
| 디자인 방향 고문 | 5 학파 × 20가지 디자인 철학 · 3 방향 추천 · 병렬로 Demo 생성 | 5분 |
| 5차원 전문가 평가 | 레이더 차트 + Keep/Fix/Quick Wins · 조치 가능한 수정 목록 | 3분 |

---

## 데모 갤러리

### 디자인 방향 고문

모호한 요구사항 시 fallback: 5 학파 × 20가지 디자인 철학에서 3개의 차별화된 방향을 골라, 병렬로 3개의 Demo를 생성하여 선택하게 한다.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/w3-fallback-advisor.gif" width="100%"></p>

### iOS App 프로토타입

iPhone 15 Pro 정확한 외관 (다이내믹 아일랜드 / 상태 표시줄 / 홈 인디케이터) · 상태 기반 다중 화면 전환 · 진짜 이미지는 Wikimedia/Met/Unsplash에서 가져옴 · Playwright 자동 클릭 테스트.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c1-ios-prototype.gif" width="100%"></p>

### 모션 디자인 엔진

Stage + Sprite 타임라인 세그먼트 모델 · `useTime` / `useSprite` / `interpolate` / `Easing` 4개 API로 모든 애니메이션 요구사항 커버 · 한 줄 명령으로 MP4 / GIF / 60fps 보간 / BGM이 포함된 완성물 내보내기.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c3-motion-design.gif" width="100%"></p>

### HTML Slides → 편집 가능한 PPTX

HTML 덱 브라우저 프레젠테이션 · `html2pptx.js`가 DOM의 computedStyle을 읽고 요소별로 PowerPoint 객체로 번역 · 내보내는 것은 **진짜 텍스트 상자**이지, 이미지를 깔아놓은 것이 아니다.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c2-slides-pptx.gif" width="100%"></p>

### Tweaks · 실시간 변형 전환

색상 / 서체 / 정보밀도 등 파라미터화 · 사이드 패널 전환 · 순수 프론트엔드 + `localStorage` 영속화 · 새로고침해도 안 날라감.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c4-tweaks.gif" width="100%"></p>

### 인포그래픽 / 데이터 시각화

잡지급 타이포그래피 · CSS Grid 정밀 분할 · `text-wrap: pretty` 조판 디테일 · 진짜 데이터 기반 · PDF 벡터 / PNG 300dpi / SVG 낼 수 있음.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c5-infographic.gif" width="100%"></p>

### 5차원 전문가 평가

철학적 일관성 · 시각적 계층 · 디테일 실행 · 기능성 · 혁신성 각 0–10점 · 레이더 차트 시각화 · Keep / Fix / Quick Wins 목록 출력.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c6-expert-review.gif" width="100%"></p>

### Junior Designer 워크플로우

혼자서 큰 그림을 그리지 않는다: 먼저 assumptions + placeholders + reasoning을 쓰고, 가능한 한 일찍 사용자에게 보여준 후, 반복한다. 이해가 틀렸을 때 일찍 고치는 게 늦게 고치는 것보다 100배 싸다.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/w2-junior-designer.gif" width="100%"></p>

### 브랜드 자산 프로토콜 5단계 강제 프로세스

구체적인 브랜드 관련 시 강제 실행: 묻기 → 검색 → 다운로드 (3단계 대비) → grep 색상 추출 → `brand-spec.md` 작성.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/w1-brand-protocol.gif" width="100%"></p>

---

## 핵심 메커니즘

### 브랜드 자산 프로토콜

스킬에서 가장 엄격한 규칙. 구체적인 브랜드 (Stripe, Linear, Anthropic, 자사 등) 관련 시 5단계 강제 실행:

| 단계 | 동작 | 목적 |
|------|------|------|
| 1 · 묻기 | 브랜드 가이드라인이 있으신가요? | 기존 자산 존중 |
| 2 · 공식 브랜드 페이지 검색 | `<brand>.com/brand` · `brand.<brand>.com` · `<brand>.com/press` | 권위 색상 확보 |
| 3 · 자산 다운로드 | SVG 파일 → 공식 홈페이지 HTML 전문 → 제품 스크린샷 색상 추출 | 3단계 대비, 앞 단계가 실패하면 바로 다음 단계로 |
| 4 · grep 색상 추출 | 자산에서 모든 `#xxxxxx`를 잡아, 빈도순으로 정렬, 흑백 회색 필터 | **절대 기억으로 브랜드 색상을 추측하지 않음** |
| 5 · spec 고정 | `brand-spec.md` 작성 + CSS 변수, 모든 HTML은 `var(--brand-*)`를 참조 | 고정하지 않으면 잊어버림 |

A/B 테스트 (v1 vs v2, 각 6개 에이전트 실행): **v2의 안정성 분산이 v1보다 5배 낮다**. 안정성의 안정성, 이것이 스킬의 진정한 해자다.

### 디자인 방향 고문 (Fallback)

사용자 요구사항이 모호해서 손을 댈 수 없을 때 트리거:

- 범용 직관으로 억지로 만들지 않고, Fallback 모드 진입
- 5 학파 × 20가지 디자인 철학에서 **반드시 다른 학파에서 나온** 3개의 차별화된 방향을 추천
- 각 방향에 대표작, 기질 키워드, 대표 디자이너를 배치
- 병렬로 3개의 시각적 Demo를 생성하여 사용자가 선택하게 함
- 선택 후 주 Junior Designer 프로세스로 진입

### Junior Designer 워크플로우

모든 작업에贯穿하는 기본 작업 모드:

- 작업 시작 전에 질문 목록을 한 번에 보여주고, 사용자가 일괄 답변할 때까지 기다림
- HTML에 먼저 assumptions + placeholders + reasoning comments를 작성
- 가능한 한 일찍 사용자에게 보여줌 (회색 사각형이라도)
- 실제 내용 채우기 → variations → Tweaks 이 3단계를 각각 다시 한 번 보여줌
- 전달 전에 Playwright로 브라우저를 눈으로 한 번 훑어봄

### 반 AI slop 규칙

한눈에 AI가 만든 것처럼 보이는 시각적 최대공약수 (보라 그라데이션 / 이모지 아이콘 / 둥근 모서리+왼쪽 테두리 강조 / SVG로 얼굴 그리기 / Inter를 display용으로 쓰기)를 피한다. `text-wrap: pretty` + CSS Grid + 정성껏 선택한 serif display와 oklch 색상을 사용한다.

---

## Claude Design과의 관계

솔직히 인정한다: 브랜드 자산 프로토콜의 철학은 Claude Design에서 유출된 프롬프트에서 배운 것이다. 그 프롬프트는 반복해서 강조했다—**좋은 고품질 디자인은 백지에서 시작하는 것이 아니라, 이미 존재하는 디자인 맥락에서 자라나는 것이다**. 이 원칙이 65점 작품과 90점 작품의 분수령이다.

포지셔닝 차이:

| | Claude Design | KTK Design |
|---|---|---|
| 형태 | 웹 제품 (브라우저에서 사용) | 스킬 (Claude Code에서 사용) |
| 할당량 | 구독 quota | API 소비 · 병렬로 에이전트 실행 시 quota 제한 없음 |
| 산출물 | 캔버스 내 + Figma로 내보내기 가능 | HTML / MP4 / GIF / 편집 가능한 PPTX / PDF |
| 조작 방식 | GUI (클릭, 드래그, 수정) | 대화 (말하고, 에이전트가 끝날 때까지 기다림) |
| 복잡한 애니메이션 | 제한적 | Stage + Sprite 타임라인 · 60fps 내보내기 |
| 에이전트 간 호환 | Claude.ai 전용 | 임의의 스킬 호환 에이전트 |

Claude Design은 **더 나은 그래픽 도구**이고, KTK Design은 **그래픽 도구라는 레이어를 없애는 것**이다. 두 갈래 길, 다른 대상.

---

## Limitations

- **레이어 단위 편집 가능한 PPTX를 Figma로 내보내기는 지원하지 않는다**. 산출물은 HTML이며, 스크린샷, 녹화, 그래프 낼 수 있지만, Keynote로 끌어다가 텍스트 위치를 수정할 수는 없다.
- **Framer Motion 수준의 복잡한 애니메이션은 안 된다**. 3D, 물리 시뮬레이션, 입자 시스템은 스킬의 범위를 벗어난다.
- **완전히 빈 브랜드를 처음부터 디자인하면 품질이 60–65점으로 떨어진다**. 공중에 hi-fi를 그리는 것은 원래 최후의 수단이다.

이것은 80점짜리 스킬이지, 100점짜리 제품이 아니다. 그래픽 인터페이스를 열고 싶지 않은 사람에게, 80점짜리 스킬이 100점짜리 제품보다 낫다.

---

## 저장소 구조

```
ktk-design/
├── SKILL.md                 # 메인 문서 (에이전트가 읽음)
├── README.md                # 이 파일 (사용자가 읽음)
├── assets/                  # 스타터 컴포넌트
│   ├── animations.jsx       # Stage + Sprite + Easing + interpolate
│   ├── ios_frame.jsx        # iPhone 15 Pro 베젤
│   ├── android_frame.jsx
│   ├── macos_window.jsx
│   ├── browser_window.jsx
│   ├── deck_stage.js        # HTML 슬라이드 엔진
│   ├── deck_index.html      # 다중 파일 덱 조합기
│   ├── design_canvas.jsx    # 나란히 변형 보여주기
│   ├── showcases/           # 24개 프리셋 샘플 (8 장면 × 3 스타일)
│   └── bgm-*.mp3            # 6개 장면화 배경음악
├── references/              # 작업별 심화 읽기 서브 문서
│   ├── animation-pitfalls.md
│   ├── design-styles.md     # 20가지 디자인 철학 상세 라이브러리
│   ├── slide-decks.md
│   ├── editable-pptx.md
│   ├── critique-guide.md
│   ├── video-export.md
│   └── ...
├── scripts/                 # 내보내기 툴체인
│   ├── render-video.js      # HTML → MP4
│   ├── convert-formats.sh   # MP4 → 60fps + GIF
│   ├── add-music.sh         # MP4 + BGM
│   ├── export_deck_pdf.mjs
│   ├── export_deck_pptx.mjs
│   ├── html2pptx.js
│   └── verify.py
└── demos/                   # 9개 능력 데모 (c*/w*), 한중영 GIF/MP4/HTML + hero v10
```

---

## 기원

Anthropic이 Claude Design을 발표한 날, 나는 새벽 4시까지 놀았다. 며칠 후, 나는 그것을 다시 열지 않았다—그것이 나쁘다는 게 아니다—이 트랙에서 가장 성숙한 제품이다—나는 에이전트가 터미널에서 일을 도와주는 걸 원했지, 어떤 그래픽 인터페이스도 열고 싶지 않았다.

그래서 에이전트에게 Claude Design 자체를 분해하도록 했다 (커뮤니티에서 유출된 시스템 프롬프트, 브랜드 자산 프로토콜, 컴포넌트 메커니즘 포함), 구조화된 spec으로 증류하고, 다시 스킬로 써서 내 Claude Code에 집어넣었다.

Anthropic이 Claude Design의 프롬프트를 명확하게 써줘서 감사하다. 다른 제품의 영감을 바탕으로 한 이런 2차 창작은, AI 시대의 오픈소스 문화의 새로운 형태이다.

---

## License · 사용 허가

**개인 사용 무료, 자유**—학습, 연구, 창작, 자신을 위한 작업, 글 쓰기, 부업, 블로그/공식 계정 발표, 마음대로 쓰되 인사할 필요 없다.

**기업 상업 사용 금지**—임의의 회사, 팀, 또는 영리 목적의 조직이 이 스킬을 제품에 통합하거나, 대외 서비스에 사용하거나, 고객에게 전달하는 작업에 사용하고자 한다면, **반드시 원작자와 연락하여 허가를 받아야 한다**. 포함되되 이에 국한되지 않음:
- 스킬을 사내 툴체인의 일부로 사용
- 스킬 산출물을 대외 전달물의 주요 창작 수단으로 사용
- 스킬을 기반으로 2차 개발하여 상업 제품화
- 고객 상업 프로젝트에서 사용

**상업 허가 연락처**는 아래 소셜 플랫폼을 참조.

---

## Connect · 花生（花叔）— 원작자

花生은 AI Native Coder, 독립 개발자, AI 미디어 크리에이터이다. 대표작: 고양이 보조등 (AppStore 유료 순위 Top 1), 《一本书玩转 DeepSeek》, 누와 .skill (GitHub 12000+ star). 미디어 전 플랫폼 30만+ 팔로워.

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
