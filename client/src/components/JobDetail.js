import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useJob } from "../hooks/useJob";

function JobDetail() {
  const { jobId } = useParams();
  const { job, loading, error } = useJob(jobId);
  console.log("[Job Details", { job, loading, error });

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Sorry, something went wrong.</h1>;
  }
  return (
    <div>
      <h1 className='title'>{job.title}</h1>
      <h2 className='subtitle'>
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className='box'>{job.description}</div>
    </div>
  );
}

export default JobDetail;
