from django.urls import path

from . import views

app_name = 'questions'

urlpatterns = [
    path('questions/', views.ApiQuestions.as_view(), name='api_questions'),
    path('question/<int:question_id>', views.ApiQuestionById.as_view(), name='api_question_by_id'),

]
