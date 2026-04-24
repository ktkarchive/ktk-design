# KTK Design Engine API Specification

> **Version**: 1.0  
> **Scope**: design_engine.py module specification  
> **Language**: Technical specs in English / User-facing in Korean

---

## Overview

`design_engine.py` is a hypothetical Python module that encapsulates KTK Design's workflow logic for integration into an orchestrator. It provides a clean API for:

1. **Direction Generation**: Creating 3 design directions from a prompt
2. **Output Evaluation**: Scoring generated HTML against 5 dimensions
3. **Asset Pipeline**: Integrating images into HTML outputs
4. **Quality Gates**: Automated pass/fail checks

---

## Module API

### `generate_directions(prompt: str, context: dict = None) -> list[dict]`

Generate 3 distinct design directions for a given prompt.

**Parameters:**
- `prompt` (str): User's natural language design request
- `context` (dict, optional): Additional context (brand assets, target audience, etc.)

**Returns:**
- `list[dict]`: 3 direction objects, each containing:
  - `id` (str): "A", "B", "C"
  - `school` (str): Design school name (e.g., "정보구조", "미니멀리즘", "동양미학")
  - `title` (str): Human-readable direction title
  - `description` (str): Detailed description
  - `color_palette` (list): Array of oklch() color values
  - `layout_approach` (str): CSS layout strategy
  - `key_detail` (str): The 120% detail element
  - `reference_file` (str): Relevant KTK reference document

**Example:**
```python
directions = generate_directions(
    "AI 심리학 프레젠테이션 PPT",
    context={"audience": "대학원생", "duration": "15분"}
)
# Returns:
# [
#   {
#     "id": "A",
#     "school": "정보구조",
#     "title": "학술적 명료성",
#     "description": "...",
#     "color_palette": ["oklch(25% 0.05 250)", "oklch(60% 0.15 30)"],
#     "layout_approach": "CSS Grid 12열, 좌측 고정 네비게이션",
#     "key_detail": "계층적 타이포그래피 시스템",
#     "reference_file": "slide-decks.md"
#   },
#   ...
# ]
```

---

### `evaluate_output(html_path: str, original_prompt: str) -> dict`

Evaluate a generated HTML file against KTK Design's 5 dimensions.

**Parameters:**
- `html_path` (str): Path to the generated HTML file
- `original_prompt` (str): Original user prompt for context

**Returns:**
- `dict` with:
  - `scores` (dict): 5 dimension scores (0-100)
    - `philosophy_alignment`: 철학일치성
    - `visual_hierarchy`: 시각위계
    - `detail_execution`: 디테일실행력
    - `functionality`: 기능성
    - `innovation`: 혁신성
  - `total_score` (float): Weighted average
  - `feedback` (list): Specific improvement suggestions
  - `passed` (bool): Whether total_score >= threshold (default: 70)

**Evaluation Criteria:**

| Dimension | Weight | Checkpoints |
|-----------|--------|-------------|
| **철학일치성** | 25% | KTK Design rules followed, no AI slop patterns |
| **시각위계** | 25% | Clear information hierarchy, proper contrast |
| **디테일실행력** | 20% | Typography precision, spacing consistency |
| **기능성** | 20% | Interactive elements work, responsive behavior |
| **혁신성** | 10% | Unique approach, creative problem-solving |

**Example:**
```python
eval_result = evaluate_output(
    "output/slide_deck_001.html",
    original_prompt="AI 심리학 PPT"
)
# Returns:
# {
#   "scores": {
#     "philosophy_alignment": 85,
#     "visual_hierarchy": 78,
#     "detail_execution": 82,
#     "functionality": 90,
#     "innovation": 65
#   },
#   "total_score": 80.5,
#   "feedback": [
#     "타이포그래피 계층이 명확함 (시각위계 +)",
#     "애니메이션 easing이 linear로 설정됨 — Expo easing 권장 (디테일 -)"
#   ],
#   "passed": True
# }
```

---

### `asset_pipeline(images: list[str], html_path: str, placement: str = "auto") -> str`

Integrate generated images into an HTML output.

**Parameters:**
- `images` (list[str]): Paths to image files
- `html_path` (str): Path to the HTML file to modify
- `placement` (str): "auto", "hero", "grid", "inline"

**Returns:**
- `str`: Path to the modified HTML file

**Example:**
```python
result_html = asset_pipeline(
    images=["assets/hero.png", "assets/chart.svg"],
    html_path="output/slides.html",
    placement="auto"
)
```

---

### `design_quality_gate(html_path: str, threshold: float = 70.0) -> dict`

Combined quality check for checkpoint integration.

**Parameters:**
- `html_path` (str): Path to the HTML file
- `threshold` (float): Minimum passing score (default: 70.0)

**Returns:**
- `dict` with `passed` (bool), `score` (float), `actions` (list)

**Integration with Orchestrator Checkpoints:**
```python
# In orchestrator/checkpoint.py
from design_engine import design_quality_gate

def checkpoint_after_design(html_output: str):
    result = design_quality_gate(html_output, threshold=70.0)
    
    if not result["passed"]:
        # Trigger redesign loop
        return {
            "status": "needs_revision",
            "score": result["score"],
            "actions": result["actions"]
        }
    
    return {"status": "passed", "score": result["score"]}
```

---

## Implementation Notes

### Playwright Integration

For automated visual evaluation:

```python
from playwright.sync_api import sync_playwright

def capture_screenshot(html_path: str) -> bytes:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto(f"file://{html_path}")
        screenshot = page.screenshot(full_page=True)
        browser.close()
        return screenshot
```

### File Watching

For the asset pipeline and communication:

```python
import time
from pathlib import Path

def watch_folder(folder: Path, callback, poll_interval: float = 1.0):
    """Poll-based folder watcher for cross-platform compatibility."""
    seen = set()
    
    while True:
        current = {f.name for f in folder.glob("*")}
        new = current - seen
        
        for filename in new:
            callback(folder / filename)
        
        seen = current
        time.sleep(poll_interval)
```

---

## Error Handling

| Error | Cause | Resolution |
|-------|-------|------------|
| `RulesNotFoundError` | design_rules.md missing | Fallback to hardcoded rules |
| `InvalidHTMLError` | Malformed HTML output | Return evaluation with score=0 |
| `AssetNotFoundError` | Referenced image missing | Skip asset, log warning |
| `TimeoutError` | Playwright screenshot timeout | Retry once, then skip visual check |
