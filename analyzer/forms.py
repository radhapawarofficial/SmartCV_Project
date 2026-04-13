from django import forms
from django.contrib.auth.models import User
import re

class SignUpForm(forms.Form):
    full_name = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'John Doe'}))
    username = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'johndoe123'}))
    age = forms.IntegerField(min_value=16, max_value=120, widget=forms.NumberInput(attrs={'class': 'form-control', 'placeholder': '22'}))
    gender = forms.ChoiceField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other'), ('Prefer Not To Say', 'Prefer Not To Say')], widget=forms.Select(attrs={'class': 'form-select'}))
    phone_no = forms.CharField(max_length=15, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': '+91 9876543210'}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'john@example.com'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Create a strong password'}))
    confirm_password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Confirm your password'}))
    terms = forms.BooleanField(label="I agree to the Terms & Conditions", required=True, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError("This username is already taken. Please choose another.")
        return username

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("An account with this email already exists.")
        return email

    def clean_password(self):
        password = self.cleaned_data.get('password')
        if len(password) < 8 or not re.search(r"\d", password) or not re.search(r"[A-Z]", password) or not re.search(r"[!@#$%^&*]", password):
            raise forms.ValidationError("Password must be at least 8 chars, contain a number, an uppercase letter, and a special character.")
        return password

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")
        
        if password and confirm_password and password != confirm_password:
            self.add_error('confirm_password', "Passwords do not match.")