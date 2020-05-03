import json
from datetime import datetime
from api.models import Meals
from api.serializers import MealsSerializer
from rest_framework import status
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist

@api_view(["GET"])
#@permission_classes([IsAuthenticated])
def get_meals(request):
	meal_id = request.query_params.get('meal_id', None)
	user_id = request.query_params.get('user_id', None)

	print(meal_id)
	if user_id and meal_id:
		meals = Meals.objects.filter(id=meal_id, user=user_id)
	elif user_id:
		meals = Meals.objects.filter(user=user_id)
	else:
		meals = Meals.objects.all()
	serializer = MealsSerializer(meals, many=True)
	return JsonResponse({'Meals': serializer.data}, safe=False, status=status.HTTP_200_OK)

@api_view(["POST"])
#@permission_classes([IsAuthenticated])
def search_meals(request):
	date_to = datetime.strptime(request.data.get('date_to'), '%Y-%m-%d')
	date_from = datetime.strptime(request.data.get('date_from'), '%Y-%m-%d')
	
	try:
		meals = Meals.objects.filter(created_at__lte=date_to, created_at__gt=date_from)
		serializer = MealsSerializer(meals, many=True)
		return JsonResponse({'Meals': serializer.data}, safe=False, status=status.HTTP_200_OK)	
	except ObjectDoesNotExist as e:
		return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
	


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_meal(request):
	data = json.loads(request.body)
	user= request.user
	try:
		print("user= ", request.user)
		meal = Meals.objects.create(
			user = user,
			meal_name = data['meal_name'],
			calories = data['calories']
		)
		serializer = MealsSerializer(meal)
		print(serializer)
		return JsonResponse({'data': serializer.data}, safe=False, status=status.HTTP_201_CREATED)
	except ObjectDoesNotExist as e:
		return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
	except Exception:
		return JsonResponse({'error': 'Something went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_meal(request, meal_id):
	user = request.user
	data = request.data
	try:
		meal = Meals.objects.get(id=meal_id)
		meal.meal_name = data.get('meal_name')
		meal.calories = data.get('calories')
		meal.save()
		serializer = MealsSerializer(meal)
		return JsonResponse({'data': serializer.data}, safe=False, status=status.HTTP_200_OK)
	except ObjectDoesNotExist as e:
		return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
	except Exception:
		return JsonResponse({'error': 'Something went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_meal(request, meal_id):
	user = request.user.id
	try:
		meal = Meals.objects.get(id=meal_id)
		meal.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
	except ObjectDoesNotExist as e:
		print('except')
		return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
	except Exception:
		return JsonResponse({'error': 'Something Went Wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




