const SeasonHomePage = async ({
  params,
}: {
  params: { id: string; seasonId: string };
}) => {
  const { id, seasonId } = await params;

  return (
    <div>
      <h1 className="text-3xl font-bold">Season Home</h1>
      <ol>
        <li>leagueId: {id}</li>
        <li>seasonId: {seasonId}</li>
      </ol>
    </div>
  );
};

export default SeasonHomePage;
