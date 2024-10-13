from django.contrib.auth import get_user_model
import json
from core.backend import AccessTokenBackend
from utils import set_cookies
User = get_user_model()

class TokenToUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        refresh = False
        user, refresh = AccessTokenBackend().authenticate(request)
        response = self.get_response(request)
        if refresh:
            set_cookies(refresh,response)
        return response
