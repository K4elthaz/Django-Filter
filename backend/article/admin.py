from django.contrib import admin
from .models import Article, Category

class ArticleAdmin(admin.ModelAdmin):
    filter_horizontal = ('categories',)

admin.site.register(Article, ArticleAdmin)
admin.site.register(Category)
