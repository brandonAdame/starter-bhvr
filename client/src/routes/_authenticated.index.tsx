import PreviousGames from "@/components/cards/info-cards/previousGames";
import Standings from "@/components/standings";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6 items-center">
      <h1 className="text-4xl">LeagueOne</h1>
      <div className="flex flex-col gap-6 w-3/4">
        <div className="flex justify-between gap-4">
          <Card className="w-1/3">
            <CardHeader>
              <CardTitle className="mx-auto text-xl">
                Your Upcoming Games
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 mx-auto">
              <div className="grid grid-cols-3 items-center">
                <span className="text-right">Pachuca</span>
                <span className="text-center">vs</span>
                <span className="text-left">America</span>
              </div>
              <div className="grid grid-cols-3 items-center">
                <span className="text-right">America</span>
                <span className="text-center">vs</span>
                <span className="text-left">Xolos</span>
              </div>
              <div className="grid grid-cols-3 items-center">
                <span className="text-right">America</span>
                <span className="text-center">vs</span>
                <span className="text-left">Cruz Azul</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant={"outline"}>View more</Button>
            </CardFooter>
          </Card>
          <PreviousGames />
          <Card className="w-1/3">
            <CardHeader>
              <CardTitle className="text-xl">Team Roster</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <span>Goalkeepers: Ochoa, Marchesin</span>
              <span>Defenders: Aguilar, Layun, Sanchez</span>
              <span>Midfielders: Rodriguez, Caceres, Dos Santos</span>
              <span>Forwards: Martin, Lainez</span>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                variant={"outline"}
                onClick={() => navigate({ to: "/teamRoster" })}
              >
                View Roster
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="mx-auto text-2xl">
              Upcoming League Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="text-right">Pachuca</span>
                <span className="text-center">vs</span>
                <span className="text-left">America</span>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="text-right">America</span>
                <span className="text-center">vs</span>
                <span className="text-left">Toluca</span>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="text-right">Xolos</span>
                <span className="text-center">vs</span>
                <span className="text-left">America</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Standings />
      </div>
    </div>
  );
}

export default Index;
