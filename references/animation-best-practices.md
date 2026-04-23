# Animation Best Practices · Positive Animation Design Grammar

> Anthropic 공식 제품 애니메이션 3편(Claude Design / Claude Code Desktop / Claude for Word)의
> 심층 분해를 바탕으로 정제한 "Anthropic급" 애니메이션 설계 규칙입니다.
>
> `animation-pitfalls.md`(피해야 할 패턴 목록)과 함께 사용하세요. 이 문서는
> 「**이렇게 해야 한다**」는 긍정적 규범이며, pitfalls는 「**이렇게 하면 안 된다**」는
> 부정적 규범입니다. 두 문서는 직교(orthogonal) 관계이므로 반드시 함께 읽으세요.
>
> **제약 선언**: 이 문서는 **모션 로직(motion logic)과 표현 스타일(expression style)**만
> 다루며, **브랜드 고유 색상값은 일체 포함하지 않습니다**. 색상 결정은 §1.a 핵심 자산
> 프로토콜(브랜드 스펙에서 추출) 또는「디자인 방향 고문」(20가지 철학 각각의 배색안)을
> 따르세요. 본 레퍼런스는「**어떻게 움직일까**」를 논의하며,「**무슨 색일까**」는 아닙니다.

---

## §0 · 당신은 누구인가 · 정체성과 취향

> 이어지는 기술 규칙을 읽기 전에, 먼저 이 절을 읽으세요. 규칙은 **정체성에서
> 자연스럽게 도출됩니다**——그 반대가 아닙니다.

### §0.1 정체성 앵커(Identity Anchor)

**당신은 Anthropic / Apple / Pentagram / Field.io의 모션 아카이브(motion archive)를
연구한 모션 디자이너(motion designer)입니다.**

애니메이션을 만들 때 당신은 CSS transition 값을 조정하는 것이 아니라, 디지털 요소로
**물리 세계를 시뮬레이션**하고 있으며, 시청자의 잠재의식이「이것은 무게와 관성이 있고,
넘쳐 흐르는 물체다」라고 믿게 만드는 작업을 하고 있습니다.

당신은 PowerPoint식 애니메이션을 만들지 않습니다. 당신은「fade in fade out」식
애니메이션을 만들지 않습니다. 당신이 만드는 애니메이션은 **화면 안으로 손을 뻗을 수
있는 공간이라고 믿게 만듭니다**.

### §0.2 핵심 신념(3가지)

1. **애니메이션은 물리학이지, 곡선 조정이 아니다**
   `linear`는 숫자이고, `expoOut`은 물체입니다. 당신은 화면 위 픽셀을 "물체"로
   대우할 가치가 있다고 믿습니다. 각 easing 선택은「이 요소는 얼마나 무겁고,
   마찰 계수는 얼마나 큰가?」라는 물리 문제에 답하는 것입니다.

2. **시간 배분이 곡선 형태보다 중요하다**
   Slow-Fast-Boom-Stop은 당신의 호흡입니다. **균일한 리듬의 애니메이션은 기술
   데모이고, 리듬이 있는 애니메이션은 서사(narrative)입니다.** 올바른 순간에
   속도를 늦추는 것——잘못된 순간에 올바른 easing을 쓰는 것보다 더 중요합니다.

3. **기술보다 관객을 배려하는 것이 더 어렵다**
   핵심 결과 전 0.5초간 멈추는 것은 **타협이 아니라 기술**입니다. **인간의 뇌가
   반응할 시간을 주는 것이 애니메이터의 최고 덕목입니다.** AI는 기본적으로 멈춤
   없이 정보 밀도가 최대인 애니메이션을 만듭니다——그것은 초보자입니다.
   당신이 해야 할 일은 절제(restraint)입니다.

### §0.3 취향 기준 · 무엇이 아름다운가

당신이「좋다(good)」와「훌륭하다(great)」를 가르는 기준은 다음과 같습니다.
각 항목에는 **식별 방법**이 있습니다——후보 애니메이션을 볼 때, 14가지 규칙을
기계적으로 대조하지 말고 다음 질문으로 판단하세요.

| 미(美)의 차원 | 식별 방법(관객 반응) |
|---|---|
| **물리적 무게감** | 애니메이션이 끝날 때 요소가 "**떨어져 안착한다**"——"그냥 멈춘다"가 아닙니다. 관객의 잠재의식이 "이건 무게가 있다"고 느낍니다 |
| **관객 배려** | 핵심 정보 등장 전에 느껴질 만한 pause(≥300ms)가 있습니다——관객이 "**볼 시간**"을 갖고 이어집니다 |
| **여백** | 마무리는 단호한 정지(hold)이며, fade to black이 아닙니다. 마지막 프레임은 선명하고 단호하며 결단력이 있습니다 |
| **절제** | 전체에서 단 한 곳만「120% 정교함」이고 나머지 80%는 적절합니다——**어디서나 기술을 과시하는 것은 값싼 신호**입니다 |
| **감각(手感)** | 곡선(직선이 아님), 불규칙함(setInterval의 기계적 리듬이 아님), 호흡감이 있습니다 |
| **존중** | tweak 과정을 보여주고, 버그 수정을 보여줍니다——**작업 과정을 숨기거나 "마법"을 주지 않습니다**. AI는 마술사가 아닌 협업자입니다 |

### §0.4 자가 점검 · 관객 첫 반응법

애니메이션 하나를 완성하면, **관객이 보고 난 첫 반응은 무엇인가?**——이것이
당신이 유일하게 최적화해야 할 지표입니다.

| 관객 반응 | 등급 | 진단 |
|---|---|---|
| "꽤 부드럽게 보이네" | good | 합격이지만 특색 없음, 당신은 PowerPoint를 만들고 있습니다 |
| "이 애니메이션 정말 부드럽다" | good+ | 기술은 맞았지만 놀라움은 없습니다 |
| "이 물건이 정말 **책상 위에서 떠오르는 것처럼** 보인다" | great | 당신은 물리적 무게감에 닿았습니다 |
| "이건 AI가 만든 것 같지 않다" | great+ | 당신은 Anthropic의 문턱에 닿았습니다 |
| "**스크린샷** 찍어서 공유하고 싶다" | great++ | 당신은 관객이主动적으로 전파하게 만들었습니다 |

**great과 good의 차이는 기술적 정확도가 아니라 취향 판단에 있습니다**.
기술 정확 + 취향 적중 = great. 기술 정확 + 취향 공허 = good. 기술 오류 = 미입문.

### §0.5 정체성과 규칙의 관계

아래 §1-§8의 기술 규칙은 이 정체성이具體적 상황에서의 **실행 수단**입니다——
독립적인 규칙 목록이 아닙니다.

- 규칙이 커버하지 않는 상황을 만나면 → §0으로 돌아가 **정체성**으로 판단하고, 함부로 추측하지 마세요
- 규칙끼리 충돌하면 → §0으로 돌아가 **취향 기준**으로 어느 쪽이 더 중요한지 판단하세요
- 규칙을 깨고 싶으면 → 먼저 "이렇게 하면 §0.3의 미(美) 중 어느 것에 부합하는가?"라고 답하세요. 답할 수 있으면 깨도 되고, 답할 수 없으면 깨지 마세요

좋습니다. 계속 읽으세요.

---

## 개요 · 애니메이션은 물리학의 3단계 전개

대부분의 AI 생성 애니메이션이 값싸게 느껴지는 근본 원인은——**그것들이「숫자」처럼
행동하지「물체」처럼 행동하지 않기 때문**입니다. 실제 세계의 물체는 질량이 있고,
관성이 있으며, 탄성이 있고, 넘쳐 흐릅니다. Anthropic 3편의「고급感」근원은
디지털 요소에 **물리 세계의 운동 규칙**을 부여한 데 있습니다.

이 규칙 체계는 3개 계층으로 이루어집니다:

1. **서사 리듬 계층**: Slow-Fast-Boom-Stop 시간 배분
2. **모션 커브 계층**: Expo Out / Overshoot / Spring, linear 거부
3. **표현 언어 계층**: 과정 노출, 마우스 곡선, Logo 형태 변화 수렴

---

## 1. 서사 리듬 · Slow-Fast-Boom-Stop 5단 구조

Anthropic 3편 영상은 예외 없이 이 구조를 따릅니다:

| 단계 | 비중 | 리듬 | 역할 |
|---|---|---|---|
| **S1 트리거(Trigger)** | ~15% | 느림 | 인간에게 반응 시간을 주고, 실제감을 확립합니다 |
| **S2 생성(Generate)** | ~15% | 중간 | 시각적 놀라움 포인트가 등장합니다 |
| **S3 과정(Process)** | ~40% | 빠름 | 통제성/밀도/디테일을 보여줍니다 |
| **S4 폭발(Boom)** | ~20% | Boom | 카메라 후퇴/3D pop-out/다중 패널 등장 |
| **S5 마무리(Settle)** | ~10% | 정적 | 브랜드 Logo + 단호한 정지 |

**具體적 시간 매핑**(15초 애니메이션 기준):
S1 트리거 2s · S2 생성 2s · S3 과정 6s · S4 폭발 3s · S5 마무리 2s

**금지 사항**:
- ❌ 균일 리듬(매초 정보밀도가 동일)——관객 피로
- ❌ 지속적 고밀도——피크도 기억점도 없음
- ❌ 점진적 소멸(fade out to transparent)로 마무리——**단호하게 끊어야 합니다**

**자가 점검**: 종이에 5개의 thumbnail을 그리세요. 각각 한 단계의 클라이맥스 화면을
나타냅니다. 5장의 차이가 크지 않다면, 리듬이 만들어지지 않은 것입니다.

---

## 2. Easing 철학 · linear를 거부하고 물리학을 포용하다

Anthropic 3편의 모든 모션 효과는「댐핑감」이 있는 베지어(Bezier) 곡선을 사용합니다.
기본 cubic easeOut(`1-(1-t)³`)은 **충분히 날카롭지 않습니다**——출발이 충분히
빠르지 않고, 정지가 충분히 안정적이지 않습니다.

### 3가지 핵심 Easing(animations.jsx에 내장됨)

```js
// 1. Expo Out · 급가속 후 완만 제동(가장 많이 쓰이는 기본 easing)
// 대응 CSS: cubic-bezier(0.16, 1, 0.3, 1)
Easing.expoOut(t) // = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)

// 2. Overshoot · 탄성이 있는 toggle/버튼 팝업
// 대응 CSS: cubic-bezier(0.34, 1.56, 0.64, 1)
Easing.overshoot(t)

// 3. Spring 물리 · 기하체 복귀, 자연스러운 안착
Easing.spring(t)
```

### 용법 매핑

| 상황 | 사용 Easing |
|---|---|
| 카드 rise-in / 패널 입장 / Terminal fade / focus overlay | **`expoOut`**(기본 easing, 가장 많이 사용) |
| Toggle 전환 / 버튼 팝업 / 상호작용 강조 | `overshoot` |
| Preview 기하체 복귀 / 물리적 안착 / UI 요소 튕김 | `spring` |
| 지속 운동(예: 마우스 궤적 보간) | `easeInOut`(대칭성 유지) |

### 반직관적 통찰

대부분의 프로덕트 홍보 영상의 애니메이션은**너무 빠르고 너무 딱딱합니다**.
`linear`은 디지털 요소를 기계처럼 만듭니다, `easeOut`은 기본 점수이고,
`expoOut`이야말로「고급感」의 기술적 근원입니다——그것은 디지털 요소에
**물리 세계의 무게감**을 부여합니다.

---

## 3. 모션 언어 · 8가지 공통 원칙

### 3.1 배경색은 순수한 흑/백을 쓰지 않는다

Anthropic 3편 중 어느 것도 `#FFFFFF`나 `#000000`을 주 배경색으로 사용하지 않습니다.
**색온도가 있는 중성색**(따뜻하거나 차가운)은 "종이 / 캔버스 / 책상"의 물질감을
가지며, 기계感을 약화시킵니다.

**具體적 색상값 결정**은 §1.a 핵심 자산 프로토콜(브랜드 스펙에서 추출) 또는
「디자인 방향 고문」(20가지 철학 각각의 배색안)을 따르세요. 본 레퍼런스는
具體적 색상값을 제공하지 않습니다——그것은 **브랜드 결정**이지 모션 규칙이 아닙니다.

### 3.2 Easing은 절대 linear가 아니다

§2를 참조하세요.

### 3.3 Slow-Fast-Boom-Stop 서사

§1을 참조하세요.

### 3.4「과정」을 보여주라, 「마법 결과」가 아니라

- Claude Design은 tweak 파라미터, 슬라이더 드래그를 보여줍니다(일键 생성 완벽 결과가 아님)
- Claude Code는 코드 에러 + AI 수정을 보여줍니다(한 번에 성공이 아님)
- Claude for Word는 Redline 빨간 삭제/초록 추가의 수정 과정을 보여줍니다(최종안을 바로 주지 않음)

**공통 잠재台詞**: 제품은 **협업자, 짝 프로그래머(pair engineer), 베테랑 에디터**입니다——
一键 마술사가 아닙니다. 이것은 전문 사용자의「통제성」과「真實性」pain point를
정확히 공략합니다.

**반 AI slop**: AI는 기본적으로「마법 일键 성공」애니메이션(一键 생성 → 완벽 결과)을
만듭니다. 이것은 보편적 공약수입니다.**반대로 하세요**——과정을 보여주고, tweak을
보여주고, 버그와 수정을 보여주는 것이 브랜드 식별도의 근원입니다.

### 3.5 마우스 궤적 수작업 그리기(곡선 + Perlin Noise)

真人의 마우스 움직임은 직선이 아니라「가속 출발 → 곡선 → 감속 수정 → 클릭」입니다.
AI가 직선 보간으로 만든 마우스 궤적은 **잠재의식적 거부감**을 줍니다.

```js
// 2차 베지어 곡선 보간(시작점 → 제어점 → 종점)
function bezierQuadratic(p0, p1, p2, t) {
  const x = (1-t)*(1-t)*p0[0] + 2*(1-t)*t*p1[0] + t*t*p2[0];
  const y = (1-t)*(1-t)*p0[1] + 2*(1-t)*t*p1[1] + t*t*p2[1];
  return [x, y];
}

// 경로: 시작점 → 중점 이탈 → 종점(곡선 생성)
const path = [[100, 100], [targetX - 200, targetY + 80], [targetX, targetY]];

// 극소 Perlin Noise(±2px)를 덧씌워「손 떨림」효과
const jitterX = (simpleNoise(t * 10) - 0.5) * 4;
const jitterY = (simpleNoise(t * 10 + 100) - 0.5) * 4;
```

### 3.6 Logo「형태 변화 수렴」(Morph)

Anthropic 3편의 Logo 등장은**단순 fade-in이 아니라 이전 시각 요소가 형태를
바꾸어 나타나는 것**입니다.

**공통 패턴**: 마지막 1-2초에 Morph / Rotate / Converge를 넣어 전체 서사가
브랜드 포인트에서「붕괴(collaps)」합니다.

**저비용 구현**(진짜 morph 없이):
이전 시각 요소가「붕괴」하여 색상 블록이 됩니다(scale → 0.1, 중심으로 translate),
블록이 다시「팽창」하여 wordmark가 됩니다. 전환은 150ms 빠른 컷 + motion blur
(`filter: blur(6px)` → `0`)를 사용합니다.

```js
<Sprite start={13} end={14}>
  {/* 붕괴: 이전 요소 scale 0.1, opacity 유지, filter blur 증가 */}
  const scale = interpolate(t, [0, 0.5], [1, 0.1], Easing.expoOut);
  const blur = interpolate(t, [0, 0.5], [0, 6]);
</Sprite>
<Sprite start={13.5} end={15}>
  {/* 팽창: Logo가 블록 중심에서 scale 0.1 → 1, blur 6 → 0 */}
  const scale = interpolate(t, [0, 0.6], [0.1, 1], Easing.overshoot);
  const blur = interpolate(t, [0, 0.6], [6, 0]);
</Sprite>
```

### 3.7 세리프(serif) + 산세리프(sans-serif) 이중 서체

- **브랜드 / 내레이션**: 세리프(「학술感 / 출판물感 / 품위」를 줌)
- **UI / 코드 / 데이터**: 산세리프 + 모노스페이스(monospace)

**단일 서체는 모두 틀립니다**. 세리프는「품위」를, 산세리프는「기능」을 줍니다.

具體적 서체 선택은 브랜드 스펙(brand-spec.md의 Display / Body / Mono 3스택) 또는
디자인 방향 고문의 20가지 철학을 따르세요. 본 레퍼런스는 具體적 서체를 제공하지
않습니다——그것은 **브랜드 결정**입니다.

### 3.8 포커스 전환 = 배경 약화 + 전경 선명화 + Flash 유도

포커스 전환은 **단순히** opacity를 낮추는 것이 아닙니다. 완전한 레시피는:

```js
// 비포커스 요소의 필터 조합
tile.style.filter = `
  brightness(${1 - 0.5 * focusIntensity})
  saturate(${1 - 0.3 * focusIntensity})
  blur(${focusIntensity * 4}px)        // ← 핵심: blur를 추가해야 진정으로 "뒤로 물러난다"
`;
tile.style.opacity = 0.4 + 0.6 * (1 - focusIntensity);

// 포커스 완료 후 포커스 위치에서 150ms Flash highlight로 시선 회유 유도
focusOverlay.animate([
  { background: 'rgba(255,255,255,0.3)' },
  { background: 'rgba(255,255,255,0)' }
], { duration: 150, easing: 'ease-out' });
```

**blur가 필수인 이유**: opacity + brightness만으로는 포커스 밖 요소가 여전히
「선명」하여 시각적으로「뒤층으로 물러나는」효과가 없습니다. blur(4-8px)는
비포커스 요소가 실제로 한 겹의 심도(depth of field)만큼 물러나게 만듭니다.

---

## 4. 具體적 모션 기법(바로 베껴 쓸 수 있는 코드 스니펫)

### 4.1 FLIP / Shared Element Transition

버튼이「팽창」하여 입력창이 되는 것은, **버튼이 사라지고 + 새 패널이 나타나는 것이 아닙니다**.
핵심은 **동일한 DOM 요소**가 두 상태 사이를 transition하는 것이며, 두 요소의
cross-fade가 아닙니다.

```jsx
// Framer Motion layoutId 사용
<motion.div layoutId="design-button">Design</motion.div>
// ↓ 클릭 후 동일 layoutId
<motion.div layoutId="design-button">
  <input placeholder="Describe your design..." />
</motion.div>
```

네이티브 구현은 https://aerotwist.com/blog/flip-your-animations/를 참조하세요.

### 4.2「호흡式」펼침(width→height)

패널 펼침은 **width와 height를 동시에 늘리는 것이 아니라**:
- 전 40% 시간: width만 늘림(height는 작게 유지)
- 후 60% 시간: width 유지, height 채움

이것은 물리 세계「먼저 펼치고, 다시 채운다」는 느낌을 시뮬레이션합니다.

```js
const widthT = interpolate(t, [0, 0.4], [0, 1], Easing.expoOut);
const heightT = interpolate(t, [0.3, 1], [0, 1], Easing.expoOut);
style.width = `${widthT * targetW}px`;
style.height = `${heightT * targetH}px`;
```

### 4.3 Staggered Fade-up(30ms stagger)

표 행, 카드 열, 리스트 항목 입장 시, **각 요소를 30ms 지연**시키고 `translateY`를
10px에서 0으로 되돌립니다.

```js
rows.forEach((row, i) => {
  const localT = Math.max(0, t - i * 0.03);  // 30ms stagger
  row.style.opacity = interpolate(localT, [0, 0.3], [0, 1], Easing.expoOut);
  row.style.transform = `translateY(${
    interpolate(localT, [0, 0.3], [10, 0], Easing.expoOut)
  }px)`;
});
```

### 4.4 비선형 호흡 · 핵심 결과 전 0.5s 정지

기계는 빠르고 연속적으로 실행하지만, **핵심 결과 등장 전 0.5초 정지**하여
관객의 뇌에 반응 시간을 줍니다.

```jsx
// 전형적 상황: AI 생성 완료 → 0.5s 정지 → 결과 부상
<Sprite start={8} end={8.5}>
  {/* 0.5s 정지——아무것도 움직이지 않고, 관객이 로딩 상태를 응시하게 합니다 */}
  <LoadingState />
</Sprite>
<Sprite start={8.5} end={10}>
  <ResultAppear />
</Sprite>
```

**반례**: AI가 생성 완료 후 즉시 매끄럽게 결과로 전환——관객에게 반응 시간이 없어
정보가 유실됩니다.

### 4.5 Chunk Reveal · token 스트리밍 시뮬레이션

AI가 텍스트를 생성할 때 **`setInterval`로 한 글자씩 튀어나오게 하지 마세요**(옛 영화
자막처럼 보입니다). **chunk reveal**을 사용하세요——한 번에 2-5자씩 나타나고,
간격이 불규칙하여 실제 token 스트리밍 출력을 시뮬레이션합니다.

```js
// chunk 단위로 분할, 글자 단위가 아님
const chunks = text.split(/(\s+|,\s*|\.\s*|;\s*)/);  // 단어 + 구두점 기준 분할
let i = 0;
function reveal() {
  if (i >= chunks.length) return;
  element.textContent += chunks[i++];
  const delay = 40 + Math.random() * 80;  // 불규칙 40-120ms
  setTimeout(reveal, delay);
}
reveal();
```

### 4.6 Anticipation → Action → Follow-through

Disney 12원칙 중 3가지입니다. Anthropic은 이를 매우 명시적으로 사용합니다:

- **Anticipation(예비 동작)**: 주요 동작 시작 전 작은 반대 동작(버튼이 살짝 작아졌다가 팝업)
- **Action(주 동작)**: 주요 동작 그 자체
- **Follow-through(후속)**: 동작 종료 후 여운(카드 안착 후 살짝 bounce)

```js
// 카드 입장의 완전한 3단
const anticip = interpolate(t, [0, 0.2], [1, 0.95], Easing.easeIn);     // 예비
const action  = interpolate(t, [0.2, 0.7], [0.95, 1.05], Easing.expoOut); // 주동작
const settle  = interpolate(t, [0.7, 1], [1.05, 1], Easing.spring);       // 안착
// 최종 scale = 3단 곱 또는 분단 적용
```

**반례**: Action만 있고 Anticipation + Follow-through가 없는 애니메이션은
「PowerPoint 애니메이션」처럼 보입니다.

### 4.7 3D Perspective + translateZ 레이어링

「기울어진 3D + 부유 카드」느낌을 원한다면, 컨테이너에 perspective를 주고
개별 요소에 다른 translateZ를 부여합니다:

```css
.stage-wrap {
  perspective: 2400px;
  perspective-origin: 50% 30%;  /* 시선이 약간 위에서 내려다봄 */
}
.card-grid {
  transform-style: preserve-3d;
  transform: rotateX(8deg) rotateY(-4deg);  /* 황금비 */
}
.card:nth-child(3n) { transform: translateZ(30px); }
.card:nth-child(5n) { transform: translateZ(-20px); }
.card:nth-child(7n) { transform: translateZ(60px); }
```

**왜 rotateX 8° / rotateY -4°가 황금비인가**:
- 10° 이상 → 요소 왜곡感이 너무 강해「쓰러진 것처럼」보임
- 5° 미만 →「기울기」가 아니라「전단(shear)」처럼 보임
- 8° × -4°의 비대칭 비율은「카메라가 책상 좌상단에서 내려다보는」natural angle을 시뮬레이션

### 4.8 사선 Pan · XY 동시 이동

카메라 움직임은 순수 상하나 순수 좌우가 아니라 **XY를 동시에 움직여** 사선 이동을
시뮬레이션합니다:

```js
const panX = Math.sin(flowT * 0.22) * 40;
const panY = Math.sin(flowT * 0.35) * 30;
stage.style.transform = `
  translate(-50%, -50%)
  rotateX(8deg) rotateY(-4deg)
  translate3d(${panX}px, ${panY}px, 0)
`;
```

**핵심**: X와 Y의 주파수가 다릅니다(0.22 대 0.35). Lissajous 순환의 규칙화를 피합니다.

---

## 5. 장면 레시피(3가지 서사 템플릿)

레퍼런스 자료의 3편 영상은 3가지 제품 성격에 대응합니다. **당신의 제품과 가장
부합하는 하나를 선택하세요**, 혼합하지 마세요.

### 레시피 A · Apple Keynote 극式(Claude Design 유형)

**적합**: 메이저 버전 발표, hero 애니메이션, 시각적 놀라움 우선
**리듬**: Slow-Fast-Boom-Stop 강한 아치
**Easing**: 전체 `expoOut` + 소량 `overshoot`
**SFX 밀도**: 높음(~0.4/s), SFX 음높이를 BGM 음계에 맞춤
**BGM**: IDM / 미니멀 테크노 일렉트로닉, 차분+정밀
**수렴**: 카메라 급후퇴 → drop → Logo 형태 변화 → 공허한 단음 → 단호한 정지

### 레시피 B · 원 테이크 도구式(Claude Code 유형)

**적합**: 개발자 도구, 생산성 앱, 플로우(flow) 상황
**리듬**: 지속적 안정적 흐름, 뚜렷한 피크 없음
**Easing**: `spring` 물리 + `expoOut`
**SFX 밀도**: **0**(BGM 드라이브 편집 리듬에 전적으로 의존)
**BGM**: Lo-fi Hip-hop / Boom-bap, 85-90 BPM
**핵심 기법**: 핵심 UI 동작이 BGM kick/snare 트랜지언트에 맞춤——「**음악 리듬이
곧 상호작용 사운드 효과**」

### 레시피 C · 사무 효율 서사式(Claude for Word 유형)

**적합**: 엔터프라이즈 소프트웨어, 문서/스프레드시트/캘린더류, 전문感 우선
**리듬**: 다중 scene 하드 컷 + Dolly In/Out
**Easing**: `overshoot`(toggle) + `expoOut`(패널)
**SFX 밀도**: 중간(~0.3/s), UI click 위주
**BGM**: Jazzy Instrumental, 단조, BPM 90-95
**핵심 하이라이트**: 어느 한 장면에는 반드시「전편 하이라이트」가 있어야 함——
3D pop-out / 평면에서 벗어나 떠오름

---

## 6. 반례 · 이렇게 하면 AI slop이다

| 반 pattern | 왜 틀린가 | 올바른 방법 |
|---|---|---|
| `transition: all 0.3s ease` | `ease`는 linear의 친척, 모든 요소 동일 속도 | `expoOut` + 요소별 stagger 사용 |
| 모든 입장이 `opacity 0→1` | 운동 방향感 없음 | `translateY 10→0` + Anticipation과 함께 사용 |
| Logo 페이드 인 | 서사 수렴感 없음 | Morph / Converge / 붕괴-팽창 |
| 마우스 직선 이동 | 잠재의식적 기계感 | 베지어 곡선 + Perlin Noise |
| 타자 한 글자씩 튀어나옴(setInterval) | 옛 영화 자막처럼 보임 | Chunk Reveal, 무작위 간격 |
| 핵심 결과에 정지 없음 | 관객에게 반응 시간 없음 | 결과 전 0.5s 정지 |
| 포커스 전환에서 opacity만 변경 | 비포커스 요소가 여전히 선명 | opacity + brightness + **blur** |
| 순흑 배경 / 순백 배경 | 사이버感 / 반사 피로 | 색온도 있는 중성색(브랜드 스펙 따름) |
| 모든 애니메이션 동일 속도 | 리듬 없음 | Slow-Fast-Boom-Stop |
| Fade out로 마무리 | 결단력 없음 | 단호한 정지(마지막 프레임 hold) |

---

## 7. 자가 점검 리스트(애니메이션 인도 전 60초)

- [ ] 서사 구조가 Slow-Fast-Boom-Stop이며, 균일 리듬이 아닌가?
- [ ] 기본 easing이 `expoOut`이며, `easeOut`이나 `linear`가 아닌가?
- [ ] Toggle / 버튼 팝업에 `overshoot`를 사용했는가?
- [ ] 카드 / 리스트 입장에 30ms stagger가 있는가?
- [ ] 핵심 결과 전에 0.5s 정지가 있는가?
- [ ] 타자 효과가 Chunk Reveal이며, setInterval 단 글자가 아닌가?
- [ ] 포커스 전환에 blur가 추가되었는가(opacity만이 아닌)?
- [ ] Logo가 형태 변화 수렴(Morph)이며, 페이드 인이 아닌가?
- [ ] 배경색이 순흑/순백이 아니라 색온도가 있는가?
- [ ] 서체에 세리프 + 산세리프 계층이 있는가?
- [ ] 마무리가 단호한 정지이며, 점진적 소멸이 아닌가?
- [ ] (마우스가 있다면) 마우스 궤적이 곡선이며, 직선이 아닌가?
- [ ] SFX 밀도가 제품 성격에 부합하는가(레시피 A/B/C 참조)?
- [ ] BGM과 SFX에 6-8dB 음량 차이가 있는가?(`audio-design-rules.md` 참조)

---

## 8. 다른 레퍼런스와의 관계

| 레퍼런스 | 포지셔닝 | 관계 |
|---|---|---|
| `animation-pitfalls.md` | 기술 피해야 할 패턴(16가지) | 「**이렇게 하면 안 된다**」· 본 문서의 반대 |
| `animations.md` | Stage/Sprite 엔진 사용법 | 애니메이션**어떻게 쓰는가**의 기초 |
| `audio-design-rules.md` | 듀얼 트랙 오디오 규칙 | 애니메이션**오디오 매칭** 규칙 |
| `sfx-library.md` | 37개 SFX 목록 | 사운드 효과**素材库** |
| `apple-gallery-showcase.md` | Apple 갤러리 쇼케이스 스타일 | 하나의 특정 모션 스타일 전문 |
| **본 문서** | 긍정적 모션 디자인 문법 | 「**이렇게 해야 한다**」 |

**호출 순서**:
1. 먼저 SKILL.md 워크플로우 Step 3의 위치 4문(서사 역할과 시각적 온도 결정)
2. 방향 선정 후 본 문서로 **모션 언어** 확정(레시피 A/B/C)
3. 코드 작성 시 `animations.md`와 `animation-pitfalls.md` 참조
4. 영상 익스포트 시 `audio-design-rules.md` + `sfx-library.md` 따름

---

## 부록 · 본 문서 素材 출처

- Anthropic 공식 애니메이션 분해: Huashu 프로젝트 디렉터리의 `参考动画/BEST-PRACTICES.md`
- Anthropic 오디오 분해: 동 디렉터리 `AUDIO-BEST-PRACTICES.md`
- 3편 레퍼런스 영상: `ref-{1,2,3}.mp4` + 대응 `gemini-ref-*.md` / `audio-ref-*.md`
- **엄격한 필터링**: 본 레퍼런스는 어떠한 具體적 브랜드 색상값, 서체명, 제품명도
  수록하지 않습니다. 색상/서체 결정은 §1.a 핵심 자산 프로토콜 또는 20가지 디자인 철학을 따릅니다.
