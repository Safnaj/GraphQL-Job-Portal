import JobList from "./JobList";
// import { jobs } from "../fake-data";
import { getJobs } from "../graphql/queries";
import { useEffect, useState } from "react";

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("Mounted");
    getJobs()
      .then((jobs) => setJobs(jobs))
      .catch((err) => setError(true));
  }, []);

  if (error) {
    return <h1>Sorry, something went wrong.</h1>;
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
