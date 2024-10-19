from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime
User = get_user_model()


class AccessTokenBackend(JWTAuthentication):
    def authenticate(self, request):
        try:
            token = request.COOKIES.get('access_token','')
            timestamp = request.COOKIES.get('exp','')
            refresh = request.COOKIES.get('refresh_token','')
            exp = datetime.fromtimestamp(int(timestamp))
            if exp > datetime.now() and token:
                decoded_token = self.get_validated_token(token)
                user = self.get_user(decoded_token)
                request.user = user
                return (user, None)
            
            if exp < datetime.now() and refresh:
                refresh = RefreshToken(refresh_token)
                user_id = token.payload['user_id']
                user = User.objects.filter(id=user_id).get()
                request.user = user
                return (user, token)
        except Exception as e:
            print(e)
            return (None, None)