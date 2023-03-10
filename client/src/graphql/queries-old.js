import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { getAccessToken } from "../auth";

// import { request } from "graphql-request";
// gql from apollo/client does the query validation whereas graphql-request does not.

const GRAPHQL_URL = "http://localhost:9000/graphql";

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
  // defaultOptions: {
  //   query: {
  //     fetchPolicy: "network-only",
  //   },
  //   mutate: {
  //     fetchPolicy: "no-cache",
  //   },
  //   watchQuery: {
  //     fetchPolicy: "network-only",
  //   },
  // },
});

const JOB_DETAIL_FRAGMENT = gql`
  fragment JobDetail on Job {
    id
    title
    company {
      id
      name
    }
    description
  }
`;

export const JOB_QUERY = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;

//Get all jobs
export async function getJobs() {
  const query = gql`
    query JobsQuery {
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

  //const data = await request(GRAPHQL_URL, query);
  //return data.jobs;

  const {
    data: { jobs },
  } = await client.query({ query, fetchPolicy: "network-only" });
  return jobs;
}

//Get a single job
export async function getJob(id) {
  const variables = { id };
  const { data } = await client.query({ query: JOB_QUERY, variables });
  return data.job;
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
  const { data } = await client.query({ query, variables });
  return data.company;
}

//Create New Job
export async function createJob(input) {
  const mutation = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
      job: createJob(input: $input) {
        ...JobDetail
      }
    }
    ${JOB_DETAIL_FRAGMENT}
  `;

  const variables = { input };
  const context = {
    headers: { Authorization: "Bearer " + getAccessToken() },
  };
  const {
    data: { job },
  } = await client.mutate({
    mutation,
    variables,
    context,
    update: (cache, { data: { job } }) => {
      cache.writeQuery({
        query: JOB_QUERY,
        variables: { id: job.id },
        data: { job },
      });
    },
  });
  return job;
}
