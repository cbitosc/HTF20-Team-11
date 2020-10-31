from django.shortcuts import render, redirect
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.models import User
from django.template.loader import render_to_string
from django.db.models.query_utils import Q
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
import requests



# Create your views here.

def login(request):
    return render(request,'login.html')

def home(request, user_id = 1):
    return render(request,'home.html')

def authenticate(request):
	if request.method == 'POST':
		data = {}
		data['login_id'] = request.POST.get('login_id', default = None)
		data['password'] = request.POST.get('password', default = None)
		response = requests.post('http://127.0.0.1:3000/faculty_login', json=data)
		response = response.json()
		if response['status'] == 0:
			return redirect(login)
		else:
			return redirect("http://localhost:8000/faculty/home/"+response['id'])

def profile(request, user_id=1):
	response = requests.get('http://127.0.0.1:3000/faculty_profile/'+str(user_id))
	response = response.json()
	print(response)
	if response['status'] == 0:
		return redirect("http://localhost:8000/faculty/home/"+str(user_id))
	else:
		context = response['data']
		return render(request, 'profile.html', context)
		print(response)

		