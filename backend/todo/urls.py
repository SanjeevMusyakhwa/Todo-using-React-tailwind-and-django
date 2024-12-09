from django.urls import path
from .views import todo_list, todo_create, todo_delete
urlpatterns = [
    path('todos/', todo_list),
    path('todos/add/', todo_create),
    path('todos/delete/<int:pk>/', todo_delete )
]

