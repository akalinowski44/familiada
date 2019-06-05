from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.http import Http404

from .serializers import QuestionSerializer
from ..models import Question

import random


class ApiQuestionsList(APIView):

    def get(self, request):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ApiQuestionById(APIView):
    def get(self, request, *args, **kwargs):
        question_id = self.kwargs['question_id']

        # select random question by when id = 0
        if question_id == 0:
            ids = Question.objects.only('pk')
            if len(ids) == 0:
                return Http404("Database is empty")
            question_id = random.choice(ids).pk

        question = Question.objects.get(pk=question_id)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)
