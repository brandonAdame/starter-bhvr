import { useAuth } from "@/components/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function PreviousGames() {
  const { pb } = useAuth();

  const { data: gameData } = useSuspenseQuery({
    queryKey: ["previousGames"],
    queryFn: async () => {
      return await pb.collection("games_played").getList(1, 3, {
        expand: "home_team,away_team",
      });
    },
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="mx-auto text-xl">Previous Games</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 mx-auto">
          {gameData.items.map((game: any) => (
            <div key={game.id}>
              <div className="grid grid-cols-3 items-center">
                <span className="text-right">
                  {game.expand.home_team.team_name}
                </span>
                <span className="text-center">
                  {game.home_score}-{game.away_score}
                </span>
                <span className="text-left">
                  {game.expand.away_team.team_name}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant={"outline"}>View more</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
