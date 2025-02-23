import { createColumnHelper } from '@tanstack/react-table';

import type { seasons } from '@/server/db/schema';

const colHelper = createColumnHelper<typeof seasons.$inferSelect>();
