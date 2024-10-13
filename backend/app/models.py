from django.db import models

# Create your models here.
class App(models.Model):
    name = models.CharField(max_length=200)
    secret_key = models.CharField(max_length=200)