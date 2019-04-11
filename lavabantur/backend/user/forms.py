from django import forms
from django.contrib.auth import password_validation
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=254, help_text='Inform a valid email address.')

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')


class LoginForm(forms.Form):
    username = forms.CharField(required=True)
    password = forms.CharField(required=True, widget=forms.TextInput(attrs={"type": "password"}))


class ForgotPasswordForm(forms.Form):
    email = forms.CharField(required=True, max_length=254)


class ChangePasswordForm(forms.Form):

    current_password = forms.CharField(
        max_length=30,
        label=("Temporary Password"),
        strip=False,
        widget=forms.PasswordInput,
    )

    password1 = forms.CharField(
        max_length=30,
        label=("New Password"),
        strip=False,
        widget=forms.PasswordInput,
        help_text=password_validation.password_validators_help_text_html(),
    )
    password2 = forms.CharField(
        max_length=30,
        label=("New Password confirmation"),
        widget=forms.PasswordInput,
        strip=False,
        help_text=("Enter the same password as before, for verification."),
    )
