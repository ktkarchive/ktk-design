# SFX 라이브러리 · huashu-design

> 모두 ElevenLabs Sound Generation API로 생성했으며, 애플(Apple) 키노트 수준의 음질을 자랑합니다.
> 제품급 SFX 에셋 라이브러리로, 화슈(花叔) 애니메이션/프레젠테이션/제품 데모 등 모든 상황을 커버합니다.

**에셋 경로**: `assets/sfx/<category>/<name>.mp3`
**총 개수**: 37개 SFX (30개 일괄 생성 + 7개 v7b 보존)
**생성 모델**: ElevenLabs Sound Generation API (prompt_influence 0.4)
**음질**: 44.1kHz MP3, 애플 키노트급 선명도, 별도 리버브(reverb) 없음

---

## 디렉터리 구조

```
assets/sfx/
├── keyboard/      type, type-fast, delete-key, space-tap, enter
├── ui/            click, click-soft, focus, hover-subtle, tap-finger, toggle-on
├── transition/    whoosh, whoosh-fast, swipe-horizontal, slide-in, dissolve
├── container/     card-snap, card-flip, stack-collapse, modal-open
├── feedback/      success-chime, error-tone, notification-pop, achievement
├── progress/      loading-tick, complete-done, generate-start
├── impact/        logo-reveal, logo-reveal-v2, brand-stamp, drop-thud
├── magic/         sparkle, ai-process, transform
└── terminal/      command-execute, output-appear, cursor-blink
```

---

## 빠른 찾아보기

### ⌨️ Keyboard (키보드 입력)

| 파일 | 길이 | 용도 | Prompt 핵심 |
|---|---|---|---|
| `sfx/keyboard/type.mp3` | 0.5초 | 단일 키 입력 (mechanical keyboard single key) | mechanical keyboard single key press |
| `sfx/keyboard/type-fast.mp3` | 1.5초 | 연속 빠른 타이핑 (프롬프트 입력 데모용) | fast continuous typing rhythm, apple magic keyboard |
| `sfx/keyboard/delete-key.mp3` | 0.5초 | 백스페이스(backspace) 삭제 | single backspace key, low pitched thud |
| `sfx/keyboard/space-tap.mp3` | 0.5초 | 스페이스바 가벼운 타격 | soft spacebar tap, wide flat |
| `sfx/keyboard/enter.mp3` | 0.5초 | 엔터 확인 (v7b 보존) | enter key press, crisp tactile |

### 🎯 UI (인터페이스 인터랙션)

| 파일 | 길이 | 용도 | Prompt 핵심 |
|---|---|---|---|
| `sfx/ui/click.mp3` | 0.5초 | 표준 UI 클릭 (v7b 보존) | crisp modern interface click |
| `sfx/ui/click-soft.mp3` | 0.5초 | 부드러운 UI 클릭 (보조 버튼/링크) | soft gentle button click, mid pitched |
| `sfx/ui/focus.mp3` | 0.5초 | 요소 포커스/선택 (v7b 보존) | subtle focus tone, element highlight |
| `sfx/ui/hover-subtle.mp3` | 0.5초 | 마우스오버(hover) 힌트 (극미세 피드백) | barely audible tick, air whisper |
| `sfx/ui/tap-finger.mp3` | 0.5초 | 모바일 탭 (iOS 인터페이스) | finger tap on touchscreen, muted thud |
| `sfx/ui/toggle-on.mp3` | 0.5초 | 스위치 켜기 | ios toggle switch flip, satisfying click |

### 🌊 Transition (전환)

| 파일 | 길이 | 용도 | Prompt 핵심 |
|---|---|---|---|
| `sfx/transition/whoosh.mp3` | 0.5초 | 표준 whoosh (v7b 보존) | air whoosh transition |
| `sfx/transition/whoosh-fast.mp3` | 0.6초 | 빠른 whoosh (제목 번쩍 들어오기, 탭 전환) | quick fast air whoosh, cinematic |
| `sfx/transition/swipe-horizontal.mp3` | 0.7초 | 가로 스와이프 (캐러셀, 탭 전환) | smooth left-to-right air movement |
| `sfx/transition/slide-in.mp3` | 0.6초 | 요소 슬라이드 인 (사이드 패널, 서랍) | smooth soft whoosh with arrival |
| `sfx/transition/dissolve.mp3` | 0.8초 | 부드러운 디졸브(이미지 페이드 인/아웃) | soft dissolve, airy shimmer |

### 🃏 Container (카드/컨테이너)

| 파일 | 길이 | 용도 | Prompt 핵심 |
|---|---|---|---|
| `sfx/container/card-snap.mp3` | 0.5초 | 카드 스냅/위치 고정 (v7b 보존) | card snap into place |
| `sfx/container/card-flip.mp3` | 0.7초 | 카드 뒤집기 (앞뒤 전환) | playing card flip, crisp snap |
| `sfx/container/stack-collapse.mp3` | 0.8초 | 스택(stack) 접기 (리스트 모음) | cards stacking, paper taps collapsing |
| `sfx/container/modal-open.mp3` | 0.6초 | 모달(modal) 열기 | modal popping open, whoosh + thud |

### 🔔 Feedback (알림/피드백)

| 파일 | 길이 | 용도 | Prompt 핵심 |
|---|---|---|---|
| `sfx/feedback/success-chime.mp3` | 1.0초 | 성공 알림 (결제 성공, 작업 완료) | two ascending bell tones, ios-style |
| `sfx/feedback/error-tone.mp3` | 0.7초 | 오류 알림 (경고, 실패) | descending two-note warning, soft |
| `sfx/feedback/notification-pop.mp3` | 0.6초 | 메시지 팝업 (토스트, 알림) | notification bloop, ios message alert |
| `sfx/feedback/achievement.mp3` | 1.5초 | 업적 달성 (마일스톤, 배지) | triumphant rising arpeggio, game-style |

### ⏳ Progress (진행/상태)

| 파일 | 길이 | 용도 | Prompt 핵심 |
|---|---|---|---|
| `sfx/progress/loading-tick.mp3` | 0.5초 | 로딩 비트 (프로그레스바 박자) | soft short pulse, minimal ambient |
| `sfx/progress/complete-done.mp3` | 0.8초 | 완료 확인 (단계 완료) | two ascending satisfying tones |
| `sfx/progress/generate-start.mp3` | 0.8초 | AI 생성 시작 | soft rising shimmer, magical whoosh |

### 💥 Impact (브랜드/임팩트)

| 파일 | 길이 | 용도 | Prompt 핵심 |
|---|---|---|---|
| `sfx/impact/logo-reveal.mp3` | 0.7초 | 로고 임팩트 (v7b 보존) | logo reveal thud |
| `sfx/impact/logo-reveal-v2.mp3` | 1.5초 | 더 긴 로고 임팩트 (영화감) | cinematic bass hit with shimmer tail |
| `sfx/impact/brand-stamp.mp3` | 1.0초 | 도장 찍기 (인증, 승인 도장) | rubber stamp thud, paper contact |
| `sfx/impact/drop-thud.mp3` | 0.7초 | 물건 낙하 (삽입, 배치) | heavy thud, wood surface contact |

### ✨ Magic (AI 변환)

| 파일 | 길이 | 용도 | Prompt 핵심 |
|---|---|---|---|
| `sfx/magic/sparkle.mp3` | 0.8초 | 마법 반짝임 (AI 하이라이트, 서프라이즈) | bright twinkling stars, fairy dust |
| `sfx/magic/ai-process.mp3` | 1.2초 | AI 처리음 (thinking 상태) | modulating digital hum with shimmer |
| `sfx/magic/transform.mp3` | 1.0초 | 변환 전환 (morph 효과) | rising shimmer whoosh with sparkle tail |

### 💻 Terminal (터미널)

| 파일 | 길이 | 용도 | Prompt 핵심 |
|---|---|---|---|
| `sfx/terminal/command-execute.mp3` | 0.5초 | 명령어 실행 | crisp digital beep with tick, hacker ui |
| `sfx/terminal/output-appear.mp3` | 0.6초 | 출력 등장 | rapid digital ticks, retro printout |
| `sfx/terminal/cursor-blink.mp3` | 0.5초 | 커서 깜빡임 | subtle soft digital pulse, rhythmic |

---

## 추천 조합 by 시나리오

### 💻 터미널 인터랙션 데모
```
type (0.5초) → enter (0.5초) → command-execute (0.5초) → output-appear (0.6초)
```
반복 요소: `cursor-blink`를 idle 상태의 배경음으로 사용.

### 🃏 카드 선택 플로우
```
hover-subtle (0.5초, UI 호버) → click-soft (0.5초, 클릭) → card-snap (0.5초, 위치 고정)
```
또는 고급 버전: `card-flip`로 앞뒤 전환.

### 🤖 AI 생성 전체 플로우
```
generate-start (0.8초, 시작) → ai-process (1.2초, 처리) → sparkle (0.8초, 반짝임) → complete-done (0.8초, 완료)
```
오류 시 `error-tone`으로 `complete-done`을 대체.

### 🎬 로고 리빌 (브랜드 모먼트)
```
whoosh-fast (0.6초, 포석) → logo-reveal-v2 (1.5초, 클라이맥스) → sparkle (0.8초, 여운)
```
간단 버전: `whoosh → logo-reveal` (바로 v7b 2종 세트).

### 📱 UI 인터랙션 데모 (모바일)
```
tap-finger (0.5초, 탭) → slide-in (0.6초, 패널 슬라이드 인) → toggle-on (0.5초, 토글)
```
완료 후: `success-chime` 또는 `notification-pop`.

### 📊 데이터 시각화/대시보드
```
loading-tick (0.5초, 비트) × N → complete-done (0.8초, 데이터 도착) → achievement (1.5초, 강렬한 마무리)
```

### 🎯 폼 제출 플로우
```
click-soft (0.5초) → loading-tick ×2 (1.0초) → success-chime (1.0초)
```
실패 분기: `error-tone (0.7초)`.

### 🪄 매직 트랜스폼 시나리오
```
whoosh-fast (0.6초) → transform (1.0초) → sparkle (0.8초)
```
적합: 요소 변형, 효과 전후 비교, "AI 재작성" 등 데모.

---

## 사용 규범

### 볼륨 가이드 (apple-gallery-showcase.md 오디오 듀얼 트랙 제도 참고)
- **SFX 메인 트랙**: `1.0` (감쇠 없음)
- **BGM 배경 트랙**: `0.4 ~ 0.5` (SFX가 뚜렷하게 들리도록)
- **다중 SFX 오버레이**: `amix=inputs=N:duration=longest:normalize=0`로 동적 범위 보존

### ffmpeg 조인 템플릿
```bash
# 단일 SFX 타임라인 맞춤:
ffmpeg -i video.mp4 -itsoffset 2.5 -i sfx/ui/click.mp3 \
  -filter_complex "[0:a][1:a]amix=inputs=2:duration=longest:normalize=0[a]" \
  -map 0:v -map "[a]" output.mp4

# 다중 SFX + BGM:
ffmpeg -i video.mp4 \
  -itsoffset 1.0 -i sfx/transition/whoosh-fast.mp3 \
  -itsoffset 1.6 -i sfx/impact/logo-reveal-v2.mp3 \
  -i bgm.mp3 \
  -filter_complex "[3:a]volume=0.4[bgm];[0:a][1:a][2:a][bgm]amix=inputs=4:normalize=0[a]" \
  -map 0:v -map "[a]" output.mp4
```

### 선택 결정 트리
1. **촉각 액션** 있음 (타이핑/클릭/스와이프) → `keyboard/` 또는 `ui/`
2. **요소 진장/퇴장** → `transition/`
3. **컨테이너 레벨 조작** (카드/모달) → `container/`
4. **상태 피드백** (성공/실패/알림) → `feedback/`
5. **진행/시간 흐름** → `progress/`
6. **브랜드 임팩트/중요 순간** → `impact/`
7. **AI 마법/변환** → `magic/`
8. **터미널/코드 데모** → `terminal/`

### 음향 중첩 피하기
- 동일 타임스탬프에 최대 `2개 SFX` 동시 재생
- BGM을 0.3 이하로 낮출 경우 3개까지 가능
- 브랜드 임팩트 시에는 다른 SFX 정리 (0.2초 여백 후 임팩트)

---

## Prompt 작성 원칙 (재사용용)

참고 스타일: `apple keynote, tight, minimal, no reverb unless ambient, crisp, elegant`

**좋은 prompt의 3요소**:
1. **소리 물리적 묘사**: 어떤 물체, 어떤 동작 ("mechanical keyboard single key press")
2. **질감/스타일 한정**: apple-style / ios-style / cinematic / retro
3. **반례 배제**: no reverb / clean studio / minimal

❌ "click sound"
✅ "crisp ui button click, clean modern interface sound, apple-style, high pitched"

❌ "magic"
✅ "bright twinkling stars sound, high pitched glittery chime, fairy dust"

---

## 상세 참고
- 오디오 듀얼 트랙 및 ffmpeg 조인: `apple-gallery-showcase.md`
- 원본 생성 스크립트: `/tmp/gen_sfx_batch.sh` (일회성 일괄 생성기)
