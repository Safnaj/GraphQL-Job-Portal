import { useQuery } from "@apollo/client";
import { COMPANY_QUERY } from "../graphql/queries";

export function useCompany(id) {
  const { data, loading, error } = useQuery(COMPANY_QUERY, {
    variables: { id },
  });
  return {
    company: data?.company,
    loading,
    error: Boolean(error),
  };
}
