from rest_framework import serializers

from ..models import Question, Answer


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('content', 'score')


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=False)

    class Meta:
        model = Question
        fields = ('content', 'answers')

    def create(self, validated_data):
        answers_data = validated_data.pop('answers')
        print(validated_data)
        question = Question.objects.create(content=validated_data['content'])
        for answer in answers_data:
            Answer.objects.create(question=question, **answer)
        return question
