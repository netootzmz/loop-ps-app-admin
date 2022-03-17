const customApiFetch = async <Req, Res = unknown>(
  url: string,
  data?: Req | FormData,
  token?: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
  files: boolean = false
): Promise<Res> => {
  const body = files
    ? (data as FormData)
    : method === "GET"
    ? undefined
    : JSON.stringify(data);

  const headers =
    method === "GET" || files
      ? token
        ? { Authorization: `Bearer ${token}` }
        : undefined
      : ((token
          ? {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          : { "Content-Type": "application/json" }) as HeadersInit);

  const res = await fetch(url, {
    method,
    headers,
    body,
  });

  return new Promise(async (resolve, reject) => {
    try {
      const json = await res.json();
      if (res.status < 400 && json.codeStatus === "00") return resolve(json);
      return reject(json);
    } catch (error) {
      return reject(res);
    }
  });
};

export default customApiFetch;
