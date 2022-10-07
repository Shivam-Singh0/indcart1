from django.urls import path
from ..views import orders_views as views


urlpatterns = [
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders', views.getMyOrders, name='my-orders'),
    path('<str:pk>', views.getOrderById, name='user-order'),
    path('<str:pk>/pay', views.updateOrdeToPaid, name='order-pay'),
]
