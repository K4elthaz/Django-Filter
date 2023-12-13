import os
from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    
class Rating(models.Model):
    article = models.ForeignKey('Article', on_delete=models.CASCADE, related_name='ratings')
    value = models.PositiveIntegerField() 
    
class Article(models.Model):
    title = models.CharField(max_length=200)
    thumbnail = models.ImageField(upload_to=os.path.join('article_thumbnails',))
    date = models.DateTimeField(auto_now_add=True)
    views = models.PositiveIntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    categories = models.ManyToManyField(Category)
    link = models.CharField(max_length=200)

    def __str__(self):
        return self.title
    
    def calculate_average_rating(self):
        total_ratings = sum([rating.value for rating in self.ratings.all()])
        num_ratings = self.ratings.count()
        
        if num_ratings > 0:
            return round(total_ratings / num_ratings, 2)
        else:
            return 0
             
class Blog(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        # Format the date as desired (e.g., Month Day, Year)
        formatted_date = self.date_created.strftime('%B %d, %Y')
        return f"{self.title} - {formatted_date}"
    
        
