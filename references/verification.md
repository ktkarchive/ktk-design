# Verification: 출력 검증 프로세스

일부 design-agent 네이티브 환경(예: Claude.ai Artifacts)에는 내장된 `fork_verifier_agent`가 있어, subagent를 통해 iframe 스크린샷으로 검증합니다. 하지만 대부분의 agent 환경(Claude Code / Codex / Cursor / Trae 등)에는 이러한 내장 기능이 없습니다——Playwright를 활용해 수동으로 동일한 검증 시나리오를 커버할 수 있습니다.

## 검증 체크리스트

HTML을 생성할 때마다 다음 체크리스트를 반드시 진행하세요:

### 1. 브라우저 렌더링 확인 (필수)

가장 기본적인 사항: **HTML 파일이 정상적으로 열리는가?** macOS에서는:

```bash
open -a "Google Chrome" "/path/to/your/design.html"
```

또는 Playwright로 스크린샷을 캡처할 수도 있습니다(다음 섹션 참고).

### 2. 콘솔 오류 확인

HTML 파일에서 가장 흔한 문제는 JS 오류로 인한 백화 현상(white screen)입니다. Playwright로 한 번 실행해 보세요:

```bash
python ~/.claude/skills/claude-design/scripts/verify.py path/to/design.html
```

이 스크립트는 다음 작업을 수행합니다:
1. headless chromium으로 HTML 열기
2. 스크린샷을 프로젝트 디렉토리에 저장
3. 콘솔 오류 캡처
4. 상태 보고

자세한 내용은 `scripts/verify.py`를 참고하세요.

### 3. 다중 뷰포트(Viewport) 확인

반응형 디자인(Responsive Design)이라면 여러 뷰포트에서 스크린샷을 캡처하세요:

```bash
python verify.py design.html --viewports 1920x1080,1440x900,768x1024,375x667
```

### 4. 인터랙션(Interaction) 확인

Tweaks, 애니메이션, 버튼 전환 등은 기본 정적 스크린샷으로는 확인할 수 없습니다. **사용자가 직접 브라우저를 열어 클릭해 볼 것을 권장**하거나, Playwright로 화면 녹화를 진행하세요:

```python
page.video.record('interaction.mp4')
```

### 5. 슬라이드 페이지별 확인

Deck 형태의 HTML은 페이지별로 하나씩 캡처합니다:

```bash
python verify.py deck.html --slides 10  # 앞 10장 캡처
```

`deck-slide-01.png`, `deck-slide-02.png`... 를 생성하여 빠르게 둘러볼 수 있습니다.

## Playwright 설정

처음 사용할 때는 다음을 설치하세요:

```bash
# 아직 설치되지 않은 경우
npm install -g playwright
npx playwright install chromium

# 또는 Python 버전
pip install playwright
playwright install chromium
```

사용자가 이미 Playwright를 전역으로 설치했다면 바로 사용하면 됩니다.

## 스크린샷 모범 사례

### 전체 페이지 캡처

```python
page.screenshot(path='full.png', full_page=True)
```

### 뷰포트(Viewport) 캡처

```python
page.screenshot(path='viewport.png')  # 기본값은 보이는 영역만 캡처
```

### 특정 요소 캡처

```python
element = page.query_selector('.hero-section')
element.screenshot(path='hero.png')
```

### 고해상도 스크린샷

```python
page = browser.new_page(device_scale_factor=2)  # retina
```

### 애니메이션이 끝난 후 캡처

```python
page.wait_for_timeout(2000)  # 애니메이션이 안정될 때까지 2초 대기
page.screenshot(...)
```

## 사용자에게 스크린샷 전송

### 로컬 스크린샷 바로 열기

```bash
open screenshot.png
```

사용자는 자신의 Preview/Figma/VSCode/브라우저에서 확인할 수 있습니다.

### 이미지 업로드 및 공유 링크

원격 협업자(예: Slack/飞书/微信)와 공유해야 할 경우, 사용자가 자신의 이미지 업로드 도구나 MCP를 통해 업로드하도록 안내하세요:

```bash
python ~/Documents/写作/tools/upload_image.py screenshot.png
```

ImgBB의 영구 링크를 반환하며, 어디에든 붙여넣을 수 있습니다.

## 검증 중 오류 발생 시

### 페이지 백화(White Screen)

콘솔에 반드시 오류가 있습니다. 먼저 다음을 확인하세요:

1. React+Babel script 태그의 integrity hash가 올바른지 확인 (`react-setup.md` 참고)
2. `const styles = {...}`의 네이밍 충돌 여부
3. 파일 간 컴포넌트가 `window`에 export되었는지 확인
4. JSX 문법 오류 (babel.min.js는 오류를 표시하지 않으므로, 압축되지 않은 babel.js로 교체)

### 애니메이션 끊김

- Chrome DevTools Performance 탭으로 한 동안 녹화해 보세요
- layout thrashing(빈번한 reflow)를 찾으세요
- 애니메이션 효과는 가능한 `transform`과 `opacity`를 사용하세요 (GPU 가속)

### 폰트 문제

- `@font-face`의 URL 접근 가능 여부 확인
- fallback 폰트 확인
- 중국어 폰트 로딩이 느린 경우: 먼저 fallback 폰트를 표시하고, 로딩 완료 후 전환

### 레이아웃 배열 오류

- `box-sizing: border-box`가 전역으로 적용되었는지 확인
- `* { margin: 0; padding: 0 }` reset 확인
- Chrome DevTools에서 gridlines를 켜서 실제 레이아웃 확인

## 검증 = 디자이너의 두 번째 눈

**반드시 직접 한 번 확인하세요**. AI가 코드를 작성할 때 흔히 발생하는 문제는 다음과 같습니다:

- 보기에는 맞아 보이지만 interaction에 버그가 있음
- 정적 스크린샷은 괜찮지만 스크롤 시 배열이 어긋남
- 넓은 화면에서는 예쁘지만 좁은 화면에서 깨짐
- 다크 모드(Dark mode) 테스트를 잊음
- Tweaks 전환 후 일부 컴포넌트가 반응하지 않음

**마지막 1분의 검증은 1시간의 재작업을 절약할 수 있습니다**.

## 자주 사용하는 검증 스크립트 명령어

```bash
# 기본: 열기 + 스크린샷 + 오류 캡처
python verify.py design.html

# 다중 뷰포트
python verify.py design.html --viewports 1920x1080,375x667

# 다중 슬라이드
python verify.py deck.html --slides 10

# 지정된 디렉토리에 출력
python verify.py design.html --output ./screenshots/

# headless=false, 실제 브라우저를 열어 보여줌
python verify.py design.html --show
```
