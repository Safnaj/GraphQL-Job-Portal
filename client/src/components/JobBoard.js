// import { jobs } from "../fake-data";
import { useJobs } from "../hooks/useJobs";
import JobList from "./JobList";

function JobBoard() {
  const { jobs, loading, error } = useJobs();
  console.log("[Job Board", { jobs, loading, error });

  if (error) {
    return <h1>Sorry, something went wrong.</h1>;
  }
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1 className='title'>Job Board</h1>
      {/* <JobList jobs={jobs} /> */}
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
