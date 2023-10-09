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
    
    const apiUrl = `${process.env.REACT_APP_API_URL}/${url}`;

    const headers: HeadersInit = {
        "X-CSRFToken": localStorage.getItem('token') as string,
        "Content-Type": "application/json",
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

    const requestUrl = new URL(`${apiUrl}?${queryParams}`);

    try {
        const response = await fetch(requestUrl, requestOptions);
        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.detail);
        }
        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const dataHandler = async (res: any): Promise<any> => {
    return res;
};

interface AuthData {
    email: string;
    password: string;
}

export function SignIn(data: AuthData) {
	return api({method: "POST", url: "auth/signin", data: {
		data,
	}}).then(dataHandler);
}
