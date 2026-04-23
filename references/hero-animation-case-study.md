# Gallery Ripple + Multi-Focus · 씬(Scene) 오케스트레이션 철학

> huashu-design 히어로(Hero) 애니메이션 v9(25초, 8개 씬)에서 추출한 **재사용 가능한 시각적 오케스트레이션 구조**입니다.
> 애니메이션 제작 파이프라인이 아니라, **어떤 상황에서 이런 오케스트레이션이 "옳은" 선택인지**를 다룹니다.
> 실전 참고: [demos/hero-animation-v9.mp4](../demos/hero-animation-v9.mp4) · [https://www.huasheng.ai/huashu-design-hero/](https://www.huasheng.ai/huashu-design-hero/)

## 한 줄 요약

> **20개 이상의 동질적인 시각 자료가 있고, 씬에서 "규모감과 깊이"를 표현해야 할 때, 무작위 배치 대신 Gallery Ripple + Multi-Focus 오케스트레이션을 우선 고려하세요.**

일반적인 SaaS 기능 애니메이션, 제품 론칭(Launch), 스킬(Skill) 프로모션, 연작 포트폴리오 전시 등——자료 수가 충분하고 스타일이 통일되어 있다면, 이 구조는 거의 항상 효과를 냅니다.

---

## 이 기법이 실제로 전달하는 것

"자료를 과시한다"가 아니라, **두 가지 리듬 변화**로 서사를 전달합니다:

**첫 번째 박자 · Ripple 펼침(~1.5초)**: 중심에서 사방으로 48장의 카드가 퍼져 나갑니다. 관객은 "양"에 압도됩니다——「아, 이건 이렇게 많은 결과물을 낼 수 있구나」.

**두 번째 박자 · Multi-Focus(~8초, 4회 반복)**: 침era가 천천히 pan하면서, 4번에 걸쳐 배경을 dim + desaturate하고 특정 카드를 화면 중앙에 단독 확대합니다——관객은 "양의 충격"에서 "질의 응시"로 전환되며, 매번 1.7초의 안정적인 리듬을 경험합니다.

**핵심 서사 구조**: **규모(Ripple) → 응시(Focus × 4) → 희미한 소멸(Walloff)**. 이 세 박자가 합쳐져 「Breadth × Depth」를 표현합니다——많이 만들 수 있을 뿐 아니라, 각각이 멈춰서 볼 가치가 있다는 것을 보여줍니다.

반대 사례와 비교합니다:

| 접근 방식 | 관객의 인식 |
|-----------|------------|
| 48장의 카드를 정적 배열(Ripple 없음) | 예쁘지만 서사가 없음, 단순한 그리드 스크린샷처럼 보임 |
| 한 장씩 빠르게 전환(Gallery 맥락 없음) | 슬라이드쇼(Slideshow)처럼 보여 "규모감"을 잃음 |
| Ripple만 있고 Focus가 없음 | 압도되지만 구체적으로 어떤 한 장도 기억되지 않음 |
| **Ripple + Focus × 4(본 레시피)** | **먼저 양에 놀라고, 다시 질에 응시하며, 마지막엔 평온하게 사라짐——완전한 감정 곡선** |

---

## 전제 조건(모두 충족해야 함)

이 오케스트레이션은 **만능이 아닙니다**. 아래 4가지는 반드시 필요합니다:

1. **자료 규모 ≥ 20장, 가능하면 30장 이상**
   20장 미만이면 Ripple이 "텅 빈" 느낌을 줍니다——48칸 모두 움직여야 밀도감이 생깁니다. v9에서는 48칸 × 32장 이미지(순환 채움)를 사용했습니다.

2. **자료의 시각적 스타일이 통일**
   모두 16:9 슬라이드 미리보기 / 모두 앱 스크린샷 / 모두 표지 디자인——가로세로 비율, 색조, 레이아웃이 "한 세트"처럼 보여야 합니다. 혼합하면 Gallery가 임시 붙여넣기판처럼 보입니다.

3. **자료를 단독 확대필 때에도 가독성 있는 정보가 남음**
   Focus는 특정 카드를 960px 폭으로 확대합니다. 원본이 확대 후 흐려지거나 정보가 희박하면 Focus 박자가 망가집니다. 역으로 검증해 보세요: 48장 중 4장을 "가장 대표적인" 것으로 꼽을 수 있나요? 꼽기 어렵다면 자료 품질이 고르지 않다는 뜻입니다.

4. **씬 자체가 가로(Landscape) 또는 정사각형(Square), 세로가 아님**
   Gallery의 3D 기울기(`rotateX(14deg) rotateY(-10deg)`)는 가로 방향의 확장감이 필요합니다. 세로 화면에서는 기울기 효과가 좁고 어색하게 보입니다.

**조건 미충족 시 대안 경로**:

| 부족한 조건 | 대체 방안 |
|-------------|-----------|
| 자료 < 20장 | 「3–5장 병렬 정적 전시 + 순차 focus」로 변경 |
| 스타일 불일치 | 「표지 + 3개 챕터 대형 이미지」 키노트 스타일(Keynote-style)로 변경 |
| 정보 희박 | 「데이터 기반 대시보드(Data-driven dashboard)」 또는 「핵심 문구 + 큰 글씨」로 변경 |
| 세로 화면 | 「vertical scroll + sticky cards」로 변경 |

---

## 기술 레시피(v9 실전 파라미터)

### 4-Layer 구조

```
viewport (1920×1080, perspective: 2400px)
  └─ canvas (4320×2520, 초대형 overflow) → 3D tilt + pan
      └─ 8×6 grid = 48 cards (gap 40px, padding 60px)
          └─ img (16:9, border-radius 9px)
      └─ focus-overlay (absolute center, z-index 40)
          └─ img (matches selected slide)
```

**핵심**: canvas는 viewport보다 2.25배 큽니다. 이래야 pan 시 "더 넓은 세계를 엿보는" 느낌이 생깁니다.

### Ripple 펼침(거리 기반 지연 알고리즘)

```js
// 각 카드의 입장 시간 = 중심으로부터의 거리 × 0.8초 지연
const col = i % 8, row = Math.floor(i / 8);
const dc = col - 3.5, dr = row - 2.5;       // 중심으로부터의 offset
const dist = Math.hypot(dc, dr);
const maxDist = Math.hypot(3.5, 2.5);
const delay = (dist / maxDist) * 0.8;       // 0 → 0.8s
const localT = Math.max(0, (t - rippleStart - delay) / 0.7);
const opacity = expoOut(Math.min(1, localT));
```

**핵심 파라미터**:
- 총 지속 시간 1.7초(`T.s3_ripple: [8.3, 10.0]`)
- 최대 지연 0.8초(중심이 가장 먼저, 모서리가 가장 나중)
- 각 카드 입장 지속 시간 0.7초
- Easing: `expoOut`(폭발감, 부드러움 아님)

**동시에 수행**: canvas scale이 1.25 → 0.94로 변화(zoom out to reveal)——나타나는 것과 동기화된 멀어지는 감각을 연출합니다.

### Multi-Focus(4회 리듬)

```js
T.focuses = [
  { start: 11.0, end: 12.7, idx: 2  },  // 1.7s
  { start: 13.3, end: 15.0, idx: 3  },  // 1.7s
  { start: 15.6, end: 17.3, idx: 10 },  // 1.7s
  { start: 17.9, end: 19.6, idx: 16 },  // 1.7s
];
```

**리듬 규칙**: 각 focus 1.7초, 간격 0.6초 휴식. 총 8초(11.0–19.6s).

**각 focus 내부**:
- In ramp: 0.4초(`expoOut`)
- Hold: 중간 0.9초(`focusIntensity = 1`)
- Out ramp: 0.4초(`easeOut`)

**배경 변화(핵심)**:

```js
if (focusIntensity > 0) {
  const dimOp = entryOp * (1 - 0.6 * focusIntensity);  // dim to 40%
  const brt = 1 - 0.32 * focusIntensity;                // brightness 68%
  const sat = 1 - 0.35 * focusIntensity;                // saturate 65%
  card.style.filter = `brightness(${brt}) saturate(${sat})`;
}
```

**opacity만 조정하는 게 아니라, 동시에 desaturate + darken을 수행합니다**. 이래야 전경 overlay의 색상이 "튀어나오는" 느낌이 들고, 단순히 "약간 밝아지는" 수준에 그치지 않습니다.

**Focus overlay 크기 애니메이션**:
- 400×225(입장) → 960×540(hold 상태)
- 외곽에 3겹 shadow + 3px accent 색 outline ring이 있어 "프레임 안에 담긴" 느낌을 줍니다.

### Pan(정지 상태가 지루하지 않도록 지속적인 움직임)

```js
const panT = Math.max(0, t - 8.6);
const panX = Math.sin(panT * 0.12) * 220 - panT * 8;
const panY = Math.cos(panT * 0.09) * 120 - panT * 5;
```

- 사인파(Sine wave) + 선형 drift 이중 움직임——순수 반복이 아니라 매 순간 위치가 다릅니다.
- X/Y 주파수가 다름(0.12 vs 0.09)——시각적으로 "규칙적인 반복"을 인지하지 못하게 합니다.
- ±900/500px 내에서 clamp——화면 밖으로 나가지 않도록 제한합니다.

**왜 순수 선형 pan을 쓰지 않나요**: 순수 선형이면 관객이 "다음 초에 어디 있을지" 예측합니다. 사인+drift는 매 초가 새로워, 3D 기울기 아래서 "미세한 멀미감"(긍정적인 의미)을 만들어 주의를 붙잡아 둡니다.

---

## 5가지 재사용 가능한 패턴(v6→v9 반복에서 증류)

### 1. **주 easing으로 expoOut 사용, cubicOut 아님**

`easeOut = 1 - (1-t)³`(부드러움) vs `expoOut = 1 - 2^(-10t)`(폭발 후 급격한 수렴).

**선택 이유**: expoOut은 전 30% 구간에서 빠르게 90%에 도달해, 물리적 감쇠처럼 "무거운 것이 떨어지는" 직관에 부합합니다. 특히 다음에 적합합니다:
- 카드 입장(무게감)
- Ripple 확산(충격파)
- 브랜드(Brand) 부상(안착감)

**언제 여전히 cubicOut을 쓰나요**: focus out ramp, 대칭적인 미세 모션 등.

### 2. **종이 질감 배경 + 테라코타 오렌지(Terracotta Orange) 액센트(Anthropic 계보)**

```css
--bg: #F7F4EE;        /* 따뜻한 종이 */
--ink: #1D1D1F;       /* 거의 검정 */
--accent: #D97757;    /* 테라코타 오렌지 */
--hairline: #E4DED2;  /* 따뜻한 선 */
```

**이유**: 따뜻한 배경색은 GIF 압축 후에도 "호흡감"을 유지하며, 순백색의 "화면 느낌"은 피할 수 있습니다. 테라코타 오렌지는 유일한 액센트로 terminal prompt, dir-card 선택, cursor, brand hyphen, focus ring 등에 일관되게 사용됩니다——모든 시각적 앵커(Anchor)가 이 하나의 색으로 연결됩니다.

**v5 교훈**: 종이 질감을模방하기 위해 noise overlay를 추가했으나, GIF 프레임 압축이 완전히 망가졌습니다(매 프레임이 달라짐). v6에서는 "배경색 + 따뜻한 shadow만" 사용해 종이 질감의 90%를 유지하면서 GIF 용량을 60% 줄였습니다.

### 3. **두 단계 Shadow로 깊이를 모방, 진짜 3D는 쓰지 않음**

```css
.gallery-card.depth-near { box-shadow: 0 32px 80px -22px rgba(60,40,20,0.22), ... }
.gallery-card.depth-far  { box-shadow: 0 14px 40px -16px rgba(60,40,20,0.10), ... }
```

`sin(i × 1.7) + cos(i × 0.73)` 결정적 알고리즘으로 각 카드에 near/mid/far 3단계 shadow를 할당합니다——**시각적으로는 "3차원 적층" 느낌이 들지만, 매 프레임 transform은 전혀 변하지 않아 GPU 소모가 0**입니다.

**진짜 3D의 대가**: 각 카드마다 개별 `translateZ`를 사용하면, GPU가 매 프레임 48개의 transform + shadow blur를 계산해야 합니다. v4에서 시도했을 때 Playwright 녹화가 25fps조차 버거웠습니다. v6의 두 단계 shadow는 육안 효과 차이가 5% 미만이지만, 비용은 10배 차이입니다.

### 4. **글자 두께 변화(font-variation-settings)가 글자 크기 변화보다 영화감 있음**

```js
const wght = 100 + (700 - 100) * morphP;  // 100 → 700 over 0.9s
wordmark.style.fontVariationSettings = `"wght" ${wght.toFixed(0)}`;
```

브랜드 워드마크(Wordmark)가 Thin → Bold로 0.9초에 걸쳐 변화하며, letter-spacing 미세 조정(-0.045 → -0.048em)이 함께합니다.

**왜 크기 조절보다 나은가**:
- 크기 조절은 너무 많이 봐서 예측이 고정됨
- 글자 두께 변화는 "내적인 충만함"으로, 풍선이 부풀어 오르는 느낌이지 "밀려오는" 느낌이 아님
- variable fonts는 2020년 이후 보급된 특성이라, 관객은 무의식적으로 "현대적"이라고 느낌

**제한**: variable font를 지원하는 서체(Inter/Roboto Flex/Recursive 등)를 사용해야 합니다. 일반 정적 서체는 모방만 가능하며(고정 weight 몇 개를 전환하면 끊김이 생김).

### 5. **코너 브랜드(Corner Brand) 저강도 지속 서명**

Gallery 단계 좌측 상단에 `HUASHU · DESIGN` 소형 로고가 있으며, 16% opacity, 12px 글자 크기, 넓은 자간을 사용합니다.

**이것을 추가한 이유**:
- Ripple 폭발 후 관객이 "초점을 잃어" 무엇을 보고 있는지 잊기 쉬운데, 좌측 상단의 가벼운 표시가 anchor를 돕습니다.
- 전체 화면 대형 로고보다 고급스러움——브랜딩을 아는 사람은 브랜드 서명이 소리 칠 필요가 없다는 것을 압니다.
- GIF가 스크린샷으로 공유될 때에도归属性 신호를 남깁니다.

**규칙**: 중간 단계(화면이 복잡할 때)에만 나타나며, 오프닝(터미널을 가리지 않음)과 엔딩(brand reveal가 주인공)에서는 숨깁니다.

---

## 반대 사례: 언제 이 오케스트레이션을 쓰지 말아야 할까

**❌ 제품 데모(기능을 보여줘야 할 때)**: Gallery는 각 장이 스쳐 지나가므로 관객이 어떤 기능도 기억하지 못합니다. 「단일 화면 focus + 툴팁(Tooltip) 표시」를 대신 사용하세요.

**❌ 데이터 기반 콘텐츠**: 관객이 숫자를 읽어야 하는데, Gallery의 빠른 리듬은 읽을 시간을 주지 않습니다. 「데이터 차트 + 순차 reveal」을 대신 사용하세요.

**❌ 스토리 서사**: Gallery는 "병렬" 구조인데, 이야기에는 "인과"가 필요합니다. 키노트(Keynote) 챕터 전환을 대신 사용하세요.

**❌ 자료가 3–5장뿐일 때**: Ripple 밀도가 부족해 "덧대어 놓은 것"처럼 보입니다. 「정적 배열 + 순차 강조」를 대신 사용하세요.

**❌ 세로 화면(9:16)**: 3D tilt는 가로 확장감이 필요하며, 세로에서는 기울기가 "펼쳐짐"이 아니라 "삐뚤어짐"으로 느껴집니다.

---

## 당신의 작업에 이 오케스트레이션이 맞는지 판단하는 법

세 단계 빠른 점검:

**Step 1 · 자료 수량**: 동종 시각 자료가 몇 장인지 세 보세요. < 15 → 중단; 15–25 → 보충; 25+ → 바로 적용.

**Step 2 · 일관성 테스트**: 무작위로 4장의 자료를 나란히 배치했을 때 "한 세트"처럼 보이나요? 아니라면 스타일을 먼저 통일하거나 다른 방안을 고려하세요.

**Step 3 · 서사 매칭**: 당신이 표현하려는 것이 「Breadth × Depth」(양 × 질)인가요? 아니면 「프로세스」「기능」「이야기」인가요? 전자가 아니라면 억지로 적용하지 마세요.

세 단계 모두 yes라면, v6 HTML을 바로 fork하고 `SLIDE_FILES` 배열과 타임라인만 수정해 재사용하세요. 팔레트는 `--bg / --accent / --ink`만 바꾸면 전체가 겉모습만 바뀌고 뼈대는 그대로입니다.

---

## 관련 Reference

- 완전한 기술 흐름: [references/animations.md](animations.md) · [references/animation-best-practices.md](animation-best-practices.md)
- 애니메이션 내보내기 파이프라인: [references/video-export.md](video-export.md)
- 오디오 설정(BGM + SFX 이중 트랙): [references/audio-design-rules.md](audio-design-rules.md)
- Apple 갤러리 스타일 가로 참고: [references/apple-gallery-showcase.md](apple-gallery-showcase.md)
- 원본 HTML(v6 + 오디오 통합판): `www.huasheng.ai/huashu-design-hero/index.html`
