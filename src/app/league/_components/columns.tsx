import type { leagues } from "@/server/db/schema";
import type { ColumnDef } from "@tanstack/react-table";

export const columnDefs: ColumnDef<typeof leagues.$inferSelect>[] = [
  {
    accessorKey: "leagueId",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];
