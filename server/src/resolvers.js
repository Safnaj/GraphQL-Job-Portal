import { Company, Job } from "./db.js";

function rejectIf(condition) {
  if (condition) {
    throw new Error("Unauthorized");
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const resolvers = {
  Query: {
    company: (_root, { id }) => Company.findById(id),
    job: (_root, { id }) => Job.findById(id),
    jobs: async () => await Job.findAll(),
  },

  Mutation: {
    createJob: async (_root, { input }, { user }) => {
      rejectIf(!user);
      await delay(2000);
      return Job.create({ ...input, companyId: user.companyId });
    },
    deleteJob: async (_root, { id }, { user }) => {
      rejectIf(!user);
      const job = await Job.findById(id);

      rejectIf(job.companyId !== user.companyId);
      return Job.delete(id);
    },
    updateJob: async (_root, { input }, user) => {
      rejectIf(!user);
      const job = await Job.findById(input.id);

      rejectIf(job.companyId !== user.companyId);
      return Job.update({ ...input, companyId: user.companyId });
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
