import sessionAPI from "./sessionStorageAPI"
import type { Chapter } from "../types/requestTypes"

interface ApiOptions {
    method: "GET" | "POST" | "PUT" | "DELETE";
    url?: string;
    data?: Record<string, any>;
    searchParams?: Record<string, string>;
}

const api = async ({
    method,
    url,
    data,
    searchParams
}: ApiOptions): Promise<any> => {;
    
    const apiUrl = `${process.env.REACT_APP_API_URL}${url}`;

    const headers: HeadersInit = {
        "X-CSRFToken": `Token ${sessionAPI.getToken() as string}`,
        "Content-Type": "application/json",
        Authorization: `Token ${sessionAPI.getToken() as string}`,
    };

    let queryParams = "";

    if (searchParams) {
        for (const [key, value] of Object.entries(searchParams)) {
            queryParams += `&${key}=${value}`;
        }
    }

    const requestOptions: RequestInit = {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
    };

    const requestUrl = new URL(`${apiUrl}${queryParams}`);

    try {
        const response = await fetch(requestUrl, requestOptions);
        if (!response.ok) {
            throw new Error(await response.json());
        }
        return await response.json();
    } catch (error: any) {
        throw new Error("error");
    }
};

export function signIn(email: string, password: string) {
    return api({method: "POST", url: `auth/signin/`, data:{
        email, 
        password
    }})
};

export function getChapters() {
    return api({method: "GET", url: `chapters/`,})
};

export function getChapter(chapterId: string) {
    return api({method: "GET", url: `chapters/${chapterId}`,})
};

export function postChapter(data: Chapter) {
    return api({method: "POST", url: `chapters/`, data})
};

export function getUser(userId: string) {
    return api({method: "POST", url: `users/${userId}`})
};

export function getQuestionnaire(chapterId: string, questionnaireId: string ) {
    return api({method: "POST", url: `chapters/${chapterId}/questionnaires/${questionnaireId}`})
};