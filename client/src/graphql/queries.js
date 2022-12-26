import { request, gql } from "graphql-request";

const GRAPHQL_URL = "http://localhost:9000/graphql";

//Get all jobs
export async function getJobs() {
  const query = gql`
    query {
      jobs {
        id
        title
        company {
          id
          name
        }
      }
    }
  `;

  const data = await request(GRAPHQL_URL, query);
  console.log("data", data);

  return data.jobs;
}

//Get a single job
export async function getJob(id) {
  const query = gql`
    query JobQuery($id: ID!) {
      job(id: $id) {
        id
        title
        company {
          id
          name
        }
        description
      }
    }
  `;

  const variables = { id };
  const { job } = await request(GRAPHQL_URL, query, variables);
  return job;
}

//Get company details
export async function getCompany(id) {
  const query = gql`
    query CompanyQuery($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          title
        }
      }
    }
  `;

  const variables = { id };
  const { company } = await request(GRAPHQL_URL, query, variables);
  return company;
}
