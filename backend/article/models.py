from django.db import models
from django.contrib.auth.models import User  # For user relationship

class Article(models.Model):
    title = models.CharField(max_length=200)
    thumbnail = models.ImageField(upload_to='article_thumbnails/')  # Requires the Pillow library
    date = models.DateTimeField(auto_now_add=True)
    views = models.PositiveIntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Relationship with User
    description = models.TextField()
    category = models.CharField(max_length=200)

    def __str__(self):
        return self.title

class Comment(models.Model):
    text = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Relationship with User
    date = models.DateTimeField(auto_now_add=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)  # Relationship with Article

    def __str__(self):
        return f"{self.user.username}'s comment on {self.article.title}"