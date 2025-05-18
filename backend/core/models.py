from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=100)
    logo_url = models.URLField(blank=True)
    division = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name

class Game(models.Model):
    date = models.DateField()
    time = models.TimeField()
    field_name = models.CharField(max_length=100)
    team1 = models.ForeignKey(Team, related_name="home_games", on_delete=models.CASCADE)
    team2 = models.ForeignKey(Team, related_name="away_games", on_delete=models.CASCADE)
    score1 = models.IntegerField(null=True, blank=True)
    score2 = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.team1} vs {self.team2} on {self.date}"

class Standing(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    ties = models.IntegerField(default=0)
    points = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.team.name} - {self.wins}W/{self.losses}L/{self.ties}T"

class NewsPost(models.Model):
    title = models.CharField(max_length=150)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
