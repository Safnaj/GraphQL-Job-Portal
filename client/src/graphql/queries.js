import { request, gql } from "graphql-request";
import { getAccessToken } from "../auth";

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

//Create New Job
export async function createJob(input) {
  const query = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
        # title
        # company {
        #   id
        #   name
        # }
      }
    }
  `;

  const variables = { input };
  const headers = { Authorization: "Bearer " + getAccessToken() };
  const { job } = await request(GRAPHQL_URL, query, variables, headers);
  return job;
}
