import React from 'react';

import SeasonAddForm from './SeasonAddForm';

const SeasonAddPage = async ({ params }: { params: { leagueId: string } }) => {
  const { leagueId } = await params;

  return <SeasonAddForm leagueId={leagueId} />;
};

export default SeasonAddPage;
