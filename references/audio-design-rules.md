# 오디오 디자인 규칙 · huashu-design

> 모든 애니메이션 데모에 적용되는 오디오 레시피입니다. `sfx-library.md`(에셋 목록)와 함께 사용하세요.
> 실전 검증: huashu-design hero v1-v9 반복 출시 · Anthropic 공식 영상 3편의 Gemini 심층 분석 · 8000+회 A/B 비교

---

## 핵심 원칙 · 오디오 이중 트랙 시스템(불변의 법칙)

애니메이션 오디오는 **반드시 두 개의 독립적인 레이어로 설계**해야 하며, 단일 레이어로는 안 됩니다:

| 레이어 | 역할 | 시간 척도 | 시각적 요소와의 관계 | 차지하는 주파수 대역 |
|---|---|---|---|---|
| **SFX(비트 레이어)** | 각 시각적 비트(Beat) 표시 | 0.2~2초 짧은 소리 | **강한 동기화**(프레임 수준 정렬) | **고주파 800Hz+** |
| **BGM(분위기 베이스)** | 감정적 바탕, 사운드 필드 | 연속 20~60초 | 약한 동기화(구간 수준) | **중저주파 <4kHz** |

**BGM만 있는 애니메이션은 불완전합니다**——시청자의 잠재의식이 「화면은 움직이는데 소리 반응이 없다」고 인식하면, 그것이 바로 저렴한 느낌의 근원이 됩니다.

---

## 골드 스탠다드 · 황금 비율

다음 수치들은 Anthropic 공식 영상 3편 + 당사 v9 최종 버전 비교를 통해 실측된 **엔지니어링 하드 파라미터**이므로 그대로 적용하세요:

### 볼륨
- **BGM 볼륨**: `0.40-0.50`(전체 스케일 1.0 기준)
- **SFX 볼륨**: `1.00`
- **음량 차이**: BGM이 SFX 피크보다 **-6~-8 dB 낮음**(SFX의 절대적인 음량이 아닌 음량 차이로 두드러지게 함)
- **amix 파라미터**: `normalize=0`(절대 normalize=1을 사용하지 마세요. 다이난믹 레인지가 평탄해집니다)

### 주파수 대역 격리(P1 하드 최적화)
Anthropic의 비결은 「SFX 음량이 크다」는 것이 아니라 **주파수 대역 분리**입니다:

```bash
[bgm_raw]lowpass=f=4000[bgm]      # BGM을 <4kHz 중저주파로 제한
[sfx_raw]highpass=f=800[sfx]      # SFX를 800Hz+ 중고주파로 밀어 올림
[bgm][sfx]amix=inputs=2:duration=first:normalize=0[a]
```

이유: 사람의 귀는 2~5kHz 구간에 가장 민감합니다(「Presence 대역」). SFX가 이 구간에 집중되어 있고 BGM이 전 주파수 대역을 커버하면, **SFX는 BGM의 고주파 부분에 가려집니다**. highpass로 SFX를 높이고 lowpass로 BGM을 낮추면 두 소리가 스펙트럼상 각자의 영역을 차지하게 되어 SFX 선명도가 한 단계 높아집니다.

### Fade
- BGM 인: `afade=in:st=0:d=0.3`(0.3초, 하드 컷 방지)
- BGM 아웃: `afade=out:st=N-1.5:d=1.5`(1.5초 롱테일, 마무리감)
- SFX는 자체 엔벨로프(Envelope)를 가지므로 별도의 fade가 필요 없습니다

---

## SFX 큐(Cue) 디자인 규칙

### 밀도(10초당 SFX 개수)
Anthropic 영상 3편의 SFX 밀도 실측 결과는 세 가지 단계로 나뉩니다:

| 영상 | 10초당 SFX 수 | 제품 성격 | 적용 장면 |
|---|---|---|---|
| Artifacts(ref-1) | **~9개/10s** | 기능 밀집, 정보 다량 | 복잡한 도구 데모 |
| Code Desktop(ref-2) | **0개** | 순수한 분위기, 명상적 느낌 | 개발 도구 집중 상태 |
| Word(ref-3) | **~4개/10s** | 균형 잡힘, 사무실 리듬 | 생산성 도구 |

**경험 법칙**:
- 제품 성격이 차분/집중적 → SFX 밀도 낮음(0~3개/10s), BGM 중심
- 제품 성격이 활발/정보 다량 → SFX 밀도 높음(6~9개/10s), SFX가 리듬을 주도
- **모든 시각적 비트에 SFX를 채우지 마세요**——여백이 밀집보다 더 고급스럽습니다. **30~50%의 큐를 삭제하면 남은 큐가 더 극적으로 다가옵니다**.

### 큐(Cue) 선택 우선순위
각 시각적 비트마다 SFX가 필요한 것은 아닙니다. 다음 우선순위로 선택하세요:

**P0 필수**(생략하면 위화감 발생):
- 타이핑(터미널/입력)
- 클릭/선택(사용자 결정 순간)
- 포커스 전환(시각적 주인공 이동)
- 로고 리빌(Logo Reveal, 브랜드 마무리)

**P1 권장**:
- 요소 입장/퇴장(Modal / Card)
- 완료/성공 피드백
- AI 생성 시작/종료
- 주요 전환(Scene 전환)

**P2 선택적**(많으면 지저분해짐):
- Hover / Focus-in
- 진행률 틱(Tick)
- 장식적 Ambient

### 타임스탬프 정렬 정확도
- **동일 프레임 정렬**(0ms 오차): 클릭/포커스 전환/로고 고정
- **1~2프레임 선행**(-33ms): 빠른 Whoosh(시청자에게 심리적 예고)
- **1~2프레임 후행**(+33ms): 물체 착지/임팩트(실제 물리 법칙 부합)

---

## BGM 선택 결정 트리

huashu-design 스킬에 기본 내장된 6개의 BGM(`assets/bgm-*.mp3`):

```
애니메이션 성격이 무엇인가요?
├─ 제품 출시 / 기술 데모 → bgm-tech.mp3(minimal synth + piano)
├─ 튜토리얼 설명 / 도구 사용 → bgm-tutorial.mp3(warm, instructional)
├─ 교육 학습 / 원리 설명 → bgm-educational.mp3(curious, thoughtful)
├─ 마케팅 광고 / 브랜드 홍보 → bgm-ad.mp3(upbeat, promotional)
└─ 유사 스타일의 변형 필요 → bgm-*-alt.mp3(각각 대체 버전)
```

### BGM 없는 장면(고려해 볼 만함)
Anthropic Code Desktop(ref-2) 참고: **0 SFX + 순수 Lo-fi BGM**도 매우 고급스러울 수 있습니다.

**BGM 없음을 선택할 때**:
- 애니메이션 길이 <10s(BGM이 자리를 잡을 수 없음)
- 제품 성격이 「집중/명상」
- 장면 자체에 환경음/설명 음성이 있음
- SFX 밀도가 매우 높을 때(청각 과부하 방지)

---

## 장면 레시피(바로 사용 가능)

### 레시피 A · 제품 출시 히어로(huashu-design v9 동일)
```
길이: 25초
BGM: bgm-tech.mp3 · 45% · 주파수 대역 <4kHz
SFX 밀도: ~6개/10s

큐(Cue):
  터미널 타이핑 → type × 4(간격 0.6s)
  엔터     → enter
  카드 모음 → card × 4(0.2s 차이를 두고)
  선택     → click
  Ripple   → whoosh
  4회 포커스  → focus × 4
  로고     → thud(1.5s)

볼륨: BGM 0.45 / SFX 1.0 · amix normalize=0
```

### 레시피 B · 도구 기능 데모(Anthropic Code Desktop 참고)
```
길이: 30-45초
BGM: bgm-tutorial.mp3 · 50%
SFX 밀도: 0-2개/10s(매우 적음)

전략: BGM + 설명 Voiceover가 리듬을 주도하고, SFX는 **결정적 순간**(파일 저장/명령 실행 완료)에만 사용
```

### 레시피 C · AI 생성 데모
```
길이: 15-20초
BGM: bgm-tech.mp3 또는 BGM 없음
SFX 밀도: ~8개/10s(고밀도)

큐(Cue):
  사용자 입력 → type + enter
  AI 처리 시작 → magic/ai-process(1.2s 반복)
  생성 완료 → feedback/complete-done
  결과 표시 → magic/sparkle
  
하이라이트: ai-process는 생성 과정 전체에 걸쳐 2~3회 반복 가능
```

### 레시피 D · 순수 분위기 롱테이크(Artifacts 참고)
```
길이: 10-15초
BGM: 없음
SFX: 3~5개의 정교하게 설계된 큐만 단독 사용

전략: 각 SFX가 주인공이 되어 BGM이 「뭉개지는」 문제가 없습니다.
적합: 단일 제품 슬로우 모션, 클로즈업 전시
```

---

## ffmpeg 합성 템플릿

### 템플릿 1 · 비디오에 단일 SFX 오버레이
```bash
ffmpeg -y -i video.mp4 -itsoffset 2.5 -i sfx.mp3 \
  -filter_complex "[0:a][1:a]amix=inputs=2:normalize=0[a]" \
  -map 0:v -map "[a]" output.mp4
```

### 템플릿 2 · 다중 SFX 타임라인 합성(큐 시간 정렬)
```bash
ffmpeg -y \
  -i sfx-type.mp3 -i sfx-enter.mp3 -i sfx-click.mp3 -i sfx-thud.mp3 \
  -filter_complex "\
[0:a]adelay=1100|1100[a0];\
[1:a]adelay=3200|3200[a1];\
[2:a]adelay=7000|7000[a2];\
[3:a]adelay=21800|21800[a3];\
[a0][a1][a2][a3]amix=inputs=4:duration=longest:normalize=0[mixed]" \
  -map "[mixed]" -t 25 sfx-track.mp3
```
**핵심 파라미터**:
- `adelay=N|N`: 앞은 좌채널 지연(ms), 뒤는 우채널. 스테레오 정렬을 위해 두 번씩 작성
- `normalize=0`: 다이난믹 레인지 보존, 핵심!
- `-t 25`: 지정한 길이로 자르기

### 템플릿 3 · 비디오 + SFX 트랙 + BGM(주파수 대역 격리 포함)
```bash
ffmpeg -y -i video.mp4 -i sfx-track.mp3 -i bgm.mp3 \
  -filter_complex "\
[2:a]atrim=0:25,afade=in:st=0:d=0.3,afade=out:st=23.5:d=1.5,\
     lowpass=f=4000,volume=0.45[bgm];\
[1:a]highpass=f=800,volume=1.0[sfx];\
[bgm][sfx]amix=inputs=2:duration=first:normalize=0[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k final.mp4
```

---

## 실패 모드 빠른 진단

| 증상 | 근본 원인 | 수정 방법 |
|---|---|---|
| SFX가 들리지 않음 | BGM 고주파 부분이 가림 | BGM에 `lowpass=f=4000` + SFX에 `highpass=f=800` 추가 |
| 효과음이 너무 크고 거침 | SFX 절대 볼륨이 너무 큼 | SFX 볼륨을 0.7로 낮추고 BGM도 0.3으로 낮춰 차이 유지 |
| BGM과 SFX 리듬 충돌 | BGM 선택 오류(강한 비트가 있는 음악 사용) | Ambient / minimal synth 스타일의 BGM으로 교체 |
| 애니메이션 종료 시 BGM이 갑자기 끊김 | Fade out 미적용 | `afade=out:st=N-1.5:d=1.5` |
| SFX가 겹쳐 뭉개짐 | 큐가 너무 밀집 + 각 SFX 길이가 너무 김 | SFX 길이를 0.5초 이내로 제어, 큐 간격 ≥ 0.2s |
| WeChat Official Accounts mp4에 소리 없음 | WeChat Official Accounts가 자동 재생을 음소거할 때가 있음 | 걱정하지 마세요, 사용자가 탭하면 소리가 납니다. gif는 원래 소리가 없습니다 |

---

## 시각적 요소와의 연동(고급)

### SFX 음색은 시각적 스타일과 매칭되어야 함
- 따뜻한 베이지/종이 질감 시각 → SFX는 **나무/부드러운** 음색 사용(Morse, paper snap, soft click)
- 차가운 블랙 테크 시각 → SFX는 **금속/디지털** 음색 사용(beep, pulse, glitch)
- 손그림/동심 시각 → SFX는 **카툰/과장된** 음색 사용(boing, pop, zap)

당사의 현재 `apple-gallery-showcase.md` 따뜻한 베이지 바탕 → `keyboard/type.mp3`(mechanical) + `container/card-snap.mp3`(soft) + `impact/logo-reveal-v2.mp3`(cinematic bass)와 매칭

### SFX가 시각적 리듬을 유도할 수 있음
고급 기법: **먼저 SFX 타임라인을 설계한 후, SFX에 맞춰 시각적 애니메이션을 조정합니다**(반대가 아님).
SFX의 각 큐는 「시계 틱(Tick)」이므로, 시각적 애니메이션이 SFX 리듬에 맞춰지면 매우 안정적입니다——반대로 SFX가 시각적 요소를 쫓아가면 ±1프레임이라도 어긋나면 위화감이 생깁니다.

---

## 품질 점검 체크리스트(출시 전 자가 점검)

- [ ] 음량 차이: SFX 피크 - BGM 피크 = -6~-8 dB인가요?
- [ ] 주파수 대역: BGM lowpass 4kHz + SFX highpass 800Hz인가요?
- [ ] amix normalize=0(다이난믹 레인지 보존)인가요?
- [ ] BGM fade-in 0.3s + fade-out 1.5s인가요?
- [ ] SFX 수량이 적절한가요(장면 성격에 따라 밀도 선택)?
- [ ] 각 SFX가 시각적 비트와 동일 프레임 정렬(±1프레임 이내)인가요?
- [ ] 로고 리빌 효과음 길이가 충분한가요(1.5s 권장)?
- [ ] BGM을 끄고 한 번 들어보기: SFX 단독으로 리듬감이 충분한가요?
- [ ] SFX를 끄고 한 번 들어보기: BGM 단독으로 감정의 오르내림이 있는가요?

두 레이어 중 어느 하나라도 단독으로 들었을 때 자체적으로 완결되어야 합니다. 두 레이어가 겹쳐져야만 좋게 들린다면, 그것은 제대로 된 것이 아닙니다.

---

## 참고

- SFX 에셋 목록: `sfx-library.md`
- 시각적 스타일 참고: `apple-gallery-showcase.md`
- Anthropic 영상 3편 심층 오디오 분석: `/Users/alchain/Documents/写作/01-公众号写作/项目/2026.04-huashu-design发布/参考动画/AUDIO-BEST-PRACTICES.md`
- huashu-design v9 실전 사례: `/Users/alchain/Documents/写作/01-公众号写作/项目/2026.04-huashu-design发布/配图/hero-animation-v9-final.mp4`
