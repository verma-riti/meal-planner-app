import json
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
#@csrf_exempt
#@permission_classes([IsAuthenticated])
def get_meals(request):
    user = request.user.id
    meals = Meals.objects.filter(user=user)
    serializer = MealsSerializer(meals, many=True)
    return JsonResponse({'Meals': serializer.data}, safe=False, status=status.HTTP_200_OK)

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
	print('meal_id = ',meal_id)
	user = request.user
	data = json.loads(request.body)
	try:
		meal = Meals.objects.filter(id=meal_id)
		meal.update(**data)
		meal = Meals.objects.get(id=meal_id)
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
		return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
	except Exception:
		return JsonResponse({'error': 'Something Went Wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




