# React + Babel 프로젝트 규격

HTML+React+Babel로 프로토타입을 제작할 때 반드시 지켜야 할 기술 규격입니다. 지키지 않으면 작동하지 않습니다.

## 고정된 Script Tag(반드시 해당 버전 사용)

HTML의 `<head>`에 다음 세 개의 script tag를 넣되, **고정된 버전 + integrity hash**를 사용하세요:

```html
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
```

**절대** `react@18`이나 `react@latest`처럼 고정되지 않은(unpinned) 버전을 사용하지 마세요. 버전 드리프트(drift)나 캐시 문제가 발생합니다.

**절대** `integrity`를 생략하지 마세요. CDN이 탈취되거나 변조되었을 때 이것이 마지막 방어선입니다.

## 파일 구조

```
프로젝트명/
├── index.html               # 메인 HTML
├── components.jsx           # 컴포넌트 파일(type="text/babel"로 로드)
├── data.js                  # 데이터 파일
└── styles.css               # 추가 CSS(선택사항)
```

HTML에서 로드하는 방식:

```html
<!-- 먼저 React+Babel -->
<script src="https://unpkg.com/react@18.3.1/..."></script>
<script src="https://unpkg.com/react-dom@18.3.1/..."></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/..."></script>

<!-- 그 다음 당신의 컴포넌트 파일 -->
<script type="text/babel" src="components.jsx"></script>
<script type="text/babel" src="pages.jsx"></script>

<!-- 마지막으로 메인 진입점 -->
<script type="text/babel">
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
</script>
```

**절대** `type="module"`을 사용하지 마세요. Babel과 충돌합니다.

## 절대 어겨서는 안 될 세 가지 규칙

### 규칙 1: styles 객체는 반드시 유일한 이름 사용

**잘못된 예**(여러 컴포넌트 사용 시 반드시 오류 발생):
```jsx
// components.jsx
const styles = { button: {...}, card: {...} };

// pages.jsx  ← 이름이 겹쳐 덮어씁니다!
const styles = { container: {...}, header: {...} };
```

**올바른 예**: 각 컴포넌트 파일의 styles에는 고유한 접두사를 사용하세요.

```jsx
// terminal.jsx
const terminalStyles = { 
  screen: {...}, 
  line: {...} 
};

// sidebar.jsx
const sidebarStyles = { 
  container: {...}, 
  item: {...} 
};
```

**또는 inline styles 사용**(소형 컴포넌트 권장):
```jsx
<div style={{ padding: 16, background: '#111' }}>...</div>
```

이 규칙은 **협상 불가**입니다. `const styles = {...}`를 작성할 때마다 반드시 구체적인 이름으로 바꾸세요. 그렇지 않으면 여러 컴포넌트를 로드할 때 전체 스택에서 오류가 발생합니다.

### 규칙 2: Scope는 공유되지 않으므로 수동으로 export 필요

**핵심 개념**: 각 `<script type="text/babel">`은 Babel에 의해 독립적으로 컴파일되며, 서로 간에 **scope가 공유되지 않습니다**. `components.jsx`에서 정의한 `Terminal` 컴포넌트는 `pages.jsx`에서 **기본적으로 undefined**입니다.

**해결 방법**: 각 컴포넌트 파일의 마지막에, 공유해야 할 컴포넌트나 유틸리티를 `window`에 export하세요:

```jsx
// components.jsx 마지막
function Terminal(props) { ... }
function Line(props) { ... }
const colors = { green: '#...', red: '#...' };

Object.assign(window, {
  Terminal, Line, colors,
  // 다른 파일에서 사용할 모든 것을 여기에 나열하세요
});
```

그러면 `pages.jsx`에서 `<Terminal />`을 바로 사용할 수 있습니다. JSX는 `window.Terminal`에서 해당 컴포넌트를 찾기 때문입니다.

### 규칙 3: scrollIntoView 사용 금지

`scrollIntoView`는 전체 HTML 컨테이너를 위로 밀어버려 web harness 레이아웃을 망가뜨립니다. **영원히 사용하지 마세요**.

대안:
```js
// 컨테이너 내 특정 위치로 스크롤
container.scrollTop = targetElement.offsetTop;

// 또는 element.scrollTo 사용
container.scrollTo({
  top: targetElement.offsetTop - 100,
  behavior: 'smooth'
});
```

## Claude API 호출(HTML 내)

일부 기본 design-agent 환경(예: Claude.ai Artifacts)에는 별도 설정 없이 사용 가능한 `window.claude.complete`가 있지만, 대부분의 agent 환경(Claude Code / Codex / Cursor / Trae 등)의 로컬 환경에는 **없습니다**.

당신의 HTML 프로토타입에서 데모용으로 LLM을 호출해야 한다면(예: 채팅 인터페이스 제작), 두 가지 옵션이 있습니다:

### 옵션 A: 실제 호출 없이 mock 사용

데모 시나리오에 권장됩니다. 가상 helper를 작성해 미리 정의된 응답을 반환하세요:
```jsx
window.claude = {
  async complete(prompt) {
    await new Promise(r => setTimeout(r, 800)); // 지연 시간 시뮬레이션
    return "이것은 mock 응답입니다. 실제 배포 시에는 실제 API로 교체하세요.";
  }
};
```

### 옵션 B: Anthropic API 직접 호출

API key가 필요하며, 사용자가 HTML에 자신의 key를 입력해야 실행됩니다. **절대 HTML에 key를 하드코딩하지 마세요**.

```html
<input id="api-key" placeholder="당신의 Anthropic API key를 붙여넣으세요" />
<script>
window.claude = {
  async complete(prompt) {
    const key = document.getElementById('api-key').value;
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    return data.content[0].text;
  }
};
</script>
```

**주의**: 브라우저에서 직접 Anthropic API를 호출하면 CORS 문제가 발생할 수 있습니다. 사용자가 제공한 미리보기 환경에서 CORS 우회를 지원하지 않는다면, 이 방법은 통하지 않습니다. 이 경우 옵션 A인 mock을 사용하거나, proxy 백엔드가 필요하다고 사용자에게 안내하세요.

### 옵션 C: agent 측 LLM 기능을 사용해 mock 데이터 생성

로컬 데모용으로만 사용한다면, 현재 agent 세션에서 해당 agent의 LLM 기능(또는 사용자가 설치한 multi-model류 skill)을 임시로 호출해 mock 응답 데이터를 생성한 뒤, 이를 HTML에 하드코딩하세요. 이렇게 하면 HTML 실행 시 어떤 API에도 전혀 의존하지 않습니다.

## 전형적인 HTML 시작 템플릿

이 템플릿을 복사해서 React 프로토타입의 뼈대로 사용하세요:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Prototype Name</title>

  <!-- React + Babel 고정 버전 -->
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>

  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; width: 100%; }
    body { 
      font-family: -apple-system, 'SF Pro Text', sans-serif;
      background: #FAFAFA;
      color: #1A1A1A;
    }
    #root { min-height: 100vh; }
  </style>
</head>
<body>
  <div id="root"></div>

  <!-- 당신의 컴포넌트 파일 -->
  <script type="text/babel" src="components.jsx"></script>

  <!-- 메인 진입점 -->
  <script type="text/babel">
    const { useState, useEffect } = React;

    function App() {
      return (
        <div style={{padding: 40}}>
          <h1>Hello</h1>
        </div>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
```

## 흔한 오류 및 해결 방법

**`styles is not defined` 또는 `Cannot read property 'button' of undefined`**
→ 한 파일에서 `const styles`를 정의했는데, 다른 파일에서 덮어썼습니다. 각각을 구체적인 이름으로 변경하세요.

**`Terminal is not defined`**
→ 파일 간 참조 시 scope가 공유되지 않습니다. Terminal을 정의한 파일의 마지막에 `Object.assign(window, {Terminal})`을 추가하세요.

**전체 페이지가 흰 화면이고 콘솔에 오류가 없음**
→ 대부분 JSX 문법 오류인데 Babel이 콘솔에 제대로 표시하지 않은 경우입니다. `babel.min.js`를 임시로 압축 해제 버전인 `babel.js`로 교체하면 오류 메시지가 더 명확해집니다.

**ReactDOM.createRoot is not a function**
→ 버전이 맞지 않습니다. react-dom@18.3.1(이 아닌 17이나 다른 버전)을 사용했는지 확인하세요.

**`Objects are not valid as a React child`**
→ 객체를 JSX/문자열 대신 렌더링했습니다. 보통 `{someObj}`를 써야 할 곳에 `{someObj.name}`을 쓰지 않은 경우입니다.

## 대형 프로젝트의 파일 분할 방법

**1000줄 이상의 단일 파일**은 유지보수가 어렵습니다. 분할하는 기본적인 방법은 다음과 같습니다:

```
프로젝트/
├── index.html
├── src/
│   ├── primitives.jsx      # 기본 요소: Button, Card, Badge...
│   ├── components.jsx      # 비즈니스 컴포넌트: UserCard, PostList...
│   ├── pages/
│   │   ├── home.jsx        # 홈페이지
│   │   ├── detail.jsx      # 상세 페이지
│   │   └── settings.jsx    # 설정 페이지
│   ├── router.jsx          # 간단한 라우팅(React state 전환)
│   └── app.jsx             # 진입 컴포넌트
└── data.js                 # mock data
```

HTML에서는 순서대로 로드합니다:
```html
<script type="text/babel" src="src/primitives.jsx"></script>
<script type="text/babel" src="src/components.jsx"></script>
<script type="text/babel" src="src/pages/home.jsx"></script>
<script type="text/babel" src="src/pages/detail.jsx"></script>
<script type="text/babel" src="src/pages/settings.jsx"></script>
<script type="text/babel" src="src/router.jsx"></script>
<script type="text/babel" src="src/app.jsx"></script>
```

**각 파일의 마지막**에 반드시 `Object.assign(window, {...})`를 추가해 공유할 내용을 export하세요.
