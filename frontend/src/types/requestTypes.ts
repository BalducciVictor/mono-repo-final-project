export interface Chapter {
    chapterName: string,
    hasQuiz: boolean,
    questionnaire: [
        string
    ],
    category: string,
    description: string,
    documents: [
        string
    ]
}