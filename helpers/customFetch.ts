import { iCustomResponse } from "../@types/api/res";
const customFetch = async <Req, Res = unknown>(
  endpoint: string,
  auth: boolean = false,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: Req | FormData,
  files: boolean = false
): Promise<iCustomResponse<Res>> => {
  const url = `/api/${endpoint}`;

  const token = localStorage.getItem("x-token") || "";

  const body = files
    ? (data as FormData)
    : method === "GET"
    ? undefined
    : JSON.stringify(data);

  const headers =
    method === "GET" || files
      ? auth
        ? { "x-token": token }
        : undefined
      : ((auth
          ? { "Content-Type": "application/json", "x-token": token }
          : { "Content-Type": "application/json" }) as HeadersInit);

  const res = await fetch(url, {
    method,
    headers,
    body,
  });

  return new Promise(async (resolve, reject) => {
    const json: iCustomResponse = await res.json();
    if (res.status < 400 && json.codeStatus === "00") return resolve(json);
    return reject(json);
  });
};

export default customFetch;
