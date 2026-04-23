# 기여 가이드 (Contributing Guide)

KTK Design에 관심을 가져주셔서 감사합니다. 이 프로젝트는 [花叔 (花生 / alchaincyf)](https://github.com/alchaincyf)의 원작 [huashu-design](https://github.com/alchaincyf/huashu-design)을 포크하여 한국어로 리패키징한 프로젝트입니다.

## 원작자 (Original Author)

| | |
|---|---|
| **원작자** | 花生（花叔）/ Alchaincyf |
| **원작 저장소** | [alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design) |
| **원작 라이선스** | 개인 사용 무상 / 기업 상업 사용 금지 (원작자 허가 필요) |

모든 기여는 원작자의 지식재산권을 존중해야 하며, 상업적 이용은 원작자의 별도 허가가 필요합니다.

---

## 어떤 기여를 환영하나요?

### ✅ 환영하는 기여

- **번역 개선**: 한국어 번역의 자연스러움, 오타, 어색한 표현 수정
- **문서화**: README, SKILL.md, references/ 내 문서의 가독성 향상
- **한국어 현지화**: 한국 개발자/디자이너에게 맞는 예시, 링크, 문화적 맥락 추가
- **버그 리포트**: 번역 누락, 링크 오류, 문서 불일치 등

### ❌ 제한되는 기여

- 원작의 핵심 철학, 디자인 규칙, 프로토콜의 변경
- 상업적 목적의 코드 수정 또는 재배포
- 원작자의 브랜드/저작권을 침해하는 내용

---

## 기여 절차

### 1. Issues 먼저

큰 변경사항은 먼저 [Issues](https://github.com/ktkarchive/ktk-design/issues)에 등록해 주세요. 번역 논의, 방향성 확인 등을 함께할 수 있습니다.

### 2. Fork & Branch

```bash
# 이 저장소를 Fork한 후
git clone https://github.com/<your-username>/ktk-design.git
cd ktk-design
git checkout -b fix/translation-typo
# 또는
git checkout -b docs/improve-readme
```

### 3. 커밋 메시지 규칙

```
type: 한국어로 간결하게 설명

- type 종류: feat(기능/번역 추가), fix(오타/버그 수정), docs(문서 개선), refactor(리팩토링)
- 예시: "fix: SKILL.md '트리거' → '발동' 자연스러운 표현으로 수정"
```

### 4. Pull Request

- PR 제목에 변경 범위를 명확히 적어주세요.
- 번역 관련 PR은 **원문과 대조**할 수 있도록 변경 전/후를 설명해 주세요.
- 원작자의 철학을 해치지 않는지 확인해 주세요.

---

## 번역 스타일 가이드

### 문체

- **존칭 사용**: 사용자를 "당신"으로 통일 (반말 금지)
- **자연스러운 한국어**: 직역보다 의역. 원문의 의도를 살리되 한국어로 자연스럽게.
- **기술 용어**: 일반적으로 통용되는 영어 용어는 괄호 병기 (예: placeholder, mockup, fallback)

### 금지 표현 → 권장 표현

| 금지 (어색) | 권장 (자연스러움) |
|------------|-----------------|
| 산출한다 | 만든다 / 낸다 |
| 트리거 조건 | 발동 조건 |
| 강제 프로세스 | 필수 절차 |
| 반례 | 반면교사 / 실제 사례 |
| 본 프로토콜 위반 | 이 프로토콜 위반 |
| 적용 가능한 장면 | 적합한 상황 |

### 파일 구조

```
# 한국어가 기본 문서
README.md          # 한국어 (기본)
README.en.md       # 영어
README.zh.md       # 중국어 (원작)
SKILL.md           # 한국어 (에이전트용)
SKILL.md.zh.bak    # 중국어 원본 백업
```

---

## 행동 강령 (Code of Conduct)

- 서로를 존중하는 톤으로 소통합니다.
- 비판은 내용에 대해 하고, 사람에 대해 하지 않습니다.
- 원작자의 노력을 인정하고, 적절하게 인용/크레딧을 표시합니다.

---

## 문의

- 한국어 버전 관련: [Issues](https://github.com/ktkarchive/ktk-design/issues)
- 원작자 연락: [alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design) 또는 花叔 SNS
