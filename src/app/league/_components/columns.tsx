'use client';

import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import type { leagues } from '@/server/db/schema';

const colHelper = createColumnHelper<typeof leagues.$inferSelect>();

export const columnDefs = [
  colHelper.accessor('name', {
    header: 'Name',
    cell: (props) => {
      return (
        <Button variant={'link'} asChild>
          <Link href={`/league/${props.row.original.leagueId}`}>
            {props.getValue()}
          </Link>
        </Button>
      );
    },
  }),
];
