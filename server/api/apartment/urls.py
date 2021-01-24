from rest_framework import routers

from .views import ApartmentViewSet

router = routers.DefaultRouter()
router.register(r'', ApartmentViewSet, basename="apartment")

urlpatterns = []
urlpatterns += router.urls
