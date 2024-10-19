from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class App(models.Model):
    user = models.ForeignKey(User, on_delete= models.CASCADE)
    name = models.CharField(max_length=200)
    secret_key = models.CharField(max_length=200)