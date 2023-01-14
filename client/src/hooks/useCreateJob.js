import { useMutation } from "@apollo/client";
import { JOB_QUERY, CREATE_JOB_MUTATION } from "../graphql/queries";
import { getAccessToken } from "../auth";

export function useCreateJob() {
  const [mutate, { loading, error }] = useMutation(CREATE_JOB_MUTATION);
  return {
    createJob: async (title, description) => {
      const {
        data: { job },
      } = await mutate({
        variables: { title, description },
        context: {
          headers: { Authorization: "Bearer " + getAccessToken() },
        },
        update: (cache, { data: { job } }) => {
          cache.writeQuery({
            query: JOB_QUERY,
            variables: { id: job.id },
            data: { job },
          });
        },
      });
      return job;
    },
    loading,
    error: Boolean(error),
  };
}
