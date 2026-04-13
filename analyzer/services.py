import re

def analyze_cv_logic(cv_data, target_jd):
    score = 0
    tips = []
    
    # Extract text from CV data
    text_content = f"{cv_data.get('summary', '')} {' '.join(cv_data.get('skills', []))}"
    experiences = cv_data.get('experience', [])
    for exp in experiences:
        text_content += f" {exp.get('role')} {exp.get('description')}"
    
    text_content = text_content.lower()

    # 1. Structural Integrity (30 pts)
    if len(cv_data.get('summary', '')) > 150: score += 10
    else: tips.append("Expand your summary to highlight core achievements.")
    
    if len(cv_data.get('skills', [])) >= 6: score += 10
    else: tips.append("Add at least 6 technical skills to bypass bot filters.")
    
    if len(experiences) >= 2: score += 10
    else: tips.append("List at least two professional roles or projects.")

    # 2. Keyword Alignment (40 pts)
    jd_words = set(re.findall(r'\w{4,}', target_jd.lower()))
    matches = [w for w in jd_words if w in text_content]
    match_rate = len(matches) / len(jd_words) if jd_words else 0
    score += (match_rate * 40)
    
    if match_rate < 0.4:
        tips.append("Tailor your experience descriptions to include more terms from the job post.")

    # 3. Formatting & Bullet Logic (30 pts)
    # Professional ATS checks for bullet points ('•' or '-')
    has_bullets = any("-" in e.get('description', '') or "•" in e.get('description', '') for e in experiences)
    if has_bullets: score += 30
    else: tips.append("Use bullet points in your experience section for machine readability.")

    return min(int(score), 98), tips # 98 cap for professional realism