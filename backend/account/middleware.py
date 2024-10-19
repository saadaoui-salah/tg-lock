from django.contrib.auth import get_user_model
import json
from .backend import AccessTokenBackend
from django.utils.deprecation import MiddlewareMixin

User = get_user_model()

class TokenToUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        refresh = False
        user, refresh = AccessTokenBackend().authenticate(request)
        if user: 
            request.user = user
            request.is_authenticated = True

        response = self.get_response(request)
        if refresh:
            set_cookies(refresh,response)
        return response


class DisableCSRFMiddleware(MiddlewareMixin):
    def process_request(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)

def set_cookies(refresh, response, max_age=None):
    response.set_cookie(
        key='access_token',
        value=str(refresh.access_token),
        httponly=True,
        samesite='None',
        secure=True,
    )
    response.set_cookie(
        key='refresh_token',
        value=str(refresh),
        httponly=True,
        samesite='None',
        secure=True,
    )
    response.set_cookie(
        key='exp',
        value=refresh.payload['exp'],
        httponly=True,
        secure=True,
        samesite='None'
    )