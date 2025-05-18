from rest_framework import serializers
from .models import Team, Game, Standing, NewsPost

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    team1 = serializers.StringRelatedField()
    team2 = serializers.StringRelatedField()
    team1_logo_url = serializers.SerializerMethodField()
    team2_logo_url = serializers.SerializerMethodField()

    class Meta:
        model = Game
        fields = '__all__'  # this automatically includes the new serializer fields too

    def get_team1_logo_url(self, obj):
        return obj.team1.logo_url

    def get_team2_logo_url(self, obj):
        return obj.team2.logo_url

class StandingSerializer(serializers.ModelSerializer):
    team = serializers.StringRelatedField()

    class Meta:
        model = Standing
        fields = '__all__'

class NewsPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsPost
        fields = '__all__'
