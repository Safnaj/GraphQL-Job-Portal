import { Company, Job } from "./db.js";

export const resolvers = {
  Query: {
    company: (_root, { id }) => Company.findById(id),
    job: (_root, { id }) => Job.findById(id),
    jobs: async () => await Job.findAll(),
  },

  Mutation: {
    createJob: async (_root, { input }) => {
      return Job.create(input);
    },
    deleteJob: async (_root, { id }) => {
      return Job.delete(id);
    },
    updateJob: async (_root, { input }) => {
      return Job.update(input);
    },
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },
};

/*
  - We can wite reolvers for any fields we want, if we do provdie a reolver function, thats what the GraphQL framework will
    call to get the value for the field.
  - For every Job object it will call Company resovler since it has a company type.
  - ID, Title & Description are scalar types which can be return from Jobs in Query. 
  - We need to write a resolver function for a custom type like Company only if we need some special logic to find value for 
    the field.
*/
