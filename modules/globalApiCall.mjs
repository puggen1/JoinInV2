//base url for Noroff api
const defaultUrl = "https://nf-api.onrender.com/api/v1/";

/**
 *
 * @param {string} url sub url to target in api
 * @param {string} authToken token needed for validation, only exeption is register and login
 * @param {string} method wanted method, either GET, POST, UPDATE or DELETE
 * @param {object} data  the body content you want in the api call
 * @returns response in form of error or success response
 */
export default async function globalApiCall(
  url,
  authToken = "",
  method = "GET",
  data = ""
) {
  let targetApi = defaultUrl + url;
  //setup the optional body without erros
  let body;
  let headers = {};
  if (authToken) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };
  } else {
    headers = {
      "Content-Type": "application/json",
    };
  }
  //if there is content to send, stringify it and assign it to body
  if (method !== "GET") {
    body = JSON.stringify(data);
  }
  let finalizedApiCall = {
    method: method,
    headers,
    body,
  };
  try {
    let apiResponse = await fetch(targetApi, finalizedApiCall).then(
      async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          let parsedError = await response.json();
          throw new Error(parsedError.errors[0].message);
        }
      }
    );
    return apiResponse;
  } catch (error) {
    return error;
  }
}
