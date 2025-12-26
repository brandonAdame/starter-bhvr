import { useSuspenseQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import DataTable from "./table-components/data-table";
import { standingsColumns } from "./table-components/columns";
import { StandingsData } from "@shared/types";
import { useAuth } from "./contexts/AuthContext";

export default function Standings() {
  const { pb } = useAuth();

  const { data: tableData } = useSuspenseQuery({
    queryKey: ["standings"],
    queryFn: async () => {
      return await pb.collection("standings").getList<StandingsData>(1, 50);
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mx-auto text-2xl">Standings</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={standingsColumns} data={tableData.items} />
      </CardContent>
    </Card>
  );
}
