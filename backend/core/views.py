from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Team, Game, Standing, NewsPost
from .serializers import TeamSerializer, GameSerializer, StandingSerializer, NewsPostSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all().order_by('date', 'time')
    serializer_class = GameSerializer

class StandingViewSet(viewsets.ModelViewSet):
    queryset = Standing.objects.all()
    serializer_class = StandingSerializer

class NewsPostViewSet(viewsets.ModelViewSet):
    queryset = NewsPost.objects.all()
    serializer_class = NewsPostSerializer
