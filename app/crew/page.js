import FilterCrewMembers from "@/components/FilterCrewMembers";
import CrewMembers from "@/components/CrewMembers";
import "./crewmembers.css";

function CrewMembersPage() {
  return (
    <div className="crewmember-page">
      <h1>Crewmembers on SailMore</h1>
      <FilterCrewMembers />
      <CrewMembers />;
    </div>
  );
}
export default CrewMembersPage;
