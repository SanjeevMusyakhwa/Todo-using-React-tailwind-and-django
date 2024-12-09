from django.urls import path
from .views import todo_list, todo_create
urlpatterns = [
    path('todos/', todo_list),
    path('todos/add/', todo_create)
]
