import LeagueAddForm from "./LeagueAddForm";

const LeagueAddPage = () => {
  const sports = [
    { name: "Football", id: 1 },
    { name: "Basketball", id: 2 },
  ];
  return (
    <div>
      <LeagueAddForm />
    </div>
  );
};

export default LeagueAddPage;
