from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    # There must be 4 SPACES (one Tab) before the lines below
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=20)
    phone_no = models.CharField(max_length=15)

    def __str__(self):
        # There must be 4 SPACES before 'def' and 8 SPACES before 'return'
        return self.user.username

@receiver(post_save, sender=User)
def create_or_save_user_profile(sender, instance, created, **kwargs):
    # Provide fallback values to satisfy database NOT NULL constraints
    profile_defaults = {
        'full_name': instance.username,
        'age': 0,
        'gender': 'Not Specified',
        'phone_no': ''
    }
    
    if created:
        UserProfile.objects.get_or_create(user=instance, defaults=profile_defaults)
    else:
        if hasattr(instance, 'userprofile'):
            instance.userprofile.save()
        else:
            UserProfile.objects.get_or_create(user=instance, defaults=profile_defaults)

# 1. THE BRAIN: RESUME CORE
class Resume(models.Model):
    # Font family Choices
    FONT_FAMILY_CHOICES = [
        ('Arial', 'Arial'),
        ('Times New Roman', 'Times New Roman'),
        ('Verdana', 'Verdana'),
        ('Calibri', 'Calibri'),
        ('Century', 'Century'),
        ('Comic Sans MS', 'Comic Sans MS'),
    ]
    # 3 Different Font Size Choices
    FONT_SIZE_NAME_CHOICES = [
        ('18', '18px'),
        ('20', '20px'),
        ('22', '22px'),
        ('24', '24px'),
        ('26', '26px'),
        ('28', '28px'),
    ]
    FONT_SIZE_HEADING_CHOICES = [
        ('14', '14px'),
        ('16', '16px'),
        ('18', '18px'),
        ('20', '20px'),
        ('22', '22px'),
        ('24', '24px'),
    ]
    FONT_SIZE_DETAILS_CHOICES = [
        ('12', '12px'),
        ('13', '13px'),
        ('14', '14px'),
        ('15', '15px'),
        ('16', '16px'),
        ('17', '17px'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resumes')
    title = models.CharField(max_length=255)
    # FIX: Added job_title_target, template_chosen (replaces template_id), ats_score fields to Resume model
    job_title_target = models.CharField(max_length=255, blank=True, null=True)
    template_chosen = models.CharField(max_length=50, default='template1')
    ats_score = models.IntegerField(default=0)

    # User Preferences
    font_family = models.CharField(max_length=100, choices=FONT_FAMILY_CHOICES, default='Arial')
    font_size_name = models.CharField(max_length=10, choices=FONT_SIZE_NAME_CHOICES, default='20')
    font_size_heading = models.CharField(max_length=10, choices=FONT_SIZE_HEADING_CHOICES, default='18')
    font_size_details = models.CharField(max_length=10, choices=FONT_SIZE_DETAILS_CHOICES, default='16')
    color_scheme = models.CharField(max_length=7, default='#2563eb')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)   # refreshes on every .save()

    def __str__(self):
        return self.title

# 2. PERSONAL DETAILS
class PersonalDetails(models.Model):
    resume = models.OneToOneField(Resume, on_delete=models.CASCADE, related_name='personal_details')
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    professional_summary = models.TextField()

# 3. EDUCATION (Multiple)
class Education(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='educations', null=True, blank=True)
    institution = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    edu_duration = models.CharField(max_length=10)
    cgpa_percentage = models.CharField(max_length=50)

# 4. EXPERIENCE (Multiple)
class Experience(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='experiences', null=True, blank=True)
    company = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    exp_duration = models.CharField(max_length=50)
    description = models.TextField()

# 5. SKILLS (Multiple)
class Skill(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='skills', null=True, blank=True)
    skill_name = models.CharField(max_length=100)
    proficiency = models.CharField(max_length=50) # Beginner, Intermediate, Expert

# 6. PROJECTS (Multiple)
class Project(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='projects')
    project_title = models.CharField(max_length=255)
    technologies_used = models.CharField(max_length=255)
    description = models.TextField()
    link = models.URLField(blank=True, null=True)

# 7. LANGUAGES (Multiple)
class Language(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='languages')
    language_name = models.CharField(max_length=100)

# 8. CUSTOM SECTIONS (Multiple - Added for you)
class CustomSection(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='custom_sections')
    section_title = models.CharField(max_length=255)
    section_content = models.TextField()