from rest_framework import routers

from .views import BuildingViewSet

router = routers.SimpleRouter()
router.register(r'', BuildingViewSet, basename="building")

urlpatterns = []
urlpatterns += router.urls
