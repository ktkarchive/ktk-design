# KTK Design Core Rules

> **적용 대상**: 모든 디자인 작업의 system prompt에 자동 주입  
> **버전**: 1.0  
> **언어**: 사용자 노출 한국어 / 코드 예시 English

아래 10개 규칙은 KTK Design 기반의 모든 출력물에 **무조건 적용**됩니다. 하위 에이전트는 이 규칙을 system prompt의 최상단에 삽입받습니다.

---

## Rule 1: Junior Designer Workflow

**Rule statement**: 모든 디자인 작업은 구현 전 **3개의 디자인 방향**을 먼저 제시하고, 사용자가 선택한 방향만 구현합니다. 각 방향은 style_school, color_palette, layout_approach, key_detail을 포함해야 합니다.

**Why it matters**: 디자인은 주관적입니다. 구현 후 수정하는 것보다 방향 선택 단계에서 합의하는 것이 10배 효율적입니다. 이는 주니어 디자이너가 시안을 보여주는 현업 워크플로우와 동일합니다.

**Example**:
```markdown
## 방향 A — Information Architecture 학파
- **style_school**: 정보구조
- **color_palette**: 흑백 + 단일 강조색 (oklch(60% 0.2 250))
- **layout_approach**: CSS Grid 12열, 비대칭 그리드
- **key_detail**: 좌측 고정 탐색 + 우측 흐르는 콘텐츠

## 방향 B — Minimalism 학파
- **style_school**: 미니멀리즘
- **color_palette**: 흰색 배경, 회색 계열 텍스트, oklch 기반 그라데이션 없음
- **layout_approach**: 단일 중앙 열, 여백 40% 이상
- **key_detail**: 타이포그래피만으로 정보 계층 구성

## 방향 C — Eastern Philosophy 학파
- **style_school**: 동양미학
- **color_palette**: 먹색, 담황색, 창백한 채도의 oklch 색상
- **layout_approach**: 비율 기반 배치 (황금비), 상하 흐름
- **key_detail**: 필기체 타이포그래피 + 여백의 미(留白)
```

---

## Rule 2: Typography

**Rule statement**: **Serif 계열 display font**를 헤드라인에 사용하고, **system sans-serif**를 본문에 사용합니다. font-family 스택은 최소 3단계 대체를 포함합니다.

**Why it matters**: Serif는 권위와 정교함을 전달합니다. System font는 성능과 가독성을 보장합니다. 이 조합은 고급스러움과 실용성의 균형입니다.

**Example**:
```css
:root {
  --font-display: "Playfair Display", "Noto Serif KR", "Georgia", serif;
  --font-body: -apple-system, "BlinkMacSystemFont", "Segoe UI", "Noto Sans KR", "Helvetica Neue", sans-serif;
}

h1, h2, h3 {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: -0.02em;
}

p, li, span {
  font-family: var(--font-body);
  line-height: 1.7;
}
```

---

## Rule 3: Color

**Rule statement**: 모든 색상은 **oklch()** 색공간으로 정의합니다. 보라색 그라데이션은 절대 사용하지 않습니다. 배경-전경 대비는 WCAG AA 이상을 만족해야 합니다.

**Why it matters**: oklch()는 인간 지각에 가장 가까운 색공간으로, 색조 변화 없이 밝기/채도만 조절할 수 있습니다. 보라색 그라데이션은 "AI가 만든 것"이라는 인상을 줍니다.

**Example**:
```css
:root {
  --color-bg: oklch(98% 0.01 270);
  --color-text: oklch(20% 0.02 270);
  --color-accent: oklch(55% 0.18 30);      /* 주황-적색 계열 */
  --color-muted: oklch(70% 0.05 270);
  --color-surface: oklch(95% 0.02 270);
}

/* ❌ 절대 사용 금지 */
.bad-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* 보라 그라데이션 */
}

/* ✅ 사용 가능 */
.good-gradient {
  background: linear-gradient(
    135deg,
    oklch(60% 0.15 30) 0%,
    oklch(70% 0.12 40) 100%
  );
}
```

---

## Rule 4: Layout

**Rule statement**: 레이아웃은 **CSS Grid**를 기본으로 사용합니다. 텍스트 블록에는 `text-wrap: pretty`를 적용합니다. 반응형 breakpoint는 최소 3단계(mobile/tablet/desktop)를 갖춥니다.

**Why it matters**: CSS Grid는 2차원 레이아웃에 최적이며, 비대칭 구성이 용이합니다. `text-wrap: pretty`는 과도한 하이픈과 고아 단어를 방지하여 읽기 흐름을 보호합니다.

**Example**:
```css
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.content-block {
  grid-column: 2 / 8;  /* 비대칭 배치 */
}

.sidebar {
  grid-column: 9 / 12;
}

p, h1, h2, h3 {
  text-wrap: pretty;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .content-block, .sidebar {
    grid-column: 1 / -1;
  }
}
```

---

## Rule 5: Detail Focus

**Rule statement**: **하나의 핵심 요소는 120%의 디테일**을 투입하고, 나머지 모든 요소는 **80%의 수준**으로 처리합니다. "모든 것을 완벽히" 하려 하지 않습니다.

**Why it matters**: 시선은 한 곳에 집중됩니다. 모든 요소를 100%로 만들면 시선이 분산되고 "AI 느낌"이 납니다. 하나의 요소를 의도적으로 강조하면 인간 디자이너의 결단력이 느껴집니다.

**Example**:
```css
/* 120% — 이 요소만 특별하게 */
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.05;
  background: linear-gradient(135deg, oklch(30% 0.05 270), oklch(20% 0.03 270));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* 추가: 미세한 text-shadow로 깊이감 */
  text-shadow: 0 0.02em 0.04em oklch(90% 0.01 270 / 0.3);
}

/* 80% — 나머지는 깔끔하게만 */
.section-subtitle {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-muted);
  /* 효과 없음, 그냥 잘 읽히게만 */
}

.meta-info {
  font-size: 0.875rem;
  color: var(--color-muted);
  /* 아무 효과 없음 */
}
```

---

## Rule 6: Images

**Rule statement**: 실제 촬영 사진을 우선적으로 사용합니다. 3D 렌더링 이미지는 사용하지 않습니다. 이미지 없이 색상/타이포그래피/공간만으로도 전달 가능한지 먼저 검토합니다.

**Why it matters**: 3D 렌더링 이미지는 "스톡 느낌"과 "AI 느낌"을 동시에 줍니다. 실제 사진은 진정성을 전달합니다. 때로는 이미지 없이 공간과 타이포그래피만으로 더 강렬한 메시지를 전달할 수 있습니다.

**Example**:
```html
<!-- ✅ 실제 사진 사용 -->
<img src="photo-coffee-shop.jpg" alt="창가에 앉아 노트북을 하는 사람" />

<!-- ❌ 3D 렌더링 금지 -->
<img src="3d-isometric-illustration.png" alt="3D 아이소메트릭 일러스트" />

<!-- ✅ 이미지 없이 공간으로 해결 -->
<div class="hero">
  <h1 class="hero-title">빈 공간이 말한다</h1>
  <p class="hero-desc">이미지 없이 오직 타이포그래피와 여백만으로</p>
</div>
```

---

## Rule 7: Animation

**Rule statement**: 모든 움직임은 **의도 기반(intent-based motion)**이어야 하며, easing은 **Expo** 계열(`cubic-bezier(0.16, 1, 0.3, 1)`)을 기본으로 사용합니다. 장식적 애니메이션은 절대 금지입니다.

**Why it matters**: 애니메이션은 "멋있어 보이게" 하려는 것이 아니라, 사용자의 인지 흐름을 돕기 위한 것입니다. Expo easing은 자연스러운 감속으로 물리적 현실감을 줍니다.

**Example**:
```css
:root {
  --ease-expo-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-expo-in: cubic-bezier(0.7, 0, 0.84, 0);
  --duration-base: 0.6s;
}

/* ✅ 의도: 사용자가 이 요소에 주목해야 함 */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity var(--duration-base) var(--ease-expo-out),
              transform var(--duration-base) var(--ease-expo-out);
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ❌ 장식적 애니메이션 금지 */
.bouncing-decoration {
  animation: bounce 1s infinite; /* 이유 없이 튀는 것은 금지 */
}
```

**Motion Intent Map**:
| Intent | Motion Pattern | Easing |
|--------|---------------|--------|
| 등장 (Appear) | opacity 0→1 + translateY 20→0 | expo-out |
| 강조 (Emphasize) | scale 1→1.02→1 | expo-out |
| 전환 (Transition) | slide + crossfade | expo-in-out |
| 퇴장 (Exit) | opacity 1→0 + translateY 0→-10 | expo-in |

---

## Rule 8: Narrative Structure

**Rule statement**: 모든 페이지/슬라이드/섹션은 **5단계 서사 구조**를 따릅니다. (1)인트로/도입 → (2)맥락/배경 → (3)핵심 메시지 → (4)증거/예시 → (5)결론/CTA

**Why it matters**: 디자인은 정보 전달 도구입니다. 서사 구조 없이 나열된 정보는 기억에 남지 않습니다. 5단계는 인지 부하를 최소화하면서도 완결된 이야기를 만듭니다.

**Example**:
```html
<main class="narrative-flow">
  <!-- 1. Intro — "여기에 오신 것을 환영합니다" -->
  <section class="narrative-intro">
    <h1>프로젝트 X</h1>
    <p>2024년, 우리가 풀어야 할 문제</p>
  </section>

  <!-- 2. Context — "왜 이 문제인가" -->
  <section class="narrative-context">
    <h2>배경</h2>
    <p>시장은 변하고 있고, 사용자의 기대도 달라졌습니다...</p>
  </section>

  <!-- 3. Core Message — "핵심은 이것입니다" -->
  <section class="narrative-core">
    <h2>핵심 제안</h2>
    <p class="hero-statement">"단순함이 복잡함을 이깁니다"</p>
  </section>

  <!-- 4. Evidence — "증거는 여기 있습니다" -->
  <section class="narrative-evidence">
    <h2>사례</h2>
    <div class="evidence-grid">
      <figure>...</figure>
      <figure>...</figure>
    </div>
  </section>

  <!-- 5. Conclusion — "다음 단계는 무엇인가" -->
  <section class="narrative-conclusion">
    <h2>다음 단계</h2>
    <a href="#" class="cta">프로토타입 보기</a>
  </section>
</main>
```

---

## Rule 9: Watermark

**Rule statement**: 애니메이션 출력물(MP4/GIF)에만 **"Created by KTK Design"** 워터마크를 선택적으로 추가할 수 있습니다. 정적 HTML, 슬라이드, 프로토타입에는 워터마크를 넣지 않습니다.

**Why it matters**: 워터마크는 브랜딩이지만, 정적 콘텐츠에 강제 삽입하면 사용자 경험을 해칩니다. 애니메이션은 "제작 도구"의 성격이 강하므로 워터마크가 자연스럽습니다.

**Example**:
```html
<!-- 애니메이션 HTML 내부 -->
<div class="watermark">
  <span>Created by KTK Design</span>
</div>

<style>
.watermark {
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 0.75rem;
  color: oklch(70% 0.02 270);
  opacity: 0.6;
  pointer-events: none;
  z-index: 1000;
}
</style>
```

---

## Rule 10: Evaluation

**Rule statement**: 작업 완료 후 반드시 **5차원 전문가 평가**를 수행합니다. 평가 항목은: (1)타이포그래피, (2)색상/대비, (3)레이아웃/그리드, (4)애니메이션/모션, (5)서사/정보계층 — 각 항목 10점 만점.

**Why it matters**: 디자인은 완성도가 중요합니다. 자체 평가 없이 결과물을 전달하면 눈에 보이지 않는 결함이 사용자 경험을 망칩니다. 5차원 평가는 체계적으로 품질을 보장합니다.

**Example Output**:
```json
{
  "typography": 8,
  "color_contrast": 9,
  "layout_grid": 7,
  "animation_motion": 6,
  "narrative_hierarchy": 8,
  "overall": 7.6,
  "lowest_dimension": "animation_motion",
  "suggestions": [
    "Hero title에 translateY(20→0) + opacity 트랜지션 추가",
    "모바일 breakpoint에서 grid-column 조정 필요"
  ]
}
```

---

## Quick Reference Card

| # | Rule | Keyword |
|---|------|---------|
| 1 | 3 방향 제시 → 선택 → 구현 | `directions` |
| 2 | Serif display + system body | `typography` |
| 3 | oklch(), 보라 그라데이션 금지 | `color` |
| 4 | CSS Grid, text-wrap: pretty | `layout` |
| 5 | 하나 120%, 나머지 80% | `detail` |
| 6 | 실제 사진, 3D 렌더링 금지 | `images` |
| 7 | Expo easing, 의도 기반 모션 | `animation` |
| 8 | 5단계 서사 구조 | `narrative` |
| 9 | 애니메이션에만 워터마크 | `watermark` |
| 10 | 5차원 평가 | `evaluation` |
