import re

def calculate_ats_score(resume_instance):
    score = 0
    suggestions = []
    
    # 1. STRUCTURAL INTEGRITY (Max 25 Points)
    # UPDATED: We now check (Experiences + Projects). 
    # A student with 0 jobs but 2 big projects can still get full points.
    exp_count = resume_instance.experiences.count()
    proj_count = resume_instance.projects.count()
    total_activities = exp_count + proj_count
    
    has_edu = resume_instance.educations.exists()
    has_skills = resume_instance.skills.count() >= 5
    # Summary must be at least 30 words for freshers
    has_summary = len(resume_instance.personal_details.professional_summary.split()) >= 30

    if total_activities >= 2: 
        score += 10
    else: 
        suggestions.append("STRICT: Include at least 2 entries under 'Experience' or 'Projects' to show your hands-on skills.")
    
    if has_edu: score += 5
    else: suggestions.append("Education history is missing.")
    
    if has_skills: score += 5
    else: suggestions.append("Skill list is too thin. Aim for 5-10 core skills.")
    
    if has_summary: score += 5
    else: suggestions.append("Professional summary is too short. Explain your career goals.")

    # 2. EMAIL PROFESSIONALISM (Max 15 Points) - STRICTER
    pd = resume_instance.personal_details
    email_val = pd.email.lower()
    # Your requested patterns + common student mistakes
    unprofessional_patterns = [
        'cool', 'sexy', 'gamer', 'hot', 'party', 'student', 'work', 
        'training', 'intern', 'fresher', 'job', 'entry', 'btech', 'mca',
        'mba', 'be', 'bsc', 'msc', 'diploma' # Using course names in email is unprofessional
    ]
    
    found_bad_patterns = [p for p in unprofessional_patterns if p in email_val]
    
    if found_bad_patterns:
        score -= 15 # Heavy penalty
        suggestions.append(f"CRITICAL: Avoid using keywords like '{found_bad_patterns[0]}' in your email address. Use a clean 'name.surname@email.com' format.")
    else:
        score += 15

    # 3. ACTION VERB DENSITY (Max 30 Points)
    action_verbs = [
        'developed', 'managed', 'created', 'led', 'increased', 'designed', 
        'implemented', 'coordinated', 'analyzed', 'executed', 'built', 
        'spearheaded', 'optimized', 'automated', 'presented', 'collaborated'
    ]
    
    full_text = ""
    for exp in resume_instance.experiences.all():
        full_text += exp.description.lower()
    for proj in resume_instance.projects.all():
        full_text += proj.description.lower()
    
    found_verbs = set([verb for verb in action_verbs if verb in full_text])
    verb_points = min(len(found_verbs) * 3, 30) # Need 10 verbs for 30 points
    score += verb_points
    
    if len(found_verbs) < 5:
        suggestions.append(f"Action Verb Alert: Only {len(found_verbs)} strong verbs found. Use 'Developed', 'Built', or 'Collaborated' to describe your academic projects.")

    # 4. CONTENT QUALITY (Max 30 Points)
    word_count = len(full_text.split())
    if 150 <= word_count <= 400:
        score += 30
    else:
        score += 10
        suggestions.append("Your content is too light. Describe your projects and internships in more detail.")

    return max(min(score, 100), 0), suggestions