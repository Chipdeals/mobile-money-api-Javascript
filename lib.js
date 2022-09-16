const apiKey = document.currentScript.getAttribute("apiKey");
const successRedirectionUrl = document.currentScript.getAttribute(
  "successfulRedirection"
);
const chipdealsPaymentPageUrl =
  "./assets/payment.html";

window.onload = async function () {
  initChipdealsButtonWatching();
  initChipdealsEventListening();
};

function initChipdealsButtonWatching() {
  const buttonsSelector = ".chipdeals-button";
  const paymentButtons = document.querySelectorAll(buttonsSelector);
  paymentButtons.forEach(initWatchingFor);
  const noButtonErrorMessage = 'No tag found with className "chipdeals-button"';
  if (!paymentButtons[0]) console.warn(noButtonErrorMessage);
  launchLoopInitNewButtons();
}

function launchLoopInitNewButtons() {
  const LOOP_INTERVAL_MS = 1000;
  setInterval(() => {
    const newButtonsSelector = ".chipdeals-button:not([chipdealsInitiated]";
    const paymentButtons = document.querySelectorAll(newButtonsSelector);
    paymentButtons.forEach(initWatchingFor);
  }, LOOP_INTERVAL_MS);
}

function initWatchingFor(button) {
  const validation = validatePaymentButtons(button);
  if (validation.success) attachHandlerToButtonClick(button);
  else console.error(validation.errorMessage + " element ->", button);
}

function validatePaymentButtons(buttonElement) {
  const paymentInfo = extractPaymentInfoFrom(buttonElement);
  if (!paymentInfo.amount) return validationError("badAmount");
  if (!isPositive(paymentInfo.amount)) return validationError("negativeAmount");
  if (!isPossibleCurrency(paymentInfo.currency))
    return validationError("invalidCurrency");
  return { success: true, errorMessage: "" };
}

function isPositive(data) {
  return parseInt(data) > 0;
}

function isPossibleCurrency(data) {
  return /^\w{3}$/.test(data);
}

function validationError(errorName) {
  errors = {
    badAmount: {
      success: false,
      errorMessage: 'An attribute "amount" should be added to you button tag',
    },
    negativeAmount: {
      success: false,
      errorMessage: 'The attribute "amount" should be greater than 0',
    },
    invalidCurrency: {
      success: false,
      errorMessage:
        'The attribute "currency" should contain a valid currency three character format. ex XOF',
    },
  };
  return errors[errorName];
}

function attachHandlerToButtonClick(chipdealsButton) {
  chipdealsButton.addEventListener("click", onChipdealsButtonClicked);
  chipdealsButton.setAttribute("chipdealsInitiated", "true");
}

function onChipdealsButtonClicked(event) {
  const paymentInfo = extractPaymentInfoFrom(event.target);
  showPaymentBox(paymentInfo);
}

function extractPaymentInfoFrom(element) {
  const amount = element.attributes.amount?.value;
  const currency = element.attributes.currency?.value || "XOF";
  const productName = element.attributes.name?.value || "";
  const addFeesToUser = !!element.attributes.addFeeToUser;
  const imgPath = element.attributes.img?.value || "";
  const imgUrl = generateImgUrlFrom(imgPath);

  const paymentInfo = {
    amount,
    currency: currency.toUpperCase(),
    productName,
    imgUrl,
    addFeesToUser,
  };
  return paymentInfo;
}

function generateImgUrlFrom(imgPath) {
  if (!imgPath) return "";
  const currentFileFolder = window.location.href.replace(/(.+)\/(.+?)?$/, "$1");
  const baseUrl = window.location.origin;
  const fileDirIsBaseUrl = /^\//.test(imgPath);

  let pictureFolder = currentFileFolder;
  if (fileDirIsBaseUrl) pictureFolder = baseUrl;

  let url = pictureFolder + "/" + imgPath.replace(/^\//, "");
  return url;
}

function showPaymentBox(paymentInfo) {
  const url = buildPaymentPageUrl(paymentInfo);
  const paymentComponent = createPaymentComponent(url);
  setPaymentComponentAttributes(paymentComponent);
  showPaymentComponent(paymentComponent);
  const closeComponent = buildPaymentCloseComponent();
  addCloseComponentAttributes(closeComponent);
  showCloseComponent(closeComponent);
  attachPaymentComponentToClose(paymentComponent, closeComponent);
}

function buildPaymentPageUrl(paymentInfo) {
  let url = chipdealsPaymentPageUrl + "?";
  url += "&apiKey=" + apiKey;
  url += "&amount=" + paymentInfo.amount;
  url += "&currency=" + paymentInfo.currency;
  if (paymentInfo.imgUrl) url += "&imgUrl=" + encodeURI(paymentInfo.imgUrl);
  if (paymentInfo.productName) url += "&productName=" + paymentInfo.productName;
  if (paymentInfo.addFeesToUser)
    url += "&addFeesToUser=" + paymentInfo.addFeesToUser;
  return url;
}

function createPaymentComponent(url) {
  const component = document.createElement("iframe");
  component.setAttribute("src", url);
  return component;
}

function setPaymentComponentAttributes(component) {
  component.style.width = "100%";
  component.style.height = "100%";
  component.style.position = "fixed";
  component.style.top = "0";
  component.style.left = "0";
  component.style.border = "none";
  component.style.zIndex = "10000000000000";
}

function showPaymentComponent(component) {
  document.body.appendChild(component);
  component.focus();
}

function buildPaymentCloseComponent() {
  const component = document.createElement("div");
  component.innerHTML = "&#10006;";
  return component;
}

function addCloseComponentAttributes(component) {
  component.style.position = "fixed";
  component.style.top = "15px";
  component.style.right = "15";
  component.style.zIndex = "10000000000001";
  component.style.color = "hsl(221deg 10% 42%)";
  component.style.fontSize = "30px";
  component.style.lineHeight = "1em";
  component.style.width = "1em";
  component.style.textAlign = "center";
  component.style.cursor = "pointer";
}

function showCloseComponent(component) {
  document.body.appendChild(component);
}

function attachPaymentComponentToClose(paymentComponent, closeComponent) {
  closeComponent.addEventListener("click", () => {
    document.body.removeChild(paymentComponent);
    document.body.removeChild(closeComponent);
  });
}

function initChipdealsEventListening() {
  window.addEventListener("message", onMessage);
}

function onMessage(event) {
  const eventData = event.data;
  const paymentChangedEvent = "chipdealsIframeEvent-paymentStateChanged";
  if (eventData?.name == paymentChangedEvent) onStateChanged(eventData.detail);
}

function onStateChanged(eventData) {
  onPaymentStateChanged(eventData);
  if (eventData.status == "success") onPaymentSucceeded(eventData);
  else if (eventData.status == "error") onPaymentFailed(eventData);
}

function onPaymentStateChanged(eventData) {
  const eventName = "chipdealsPaymentUpdated";
  const updatedEvent = new CustomEvent(eventName, { detail: eventData });
  window.document.dispatchEvent(updatedEvent);
}

function onPaymentSucceeded(eventData) {
  if (successRedirectionUrl) {
    setTimeout(redirectTo, 3000, successRedirectionUrl);
    return;
  }
  const eventName = "chipdealsPaymentSucceeded";
  const successEvent = new CustomEvent(eventName, { detail: eventData });
  window.document.dispatchEvent(successEvent);
}

function redirectTo(url) {
  window.location.href = url;
}

function onPaymentFailed(eventData) {
  const eventName = "chipdealsPaymentFailed";
  const failedEvent = new CustomEvent(eventName, { detail: eventData });
  window.document.dispatchEvent(failedEvent);
}
