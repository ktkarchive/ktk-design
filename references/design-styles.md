# 디자인 철학 스타일 라이브러리: 20가지 체계

> 시각 디자인(웹페이지/PPT/PDF/인포그래픽/삽화/앱 등)을 위한 디자인 스타일 라이브러리입니다.
> 각 스타일은 철학적 핵심 + 핵심 특징 + 프롬프트 DNA(씬 템플릿과 조합하여 사용)를 제공합니다.

## 스타일×씬×실행 경로 퀵 레퍼런스

| 스타일 | 웹페이지 | PPT | PDF | 인포그래픽 | 커버 | AI 생성 | 최적 경로 |
|------|:---:|:---:|:---:|:-----:|:---:|:-----:|---------|
| 01 Pentagram | ★★★ | ★★★ | ★★☆ | ★★☆ | ★★★ | ★☆☆ | HTML |
| 02 Stamen Design | ★★☆ | ★★☆ | ★★☆ | ★★★ | ★★☆ | ★★☆ | 혼합 |
| 03 Information Architects | ★★★ | ★☆☆ | ★★★ | ★☆☆ | ★☆☆ | ★☆☆ | HTML |
| 04 Fathom | ★★☆ | ★★★ | ★★★ | ★★★ | ★★☆ | ★☆☆ | HTML |
| 05 Locomotive | ★★★ | ★★☆ | ★☆☆ | ★☆☆ | ★★☆ | ★★☆ | 혼합 |
| 06 Active Theory | ★★★ | ★☆☆ | ★☆☆ | ★☆☆ | ★★☆ | ★★★ | AI 생성 |
| 07 Field.io | ★★☆ | ★★☆ | ★☆☆ | ★★☆ | ★★★ | ★★★ | AI 생성 |
| 08 Resn | ★★★ | ★☆☆ | ★☆☆ | ★☆☆ | ★★☆ | ★★☆ | AI 생성 |
| 09 Experimental Jetset | ★★☆ | ★★☆ | ★★☆ | ★★☆ | ★★★ | ★★☆ | 혼합 |
| 10 Müller-Brockmann | ★★☆ | ★★★ | ★★★ | ★★★ | ★★☆ | ★☆☆ | HTML |
| 11 Build | ★★★ | ★★★ | ★★☆ | ★☆☆ | ★★★ | ★☆☆ | HTML |
| 12 Sagmeister & Walsh | ★★☆ | ★★★ | ★☆☆ | ★★☆ | ★★★ | ★★★ | AI 생성 |
| 13 Zach Lieberman | ★☆☆ | ★☆☆ | ★☆☆ | ★★☆ | ★★★ | ★★★ | AI 생성 |
| 14 Raven Kwok | ★☆☆ | ★★☆ | ★☆☆ | ★★☆ | ★★★ | ★★★ | AI 생성 |
| 15 Ash Thorp | ★★☆ | ★★☆ | ★☆☆ | ★☆☆ | ★★★ | ★★★ | AI 생성 |
| 16 Territory Studio | ★★☆ | ★★☆ | ★☆☆ | ★★☆ | ★★★ | ★★★ | AI 생성 |
| 17 Takram | ★★★ | ★★★ | ★★★ | ★★☆ | ★★☆ | ★☆☆ | HTML |
| 18 Kenya Hara | ★★☆ | ★★★ | ★★★ | ★☆☆ | ★★★ | ★☆☆ | HTML |
| 19 Irma Boom | ★☆☆ | ★★☆ | ★★★ | ★★☆ | ★★★ | ★★☆ | 혼합 |
| 20 Neo Shen | ★★☆ | ★★☆ | ★★☆ | ★★☆ | ★★★ | ★★★ | AI 생성 |

> 씬 적합도: ★★★ = 강력 추천 / ★★☆ = 적합 / ★☆☆ = 개조 필요
> AI 생성: ★★★ = 바로 출력 품질 좋음 / ★★☆ = 조정 필요 / ★☆☆ = HTML 실행 권장
> 최적 경로: AI 생성(이미지 바로 출력) / HTML(코드 렌더링, 데이터 정확) / 혼합(HTML 레이아웃 + AI 삽화)

**핵심 규칙**: 명확한 시각적 요소(일러스트/파티클/제너러티브 아트)가 있는 스타일은 AI 바로 출력 효과가 좋습니다. 정밀한 타이포그래피와 데이터에 의존하는 스타일(그리드/정보 아키텍처/여백)은 HTML 렌더링이 더 제어하기 쉽습니다.

---

## 一、정보 건축파(01-04)
> 철학: 「데이터는 장식이 아니라 건축 재료다」

### 01. Pentagram - Michael Bierut 스타일
**철학**: 타이포그래피가 곧 언어이고, 그리드가 곧 사상이다
**핵심 특징**:
- 극도로 절제된 색상(흑백 + 1개 브랜드 컬러)
- 스위스 그리드 시스템의 현대적 해석
- 타이포그래피를 주요 시각 언어로 사용
- 여백의 전략적 활용(60%+ 여백)

**프롬프트 DNA**:
```
Pentagram/Michael Bierut style:
- Extreme typographic hierarchy, Helvetica/Univers family
- Swiss grid with precise mathematical spacing
- Black/white + one accent color (#HEX)
- Information architecture as visual structure
- 60%+ whitespace ratio
- Data visualization as primary decoration
```

**대표작**: Hillary Clinton 2016 campaign identity
**검색 키워드**: pentagram hillary logo system

---

### 02. Stamen Design - 데이터 시학
**철학**: 데이터가 만질 수 있는 풍경이 되도록 하다
**핵심 특징**:
- 지도학적 사고를 정보 디자인에 적용
- 알고리즘으로 생성된 유기적 그래픽
- 따뜻한 데이터 시각화 색조(황토색, 세이지 그린, 짙은 파랑)
- 상호작용 가능한 계층 시스템

**프롬프트 DNA**:
```
Stamen Design aesthetic:
- Cartographic approach to data visualization
- Organic, algorithm-generated patterns
- Warm palette (terracotta, sage green, deep blues)
- Layered information like topographic maps
- Hand-crafted feel despite digital precision
- Soft shadows and depth
```

**대표작**: COVID-19 surge map
**검색 키워드**: stamen covid map visualization

---

### 03. Information Architects - 콘텐츠 우선 원칙
**철학**: 디자인은 장식이 아니라 콘텐츠의 건축이다
**핵심 특징**:
- 극단적인 콘텐츠 계층 명확성
- 시스템 폰트만 사용(읽기 최적화)
- 파란색 하이퍼링크 전통의 지킴
- 성능이 곧 미학

**프롬프트 DNA**:
```
Information Architects philosophy:
- Content-first hierarchy, zero decorative elements
- System fonts only (SF Pro/Roboto/Inter)
- Classic blue hyperlinks (#0000EE)
- Reading-optimized line length (66 characters)
- Progressive disclosure of depth
- Text-heavy, fast-loading design
```

**대표작**: iA Writer app
**검색 키워드**: information architects ia writer

---

### 04. Fathom Information Design - 과학적 서사
**철학**: 모든 픽셀은 정보를 담아야 한다
**핵심 특징**:
- 과학 저널의 엄격함 + 디자인의 우아함
- 정량적 데이터의 정밀한 시각화
- 차분한 전문적 색조(회색, 네이비)
- 주석과 인용 시스템의 디자인화

**프롬프트 DNA**:
```
Fathom Information Design style:
- Scientific journal aesthetic meets modern design
- Precise data visualization (charts, timelines, scatter plots)
- Neutral scheme (grays, navy, one highlight color)
- Footnote/citation design integrated into layout
- Clean sans-serif (GT America/Graphik)
- Information density without clutter
```

**대표작**: Bill & Melinda Gates Foundation 연례 보고서
**검색 키워드**: fathom information design gates foundation

---

## 二、모션 시학파(05-08)
> 철학: 「기술 자체가 흐르는 시다」

### 05. Locomotive - 스크롤 서사의 대가
**철학**: 스크롤은 탐색이 아니라 여정이다
**핵심 특징**:
- 부드러운 패럴럭스 스크롤
- 영화적 분镜 서사
- 대담한 공간 여백
- 동적 요소의 정밀한 연출

**프롬프트 DNA**:
```
Locomotive scroll narrative style:
- Film-like scene composition with parallax depth
- Generous vertical spacing between sections
- Bold typography emerging from darkness
- Smooth motion blur effects
- Dark mode (near-black backgrounds)
- Strategic glowing accents
- Hero sections 100vh tall
```

**대표작**: Lusion.co website
**검색 키워드**: locomotive scroll lusion

---

### 06. Active Theory - WebGL 시인
**철학**: 기술을 가시화하는 것이 곧 기술을 이해하게 하는 것이다
**핵심 특징**:
- 3D 파티클 시스템을 핵심 요소로
- 실시간 렌더링 데이터 시각화
- 마우스 상호작용으로 구축하는 세계
- 네온과 심우주의 색채

**프롬프트 DNA**:
```
Active Theory WebGL aesthetic:
- Particle systems representing data flow
- 3D visualization in depth space
- Neon gradients (cyan/magenta/electric blue) on dark
- Mouse-reactive environment
- Depth of field and bokeh effects
- Floating UI with glassmorphism
```

**대표작**: NASA Prospect
**검색 키워드**: active theory nasa webgl

---

### 07. Field.io - 알고리즘 미학
**철학**: 코드가 곧 디자이너다
**핵심 특징**:
- 제너러티브 아트 시스템
- 매번 방문할 때마다 다른 동적 그래픽
- 추상 기하학의 지능적 연출
- 기술감과 예술성의 균형

**프롬프트 DNA**:
```
Field.io generative design style:
- Abstract geometric patterns, algorithmically generated
- Dynamic composition that feels computational
- Monochromatic base with vibrant accent
- Mathematical precision in spacing
- Voronoi diagrams or Delaunay triangulation
- Clean code aesthetic
```

**대표작**: British Council digital installations
**검색 키워드**: field.io generative design

---

### 08. Resn - 서사 중심의 상호작용
**철학**: 모든 클릭이 이야기를 전진시킨다
**핵심 특징**:
- 게이미피케이션된 사용자 여정
- 강한 감정적 디자인
- 일러스트와 코드의 깊은 결합
- 비선형적 탐험 경험

**프롬프트 DNA**:
```
Resn interactive storytelling approach:
- Illustrative style mixed with UI elements
- Gamified exploration (progress indicators)
- Warm color palette despite tech subject
- Character-driven design
- Scroll-triggered animations
- Editorial illustration meets product design
```

**대표작**: Resn.co.nz portfolio
**검색 키워드**: resn interactive storytelling

---

## 三、미니멀리즘파(09-12)
> 철학: 「더 이상 지울 수 없을 때까지 삭제하라」

### 09. Experimental Jetset - 개념적 미니멀
**철학**: 하나의 생각 = 하나의 형태
**핵심 특징**:
- 단일 시각 은유가 전체 디자인을 관통
- 파랑/빨강/노랑 + 흑백의 몬드리안 계열 색상
- 타이포그래피가 곧 그래픽
- 반상업적 정직한 디자인

**프롬프트 DNA**:
```
Experimental Jetset conceptual minimalism:
- Single visual metaphor for entire design
- Primary colors only (red/blue/yellow) + black/white
- Typography as main graphic element
- Grid-based with deliberate rule-breaking
- No photography, only type and geometry
- Anti-commercial, honest aesthetic
```

**대표작**: Whitney Museum identity
**검색 키워드**: experimental jetset whitney responsive w

---

### 10. Müller-Brockmann 전승 - 스위스 그리드 순수주의
**철학**: 객관성이 곧 미이다
**핵심 특징**:
- 수학적으로 정밀한 그리드 시스템(8pt 베이스라인)
- 절대적인 좌측 정렬 또는 중앙 정렬
- 단색 또는 이색 계열
- 기능주의 지상

**프롬프트 DNA**:
```
Josef Müller-Brockmann Swiss modernism:
- Mathematical grid system (8pt baseline)
- Strict alignment (flush left or centered)
- Two-color maximum (black + one accent)
- Akzidenz-Grotesk or similar rationalist typeface
- No decorative elements
- Timeless, objective aesthetic
```

**대표작**: 《Grid Systems in Graphic Design》
**검색 키워드**: muller brockmann grid systems poster

---

### 11. Build - 현대 미니멀 브랜드
**철학**: 정교한 단순함이 복잡함보다 어렵다
**핵심 특징**:
- 럭셔리급 여백(70%+)
- 미묘한 자족 대비(200-600)
- 단일 강조색의 전략적 사용
- 호흡감 있는 리듬

**프롬프트 DNA**:
```
Build studio luxury minimalism:
- Generous whitespace (70%+ of area)
- Subtle typography weight shifts (200 to 600)
- Single accent color used sparingly
- High-end product photography aesthetic
- Soft shadows and subtle gradients
- Golden ratio proportions
```

**대표작**: Build studio portfolio
**검색 키워드**: build studio london branding

---

### 12. Sagmeister & Walsh - 즐거운 미니멀
**철학**: 아름다움이 곧 기능의 감정적 차원이다
**핵심 특징**:
- 예상 밖의 색 폭발
- 수공예감과 디지털의 융합
- 긍정 에너지의 시각 언어
- 실험적이지만 가독성 유지

**프롬프트 DNA**:
```
Sagmeister & Walsh joyful philosophy:
- Unexpected color bursts on minimal base
- Handmade elements (physical objects in digital)
- Optimistic visual language
- Experimental typography that remains legible
- Human warmth through imperfection
- Mix of analog and digital aesthetics
```

**대표작**: The Happy Show
**검색 키워드**: sagmeister walsh happy show

---

## 四、실험 전위파(13-16)
> 철학: 「규칙을 깨는 것이 곧 규칙을 창조하는 것이다」

### 13. Zach Lieberman - 코드 시학
**철학**: 프로그래밍이 곧 회화다
**핵심 특징**:
- 손으로 그린 듯한 알고리즘 그래픽
- 실시간 제너러티브 아트
- 흑백의 순수한 표현
- 도구 자체의 가시성

**프롬프트 DNA**:
```
Zach Lieberman code-as-art style:
- Hand-drawn aesthetic generated by code
- Black and white only, no color
- Real-time generative patterns
- Sketch-like line quality
- Visible process/grid/construction lines
- Poetic interpretation of algorithms
```

**대표작**: openFrameworks creative coding
**검색 키워드**: zach lieberman openframeworks generative

---

### 14. Raven Kwok - 파라메트릭 미학
**철학**: 시스템의 아름다움이 개체의 아름다움을 능가한다
**핵심 특징**:
- 프랙탈과 재귀 그래픽
- 흑백 고대비
- 건축화된 정보 구조
- 동양 정원의 알고리즘적 해석

**프롬프트 DNA**:
```
Raven Kwok parametric aesthetic:
- Fractal patterns and recursive structures
- High-contrast black and white
- Architectural visualization of data
- Chinese garden principles in algorithm form
- Intricate detail that rewards zooming
- Processing/Creative coding aesthetic
```

**대표작**: Raven Kwok generative art exhibitions
**검색 키워드**: raven kwok processing generative art

---

### 15. Ash Thorp - 사이버 시학
**철학**: 미래는 차가운 것이 아니라 외로운 시다
**핵심 특징**:
- 영화급 조명
- 사이버펑크의 따뜻한 버전(오렌지/청록, 차가운 파랑 아님)
- 서사성 개념 디자인
- 산업 미학의 정교화

**프롬프트 DNA**:
```
Ash Thorp cinematic concept art:
- Film-grade lighting and atmospheric effects
- Warm cyberpunk (orange/teal, NOT cold blue)
- Industrial design meets luxury
- Narrative concept art feel
- Volumetric lighting and god rays
- Blade Runner warmth over Tron coldness
```

**대표작**: Ghost in the Shell concept art
**검색 키워드**: ash thorp ghost shell concept art

---

### 16. Territory Studio - 화면 인터페이스 픽션
**철학**: 미래 UI의 오늘의 상상
**핵심 특징**:
- SF 영화 속 화면 디자인(FUI)
- 홀로그램 투영감
- 다층 중첩 데이터 시각화
- 믿을 만한 미래감

**프롬프트 DNA**:
```
Territory Studio FUI (Fantasy User Interface):
- Fantasy User Interface design
- Holographic projection aesthetics
- Orange/amber monochrome or cyan accents
- Multiple overlapping data layers
- Believable future technology
- Technical readouts and data streams
```

**대표작**: Blade Runner 2049 screen graphics
**검색 키워드**: territory studio blade runner interface

---

## 五、동양 철학파(17-20)
> 철학: 「여백이 곧 콘텐츠다」

### 17. Takram - 일본적 사변 디자인
**철학**: 기술은 사유의 매개체다
**핵심 특징**:
- 개념 프로토타입의 우아함
- 부드러운 테크 감각(둥근 모서리, 부드러운 그림자)
- 도표가 곧 예술
- 겸손한 정교함

**프롬프트 DNA**:
```
Takram Japanese speculative design:
- Elegant concept prototypes and diagrams
- Soft tech aesthetic (rounded corners, gentle shadows)
- Charts and diagrams as art pieces
- Modest sophistication
- Neutral natural colors (beige, soft gray, muted green)
- Design as philosophical inquiry
```

**대표작**: NHK Fabricated City
**검색 키워드**: takram nhk data visualization

---

### 18. Kenya Hara - 공(空)의 디자인
**철학**: 디자인은 채우는 것이 아니라 비우는 것이다
**핵심 특징**:
- 극도의 여백(80%+)
- 종이 질감의 디지털화
- 흰색의 층(따뜻한 흰, 차가운 흰, 아이보리)
- 촉각의 시각화

**프롬프트 DNA**:
```
Kenya Hara "emptiness" design:
- Extreme whitespace (80%+)
- Paper texture and tactility in digital form
- Layers of white (warm white, cool white, off-white)
- Minimal color (if any, very desaturated)
- Design by subtraction not addition
- Zen simplicity
```

**대표작**: Muji art direction, 《Designing Design》
**검색 키워드**: kenya hara designing design muji

---

### 19. Irma Boom - 책 건축가
**철학**: 정보의 물리적 시학
**핵심 특징**:
- 비선형 정보 아키텍처
- 가장자리와 경계의 놀이
- 예상 밖의 색 조합(분홍+빨강, 오렌지+갈색)
- 수공예의 디지털 번역

**프롬프트 DNA**:
```
Irma Boom book architecture style:
- Non-linear information structure
- Play with edges, margins, boundaries
- Unexpected color combos (pink+red, orange+brown)
- Handcraft translated to digital
- Dense information inviting exploration
- Editorial design, unconventional grid
```

**대표작**: SHV Think Book (2136 pages)
**검색 키워드**: irma boom shv think book

---

### 20. Neo Shen - 동양 빛과 그림자의 시
**철학**: 기술에는 사람의 온기가 필요하다
**핵심 특징**:
- 수묵화 번짐의 디지털화
- 부드러운 빛 번짐 효과
- 시적인 여백
- 감정적인 색채(짙은 파랑, 따뜻한 회색, 부드러운 금)

**프롬프트 DNA**:
```
Neo Shen poetic Chinese aesthetic:
- Digital interpretation of ink wash painting
- Soft glow and light diffusion effects
- Poetic negative space
- Emotional palette (deep blues, warm grays, soft gold)
- Calligraphic influences in typography
- Atmospheric depth
```

**대표작**: Neo Shen digital art series
**검색 키워드**: neo shen digital ink wash art

---

## 프롬프트 사용 설명

**조합 공식**: `[스타일 프롬프트 DNA] + [씬 템플릿(scene-templates.md 참고)] + [구체적 콘텐츠]`

### 핵심 원칙: 감정을 묘사하라, 레이아웃을 지시하지 마라(Mood, Not Layout)

AI 이미지 생성의 핵심: 짧은 프롬프트 > 긴 프롬프트. 3문장으로 감정과 콘텐츠를 묘사하는 것이 30줄의 레이아웃 세부사항을 나열하는 것보다 효과가 좋습니다.

| 다양성을 죽이는写法 | 창의력을 자극하는写法 |
|----------------|----------------|
| 색 비율 지정(60%/25%/15%) | 감정 묘사("warm like Sunday morning") |
| 레이아웃 위치 규정("제목 중앙, 이미지 오른쪽") | 구체적 미학 인용("Pentagram editorial feel") |
| 캐릭터 자세와 표현 제한 | AI가 스타일을 자연스럽게 해석하도록 |
| 포함해야 할 모든 시각 요소 나열 | 관객이 느껴야 할 것을 묘사 |

### Good / Bad 예시

**Bad — 과도한 제약(AI가 텅 비고 평면적으로 출력):**
```
Professional presentation slide. Dark background, light text.
Title centered at top. Two columns below. Left column: bullet points.
Right column: bar chart. Colors: navy 60%, white 30%, gold 10%.
Font size: title 36pt, body 18pt. Margins: 40px all sides.
```

**Good — 감정 중심(다양하고 질감 있는 출력):**
```
A data visualization that feels like a Bloomberg Businessweek
editorial spread. The key number "28.5%" should dominate the
composition like a headline. Warm cream tones with sharp black
typography. The data tells a story of dramatic channel shift.
```

### 실행 경로 선택

퀵 레퍼런스의「최적 경로」열을 참고하여 선택하세요:
- **AI 생성**: 명확한 시각적 요소가 있는 스타일(06/07/12/13/14/15/16/20), Gemini/Midjourney로 바로 출력
- **HTML 렌더링**: 정밀한 타이포그래피에 의존하는 스타일(01/03/04/10/11/17/18), 코드로 데이터와 레이아웃 제어
- **혼합**: HTML로 골격 레이아웃 + AI로 삽화/배경 생성(02/05/08/09/19)

### 품질 관리

1. ❌ "in the style of Pentagram"이라고 직접 쓰지 마세요 → ✅ 구체적 디자인 특징으로 묘사하세요
2. AI 생성에서 텍스트가 자주 틀림 → 생성 후 텍스트 교체
3. 비율이 쉽게 왜곡됨 → aspect ratio를 명확히 지정
4. 먼저 3-5개 변형을 생성한 후 최적을 선택하여 다듬기

**기본 미적 금지 구역**(사용자는 자신의 브랜드로 override 가능):
- ❌ 사이버 네온/짙은 파랑 바탕(#0D1117)
- ❌ 커버 이미지에 개인 서명/워터마크 추가

---

**버전**: v2.1
**업데이트 날짜**: 2026-02-13
**적용 씬**: 웹페이지/PPT/PDF/인포그래픽/커버/삽화/앱 등 모든 시각 디자인
**image-to-slides와 연동**: PPT 씬에서 본 파일의 스타일을 직접 인용하여, image-to-slides 스킬을 통해 생성 실행 가능
