from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import QuestionSerializer
from ..models import Question


class ApiQuestions(APIView):
    def get(self, request):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)


class ApiQuestionById(APIView):
    def get(self, request, *args, **kwargs):
        question = Question.objects.get(pk=self.kwargs['question_id'])
        serializer = QuestionSerializer(question)
        return Response(serializer.data)
