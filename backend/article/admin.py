from django.contrib import admin
from .models import Article, Category, Rating, Blog

class ArticleAdmin(admin.ModelAdmin):
    filter_horizontal = ('categories',)

admin.site.register(Article, ArticleAdmin)
admin.site.register(Category)
admin.site.register(Rating)
admin.site.register(Blog)

 
