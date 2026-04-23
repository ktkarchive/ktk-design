# Animation Pitfalls: HTML 애니메이션에서 밟은 함정과 규칙

HTML 애니메이션을 작업할 때 가장 자주 만나는 버그와 회피 방법입니다. 각 규칙은 모두 실제 실패 사례에서 나왔습니다.

애니메이션을 만들기 전에 이 문서를 읽으면, 한 차례의 반복 작업을 줄일 수 있습니다.

## 1. 쌓임 맥락 —— `position: relative`는 기본 의무

**밟은 함정**: sentence-wrap 요소 안에 bracket-layer 3개(`position: absolute`)가 있었는데, sentence-wrap에 `position: relative`를 주지 않았습니다. 결과적으로 absolute인 bracket이 `.canvas`를 기준 좌표계로 삼아 화면 아래 200px 밖으로 날아가 버렸습니다.

**규칙**:
- `position: absolute` 자식을 포함하는 모든 컨테이너는 **반드시** `position: relative`를 명시해야 합니다
- 시각적으로 "오프셋"이 필요 없더라도, 좌표계 앵커(anchor)로서 `position: relative`를 작성해야 합니다
- `.parent { ... }`를 작성할 때, 그 자식 중에 `.child { position: absolute }`가 있다면, 본능적으로 parent에 relative를 추가하세요

**빠른 점검**: `position: absolute`가 등장할 때마다 ancestor를 거슬러 올라가, 가장 가까운 positioned ancestor가 당신이 *원하는* 좌표계인지 확인하세요.

## 2. 문자 함정 —— 희귀 Unicode에 의존하지 말 것

**밟은 함정**: `␣` (U+2423 OPEN BOX)를 써서 "공백 token"을 시각화하려고 했습니다. Noto Serif SC / Cormorant Garamond 모두 이 글리프가 없어서, 렌더링이 공백/토부(豆腐, tofu)로 나왔고 관객은 완전히 볼 수 없었습니다.

**규칙**:
- **애니메이션에 등장하는 모든 문자는 당신이 선택한 폰트에 존재해야 합니다**
- 흔한 희귀 문자 블랙리스트: `␣ ␀ ␐ ␋ ␨ ↩ ⏎ ⌘ ⌥ ⌃ ⇧ ␦ ␖ ␛`
- "공백 / 줄바꿈 / 탭" 같은 메타 문자를 표현하려면, **CSS로 만든 의미 박스**를 사용하세요:
  ```html
  <span class="space-key">Space</span>
  ```
  ```css
  .space-key {
    display: inline-flex;
    padding: 4px 14px;
    border: 1.5px solid var(--accent);
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.3em;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  ```
- Emoji 역시 검증해야 합니다: 일부 emoji는 Noto Emoji 외 폰트에서 회색 사각형(fallback)으로 나올 수 있으니, `emoji` font-family나 SVG를 사용하는 것이 좋습니다

## 3. 데이터 기반 Grid/Flex 템플릿

**밟은 함정**: 코드에서 `const N = 6`개의 token이 있었는데, CSS에 `grid-template-columns: 80px repeat(5, 1fr)`를 하드코딩했습니다. 결과적으로 6번째 token에 column이 없어서 전체 행렬이 어긋났습니다.

**규칙**:
- count가 JS 배열에서 온다면(`TOKENS.length`), CSS 템플릿 역시 데이터 기반이어야 합니다
- 방안 A: CSS 변수를 JS에서 주입
  ```js
  el.style.setProperty('--cols', N);
  ```
  ```css
  .grid { grid-template-columns: 80px repeat(var(--cols), 1fr); }
  ```
- 방안 B: `grid-auto-flow: column`을 써서 브라우저가 자동으로 확장하도록
- **"고정 숫자 + JS 상수" 조합은 금지**합니다. N이 바뀌면 CSS가 동기화되지 않습니다

## 4. 전환 단절 —— 장면 전환은 연속적이어야 한다

**밟은 함정**: zoom1 (13-19s) → zoom2 (19.2-23s) 사이에, 메인 문장은 이미 hidden 상태였고, zoom1 fade out(0.6s) + zoom2 fade in(0.6s) + stagger delay(0.2s+) = 약 1초간 순수한 공백 화면이었습니다. 관객은 애니메이션이 멈춘 줄 알았습니다.

**규칙**:
- 연속적인 장면 전환 시, fade out과 fade in은 **교차 중첩(cross-fade)**되어야 하며, 이전 장면이 완전히 사라진 뒤에 다음 장면이 시작되어서는 안 됩니다
  ```js
  // 나쁨:
  if (t >= 19) hideZoom('zoom1');      // 19.0s out
  if (t >= 19.4) showZoom('zoom2');    // 19.4s in → 중간 0.4s 공백

  // 좋음:
  if (t >= 18.6) hideZoom('zoom1');    // 0.4s 일찍 fade out 시작
  if (t >= 18.6) showZoom('zoom2');    // 동시에 fade in (cross-fade)
  ```
- 혹은 "앵커 요소"(예: 메인 문장)를 장면 사이의 시각적 연결고리로 삼아, zoom 전환 동안 잠시 다시 표시할 수 있습니다
- CSS transition의 duration을 정확히 계산하여, transition이 끝나기 전에 다음 transition이 트리거되지 않도록 하세요

## 5. Pure Render 원칙 —— 애니메이션 상태는 seek 가능해야 한다

**밟은 함정**: `setTimeout` + `fireOnce(key, fn)` 체인으로 애니메이션 상태를 트리거했습니다. 정상 재생 시에는 문제없었지만, 프레임 단위 녹화/임의 시점으로 seek할 때, 이미 실행된 setTimeout은 "과거로 되돌릴" 수 없었습니다.

**규칙**:
- `render(t)` 함수는 이상적으로 **pure function**입니다: 주어진 t에 대해 유일한 DOM 상태를 출력합니다
- 부작용(side effect)을 써야 한다면(예: class 토글), `fired` set과 명시적 reset을 함께 사용하세요:
  ```js
  const fired = new Set();
  function fireOnce(key, fn) { if (!fired.has(key)) { fired.add(key); fn(); } }
  function reset() { fired.clear(); /* 모든 .show class 제거 */ }
  ```
- Playwright / 디버깅용으로 `window.__seek(t)`를 노출하세요:
  ```js
  window.__seek = (t) => { reset(); render(t); };
  ```
- 애니메이션 관련 setTimeout은 1초 이상 걸치지 마세요. 그러지 않으면 seek 되돌림 시 꼬입니다

## 6. 폰트 로드 전 측정 = 잘못된 측정

**밟은 함정**: 페이지가 DOMContentLoaded 되자마자 `charRect(idx)`를 호출해 bracket 위치를 쟀는데, 폰트가 아직 로드되지 않아 각 문자 폭이 fallback 폰트 기준이었습니다. 위치가 전부 틀렸고, 폰트가 로드된 뒤(약 500ms 후)에도 bracket의 `left: Xpx`는 예전 값 그대로라 영구히 어긋났습니다.

**규칙**:
- DOM 측정(`getBoundingClientRect`, `offsetWidth`)에 의존하는 모든 레이아웃 코드는 **반드시** `document.fonts.ready.then()` 안에 감싸야 합니다
  ```js
  ddocument.fonts.ready.then(() => {
    requestAnimationFrame(() => {
      buildBrackets(...);  // 이 시점 폰트가 준비되어 측정이 정확함
      tick();              // 애니메이션 시작
    });
  });
  ```
- 추가 `requestAnimationFrame`은 브라우저에게 layout을 커밋할 1프레임의 시간을 줍니다
- Google Fonts CDN을 쓴다면, `<link rel="preconnect">`로 최초 로드를 가속하세요

## 7. 녹화 준비 —— 비디오 내보내기용 지점을 미리 확보하라

**밟은 함정**: Playwright `recordVideo` 기본값은 25fps로, context 생성부터 녹화를 시작합니다. 페이지 로딩, 폰트 로딩의 처음 2초가 모두 녹화됩니다. 전달 시 영상 앞부분 2초가 공백/깜빡임으로 나왔습니다.

**규칙**:
- `render-video.js` 유틸을 제공하여: warmup navigate → reload로 애니메이션 재시작 → duration 대기 → ffmpeg head trim + H.264 MP4 변환
- 애니메이션의 **제 0 프레임**은 최종 레이아웃이 완비된 전체 초기 상태여야 합니다(공백이나 로딩 중이 아님)
- 60fps가 필요하다면? ffmpeg `minterpolate` 후처리를 사용하고, 브라우저 원본 프레임률에는 기대지 마세요
- GIF가 필요하다면? 2단계 팔레트(`palettegen` + `paletteuse`)를 사용하면, 30초 1080p 애니메이션을 3MB로 압축할 수 있습니다

자세한 스크립트 호출 방식은 `video-export.md`를 참고하세요.

## 8. 일괄 내보내기 —— tmp 디렉터리는 반드시 PID를 포함해 동시성 충돌 방지

**밟은 함정**: `render-video.js`를 3개 프로세스로 병렬 실행해 3개 HTML을 녹화했습니다. TMP_DIR 이름에 `Date.now()`만 써서, 3개 프로세스가 동일 밀리초에 시작하면서 같은 tmp 디렉터리를 공유했습니다. 가장 먼저 끝난 프로세스가 tmp를 정리하자, 나머지 두 개가 디렉터리를 읽을 때 `ENOENT`가 떠서 전부 크래시 났습니다.

**규칙**:
- 여러 프로세스가 공유할 수 있는 모든 임시 디렉터리 이름에는 **PID나 무작위 접미사**를 포함해야 합니다:
  ```js
  const TMP_DIR = path.join(DIR, '.video-tmp-' + Date.now() + '-' + process.pid);
  ```
- 실제로 다중 파일 병렬 처리를 원한다면, 하나의 node 스크립트 내에서 fork하는 대신 shell의 `&` + `wait`를 사용하세요
- 여러 HTML을 일괄 녹화할 때는 보수적으로 **순차 실행**하세요(2개 이하에서는 병렬 가능, 3개 이상은 차례로)

## 9. 녹화 화면에 진행률 표시줄/재생 버튼이 찍힘 —— Chrome 요소가 영상을 오염시킴

**밟은 함정**: 애니메이션 HTML에 `.progress` 진행률 표시줄, `.replay` 재생 버튼, `.counter` 타임스탬프를 추가했습니다. 사람이 디버깅 재생하기에 편했는데, MP4로 녹화해 전달하니 이 요소들이 영상 하단에 나타났습니다. 마치 개발자 도구를 캡처한 것처럼 보였습니다.

**규칙**:
- HTML에서 사람용 "chrome 요소"(progress bar / replay button / footer / masthead / counter / phase labels)와 영상 콘텐츠 본체는 별도로 관리하세요
- **class명 규약** `.no-record`: 이 class를 가진 모든 요소는 녹화 스크립트가 자동으로 숨깁니다
- 스크립트 측(`render-video.js`)에서는 일반적인 chrome class명을 숨기는 CSS를 기본 주입합니다:
  ```
  .progress .counter .phases .replay .masthead .footer .no-record [data-role="chrome"]
  ```
- Playwright의 `addInitScript`로 주입하세요(navigate 전에 매번 실행되며, reload 후에도 안정적입니다)
- 원본 HTML(chrome 포함)을 보고 싶다면 `--keep-chrome` 플래그를 추가하세요

## 10. 녹화 시작 후 몇 초간 애니메이션이 반복됨 —— Warmup 프레임 유출

**밟은 함정**: `render-video.js`의 예전 플로우는 `goto → wait fonts 1.5s → reload → wait duration`이었습니다. 녹화는 context 생성부터 시작되어, warmup 단계에서 이미 애니메이션이 일부 재생되고, reload 후 0부터 재시작됩니다. 결과적으로 영상 앞부분 몇 초가 "애니메이션 중간 + 전환 + 애니메이션 0부터 시작"으로, 반복感이 강했습니다.

**규칙**:
- **Warmup과 Record는 반드시 독립된 context를 사용**해야 합니다:
  - Warmup context(`recordVideo` 옵션 없음): url 로드, 폰트 대기 후 close만 담당
  - Record context(`recordVideo` 있음): 완전한 새 상태에서 시작, animation을 t=0부터 녹화
- ffmpeg `-ss trim`은 Playwright의 소소한 startup latency(~0.3s)만 자를 수 있으며, **warmup 프레임을 덮을 수 없습니다**; 원천이 깨끗해야 합니다
- 녹화 context를 닫으면 = webm 파일이 디스크에 기록됩니다. 이는 Playwright의 제약사항입니다
- 관련 코드 패턴:
  ```js
  // Phase 1: warmup (throwaway)
  const warmupCtx = await browser.newContext({ viewport });
  const warmupPage = await warmupCtx.newPage();
  await warmupPage.goto(url, { waitUntil: 'networkidle' });
  await warmupPage.waitForTimeout(1200);
  await warmupCtx.close();

  // Phase 2: record (fresh)
  const recordCtx = await browser.newContext({ viewport, recordVideo });
  const page = await recordCtx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(DURATION * 1000);
  await page.close();
  await recordCtx.close();
  ```

## 11. 화면 안에 "가짜 chrome"을 그리지 말 것 —— 장식용 player UI와 진짜 chrome이 충돌

**밟은 함정**: 애니메이션에 `Stage` 컴포넌트를 썼는데, 이미 scrubber + 타임코드 + 일시정지 버튼을 내장하고 있었습니다(`.no-record` chrome에 해당하며, 내보내기 시 자동 숨김). 여기에 화면 하단에 "`00:60 ──── CLAUDE-DESIGN / ANATOMY`"라는 "잡지 페이지번호 느낌의 장식 진행률 표시줄"을 추가했습니다. 스스로 멋지다고 생각했죠. **결과**: 사용자는 진행률 표시줄이 두 개 보였습니다 — 하나는 Stage 컨트롤러, 하나는 내가 그린 장식입니다. 시각적으로 완전히 충돌하여 버그로 인식했습니다. "영상 안에 진행률 표시줄이 왜 또 있죠?"

**규칙**:

- Stage가 이미 제공하는 것: scrubber + 타임코드 + 일시정지/재생 버튼. **화면 안에 다시 그리지 마세요** — 진행률 표시, 현재 타임코드, 저작권 서명 바, 챕터 카운터 등은 chrome과 충돌하거나, 아니면 filler slop("earn its place" 원칙 위반)입니다.
- "페이지번호 느낌" "잡지 느낌" "하단 서명 바" 같은 **장식적 요구**는 AI가 자동으로 추가하는 고빈도 filler입니다. 하나라도 나타나면 경계해야 합니다 — 이것이 정말로 대체 불가능한 정보를 전달합니까? 아니면 단순히 공백을 채우기 위한 것입니까?
- 어떤 하단 바가 반드시 있어야 한다고 확신한다면(예: 애니메이션 주제 자체가 player UI 설명), 그것은 **서사적으로 필수적**이어야 하고, **시각적으로 Stage scrubber와 뚜렷이 구분**되어야 합니다(다른 위치, 다른 형태, 다른 색조).

**요소 귀속 테스트**(canvas 안에 그려지는 각 요소는 이 질문에 답할 수 있어야 합니다):

| 이것은 무엇에 속하는가 | 처리 |
|----------------|------|
| 특정 장면의 서사적 콘텐츠 | OK, 남겨둔다 |
| 전역 chrome(제어/디버그용) | `.no-record` class를 추가해 내보내기 시 숨김 |
| **어떤 장면에도 속하지 않고 chrome도 아님** | **삭제**. 이것은 주인 없는 것이며, 반드시 filler slop이다 |

**자가점검(전달 전 3초)**: 정적 이미지를 한 장 캡처하고 스스로에게 물어보세요 —

- 화면 안에 "비디오 플레이어 UI처럼 보이는 것"(가로 진행률 표시줄, 타임코드, 컨트롤 버튼 모양)이 있습니까?
- 있다면, 그것을 삭제해도 서사에 손상이 있습니까? 손상이 없다면 삭제하세요.
- 동일한 종류의 정보(진행률/시간/서명)가 두 번 나타납니까? chrome 한 곳으로 합치세요.

**반례**: 하단에 `00:42 ──── PROJECT NAME`을 그리는 것, 화면 우측 하단에 "CH 03 / 06" 챕터 카운터를 그리는 것, 화면 가장자리에 버전 "v0.3.1"을 그리는 것 — 모두 가짜 chrome filler입니다.

## 12. 녹화 앞부분 공백 + 녹화 시작점 오프셋 —— `__ready` × tick × lastTick 트리플 함정

**밟은 함정 (A · 앞부분 공백)**: 60초 애니메이션을 MP4로 내보냈는데, 앞 2-3초가 공백 페이지였습니다. `ffmpeg --trim=0.3`으로 잘라낼 수 없었습니다.

**밟은 함정 (B · 시작점 오프셋, 2026-04-20 실제 사고)**: 24초 영상을 내보냈는데, 사용자 느낌상 "영상 19초 때서야 첫 프레임이 나온다"고 했습니다. 실제로는 애니메이션이 t=5부터 녹화되어 t=24까지 녹화한 뒤 loop으로 t=0으로 돌아가, 다시 5초를 녹화해서 end까지 — 결과적으로 영상 마지막 5초가 애니메이션의 진짜 시작 부분이었습니다.

**근본 원인**(두 함정이 공유하는 하나의 근본 원인):

Playwright `recordVideo`는 `newContext()` 순간부터 WebM 쓰기를 시작합니다. 이때 Babel/React/폰트 로딩에 총 L초(2-6s)가 소요됩니다. 녹화 스크립트는 `window.__ready = true`를 "애니메이션이 여기서부터 시작"하는 앵커로 삼습니다 — 이것은 애니메이션 `time = 0`과 반드시 엄격하게 pair되어야 합니다. 흔한 두 가지 잘못된 방식이 있습니다:

| 잘못된 방식 | 증상 |
|---------|------|
| `__ready`를 `useEffect`나 동기 setup 단계에서 설정(tick 첫 프레임 이전) | 녹화 스크립트는 애니메이션이 시작된 줄 알지만, 실제 WebM은 여전히 공백 페이지를 녹화 중 → **앞부분 공백** |
| tick의 `lastTick = performance.now()`를 **스크립트 최상위**에서 초기화 | 폰트 로딩 L초가 첫 프레임 `dt`에 잡혀, `time`이 순간 L로 점프 → 녹화 전체가 L초 지연 → **시작점 오프셋** |

**✅ 올바른 완전한 starter tick 템플릿**(핸드메이드 애니메이션은 반드시 이 골격을 사용해야 합니다):

```js
// ━━━━━━ state ━━━━━━
let time = 0;
let playing = false;   // ❗ 기본값은 재생하지 않음, 폰트 ready 후 시작
let lastTick = null;   // ❗ sentinel——tick 첫 프레임 시 dt를 강제 0으로(performance.now() 사용 금지)
const fired = new Set();

// ━━━━━━ tick ━━━━━━
function tick(now) {
  if (lastTick === null) {
    lastTick = now;
    window.__ready = true;   // ✅ pair: "녹화 시작점"과 "애니메이션 t=0"이 동일 프레임
    render(0);               // DOM 준비를 한 번 더 렌더(이때 폰트는 ready 상태)
    requestAnimationFrame(tick);
    return;
  }
  const dt = (now - lastTick) / 1000;   // 첫 프레임 이후부터 dt가 진행됨
  lastTick = now;

  if (playing) {
    let t = time + dt;
    if (t >= DURATION) {
      t = window.__recording ? DURATION - 0.001 : 0;  // 녹화 중에는 loop하지 않고, 0.001s 남겨서 마지막 프레임 보존
      if (!window.__recording) fired.clear();
    }
    time = t;
    render(time);
  }
  requestAnimationFrame(tick);
}

// ━━━━━━ boot ━━━━━━
// 최상위에서 즉시 rAF하지 말 것——폰트 로드 완료 후에 시작
ocument.fonts.ready.then(() => {
  render(0);                 // 먼저 초기 화면을 그림(폰트는 ready 상태)
  playing = true;
  requestAnimationFrame(tick);  // 첫 tick이 __ready + t=0을 pair로 처리함
});

// ━━━━━━ seek 인터페이스(render-video의 방어적 교정용) ━━━━━━
window.__seek = (t) => { fired.clear(); time = t; lastTick = null; render(t); };
```

**이 템플릿이 올바른 이유**:

| 단계 | 왜 반드시 이래야 하는가 |
|------|------------------|
| `lastTick = null` + 첫 프레임 `return` | "스크립트 로드부터 tick 최초 실행까지"의 L초가 애니메이션 시간에 계산되는 것을 방지 |
| `playing = false` 기본값 | 폰트 로딩 중 `tick`이 실행되더라도 time이 진행되지 않아 렌더링 어긋남 방지 |
| `__ready`를 tick 첫 프레임에서 설정 | 녹화 스크립트가 이 시점부터 타이머를 시작하며, 해당 화면은 애니메이션의 진짜 t=0 |
| `document.fonts.ready.then(...)` 안에서 tick 시작 | 폰트 fallback 폭 측정 회피, 첫 프레임 폰트 점프 방지 |
| `window.__seek` 존재 | `render-video.js`가 능동적으로 교정할 수 있게 함——두 번째 방어선 |

**녹화 스크립트 측의 대응 방어**:
1. `addInitScript`로 `window.__recording = true` 주입(page goto 이전)
2. `waitForFunction(() => window.__ready === true)`를 기다리고, 이 시점의 오프셋을 ffmpeg trim으로 기록
3. **추가**: `__ready` 이후 `page.evaluate(() => window.__seek && window.__seek(0))`를 호출해, HTML의 time 편차를 강제로 0으로 재설정——이것은 starter 템플릿을 엄격히 준수하지 않는 HTML을 대상으로 하는 두 번째 방어선입니다

**검증 방법**: MP4 내보내기 후
```bash
ffmpeg -i video.mp4 -ss 0 -vframes 1 frame-0.png
ffmpeg -i video.mp4 -ss $DURATION-0.1 -vframes 1 frame-end.png
```
첫 프레임은 반드시 애니메이션 t=0의 초기 상태여야 합니다(중간이 아니며, 검정도 아님), 마지막 프레임은 애니메이션 종료 상태여야 합니다(두 번째 loop의 어떤 순간도 아님).

**참고 구현**: `assets/animations.jsx`의 Stage 컴포넌트, `scripts/render-video.js`는 모두 이 프로토콜대로 구현되어 있습니다. 핸드메이드 HTML은 반드시 starter tick 템플릿을 따라야 합니다——한 줄 한 줄이具體적인 버그를 방지하기 위한 것입니다.

## 13. 녹화 중 loop 금지 —— `window.__recording` 신호

**밟은 함정**: 애니메이션 Stage의 기본값은 `loop=true`(브라우저에서 미리보기 편의용)입니다. `render-video.js`는 duration 초를 녹화한 뒤 300ms 버퍼를 더 기다렸다가 중지하는데, 이 300ms가 Stage를 다음 사이클로 진입시켰습니다. ffmpeg `-t DURATION`으로 자를 때, 마지막 0.5-1s가 다음 사이클에 속하게 되어——영상 말미에 갑자기 첫 프레임(Scene 1)으로 돌아가, 관객은 영상에 버그가 있다고 생각했습니다.

**근본 원인**: 녹화 스크립트와 HTML 사이에 "나 지금 녹화 중이야"라는 핸드셰이크 프로토콜이 없었습니다. HTML은 자신이 녹화되고 있다는 것을 몰랐고, 여전히 브라우저 인터랙션 시나리오대로 loop했습니다.

**규칙**:

1. **녹화 스크립트**: `addInitScript` 안에 `window.__recording = true`를 주입합니다(page goto 이전):
   ```js
   await recordCtx.addInitScript(() => { window.__recording = true; });
   ```

2. **Stage 컴포넌트**: 이 신호를 인식해 loop=false를 강제합니다:
   ```js
   const effectiveLoop = (typeof window !== 'undefined' && window.__recording) ? false : loop;
   // ...
   if (next >= duration) return effectiveLoop ? 0 : duration - 0.001;
   //                                                       ↑ 0.001을 남겨서 Sprite end=duration일 때 꺼지는 것 방지
   ```

3. **마지막 Sprite의 fadeOut**: 녹화 시나리오에서는 `fadeOut={0}`으로 설정해야 합니다. 그렇지 않으면 영상 말미가 투명/어둡게 페이드아웃됩니다——사용자는 선명한 마지막 프레임에 머물기를 원하며, 페이드아웃을 원하지 않습니다. 핸드메이드 HTML을 작성할 때도 마지막 Sprite는 `fadeOut={0}`을 권장합니다.

**참고 구현**: `assets/animations.jsx`의 Stage / `scripts/render-video.js`는 모두 이 핸드셰이크를 내장하고 있습니다. 핸드메이드 Stage는 반드시 `__recording` 감지를 구현해야 합니다——그렇지 않으면 녹화 시 반드시 이 함정을 밟습니다.

**검증**: MP4 내보내기 후 `ffmpeg -ss 19.8 -i video.mp4 -frames:v 1 end.png`로, 마지막 0.2초가 여전히 예상된 마지막 프레임인지, 갑자기 다른 scene으로 전환되지 않았는지 확인하세요.

## 14. 60fps 비디오 기본값은 프레임 복사 —— minterpolate 호환성 문제

**밟은 함정**: `convert-formats.sh`에서 `minterpolate=fps=60:mi_mode=mci...`로 생성한 60fps MP4가, macOS QuickTime / Safari 일부 버전에서 열리지 않았습니다(완전히 검정이거나 아예 거부). VLC / Chrome에서는 열렸습니다.

**근본 원인**: minterpolate가 출력한 H.264 elementary stream에, 일부 플레이어가 파싱에 문제가 있는 SEI / SPS 필드가 포함되어 있었습니다.

**규칙**:

- 기본 60fps는 단순 `fps=60` 필터(프레임 복사)를 사용합니다. 호환성이 넓습니다(QuickTime/Safari/Chrome/VLC 모두 열림)
- 고품질 보간은 `--minterpolate` 플래그로 명시적으로 활성화하세요——하지만 **반드시 로컬에서 타겟 플레이어로 테스트한 뒤** 전달하세요
- 60fps 태그의 가치는 **업로드 플랫폼의 알고리즘 인식**에 있습니다(Bilibili / YouTube에서 60fps 마크가 있으면 우선 스트리밍됩니다). CSS 애니메이션의 실제 체감 유동성 향상은 미미합니다
- `-profile:v high -level 4.0`을 추가해 H.264 범용 호환성을 높이세요

**`convert-formats.sh`는 이미 기본값을 호환 모드로 변경했습니다**. 고품질 보간이 필요하다면 `--minterpolate` 플래그를 추가하세요:
```bash
bash convert-formats.sh input.mp4 --minterpolate
```

## 15. `file://` + 외부 `.jsx`의 CORS 함정 —— 단일 파일 전달 시 엔진을 반드시 인라인할 것

**밟은 함정**: 애니메이션 HTML에서 `<script type="text/babel" src="animations.jsx"></script>`로 외부 엔진을 불러왔습니다. 로컬에서 더블클릭으로 열기(`file://` 프로토콜) → Babel Standalone이 XHR로 `.jsx`를 로드 → Chrome이 `Cross origin requests are only supported for protocol schemes: http, https, chrome, chrome-extension...`를 출력 → 전체 화면이 검정이 되고, `pageerror`는 나오지 않고 console error만 나와 "애니메이션이 안 켜졌나"로 오진하기 쉬웠습니다.

HTTP server를 켜도 구제가 안 될 수 있습니다——로컬에 글로벌 프록시가 있으면 `localhost`도 프록시를 타서 502 / 연결 실패가 반환됩니다.

**규칙**:

- **단일 파일 전달(더블클릭으로 바로 사용하는 HTML)** → `animations.jsx`는 반드시 **인라인**으로 `<script type="text/babel">...</script>` 태그 안에 넣고, `src="animations.jsx"`를 쓰지 마세요
- **다중 파일 프로젝트(HTTP server를 켜서 데모)** → 외부 로드가 가능하지만, 전달 시 `python3 -m http.server 8000` 명령을 명시적으로 적으세요
- 판단 기준: 사용자에게 전달하는 것이 "HTML 파일"인가, "server가 필요한 프로젝트 디렉터리"인가? 전자라면 인라인을 사용하세요
- Stage 컴포넌트 / animations.jsx는 흔히 200+ 줄입니다——HTML `<script>` 블록에 붙여넣는 것도 완전히 괜찮으니, 용량을 걱정하지 마세요

**최소 검증**: 당신이 생성한 HTML을 더블클릭으로 열고, **어떤 server를 통해서도 열지 마세요**. Stage가 정상적으로 애니메이션 첫 프레임을 표시하면 통과입니다.

## 16. 장면 간 반전 색상 맥락 —— 화면 내 요소에 하드코딩 색상 금지

**밟은 함정**: 다중 장면 애니메이션을 만들 때, `ChapterLabel` / `SceneNumber` / `Watermark` 등 **여러 장면에 걸쳐 등장**하는 요소들에 컴포넌트 안에서 `color: '#1A1A1A'`(어두운 텍스트)를 하드코딩했습니다. 앞 4개 장면은 밝은 바탕이라 괜찮았는데, 5번째 검은 바탕 장면에서 "05"와 워터마크가 그대로 사라졌습니다——에러도 안 나고, 어떤 검사도 트리거되지 않으며, 핵심 정보가 투명해진 것입니다.

**규칙**:

- **여러 장면에 걸쳐 재사용되는 화면 내 요소**(chapter 라벨 / scene 번호 / 타임코드 / 워터마크 / 저작권 바)는 **하드코딩 색상값을 금지**합니다
- 다음 세 가지 방식 중 하나로 대체하세요:
  1. **`currentColor` 상속**: 요소에는 `color: currentColor`만 작성하고, 상위 scene 컨테이너가 `color: 계산값`을 설정
  2. **invert prop**: 컴포넌트가 `<ChapterLabel invert />`처럼 수동으로 밝기/어두기를 전환하도록
  3. **바탕색 기반 자동 계산**: `color: contrast-color(var(--scene-bg))`(CSS 4 신규 API, 또는 JS 판단)
- 전달 전에 Playwright로 **각 장면의 대표 프레임**을 추출하고, 육안으로 "장면 간 요소"가 모두 보이는지 확인하세요

이 함정의 위험성은——**버그 알람이 전혀 없다**는 것입니다. 육안이나 OCR로만 발견할 수 있습니다.

## 빠른 자가점검 리스트(착수 전 5초)

- [ ] 각 `position: absolute`의 부모 요소에 `position: relative`가 있는가?
- [ ] 애니메이션의 특수 문자(`␣` `⌘` `emoji`)가 폰트에 모두 존재하는가?
- [ ] Grid/Flex 템플릿의 count가 JS 데이터의 length와 일치하는가?
- [ ] 장면 전환 사이에 cross-fade가 있고, 0.3초 이상의 순수 공백은 없는가?
- [ ] DOM 측정 코드가 `document.fonts.ready.then()` 안에 있는가?
- [ ] `render(t)`가 pure하거나, 명확한 reset 메커니즘이 있는가?
- [ ] 제 0 프레임이 완전한 초기 상태이며, 공백이 아닌가?
- [ ] 화면 안에 "가짜 chrome" 장식(진행률 표시줄/타임코드/하단 서명 바가 Stage scrubber와 충돌)이 없는가?
- [ ] 애니메이션 tick 첫 프레임이 `window.__ready = true`를 동기적으로 설정하는가?(animations.jsx를 쓰면 자동; 핸드메이드 HTML은 직접 추가)
- [ ] Stage가 `window.__recording`을 감지해 loop=false를 강제하는가?(핸드메이드 HTML은 반드시 추가)
- [ ] 마지막 Sprite의 `fadeOut`이 0으로 설정되어 영상 말미에 선명한 프레임에 머무는가?
- [ ] 60fps MP4가 기본적으로 프레임 복사 모드(호환성)를 사용하고, 고품질 보간은 `--minterpolate`를 추가하는가?
- [ ] 내보내기 후 제 0 프레임 + 마지막 프레임을 추출해, 애니메이션 초기/최종 상태가 맞는지 검증했는가?
- [ ] 구체적인 브랜드(Stripe/Anthropic/Lovart/...)가 관련된 경우: "브랜드 자산 프로토콜"(SKILL.md §1.a 다섯 단계)을 완료했는가? `brand-spec.md`를 작성했는가?
- [ ] 단일 파일 전달 HTML: `animations.jsx`가 인라인이며, `src="..."`가 아닌가?(file:// 환경에서 external .jsx는 CORS로 검정 화면이 됨)
- [ ] 장면 간 등장하는 요소(chapter 라벨/워터마크/scene 번호)에 하드코딩 색상이 없고, 각 장면 바탕색 아래에서 모두 보이는가?
