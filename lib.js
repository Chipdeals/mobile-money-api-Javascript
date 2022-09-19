const ChipdealsJsWidgetUserApiKey =
  document.currentScript.getAttribute("apiKey");

const successRedirectionUrl = document.currentScript.getAttribute(
  "successfulRedirection"
);

window.onload = async function () {
  ChipdealsJsWidget.initChipdealsButtonWatching();
  ChipdealsJsWidget.initChipdealsEventListening();
};

class ChipdealsJsWidget {
  static initChipdealsButtonWatching() {
    const buttonsSelector = ".chipdeals-button";
    const paymentButtons = document.querySelectorAll(buttonsSelector);
    paymentButtons.forEach(ChipdealsJsWidget.initWatchingFor);
    const noButtonErrorMessage =
      'No tag found with className "chipdeals-button"';
    if (!paymentButtons[0]) console.warn(noButtonErrorMessage);
    ChipdealsJsWidget.launchLoopInitNewButtons();
  }

  static launchLoopInitNewButtons() {
    const LOOP_INTERVAL_MS = 1000;
    setInterval(() => {
      const newButtonsSelector = ".chipdeals-button:not([chipdealsInitiated]";
      const paymentButtons = document.querySelectorAll(newButtonsSelector);
      paymentButtons.forEach(ChipdealsJsWidget.initWatchingFor);
    }, LOOP_INTERVAL_MS);
  }

  static initWatchingFor(button) {
    const validation = ChipdealsJsWidget.validatePaymentButtons(button);
    if (validation.success)
      ChipdealsJsWidget.attachHandlerToButtonClick(button);
    else console.error(validation.errorMessage + " element ->", button);
  }

  static validatePaymentButtons(buttonElement) {
    const paymentInfo = ChipdealsJsWidget.extractPaymentInfoFrom(buttonElement);
    if (!paymentInfo.amount)
      return ChipdealsJsWidget.validationError("badAmount");
    if (!ChipdealsJsWidget.isPositive(paymentInfo.amount))
      return ChipdealsJsWidget.validationError("negativeAmount");
    if (!ChipdealsJsWidget.isPossibleCurrency(paymentInfo.currency))
      return ChipdealsJsWidget.validationError("invalidCurrency");
    if (!ChipdealsJsWidget.isSupportedCurrency(paymentInfo.currency))
      return ChipdealsJsWidget.validationError("unsupportedCurrency");
    return { success: true, errorMessage: "" };
  }

  static isPositive(data) {
    return parseInt(data) > 0;
  }

  static isPossibleCurrency(currency) {
    return /^\w{3}$/.test(currency);
  }

  static isSupportedCurrency(currency) {
    return !!ChipdealsJsWidget.supportedCurrencies().find((supportedCurrency) =>
      new RegExp(currency, "i").test(supportedCurrency)
    );
  }

  static supportedCurrencies() {
    const supportedCurrencies =
      "AED,ALL,ANG,ARS,AUD,AWG,BBD,BDT,BGN,BHD,BIF,BMD,BND,BOB,BSD,BTN,BWP,BYN,BZD,CAD,CHF,CLP,CNY,COP,CRC,CUP,CVE,CZK,DJF,DKK,DOP,DZD,EGP,ETB,EUR,FJD,FKP,GBP,GHS,GMD,GNF,GTQ,GYD,HKD,HNL,HRK,HTG,HUF,IDR,ILS,INR,IQD,IRR,ISK,JOD,JPY,KES,KGS,KHR,KMF,KPW,KRW,KWD,KYD,KZT,LAK,LBP,LKR,LRD,LSL,LYD,MAD,MDL,MKD,MMK,MNT,MOP,MUR,MVR,MWK,MXN,MYR,NAD,NGN,NIO,NOK,NPR,NZD,OMR,PAB,PEN,PGK,PHP,PKR,PLN,PYG,QAR,RON,RUB,RWF,SAR,SBD,SCR,SEK,SGD,SHP,SLL,SOS,STD,SVC,SYP,THB,TND,TOP,TRY,TTD,TWD,TZS,UAH,UGX,USD,UYU,UZS,VEF,VND,VUV,WST,XAF,XCD,XOF,XPF,YER,ZAR,ZMW".split(
        ","
      );
    return supportedCurrencies;
  }

  static validationError(errorName) {
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
      unsupportedCurrency: {
        success: false,
        errorMessage:
          'The attribute "currency" contain an unsupported currency',
      },
    };
    return errors[errorName];
  }

  static attachHandlerToButtonClick(chipdealsButton) {
    chipdealsButton.addEventListener(
      "click",
      ChipdealsJsWidget.onChipdealsButtonClicked
    );
    chipdealsButton.setAttribute("chipdealsInitiated", "true");
  }

  static onChipdealsButtonClicked(event) {
    const paymentInfo = ChipdealsJsWidget.extractPaymentInfoFrom(event.target);
    ChipdealsJsWidget.showPaymentBox(paymentInfo);
  }

  static extractPaymentInfoFrom(element) {
    const amount = element.attributes.amount?.value;
    const currency = element.attributes.currency?.value || "XOF";
    const productName = element.attributes.name?.value || "";
    const addFeesToUser = !!element.attributes.addFeeToUser;
    const imgPath = element.attributes.img?.value || "";
    const imgUrl = ChipdealsJsWidget.generateImgUrlFrom(imgPath);

    const paymentInfo = {
      amount,
      currency: currency.toUpperCase(),
      productName,
      imgUrl,
      addFeesToUser,
    };
    return paymentInfo;
  }

  static generateImgUrlFrom(imgPath) {
    if (!imgPath) return "";
    if (/^http/.test(imgPath)) return imgPath;
    const currentFileFolder = window.location.href.replace(
      /(.+)\/(.+?)?$/,
      "$1"
    );
    const baseUrl = window.location.origin;
    const fileDirIsBaseUrl = /^\//.test(imgPath);

    let pictureFolder = currentFileFolder;
    if (fileDirIsBaseUrl) pictureFolder = baseUrl;

    let url = pictureFolder + "/" + imgPath.replace(/^\//, "");
    return url;
  }

  static showPaymentBox(paymentInfo) {
    const url = ChipdealsJsWidget.buildPaymentPageUrl(paymentInfo);
    const paymentComponent = ChipdealsJsWidget.createPaymentComponent(url);
    ChipdealsJsWidget.setPaymentComponentAttributes(paymentComponent);
    ChipdealsJsWidget.showPaymentComponent(paymentComponent);
    const closeComponent = ChipdealsJsWidget.buildPaymentCloseComponent();
    ChipdealsJsWidget.addCloseComponentAttributes(closeComponent);
    ChipdealsJsWidget.showCloseComponent(closeComponent);
    ChipdealsJsWidget.attachPaymentComponentToClose(
      paymentComponent,
      closeComponent
    );
  }

  static buildPaymentPageUrl(paymentInfo) {
    let url = ChipdealsJsWidget.getPaymentPageBaseUrl + "?";
    url += "&apiKey=" + ChipdealsJsWidgetUserApiKey;
    url += "&amount=" + paymentInfo.amount;
    url += "&currency=" + paymentInfo.currency;
    if (paymentInfo.imgUrl) url += "&imgUrl=" + encodeURI(paymentInfo.imgUrl);
    if (paymentInfo.productName)
      url += "&productName=" + paymentInfo.productName;
    if (paymentInfo.addFeesToUser)
      url += "&addFeesToUser=" + paymentInfo.addFeesToUser;
    return url;
  }

  static getPaymentPageBaseUrl() {
    const libVersion = getLibVersion;
    const chipdealsPaymentPageUrl =
      "https://rawcdn.githack.com/Chipdeals/mobile-money-api-Javascript/{libVersion}/assets/payment.html";
    return chipdealsPaymentPageUrl.replace(/{libVersion}/, libVersion);
  }

  static getLibVersion() {
    const libSrc = document.currentScript.getAttribute("src");
    const libSrcRegex =
      /https:\/\/cdn.jsdelivr.net\/gh\/Chipdeals\/mobile-money-api-Javascript@(.+?)\/lib.min.js(.+)?/;
    const libVersion = libSrc.replace(libSrcRegex, "$1");
    return libVersion;
  }

  static createPaymentComponent(url) {
    const component = document.createElement("iframe");
    component.setAttribute("src", url);
    return component;
  }

  static setPaymentComponentAttributes(component) {
    component.style.width = "100%";
    component.style.height = "100%";
    component.style.position = "fixed";
    component.style.top = "0";
    component.style.left = "0";
    component.style.border = "none";
    component.style.zIndex = "10000000000000";
  }

  static showPaymentComponent(component) {
    document.body.appendChild(component);
    component.focus();
  }

  static buildPaymentCloseComponent() {
    const component = document.createElement("div");
    component.innerHTML = "&#10006;";
    return component;
  }

  static addCloseComponentAttributes(component) {
    component.style.position = "fixed";
    component.style.top = "15px";
    component.style.right = "15px";
    component.style.zIndex = "10000000000001";
    component.style.color = "hsl(221deg 10% 90%)";
    component.style.fontSize = "30px";
    component.style.lineHeight = "1em";
    component.style.width = "1em";
    component.style.textAlign = "center";
    component.style.cursor = "pointer";
  }

  static showCloseComponent(component) {
    document.body.appendChild(component);
  }

  static attachPaymentComponentToClose(paymentComponent, closeComponent) {
    closeComponent.addEventListener("click", () => {
      document.body.removeChild(paymentComponent);
      document.body.removeChild(closeComponent);
    });
  }

  static initChipdealsEventListening() {
    window.addEventListener("message", ChipdealsJsWidget.onMessage);
  }

  static onMessage(event) {
    const eventData = event.data;
    const paymentChangedEvent = "chipdealsIframeEvent-paymentStateChanged";
    if (eventData?.name == paymentChangedEvent)
      ChipdealsJsWidget.onStateChanged(eventData.detail);
  }

  static onStateChanged(eventData) {
    ChipdealsJsWidget.onPaymentStateChanged(eventData);
    if (eventData.status == "success") onPaymentSucceeded(eventData);
    else if (eventData.status == "error") onPaymentFailed(eventData);
  }

  static onPaymentStateChanged(eventData) {
    const eventName = "chipdealsPaymentUpdated";
    const updatedEvent = new CustomEvent(eventName, { detail: eventData });
    window.document.dispatchEvent(updatedEvent);
  }

  static onPaymentSucceeded(eventData) {
    if (successRedirectionUrl) {
      setTimeout(redirectTo, 3000, successRedirectionUrl);
      return;
    }
    const eventName = "chipdealsPaymentSucceeded";
    const successEvent = new CustomEvent(eventName, { detail: eventData });
    window.document.dispatchEvent(successEvent);
  }

  static redirectTo(url) {
    window.location.href = url;
  }

  static onPaymentFailed(eventData) {
    const eventName = "chipdealsPaymentFailed";
    const failedEvent = new CustomEvent(eventName, { detail: eventData });
    window.document.dispatchEvent(failedEvent);
  }
}
