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
export const userId = "65269007708cf87def8ed66e";

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

export const validUserData = {
  adminMail: "userTestAdmin@example.com",
  firstName: "user",
  lastName: "test",
  email: "userTest@example.com",
  password: "StringTest123@",
  companyId: "65200cf0dad91bea5e2cf277",
  role: "ADMIN",
  currentChapterId: 0,
  currentChapterStepId: 0,
  validatedChapterId: [""],
};

export const invalidUserData = {
  adminMail: "",
  firstName: "12345",
  lastName: "victor",
  email: "invalidEmail",
  password: "str",
  companyId: "",
  role: "USER",
  currentChapterId: -1,
  currentChapterStepId: -1,
  validatedChapterId: [""],
};
