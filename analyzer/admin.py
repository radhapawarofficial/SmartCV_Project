from django.contrib import admin
from .models import Testimonial
from .models import (
    Resume, 
    PersonalDetails, 
    Education, 
    Experience, 
    Skill, 
    Project, 
    Language,
    CustomSection,
)
admin.site.register(Testimonial)
# --- 1. DEFINE INLINES FIRST ---
class PersonalDetailsInline(admin.StackedInline):
    model = PersonalDetails
    can_delete = False

class EducationInline(admin.TabularInline):
    model = Education
    extra = 1

class ExperienceInline(admin.TabularInline):
    model = Experience
    extra = 1

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1

class ProjectInline(admin.TabularInline):
    model = Project
    extra = 1


# --- 2. NOW REGISTER THE MAIN ADMIN ---
@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'ats_score', 'created_at')
    # Now Python knows what these are because they are defined above!
    inlines = [
        PersonalDetailsInline, 
        EducationInline, 
        ExperienceInline, 
        SkillInline, 
        ProjectInline,
    ]

# --- 3. REGISTER REMAINING MODELS ---
admin.site.register(PersonalDetails)
admin.site.register(Education)
admin.site.register(Experience)
admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(Language)
admin.site.register(CustomSection)