# 씬 템플릿 라이브러리: 출력 유형별 구성

> design-styles.md의 「프롬프트 DNA」와 함께 사용하세요.
> 공식: `[스타일 프롬프트 DNA] + [씬 템플릿] + [구체적인 콘텐츠 설명]`

---

## 1. 공중계정(WeChat) 커버 / 기사 헤더 이미지

**사양**:
- 커버 이미지: 2.35:1 (900×383px 또는 1200×510px)
- 본문 삽화: 16:9 (1200×675px) 또는 4:3 (1200×900px)

**핵심 디자인 요소**:
- 시각적 임팩트(impact)를 최우선으로 (사용자가 정보 피드에서 빠르게 스쳐 지나가는 환경)
- 텍스트는 최소화하거나 없는 것이 좋음 (공중계정 제목이 이미지 위에 덮어씌워짐)
- 색상 채도는 적당히 조절 (WeChat의 밝은(흰색) 읽기 환경을 고려)
- 과도한 디테일은 피하세요 (썸네일 상태에서도 식별 가능해야 함)

**추천 스타일**: 01 Pentagram / 11 Build / 12 Sagmeister / 18 Kenya Hara / 07 Field.io

**씬 프롬프트 템플릿**:
```
[스타일 DNA 삽입]
- Article cover image for WeChat subscription
- Landscape format, 2.35:1 aspect ratio
- Bold visual impact, minimal or no text
- Moderate color saturation for white reading environment
- Must remain recognizable as thumbnail
- Clean composition with clear focal point
```

---

## 2. 본문 삽화 / 컨셉 일러스트레이션

**사양**:
- 16:9 (1200×675px)이 가장 범용적
- 1:1 (800×800px)은 강조가 필요할 때 적합
- 4:3 (1200×900px)은 정보 밀도가 높을 때 적합

**핵심 디자인 요소**:
- 기사의 논지를 뒷받침하는 것이지 단순한 장식이 아님
- 맥락과 시각적 리듬을 이루어야 함
- 하나의 핵심 개념을 간결하게 표현
- AI 생성을 우선적으로 사용하며, 정확한 데이터 테이블이 필요할 때만 HTML 스크린샷 활용

**추천 스타일**: 기사의 톤에 맞춰 선택, 자주 사용하는 스타일: 01/04/10/17/18

**씬 프롬프트 템플릿**:
```
[스타일 DNA 삽입]
- Article illustration, concept visualization
- [16:9 / 1:1 / 4:3] aspect ratio
- Single clear concept: [핵심 개념 설명]
- Serve the argument, not decoration
- [Light/Dark] background to match article tone
```

---

## 3. 인포그래픽 / 데이터 시각화

**사양**:
- 세로형 긴 이미지: 1080×1920px (모바일 읽기용)
- 가로형: 1920×1080px (기사 내 삽입용)
- 정사각형: 1080×1080px (소셜 미디어용)

**핵심 디자인 요소**:
- 정보 계층 구조가 명확해야 함 (제목 → 핵심 데이터 → 디테일)
- 데이터는 정확해야 하며, 지어내지 마세요
- 시각적 유도선으로 독자의 시선 이동 경로를 안내
- 아이콘/차트를 적절히 활용해 이해를 돕습니다

**추천 스타일**: 04 Fathom / 10 Müller-Brockmann / 02 Stamen / 17 Takram

**씬 프롬프트 템플릿**:
```
[스타일 DNA 삽입]
- Infographic / data visualization
- [Vertical 1080x1920 / Horizontal 1920x1080 / Square 1080x1080]
- Clear information hierarchy: title → key data → details
- Visual flow guiding reader's eye path
- Icons and charts for comprehension
- Data-accurate, no decorative distortion
```

---

## 4. PPT / Keynote 프레젠테이션

**사양**:
- 표준: 16:9 (1920×1080px)
- 와이드: 16:10 (1920×1200px)

**핵심 디자인 요소**:
- 각 슬라이드당 하나의 핵심 메시지 (내용 쌓기 금지)
- 글자 크기 계층이 명확해야 함 (제목 40pt+ / 본문 24pt+ / 주석 16pt+)
- 충분한 여백으로 프로젝션 시 선명하게 보이도록
- 그래픽과 텍스트 비율은 최소 60:40 유지
- 일관된 시각 시스템 (색상, 서체, 간격)

**추천 스타일**: 01 Pentagram / 10 Müller-Brockmann / 11 Build / 18 Kenya Hara / 04 Fathom

**씬 프롬프트 템플릿**:
```
[스타일 DNA 삽입]
- Presentation slide design, 16:9
- One core message per slide
- Clear type hierarchy (title 40pt+, body 24pt+)
- Generous whitespace for projection clarity
- Consistent visual system throughout
- [Light/Dark] theme
```

---

## 5. PDF 백서 / 기술 보고서

**사양**:
- A4 세로 (210×297mm / 595×842pt)
- Letter 세로 (216×279mm / 612×792pt)

**핵심 디자인 요소**:
- 장문 읽기에 최적화 (줄 너비 66자, 줄 간격 1.5-1.8)
- 명확한 챕터 내비게이션 시스템
- 머리글/바닥글/페이지 번호의 통일된 디자인
- 도표와 본문의 우아한 공존
- 인용/주석 시스템
- 커버 페이지는 세련되게 디자인

**추천 스타일**: 10 Müller-Brockmann / 04 Fathom / 03 Information Architects / 17 Takram / 19 Irma Boom

**씬 프롬프트 템플릿**:
```
[스타일 DNA 삽입]
- PDF document / white paper design
- A4 portrait format (210×297mm)
- Long-form reading optimized (66 char line width, 1.5 line height)
- Clear chapter navigation system
- Elegant header/footer/page number design
- Charts integrated with body text
- Professional cover page
```

---

## 6. 랜딩 페이지 / 제품 공식 웹사이트

**사양**:
- Desktop: 1440px 너비 기준 디자인 (320px까지 반응형)
- 히로 섹션 높이: 100vh

**핵심 디자인 요소**:
- 히로 섹션에서 5초 안에 핵심 가치를 전달
- 명확한 CTA(Call-to-Action) 버튼
- 스크롤 내러티브 구조 (문제 → 해결책 → 증거 → 행동)
- 모바일 최적화
- 로딩 속도

**추천 스타일**: 05 Locomotive / 01 Pentagram / 11 Build / 08 Resn / 06 Active Theory

**씬 프롬프트 템플릿**:
```
[스타일 DNA 삽입]
- Landing page / product website
- Desktop 1440px width, responsive
- Hero section 100vh, core value in 5 seconds
- Clear CTA button design
- Scroll narrative: problem → solution → proof → action
- Modern web aesthetic
```

---

## 7. 앱 UI / 프로토타입 인터페이스

**사양**:
- iOS: 390×844pt (iPhone 15)
- Android: 360×800dp
- 태블릿: 1024×1366pt (iPad Pro)

**핵심 디자인 요소**:
- 터치 친화적 (최소 터치 영역 44×44pt)
- 시스템 디자인 언어의 일관성
- 상태 표시줄/내비게이션 바/탭 바의 표준 처리
- 정보 밀도는 적당하게 (모바일에서는 너무 빽빽하지 않게)

**추천 스타일**: 17 Takram / 11 Build / 03 Information Architects / 01 Pentagram

**씬 프롬프트 템플릿**:
```
[스타일 DNA 삽입]
- Mobile app UI design
- iOS [390×844pt] / Android [360×800dp]
- Touch-friendly (44pt minimum tap targets)
- Consistent design system
- Standard status bar / navigation / tab bar
- Moderate information density
```

---

## 8. 샤오홍슈(Xiaohongshu/RED) 이미지

**사양**:
- 세로형: 3:4 (1080×1440px)가 가장 적합
- 정사각형: 1:1 (1080×1080px)
- 첫 번째 이미지가 클릭률을 결정

**핵심 디자인 요소**:
- 시각적 매력을 최우선으로 (폭포수 피드(waterfall feed)에서 경쟁력을 갖춰야 함)
- 소량의 텍스트는 허용 (하지만 화면의 20%를 넘지 않아야 함)
- 색상은 선명하면서도 저렴해 보이지 않아야 함
- 라이프스타일/질감/분위기 느낌

**추천 스타일**: 12 Sagmeister / 11 Build / 20 Neo Shen / 09 Experimental Jetset

**씬 프롬프트 템플릿**:
```
[스타일 DNA 삽입]
- Social media image for Xiaohongshu (RED)
- Vertical 3:4 (1080×1440px)
- Eye-catching in waterfall feed
- Minimal text overlay (under 20% of area)
- Vivid but tasteful colors
- Lifestyle/texture/atmosphere feel
```

---

## 조합 예시

**씬**: 공중계정(WeChat) 커버, AI 프로그래밍 도구 소개, 전문적이면서도 따뜻한 느낌을 원함

**Step 1**: 스타일 선택 → 17 Takram (전문성 + 온기)
**Step 2**: Takram 프롬프트 DNA + 공중계정 커버 템플릿 조합

```
Takram Japanese speculative design:
- Elegant concept prototypes and diagrams
- Soft tech aesthetic (rounded corners, gentle shadows)
- Charts and diagrams as art pieces
- Modest sophistication
- Neutral natural colors (beige, soft gray, muted green)
- Design as philosophical inquiry

Article cover image for WeChat subscription
- Landscape format, 2.35:1 aspect ratio (1200×510px)
- Bold visual impact, minimal text
- Moderate color saturation for white reading environment
- Must remain recognizable as thumbnail
- Clean composition with clear focal point

Content: An AI coding assistant tool, showing the concept of human-AI collaboration
in software development, warm and professional atmosphere
```

---

**버전**: v1.0
**업데이트 날짜**: 2026-02-13
