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

export const chapterId = "6527aec4f38f3997ceb8ec4d";
export const companyId = "65269f04393e36714e84217f";
export const questionnaireId = "6527b03e12e2c5f05fd98c5a";
export const userId = "64fb23b64c4499b2b54defd3";

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
