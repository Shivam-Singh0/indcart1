from django.urls import path
from ..views import users_views as views


urlpatterns = [
    path('', views.getUsers, name='users'),

    path('login', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('profile', views.getUserProfile, name='user-profile'),
    path('profile/update', views.updateUserProfile, name='update-profile'),
    path('register', views.registerUser, name='register'),
    path('delete/<str:pk>', views.delUsers, name='delete'),

]
