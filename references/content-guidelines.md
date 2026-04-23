# 콘텐츠 가이드라인: 반 AI 슬롭(anti-AI slop), 콘텐츠 기준, 스케일(scale) 규격

AI 디자인에서 가장 빠지기 쉬운 함정입니다. 이 문서는 「무엇을 해야 하는가」보다 「무엇을 하지 말아야 하는가」를 정리한 리스트입니다. 왜냐하면 AI 슬롭은 기본값(default)이기 때문에, 당신이 능동적으로 피하지 않으면 그대로 발생합니다.

## AI 슬롭(AI Slop) 완전 블랙리스트

### 시각적 함정

**❌ 과도한 그라데이션 배경**
- 병풀색 → 분홍색 → 파란색 전체 화면 그라데이션(AI 생성 웹사이트의 전형적인 느낌)
- 어떤 방향이든 레인보우 그라데이트(rainbow gradient)
- 메시 그라데이트(mesh gradient)로 배경을 가득 채우기
- ✅ 그라데이션을 쓰려면: 은은하게(subtle), 단색 계열로, 의도적으로 포인트를 주는 방식(예: 버튼 호버(button hover))

**❌ 둥근 모서리 카드 + 왼쪽 볼더 강조색(rounded cards + left border accent)**
```css
/* 이것이 AI 느낌 카드의 전형적인 시그니처입니다 */
.card {
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
  padding: 16px;
}
```
이런 카드는 AI가 생성한 대시보드(Dashboard)에서 범람합니다. 강조를 하고 싶다면 더욱 디자인 감각 있는 방법을 사용하세요: 배경색 대비, 자무(font-weight)/글자 크기 대비, 평범한 구분선(plain divider), 혹은 아예 카드를 나누지 않는 것도 방법입니다.

**❌ 이모지(Emoji) 장식**
브랜드 자체가 이모지를 사용하는 경우(예: Notion, Slack)가 아니라면 UI에 이모지를 배치하지 마세요. **특히 하지 말아야 할 것**:
- 제목 앞의 🚀 ⚡️ ✨ 🎯 💡
- 기능(feature) 목록의 ✅
- CTA(Call-to-Action) 버튼 안의 → (화살표가 단독으로 나오는 것은 괜찮지만, 이모지 화살표는 안 됨)

아이콘이 없다면 진짜 아이콘 라이브러리(Lucide/Heroicons/Phosphor)를 사용하거나, 플레이스홀더(placeholder)를 쓰세요.

**❌ SVG로 이미지(imagery) 그리기**
SVG로 그리려 하지 마세요: 사람, 장면, 기기, 물품, 추상 예술. AI가 그린 SVG 이미지(imagery)는 한눈에 AI 느낌이 나며, 유치하고 값싸 보입니다. **회색 직사각형 하나에 "일러스트 영역 1200×800"이라는 텍스트 라벨을 붙인 것이, 서투른 SVG 히어로 일러스트(hero illustration)보다 100배 낫습니다**.

SVG를 사용할 수 있는 유일한 상황:
- 진짜 아이콘(16×16에서 32×32 수준)
- 장식 요소로 쓰이는 기하학적 도형
- 데이터 시각화(data viz) 차트(chart)

**❌ 과도한 아이콘 그래픽(over-iconography)**
모든 제목/기능(feature)/섹션(section)에 아이콘이 필요한 것은 아닙니다. 아이콘을 남용하면 인터페이스가 장난감처럼 보입니다. 적을수록 더 좋습니다(Less is more).

**❌ "데이터 슬롭(Data slop)"**
꾸며낸 통계(decorative stats):
- "10,000+ happy customers" (실제로 있는지도 모름)
- "99.9% uptime" (진짜 데이터가 없으면 쓰지 마세요)
- 아이콘+숫자+단어로 구성된 장식용 "지표 카드(metric cards)"
- 모의 테이블(mock table) 안의 가짜 데이터를 화려하게 꾸며 놓기

진짜 데이터가 없다면 플레이스홀더(placeholder)를 남겨두거나 사용자에게 요청하세요.

**❌ "인용 슬롭(Quote slop)"**
꾸며낸 사용자 리뷰나 유명인 명언으로 페이지를 장식하지 마세요. 플레이스홀더를 남겨두고 사용자에게 진짜 인용문(quote)을 요청하세요.

### 타이포그래피( typography) 함정

**❌ 피해야 할 흔한 폰트**:
- Inter (AI가 생성한 웹사이트의 기본값)
- Roboto
- Arial / Helvetica
- 순수 시스템 폰트 스택(pure system font stack)
- Fraunces (AI가 이 폰트를 발견한 뒤 남용하고 있음)
- Space Grotesk (최근 AI의 최애 폰트)

**✅ 개성 있는 디스플레이(display)+본문(body) 조합을 사용하세요**. 영감을 줄 방향:
- 세리프(serif) 디스플레이 + 산세리프(sans-serif) 본문 (에디토리얼 느낌, editorial feel)
- 모노(mono) 디스플레이 + 산세리프(sans) 본문 (기술적 느낌, technical feel)
- 굵은 디스플레이(heavy display) + 가벼운 본문(light body) (대비, contrast)
- 가변 폰트(variable font)로 히어로(hero)의 굵기 애니메이션

폰트 리소스:
- Google Fonts의 덜 알려진 좋은 선택지(Instrument Serif, Cormorant, Bricolage Grotesque, JetBrains Mono)
- 오픈소스 폰트 사이트(Fraunces의 형제 폰트, Adobe Fonts)
- 폰트 이름을 공상으로 지어내지 마세요

### 색상 함정

**❌ 공상으로 색상 지어내기**
처음부터 낯선 색상 체계를 디자인하지 마세요. 보통 조화롭지 않습니다.

**✅ 전략**:
1. 브랜드색이 있다 → 브랜드색을 사용하고, 부족한 컬러 토큰(color token)은 oklch 보간으로 채우기
2. 브랜드색은 없지만 참고 자료가 있다 → 참고 제품 스크린샷에서 색상을 추출(색을 빨아들이기, color pick)
3. 완전히 처음부터 시작한다 → 알려진 색상 시스템(known color system)을 선택하세요(Radix Colors / Tailwind 기본 팔레트(palette) / Anthropic 브랜드). 직접 조절하지 마세요

**oklch로 색상을 정의하는 것**이 가장 현대적인 방법입니다:
```css
:root {
  --primary: oklch(0.65 0.18 25);      /* 따뜻한 테라코타(terracotta) */
  --primary-light: oklch(0.85 0.08 25); /* 같은 계열의 밝은 색 */
  --primary-dark: oklch(0.45 0.20 25);  /* 같은 계열의 어두운 색 */
}
```
oklch는 밝기를 조절할 때 색상이 변하지 않도록 보장하므로, hsl보다 유용합니다.

**❌ 다크 모드(dark mode)를 대충 반전시키기**
색상을 단순히 반전(invert)하는 것이 아닙니다. 좋은 다크 모드는 채도(saturation), 대비(contrast), 강조색(accent color)을 다시 조정해야 합니다. 다크 모드를 하기 싫다면 그냥 하지 마세요.

### 레이아웃(Layout) 함정

**❌ 벤토 그리드(Bento grid) 과잉**
AI가 생성하는 모든 랜딩 페이지(landing page)가 벤토를 하려고 합니다. 당신의 정보 구조(information structure)가 실제로 벤토에 적합하지 않다면 다른 레이아웃을 사용하세요.

**❌ 큰 히어로(large hero) + 3열 기능 소개(3-column features) + 사용자 평가(testimonials) + CTA**
이 랜딩 페이지 템플릿은 너무 남용되었습니다. 혁신을 원한다면 진짜 혁신을 하세요.

**❌ 카드 그리드(card grid) 안의 모든 카드가 똑같이 생김**
비대칭(asymmetric), 크기가 다른 카드, 이미지가 있는 것도 있고 텍스트만 있는 것도 있고, 열을 걸쳐 있는 것도 있어야 합니다——이것이야말로 진짜 디자이너가 한 것처럼 보입니다.

## 콘텐츠 기준

### 1. 채우기용 콘텐츠(filler content)를 추가하지 마세요

모든 요소는 그 자리를 얻어야(earn its place) 합니다. 공백은 디자인 문제이며, **구도**(대비, 리듬, 여백)로 해결하고, **콘텐츠로 채우는 것**으로 해결하지 마세요.

**채우기인지 판단하는 질문**:
- 이 콘텐츠를 빼면 디자인이 나빠지나요? 답이 "아니오"라면 빼세요.
- 이 요소가 어떤 진짜 문제를 해결하나요? 만약 "페이지가 너무 비어 보여서"라면 삭제하세요.
- 이 통계/인용문/기능에 진짜 데이터가 뒷받침되나요? 없으면 공상으로 쓰지 마세요.

「One thousand no's for every yes」.

### 2. 소재를 추가하기 전에 먼저 물어보세요

한 단락/한 페이지/한 섹션을 더 추가하면 더 나을 것 같다고 생각하나요? 먼저 사용자에게 물어보고, 일방적으로 추가하지 마세요.

이유:
- 사용자는 자신의 타겟 오디언스(audience)를 당신보다 잘 압니다
- 콘텐츠 추가에는 비용이 들며, 사용자가 원하지 않을 수도 있습니다
- 일방적인 콘텐츠 추가는 "주니어 디자이너가 보고하는" 관계를 어깁니다

### 3. 처음부터 시스템을 만들어 두세요

디자인 맥락(design context)을 탐색한 후, **먼저 구두로 사용할 시스템을 말하고**, 사용자가 확인하도록 하세요:

```markdown
제 디자인 시스템:
- 색상: #1A1A1A 본문 + #F0EEE6 배경 + #D97757 강조색(당신의 브랜드에서 가져옴)
- 서체: Instrument Serif를 디스플레이(display)용으로 + Geist Sans를 본문(body)용으로
- 리듬: 섹션 제목(section title)은 풀 블리드(full-bleed) 컬러 배경 + 흰 글씨; 일반 섹션은 흰 배경
- 이미지: 히어로(hero)는 풀 블리드(full-bleed) 사진, 기능 섹션은 당신이 제공할 때까지 플레이스홀더(placeholder)
- 배경색은 최대 2가지만 사용하여 산만함 방지

이 방향을 확인해 주시면 바로 시작하겠습니다.
```

사용자가 확인한 뒤에 손을 대세요. 이 확인(check-in)은 "반쯤 하다가 방향이 틀렸다는 걸 발견"하는 것을 막아줍니다.

## 스케일(Scale) 규격

### 슬라이드(1920×1080)

- 본문 최소 **24px**, 이상적으론 28-36px
- 제목 60-120px
- 섹션 제목(Section title) 80-160px
- 히어로 헤드라인(Hero headline)은 180-240px의 큰 글씨를 사용할 수 있음
- 슬라이드에서는 절대 24px보다 작은 글씨를 쓰지 마세요

### 인쇄 문서

- 본문 최소 **10pt** (≈13.3px), 이상적으론 11-12pt
- 제목 18-36pt
- 캡션(Caption) 8-9pt

### 웹과 모바일

- 본문 최소 **14px** (노년층 친화적으론 16px)
- 모바일 본문 **16px** (iOS 자동 확대(auto-zoom) 방지)
- 히트 타겟(hit target, 클릭 가능한 요소) 최소 **44×44px**
- 행 높이(line-height) 1.5-1.7 (중문 1.7-1.8)

### 대비(Contrast)

- 본문 vs 배경 **최소 4.5:1** (WCAG AA)
- 큰 글씨 vs 배경 **최소 3:1**
- Chrome DevTools의 접근성(accessibility) 도구로 확인하세요

## CSS 필살기

**고급 CSS 기능**은 디자이너의 좋은 친구입니다. 과감하게 사용하세요:

### 타이포그래피(Typography)

```css
/* 제목 줄바꿈을 더 자연스럽게, 마지막 줄에 외톨이 단어가 남지 않도록 */
h1, h2, h3 { text-wrap: balance; }

/* 본문 줄바꿈, 과부(寡婦)와 고아(orphan) 방지 */
p { text-wrap: pretty; }

/* 중문 타이포그래피 필살기: 문장 부호 압박, 행首行尾 제어 */
p { 
  text-spacing-trim: space-all;
  hanging-punctuation: first;
}
```

### 레이아웃(Layout)

```css
/* CSS 그리드(Grid) + 네임드 영역(named areas) = 가독성 폭발 */
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
}

/* 서브그리드(subgrid)로 카드 내용 정렬 */
.card { display: grid; grid-template-rows: subgrid; }
```

### 시각 효과

```css
/* 디자인 감각 있는 스크롤바 */
* { scrollbar-width: thin; scrollbar-color: #666 transparent; }

/* 글래스모피즘(glassmorphism, 절제 있게 사용) */
.glass {
  backdrop-filter: blur(20px) saturate(150%);
  background: color-mix(in oklch, white 70%, transparent);
}

/* 뷰 트랜지션(View Transitions) API로 페이지 전환을 부드럽게 */
@view-transition { navigation: auto; }
```

### 인터랙션(Interaction)

```css
/* :has() 선택자로 조건부 스타일링이 쉬워집니다 */
.card:has(img) { padding-top: 0; } /* 이미지가 있는 카드는 상단 패딩 없음 */

/* 컨테이너 쿼리(container queries)로 컴포넌트가 진짜 반응형이 됩니다 */
@container (min-width: 500px) { ... }

/* 새로운 color-mix 함수 */
.button:hover {
  background: color-mix(in oklch, var(--primary) 85%, black);
}
```

## 의사결정 빠른 참조: 당신이 망설일 때

- 그라데이션을 추가하고 싶나요? → 아마 추가하지 마세요
- 이모지를 추가하고 싶나요? → 추가하지 마세요
- 카드에 둥근 모서리+왼쪽 볼더 강조색을 주고 싶나요? → 주지 마세요, 다른 방법을 쓰세요
- SVG로 히어로 일러스트(hero illustration)를 그리고 싶나요? → 그리지 마세요, 플레이스홀더(placeholder)를 쓰세요
- 인용문(quote) 한 단락을 장식으로 추가하고 싶나요? → 먼저 사용자에게 진짜 인용문이 있는지 물어보세요
- 아이콘 기능(icon features) 한 줄을 추가하고 싶나요? → 먼저 아이콘이 필요한지 물어보세요, 아마 필요 없을 수도 있습니다
- Inter를 쓰고 싶나요? → 더 개성 있는 폰트로 바꾸세요
- 보라색 그라데이션을 쓰고 싶나요? → 근거 있는 색상 조합으로 바꾸세요

**"추가하면 더 예쁠 것 같다"고 생각할 때——그것이 보통 AI 슬롭(AI slop)의 징조입니다**. 가장 간결한 버전부터 먼저 하고, 사용자가 요청할 때만 추가하세요.
