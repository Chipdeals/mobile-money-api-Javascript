async function request(
  method,
  url,
  headers = null,
  auth = null,
  data = null,
  responseType = null,
  returnStatus = null,
) {
  const requestConfig = {
    url,
    method,
  };
  Commons.isEmpty(headers) ? null : (requestConfig.headers = headers);
  Commons.isEmpty(auth) ? null : (requestConfig.auth = auth);
  data ? (requestConfig.data = data) : null;
  Commons.isEmpty(responseType) ? null : (requestConfig.responseType = responseType);

  const response = await axios.request(requestConfig).catch((error) => {
    console.log(`Failed caused by access to : ${url} with error :  ${error}`);
    console.log(error.message);

    return error.response || error;
  });

  if (returnStatus) {
    return {
      status: { code: response.status },
      response: response.data || response,
    };
  }
  return response.data || response;
}
class RequestUtils {
  static sendRequestTo(url, data, method, headers = null, getStatus = true) {
    return request(method, url, headers, null, data, null, getStatus);
  }
}

