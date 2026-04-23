# Tweaks: 디자인 변형 실시간 파라미터 조정

Tweaks는 이 skill의 핵심 기능입니다. 사용자가 코드를 수정하지 않고도 실시간으로 variations를 전환하고 파라미터를 조정할 수 있게 합니다.

**에이전트(agent) 환경 간 호환**: 일부 design-agent의 기본 환경(예: Claude.ai Artifacts)은 호스트의 postMessage를 통해 tweak 값을 소스코드에 다시 써서 영속화합니다. 이 skill은 **순수 프론트엔드 localStorage 방식**을 사용합니다. 효과는 동일하며(새로고침 시 상태 유지), 다만 영속화가 브라우저의 localStorage에서 이루어지지 소스코드 파일이 아닙니다. 이 방식은 모든 에이전트 환경(Claude Code / Codex / Cursor / Trae / 기타)에서 작동합니다.

## Tweaks를 추가하는 시점

- 사용자가 "파라미터 조정 가능" / "여러 버전 전환"을 명시적으로 요청한 경우
- 디자인에 여러 variations를 비교해야 하는 경우
- 사용자가 말하지 않았더라도, 주관적으로 **몇 가지 의미 있는 tweaks를 추가하면 사용자에게 가능성을 보여줄 수 있다고 판단되는 경우**

기본 권장사항: 사용자가 요청하지 않더라도 **모든 디자인에 2~3개의 tweaks**(색상 테마 / 글자 크기 / layout 변형)를 추가하세요. 사용자에게 가능성의 공간을 보여주는 것 자체가 디자인 서비스의 일부입니다.

## 구현 방식 (순수 프론트엔드 버전)

### 기본 구조

```jsx
const TWEAK_DEFAULTS = {
  "primaryColor": "#D97757",
  "fontSize": 16,
  "density": "comfortable",
  "dark": false
};

function useTweaks() {
  const [tweaks, setTweaks] = React.useState(() => {
    try {
      const stored = localStorage.getItem('design-tweaks');
      return stored ? { ...TWEAK_DEFAULTS, ...JSON.parse(stored) } : TWEAK_DEFAULTS;
    } catch {
      return TWEAK_DEFAULTS;
    }
  });

  const update = (patch) => {
    const next = { ...tweaks, ...patch };
    setTweaks(next);
    try {
      localStorage.setItem('design-tweaks', JSON.stringify(next));
    } catch {}
  };

  const reset = () => {
    setTweaks(TWEAK_DEFAULTS);
    try {
      localStorage.removeItem('design-tweaks');
    } catch {}
  };

  return { tweaks, update, reset };
}
```

### Tweaks 패널 UI

우측 하단 고정 패널. 접기/펼치기 가능:

```jsx
function TweaksPanel() {
  const { tweaks, update, reset } = useTweaks();
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 9999,
    }}>
      {open ? (
        <div style={{
          background: 'white',
          border: '1px solid #e5e5e5',
          borderRadius: 12,
          padding: 20,
          boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
          width: 280,
          fontFamily: 'system-ui',
          fontSize: 13,
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 16,
          }}>
            <strong>Tweaks</strong>
            <button onClick={() => setOpen(false)} style={{
              border: 'none', background: 'none', cursor: 'pointer', fontSize: 16,
            }}>×</button>
          </div>

          {/* 색상 */}
          <label style={{ display: 'block', marginBottom: 12 }}>
            <div style={{ marginBottom: 4, color: '#666' }}>주요 색상</div>
            <input 
              type="color" 
              value={tweaks.primaryColor} 
              onChange={e => update({ primaryColor: e.target.value })}
              style={{ width: '100%', height: 32 }}
            />
          </label>

          {/* 글자 크기 슬라이더 */}
          <label style={{ display: 'block', marginBottom: 12 }}>
            <div style={{ marginBottom: 4, color: '#666' }}>글자 크기 ({tweaks.fontSize}px)</div>
            <input 
              type="range" 
              min={12} max={24} step={1}
              value={tweaks.fontSize}
              onChange={e => update({ fontSize: +e.target.value })}
              style={{ width: '100%' }}
            />
          </label>

          {/* 밀도 옵션 */}
          <label style={{ display: 'block', marginBottom: 12 }}>
            <div style={{ marginBottom: 4, color: '#666' }}>밀도</div>
            <select 
              value={tweaks.density}
              onChange={e => update({ density: e.target.value })}
              style={{ width: '100%', padding: 6 }}
            >
              <option value="compact">촘촘하게</option>
              <option value="comfortable">편안하게</option>
              <option value="spacious">여유 있게</option>
            </select>
          </label>

          {/* 다크 모드 토글 */}
          <label style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 8,
            marginBottom: 16,
          }}>
            <input 
              type="checkbox" 
              checked={tweaks.dark}
              onChange={e => update({ dark: e.target.checked })}
            />
            <span>다크 모드</span>
          </label>

          <button onClick={reset} style={{
            width: '100%',
            padding: '8px 12px',
            background: '#f5f5f5',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 12,
          }}>초기화</button>
        </div>
      ) : (
        <button 
          onClick={() => setOpen(true)}
          style={{
            background: '#1A1A1A',
            color: 'white',
            border: 'none',
            borderRadius: 999,
            padding: '10px 16px',
            fontSize: 12,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >⚙ Tweaks</button>
      )}
    </div>
  );
}
```

### Tweaks 적용하기

메인 컴포넌트에서 Tweaks를 사용합니다:

```jsx
function App() {
  const { tweaks } = useTweaks();

  return (
    <div style={{
      '--primary': tweaks.primaryColor,
      '--font-size': `${tweaks.fontSize}px`,
      background: tweaks.dark ? '#0A0A0A' : '#FAFAFA',
      color: tweaks.dark ? '#FAFAFA' : '#1A1A1A',
    }}>
      {/* 콘텐츠 */}
      <TweaksPanel />
    </div>
  );
}
```

CSS에서 변수를 사용합니다:

```css
button.cta {
  background: var(--primary);
  color: white;
  font-size: var(--font-size);
}
```

## 대표적인 Tweak 옵션

디자인 유형별로 어떤 tweaks를 추가하면 좋은지:

### 공통
- 주요 색상 (color picker)
- 글자 크기 (slider 12-24px)
- 서체 (select: display font vs body font)
- 다크 모드 (toggle)

### 슬라이드 덱(deck)
- 테마 (light/dark/brand)
- 배경 스타일 (solid/gradient/image)
- 서체 대비 (더 장식적인 vs 더 절제된)
- 정보 밀도 (minimal/standard/dense)

### 프로토타입
- 레이아웃 변형 (layout A / B / C)
- 인터랙션 속도 (animation speed 0.5x-2x)
- 데이터량 (mock 데이터 개수 5/20/100)
- 상태 (empty/loading/success/error)

### 애니메이션
- 속도 (0.5x-2x)
- 반복 (once/loop/ping-pong)
- Easing (linear/easeOut/spring)

### 랜딩 페이지
- Hero 스타일 (image/gradient/pattern/solid)
- CTA 문구 (몇 가지 변형)
- 구조 (single column / two column / sidebar)

## Tweaks 설계 원칙

### 1. 의미 있는 옵션만 제공하세요

모든 tweak는 **실제로 유용한 디자인 옵션**을 보여줘야 합니다. 실제로 아무도 전환하지 않을 tweaks는 추가하지 마세요(예: border-radius 0-50px slider. 사용자가 중간값을 모두 조정해봐도 다 못생기게 보입니다).

좋은 tweak은 **이산적이고 의도가 담긴 variations**를 노출합니다:
- "모서리 스타일": 둥글게 없음 / 살짝 둥글게 / 크게 둥글게 (세 가지 옵션)
- 나쁜 예: "모서리": 0-50px slider

### 2. 적을수록 좋습니다

하나의 디자인에 Tweaks 패널은 **최대 5-6개**의 옵션까지만 추가하세요. 그 이상이 되면 "설정 페이지"가 되어 variations를 빠르게 탐색하는 의미를 잃습니다.

### 3. 기본값은 완성된 디자인이어야 합니다

Tweaks는 **덧붙이는 요소**입니다. 기본값 자체가 완성되고 배포 가능한 디자인이어야 합니다. 사용자가 Tweaks 패널을 닫으면 보이는 것이 최종 결과물이어야 합니다.

### 4. 적절히 그룹화하세요

옵션이 많을 때는 그룹별로 표시하세요:

```
---- 시각 ----
주요 색상 | 글자 크기 | 다크 모드

---- 레이아웃 ----
밀도 | 사이드바 위치

---- 콘텐츠 ----
표시 데이터량 | 상태
```

## 향후 소스코드 수준의 영속화 호스트와의 호환성

나중에 디자인을 소스코드 수준의 tweaks를 지원하는 환경(예: Claude.ai Artifacts)에 업로드해도 동작하도록 **EDITMODE 마커 블록**을 유지하세요:

```jsx
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#D97757",
  "fontSize": 16,
  "density": "comfortable",
  "dark": false
}/*EDITMODE-END*/;
```

마커 블록은 localStorage 방식에서는 **아무런 기능이 없습니다**(그냥 일반 주석일 뿐), 하지만 소스코드 쓰기를 지원하는 호스트에서는 읽혀서 소스코드 수준의 영속화를 구현합니다. 이것을 추가해도 현재 환경에는 영향이 없으면서 동시에 향후 호환성을 유지할 수 있습니다.

## 자주 묻는 질문

**Tweaks 패널이 디자인 콘텐츠를 가립니다**
→ 닫을 수 있게 만드세요. 기본적으로 닫힌 상태이며 작은 버튼을 표시하고, 사용자가 클릭하면 펼쳐지게 합니다.

**사용자가 tweaks를 전환한 후에도 설정이 반복해서 초기화됩니다**
→ 이미 localStorage를 사용하고 있습니다. 새로고침 후에도 유지되지 않는다면 localStorage가 사용 가능한지 확인하세요(시크릿 모드에서는 실패할 수 있으므로 catch 처리가 필요합니다).

**여러 HTML 페이지에서 tweaks를 공유하고 싶습니다**
→ localStorage 키에 프로젝트 이름을 추가하세요: `design-tweaks-[projectName]`.

**tweak 간에 연동 관계를 만들고 싶습니다**
→ `update` 함수에 로직을 추가하세요:

```jsx
const update = (patch) => {
  let next = { ...tweaks, ...patch };
  // 연동: 다크 모드 선택 시 자동으로 텍스트 색상 전환
  if (patch.dark === true && !patch.textColor) {
    next.textColor = '#F0EEE6';
  }
  setTweaks(next);
  localStorage.setItem(...);
};
```
