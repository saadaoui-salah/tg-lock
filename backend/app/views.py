from rest_framework import generics
from .models import App
from .serializers import AppSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import BasePermission
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import App


class CustomIsAuthenticated(BasePermission):
    """
    Custom permission to only allow access if the user is authenticated.
    Checks if request.user exists and is authenticated.
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated
        return True if request.user else False

# ListCreateAPIView for listing and creating App instances
class AppListCreateView(APIView):
    permission_classes = [CustomIsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Handle GET requests to list all App instances
        apps = App.objects.all()
        serializer = AppSerializer(apps, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        try:
            app = App.objects.create(
                name=request.data['name'],
                secret_key=request.data['secret_key'],
                user=request.user
            )
            return Response({'created': True})
        except Exception as e :
            return Response({'created': False, 'error': str(e)})
