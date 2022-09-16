async function sendFileLinkGettingRequest() {
  const transaction = JSON.parse(Commons.getCookie('transaction'));
  if (Commons.isEmpty(transaction)) return null;
  const transactionUuid = transaction.uuid;

  const response = await RequestUtils.sendRequestTo(
    `${serverBaseUrl}/downloadLink/${transactionUuid}`,
    {},
    'get',
  );
  return response;
}

function parseFileLinkResponse(fileLinkResponse) {
  if (fileLinkResponse == null) {
    return {
      success: false,
      message: '',
      link: '',
    };
  }
  if (fileLinkResponse.status.code === 200) {
    const { link } = fileLinkResponse.response;
    return {
      success: true,
      message: '',
      link,
    };
  }
  return {
    success: false,
    message: '',
    link: '',
  };
}
async function getFileLink() {
  const fileLinkResponse = await sendFileLinkGettingRequest();
  const parsedResponse = parseFileLinkResponse(fileLinkResponse);
  return parsedResponse;
}
