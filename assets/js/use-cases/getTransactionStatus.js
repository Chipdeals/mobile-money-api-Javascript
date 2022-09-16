async function sendTransactionStatusRequest(collectionReference) {
  const response = await RequestUtils.sendRequestTo(
    `${serverBaseUrl}/status/${collectionReference}?apikey=` + apiKey,
    {},
    "get"
  );
  return response;
}

function parseTransactionStatusResponse(transactionStatusResponse) {
  const transaction = transactionStatusResponse.response?.transaction;

  if (transactionStatusResponse.status.code === 200) {
    return {
      success: true,
      message: "",
      transaction,
    };
  }
  return {
    success: false,
    message: "",
    transaction: null,
  };
}

async function getTransactionStatus(reference) {
  const transactionStatusResponse = await sendTransactionStatusRequest(reference);
  const parsedResponse = parseTransactionStatusResponse(
    transactionStatusResponse
  );
  return parsedResponse;
}
