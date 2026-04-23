# Design Context(디자인 맥락): 기존 맥락에서 출발하기

**이것이 이 스킬(skill)에서 가장 중요한 핵심 원칙입니다.**

좋은 hi-fi(고충실도) 디자인은 반드시 기존의 design context(디자인 맥락)에서 자연스럽게 파생됩니다. **공중에 떠 있는 상태로 hi-fi를 만드는 것은 최후의 수단(last resort)이며, 반드시 generic(획일적인) 결과물을 낳게 됩니다.** 따라서 모든 디자인 업무가 시작될 때, 먼저 스스로에게 물어보세요: 참고할 만한 자료가 있나요?

## Design Context란 무엇인가

우선순위가 높은 것부터 낮은 것까지:

### 1. 사용자의 Design System(디자인 시스템) / UI Kit(UI 키트)
사용자의 제품에 이미 존재하는 컴포넌트 라이브러리, 컬러 토큰(token), 타이포그래피 규격, 아이콘 시스템입니다. **가장 이상적인 상황**입니다.

### 2. 사용자의 Codebase(코드베이스)
사용자가 코드 저장소를 제공했다면, 그 안에 살아있는 컴포넌트 구현체가 존재합니다. 아래 파일들을 읽으세요:
- `theme.ts` / `colors.ts` / `tokens.css` / `_variables.scss`
- 구체적인 컴포넌트(Button.tsx, Card.tsx)
- Layout scaffold(레이아웃 스캐폴드)(App.tsx, MainLayout.tsx)
- Global stylesheets(글로벌 스타일시트)

**코드를 읽어 정확한 값(exact values)을 그대로 가져오세요**: hex 코드, spacing scale(스페이싱 스케일), font stack(폰트 스택), border radius(볼더 반경). 기억에 의존하여 다시 그리지 마세요.

### 3. 사용자가 이미 출시한 제품
사용자가 출시된 제품이 있지만 코드를 제공하지 않은 경우, Playwright를 사용하거나 사용자에게 스크린샷을 요청하세요.

```bash
# 공개 URL을 Playwright로 스크린샷 찍기
npx playwright screenshot https://example.com screenshot.png --viewport-size=1920,1080
```

이를 통해 실제 visual vocabulary(시각 어휘)를 확인할 수 있습니다.

### 4. 브랜드 가이드라인(Brand Guideline) / 로고 / 기존 자산
사용자가 보유할 수 있는 것들: 로고 파일, 브랜드 컬러 규격, 마케팅 자료, 슬라이드 템플릿 등. 이 모든 것이 context(맥락)가 됩니다.

### 5. 경쟁사 참고
사용자가 "XX 웹사이트처럼"이라고 말하면, URL이나 스크린샷을 제공받으세요. **절대** 학습 데이터 속 흐릿한 인상에 의존하지 마세요.

### 6. 알려진 design system(디자인 시스템) (fallback, 대안)
위의 것들이 모두 없을 경우, 널리 인정받는 디자인 시스템을 베이스로 사용하세요:
- Apple HIG
- Material Design 3
- Radix Colors(색상)
- shadcn/ui(컴포넌트)
- Tailwind 기본 palette(팔레트)

사용자에게 어떤 것을 사용하고 있는지 명확히 알려주세요. 이것이 출발점이지 최종 결과가 아님을 인지시켜야 합니다.

## Context를 수집하는 프로세스

### Step 1: 사용자에게 묻기

업무 시작 시 반드시 확인해야 할 체크리스트(`workflow.md` 참고):

```markdown
1. 사용 가능한 design system/UI kit/컴포넌트 라이브러리가 있나요? 어디에 있나요?
2. 브랜드 가이드라인, 컬러/폰트 규격이 있나요?
3. 기존 제품의 스크린샷이나 URL을 제공해 주실 수 있나요?
4. 읽을 수 있는 codebase가 있나요?
```

### Step 2: 사용자가 "없어요"라고 할 때, 함께 찾아보기

바로 포기하지 마세요. 다음을 시도해 보세요:

```markdown
혹시 관련된 단서가 있는지 살펴 보겠습니다:
- 이전 프로젝트에 관련 디자인이 있나요?
- 회사 마케팅 웹사이트는 어떤 컬러/폰트를 사용하나요?
- 제품 로고는 어떤 스타일인가요? 이미지를 받을 수 있을까요?
- 참고로 삼고 싶은 마음에 드는 제품이 있나요?
```

### Step 3: 찾을 수 있는 모든 context를 읽기

사용자가 codebase 경로를 제공했다면, 다음을 읽으세요:
1. **먼저 파일 구조를 list(나열)하세요**: style/theme/component 관련 파일을 찾습니다
2. **theme/token 파일을 읽으세요**: 구체적인 hex/px 값들을 추출(lift)합니다
3. **2~3개의 대표적 컴포넌트를 읽으세요**: visual vocabulary(시각 어휘)를 파악합니다(hover state(호버 상태), shadow(그림자), border(테두리), padding node pattern(패딩 노드 패턴))
4. **global stylesheet를 읽으세요**: 기본 리셋, font loading(폰트 로딩)
5. **Figma 링크/스크린샷이 있다면**: 이미지를 확인하되, **코드를 더 신뢰하세요**

**중요**: **대충 훑어보고 인상에 의존하지 마세요.** 30개 이상의 구체적인 값(value)을 읽어 추출(lift)해야 비로소 제대로 이해한 것입니다.

### Step 4: 사용할 시스템을 Vocalize(구두화)하기

Context를 모두 확인한 후, 사용자에게 사용할 시스템을 설명하세요:

```markdown
사용자의 codebase와 제품 스크린샷을 바탕으로, 다음과 같이 디자인 시스템을 정리했습니다:

**컬러**
- Primary(프라이머리): #C27558 (tokens.css에서 추출)
- Background(배경): #FDF9F0
- Text(텍스트): #1A1A1A
- Muted(뮤티드): #6B6B6B

**타이포그래피**
- Display(디스플레이): Instrument Serif (global.css의 @font-face에서)
- Body(본문): Geist Sans
- Mono(모노): JetBrains Mono

**Spacing(스페이싱)** (사용자의 scale 시스템에서)
- 4, 8, 12, 16, 24, 32, 48, 64

**Shadow pattern(그림자 패턴)**
- `0 1px 2px rgba(0,0,0,0.04)` (subtle card, 은은한 카드)
- `0 10px 40px rgba(0,0,0,0.1)` (elevated modal, 떠 있는 모달)

**Border-radius(볼더 반경)**
- 소형 컴포넌트 4px, 카드 12px, 버튼 8px

**Component vocabulary(컴포넌트 어휘)**
- Button(버튼): filled primary(채워진 프라이머리), outlined secondary(아웃라인 세컨더리), ghost tertiary(고스트 터셔리), 전부 8px 둥근 모서리
- Card(카드): 흰색 배경, subtle shadow(은은한 그림자), 테두리 없음

이 시스템을 기반으로 작업을 시작하겠습니다. 괜찮으신가요?
```

사용자가 확인한 후에 작업을 시작하세요.

## 공중에서 디자인하기 (Context가 없을 때의 fallback)

**강력한 경고**: 이 경우 결과물의 품질이 현저히 떨어집니다. 사용자에게 이 사실을 명확히 전달하세요.

```markdown
design context가 없으면, 범용적인 직관에만 의존하여 작업해야 합니다.
결과물은 "보기에는 괜찮지만 독창성이 부족한" 수준이 될 것입니다.
계속 진행하시겠습니까, 아니면 참고 자료를 먼저 보충하시겠습니까?
```

사용자가 억지로 작업을 요구하면, 다음 순서로 의사결정을 내리세요:

### 1. Aesthetic direction(미학적 방향) 선택하기

Generic(획일적인) 결과물을 주지 마세요. 명확한 방향을 하나 정하세요:
- brutally minimal(극도로 미니멀)
- editorial/magazine(에디토리얼/매거진)
- brutalist/raw(브루탈리스트/날것)
- organic/natural(유기적/자연적)
- luxury/refined(럭셔리/정제된)
- playful/toy(장난스러운/토이)
- retro-futuristic(레트로 퓨처리스틱)
- soft/pastel(부드러운/파스텔)

사용자에게 어떤 방향을 선택했는지 알려주세요.

### 2. 알려진 design system을 골격으로 선택하기
- Radix Colors로 컬러 구성 (https://www.radix-ui.com/colors)
- shadcn/ui로 component vocabulary(컴포넌트 어휘) 구성 (https://ui.shadcn.com)
- Tailwind spacing scale(스페이싱 스케일) 사용 (4의 배수)

### 3. 특징 있는 폰트 페어링 선택하기

Inter/Roboto는 사용하지 마세요. 추천 조합(Google Fonts에서 무료 사용 가능):
- Instrument Serif + Geist Sans
- Cormorant Garamond + Inter Tight
- Bricolage Grotesque + Söhne (유료)
- Fraunces + Work Sans (Fraunces는 AI가 너무 많이 써서 남용된 느낌이 있음에 주의)
- JetBrains Mono + Geist Sans (technical feel(기술적 느낌))

### 4. 모든 핵심 결정에 reasoning(근거) 담기

조용히 선택하지 마세요. HTML 주석(comment)에 작성하세요:

```html
<!--
Design decisions(디자인 결정):
- Primary color: warm terracotta (oklch 0.65 0.18 25) — "editorial" 방향에 부합
- Display: Instrument Serif로 인문학적, 문학적 느낌 부여
- Body: Geist Sans로 깔끔한 대비 형성
- No gradients(그라데이션 없음) — 미니멀함에 충실, AI slop(AI 잉여물) 배제
- Spacing: 8px 기준, 황금비 친화적 (8/13/21/34)
-->
```

## Import 전략 (사용자가 codebase를 제공한 경우)

사용자가 "이 codebase를 참고로 import해 줘"라고 말하면:

### 소형 (<50파일)
전체를 읽어 context를 내면화합니다.

### 중형 (50~500파일)
아래에 집중하세요:
- `src/components/` 또는 `components/`
- styles/tokens/theme와 관련된 모든 파일
- 2~3개의 대표적인 전체 페이지 컴포넌트(Home.tsx, Dashboard.tsx)

### 대형 (>500파일)
사용자에게 focus(집중 영역)를 지정받으세요:
- "settings 페이지를 만들고 싶어요" → 기존 settings 관련 파일을 읽습니다
- "새로운 feature를 만들고 싶어요" → 전체 shell + 가장 가까운 참고 자료를 읽습니다
- 전부를 다 읽으려 하지 말고, 정확성을 추구하세요

## Figma/디자인稿(디자인 고안)과의 협업

사용자가 Figma 링크를 제공한 경우:

- **Figma를 HTML로 직접 "변환"할 수 있을 거라 기대하지 마세요** — 별도의 도구가 필요합니다
- Figma 링크는 보통 공개적으로 접근할 수 없습니다
- 사용자에게 다음을 요청하세요: **스크린샷으로 내보내서** 전달해 주시고, 구체적인 color/spacing 값을 알려주세요

Figma 스크린샷만 제공받은 경우, 사용자에게 다음을 알려주세요:
- 시각적인 부분은 확인할 수 있지만, 정확한 값은 추출할 수 없습니다
- 핵심 수치(hex, px)를 직접 알려주시거나, Figma의 export as code 기능을 활용해 주세요

## 마지막 reminder(리마인더)

**프로젝트의 디자인 품질 상한선은 당신이 얻은 context의 품질에 의해 결정됩니다.**

Context를 수집하는 데 10분을 쓰는 것이, 공중에서 hi-fi를 1시간 동안 그리는 것보다 가치가 큽니다.

**Context가 없는 상황을 마주쳤을 때, 우선 사용자에게 요청하고, 억지로 진행하지 마세요.**
