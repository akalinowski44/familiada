from django.db import models

class Question(models.Model):
    content = models.TextField()


class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    score = models.IntegerField()
    content = models.TextField()
