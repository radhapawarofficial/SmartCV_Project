from django.urls import path
from . import views

urlpatterns = [
    # --- Pages ---
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('dashboard/', views.dashboard, name='dashboard'),
    
    # --- Auth ---
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    
    # --- CV Actions ---
    path('create_cv/', views.create_cv, name='create_cv'),
    path('cv/<int:cv_id>/edit/', views.edit_cv, name='edit_cv'),
    path('cv/<int:cv_id>/delete/', views.delete_cv, name='delete_cv'),
    path('cv/<int:cv_id>/download/', views.download_cv, name='download_cv'),
]