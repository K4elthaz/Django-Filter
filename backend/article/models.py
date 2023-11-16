from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Article(models.Model):
    title = models.CharField(max_length=200)
    thumbnail = models.ImageField(upload_to='article_thumbnails/')
    date = models.DateTimeField(auto_now_add=True)
    views = models.PositiveIntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    categories = models.ManyToManyField(Category)  # Many-to-many relationship with Category
    link = models.CharField(max_length=200)

    def __str__(self):
        return self.title
