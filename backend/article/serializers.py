from rest_framework import serializers
from .models import Article, Category
from django.contrib.auth.models import User

class ArticleSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = '__all__'

    def get_username(self, obj):
        return obj.user.username
    
    def get_category(self, obj):
        return [category.name for category in obj.categories.all()]
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
