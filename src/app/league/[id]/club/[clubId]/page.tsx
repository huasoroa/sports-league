const ClubHomePage = async ({
  params,
}: {
  params: { id: string; clubId: string };
}) => {
  const { id, clubId } = await params;

  return (
    <div>
      <h1 className="text-3xl font-bold">Club Home</h1>
      <ol>
        <li>leagueId: {id}</li>
        <li>clubId: {clubId}</li>
      </ol>
    </div>
  );
};

export default ClubHomePage;
