# Slide Decks: HTML 슬라이드 제작 가이드

슬라이드 제작은 디자인 업무의 핵심 영역입니다. 이 문서는 HTML 슬라이드를 잘 만드는 방법을 설명합니다. 아키텍처 선정부터 단일 페이지 디자인, 그리고 PDF/PPTX로 난출하는 전체 과정을 다룹니다.

**이 skill의 기능 범위**:
- **HTML 데모 버전(기본 산출물, 항상 기본으로 필수 제작)** → 각 페이지별 독립 HTML + `assets/deck_index.html`로 통합, 브라우저에서 키보드로 페이지 전환 및 전체 화면 발표 가능
- HTML → PDF 난출 → `scripts/export_deck_pdf.mjs` / `scripts/export_deck_stage_pdf.mjs`
- HTML → 편집 가능한 PPTX 난출 → `references/editable-pptx.md` + `scripts/html2pptx.js` + `scripts/export_deck_pptx.mjs` (HTML을 4가지 하드 제약 조건에 따라 작성해야 함)

> **⚠️ HTML은 기본이며, PDF/PPTX는 파생물입니다.** 최종 난출 형식과 상관없이 **반드시** 먼저 HTML 통합 데모 버전(`index.html` + `slides/*.html`)을 제작해야 합니다. 이것이 슬라이드 작품의 '원천(source)'입니다. PDF/PPTX는 HTML에서 한 줄의 명령으로 난출하는 스냅숏입니다.
>
> **HTML 우선의 이유**:
> - 발표/프레젠테이션 현장에서 가장 유용합니다 (프로젝터 / 화면 공유 시 바로 전체 화면, 키보드로 페이지 전환, Keynote/PPT 소프트웨어에 의존하지 않음)
> - 개발 과정에서 각 페이지를 개별적으로 더블클릭하여 열어 검증할 수 있어, 매번 난출을 다시 실행할 필요가 없습니다
> - PDF/PPTX 난출의 유일한 상위 소스입니다 ("난출 후에 HTML을 수정해야 해서 다시 난출해야 한다"는 악순환을 피할 수 있음)
> - 난출물은 "HTML + PDF" 또는 "HTML + PPTX" 두 가지 형태로 제공할 수 있으며, 수신자는 원하는 형식을 선택할 수 있습니다
>
> 2026-04-22 moxt 브로셔 실측: 13페이지 HTML + index.html 통합 후, `export_deck_pdf.mjs` 한 줄로 PDF 난출, 수정 없이 완료. HTML 버전 자체가 브라우저에서 바로 발표 가능한 난출물입니다.

---

## 🛑 작업 시작 전 난출 형식 확인 (가장 중요한 checkpoint)

**이 결정은 '단일 파일 vs 다중 파일'보다 먼저 이루어져야 합니다.** 2026-04-20 옵션 사모회 프로젝트 실측: **작업 시작 전에 난출 형식을 확인하지 않으면 = 2-3시간의 재작업이 발생합니다.**

### 결정 트리 (HTML-first 아키텍처)

모든 난출물은 동일한 HTML 통합 페이지(`index.html` + `slides/*.html`)에서 시작합니다. 난출 형식은 **HTML 작성 제약 조건**과 **난출 명령**만 결정합니다:

```
【항상 기본 · 필수】 HTML 통합 데모 버전 (index.html + slides/*.html)
   │
   ├── 브라우저 발표만 필요 / 로컬 HTML 보관   → 여기까지 완료되면 끝, HTML 시각적 자유도가 최대
   │
   ├── PDF도 필요 (인쇄 / 그룹 공유 / 보관)     → export_deck_pdf.mjs 실행하면 한 번에 완료
   │                                          HTML 작성이 자유롭고, 시각적 제약 없음
   │
   └── 편집 가능한 PPTX도 필요 (동료가 텍스트를 수정해야 함)    → 첫 번째 HTML 줄부터 4가지 하드 제약 조건에 따라 작성
                                              export_deck_pptx.mjs 실행하면 한 번에 완료
                                              그라데이션 / web component / 복잡한 SVG를 희생
```

### 작업 시작 멘트 (바로 복사해서 사용)

> 최종 난출물이 HTML, PDF, 또는 PPTX 중 무엇이든, 먼저 브라우저에서 전환 및 발표할 수 있는 HTML 통합 버전(`index.html`에 키보드 페이지 전환 기능 추가)을 제작하겠습니다. 이것은 영원한 기본 산출물입니다. 이를 기반으로 추가로 PDF / PPTX 스냅숏이 필요한지 묻겠습니다.
>
> 어떤 난출 형식이 필요하신가요?
> - **HTML만 필요함** (발표/보관) → 시각적으로 완전히 자유롭습니다
> - **PDF도 필요함** → 동일하게, 난출 명령 한 줄 추가
> - **편집 가능한 PPTX도 필요함** (동료가 PPT에서 텍스트를 수정할 예정) → 첫 번째 HTML 줄부터 4가지 하드 제약 조건에 따라 작성해야 하며, 일부 시각적 기능(그라데이션 없음, web component 없음, 복잡한 SVG 없음)을 희생하게 됩니다.

### 왜 "PPTX가 필요하면 처음부터 4가지 하드 제약 조건을 따라야 하는가"

PPTX를 편집 가능하게 하려면 `html2pptx.js`가 DOM 요소를 PowerPoint 객체로 하나씩 변환할 수 있어야 합니다. 이를 위해 **4가지 하드 제약 조건**이 필요합니다:

1. body는 고정 960pt × 540pt (`LAYOUT_WIDE`와 일치, 13.333″ × 7.5″, 1920×1080px이 아님)
2. 모든 텍스트는 `<p>`/`<h1>`-`<h6>`로 감싸야 함 (div에 텍스트를 직접 넣는 것 금지, `<span>`으로 주요 텍스트를 담는 것 금지)
3. `<p>`/`<h*>` 자체에는 background/border/shadow를 사용할 수 없음 (외부 div에 배치)
4. `<div>`에는 `background-image`를 사용할 수 없음 (`<img>` 태그 사용)
5. CSS gradient, web component, 복잡한 SVG 장식을 사용하지 않음

**이 skill의 기본 HTML 시각적 자유도는 높습니다.** — 수많은 span, 중첩 flex, 복잡한 SVG, web component(예: `<deck-stage>`), CSS 그라데이션 등 — **거의 하나도 html2pptx의 제약 조건을 자연스럽게 통과할 수 없습니다.** (실측: 시각적으로 풍부한 HTML을 html2pptx에 직접 적용하면, 통과율 < 30%).

### 두 가지 실제 경로의 비용 비교 (2026-04-20 실제 경험)

| 경로 | 방법 | 결과 | 비용 |
|------|------|------|------|
| ❌ **먼저 자유롭게 HTML 작성, 나중에 PPTX 보완** | 단일 파일 deck-stage + 다량 SVG/span 장식 | 편집 가능한 PPTX를 원하면 두 가지 방법만 남음:<br>A. pptxgenjs를 수백 줄 하드코딩하여 좌표를 직접 작성<br>B. 17페이지 HTML을 Path A 형식으로 다시 작성 | 2-3시간 재작업,且 수동 작성 버전의 **유지보수 비용이 영구적** (HTML에서 한 글자만 수정해도 PPTX를 수동으로 다시 동기화해야 함) |
| ✅ **첫 단계부터 Path A 제약 조건에 따라 작성** | 각 페이지별 독립 HTML + 4가지 하드 제약 조건 + 960×540pt | 한 줄의 명령으로 100% 편집 가능한 PPTX 난출, 동시에 브라우저 전체 화면 발표도 가능 (Path A HTML 자체가 브라우저에서 재생 가능한 표준 HTML) | HTML 작성 시 "텍스트를 `<p>`에 어떻게 넣을지" 5분 추가 고민, 재작업 없음 |

### 혼합 난출은 어떻게 처리하나요

사용자가 "HTML 발표 **그리고** 편집 가능한 PPTX가 필요하다"고 하면 — **이것은 혼합이 아니라**, PPTX 요구사항이 HTML 요구사항을 덮어쓰는 것입니다. Path A로 작성된 HTML 자체가 브라우저 전체 화면 발표가 가능합니다 (`deck_index.html` 스티칭 도구만 추가하면 됨). **추가 비용이 없습니다.**

사용자가 "PPTX **그리고** 애니메이션 / web component가 필요하다"고 하면 — **이것이 진정한 모순입니다.** 사용자에게 알리세요: 편집 가능한 PPTX를 원하면 이러한 시각적 기능을 희생해야 합니다. 사용자가 선택하도록 하고, 몰래 수동 pptxgenjs 방식을 사용하지 마세요 (영구적인 유지보수 부채가 됩니다).

### 나중에야 PPTX가 필요한 경우를 알게 되면 어떻게 하나요 (긴급 보완)

극히 드문 경우: HTML이 이미 완성된 후에야 PPTX가 필요하다는 것을 알게 됩니다. **fallback 프로세스**를 권장합니다 (전체 설명은 `references/editable-pptx.md` 마지막 "Fallback: 이미 시각적 디자인이 있지만 사용자가 editable PPTX를 고집하는 경우" 참조):

1. **우선순위 1: PDF로 변경** (시각적 100% 보존, 크로스 플랫폼, 수신자가 보고 인쇄 가능) — 수신자의 실제 요구가 "발표/보관"이라면, PDF가 최적의 난출물입니다
2. **우선순위 2: AI가 시각적 디자인을 기반으로 editable HTML을 다시 작성** → editable PPTX 난출 — 색상/레이아웃/카피의 디자인 결정은 보존, 그라데이션, web component, 복잡한 SVG 등의 시각적 기능을 희생
3. **비권장: 수동 pptxgenjs 재구축** — 위치, 폰트, 정렬을 모두 수동으로 조정해야 하며, 유지보수 비용이 높고, 이후 HTML에서 한 글자만 수정해도 다시 수동으로 동기화해야 함

항상 선택지를 사용자에게 알리고, 사용자가 결정하도록 하세요. **절대 첫 반응으로 수동 pptxgenjs 작성을 시작하지 마세요** — 그것은 최후의 수단입니다.

---

## 🛑 대량 제작 전: 먼저 2페이지 showcase로 grammar 확정

**deck이 5페이지 이상이라면, 절대 1페이지부터 마지막 페이지까지 순서대로 작성하지 마세요.** 2026-04-22 moxt 브로셔 실전에서 검증된 올바른 순서:

1. **시각적으로 가장 다른 2가지 페이지 유형**을 먼저 showcase로 제작하세요 (예: "커버" + "감성/인용 페이지", 또는 "커버" + "제품 전시 페이지")
2. 스크린샷을 찍어 사용자에게 grammar(masthead / 폰트 / 색상 / 간격 / 구조 / 중영어 비율)를 확인받으세요
3. 방향이 통과되면 나머지 N-2페이지를 대량으로 진행하며, 각 페이지는 이미 확립된 grammar를 재사용하세요
4. 전체 완료 후 HTML 통합 + PDF / PPTX 파생물을 함께 합성하세요

**이유**: 13페이지를 끝까지 작성 → 사용자가 "방향이 맞지 않다"고 하면 = 13페이지 재작업. 먼저 2페이지 showcase 제작 → 방향이 틀리면 = 2페이지 재작업. 시각적 grammar가 일단 확립되면, 이후 N페이지의 의사결정 공간이 대폭 줄어들고, "내용을 어떻게 배치할지"만 남게 됩니다.

**showcase 페이지 선택 원칙**: 시각적 구조가 가장 다른 두 페이지를 선택하세요. 이 두 페이지가 통과되면 = 다른 중간 상태도 모두 통과할 수 있습니다.

| Deck 유형 | 권장 showcase 페이지 조합 |
|-----------|---------------------|
| B2B 브로셔 / 제품 홍보 | 커버 + 콘텐츠 페이지 (이념/감성 페이지) |
| 브랜드 론칭 | 커버 + 제품 특징 페이지 |
| 데이터 보고서 | 데이터 대형 이미지 페이지 + 분석 결론 페이지 |
| 튜토리얼 강의 자료 | 챕터 커버 페이지 + 구체적 지식점 페이지 |

---

## 📐 출판물 grammar 템플릿 (moxt 실측 재사용 가능)

B2B 브로셔 / 제품 홍보 / 긴 보고서류 deck에 적합합니다. 각 페이지가 이 구조를 재사용하면 = 13페이지 시각적으로 완전히 일치하고, 재작업 0.

### 각 페이지 뼈대

```
┌─ masthead (상단 strip + 가로선) ────────────┐
│  [logo 22-28px] · A Product Brochure                Issue · Date · URL │
├──────────────────────────────────────────┤
│                                          │
│  ── kicker (녹색 짧은 가로선 + uppercase 라벨)   │
│  CHAPTER XX · SECTION NAME                 │
│                                          │
│  H1 (중문 Noto Serif SC 900)             │
│  핵심 단어를 별도로 브랜드 주색상에 배치                      │
│                                          │
│  English subtitle (Lora italic, 부제목)   │
│  ─────────── 구분선 ──────────            │
│                                          │
│  [구체적 콘텐츠: 2열 60/40 / 2x2 grid / 목록] │
│                                          │
├──────────────────────────────────────────┤
│ section name                     XX / total │
└──────────────────────────────────────────┘
```

### 스타일 규칙 (바로 복사해서 사용)

- **H1**: 중문 Noto Serif SC 900, 정보량에 따라 80-140px, 핵심 단어를 별도로 브랜드 주색상에 배치 (전체에 색을 쌓지 마세요)
- **영문 부제**: Lora italic 26-46px, 브랜드 시그니처 단어(예: "AI team")는 볼드 + 주색상 이탤릭
- **본문**: Noto Serif SC 17-21px, line-height 1.75-1.85
- **accent 하이라이트**: 본문에서 주색상 볼드로 키워드를 표시, 페이지당 3곳 이하 (너무 많으면 앵커 역할을 잃음)
- **배경**: 따뜻한 베이지 #FAFAFA + 아주 희미한 radial-gradient 노이즈 (`rgba(33,33,33,0.015)`)로 종이 질감 추가

### 시각적 주인공은 반드시 차별화되어야 함

13페이지가 모두 "텍스트 + 스크린샷 한 장"이면 너무 단조롭습니다. **각 페이지의 시각적 주인공 유형을 교대**하세요:

| 시각적 유형 | 적합한 section |
|---------|---------------|
| 커버 타이포그래피 (대형 글자 + masthead + pillar) | 홈 / 챕터 커버 |
| 단일 캐릭터 portrait (초대형 momo 등) | 단일 개념/캐릭터 소개 |
| 다중 캐릭터 단체 사진 / 아바타 카드 나란히 | 팀 / 사용자 사례 |
| 타임라인 카드 점진적 전개 | "장기 관계" "진화" 전시 |
| 지식 그래프 / 연결 노드 다이어그램 | "협업" "흐름" 전시 |
| Before/After 비교 카드 + 중간 화살표 | "변화" "차이" 전시 |
| 제품 UI 스크린샷 + 외곽선 디바이스 프레임 | 구체적 기능 전시 |
| 대형 인용부호 big-quote (반페이지 대형 글자) | 감성 페이지 / 문제 페이지 / 인용 페이지 |
| 실제 사람 아바타 + 인용 카드 (2×2 또는 1×4) | 사용자 증언 / 사용 시나리오 |
| 대형 클로징 글자 + URL 타원 버튼 | CTA / 마무리 |

---

## ⚠️ 일반적인 함정 (moxt 실전 요약)

### 1. Emoji가 Chromium / Playwright 난출 시 렌더링되지 않음

Chromium은 기본적으로 컬러 emoji 폰트를 포함하지 않아, `page.pdf()` 또는 `page.screenshot()` 실행 시 emoji가 빈 사각형으로 표시됩니다.

**대책**: Unicode 문자 기호(`✦` `✓` `✕` `→` `·` `—`)로 대체하거나, 순수 텍스트로 변경하세요 ("Email · 23" 대신 "📧 23 emails" 사용 금지).

### 2. `export_deck_pdf.mjs`에서 `Cannot find package 'playwright'` 오류 발생

원인: ESM 모듈 해석은 스크립트 위치에서 위로 `node_modules`를 찾습니다. 스크립트는 `~/.claude/skills/huashu-design/scripts/`에 있으며, 해당 위치에는 의존성이 없습니다.

**대책**: 스크립트를 deck 프로젝트 디렉터리(예: `brochure/build-pdf.mjs`)로 복사하고, 프로젝트 루트에서 `npm install playwright pdf-lib`를 실행한 후, `node build-pdf.mjs --slides slides --out output/deck.pdf`를 실행하세요.

### 3. Google Fonts가 로딩되기 전에 스크린샷을 찍음 → 중문이 시스템 기본 흑체로 표시됨

Playwright 스크린샷/PDF 전에 최소 `wait-for-timeout=3500`을 기다려 webfont가 다운로드되고 paint되도록 하세요. 또는 폰트를 `shared/fonts/`에 self-host하여 네트워크 의존성을 줄이세요.

### 4. 정보 밀도 불균형: 콘텐츠 페이지에 너무 많은 내용을 집어넣음

moxt philosophy 페이지 초기 버전은 2×2 = 4단락 + 하단 3信조 = 7개 콘텐츠 블록을 사용하여, 압박감과 중복이 발생했습니다. 1×3 = 3단락으로 변경 후 즉시 여유로운 호흡감이 돌아왔습니다.

**대책**: 각 페이지를 "1개 핵심 정보 + 3-4개 보조 포인트 + 1개 시각적 주인공"으로 제어하고, 초과하면 새 페이지로 분할하세요. **적을수록 좋습니다** — 관객이 한 페이지를 10초 동안 보며, 1개 기억점을 주는 것이 4개 기억점을 주는 것보다 기억하기 쉽습니다.

---

## 🛑 먼저 아키텍처 확정: 단일 파일 vs 다중 파일?

**이 선택은 슬라이드 제작의 첫 단계이며, 틀리면 계속 함정에 빠집니다. 이 섹션을 먼저 읽고 작업을 시작하세요.**

### 두 가지 아키텍처 비교

| 차원 | 단일 파일 + `deck_stage.js` | **다중 파일 + `deck_index.html` 스티칭 도구** |
|------|--------------------------|--------------------------------------|
| 코드 구조 | 하나의 HTML, 모든 slide는 `<section>` | 각 페이지별 독립 HTML, `index.html`이 iframe으로 스티칭 |
| CSS 스코프 | ❌ 전역, 한 페이지의 스타일이 모든 페이지에 영향 가능 | ✅ 천연 격리, iframe 각자 독립 |
| 검증 세분성 | ❌ JS goTo로만 특정 페이지로 이동 가능 | ✅ 단일 페이지 파일을 더블클릭하면 브라우저에서 바로 볼 수 있음 |
| 병렬 개발 | ❌ 하나의 파일, 다중 agent 수정 시 충돌 | ✅ 다중 agent가 서로 다른 페이지를 병렬로 작업, 충돌 없는 merge |
| 디버깅 난이도 | ❌ 한 곳의 CSS 오류로 전체 deck이 망가짐 | ✅ 한 페이지 오류는 자신만 영향 |
| 내장 인터랙션 | ✅ 페이지 간 상태 공유가 매우 간단 | 🟡 iframe 간 postMessage 필요 |
| PDF 인쇄 | ✅ 내장 | ✅ 스티칭 도구 beforeprint로 iframe 순회 |
| 키보드 내비게이션 | ✅ 내장 | ✅ 스티칭 도구 내장 |

### 어떤 것을 선택할까요? (결정 트리)

```
│ 질문: deck은 예상 몇 페이지입니까?
├── ≤10페이지, in-deck 애니메이션 또는 페이지 간 인터랙션 필요, pitch deck → 단일 파일
└── ≥10페이지, 학술 강연, 강의 자료, 긴 deck, 다중 agent 병렬 → 다중 파일 (권장)
```

**기본적으로 다중 파일 경로를 따르세요**. 이것은 "대안"이 아니라 **긴 deck과 팀 협업의 주 경로**입니다. 이유: 단일 파일 아키텍처의 모든 장점(키보드 내비게이션, 인쇄, scale)은 다중 파일에도 있으며, 다중 파일의 스코프 격리와 검증 가능성은 단일 파일이 따라잡을 수 없는 부분입니다.

### 왜 이 규칙이 이렇게 엄격한가요? (실제 사고 기록)

단일 파일 아키텍처는 AI심리학 강연 deck 제작에서 연달아 네 가지 함정을 밟았습니다:

1. **CSS 특이성 덮어쓰기**: `.emotion-slide { display: grid }` (특이성 10)이 `deck-stage > section { display: none }` (특이성 2)을 이겨내, 모든 페이지가 동시에 렌더링되어 중첩됨.
2. **Shadow DOM slot 규칙이 외부 CSS에 의해 억제됨**: `::slotted(section) { display: none }`이 outer rule의 덮어쓰기를 막지 못해, sections가 숨기를 거부함.
3. **localStorage + hash 내비게이션 경쟁 상태**: 새로고침 후 hash 위치가 아닌 localStorage에 기록된 이전 위치에 멈춤.
4. **검증 비용이 높음**: 특정 페이지를 캡처하려면 `page.evaluate(d => d.goTo(n))`을 사용해야 하며, 직접 `goto(file://.../slides/05-X.html)`보다 두 배 느리고 오류가 자주 발생함.

모든 근본 원인은 **단일 전역 네임스페이스**입니다 — 다중 파일 아키텍처는 물리적 레벨에서 이러한 문제들을 제거합니다.

---

## 경로 A (기본): 다중 파일 아키텍처

### 디렉터리 구조

```
나의Deck/
├── index.html              # assets/deck_index.html에서 복사, MANIFEST 수정
├── shared/
│   ├── tokens.css          # 공유 디자인 토큰 (색상 팔레트/글자 크기/공용 chrome)
│   └── fonts.html          # <link>로 Google Fonts 불러오기 (각 페이지 include)
└── slides/
    ├── 01-cover.html       # 각 파일은 완전한 1920×1080 HTML
    ├── 02-agenda.html
    ├── 03-problem.html
    └── ...
```

### 각 slide의 템플릿 뼈대

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>P05 · Chapter Title</title>
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
<link rel="stylesheet" href="../shared/tokens.css">
<style>
  /* 이 페이지만의 고유 스타일. 어떤 class 이름을 사용해도 다른 페이지를 오염시키지 않습니다.*/
  body { padding: 120px; }
  .my-thing { ... }
</style>
</head>
<body>
  <!-- 1920×1080 콘텐츠 (body의 width/height는 tokens.css에서 잠금) -->
  <div class="page-header">...</div>
  <div>...</div>
  <div class="page-footer">...</div>
</body>
</html>
```

**핵심 제약 조건**:
- `<body>`가 캔버스이며, 바로 위에 레이아웃을 잡으세요. `<section>` 또는 기타 wrapper로 감싸지 마세요.
- `width: 1920px; height: 1080px`는 `shared/tokens.css`의 `body` 규칙에 의해 잠깁니다.
- `shared/tokens.css`를 참조하여 공유 디자인 토큰(색상 팔레트, 글자 크기, page-header/footer 등)을 공유합니다.
- 폰트 `<link>`는 각 페이지가 직접 작성합니다 (fonts를 개별 import하는 비용은 크지 않으며, 각 페이지가 독립적으로 열리는 것을 보장합니다).

### 스티칭 도구: `deck_index.html`

**`assets/deck_index.html`에서 직접 복사**하세요. 수정이 필요한 곳은 한 곳뿐 — `window.DECK_MANIFEST` 배열을 순서대로 작성하여 모든 slide 파일 이름과 인간이 읽을 수 있는 라벨을 나열합니다:

```js
window.DECK_MANIFEST = [
  { file: "slides/01-cover.html",    label: "커버" },
  { file: "slides/02-agenda.html",   label: "목차" },
  { file: "slides/03-problem.html",  label: "문제 진술" },
  // ...
];
```

스티칭 도구는 이미 내장되어 있습니다: 키보드 내비게이션(←/→/Home/End/숫자키/P 인쇄), scale + letterbox, 우하단 카운터, localStorage 기억, hash 페이지 이동, 인쇄 모드(iframe을 순회하며 페이지별 PDF 난출).

### 단일 페이지 검증 (이것이 다중 파일 아키텍처의 킬러급 장점)

각 slide는 독립적인 HTML입니다. **한 장 완성하면 브라우저에서 더블클릭하여 바로 확인**하세요:

```bash
open slides/05-personas.html
```

Playwright 스크린샷도 직접 `goto(file://.../slides/05-personas.html)`를 사용하며, JS 페이지 이동이 필요 없고, 다른 페이지의 CSS 방해도 받지 않습니다. 이로 인해 "약간 수정하고 약간 검증"하는 워크플로우 비용이 거의 0에 가깝습니다.

### 병렬 개발

각 slide 작업을 다른 agent에게 분할하여 동시에 실행하세요 — HTML 파일들은 서로 독립적이며, merge 시 충돌이 없습니다. 긴 deck은 이러한 병렬 방식으로 제작 시간을 1/N으로 압축할 수 있습니다.

### `shared/tokens.css`에 무엇을 넣어야 할까요

**정말로 페이지 간에 공유**하는 것만 넣으세요:

- CSS 변수 (색상 팔레트, 글자 크기 계열, 간격 계열)
- `body { width: 1920px; height: 1080px; }`와 같은 캔버스 잠금
- `.page-header` / `.page-footer`와 같이 모든 페이지에서 완전히 동일하게 사용하는 chrome

**단일 페이지 레이아웃 class를 여기에 넣지 마세요** — 그러면 단일 파일 아키텍처의 전역 오염 문제로 퇴화합니다.

---

## 경로 B (소형 deck): 단일 파일 + `deck_stage.js`

≤10페이지, 페이지 간 상태 공유가 필요한 경우(예: 하나의 React 트윅 패널이 모든 페이지를 조작), 또는 pitch deck 데모처럼 극도로 컴팩트해야 하는 시나리오에 적합합니다.

### 기본 사용법

1. `assets/deck_stage.js`에서 콘텐츠를 읽어 HTML의 `<script>`에 삽입합니다 (또는 `<script src="deck_stage.js">`)
2. body에서 `<deck-stage>`로 slide를 감싸세요
3. 🛑 **script 태그는 반드시 `</deck-stage>` 뒤에 배치**해야 합니다 (아래 하드 제약 조건 참조)

```html
<body>

  <deck-stage>
    <section>
      <h1>Slide 1</h1>
    </section>
    <section>
      <h1>Slide 2</h1>
    </section>
  </deck-stage>

  <!-- ✅ 정확함: script가 deck-stage 뒤에 있음 -->
  <script src="deck_stage.js"></script>

</body>
```

### 🛑 Script 위치 하드 제약 조건 (2026-04-20 실제 함정)

**`<script src="deck_stage.js">`를 `<head>`에 넣을 수 없습니다.** 비록 `<head>`에서 `customElements`를 정의할 수 있지만, parser가 `<deck-stage>` 시작 태그를 해석할 때 `connectedCallback`이 트리거됩니다 — 이때 하위 `<section>`은 아직 parse되지 않았으므로, `_collectSlides()`가 빈 배열을 가져오고, counter는 `1 / 0`을 표시하며, 모든 페이지가 동시에 중첩 렌더링됩니다.

**세 가지 적합한 작성법** (원하는 것을 선택):

```html
<!-- ✅ 가장 권장: script가 </deck-stage> 뒤에 있음 -->
</deck-stage>
<script src="deck_stage.js"></script>

<!-- ✅ 가능: head에 script가 있지만 defer 추가 -->
<head><script src="deck_stage.js" defer></script></head>

<!-- ✅ 가능: module 스크립트는 기본적으로 defer -->
<head><script src="deck_stage.js" type="module"></script></head>
```

`deck_stage.js` 자체는 `DOMContentLoaded` 지연 수집 방어를 내장하고 있어, 비록 script가 head에 있어도 완전히 망가지지는 않습니다 — 하지만 `defer`를 사용하거나 body 하단에 배치하는 것이 여전히 더 깔끔한 방법이며, 방어 분기에 의존하지 않습니다.

### ⚠️ 단일 파일 아키텍처의 CSS 함정 (반드시 읽으세요)

단일 파일 아키텍처의 가장 흔한 함정 — **`display` 속성이 단일 페이지 스타일에 의해 도난당함**.

일반적인 잘못된 방법 1 (section에 직접 display: flex 작성):

```css
/* ❌ 외부 CSS 특이성 2, shadow DOM의 ::slotted(section){display:none} (역시 2)를 덮어씀 */
deck-stage > section {
  display: flex;            /* 모든 페이지가 동시에 중첩 렌더링됩니다! */
  flex-direction: column;
  padding: 80px;
  ...
}
```

일반적인 잘못된 방법 2 (section에 더 높은 특이성의 class가 있는 경우):

```css
.emotion-slide { display: grid; }   /* 특이성: 10, 더 심각함 */
```

둘 다 **모든 slide가 동시에 중첩 렌더링**되게 합니다 — counter는 `1 / 10`을 표시하며 정상인 것처럼 가장할 수 있지만, 시각적으로는 첫 번째 페이지가 두 번째 페이지를 덮고, 두 번째 페이지가 세 번째 페이지를 덮습니다.

### ✅ Starter CSS (작업 시작 시 바로 복사, 함정 피하기)

**section 자체**는 "보임/숨김"만 관리합니다; **layout(flex/grid 등)은 `.active`에 작성**합니다:

```css
/* section은 display가 아닌 공용 스타일만 정의 */
deck-stage > section {
  background: var(--paper);
  padding: 80px 120px;
  overflow: hidden;
  position: relative;
  /* ⚠️ 여기에 display를 작성하지 마세요! */
}

/* "비활성화 시 숨김"을 잠금 — 특이성+가중치 이중 보험 */
deck-stage > section:not(.active) {
  display: none !important;
}

/* 활성화된 페이지에만 필요한 display + layout 작성 */
deck-stage > section.active {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 인쇄 모드: 모든 페이지를 표시해야 하며, :not(.active)를 덮어씀 */
@media print {
  deck-stage > section { display: flex !important; }
  deck-stage > section:not(.active) { display: flex !important; }
}
```

대안 방안: **단일 페이지의 flex/grid를 내부 wrapper `<div>`에 작성**하며, section 자체는 영원히 `display: block/none` 전환 장치로만 사용합니다. 이것이 가장 깔끔한 방법입니다:

```html
<deck-stage>
  <section>
    <div class="slide-content flex-layout">...</div>
  </section>
</deck-stage>
```

### 사용자 정의 크기

```html
<deck-stage width="1080" height="1920">
  <!-- 9:16 세로 버전 -->
</deck-stage>
```

---

## Slide Labels

Deck_stage와 deck_index는 모두 각 페이지에 라벨을 부여합니다(카운터에 표시). **더 의미 있는** 라벨을 부여하세요:

**다중 파일**: `MANIFEST`에 `{ file, label: "04 문제 진술" }` 작성
**단일 파일**: section에 `<section data-screen-label="04 Problem Statement">` 추가

**핵심: Slide 번호는 1부터 시작하며, 0부터 시작하지 마세요**.

사용자가 "slide 5"라고 말할 때, 그는 제5장을 의미하며, 영원히 배열 위치 `[4]`가 아닙니다. 인간은 0-indexed를 사용하지 않습니다.

---

## Speaker Notes

**기본적으로 추가하지 않으며**, 사용자가 명시적으로 요구할 때만 추가합니다.

speaker notes를 추가하면 slide의 텍스트를 최소화할 수 있으며, impact가 큰 시각적 요소에 집중하고 — notes가 완전한 script를 담당합니다.

### 형식

**다중 파일**: `index.html`의 `<head>`에 작성:

```html
<script type="application/json" id="speaker-notes">
[
  "제1장의 script...",
  "제2장의 script...",
  "..."
]
</script>
```

**단일 파일**: 동일한 위치.

### Notes 작성 요점

- **완전함**: 개요가 아니라, 실제로 말할 내용
- **대화체**: 평상시 말하듯이, 서면체가 아님
- **대응**: 배열의 N번째가 N번째 slide에 대응
- **길이**: 200-400자가 최적
- **감정선**: 강세, 휴지, 강조점 표시

---

## Slide 디자인 패턴

### 1. 시스템 확립 (필수)

design context 탐색 후, **먼저 사용할 시스템을 구두로 설명**하세요:

```markdown
Deck 시스템:
- 배경색: 최대 2가지 (90% 흰색 + 10% 어두운 section divider)
- 서체: display는 Instrument Serif, body는 Geist Sans
- 리듬: section divider는 full-bleed 컬러 + 흰 글자, 일반 slide는 흰 바탕
- 이미지: hero slide는 full-bleed 사진, data slide는 chart

이 시스템에 따라 작업하겠습니다, 문제가 있으면 말씀해 주세요.
```

사용자 확인 후 계속 진행하세요.

### 2. 일반적인 slide layouts

- **Title slide**: 단색 배경 + 대형 제목 + 부제목 + 저자/날짜
- **Section divider**: 컬러 배경 + 챕터 번호 + 챕터 제목
- **Content slide**: 흰 바탕 + 제목 + 1-3개 불릿 포인트
- **Data slide**: 제목 + 대형 차트/숫자 + 간단한 설명
- **Image slide**: full-bleed 사진 + 하단 작은 caption
- **Quote slide**: 여백 + 대형 인용 + 출처
- **Two-column**: 좌우 대비 (vs / before-after / problem-solution)

하나의 deck에서 최대 4-5가지 layout만 사용하세요.

### 3. Scale (재차 강조)

- 본문 최소 **24px**, 이상적으로는 28-36px
- 제목 **60-120px**
- Hero 글자 **180-240px**
- 슬라이드는 10m 밖에서 보는 것이므로, 글자가 충분히 커야 합니다

### 4. 시각적 리듬

Deck은 **의도적인 다양성(intentional variety)**이 필요합니다:

- 색상 리듬: 대부분 흰 바탕 + 가끔 컬러 section divider + 가끔 다크 조각
- 밀도 리듬: 몇 장의 text-heavy + 몇 장의 image-heavy + 몇 장의 quote 여백
- 글자 크기 리듬: 일반 제목 + 가끔 초대형 hero 글자

**모든 slide가 똑같이 생기지 마세요** — 그것은 PPT 템플릿이지, 디자인이 아닙니다.

### 5. 공간 호흡 (데이터 밀집 페이지 필독)

**초보자가 가장 쉽게 밟는 함정**: 넣을 수 있는 모든 정보를 한 페이지에 집어넣기.

정보 밀도 ≠ 효과적인 정보 전달. 학술/강연류 deck은 특히 절제가 필요합니다:

- 목록/매트릭스 페이지: N개 요소를 모두 동일한 크기로 그리지 마세요. **주계층화** — 오늘 이야기할 5개를 크게 만들어 주인공으로, 나머지 16개를 작게 만들어 배경 hint로 처리하세요.
- 대형 숫자 페이지: 숫자 자체가 시각적 주인공입니다. 주변 caption은 3줄을 초과하지 마세요, 그렇지 않으면 관객의 시선이 왔다갔다합니다.
- 인용 페이지: 인용문과 출처 사이에 여백으로 분리하고, 붙여 놓지 마세요.

"데이터가 주인공인가" "텍스트가 서로 붙어 있는가" 두 가지를 자체 검토하여, 여백이 약간 불안할 때까지 수정하세요.

---

## PDF로 인쇄

**다중 파일**: `deck_index.html`이 이미 `beforeprint` 이벤트를 처리하여, 페이지별로 PDF를 난출합니다.

**단일 파일**: `deck_stage.js`도 동일하게 처리합니다.

인쇄 스타일은 이미 작성되어 있으므로, 추가로 `@media print` CSS를 작성할 필요가 없습니다.

---

## PPTX / PDF로 난출 (셀프 서비스 스크립트)

HTML 우선이 핵심 원칙입니다. 하지만 사용자는 종종 PPTX/PPTX 난출을 필요로 합니다. 두 가지 범용 스크립트를 제공합니다. **어떤 다중 파일 deck에서도 사용 가능**하며, `scripts/`에 위치합니다:

### `export_deck_pdf.mjs` — 벡터 PDF 난출 (다중 파일 아키텍처)

```bash
node scripts/export_deck_pdf.mjs --slides <slides-dir> --out deck.pdf
```

**특징**:
- 텍스트 **벡터 보존** (복사 가능, 검색 가능)
- 시각적 100% 고정밀도 (Playwright 내장 Chromium 렌더링 후 인쇄)
- **HTML을 한 글자도 수정할 필요 없음**
- 각 slide가 독립적인 `page.pdf()`를 거쳐, `pdf-lib`로 병합

**의존성**: `npm install playwright pdf-lib`

**제한**: PDF에서 텍스트를 다시 편집할 수 없음 — 수정이 필요하면 HTML로 돌아가 수정하세요.

### `export_deck_stage_pdf.mjs` — 단일 파일 deck-stage 아키텍처 전용 ⚠️

**언제 사용**: deck이 단일 HTML 파일 + `<deck-stage>` web component로 N개의 `<section>`을 감싸는 경우 (즉 경로 B 아키텍처). 이때 `export_deck_pdf.mjs`의 "각 HTML당 한 번 `page.pdf()`" 방식은 통하지 않으므로, 이 전용 스크립트를 사용해야 합니다.

```bash
node scripts/export_deck_stage_pdf.mjs --html deck.html --out deck.pdf
```

**왜 `export_deck_pdf.mjs`를 재사용할 수 없는가** (2026-04-20 실제 함정 기록):

1. **Shadow DOM이 `!important`보다 강함**: deck-stage의 shadow CSS에 `::slotted(section) { display: none }` (활성화된 페이지만 `display: block`). light DOM에서 `@media print { deck-stage > section { display: block !important } }`를 사용해도 억제할 수 없음 — `page.pdf()`가 print 미디어를 트리거한 후 Chromium의 최종 렌더링은 활성화된 페이지만 표시되며, 결과 **전체 PDF가 1페이지** (현재 활성화된 slide의 반복).

2. **순환 goto로도 여전히 1페이지만 나옴**: 직관적인 해결책 "각 `#slide-N`로 한 번씩 내비게이션한 후 `page.pdf({pageRanges:'1'})`"도 실패 — print CSS가 shadow DOM 외부에도 `deck-stage > section { display: block }` 규칙이 override된 후, 최종 렌더링은 영원히 section 목록의 첫 번째(당신이 내비게이션한 페이지가 아님). 결과 17번 순환으로 17장의 P01 커버가 나옴.

3. **absolute 자식 요소가 다음 페이지로 이동**: 모든 section 렌더링에 성공하더라도, section 자체가 `position: static`이면 absolute 위치의 `cover-footer`/`slide-footer`가 initial containing block을 기준으로 위치할 수 있음 — section이 print로 강제로 1080px 높이가 되면, absolute footer가 다음 페이지로 밀려날 수 있음 (PDF가 section 수보다 1페이지 더 많게 표시되며, 추가된 페이지에는 footer 고아만 포함).

**수정 전략** (스크립트에 이미 구현됨):

```js
// HTML을 연 후, page.evaluate로 section을 deck-stage slot에서 뽑아내어,
// body 아래의 일반 div에 직접 걸고, inline style으로 position:relative + 고정 크기를 보장
await page.evaluate(() => {
  const stage = document.querySelector('deck-stage');
  const sections = Array.from(stage.querySelectorAll(':scope > section'));
  document.head.appendChild(Object.assign(document.createElement('style'), {
    textContent: `
      @page { size: 1920px 1080px; margin: 0; }
      html, body { margin: 0 !important; padding: 0 !important; }
      deck-stage { display: none !important; }
    `,
  }));
  const container = document.createElement('div');
  sections.forEach(s => {
    s.style.cssText = 'width:1920px!important;height:1080px!important;display:block!important;position:relative!important;overflow:hidden!important;page-break-after:always!important;break-after:page!important;background:#F7F4EF;margin:0!important;padding:0!important;';
    container.appendChild(s);
  });
  // 마지막 페이지는 페이지 나누기 금지, 끝쪽 공백 페이지 방지
  sections[sections.length - 1].style.pageBreakAfter = 'auto';
  sections[sections.length - 1].style.breakAfter = 'auto';
  document.body.appendChild(container);
});

await page.pdf({ width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true });
```

**왜 이것이 작동하는가**:
- section을 shadow DOM slot에서 light DOM의 일반 div로 뽑아냄 — `::slotted(section) { display: none }` 규칙을 완전히 우회
- inline `position: relative`로 absolute 자식 요소가 section을 기준으로 위치하며, overflow 방지
- `page-break-after: always`로 브라우저 print 시 각 section이 독립적인 한 페이지가 됨
- `:last-child` 페이지 나누기 금지로 끝쪽 공백 페이지 방지

**`mdls -name kMDItemNumberOfPages`로 검증 시 주의**: macOS의 Spotlight 메타데이터는 캐시가 있으므로, PDF를 덮어쓴 후 `mdimport file.pdf`를 실행하여 강제로 새로고침해야 합니다. 그렇지 않으면 이전 페이지 수가 표시됩니다. `pdfinfo` 또는 `pdftoppm`로 파일 수를 세는 것이 진정한 카운트입니다.

---

### `export_deck_pptx.mjs` — 편집 가능한 PPTX 난출

```bash
# 유일한 모드: 텍스트 상자 네이티브 편집 가능 (폰트는 시스템 폰트로 fallback)
node scripts/export_deck_pptx.mjs --slides <dir> --out deck.pptx
```

작동 원리: `html2pptx`가 computedStyle을 요소별로 읽어 DOM을 PowerPoint 객체(text frame / shape / picture)로 번역합니다. 텍스트가 진짜 텍스트 상자가 되며, PPT에서 더블클릭하면 편집 가능합니다.

**하드 제약 조건** (HTML이 충족해야 하며, 그렇지 않으면 해당 페이지 skip, 자세한 설명은 `references/editable-pptx.md` 참조):
- 모든 텍스트는 `<p>`/`<h1>`-`<h6>`/`<ul>`/`<ol>` 안에 있어야 함 (div에 맨 텍스트 금지)
- `<p>`/`<h*>` 태그 자체에는 background/border/shadow가 없어야 함 (외부 div에 배치)
- `::before`/`::after`로 장식 텍스트를 삽입하지 않음 (의사 요소는 추출할 수 없음)
- inline 요소(span/em/strong)에는 margin이 없어야 함
- CSS gradient를 사용하지 않음 (렌더링 불가)
- div에는 `background-image`를 사용하지 않음 (`<img>` 사용)

스크립트는 이미 **자동 전처리기**를 내장하고 있습니다 — "잎사귀 div 안의 맨 텍스트"를 자동으로 `<p>`로 감쌉니다 (class 보존). 이것이 가장 흔한 위반(맨 텍스트)을 해결합니다. 하지만 다른 위반(p에 border, span에 margin 등)은 여전히 HTML 원천이 규격을 준수해야 합니다.

**폰트 fallback 주의사항**:
- Playwright는 webfont로 text-box 크기를 측정합니다; PowerPoint/Keynote는 로컬 폰트로 렌더링합니다
- 둘이 다르면 **overflow 또는 어긋남**이 발생할 수 있습니다 — 각 페이지를 육안으로 확인해야 합니다
- 대상 기기에 HTML에서 사용하는 폰트를 설치하거나, `system-ui`로 fallback하는 것을 권장합니다

**시각적 우선 시나리오에서는 이 경로를 사용하지 마세요** → 대신 `export_deck_pdf.mjs`로 PDF를 난출하세요. PDF는 시각적 100% 고정밀도, 벡터, 크로스 플랫폼, 텍스트 검색 가능 — 시각적 우선 deck의 진정한 귀결지이며, "편집 불가능한 타협"이 아닙니다.

### 처음부터 HTML을 난출에 친화적으로 작성하기

성능이 가장 안정적인 deck: **HTML을 작성할 때부터 editable의 4가지 하드 제약 조건에 따라 작성**합니다. 이렇게 하면 `export_deck_pptx.mjs`가 직접 모두 통과합니다. 추가 비용은 크지 않습니다:

```html
<!-- ❌ 좋지 않음 -->
<div class="title">핵심 발견</div>

<!-- ✅ 좋음 (p로 감싸고, class 상속) -->
<p class="title">핵심 발견</p>

<!-- ❌ 좋지 않음 (border가 p에 있음) -->
<p class="stat" style="border-left: 3px solid red;">41%</p>

<!-- ✅ 좋음 (border가 외부 div에 있음) -->
<div class="stat-wrap" style="border-left: 3px solid red;">
  <p class="stat">41%</p>
</div>
```

### 언제 어떤 것을 선택할까요

| 시나리오 | 권장 |
|------|------|
| 주최자/아카이브 보관용 | **PDF** (범용, 고정밀도, 텍스트 검색 가능) |
| 협업자에게 보내어 텍스트를 약간 수정하도록 | **PPTX editable** (폰트 fallback 수용) |
| 현장 발표, 콘텐츠 수정 없음 | **PDF** (벡터 고정밀도, 크로스 플랫폼) |
| HTML이 최우선 표현 매체 | 브라우저에서 직접 재생, 난출은 백업일 뿐 |

## 편집 가능한 PPTX로 난출하는 심층 경로 (장기 프로젝트만 해당)

당신의 deck이 장기적으로 유지보수되고, 반복적으로 수정되며, 팀 협업이 이루어진다면 — **처음부터 html2pptx 제약 조건에 따라 HTML을 작성**하는 것을 권장합니다. 이렇게 하면 `export_deck_pptx.mjs`가 직접 모두 통과합니다. 자세한 내용은 `references/editable-pptx.md`를 참조하세요 (4가지 하드 제약 조건 + HTML 템플릿 + 일반적인 오류 빠른 검색 + 이미 시각적 디자인이 있는 경우의 fallback 프로세스).

---

## 자주 묻는 질문

**다중 파일: iframe 안의 페이지가 열리지 않음 / 백屏**
→ `MANIFEST`의 `file` 경로가 `index.html`을 기준으로 상대 경로가 올바른지 확인하세요. 브라우저 DevTools에서 iframe의 src가 직접 접근 가능한지 확인하세요.

**다중 파일: 어떤 페이지의 스타일이 다른 페이지와 충돌**
→ 불가능합니다 (iframe 격리). 충돌이 느껴진다면, 그것은 캐시입니다 — Cmd+Shift+R로 강제 새로고침하세요.

**단일 파일: 다중 slide가 동시에 렌더링되어 중첩됨**
→ CSS 특이성 문제입니다. 위의 "단일 파일 아키텍처의 CSS 함정" 섹션을 확인하세요.

**단일 파일: scale이 올바르지 않게 보임**
→ 모든 slide가 `<deck-stage>` 아래에 `<section>`으로 직접 걸려 있는지 확인하세요. 중간에 `<div>`를 넣어서는 안 됩니다.

**단일 파일: 특정 slide로 바로 이동하고 싶음**
→ URL에 hash 추가: `index.html#slide-5`로 제5장으로 이동합니다.

**두 아키텍처 모두 해당: 다른 화면에서 글자 위치가 일치하지 않음**
→ 고정 크기(1920×1080)와 `px` 단위를 사용하고, `vw`/`vh` 또는 `%`를 사용하지 마세요. scale은 통일되게 처리됩니다.

---

## 검증 체크리스트 (deck 완료 후 반드시 통과)

1. [ ] 브라우저에서 `index.html` (또는 메인 HTML)을 직접 열어, 홈페이지에 이미지 손상 없음, 폰트 로딩 완료 확인
2. [ ] → 키를 눌러 각 페이지로 이동, 공백 페이지 없음, 레이아웃 어긋남 없음
3. [ ] P 키를 눌러 인쇄 미리보기, 각 페이지가 정확히 한 장의 A4 (또는 1920×1080)이며 잘림 없음
4. [ ] 무작위로 3페이지를 선택하여 Cmd+Shift+R로 강제 새로고침, localStorage 기억이 정상 작동
5. [ ] Playwright 일괄 스크린샷 (다중 페이지 아키텍처: `slides/*.html` 순회; 단일 파일 아키텍처: goTo 전환 사용), 육안으로 한 번 훑어보기
6. [ ] `TODO` / `placeholder` 잔여물을 검색하여 모두 정리되었는지 확인
