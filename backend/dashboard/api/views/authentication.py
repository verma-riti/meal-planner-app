from django import forms
from rest_framework.views import APIView
from django.contrib.auth import login, logout, authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from api.serializers import SignUpSerializer
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.http import JsonResponse
from api.models import Admin


class SignUpView(APIView):
    def post(self, request, format='json'):
    	
    	serializer = SignUpSerializer(data=request.data)
    	if serializer.is_valid():
    		user = serializer.save()
    		if user:
    			token= Token.objects.create(user=user)
    			json = serializer.data
    			json['token'] = token.key
    			return Response(json, status=status.HTTP_201_CREATED)
    	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
	def post(self, request, format='json'):
		print('request.data', request.data)
		username = request.data.get('username', '')
		password = request.data.get('password', '')
		user = authenticate(username=username, password=password)
		print('user =', user)
		token, created = Token.objects.get_or_create(user_id=user.id)
		is_admin = Admin.objects.filter(user=user)
		print('token =', token)
		data = {
				'username':user.username,
				'email': user.email,
				'token':token.key,
				'is_admin': is_admin
		}
		return Response(data, status=200)

class LogoutView(APIView):
	authentication_classes =(TokenAuthentication, )
	def post(self, request):
		print(request)
		logout(request)
		return Response(status=204)