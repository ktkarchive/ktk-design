# 비디오 익스포트(Video Export): HTML 애니메이션을 MP4/GIF로 낸비내기

HTML 애니메이션이 완성되면, 사용자들은 종종 "비디오로 낼 수 있나요?"라고 묻습니다. 이 가이드는 전체 작업 흐름을 안내합니다.

## 언제 익스포트하는가

**익스포트 타이밍**:
- 애니메이션이 완전히 작동하고, 시각적으로 검증되었을 때 (Playwright 스크린샷으로 각 시간대 상태가 올바른지 확인)
- 사용자가 브라우저에서 최소 한 번은 확인하고, 효과가 괜찮다고 했을 때
- 애니메이션 버그를 아직 수정하지 않은 단계에서는 **익스포트하지 마세요** — 비디오로 낸 뒤 수정하는 것이 훨씬 번거롭습니다

**사용자가 말할 수 있는 트리거 문구**:
- "비디오로 낼 수 있나요"
- "MP4로 바꿔주세요"
- "GIF로 만들어주세요"
- "60fps로요"

## 산출물 스펙

기본적으로 세 가지 포맷을 한 번에 제공하여 사용자가 선택할 수 있게 합니다:

| 포맷 | 스펙 | 적합한 장면 | 일반적인 크기 (30초 기준) |
|---|---|---|---|
| MP4 25fps | 1920×1080 · H.264 · CRF 18 | 공식 계정 임베드, 비디오 채널, YouTube | 1-2 MB |
| MP4 60fps | 1920×1080 · minterpolate 보간 · H.264 · CRF 18 | 고프레임 전시, Bilibili, 포트폴리오 | 1.5-3 MB |
| GIF | 960×540 · 15fps · 팔레트(palette) 최적화 | Twitter/X, README, Slack 미리보기 | 2-4 MB |

## 툴체인(Toolchain)

`scripts/`에 두 개의 스크립트가 있습니다:

### 1. `render-video.js` — HTML → MP4

25fps MP4 기본 버전을 녹화합니다. 전역 playwright에 의존합니다.

```bash
NODE_PATH=$(npm root -g) node /path/to/claude-design/scripts/render-video.js <html 파일>
```

선택적 파라미터:
- `--duration=30` 애니메이션 길이 (초)
- `--width=1920 --height=1080` 해상도
- `--trim=2.2` 영상 시작 부분에서 잘라낼 초 수 (새로고침 + 폰트 로딩 시간 제거)
- `--fontwait=1.5` 폰트 로딩 대기 시간 (초), 폰트가 많을 때 높게 설정

출력: HTML과 같은 디렉토리, 같은 이름의 `.mp4`.

### 2. `add-music.sh` — MP4 + BGM → MP4

무성 MP4에 배경 음악을 믹스합니다. 장면(분위기, mood)에 따라 내장 BGM 라이브러리에서 선택하거나, 직접 오디오를 가져올 수도 있습니다. 자동으로 길이를 맞추고, 페이드 인/아웃을 추가합니다.

```bash
bash add-music.sh <input.mp4> [--mood=<name>] [--music=<path>] [--out=<path>]
```

**내장 BGM 라이브러리** (`assets/bgm-<mood>.mp3`):

| `--mood=` | 스타일 | 적합한 장면 |
|-----------|------|---------|
| `tech` (기본) | Apple Silicon / 애플 발표회 스타일, 미니멀 신디사이저+피아노 | 제품 발표, AI 도구, Skill 홍보 |
| `ad` | 업비트(upbeat) 현대 일렉트로닉, 빌드(build)+드롭(drop) 있음 | 소셜 미디어 광고, 제품 티저, 프로모션 영상 |
| `educational` | 따뜻하고 밝은, 경량 기타/전자 피아노, inviting | 과학 상식, 튜토리얼 소개, 강의 예고 |
| `educational-alt` | 같은 계열 대안, 다른 곡으로 시도필 때 | 위와 동일 |
| `tutorial` | 로파이(lo-fi) 앰비언트, 거의 느껴지지 않음 | 소프트웨어 데모, 프로그래밍 튜토리얼, 긴 데모 |
| `tutorial-alt` | 같은 계열 대안 | 위와 동일 |

**동작**:
- 음악을 비디오 길이에 맞춰 자릅니다
- 0.3초 페이드 인 + 1초 페이드 아웃 (갑작스러운 끊김 방지)
- 비디오 스트림 `-c:v copy`로 재인코딩하지 않고, 오디오는 AAC 192k
- `--music=<path>`가 `--mood`보다 우선순위가 높아, 어떤 외부 오디오라도 직접 지정할 수 있습니다
- 잘못된 mood 이름을 전달하면 사용 가능한 모든 옵션을 나열하며, 조용히 실패하지 않습니다

**전형적인 파이프라인** (애니메이션 익스포트 3종 + 배경음악):
```bash
node render-video.js animation.html                        # 화면 녹화
bash convert-formats.sh animation.mp4                      # 60fps + GIF 파생
bash add-music.sh animation-60fps.mp4                      # 기본 tech BGM 추가
# 또는 장멸에 맞게:
bash add-music.sh tutorial-demo.mp4 --mood=tutorial
bash add-music.sh product-promo.mp4 --mood=ad --out=promo-final.mp4
```

### 3. `convert-formats.sh` — MP4 → 60fps MP4 + GIF

기존 MP4에서 60fps 버전과 GIF를 생성합니다.

```bash
bash /path/to/claude-design/scripts/convert-formats.sh <input.mp4> [gif_width] [--minterpolate]
```

출력 (입력과 같은 디렉토리):
- `<name>-60fps.mp4` — 기본적으로 `fps=60` 프레임 복사 (호환성 넓음); `--minterpolate` 추가 시 고품질 보간 활성화
- `<name>.gif` — 팔레트(palette) 최적화 GIF (기본 960 너비, 변경 가능)

**60fps 모드 선택**:

| 모드 | 명령어 | 호환성 | 사용 장면 |
|---|---|---|---|
| 프레임 복사 (기본) | `convert-formats.sh in.mp4` | QuickTime/Safari/Chrome/VLC 전체 통과 | 일반 전달, 업로드 플랫폼, 소셜 미디어 |
| minterpolate 보간 | `convert-formats.sh in.mp4 --minterpolate` | macOS QuickTime/Safari에서 거부할 수 있음 | Bilibili 등 진정한 보간이 필요한 전시 장면, **전달 전 반드시 로컬에서 대상 플레이어를 테스트** |

왜 기본을 프레임 복사로 바꿨나요? minterpolate가 출력하는 H.264 elementary stream에는 알려진 호환성 버그가 있습니다 — 이전에 minterpolate를 기본으로 했을 때 "macOS QuickTime이 열리지 않는다"는 문제를 여러 번 겪었습니다. 자세한 내용은 `animation-pitfalls.md` §14을 참조하세요.

`gif_width` 파라미터:
- 960 (기본) — 소셜 플랫폼 범용
- 1280 — 더 선명하지만 파일이 큼
- 600 — Twitter/X 우선 로딩

## 전체 프로세스 (표준 권장)

사용자가 "비디오로 내보내주세요"라고 한 뒤:

```bash
cd <프로젝트 디렉토리>

# $SKILL이 본 skill의 루트 디렉토리를 가리킨다고 가정 (설치 위치에 맞게 직접 교체)

# 1. 25fps 기본 MP4 녹화
NODE_PATH=$(npm root -g) node "$SKILL/scripts/render-video.js" my-animation.html

# 2. 60fps MP4와 GIF 파생
bash "$SKILL/scripts/convert-formats.sh" my-animation.mp4

# 산출물 목록:
# my-animation.mp4         (25fps · 1-2 MB)
# my-animation-60fps.mp4   (60fps · 1.5-3 MB)
# my-animation.gif         (15fps · 2-4 MB)
```

## 기술적 세부사항 (문제 해결용)

### Playwright recordVideo의 함정

- 프레임 레이트는 25fps로 고정되어 있어, 직접 60fps를 녹화할 수 없습니다 (Chromium headless의 컴포지터 상한)
- context 생성부터 녹화가 시작되므로, `trim`으로 앞쪽 로딩 시간을 잘라내야 합니다
- 기본 webm 포맷이므로, 범용 재생을 위해 ffmpeg로 H.264 MP4로 변환해야 합니다

`render-video.js`는 위 문제들을 모두 처리합니다.

### ffmpeg minterpolate 파라미터

현재 설정: `minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1`

- `mi_mode=mci` — motion compensation interpolation (모션 보상 보간)
- `mc_mode=aobmc` — adaptive overlapped block motion compensation (적응형 겹침 블록 모션 보상)
- `me_mode=bidir` — 양방향 모션 추정
- `vsbmc=1` — 가변 크기 블록 모션 보상

CSS **트랜스폼(transform) 애니메이션** (translate/scale/rotate)에 효과가 좋습니다.
**순수 페이드(fade)**에는 경미한 고스팅(ghosting)이 발생할 수 있습니다 — 사용자가 불만족스러워하면 단순 프레임 복사로 대체하세요:

```bash
ffmpeg -i input.mp4 -r 60 -c:v libx264 ... output.mp4
```

### GIF 팔레트(palette)가 2단계를 거치는 이유

GIF는 256색만 가능합니다. 한 번의 패스(pass)로 GIF를 만들면 전체 애니메이션 색상을 256색 범용 팔레트로 압축하여, 베이지 바탕+오렌지 같은 섬세한 배색이 뭉개집니다.

2단계:
1. `palettegen=stats_mode=diff` — 먼저 전체 영상을 스캔하여, **이 애니메이션 전용 옵티멀 팔레트(optimal palette)**를 생성
2. `paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle` — 이 팔레트로 인코딩하고, rectangle diff가 변화 영역만 업데이트하여 파일 크기를 크게 줄임

페이드 전환에는 `dither=bayer`가 `none`보다 더 부드럽지만, 파일이 약간 큽니다.

## 프리플라이트 체크(Pre-flight check) (익스포트 전)

익스포트 전 30초 자가 점검:

- [ ] HTML이 브라우저에서 한 번 완전히 실행되었고, 콘솔 오류가 없음
- [ ] 애니메이션 0번째 프레임이 완전한 초기 상태 (빈 로딩 중이 아님)
- [ ] 애니메이션 마지막 프레임이 안정적인 마무리 상태 (중간에 끊기지 않음)
- [ ] 폰트/이미지/이모지가 모두 정상적으로 렌더링됨 (`animation-pitfalls.md` 참조)
- [ ] Duration 파라미터가 HTML 내 실제 애니메이션 길이와 일치
- [ ] HTML의 Stage가 `window.__recording`을 감지하여 loop=false로 강제 설정 (수작업 Stage는 반드시 확인; `assets/animations.jsx` 사용 시 자동 포함)
- [ ] 마지막 Sprite의 `fadeOut={0}` (비디오 마지막 프레임이 페이드 아웃되지 않음)
- [ ] "Created by Huashu-Design" 워터마크 포함 (애니메이션 장면에만 필수; 타사 브랜드 작품에는 "비공식 제작 · " 접두사 추가. 자세한 내용은 SKILL.md §「Skill 홍보 워터마크」 참조)

## 전달 시 동봉하는 설명

익스포트 완료 후 사용자에게 제공하는 표준 설명 형식:

```
**완전한 전달**

| 파일 | 포맷 | 스펙 | 크기 |
|---|---|---|---|
| foo.mp4 | MP4 | 1920×1080 · 25fps · H.264 | X MB |
| foo-60fps.mp4 | MP4 | 1920×1080 · 60fps (모션 보간) · H.264 | X MB |
| foo.gif | GIF | 960×540 · 15fps · 팔레트 최적화 | X MB |

**설명**
- 60fps는 minterpolate로 모션 추정 보간을 사용하여, 트랜스폼 애니메이션에 효과가 좋습니다
- GIF는 팔레트 최적화를 사용하여, 30초 애니메이션을 약 3MB로 압축할 수 있습니다

사이즈나 프레임 레이트를 바꾸려면 말씀해 주세요.
```

## 일반적인 사용자 추가 요구사항

| 사용자의 말 | 대응 |
|---|---|
| "너무 커요" | MP4: CRF를 23-28로 높임; GIF: 해상도를 600으로 내리거나 fps를 10으로 내림 |
| "GIF가 너무 뭉개져요" | `gif_width`를 1280으로 높임; 또는 MP4로 대체 제안 (위챗 모멘트도 지원) |
| "세로 화면 9:16이 필요해요" | HTML 소스의 `--width=1080 --height=1920`으로 수정 후 재녹화 |
| "워터마크를 넣어주세요" | ffmpeg에 `-vf "drawtext=..."` 또는 PNG `overlay=` 추가 |
| "투명 배경이 필요해요" | MP4는 알파(alpha)를 지원하지 않음; WebM VP9 + alpha 또는 APNG 사용 |
| "무손실로 해주세요" | CRF를 0 + preset veryslow로 변경 (파일이 10배 커짐) |
