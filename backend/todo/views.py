from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Todo
from .serializers import TodoSerializer
from rest_framework.response import Response
from rest_framework import status

# View for listing all todos
@api_view(['GET'])
def todo_list(request):
    todos = Todo.objects.all()
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)

# View for creating a new todo
@api_view(['POST'])
def todo_create(request):
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  # Save the new Todo object
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View for deleting a todo by ID
@api_view(['DELETE'])
def todo_delete(request, pk):
    try:
        todo = Todo.objects.get(pk=pk)  # Find the todo by its ID
        todo.delete()  # Delete the todo item
        return Response(status=status.HTTP_204_NO_CONTENT)  # Return a 204 No Content status
    except Todo.DoesNotExist:
        return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
