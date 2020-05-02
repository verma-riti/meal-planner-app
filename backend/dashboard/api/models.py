# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils import timezone
from django.contrib.auth.models import User
from django.db import models

class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        abstract = True

# Create your models here.
class Meals(TimeStampedModel):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	meal_name = models.CharField(max_length=100)
	calories = models.IntegerField()

class Admin(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=True, null=False, blank=False)