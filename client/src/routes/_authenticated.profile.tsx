import { useAuth } from "@/components/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { RosterView } from "@shared/types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { pb, user, userTeamId } = useAuth();

  const { data } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const teamId = await userTeamId();

      if (!teamId) return null;

      const rosterData = await pb
        .collection("roster_view")
        .getFirstListItem<RosterView>(`user_id = "${user?.id}"`);

      return rosterData;
    },
  });

  return (
    <div className="flex flex-col space-y-10">
      <div className="flex space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-2xl font-semibold">{user?.name ?? "_user"}</span>
      </div>
      <div>
        <Card>
          <CardHeader className="text-2xl font-semibold">Info</CardHeader>
          <CardContent>
            <div className="flex space-x-8">
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-slate-400">Position</span>
                <span className="text-lg font-semibold">
                  {data?.player_position ?? "N/A"}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-slate-400">Number</span>
                <span className="text-lg font-semibold">
                  {data?.player_number ?? "N/A"}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-slate-400">Team</span>
                <span className="text-lg font-semibold">
                  {data?.team_name ?? "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
