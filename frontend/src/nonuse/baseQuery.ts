interface FetchOptions extends RequestInit {}

export const customFetch = async (endpoint: string,   options: FetchOptions = {}): Promise<any> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`This is an HTTP error: The status is ${response.status}`);
  }
  return response.json();
};