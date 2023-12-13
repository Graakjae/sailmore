import FilterCrewMembers from "@/components/FilterCrewMembers";
import CrewMembers from "@/components/CrewMembers";
import "./crewmembers.css";

function CrewMembersPage() {
  return (
    <div className="crewmember-page">
      <h1>SailMore Crew</h1>
      <FilterCrewMembers />
      <CrewMembers />
    </div>
  );
}
export default CrewMembersPage;
