"""
KTK Design Router Integration Example
======================================

This module shows how to integrate KTK Design routing into
an orchestrator's router.py.

Add these functions to your existing router.py or import them.
"""

import os
import re
from pathlib import Path


def is_design_task(task: str) -> bool:
    """
    Determine if a user task is design-related.
    
    Args:
        task: The user's natural language request
        
    Returns:
        True if the task involves design work
    """
    design_keywords = [
        # Korean
        "ppt", "슬라이드", "프레젠테이션", "프로토타입", "디자인",
        "애니메이션", "영상", "인포그래픽", "배너", "썸네일",
        "로고", "포스터", "카드", "ui", "ux", "화면", "평가",
        # English
        "slide", "presentation", "prototype", "design",
        "animation", "video", "infographic", "banner", "thumbnail",
        "logo", "poster", "card", "screen", "critique", "review",
    ]
    
    task_lower = task.lower()
    return any(keyword in task_lower for keyword in design_keywords)


def classify_design_task(task: str) -> str:
    """
    Classify a design task into one of 6 types.
    
    Args:
        task: The user's natural language request
        
    Returns:
        One of: slides, prototype, image, animation, infographic, critique
    """
    task_lower = task.lower()
    
    # Slides / PPT
    if any(k in task_lower for k in ["ppt", "슬라이드", "프레젠테이션", "presentation", "slide", "deck"]):
        return "slides"
    
    # Prototype
    if any(k in task_lower for k in ["프로토타입", "prototype", "ios", "android", "app", "화면", "screen", "클릭"]):
        return "prototype"
    
    # Animation / Video
    if any(k in task_lower for k in ["애니메이션", "영상", "animation", "video", "mp4", "gif", "motion"]):
        return "animation"
    
    # Infographic
    if any(k in task_lower for k in ["인포그래픽", "infographic", "데이터", "data viz", "chart", "그래프"]):
        return "infographic"
    
    # Image / Banner / Thumbnail
    if any(k in task_lower for k in ["배너", "썸네일", "이미지", "banner", "thumbnail", "image", "photo", "picture"]):
        return "image"
    
    # Design critique / review
    if any(k in task_lower for k in ["평가", "첨삭", "리뷰", "critique", "review", "evaluate", "피드백", "feedback"]):
        return "critique"
    
    # Default fallback
    return "slides"


def route_design_task(task: str) -> dict:
    """
    Route a design task to the appropriate tools.
    
    Args:
        task: The user's natural language request
        
    Returns:
        Routing decision with primary/secondary tools and references
    """
    task_type = classify_design_task(task)
    
    routing_map = {
        "slides": {
            "primary": "ktk-design",
            "secondary": None,
            "reference": "slide-decks.md",
            "description": "HTML 슬라이드 엔진 (KTK Design)"
        },
        "prototype": {
            "primary": "stitch",
            "secondary": "ktk-design",
            "reference": "ios_frame.jsx",
            "description": "Stitch UI 설계 → KTK Design HTML 프로토타입"
        },
        "image": {
            "primary": "codex",
            "secondary": "ktk-design",
            "reference": "content-guidelines.md",
            "description": "Codex 이미지 생성 → KTK Design 에셋 삽입"
        },
        "animation": {
            "primary": "ktk-design",
            "secondary": "codex",
            "reference": "animation-best-practices.md",
            "description": "KTK Design 애니메이션 (Codex 보조 이미지)"
        },
        "infographic": {
            "primary": "ktk-design",
            "secondary": None,
            "reference": "content-guidelines.md",
            "description": "KTK Design 인포그래픽"
        },
        "critique": {
            "primary": "ktk-design",
            "secondary": None,
            "reference": "critique-guide.md",
            "description": "KTK Design 5차원 전문가 평가"
        }
    }
    
    route = routing_map.get(task_type, routing_map["slides"])
    route["task_type"] = task_type
    route["prompt"] = task
    
    return route


def load_ktk_rules() -> str:
    """
    Load KTK Design core rules from design_rules.md.
    
    Returns:
        The rules text to inject into system prompts
    """
    # Try to find design_rules.md relative to this file
    current_dir = Path(__file__).parent
    rules_path = current_dir / "design_rules.md"
    
    if rules_path.exists():
        return rules_path.read_text(encoding="utf-8")
    
    # Fallback: return hardcoded core rules
    return """
[KTK DESIGN CORE RULES - AUTO-INJECTED]
1. Present 3 design directions before implementation
2. Use serif display + system body fonts
3. Use oklch() colors, NO purple gradients
4. Use CSS Grid, text-wrap: pretty
5. One detail at 120%, rest at 80%
6. Real photos preferred, NO 3D renders
7. Expo easing for animations, intent-based motion
8. 5-step narrative structure
9. "Created by KTK Design" watermark (animations only, optional)
10. 5-dimension critique after completion
[/KTK DESIGN CORE RULES]
"""


# Example usage
if __name__ == "__main__":
    # Test cases
    test_tasks = [
        "AI 심리학 PPT 만들어줘",
        "iOS 포모도로 타이머 프로토타입",
        "제품 소개용 히어로 이미지",
        "60초 애니메이션 만들어줘",
        "연간 매출 데이터 인포그래픽",
        "이 디자인 평가해줘",
    ]
    
    for task in test_tasks:
        if is_design_task(task):
            route = route_design_task(task)
            print(f"\nTask: {task}")
            print(f"  Type: {route['task_type']}")
            print(f"  Primary: {route['primary']}")
            print(f"  Secondary: {route['secondary']}")
            print(f"  Reference: {route['reference']}")
