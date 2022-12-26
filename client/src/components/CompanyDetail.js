import { useState, useEffect } from "react";
import { useParams } from "react-router";
// import { companies } from "../fake-data";
import { getCompany } from "../graphql/queries";
import JobList from "./JobList";

function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    getCompany(companyId).then((company) => setCompany(company));
  }, [companyId]);

  console.log("Company Details :", company);

  if (!company) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1 className='title'>{company.name}</h1>
      <div className='box'>{company.description}</div>
      <h5 className='title is-5'>Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
