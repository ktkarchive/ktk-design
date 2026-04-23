# Animations: 타임라인 애니메이션 엔진

애니메이션/motion design HTML을 작업할 때 이 문서를 읽으세요. 원리, 사용법, 전형적인 패턴을 설명합니다.

## 핵심 패턴: Stage + Sprite

당신의 애니메이션 시스템(`assets/animations.jsx`)은 타임라인 기반 엔진을 제공합니다:

- **`<Stage>`**: 전체 애니메이션의 컨테이너입니다. 자동으로 auto-scale(viewport 맞춤) + scrubber + play/pause/loop 제어를 제공합니다.
- **`<Sprite start end>`**: 시간 구간입니다. Sprite는 `start`부터 `end`까지의 시간 동안에만 표시됩니다. 낶부에서 `useSprite()` hook을 통해 자신의 로컬 진행률(local progress) `t` (0→1)를 읽을 수 있습니다.
- **`useTime()`**: 현재 전역 시간(초)을 읽습니다.
- **`Easing.easeInOut` / `Easing.easeOut` / ...**: easing 함수들입니다.
- **`interpolate(t, from, to, easing?)`**: `t`에 따라 보간(interpolate)합니다.

이 패턴은 Remotion/After Effects의 아이디어를 참고했지만, 가볍고 zero dependency입니다.

## 시작하기

```html
<script type="text/babel" src="animations.jsx"></script>
<script type="text/babel">
  const { Stage, Sprite, useTime, useSprite, Easing, interpolate } = window.Animations;

  function Title() {
    const { t } = useSprite();  // 로컬 진행률 0→1
    const opacity = interpolate(t, [0, 1], [0, 1], Easing.easeOut);
    const y = interpolate(t, [0, 1], [40, 0], Easing.easeOut);
    return (
      <h1 style={{ 
        opacity, 
        transform: `translateY(${y}px)`,
        fontSize: 120,
        fontWeight: 900,
      }}>
        Hello.
      </h1>
    );
  }

  function Scene() {
    return (
      <Stage duration={10}>  {/* 10초 애니메이션 */}
        <Sprite start={0} end={3}>
          <Title />
        </Sprite>
        <Sprite start={2} end={5}>
          <SubTitle />
        </Sprite>
        {/* ... */}
      </Stage>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<Scene />);
</script>
```

## 자주 쓰는 애니메이션 패턴

### 1. Fade In / Fade Out

```jsx
function FadeIn({ children }) {
  const { t } = useSprite();
  const opacity = interpolate(t, [0, 0.3], [0, 1], Easing.easeOut);
  return <div style={{ opacity }}>{children}</div>;
}
```

**범위에 주의**: `[0, 0.3]`은 Sprite 시간의 처음 30% 동안 Fade In을 완료하고, 이후에는 opacity=1을 유지한다는 의미입니다.

### 2. Slide In

```jsx
function SlideIn({ children, from = 'left' }) {
  const { t } = useSprite();
  const progress = interpolate(t, [0, 0.4], [0, 1], Easing.easeOut);
  const offset = (1 - progress) * 100;
  const directions = {
    left: `translateX(-${offset}px)`,
    right: `translateX(${offset}px)`,
    top: `translateY(-${offset}px)`,
    bottom: `translateY(${offset}px)`,
  };
  return (
    <div style={{
      transform: directions[from],
      opacity: progress,
    }}>
      {children}
    </div>
  );
}
```

### 3. 글자별 타이핑 효과

```jsx
function Typewriter({ text }) {
  const { t } = useSprite();
  const charCount = Math.floor(text.length * Math.min(t * 2, 1));
  return <span>{text.slice(0, charCount)}</span>;
}
```

### 4. 숫자 카운트업

```jsx
function CountUp({ from = 0, to = 100, duration = 0.6 }) {
  const { t } = useSprite();
  const progress = interpolate(t, [0, duration], [0, 1], Easing.easeOut);
  const value = Math.floor(from + (to - from) * progress);
  return <span>{value.toLocaleString()}</span>;
}
```

### 5. 단계별 설명(전형적인 교육용 애니메이션)

```jsx
function Scene() {
  return (
    <Stage duration={20}>
      {/* Phase 1: 문제 제시 */}
      <Sprite start={0} end={4}>
        <Problem />
      </Sprite>

      {/* Phase 2: 접근 방식 제시 */}
      <Sprite start={4} end={10}>
        <Approach />
      </Sprite>

      {/* Phase 3: 결과 제시 */}
      <Sprite start={10} end={16}>
        <Result />
      </Sprite>

      {/* 전 구간 표시되는 자막 */}
      <Sprite start={0} end={20}>
        <Caption />
      </Sprite>
    </Stage>
  );
}
```

## Easing 함수

기본 제공되는 easing curve들:

| Easing | 특성 | 용도 |
|--------|------|------|
| `linear` | 등속 | 자막 스크롤, 지속적인 애니메이션 |
| `easeIn` | 느림→빠름 | 퇴장(사라짐) |
| `easeOut` | 빠름→느림 | 등장(나타남) |
| `easeInOut` | 느림→빠름→느림 | 위치 이동 |
| **`expoOut`** ⭐ | **지수형 ease-out** | **Anthropic 수준의 메인 easing**(물리적 무게감) |
| **`overshoot`** ⭐ | **탄성 반발(overshoot)** | **Toggle / 버튼 팝업 / 상호작용 강조** |
| `spring` | 스프링 | 상호작용 피드백, 기하 도형 복귀 |
| `anticipation` | 먼저 반대로 갔다가 정방향 | 동작 강조 |

**기본 메인 easing은 `expoOut`을 사용하세요**(`easeOut`이 아닙니다)——`animation-best-practices.md` §2 참고.
등장에는 `expoOut`, 퇴장에는 `easeIn`, toggle에는 `overshoot`——Anthropic 수준 애니메이션의 기본 규칙입니다.

## 리듬과 길이 가이드

### 마이크로 인터랙션(0.1-0.3초)
- 버튼 hover
- 카드 expand
- Tooltip 표시

### UI 전환(0.3-0.8초)
- 페이지 전환
- 모달 창 표시
- 리스트 아이템 추가

### 날티브 애니메이션(2-10초 per segment)
- 개념 설명의 한 phase
- 데이터 차트의 reveal
- 장면 전환

### 단일 날티브 애니메이션은 최대 10초를 넘지 마세요
사람의 집중력은 한정되어 있습니다. 10초 동안 한 가지를 이야기하고, 끝나면 다음 것으로 넘어가세요.

## 애니메이션 설계 시 생각 순서

### 1. 먼저 콘텐츠/스토리가 있고, 그다음 애니메이션이 있어야 합니다

**잘못된 예**: 먼저 화려한 애니메이션을 만들고 싶어 한 뒤, 그 안에 콘텐츠를 집어넣는 것
**올바른 예**: 먼저 전달할 메시지를 명확히 한 뒤, 애니메이션으로 그 메시지를 전달하는 것

애니메이션은 **signal**이지 **장식**이 아닙니다. Fade-in은 "여기가 중요하니 봐 주세요"라는 강조입니다——만약 모든 것에 fade-in을 적용하면 signal은 물러갑니다.

### 2. Scene별로 타임라인을 작성하세요

```
0:00 - 0:03   문제 등장(fade in)
0:03 - 0:06   문제 확대/전개(zoom+pan)
0:06 - 0:09   해결책 등장(slide in from right)
0:09 - 0:12   해결책 설명 전개(typewriter)
0:12 - 0:15   결과 시연(counter up + chart reveal)
0:15 - 0:18   한 줄 요약(static, 3초 동안 읽기)
0:18 - 0:20   CTA 또는 fade out
```

타임라인을 작성한 뒤 컴포넌트를 작성하세요.

### 3. 리소스를 먼저 준비하세요

애니메이션에 사용할 이미지/아이콘/폰트는 **미리** 준비하세요. 작업 도중 소재를 찾으러 가지 마세요——작업 흐름이 끊깁니다.

## 자주 묻는 질문

**애니메이션이 끊깁니다**
→ 주로 layout thrashing 때문입니다. `transform`과 `opacity`를 사용하고, `top`/`left`/`width`/`height`/`margin`은 건드리지 마세요. 브라우저는 `transform`을 GPU로 가속합니다.

**애니메이션이 너무 빨라서 잘 보이지 않습니다**
→ 사람이 한자 하나를 읽는 데 100-150ms, 단어 하나에는 300-500ms가 필요합니다. 글로 이야기를 전달한다면 한 문장에는 최소 3초를 할애하세요.

**애니메이션이 너무 느려서 지루합니다**
→ 흥미로운 시각적 변화는 빽빽이 배치해야 합니다. 정적인 화면은 5초를 넘으면 지루해집니다.

**여러 애니메이션이 서로 영향을 줍니다**
→ CSS의 `will-change: transform`을 사용해 브라우저에게 이 요소가 움직일 것을 미리 알려주면 reflow를 줄일 수 있습니다.

**비디오로 녹화하려면**
→ skill에 내장된 도구체인을 사용하세요(한 번의 명령으로 세 가지 형식 출력): `video-export.md` 참고
- `scripts/render-video.js` — HTML → 25fps MP4(Playwright + ffmpeg)
- `scripts/convert-formats.sh` — 25fps MP4 → 60fps MP4 + 최적화 GIF
- 더 정확한 프레임 렌더링을 원하시나요? render(t)를 pure function으로 만드세요. `animation-pitfalls.md` 제 5항 참고

## 비디오 도구와의 연동

이 skill은 **HTML 애니메이션**(브라우저에서 실행되는)을 만듭니다. 최종 산출물이 비디오 소재로 사용되어야 한다면:

- **짧은 애니메이션/concept demo**: 여기의 방법으로 HTML 애니메이션을 만든 뒤 화면 녹화
- **장편 비디오/날티브**: 이 skill은 HTML 애니메이션에 집중합니다. 장편 비디오는 AI 비디오 생성 skill이나 전문 비디오 소프트웨어를 사용하세요
- **motion graphics**: 전문적인 After Effects/Motion Canvas가 더 적합합니다

## Popmotion 등 라이브러리에 대해

물리 기반 애니메이션(spring, decay, 정밀한 타이밍의 keyframes)이 정말 필요하다면, 당신의 엔진으로는 처리할 수 없으므로 Popmotion으로 fallback할 수 있습니다:

```html
<script src="https://unpkg.com/popmotion@11.0.5/dist/popmotion.min.js"></script>
```

하지만 **우리 엔진을 먼저 시도해 보세요**. 90%의 경우에 충분합니다.
