import json
from django.core.management.base import BaseCommand
from core.models import Game, Team
from datetime import datetime

class Command(BaseCommand):
    help = 'Loads team schedules from JSON file'

    def handle(self, *args, **kwargs):
        with open('schedule.json', 'r') as f:  # adjust path if needed
            data = json.load(f)

        game_count = 0

        for team_name, games in data.items():
            team_obj, _ = Team.objects.get_or_create(name=team_name)

            for game in games:
                opponent_name = game["opponent"]
                opponent_obj, _ = Team.objects.get_or_create(name=opponent_name)

                # Parse the date and time fields
                game_date = datetime.strptime(game["date"], "%A, %B %d, %Y").date()
                game_time = datetime.strptime(game["time"], "%I:%M %p").time()

                # Decide team1 vs team2 based on "homeOrAway"
                if game["homeOrAway"].lower() == "home":
                    team1 = team_obj
                    team2 = opponent_obj
                else:
                    team1 = opponent_obj
                    team2 = team_obj

                # Avoid duplicate games by checking if same teams and date already exist
                existing_game = Game.objects.filter(
                    date=game_date,
                    time=game_time,
                    team1=team1,
                    team2=team2
                ).first()

                if not existing_game:
                    Game.objects.create(
                        date=game_date,
                        time=game_time,
                        field_name=game["field"],
                        team1=team1,
                        team2=team2
                    )
                    game_count += 1

        self.stdout.write(self.style.SUCCESS(f" Imported {game_count} games successfully."))
