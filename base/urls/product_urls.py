from django.urls import path
from ..views import product_views as views


urlpatterns = [
    path('', views.getproducts, name='products'),
    path('<str:pk>', views.getproduct, name='product'),
]
