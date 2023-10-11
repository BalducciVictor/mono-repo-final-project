export const adminCredentials = {
  email: "admintest@example.com",
  password: "string",
};

export const superAdminCredentials = {
  email: "superadmintest@example.com",
  password: "string",
};

export const userCredentials = {
  email: "usertest@example.com",
  password: "string",
};

export const chapterId = "652014b4a1f73f45df99996d";
export const companyId = "651ff1d2a7c08f6a11cf84e1";
export const questionnaireId = "65269596aff72f66b057e492";

export const createQuestionnaireData = {
  step: 1,
  questions: [
    {
      content: "content1test",
      answers: [
        {
          content: "Answer1",
          isCorrect: true,
        },
        {
          content: "Answer2",
          isCorrect: false,
        },
      ],
    },
  ],
};

export const companyData = {
  name: "HeticTest",
  companyGroup: [
    {
      user: ["64fb23b64c4499b2b54defd3"],
      groupName: "Devs",
    },
    {
      user: ["64fb23b64c4499b2b54defd3", "651fd1131b61b18a00e62306"],
      groupName: "Marketing",
    },
  ],
};
