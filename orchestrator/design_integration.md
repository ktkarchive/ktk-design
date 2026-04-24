# KTK Design Orchestrator Integration Guide

> **Version**: 1.0  
> **Scope**: Kimi CLI Orchestrator ↔ KTK Design Skill 연동  
> **Language**: User-facing 한국어 / Technical specs English

---

## Overview: Why integrate KTK Design into Orchestration

Orchestrator는 다양한 CLI 도구(Kimi, Codex, Stitch 등)를 병렬/순차로 실행하는 "지휘자"입니다. KTK Design은 HTML-native 디자인 스킬로, 슬라이드, iOS 프로토타입, 애니메이션, 인포그래픽 등을 생성합니다.

**연동 목적:**
- 디자인 관련 작업이 들어오면 자동으로 KTK Design 룰셋을 적용
- 도구 선택 로직에서 디자인 최적 도구(KTK vs Codex vs Stitch)를 자동 분기
- 생성된 결과물에 대해 5차원 전문가 평가를 자동 수행
- 동일한 품질 기준을 모든 디자인 출력물에 일관되게 적용

**적용 대상:**
- 슬라이드/PPT, 모바일 프로토타입, 배너/썸네일, 애니메이션/영상, 인포그래픽, 디자인 리뷰

---

## Design Task Classification: 6 task types with routing

| Task Pattern | Primary Tool | Secondary Tool | KTK Reference |
|-------------|--------------|----------------|---------------|
| PPT/Slides | KTK Design | - | `slide-decks.md` |
| iOS/Android Prototype | Stitch | KTK Design | `ios_frame.jsx` |
| Image/Banner/Thumbnail | Codex | KTK Design | `content-guidelines.md` |
| Animation/Video | KTK Design | Codex | `animation-best-practices.md` |
| Infographic | KTK Design | - | `content-guidelines.md` |
| Design Critique | KTK Design | - | `critique-guide.md` |

### Routing Logic

```
if is_design_task(user_input):
    task_type = classify_design_task(user_input)
    
    if task_type == "slides":
        primary = "ktk-design"
        secondary = None
        reference = "slide-decks.md"
    elif task_type == "prototype":
        primary = "stitch"
        secondary = "ktk-design"
        reference = "ios_frame.jsx"
    elif task_type in ("image", "banner", "thumbnail"):
        primary = "codex"
        secondary = "ktk-design"
        reference = "content-guidelines.md"
    elif task_type in ("animation", "video"):
        primary = "ktk-design"
        secondary = "codex"
        reference = "animation-best-practices.md"
    elif task_type == "infographic":
        primary = "ktk-design"
        secondary = None
        reference = "content-guidelines.md"
    elif task_type == "critique":
        primary = "ktk-design"
        secondary = None
        reference = "critique-guide.md"
```

### Tool Selection Priority

1. **KTK Design 단독**: 슬라이드, 인포그래픽, 디자인 리뷰 — HTML 기반이면 충분
2. **Stitch + KTK Design**: iOS/Android 프로토타입 — Stitch로 레이아웃 구조, KTK로 디자인 시스템/타이포그래피 적용
3. **Codex + KTK Design**: 이미지/배너/썸네일 — Codex로 이미지 생성, KTK로 HTML 래퍼/스타일 가이드 적용
4. **KTK Design + Codex**: 애니메이션/영상 — KTK로 HTML 애니메이션, Codex로 보조 이미지 에셋 생성

---

## Workflow Integration: How to embed KTK Design rules into Orchestrator SKILL.md

Orchestrator의 `SKILL.md` 또는 계획 템플릿에 다음 블록을 추가합니다.

### 1. Design Task Detection Hook

```markdown
## Design Task Handling

When a user request involves any of the following, treat it as a **design task**:
- Slide, presentation, PPT, 덱, 슬라이드
- Prototype, mockup, wireframe, 프로토타입, 목업
- Banner, thumbnail, poster, 배너, 썸네일, 포스터
- Animation, video, motion, GIF, MP4, 애니메이션, 영상
- Infographic, chart, diagram, 인포그래픽, 차트
- Design review, critique, 피드백, 리뷰

**Always inject KTK Design rules** before delegating to any sub-agent.
```

### 2. Pre-Delegation Prompt Injection

디자인 작업을 하위 에이전트에 위임하기 전, 반드시 `design_rules.md`를 로드하여 system prompt에 주입:

```python
rules = load_ktk_rules()  # loads design_rules.md content
agent_system_prompt = f"""
You are executing a KTK Design task.

## KTK Design Rules (MANDATORY)
{rules}

## Task
{task_description}
"""
```

### 3. 3-Direction Checkpoint

디자인 작업은 반드시 **구현 전 3개 방향 제시** 단계를 거쳐야 함:

```
[Orchestrator] → sub-agent (direction mode)
   ↳ "3개의 디자인 방향을 제시하라"
   ↳ 각 방향: style_school, color_palette, layout_approach, key_detail

[Orchestrator] ← 3 directions
[User] → select direction A/B/C

[Orchestrator] → sub-agent (implement mode)
   ↳ "Direction {selected}를 구현하라"
```

이를 Orchestrator plan의 checkpoint로 추가:

```markdown
### Design Checkpoint 1: Direction Selection
- Output: 3 design directions
- Gate: 사용자가 선택해야 다음 단계 진행
- Timeout: 사용자 무응답 시 Direction A로 자동 진행 (configurable)
```

### 4. Post-Completion Critique Gate

구현 완료 후 반드시 `evaluate_output()`를 실행하여 5차원 평가 수행:

```markdown
### Design Checkpoint 2: Quality Critique
- Run: `design_engine.evaluate_output(html_path)`
- Output: 5-dimension score dict
- Gate: 어떤 dimension이든 6점 미만이면 개선 루프 진입
```

---

## Python Integration: Example router.py additions

`orchestrator/router.py` 또는 동등한 라우팅 모듈에 추가할 코드입니다.

```python
# router.py — Design Task Routing Module

import re
from pathlib import Path

# ── Constants ──
KTK_RULES_PATH = Path(__file__).parent / "design_rules.md"
KTK_DESIGN_KEYWORDS = [
    "slide", "presentation", "ppt", "deck", "슬라이드", "프레젠테이션",
    "prototype", "mockup", "wireframe", "ios", "android", "프로토타입", "목업",
    "banner", "thumbnail", "poster", "image", "배너", "썸네일", "포스터",
    "animation", "video", "motion", "gif", "mp4", "애니메이션", "영상", "모션",
    "infographic", "chart", "diagram", "인포그래픽", "차트", "다이어그램",
    "critique", "review", "feedback", "피드백", "리뷰", "평가",
]

# ── Task Detection ──

def is_design_task(task: str) -> bool:
    """Return True if the task description matches a design task pattern."""
    text = task.lower()
    return any(kw in text for kw in KTK_DESIGN_KEYWORDS)


def classify_design_task(task: str) -> str:
    """Classify a design task into one of 6 types."""
    text = task.lower()
    
    if any(k in text for k in ["slide", "presentation", "ppt", "deck", "슬라이드", "프레젠테이션"]):
        return "slides"
    if any(k in text for k in ["prototype", "mockup", "ios", "android", "프로토타입", "목업"]):
        return "prototype"
    if any(k in text for k in ["banner", "thumbnail", "poster", "배너", "썸네일", "포스터"]):
        return "image"
    if any(k in text for k in ["animation", "video", "motion", "gif", "mp4", "애니메이션", "영상"]):
        return "animation"
    if any(k in text for k in ["infographic", "chart", "diagram", "인포그래픽", "차트"]):
        return "infographic"
    if any(k in text for k in ["critique", "review", "feedback", "피드백", "리뷰", "평가"]):
        return "critique"
    
    return "generic_design"


# ── Routing ──

def route_design_task(task: str) -> dict:
    """Return routing decision for a design task.
    
    Returns:
        dict with keys: primary_tool, secondary_tool, ktk_reference, 
                        requires_direction_selection, requires_critique
    """
    task_type = classify_design_task(task)
    
    ROUTING_TABLE = {
        "slides": {
            "primary_tool": "ktk-design",
            "secondary_tool": None,
            "ktk_reference": "slide-decks.md",
            "requires_direction_selection": True,
            "requires_critique": True,
        },
        "prototype": {
            "primary_tool": "stitch",
            "secondary_tool": "ktk-design",
            "ktk_reference": "ios_frame.jsx",
            "requires_direction_selection": True,
            "requires_critique": True,
        },
        "image": {
            "primary_tool": "codex",
            "secondary_tool": "ktk-design",
            "ktk_reference": "content-guidelines.md",
            "requires_direction_selection": False,
            "requires_critique": True,
        },
        "animation": {
            "primary_tool": "ktk-design",
            "secondary_tool": "codex",
            "ktk_reference": "animation-best-practices.md",
            "requires_direction_selection": True,
            "requires_critique": True,
        },
        "infographic": {
            "primary_tool": "ktk-design",
            "secondary_tool": None,
            "ktk_reference": "content-guidelines.md",
            "requires_direction_selection": True,
            "requires_critique": True,
        },
        "critique": {
            "primary_tool": "ktk-design",
            "secondary_tool": None,
            "ktk_reference": "critique-guide.md",
            "requires_direction_selection": False,
            "requires_critique": False,
        },
    }
    
    return ROUTING_TABLE.get(task_type, {
        "primary_tool": "ktk-design",
        "secondary_tool": None,
        "ktk_reference": "content-guidelines.md",
        "requires_direction_selection": True,
        "requires_critique": True,
    })


# ── Rule Loading ──

def load_ktk_rules() -> str:
    """Load KTK Design rules from design_rules.md."""
    if not KTK_RULES_PATH.exists():
        return "# KTK Design Rules\n(rules file not found)"
    return KTK_RULES_PATH.read_text(encoding="utf-8")
```

---

## Checkpoint Integration: design_quality_gate() function spec

디자인 작업의 품질을 검증하는 체크포인트 함수입니다.

### Signature

```python
def design_quality_gate(
    html_path: str | None = None,
    output_path: str | None = None,
    task_type: str = "slides",
    stage: str = "post_completion",  # "post_direction" | "post_completion" | "post_critique"
) -> dict:
    """Run quality checks on a design task output.

    Args:
        html_path: Path to generated HTML artifact (if applicable)
        output_path: Path to final output file (PPTX, MP4, etc.)
        task_type: One of 6 design task types
        stage: Which checkpoint stage to run

    Returns:
        {
            "passed": bool,
            "stage": str,
            "scores": dict | None,        # 5-dimension scores (post_completion/post_critique)
            "issues": list[str],
            "next_action": str,           # "proceed" | "revise" | "user_approval"
            "revision_prompt": str | None # Prompt to send to sub-agent for revision
        }
    """
```

### Stage Behaviors

| Stage | Trigger | Checks |
|-------|---------|--------|
| `post_direction` | 3개 방향 제시 후 | 방향이 3개인지, 각 방향에 style_school/color/layout/key_detail 있는지 |
| `post_completion` | 구현 완료 후 | HTML 존재 여부, CSS Grid 사용 여부, oklch() 사용 여부, emoji 미사용 여부 |
| `post_critique` | 5차원 평가 후 | 모든 dimension ≥ 6점인지, 최저 dimension 식별 |

### Example Usage

```python
# After implementation
result = design_quality_gate(
    html_path="/output/slide_deck.html",
    task_type="slides",
    stage="post_completion"
)

if not result["passed"]:
    # Re-enter revision loop
    sub_agent.prompt = result["revision_prompt"]
    sub_agent.run()
else:
    # Run critique
    scores = design_engine.evaluate_output("/output/slide_deck.html")
    result2 = design_quality_gate(
        html_path="/output/slide_deck.html",
        task_type="slides",
        stage="post_critique"
    )
```

### Failure Conditions

```python
FAILURE_CONDITIONS = {
    "post_direction": [
        "Less than 3 directions provided",
        "Missing style_school in any direction",
        "Missing color_palette in any direction",
    ],
    "post_completion": [
        "HTML file does not exist",
        "No CSS Grid usage detected",
        "oklch() not found in CSS",
        "Emoji detected in output",
        "Purple gradient detected",
        "Missing serif display font declaration",
    ],
    "post_critique": [
        "Any dimension scored below 6/10",
        "Overall score below 7/10",
    ],
}
```

---

## Quick Start: 5-minute setup guide

### 1. Copy Files (1분)

```bash
cp design_integration.md design_rules.md router_example.py DESIGN_ENGINE.md \
   /path/to/orchestrator/design/
```

### 2. Import Router (1분)

`orchestrator/router.py` 상단에 추가:

```python
from .design_router import is_design_task, route_design_task, load_ktk_rules
```

또는 `router_example.py`를 `design_router.py`로 복사 후 임포트.

### 3. Add Design Hook to Plan Template (1분)

Orchestrator의 plan 생성 템플릿에 추가:

```python
if is_design_task(user_request):
    plan_template += "\n\n[DESIGN MODE]\n"
    plan_template += "- Load KTK Design rules\n"
    plan_template += "- Generate 3 directions first\n"
    plan_template += "- Apply design_quality_gate at each checkpoint\n"
```

### 4. Inject Rules into Sub-Agent Prompts (1분)

Sub-agent 생성 시:

```python
if is_design_task(task):
    system_prompt = load_ktk_rules() + "\n\n" + system_prompt
```

### 5. Test with a Sample Task (1분)

```python
# Test routing
task = "iOS 프로토타입 만들어줘"
print(route_design_task(task))
# → {'primary_tool': 'stitch', 'secondary_tool': 'ktk-design', ...}
```

---

## Appendix: File Map

| File | Purpose |
|------|---------|
| `design_integration.md` | 이 문서 — 통합 가이드 |
| `design_rules.md` | 10개 핵심 룰셋 — 모든 디자인 작업의 system prompt 주입 |
| `router_example.py` | 라우터 코드 예시 — `router.py`에 병합 |
| `DESIGN_ENGINE.md` | `design_engine.py` 모듈 스펙 |
