async function sendCollectionRequest(collectionData) {
  const response = await RequestUtils.sendRequestTo(
    `${serverBaseUrl}/requestpayment?apikey=` + apiKey,
    collectionData,
    "post"
  );

  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  return response;
}

function parseCollectionResponse(collectionResponse) {
  const payment = collectionResponse.response?.payment;

  if (collectionResponse.status.code === 200) {
    // Commons.setCookie("payment", JSON.stringify(payment), 60);

    return {
      success: true,
      message: "",
      payment,
    };
  }

  if (collectionResponse.status.code === 400) {
    return {
      success: false,
      message: "",
      payment: { statusMessageCode: 401 },
    };
  }

  return {
    success: false,
    message: "",
    payment: payment,
  };
}

async function createTransaction(collectionData) {
  const collectionResponse = await sendCollectionRequest(collectionData);
  const parsedResponse = parseCollectionResponse(collectionResponse);
  return parsedResponse;
}
