import datetime
from io import BytesIO
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.utils.dateparse import parse_date
from .models import Testimonial

# Third-party libraries
import spacy
from spacy.matcher import PhraseMatcher
from xhtml2pdf import pisa


# Local app imports
from .models import Resume, PersonalDetails, Experience, Education, Skill, Project, Language, CustomSection, UserProfile
from .forms import SignUpForm


# --- 01. NLP SETUP ---
try:
    nlp = spacy.load("en_core_web_sm")
except:
    nlp = None


def all_testimonials(request):
    if request.method == "POST":
        name = request.POST.get('name')
        profession = request.POST.get('profession')
        review = request.POST.get('review')
        pass
        if name and review:
            Testimonial.objects.create(name=name, profession=profession, review=review)
            messages.success(request, "Thank you for sharing your experience!")
            return redirect('testimonial')
            
    testimonials = Testimonial.objects.all().order_by('-id')
    return render(request, 'testimonial.html', {'testimonials': testimonials})


def analyze_resume_text(text):
    """Uses NLP to extract skills and calculate a smart ATS score."""
    if not nlp or not text:
        return {"score": 50, "skills": []}


    doc = nlp(text)
    skill_bank = ['Python', 'Django', 'Bootstrap', 'JavaScript', 'SQL', 'HTML', 'CSS', 'Project Management', 'Java', 'React']
    matcher = PhraseMatcher(nlp.vocab)
    patterns = [nlp.make_doc(s) for s in skill_bank]
    matcher.add("SKILLS", patterns)
   
    matches = matcher(doc)
    found_skills = list(set([doc[start:end].text for match_id, start, end in matches]))
   
    score = 20  
    score += (len(found_skills) * 10)  
    if len(text) > 200: score += 20    
   
    return {
        "score": min(score, 100),
        "skills": found_skills
    }


# --- 02. PUBLIC PAGES ---


def home(request):
    # Fetch the latest 3 testimonials to display on the landing page
    testimonial = Testimonial.objects.all().order_by('-created_at')[:3] 
    return render(request, 'home.html', {'testimonial': testimonial}) 
    return render(request, 'home.html')


def about(request):
    return render(request, 'about.html')


# --- 03. AUTHENTICATION ---
from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib import messages
from .models import UserProfile  
from .forms import SignUpForm


def signup_view(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            # 1. Extract cleaned data from the form
            data = form.cleaned_data
           
            # 2. Create the Auth User (for Login/Security)
            user = User.objects.create_user(
                username=data['username'],
                email=data['email'],
                password=data['password']
            )

            # 3. Update the Profile (created automatically via signals) with extra details
            profile = user.userprofile  
            profile.full_name = data['full_name']
            profile.age = data['age']
            profile.gender = data['gender']
            profile.phone_no = data['phone_no']
            profile.save()

            # 4. Log the user in immediately
            login(request, user)
           
            messages.success(request, "Registration successful! Welcome to SmartCV.")
            return redirect('dashboard')
        else:
            messages.error(request, "Please correct the errors below.")
    else:
        form = SignUpForm()
       
    return render(request, 'signup.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, "Invalid username or password.")
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})


def logout_view(request):
    logout(request)
    return redirect('home')


# --- 04. USER DASHBOARD ---


@login_required(login_url='/login/')
def dashboard(request):
    # 1. Safely fetch UserProfile (Prevents 'DoesNotExist' error)
    # This creates a blank profile if it's missing for the user
    profile, created = UserProfile.objects.get_or_create(user=request.user)


    # 2. Fetch CVs linked to this user
    user_cvs = Resume.objects.filter(user=request.user).order_by('-created_at')
    user_cvs = Resume.objects.filter(user=request.user).order_by('-updated_at')
    total_cvs = user_cvs.count()


    # 3. Calculate Average ATS Score
    # Using a list comprehension to avoid multiple database hits
    scores = [cv.ats_score for cv in user_cvs if cv.ats_score is not None]
    avg_score = sum(scores) / len(scores) if scores else 0


    # 4. Consolidate Context
    context = {
        'profile': profile,
        'user': request.user,
        'username': request.user.username,
        'cvs': user_cvs,
        'total_cvs': total_cvs,
        'avg_score': round(avg_score),
    }


    return render(request, 'dashboard.html', context)


# --- 05. CV CORE LOGIC (CREATE, VIEW, EDIT, DELETE) ---


@login_required(login_url='/login/')
def create_cv(request):
    if request.method == "POST":
        summary_text = request.POST.get('summary', '')
        analysis = analyze_resume_text(summary_text)
        job_title = request.POST.get('job_title_target', 'Professional').strip()


        live_score = request.POST.get('live_ats_score', '0')
        try:
            saved_ats_score = max(0, min(100, int(live_score)))
        except (ValueError, TypeError):
            saved_ats_score = 0


        # 1. Create Resume — all field names now match the updated model
        resume = Resume.objects.create(
            user=request.user,
            title=f"{job_title} Resume",
            job_title_target=job_title,
            template_chosen=request.POST.get('template_chosen', 'template1'),
            ats_score=saved_ats_score,
            font_family=request.POST.get('font_family', 'Arial'),
            font_size_name=request.POST.get('font_size_name', '20'),
            font_size_heading=request.POST.get('font_size_heading', '18'),
            font_size_details=request.POST.get('font_size_details', '16'),
            color_scheme=request.POST.get('color_scheme', '#2563eb'),
        )


        # 2. PersonalDetails — FIX: use 'linkedin' and 'github' (model field names)
        PersonalDetails.objects.create(
            resume=resume,
            full_name=request.POST.get('full_name', ''),
            email=request.POST.get('email', ''),
            phone=request.POST.get('phone', ''),
            address=request.POST.get('address', ''),
            profile_picture=request.FILES.get('profile_photo'),
            linkedin=request.POST.get('linkedin', ''),
            github=request.POST.get('github', ''),
            professional_summary=summary_text,
        )


        # 3. Education
        edu_degrees = request.POST.getlist('edu_degree[]')
        edu_unis    = request.POST.getlist('edu_university[]')
        edu_duration   = request.POST.getlist('edu_duration[]')   # combined "2021–2025"
        edu_cgpas   = request.POST.getlist('edu_cgpa[]')
        for i, degree in enumerate(edu_degrees):
            if degree.strip():
                Education.objects.create(
                    resume=resume,
                    degree=degree.strip(),
                    institution=edu_unis[i] if i < len(edu_unis) else '',
                    edu_duration=edu_duration[i] if i < len(edu_duration) else '',                    
                    cgpa_percentage=edu_cgpas[i] if i < len(edu_cgpas) else '',
                )


        # 4. Experience
        exp_titles    = request.POST.getlist('exp_title[]')
        exp_companies = request.POST.getlist('exp_company[]')
        exp_duration_list= request.POST.getlist('exp_duration[]')
        exp_descs     = request.POST.getlist('exp_desc[]')
        for i, title in enumerate(exp_titles):
            if title.strip():
                Experience.objects.create(
                    resume=resume,
                    role=title.strip(),
                    company=exp_companies[i] if i < len(exp_companies) else '',
                    exp_duration=exp_duration_list[i] if i < len(exp_duration_list) else '',
                    description=exp_descs[i] if i < len(exp_descs) else '',
                )


        # 5. Projects
        proj_titles = request.POST.getlist('proj_title[]')
        proj_techs  = request.POST.getlist('proj_tech[]')
        proj_links  = request.POST.getlist('proj_link[]')
        proj_descs  = request.POST.getlist('proj_desc[]')
        for i, title in enumerate(proj_titles):
            if title.strip():
                Project.objects.create(
                    resume=resume,
                    project_title=title.strip(),
                    technologies_used=proj_techs[i] if i < len(proj_techs) else '',
                    description=proj_descs[i] if i < len(proj_descs) else '',
                    link=proj_links[i] if i < len(proj_links) else '',
                )


        # 6. Skills — comma-separated textarea
        skills_raw = request.POST.get('skills', '')
        for skill in skills_raw.split(','):
            skill = skill.strip()
            if skill:
                Skill.objects.create(resume=resume, skill_name=skill, proficiency='')


        # 7. Languages — comma-separated input
        langs_raw = request.POST.get('languages', '')
        for lang in langs_raw.split(','):
            lang = lang.strip()
            if lang:
                Language.objects.create(resume=resume, language_name=lang)


        # 8. Custom Sections — FIX: read custom_section_titles[] and custom_section_descriptions[]
        # resume.custom_sections.all().delete()
        custom_titles   = request.POST.getlist('customsections_title[]')  
        custom_contents = request.POST.getlist('customsections_content[]')  
        for i, title in enumerate(custom_titles):
            if title.strip():
                CustomSection.objects.create(
                    resume=resume,
                    section_title=title.strip(),
                    section_content=custom_contents[i] if i < len(custom_contents) else '',
                )

        messages.success(request, "Resume Created Successfully!")
        return redirect('dashboard')


    return render(request, 'create_cv.html')

@login_required(login_url='/login/')
def view_cv(request, cv_id):
    resume = get_object_or_404(Resume, id=cv_id, user=request.user)
    pd     = getattr(resume, 'personal_details', None)
    context = {
        'cv':           resume,
        'personal':     pd,
        'educations':   resume.educations.all(),
        'experiences':  resume.experiences.all(),
        'skills':       resume.skills.all(),
        'projects':     resume.projects.all(),
        'languages':    resume.languages.all(),
        'custom_sections': resume.custom_sections.all(), # Ensure this related_name matches models.py
    }
    # Error 2 Fix: return a lightweight partial for the dashboard AJAX modal
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return render(request, 'view_cv_partial.html', context)
    return render(request, 'view_cv.html', context)


# ── In views.py: Replace the entire edit_cv function with this ──
# Also add `import json` at the top of views.py if not already present.


@login_required(login_url='/login/')
def edit_cv(request, cv_id):
    resume = get_object_or_404(Resume, id=cv_id, user=request.user)


    # ── POST: update the existing CV
    if request.method == 'POST':
        summary_text = request.POST.get('summary', '')
        analysis     = analyze_resume_text(summary_text)
        job_title    = request.POST.get('job_title_target', 'Professional').strip()


        live_score = request.POST.get('live_ats_score', '0')
        try:
            saved_ats_score = max(0, min(100, int(live_score)))
        except (ValueError, TypeError):
            saved_ats_score = 0


        resume.title           = f"{job_title} Resume"
        resume.job_title_target = job_title
        resume.template_chosen = request.POST.get('template_chosen', 'template1')
        resume.ats_score        = saved_ats_score
        resume.font_family     = request.POST.get('font_family', 'Arial')
        resume.font_size_name       = request.POST.get('font_size_name', '20').replace('px', '')
        resume.font_size_heading       = request.POST.get('font_size_heading', '18').replace('px', '')
        resume.font_size_details       = request.POST.get('font_size_details', '16').replace('px', '')
        resume.color_scheme    = request.POST.get('color_scheme', '#2563eb')
        resume.save()


        # Update PersonalDetails in-place
        pd = getattr(resume, 'personal_details', None)
        if pd:
            pd.full_name             = request.POST.get('full_name', '')
            pd.email                 = request.POST.get('email', '')
            pd.phone                 = request.POST.get('phone', '')
            pd.address               = request.POST.get('address', '')
            pd.linkedin              = request.POST.get('linkedin', '')
            pd.github                = request.POST.get('github', '')
            pd.professional_summary  = summary_text
            if request.FILES.get('profile_photo'):              
                pd.profile_picture = request.FILES.get('profile_photo')  
            pd.save()


        # Delete-and-recreate child records (simplest safe update strategy)
        resume.educations.all().delete()
        for i, degree in enumerate(request.POST.getlist('edu_degree[]')):
            if degree.strip():
                unis  = request.POST.getlist('edu_university[]')
                edu_duration = request.POST.getlist('edu_duration[]')
                cgpas = request.POST.getlist('edu_cgpa[]')
                Education.objects.create(
                    resume=resume,
                    degree=degree.strip(),
                    institution=unis[i]  if i < len(unis)  else '',
                    edu_duration=edu_duration[i]  if i < len(edu_duration) else '',
                    cgpa_percentage=cgpas[i] if i < len(cgpas) else '',
                )


        resume.experiences.all().delete()
        for i, title in enumerate(request.POST.getlist('exp_title[]')):
            if title.strip():
                companies = request.POST.getlist('exp_company[]')
                exp_duration       = request.POST.getlist('exp_duration[]')
                descs     = request.POST.getlist('exp_desc[]')
                Experience.objects.create(
                    resume=resume,
                    role=title.strip(),
                    company=companies[i] if i < len(companies) else '',
                    exp_duration=exp_duration[i]   if i < len(exp_duration)       else '',
                    description=descs[i] if i < len(descs)    else '',
                )


        resume.projects.all().delete()
        for i, title in enumerate(request.POST.getlist('proj_title[]')):
            if title.strip():
                techs = request.POST.getlist('proj_tech[]')
                links = request.POST.getlist('proj_link[]')
                descs = request.POST.getlist('proj_desc[]')
                Project.objects.create(
                    resume=resume,
                    project_title=title.strip(),
                    technologies_used=techs[i] if i < len(techs) else '',
                    description=descs[i]       if i < len(descs) else '',
                    link=links[i]              if i < len(links) else '',
                )

        resume.skills.all().delete()
        for skill in request.POST.get('skills', '').split(','):
            if skill.strip():
                Skill.objects.create(resume=resume, skill_name=skill.strip(), proficiency='')

        resume.languages.all().delete()
        for lang in request.POST.get('languages', '').split(','):
            if lang.strip():
                Language.objects.create(resume=resume, language_name=lang.strip())

        resume.custom_sections.all().delete()
        custom_titles   = request.POST.getlist('customsections_title[]')  
        custom_contents = request.POST.getlist('customsections_content[]')  
        for i, title in enumerate(custom_titles):
            if title.strip():
                CustomSection.objects.create(
                    resume=resume,
                    section_title=title.strip(),
                    section_content=custom_contents[i] if i < len(custom_contents) else '',
                )
        messages.success(request, "Resume Updated Successfully!")
        return redirect('dashboard')


    # ── GET: send all existing data as a JSON blob for the pre-fill script ──
    import json
    pd = getattr(resume, 'personal_details', None)


    font_size_name_stored = resume.font_size_name  # stored without 'px' e.g. '14'
    font_size_name_px     = font_size_name_stored if font_size_name_stored.endswith('px') \
                       else font_size_name_stored + 'px'
   
    font_size_heading_stored = resume.font_size_heading  # stored without 'px' e.g. '14'
    font_size_heading_px     = font_size_heading_stored if font_size_heading_stored.endswith('px') \
                       else font_size_heading_stored + 'px'


    font_size_details_stored = resume.font_size_details  # stored without 'px' e.g. '14'
    font_size_details_px     = font_size_details_stored if font_size_details_stored.endswith('px') \
                       else font_size_details_stored + 'px'


    prefill_data = {
        'template_chosen': resume.template_chosen,
        'font_family':     resume.font_family,
        'font_size_name':       font_size_name_px,
        'font_size_heading':       font_size_heading_px,
        'font_size_details':       font_size_details_px,
        'color_scheme':    resume.color_scheme,
        'full_name':       pd.full_name            if pd else '',
        'job_title_target': resume.job_title_target or '',
        'email':           pd.email                if pd else '',
        'phone':           pd.phone                if pd else '',
        'address':         pd.address          or '' if pd else '',
        'linkedin':        pd.linkedin         or '' if pd else '',
        'github':          pd.github           or '' if pd else '',
        'summary':         pd.professional_summary if pd else '',
        'skills':    ', '.join(s.skill_name    for s in resume.skills.all()),
        'languages': ', '.join(l.language_name for l in resume.languages.all()),
        'educations': [
            {'degree': e.degree, 'institution': e.institution,
             'edu_duration': e.edu_duration, 'cgpa_percentage': e.cgpa_percentage}
            for e in resume.educations.all()
        ],
        'experiences': [
            {'role': e.role, 'company': e.company,
             'exp_duration': e.exp_duration, 'description': e.description}
            for e in resume.experiences.all()
        ],
        'projects': [
            {'project_title': p.project_title, 'technologies_used': p.technologies_used,
             'link': p.link or '', 'description': p.description}
            for p in resume.projects.all()
        ],
        'custom_sections': [
            {'section_title': c.section_title, 'section_content': c.section_content}
            for c in resume.custom_sections.all()
        ],
    }

    return render(request, 'create_cv.html', {
        'cv':          resume,
        'edit_mode':   True,
        'prefill_data': prefill_data,
    })

@login_required(login_url='/login/')
def delete_cv(request, cv_id):
    resume = get_object_or_404(Resume, id=cv_id, user=request.user)
    if request.method == 'POST':
        resume.delete()
        messages.success(request, "Resume deleted successfully.")
    return redirect('dashboard')

# --- 06. PDF DOWNLOAD ---

@login_required(login_url='/login/')
def download_cv(request, cv_id):
    resume = get_object_or_404(Resume, id=cv_id, user=request.user)
 
    context = {
        'cv':             resume,
        'personal':       getattr(resume, 'personal_details', None),  # ← key is 'personal'
        'educations':     resume.educations.all(),
        'experiences':    resume.experiences.all(),
        'skills':         resume.skills.all(),
        'projects':       resume.projects.all(),
        'languages':      resume.languages.all(),
        'custom_sections':resume.custom_sections.all(),  # ← NEW
    }


    html_string = render_to_string('pdf_template.html', context)
    result = BytesIO()
    pisa_status = pisa.CreatePDF(BytesIO(html_string.encode('UTF-8')), dest=result)
    if pisa_status.err:
        return HttpResponse(
            f'<strong>PDF Error:</strong><pre>{html_string}</pre>',
            status=400
        )
    response = HttpResponse(result.getvalue(), content_type='application/pdf')
    clean_name = resume.title.replace(' ', '_')
    response['Content-Disposition'] = f'attachment; filename="{clean_name}.pdf"'
    return response

