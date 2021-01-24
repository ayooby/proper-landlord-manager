from rest_framework import routers

from .views import LandlordProfileViewSet

router = routers.DefaultRouter()
router.register(r'', LandlordProfileViewSet, basename='profile')

urlpatterns = []
urlpatterns += router.urls
