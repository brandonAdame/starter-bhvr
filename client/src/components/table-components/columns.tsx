import { ColumnDef } from "@tanstack/react-table";
import { RosterView, StandingsData } from "@shared/types";

export const standingsColumns: ColumnDef<StandingsData>[] = [
  {
    accessorKey: "club",
    header: "Club",
  },
  {
    accessorKey: "MP",
    header: "MP",
  },
  {
    accessorKey: "W",
    header: "W",
  },
  {
    accessorKey: "D",
    header: "D",
  },
  {
    accessorKey: "L",
    header: "L",
  },
  {
    accessorKey: "GF",
    header: "GF",
  },
  {
    accessorKey: "GA",
    header: "GA",
  },
  {
    accessorKey: "GD",
    header: "GD",
  },
  {
    accessorKey: "Pts",
    header() {
      return <span className="font-semibold">Pts</span>;
    },
    cell: ({ getValue }) => <strong>{getValue<number>()}</strong>,
  },
];

export const teamRosterColumns: ColumnDef<RosterView>[] = [
  {
    accessorKey: "player_position",
    header: "Position",
  },
  {
    accessorKey: "player_number",
    header: "Number",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone_number",
    header: "Phone",
  },
];
