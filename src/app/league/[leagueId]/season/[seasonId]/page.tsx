import { getAllDivisionsBySeasonId, getLeagueById } from '@/server/db/queries';

const SeasonHomePage = async ({
  params,
}: {
  params: { leagueId: string; seasonId: string };
}) => {
  const { leagueId, seasonId } = await params;

  const { name } = await getLeagueById(Number(leagueId));
  const divisions = await getAllDivisionsBySeasonId(Number(seasonId));

  const isSingleDivision = divisions.length === 1;

  return (
    <div>
      <h1 className="text-4xl font-bold">{name}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isSingleDivision ? (
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{divisions[0].name}</h2>
            <p>Level: {divisions[0].level}</p>
          </div>
        ) : (
          divisions.map((division) => (
            <div key={division.divisionId} className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">{division.name}</h2>
              <p>Level: {division.level}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SeasonHomePage;
