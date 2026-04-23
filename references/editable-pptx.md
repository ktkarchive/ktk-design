# 편집 가능한 PPTX 납품: HTML 하드 제약 + 사이즈 결정 + 흔한 실수

이 문서는 **`scripts/html2pptx.js` + `pptxgenjs`를 활용해 HTML을 요소별로 진짜 편집 가능한 PowerPoint 텍스트 상자로 변환하는** 방법을 설명하며, `export_deck_pptx.mjs`가 유일하게 지원하는 경로입니다.

> **핵심 전제**: 이 경로를 사용하려면 HTML을 첫 줄부터 아래 4가지 제약 조건에 맞춰 작성해야 합니다. **완성한 뒤에 변환하는 게 아닙니다** — 사후 보수는 2~3시간의 재작업을 유발합니다(2026-04-20 옵션 사적이사회 프로젝트에서 실제로 경험한 함정).
>
> 시각적 자유도가 우선인 상황(애니메이션 / 웹 컴포넌트 / CSS 그라데이션 / 복잡한 SVG)에서는 PDF 경로(`export_deck_pdf.mjs` / `export_deck_stage_pdf.mjs`)로 전환하세요. PPTX 납품이 시각적 충실도와 편집 가능성을 동시에 만족시킬 것이라 기대하지 마세요 — 이는 PPTX 파일 형식 자체의 물리적 제약입니다(문서 말미의 「왜 4가지 제약이 버그가 아니라 물리적 제약인가」 참조).

---

## 캔버스 사이즈: 960×540pt 사용 (LAYOUT_WIDE)

PPTX의 단위는 **인치(inch)**(물리적 크기)이며, px가 아닙니다. 결정 원칙: body의 computedStyle 크기는 **프레젠테이션 레이아웃의 인치 크기와 일치**해야 합니다(±0.1", `html2pptx.js`의 `validateDimensions`가 강제 검사함).

### 3가지 후보 사이즈 비교

| HTML body | 물리적 크기 | 대응 PPT 레이아웃 | 선택 시점 |
|---|---|---|---|
| **`960pt × 540pt`** | **13.333″ × 7.5″** | **pptxgenjs `LAYOUT_WIDE`** | ✅ **기본 추천**(최신 PowerPoint 16:9 표준) |
| `720pt × 405pt` | 10″ × 5.625″ | 사용자 정의 | 사용자가 「구형 PowerPoint Widescreen」 템플릿을 지정했을 때만 |
| `1920px × 1080px` | 20″ × 11.25″ | 사용자 정의 | ❌ 비표준 사이즈, 프로젝션 후 글꼴이 비정상적으로 작게 보임 |

**HTML 사이즈를 해상도로 착각하지 마세요.** PPTX는 벡터 문서이며, body 크기는 **물리적 크기**를 결정하고 선명도를 결정하지 않습니다. 과도하게 큰 body(20″×11.25″)는 글자를 더 선명하게 만들지 않습니다 — 오히려 글꼴 pt가 캔버스에 상대적으로 작아져 프로젝션/인쇄 시 더 보기 어려워집니다.

### body 작성법 3가지 (동일)

```css
body { width: 960pt;  height: 540pt; }    /* 가장 명확함, 추천 */
body { width: 1280px; height: 720px; }    /* 동일, px 사용 습관 */
body { width: 13.333in; height: 7.5in; }  /* 동일, 인치 직관 */
```

함께 사용하는 pptxgenjs 코드:

```js
const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';  // 13.333 × 7.5 inch, 사용자 정의 불필요
```

---

## 4가지 하드 제약(위반 시 즉시 오류 발생)

`html2pptx.js`는 HTML의 DOM을 요소별로 PowerPoint 객체로 번역합니다. PowerPoint의 형식 제약이 HTML에 투영된 결과가 아래 4가지 규칙입니다.

### 규칙 1: DIV 안에 텍스트를 직접 쓸 수 없음 — 반드시 `<p>` 또는 `<h1>`-`<h6>`로 감싸야 함

```html
<!-- ❌ 잘못됨: 텍스트가 div 안에 직접 있음 -->
<div class="title">Q3 매출 성장 23%</div>

<!-- ✅ 올바름: 텍스트가 <p> 또는 <h1>-<h6> 안에 있음 -->
<div class="title"><h1>Q3 매출 성장 23%</h1></div>
<div class="body"><p>신규 사용자가 주요 동력</p></div>
```

**이유**: PowerPoint 텍스트는 반드시 text frame 안에 있어야 하며, text frame은 HTML의 단락 요소(p/h*/li)에 대응합니다. 순수 `<div>`는 PPTX에서 대응하는 텍스트 컨테이너가 없습니다.

**`<span>`으로 주요 텍스트를 담을 수도 없습니다** — span은 인라인 요소이므로 독립적인 텍스트 상자로 정렬할 수 없습니다. span은 **p/h* 안에 삽입**되어 굵게, 색상 변경 등 국부적 스타일을 적용하는 용도로만 사용할 수 있습니다.

### 규칙 2: CSS 그라데이션 미지원 — 순색(solid color)만 사용

```css
/* ❌ 잘못됨 */
background: linear-gradient(to right, #FF6B6B, #4ECDC4);

/* ✅ 올바름: 순색 */
background: #FF6B6B;

/* ✅ 반드시 다색 줄무늬가 필요한 경우, flex 자식 요소가 각각 순색 사용 */
.stripe-bar { display: flex; }
.stripe-bar div { flex: 1; }
.red   { background: #FF6B6B; }
.teal  { background: #4ECDC4; }
```

**이유**: PowerPoint의 shape fill은 solid/gradient-fill 두 가지만 지원하지만, pptxgenjs의 `fill: { color: ... }`는 solid만 매핑합니다. 그라데이션을 PowerPoint 네이티브 그라데이션으로 변환하려면 별도 구조가 필요하며, 현재 도구 체인은 이를 지원하지 않습니다.

### 규칙 3: 배경/테두리/그림자는 DIV에만 적용 가능, 텍스트 태그에는 불가

```html
<!-- ❌ 잘못됨: <p>에 배경색 있음 -->
<p style="background: #FFD700; border-radius: 4px;">핵심 내용</p>

<!-- ✅ 올바름: 외부 div가 배경/테두리 담당, <p>는 텍스트만 담당 -->
<div style="background: #FFD700; border-radius: 4px; padding: 8pt 12pt;">
  <p>핵심 내용</p>
</div>
```

**이유**: PowerPoint에서 shape(사각형/둥근 사각형)과 text frame은 별개 객체입니다. HTML의 `<p>`는 text frame으로만 번역되며, 배경/테두리/그림자는 shape에 속합니다 — 반드시 **텍스트를 감싸는 div**에 작성해야 합니다.

### 규칙 4: DIV에 `background-image` 사용 불가 — `<img>` 태그 사용

```html
<!-- ❌ 잘못됨 -->
<div style="background-image: url('chart.png')"></div>

<!-- ✅ 올바름 -->
<img src="chart.png" style="position: absolute; left: 50%; top: 20%; width: 300pt; height: 200pt;" />
```

**이유**: `html2pptx.js`는 `<img>` 요소에서만 이미지 경로를 추출하며, CSS의 `background-image` URL은 해석하지 않습니다.

---

## Path A HTML 템플릿 뼈대

각 슬라이드는 독립적인 HTML 파일 하나로, 서로 스코프가 격리됩니다(단일 파일 deck의 CSS 오염 회피).

```html
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 960pt; height: 540pt;           /* ⚠️ LAYOUT_WIDE와 매칭 */
    font-family: system-ui, -apple-system, "Apple SD Gothic Neo", sans-serif;
    background: #FEFEF9;                    /* 순색, 그라데이션 불가 */
    overflow: hidden;
  }
  /* DIV가 레이아웃/배경/테두리 담당 */
  .card {
    position: absolute;
    background: #1A4A8A;                    /* 배경은 DIV에 */
    border-radius: 4pt;
    padding: 12pt 16pt;
  }
  /* 텍스트 태그는 글꼴 스타일만 담당, 배경/테두리 추가 불가 */
  .card h2 { font-size: 24pt; color: #FFFFFF; font-weight: 700; }
  .card p  { font-size: 14pt; color: rgba(255,255,255,0.85); }
</style>
</head>
<body>

  <!-- 제목 영역: 외부 div로 포지셔닝, 내부 텍스트 태그 -->
  <div style="position: absolute; top: 40pt; left: 60pt; right: 60pt;">
    <h1 style="font-size: 36pt; color: #1A1A1A; font-weight: 700;">제목은 단정문으로, 주제어가 아님</h1>
    <p style="font-size: 16pt; color: #555555; margin-top: 10pt;">부제목은 보충 설명</p>
  </div>

  <!-- 콘텐츠 카드: div가 배경 담당, h2/p가 텍스트 담당 -->
  <div class="card" style="top: 130pt; left: 60pt; width: 240pt; height: 160pt;">
    <h2>핵심 포인트 1</h2>
    <p>간단한 설명 문구</p>
  </div>

  <!-- 목록: ul/li 사용, 수동 • 기호 사용 금지 -->
  <div style="position: absolute; top: 320pt; left: 60pt; width: 540pt;">
    <ul style="font-size: 16pt; color: #1A1A1A; padding-left: 24pt; list-style: disc;">
      <li>첫 번째 핵심</li>
      <li>두 번째 핵심</li>
      <li>세 번째 핵심</li>
    </ul>
  </div>

  <!-- 삽화: <img> 태그 사용, background-image 사용 금지 -->
  <img src="illustration.png" style="position: absolute; right: 60pt; top: 110pt; width: 320pt; height: 240pt;" />

</body>
</html>
```

---

## 흔한 실수 빠른 확인

| 오류 메시지 | 원인 | 수정 방법 |
|---------|------|---------|
| `DIV element contains unwrapped text "XXX"` | div 안에 순수 텍스트 존재 | 텍스트를 `<p>` 또는 `<h1>`-`<h6>`로 감싸기 |
| `CSS gradients are not supported` | linear/radial-gradient 사용 | 순색으로 변경하거나, flex 자식 요소로 분할 |
| `Text element <p> has background` | `<p>` 태그에 배경색 추가 | 외부 `<div>`가 배경 담당, `<p>`는 텍스트만 작성 |
| `Background images on DIV elements are not supported` | div에 background-image 사용 | `<img>` 태그로 변경 |
| `HTML content overflows body by Xpt vertically` | 콘텐츠가 540pt를 초과 | 콘텐츠 줄이거나 글꼴 축소, 또는 `overflow: hidden`으로 자르기 |
| `HTML dimensions don't match presentation layout` | body 크기와 pres 레이아웃 불일치 | body를 `960pt × 540pt`로 설정해 `LAYOUT_WIDE`와 매칭; 또는 defineLayout로 사용자 정의 크기 |
| `Text box "XXX" ends too close to bottom edge` | 큰 글꼴 `<p>`가 body 하단에서 0.5 inch 미만 | 위로 이동해 하단 여백 확보; PPT 하단 자체가 일부 가려짐 |

---

## 기본 워크플로우(3단계로 PPTX 완성)

### Step 1: 제약 조건에 맞춰 각 페이지를 독립적인 HTML로 작성

```
나의Deck/
├── slides/
│   ├── 01-cover.html    # 각 파일은 완전한 960×540pt HTML
│   ├── 02-agenda.html
│   └── ...
└── illustration/        # 모든 <img>가 참조하는 이미지
    ├── chart1.png
    └── ...
```

### Step 2: build.js 작성 후 `html2pptx.js` 호출

```js
const pptxgen = require('pptxgenjs');
const html2pptx = require('../scripts/html2pptx.js');  // 본 skill 스크립트

(async () => {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';  // 13.333 × 7.5 inch, HTML의 960×540pt와 매칭

  const slides = ['01-cover.html', '02-agenda.html', '03-content.html'];
  for (const file of slides) {
    await html2pptx(`./slides/${file}`, pres);
  }

  await pres.writeFile({ fileName: 'deck.pptx' });
})();
```

### Step 3: 열어서 확인

- PowerPoint/Keynote으로 납품된 PPTX 열기
- 아무 텍스트나 더블클릭하면 바로 편집 가능해야 함(이미지로 나오면 규칙 1 위반)
- overflow 확인: 각 페이지는 body 범위 내에 있어야 하며, 잘리지 않아야 함

---

## 이 경로 vs 다른 옵션(언제 무엇을 선택할 것인가)

| 요구사항 | 선택 |
|------|------|
| 동료가 PPTX 안의 텍스트를 수정 / 비기술자에게 편집용으로 전달 | **본 문서의 경로**(editable, 처음부터 4가지 제약에 맞춰 HTML 작성 필요) |
| 발표용 / 보관용, 수정 불필요 | `export_deck_pdf.mjs`(다중 파일) 또는 `export_deck_stage_pdf.mjs`(단일 파일 deck-stage), 벡터 PDF 납품 |
| 시각적 자유도 우선(애니메이션, 웹 컴포넌트, CSS 그라데이션, 복잡한 SVG), 편집 불가 수용 | **PDF**(위와 동일) — PDF가 충실도와 크로스 플랫폼을 모두 만족하며, 「이미지 PPTX」보다 적합 |

**절대 시각적으로 완성된 HTML에 html2pptx를 강제로 실행하지 마세요** — 실제 테스트 결과 시각 중심 HTML의 통과율은 30% 미만이며, 나머지는 페이지별로 수정하는 것이 재작성보다 느립니다. 이런 상황에서는 PDF를 납품해야 하며, PPTX로 억지로 변환하면 안 됩니다.

---

## Fallback: 시각적 시안이 이미 있는데 사용자가 editable PPTX를 고집하는 경우

가끔 다음과 같은 상황이 발생합니다: 당신/사용자가 이미 시각 중심의 HTML(그라데이션, 웹 컴포넌트, 복잡한 SVG 모두 사용)을 작성했으며, 원래 PDF가 가장 적합하지만 사용자가 「안 돼, 반드시 편집 가능한 PPTX여야 해」라고 말하는 경우입니다.

**html2pptx를 강제로 실행해 통과되길 기대하지 마세요** — 실제 테스트 결과 시각 중심 HTML의 html2pptx 통과율은 30% 미만이며, 나머지 70%는 오류가 발생하거나 왜곡됩니다. 올바른 fallback은 다음과 같습니다:

### Step 1 · 먼저 한계점을 알리기(투명한 소통)

사용자에게 한 문장으로 세 가지를 명확히 전달하세요:

> 「현재 HTML에는 [구체적으로 나열: 그라데이션 / 웹 컴포넌트 / 복잡한 SVG / ...]이 사용되어 있어, editable PPTX로 직접 변환하면 실패합니다. 두 가지 방안이 있습니다:
> - A. **PDF 납품**(추천) — 시각적 요소 100% 유지, 수신자는 보고 인쇄할 수 있지만 텍스트 수정 불가
> - B. **시각적 시안을 기반으로 editable HTML 재작성**(색상/레이아웃/카피의 디자인 결정은 유지하되, 4가지 하드 제약에 맞춰 HTML 구조를 재구성, **그라데이션, 웹 컴포넌트, 복잡한 SVG 등 시각적 기능 희생**) → 이후 editable PPTX로 납품
>
> 어떤 것을 선택하시겠습니까?」

B 방안을 쉽게 얘기하지 마세요 — **무엇을 잃게 되는지** 명확히 알려야 합니다. 사용자가 스스로 선택하게 하세요.

### Step 2 · 사용자가 B를 선택한 경우: AI가 능동적으로 재작성, 사용자에게 직접 작성을 요구하지 않음

이곳의 교리(doctirne)는: **사용자가 제공하는 것은 디자인 의도이며, 이를 규격에 맞는 구현으로 번역하는 것은 당신의 책임입니다**. 사용자에게 4가지 하드 제약을 배우라고 한 뒤 스스로 재작성하게 하지 마세요.

재작성 시 준수 원칙:
- **유지**: 색상 시스템(주색/보조색/중성색), 정보 계층(제목/부제목/본문/주석), 핵심 카피, layout 뼈대(상하 / 좌우 분할 / 그리드), 페이지 리듬
- **다운그레이드**: CSS 그라데이션 → 순색 또는 flex 분할, 웹 컴포넌트 → 단락 수준 HTML, 복잡한 SVG → 단순화된 `<img>` 또는 순색 기하학, 그림자 → 삭제 또는 극히 약하게, 사용자 정의 글꼴 → 시스템 글꼴에 맞춤
- **재작성**: 순수 텍스트 → `<p>` / `<h*>`로 감싸기, `background-image` → `<img>` 태그, `<p>`의 배경 테두리 → 외부 div가 담당

### Step 3 · 산출물 대조 목록 작성(투명한 납품)

재작성 완료 후 사용자에게 before/after 대조 목록을 제공해, 어떤 시각적 디테일이 단순화되었는지 알려주세요:

```
원래 디자인 → editable 버전 조정
- 제목 영역 보라색 그라데이션 → 주색 #5B3DE8 순색 배경
- 데이터 카드 그림자 → 삭제(2pt 외곽선으로 구분)
- 복잡한 SVG 꺾은선 그래프 → 단순화된 <img> PNG(HTML 스크린샷으로 생성)
- Hero 영역 웹 컴포넌트 애니메이션 → 정적 첫 프레임(웹 컴포넌트는 번역 불가)
```

### Step 4 · 납품 & 이중 형식 납품

- `editable` 버전 HTML → `scripts/export_deck_pptx.mjs`를 실행해 편집 가능한 PPTX 납품
- **원래 시각적 시안도 함께 보관** → `scripts/export_deck_pdf.mjs`를 실행해 고충실도 PDF 납품
- 사용자에게 이중 형식으로 납품: 시각적 시안의 PDF + 편집 가능한 PPTX, 각자의 역할 수행

### B 방안을 직접 거절해야 하는 경우

특정 상황에서는 재작성 비용이 너무 높아 editable PPTX를 포기하도록 권유해야 합니다:
- HTML의 핵심 가치가 애니메이션 또는 인터랙션(재작성 후 정적 첫 프레임만 남아 정보 손실 50%+)
- 페이지 수 > 30, 재작성 비용이 2시간 초과
- 시각적 디자인이 정밀한 SVG / 사용자 정의 filter에 깊이 의존(재작성 후 원본과 거의 무관)

이때 사용자에게 말하세요: 「이 deck은 재작성 비용이 너무 높습니다. PDF로 납품하는 것을 권장합니다. 수신자가 반드시 pptx 형식을 원한다면, 시각적 요소가 크게 단순화됨을 감수해야 합니다 — PDF로 변경할까요?」

---

## 왜 4가지 제약이 버그가 아니라 물리적 제약인가

이 4가지는 `html2pptx.js` 작성자가 게으름을 피운 것이 아닙니다 — 이들은 **PowerPoint 파일 형식(OOXML) 자체의 제약**이 HTML에 투영된 결과입니다:

- PPTX에서 텍스트는 반드시 text frame(`<a:txBody>`) 안에 있어야 하며, 이는 단락 수준 HTML 요소에 대응합니다
- PPTX의 shape과 text frame은 별개 객체이며, 동일한 element에서 배경을 그리고 텍스트를 동시에 작성할 수 없습니다
- PPTX의 shape fill은 그라데이션 지원이 제한적입니다(특정 preset gradients만 지원, CSS 임의 각도 그라데이션은 미지원)
- PPTX의 picture 객체는 실제 이미지 파일을 참조해야 하며, CSS 속성이 아닙니다

이 점을 이해한 후, **도구가 똑똑해지길 기대하지 마세요** — HTML 작성법이 PPTX 형식에 적응해야 하며, 그 반대가 아닙니다.
