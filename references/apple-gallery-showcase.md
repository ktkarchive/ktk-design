# Apple Gallery Showcase · 갤러리 전시墙 애니메이션 스타일

> 영감 출처: Claude Design 공식 사이트 hero 비디오 + Apple 제품 페이지 '작품墙'식 배열
> 실전 출처: huashu-design 발표 hero v5
> 적용 상황: **제품 발표 hero 애니메이션, skill 능력 시연, 포트폴리오 전시**——여러 개의 고품질 결과물을 동시에 보여주며 관객의 시선을 유도해야 하는 모든 상황

---

## 트리거 판단: 언제 이 스타일을 쓸 것인가

**적합**:
- 10장 이상의 실제 결과물을 동일 화면에 보여줘야 할 때 (PPT, App, 웹페이지, 인포그래픽)
- 관객이 전문 대상(개발자, 디자이너, 프로덕트 매니저)이며 '질감'에 민감할 때
- 전달하고자 하는 분위기가 '절제, 전시식, 고급, 공간감'일 때
- 포커스와 전체가 동시에 존재해야 할 때(디테일을 보지만 전체를 잃지 않음)

**부적합**:
- 단일 제품 집중(frontend-design의 제품 hero 템플릿 사용)
- 감정 중심/스토리텔링 중심 애니메이션(타임라인 낟엇 템플릿 사용)
- 소형 화면 / 세로 화면(기울어진 시각이 작은 화면에서는 흐릿해짐)

---

## 핵심 비주얼 토큰(Token)

```css
:root {
  /* 밝은 갤러리 팔레트 */
  --bg:         #F5F5F7;   /* 메인 캔버스 배경 — Apple 공식 그레이 */
  --bg-warm:    #FAF9F5;   /* 따뜻한 오프화이트 변형 */
  --ink:        #1D1D1F;   /* 메인 텍스트 색 */
  --ink-80:     #3A3A3D;
  --ink-60:     #545458;
  --muted:      #86868B;   /* 보조 텍스트 */
  --dim:        #C7C7CC;
  --hairline:   #E5E5EA;   /* 카드 1px 테두리 */
  --accent:     #D97757;   /* 테라코타 오렌지 — Claude 브랜드 */
  --accent-deep:#B85D3D;

  --serif-cn: "Noto Serif SC", "Songti SC", Georgia, serif;
  --serif-en: "Source Serif 4", "Tiempos Headline", Georgia, serif;
  --sans:     "Inter", -apple-system, "PingFang SC", system-ui;
  --mono:     "JetBrains Mono", "SF Mono", ui-monospace;
}
```

**핵심 원칙**:
1. **절대 순수 검정 배경을 쓰지 마라**. 검정 배경은 작품이 영화처럼 보이고, '채택될 수 있는 작업 결과'처럼 보이지 않는다
2. **테라코타 오렌지는 유일한 색상 액센트(accent)**이며, 나머지는 전부 그레이스케일 + 화이트
3. **세 가지 폰트 스택**(serif 영어+serif 중국어+sans+mono)으로 '출판물'이 아닌 '인터넷 제품'의 분위기를 연출

---

## 핵심 레이아웃 패턴

### 1. 플로팅 카드(전체 스타일의 기본 단위)

```css
.gallery-card {
  background: #FFFFFF;
  border-radius: 14px;
  padding: 6px;                          /* 내측 여백은 '장식용 마트' */
  border: 1px solid var(--hairline);
  box-shadow:
    0 20px 60px -20px rgba(29, 29, 31, 0.12),   /* 메인 그림자, 부드럽고 길게 */
    0 6px 18px -6px rgba(29, 29, 31, 0.06);     /* 두 번째 근거리 빛, 플로팅 느낌 생성 */
  aspect-ratio: 16 / 9;                  /* 통일된 슬라이드 비율 */
  overflow: hidden;
}
.gallery-card img {
  width: 100%; height: 100%;
  object-fit: cover;
  border-radius: 9px;                    /* 카드 라운드보다 약간 작게, 시각적 중첩 */
}
```

**반면교사**: 테두리 없는 타일(패딩 없음/테두리 없음/그림자 없음)은 붙이지 마라——그건 인포그래픽 밀도 표현이지 전시가 아니다.

### 2. 3D 기울기 작품墙

```css
.gallery-viewport {
  position: absolute; inset: 0;
  overflow: hidden;
  perspective: 2400px;                   /* 깊은 투시, 기울기가 과장되지 않음 */
  perspective-origin: 50% 45%;
}
.gallery-canvas {
  width: 4320px;                         /* 캔버스 = 2.25× 뷰포트 */
  height: 2520px;                        /* pan 공간 확보 */
  transform-origin: center center;
  transform: perspective(2400px)
             rotateX(14deg)              /* 뒤로 기울기 */
             rotateY(-10deg)             /* 왼쪽으로 회전 */
             rotateZ(-2deg);             /* 약간 기울기, 너무 정돈된 느낌 제거 */
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 40px;
  padding: 60px;
}
```

**파라미터 스위트 스팟(sweet spot)**:
- rotateX: 10-15deg(더 많으면 VIP 파티 배경판처럼 보임)
- rotateY: ±8-12deg(좌우 대칭감)
- rotateZ: ±2-3deg('이건 기계가 놓은 게 아니다'라는 인간미)
- perspective: 2000-2800px(2000 미만은 어안 효과, 3000 초과는 정투시에 가까움)

### 3. 2×2 사각 모으기(선택 장면)

```css
.grid22 {
  display: grid;
  grid-template-columns: repeat(2, 800px);
  gap: 56px 64px;
  align-items: start;
}
```

각 카드가 해당 모서리(tl/tr/bl/br)에서 중앙으로 슬라이드 인 + 페이드 인. 해당 `cornerEntry` 벡터:

```js
const cornerEntry = {
  tl: { dx: -700, dy: -500 },
  tr: { dx:  700, dy: -500 },
  bl: { dx: -700, dy:  500 },
  br: { dx:  700, dy:  500 },
};
```

---

## 다섯 가지 핵심 애니메이션 패턴

### 패턴 A · 사각 모으기(0.8-1.2s)

4개 요소가 뷰포트 사각에서 슬라이드 인, 동시에 스케일 0.85→1.0, 대응 ease-out. '여러 방향의 선택지 보여주기' 오프닝에 적합.

```js
const inP = easeOut(clampLerp(t, start, end));
card.style.transform = `translate3d(${(1-inP)*ce.dx}px, ${(1-inP)*ce.dy}px, 0) scale(${0.85 + 0.15*inP})`;
card.style.opacity = inP;
```

### 패턴 B · 선택 확대 + 나머지 슬라이드 아웃(0.8s)

선택된 카드가 확대 1.0→1.28, 나머지 카드는 페이드 아웃 + 블러 + 사각으로 표류 복귀:

```js
// 선택됨
card.style.transform = `translate3d(${cellDx*outP}px, ${cellDy*outP}px, 0) scale(${1 + 0.28*easeOut(zoomP)})`;
// 미선택
card.style.opacity = 1 - outP;
card.style.filter = `blur(${outP * 1.5}px)`;
```

**핵심**: 미선택 항목은 페이드만 하지 말고 블러(blur)를 줘라. 블러가 피사계 심도를 모방하여 시각적으로 선택된 항목을 '튀어나오게' 한다.

### 패턴 C · Ripple 물결 전개(1.7s)

중앙에서 바깥으로, 거리에 따라 delay, 각 카드가 순차적으로 페이드 인 + 1.25x에서 0.94x로 축소('줌 아웃'):

```js
const col = i % COLS, row = Math.floor(i / COLS);
const dc = col - (COLS-1)/2, dr = row - (ROWS-1)/2;
const dist = Math.sqrt(dc*dc + dr*dr);
const delay = (dist / maxDist) * 0.8;
const localT = Math.max(0, (t - rippleStart - delay) / 0.7);
card.style.opacity = easeOut(Math.min(1, localT));

// 동시에 전체 스케일 1.25→0.94
const galleryScale = 1.25 - 0.31 * easeOut(rippleProgress);
```

### 패턴 D · Sinusoidal Pan(지속 표류)

사인파 + 선형 표류 조합으로, 마키(marquee)처럼 '시작과 끝이 있는' 반복감을 피함:

```js
const panX = Math.sin(panT * 0.12) * 220 - panT * 8;    // 가로 왼쪽 표류
const panY = Math.cos(panT * 0.09) * 120 - panT * 5;    // 세로 위쪽 표류
const clampedX = Math.max(-900, Math.min(900, panX));   // 가장자리 노출 방지
```

**파라미터**:
- 사인파 주기 `0.09-0.15 rad/s`(느림, 약 30-50초당 한 번 흔들림)
- 선형 표류 `5-8 px/s`(관객 눈 깜빡임보다 느림)
- 진폭 `120-220 px`(느껴질 만큼 크지만 어지럽지 않을 만큼 작음)

### 패턴 E · Focus Overlay(포커스 전환)

**핵심 디자인**: focus overlay는 **평면 요소**(기울어지지 않음)로, 기울어진 캔버스 위에 떠 있다. 선택된 슬라이드가 타일 위치(약 400×225)에서 화면 중앙(960×540)으로 확대되고, 배경 캔버스는 기울기 변화 없이 **45%로 어두워짐**:

```js
// Focus overlay (평면, 중앙)
focusOverlay.style.width = (startW + (endW - startW) * focusIntensity) + 'px';
focusOverlay.style.height = (startH + (endH - startH) * focusIntensity) + 'px';
focusOverlay.style.opacity = focusIntensity;

// 배경 카드 어둡게, 하지만 여전히 보임(핵심! 100% 마스크 금지)
card.style.opacity = entryOp * (1 - 0.55 * focusIntensity);   // 1 → 0.45
card.style.filter = `brightness(${1 - 0.3 * focusIntensity})`;
```

**선명도 철칙**:
- Focus overlay의 `<img>`는 반드시 `src`로 원본 이미지에 직접 연결하고, **갤러리의 압축 썸네일을 재사용하지 마라**
- 모든 원본 이미지를 `new Image()[]` 배열에 미리 preload
- overlay 자체 `width/height`는 프레임마다 계산하여 브라우저가 매 프레임 원본을 리샘플링하도록

---

## 타임라인 아키텍처(재사용 가능한 골격)

```js
const T = {
  DURATION: 25.0,
  s1_in: [0.0, 0.8],    s1_type: [1.0, 3.2],  s1_out: [3.5, 4.0],
  s2_in: [3.9, 5.1],    s2_hold: [5.1, 7.0],  s2_out: [7.0, 7.8],
  s3_hold: [7.8, 8.3],  s3_ripple: [8.3, 10.0],
  panStart: 8.6,
  focuses: [
    { start: 11.0, end: 12.7, idx: 2  },
    { start: 13.3, end: 15.0, idx: 3  },
    { start: 15.6, end: 17.3, idx: 10 },
    { start: 17.9, end: 19.6, idx: 16 },
  ],
  s4_walloff: [21.1, 21.8], s4_in: [21.8, 22.7], s4_hold: [23.7, 25.0],
};

// 핵심 easing
const easeOut = t => 1 - Math.pow(1 - t, 3);
const easeInOut = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
function lerp(time, start, end, fromV, toV, easing) {
  if (time <= start) return fromV;
  if (time >= end) return toV;
  let p = (time - start) / (end - start);
  if (easing) p = easing(p);
  return fromV + (toV - fromV) * p;
}

// 단일 render(t) 함수가 타임스탬프를 읽고 모든 요소에 쓴다
function render(t) { /* ... */ }
requestAnimationFrame(function tick(now) {
  const t = ((now - startMs) / 1000) % T.DURATION;
  render(t);
  requestAnimationFrame(tick);
});
```

**아키텍처 정수**: **모든 상태는 타임스탬프 t에서 유추**, 상태 머신 없음, setTimeout 없음. 이렇게 하면:
- 임의의 시점 `window.__setTime(12.3)`으로 즉시 점프(플레이어라이트 프레임별 캡처 편의)
- 루프가 자연스럽게 완벽함(t mod DURATION)
- 디버그 시 임의 프레임 동결 가능

---

## 질감 디테일(놓치기 쉽지만 치명적)

### 1. SVG noise texture

밝은 배경이 가장 두려워하는 것은 '너무 평평함'. 극도로 약한 fractalNoise를 오버레이:

```html
<style>
.stage::before {
  content: '';
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.078  0 0 0 0 0.078  0 0 0 0 0.074  0 0 0 0.035 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  opacity: 0.5;
  pointer-events: none;
  z-index: 30;
}
</style>
```

보기에는 차이가 없지만, 없애보면 안다.

### 2. 모서리 브랜드 식별

```html
<div class="corner-brand">
  <div class="mark"></div>
  <div>HUASHU · DESIGN</div>
</div>
```

```css
.corner-brand {
  position: absolute; top: 48px; left: 72px;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
}
```

작품墙 장면에서만 표시되며, 페이드 인/아웃. 마치 미술관 전시 라벨처럼.

### 3. 브랜드 수렴 wordmark

```css
.brand-wordmark {
  font-family: var(--sans);
  font-size: 148px;
  font-weight: 700;
  letter-spacing: -0.045em;   /* 음수 자간이 핵심, 글자를 타이트하게 로고처럼 만듦 */
}
.brand-wordmark .accent {
  color: var(--accent);
  font-weight: 500;           /* accent 문자는 오히려 가늘게, 시각적 차이 */
}
```

`letter-spacing: -0.045em`은 Apple 제품 페이지 대형 글자의 표준 기법이다.

---

## 일반적인 실패 패턴

| 증상 | 원인 | 해결책 |
|---|---|---|
| PPT 템플릿처럼 보임 | 카드에 shadow / hairline 없음 | 두 겹 box-shadow + 1px border 추가 |
| 기울기감이 쌈 | rotateY만 쓰고 rotateZ 없음 | ±2-3deg rotateZ 추가하여 정돈 깨기 |
| Pan이 '끊김'처럼 느껴짐 | setTimeout 또는 CSS keyframes 루프 사용 | rAF + sin/cos 연속 함수 사용 |
| Focus 시 글자 안 보임 | 갤러리 타일의 저해상도 이미지 재사용 | 독립 overlay + 원본 src 직접 연결 |
| 배경이 너무 텅 빔 | 단색 `#F5F5F7` | SVG fractalNoise 0.5 opacity 오버레이 |
| 폰트가 너무 '인터넷' | Inter만 사용 | Serif(중영 각각) + mono 세 스택 추가 |

---

## 참조

- 완전 구현 샘플: `/Users/alchain/Documents/写作/01-公众号写作/项目/2026.04-huashu-design发布/配图/hero-animation-v5.html`
- 원본 영감: claude.ai/design hero 비디오
- 참조 미학: Apple 제품 페이지, Dribbble shot 컬렉션 페이지

'여러 개의 고품질 결과물을 전시'하는 애니메이션 요구가 있을 때, 이 파일의 골격을 직접 복사하고 콘텐츠 교체 + 타이밍 조정만 하면 된다.
