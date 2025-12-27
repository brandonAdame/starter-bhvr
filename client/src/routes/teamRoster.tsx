import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { Post, RosterView } from "@shared/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/table-components/data-table";
import { teamRosterColumns } from "@/components/table-components/columns";
import { useAuth } from "@/components/contexts/AuthContext";

export const Route = createFileRoute("/teamRoster")({
  component: RouteComponent,
});

function AnimatedCard({ post, index }: { post: Post; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "30px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`mb-4 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 25}ms` }}
    >
      <Card className="max-w-1/2">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{post.body}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function RouteComponent() {
  const { pb, userTeamId } = useAuth();

  const { data: postData } = useSuspenseQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return (await response.json()) as Post[];
    },
  });

  const { data: teamData } = useSuspenseQuery({
    queryKey: ["teamRoster"],
    queryFn: async () => {
      const id = await userTeamId();

      if (!id) return [];
      return await pb
        .collection("roster_view")
        .getFullList<RosterView>({ filter: `team_id = "${id}"` });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-10 pt-10 font-monsterrat">
      <h1 className="text-4xl">Team Roster</h1>
      <div className="w-3/4">
        {/* <h2 className="text-2xl mb-4">Posts</h2>
        {postData.map((post, index) => (
          <AnimatedCard key={post.id} post={post} index={index} />
        ))} */}
        <DataTable columns={teamRosterColumns} data={teamData} />
      </div>
    </div>
  );
}
