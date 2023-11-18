from rest_framework.decorators import api_view, authentication_classes, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import generics, viewsets
from .models import Article, Category
from .serializers import ArticleSerializer, CategorySerializer, UserSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    @action(detail=True, methods=['put'])
    def increment_views(self, request, pk=None):
        article = self.get_object()
        article.views += 1
        article.save()
        serializer = self.get_serializer(article)
        return Response(serializer.data)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)  # Extract the refresh token string
            user_id = user.id
            name = user.username
            return Response({'access_token': access_token, 'refresh_token': refresh_token, 'user_id': user_id}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def protected_view(request):
    # Your protected view logic here
    return Response({'message': 'This is a protected view'}, status=status.HTTP_200_OK)

class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get('refresh_token')
        print(f"Received refresh token: {refresh_token}")

        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                print(f"Token content before blacklisting: {token}")
                print(f"Token expiry before blacklisting: {token['exp']}")
                
                token.blacklist()
                print("Logout successful")
                return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
            except Exception as e:
                print(f"Error during logout: {e}")
                return Response({'error': 'Invalid refresh token'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            print("Refresh token not provided")
            return Response({'error': 'Refresh token not provided'}, status=status.HTTP_400_BAD_REQUEST)





