const queryParams = new URLSearchParams(window.location.href);

product = {
  name: queryParams.get("productName"),
  amount: parseInt(queryParams.get("amount")),
  currency: queryParams.get("currency"),
  description: queryParams.get("description"),
  pictureUrl: queryParams.get("imgUrl"),
  uuid: "b2e9653d-d262-4296-9ffb-fac687159b1a",
  addFeesToUser: queryParams.get("addFeesToUser"),
  fee: "",
  feeAmount: "",
  totalAmount: "",
};

const apiKey = queryParams.get("apiKey");
const webhookUrl = queryParams.get("webhookUrl") || "";
const assetsPath = ".";
let serverBaseUrl = "https://apis.chipdeals.me/momo";
let isTest = !!queryParams.get("sandboxMode");
if (isTest) {
  serverBaseUrl = queryParams.get("apiUrl") || serverBaseUrl;
}

window.parent.postMessage(
  { name: "chipdealsIframeEvent-paymentPageLoaded", detail: {} },
  "*"
);

function grid(
  el,
  horizontalLines = 100,
  verticalLines = 100,
  borderColor = "gray"
) {
  const container = document.createElement("div");
  container.id = "pageGridMain";
  container.className = "pageGridContainer";

  for (i = 0; i < horizontalLines; i += 1) {
    const row = document.createElement("div");
    row.className = "pageGridRow";
    row.id = `pageGridRow${i}`;
    row.style.top = `${i}rem`;

    for (k = 0; k < verticalLines; k += 1) {
      const box = document.createElement("div");
      box.className = "pageGridBox";
      box.style.borderColor = borderColor;
      box.style.left = `${k}rem`;
      row.appendChild(box);
    }

    container.appendChild(row);
  }

  el.appendChild(container);
}

// grid(document.body, 100, 100, 'rgba(150,150,150,0.1)');

const { createApp } = Vue;

const SelectDropdown = {
  name: "SelectDropdown",
  props: {
    value: {
      type: Object,
      default() {
        return { none: "none" };
      },
    },
    options: {
      type: Array,
      default() {
        return [
          {
            display: "No choice",
            value: null,
          },
          {
            display: "No choice2",
            value: null,
          },
          {
            display: "No choice3",
            value: null,
          },
          {
            display: "No choice4",
            value: null,
          },
        ];
      },
    },
    onSelectionChanged: {
      type: Function,
      default() {
        return function (option) {
          console.log("value selected: ", option);
        };
      },
    },
    positionCenter: {
      type: Boolean,
      default() {
        return false;
      },
    },
    valueProperty: {
      type: String,
      default() {
        return "value";
      },
    },
    displayedProperty: {
      type: String,
      default() {
        return "display";
      },
    },
  },
  data() {
    return {
      usePropValue: this.value !== { none: "none" },
      currentSelected:
        this.value == { none: "none" } ? this.options[0] : this.value,
      dropdownVisible: false,
    };
  },
  methods: {
    onSelected(option) {
      console.log(option);
      if (this.usePropValue) {
        this.currentSelected = option;
      }
      this.$emit("change", option);
      this.dropdownVisible = false;
    },
  },
  watch: {
    value(newValue) {
      this.currentSelected = newValue;
    },
  },

  template: `
            <div class="position-relative selectComponent" style="width:75px">
    <div
      class="dropdownButton p-0 m-0 d-flex"
      @click="dropdownVisible = !dropdownVisible"
    >
      <slot :item="currentSelected" name="itemModel">
        <div class="d-inline-block">
            <div class="d-inline-block countryIcon countryIconRounded me-1">
                        <img height="15" :src="currentSelected.svgIcon" :alt="currentSelected.name" />
                    </div>
                    <div class="d-inline-block countryName"> 
                        {{ currentSelected.selectedDisplay }}
                    </div>
        </div>
      </slot>
      <slot name="dropDownIcon">
        <span class="material-icons-outlined ms-1"
          style="position: relative;font-size:15px; top: -1px; width: 10px">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" ><path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"/></svg>
        </span>
      </slot>
    </div>
    <div
      class="overlay position-fixed w-100 h-100"
      @click="dropdownVisible = false"
      v-show="dropdownVisible"
    ></div>
    <div
      class="dropdown px-3 py-2"
      :class="{
        dropdownVisible: dropdownVisible,
        positionCenter: positionCenter,
      }"
    >
      <div
        class="d-block"
        v-for="(optionItem, optionIndex) in options"
        :key="optionIndex"
        @click="onSelected(optionItem)"
      >
        <slot name="option" :item="optionItem">
          <div
            class="option px-2 py-1 my-1 d-flex justify-content-between"
            :class="{
              activeOption:
                (optionItem[valueProperty] || optionItem.value) ==
                (currentSelected[valueProperty] || currentSelected.value),
            }"
          >
            <div class="optionDisplay">
                
              <slot name="itemModel" :item="optionItem">
                <div class="d-inline-block">
                    <div class="d-inline-block countryIcon me-2">
                        <img height="15" :src="optionItem.svgIcon" :alt="optionItem.name" />
                    </div>
                    <div class="d-inline-block countryName"> 
                        {{  optionItem.display }}
                    </div>
                </div>
              </slot>
            </div>
            <div class="ms-3">
              <span class="material-icons-outlined mx-auto selectedIcon"
          style="color:#1FBAD6; top: -2px">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#1FBAD6"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"/></svg>
        </span>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>`,
};

const app = {
  data() {
    return {
      $Commons: Commons,
      $Controller: Controller,
      product,
      serverBaseUrl,
      assetsPath,
      productDownloadUrl: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      countryCode: "",
      selectedPaymentMethod: {
        name: "",
        percentFee: 0,
      },
      fillMobileForm: false,
      selectedCountry: {
        name: "",
        code: "",
        display: "",
        value: "",
        currency: "",
        paymentMethods: [],
      },
      countries: [
        {
          name: "Benin",
          code: "229",
          display: "Benin",
          selectedDisplay: "+229",
          value: "229",
          currency: "XOF",
          svgIcon: `${assetsPath}/images/bj.svg`,
          paymentMethods: [
            {
              name: "MTN",
              percentFee: 2,
            },
            {
              name: "MOOV",
              percentFee: 2,
            },
          ],
          phoneNumberFormatting: {
            tooLongPhoneNumberTestingRegex: /\d{8}./,
            toStringRegexReplacements: [
              {
                from: /(\d{2})/g,
                to: "$1-",
              },
              {
                from: /^(.{11}).+?/,
                to: "$1",
              },
            ],
          },
        },
        {
          name: "Burkina Faso",
          code: "225",
          display: "Burkina Faso",
          selectedDisplay: "+225",
          value: "225",
          currency: "XOF",
          svgIcon: `${assetsPath}/images/bf.svg`,
          paymentMethods: [
            {
              name: "ORANGE",
              percentFee: 2,
            },
            {
              name: "MOOV",
              percentFee: 2,
            },
          ],
          phoneNumberFormatting: {
            tooLongPhoneNumberTestingRegex: /\d{8}./,
            toStringRegexReplacements: [
              {
                from: /(\d{2})/g,
                to: "$1-",
              },
              {
                from: /^(.{11}).+?/,
                to: "$1",
              },
            ],
          },
        },
        {
          name: "Cote d'ivoire",
          code: "225",
          display: "Cote d'ivoire",
          selectedDisplay: "+225",
          value: "225",
          currency: "XOF",
          svgIcon: `${assetsPath}/images/ci.svg`,
          paymentMethods: [
            {
              name: "MTN",
              percentFee: 2,
            },
            {
              name: "ORANGE",
              percentFee: 2,
            },
          ],
          phoneNumberFormatting: {
            tooLongPhoneNumberTestingRegex: /\d{10}./,
            toStringRegexReplacements: [
              {
                from: /^(\d{3})/,
                to: "$1-",
              },
              {
                from: /(-\d{3})/,
                to: "$1-",
              },
              {
                from: /^(.{12}).+?/,
                to: "$1",
              },
            ],
          },
        },
        {
          name: "Cameroun",
          code: "237",
          display: "Cameroun",
          selectedDisplay: "+237",
          value: "237",
          currency: "XAF",
          svgIcon: `${assetsPath}/images/cm.svg`,
          paymentMethods: [
            {
              name: "MTN",
              percentFee: 2,
            },
            {
              name: "ORANGE",
              percentFee: 2,
            },
          ],
          phoneNumberFormatting: {
            tooLongPhoneNumberTestingRegex: /\d{9}./,
            toStringRegexReplacements: [
              {
                from: /^(\d{3})/,
                to: "$1-",
              },
              {
                from: /(-\d{3})/,
                to: "$1-",
              },
              {
                from: /^(.{12}).+?/,
                to: "$1",
              },
            ],
          },
        },
        {
          name: "Senegal",
          code: "221",
          display: "Senegal",
          selectedDisplay: "+221",
          value: "221",
          currency: "XOF",
          svgIcon: `${assetsPath}/images/sn.svg`,
          paymentMethods: [
            {
              name: "FREE",
              percentFee: 2,
            },
            {
              name: "ORANGE",
              percentFee: 2,
            },
          ],
          phoneNumberFormatting: {
            tooLongPhoneNumberTestingRegex: /\d{9}./,
            toStringRegexReplacements: [
              {
                from: /^(\d{3})/,
                to: "$1-",
              },
              {
                from: /(-\d{3})/,
                to: "$1-",
              },
              {
                from: /^(.{12}).+?/,
                to: "$1",
              },
            ],
          },
        },
        {
          name: "Togo",
          code: "228",
          display: "Togo",
          selectedDisplay: "+228",
          value: "228",
          currency: "XoF",
          svgIcon: `${assetsPath}/images/tg.svg`,
          paymentMethods: [
            {
              name: "MOOV",
              percentFee: 2,
            },
          ],
          phoneNumberFormatting: {
            tooLongPhoneNumberTestingRegex: /\d{8}./,
            toStringRegexReplacements: [
              {
                from: /(\d{2})/g,
                to: "$1-",
              },
              {
                from: /^(.{11}).+?/,
                to: "$1",
              },
            ],
          },
        },
      ],
      fillCheckoutStep: true,
      currentTransactionStatusCode: 0,
      currentTransactionStatusMessage: {
        status: "progress",
        message: "none",
        title: "",
        description: "",
        code: 0,
      },
      currentTransactionEvolutionPercent: 0,
      transactionEvolutionPercents: {
        202: 15,
        201: 40,
        203: 60,
        204: 80,
        200: 100,
      },
      transactionStatusMessages: [
        {
          status: "success",
          message: "Successfully processed transaction",
          title: "Paiement effectué",
          description: "Paiement a réussi",
          code: 200,
        },
        {
          status: "pending",
          message: "Data in validation",
          title: "Veuillez patientez",
          description: "Nous vérifions les informations",
          code: 201,
        },
        {
          status: "pending",
          message: "Transaction is pending",
          title: "Veuillez patientez",
          description: "Nous analysons les informations",
          code: 202,
        },
        {
          status: "pending",
          message: "Data are validated, payment server is working",
          title: "Veuillez patientez",
          description: "Nous initialisons le paiement",
          code: 203,
        },
        {
          status: "pending",
          message: "Waiting for ussd push validation",
          title: "Confirmez",
          description: "Nous attendons que vous validez le paiement",
          code: 204,
        },
        {
          status: "error",
          message: "Incorrect data enter in the request",
          title: "Paiement non effectué",
          description:
            "Vos informations sont mal remplies. Veuillez revérifier puis réessayez",
          code: 400,
        },
        {
          status: "error",
          message: "Parameters not complete",
          title: "Paiement non effectué",
          description: "Vérifiez vos informations et réessayez",
          code: 401,
        },
        {
          status: "error",
          message: "Payment PhoneNumber is not correct",
          title: "Paiement non effectué",
          description: "Votre numéro de téléphone semble incorrecte",
          code: 402,
        },
        {
          status: "error",
          message: "Timeout in USSD PUSH/ Cancel in USSD PUSH",
          title: "Paiement non effectué",
          description:
            "Vous avez rejeté la confirmation de paiement ou l'avez raté",
          code: 404,
        },
        {
          status: "error",
          message: "Payment phoneNumber got is not for mobile money wallet",
          title: "Paiement non effectué",
          description:
            "Votre numéro de téléphone ne pas etre lié à un compte mobile money. Réessayez avec un numéro correcte",
          code: 406,
        },
        {
          status: "error",
          message: "Payer’s payment account balance is low",
          title: "Paiement non effectué",
          description:
            "Vous avez un solde insuffisant pour ce paiement. Réessayez dès que possible",
          code: 460,
        },
        {
          status: "error",
          message: "An error occured while paying",
          title: "Paiement non effectué",
          description:
            "Impossible d'effectuer ce paiement maintenant. Veuillez réessayer ou contacter le vendeur du produit",
          code: 461,
        },
        {
          status: "error",
          message:
            "This kind of transaction is not supported yet, processor not found",
          title: "Paiement non effectué",
          description:
            "Vérifiez vos informations et réessayez ou contactez le vendeur du produit",
          code: 462,
        },
        {
          status: "error",
          message: "An unknow error occured on the api",
          title: "Paiement non effectué",
          description:
            "Veuillez vérifier vos informations et réessayer dans quelques minutes ",
          code: 500,
        },
      ],
    };
  },
  mounted() {
    this.selectedCountry = this.countries[0];
    this.selectedPaymentMethod = this.selectedCountry.paymentMethods[0];
  },
  methods: {
    async checkout() {
      this.fillCheckoutStep = false;
      this.currentTransactionStatusCode = 202;
      const phoneNumber = `${
        this.selectedCountry.code
      }${this.phoneNumber.replace(/[^\d]/g, "")}`;

      const collectionData = {
        senderFirstName: this.firstName,
        senderLastName: this.lastName,
        senderPhoneNumber: phoneNumber,
        amount: this.totalAmount,
        currency: this.product.currency,
        webhookUrl: webhookUrl,
        // email: this.email,
        // paymentMethod: this.selectedPaymentMethod.name,
      };

      const collectionResponse = await Controller.createTransaction(
        collectionData
      );
      if (!collectionResponse.success) {
        this.currentTransactionStatusCode = 500;
        return;
      }
      this.currentTransactionStatusCode =
        collectionResponse.payment.statusMessageCode;
      const collectionReference = collectionResponse.payment.reference;
      this.checkCollectionStatus(collectionReference);
    },
    async checkCollectionStatus(collectionReference) {
      const statusResponse = await Controller.checkStatus(collectionReference);
      const statusCode = statusResponse.transaction?.statusMessageCode || 500;
      this.currentTransactionStatusCode = statusCode;

      const status = statusResponse.transaction.status;
      const collectionPending = /pending/i.test(status);
      if (!collectionPending) return;

      setTimeout(this.checkCollectionStatus, 2000, collectionReference);
    },

    formatAmount(amount, currency) {
      const formatter = new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: /(xof)|(xaf)/i.test(currency) ? 0 : 2,
        maximumFractionDigits: /(xof)|(xaf)/i.test(currency) ? 0 : 2,
      });

      return formatter.format(amount).replace(/[a-zA-Z ]+/g, "");
    },

    currencySymbol(currencyCode) {
      return Commons.getCurrencySymbolFrom(currencyCode);
    },

    sendTransactionStateChangedEvent() {
      const paymentChanged = "chipdealsIframeEvent-paymentStateChanged";
      var collectionData = {
        status: this.currentTransactionStatusMessage.status,
        message: this.currentTransactionStatusMessage.message,
        title: this.currentTransactionStatusMessage.title,
        description: this.currentTransactionStatusMessage.description,
        code: this.currentTransactionStatusMessage.code,
      };
      var messageData = {
        name: paymentChanged,
        detail: collectionData,
      };
      window.parent.postMessage(messageData, "*");
    },
  },
  watch: {
    selectedCountry() {
      this.phoneNumber = "";
      this.selectedPaymentMethod = this.selectedCountry.paymentMethods[0];
    },
    phoneNumber(newValue, oldValue) {
      if (/[^\d-]/.test(newValue)) {
        this.phoneNumber = oldValue;
        return;
      }
      const newPhoneNumber = newValue.replace(/[^\d]/g, "");
      if (
        this.selectedCountry.phoneNumberFormatting.tooLongPhoneNumberTestingRegex.test(
          newPhoneNumber
        )
      ) {
        this.phoneNumber = oldValue;
        return;
      }
      let stringParsedPhone = newPhoneNumber;
      this.selectedCountry.phoneNumberFormatting.toStringRegexReplacements.map(
        (regexReplacement) => {
          stringParsedPhone = stringParsedPhone.replace(
            regexReplacement.from,
            regexReplacement.to
          );
        }
      );
      if (`${newValue}-` == oldValue) {
        stringParsedPhone = stringParsedPhone.replace(/(.+)../, "$1");
      }
      console.log(stringParsedPhone);
      if (oldValue == stringParsedPhone) {
        return;
      }
      this.phoneNumber = stringParsedPhone;
    },
    currentTransactionStatusCode(newCode) {
      const evolution = this.transactionEvolutionPercents[newCode];
      if (evolution) {
        this.currentTransactionEvolutionPercent = evolution;
      }
      let newStatusMessage = this.transactionStatusMessages.find(
        (statusMessage) => statusMessage.code == newCode
      );
      if (!newStatusMessage) {
        newStatusMessage = this.transactionStatusMessages.find(
          (statusMessage) => statusMessage.code == 500
        );
      }
      this.currentTransactionStatusMessage = newStatusMessage;
      this.sendTransactionStateChangedEvent();
    },
  },
  computed: {
    productFee() {
      // return (this.product.amount * this.selectedPaymentMethod.percentFee) / 100;
      return this.amountToPay - this.product.amount;
    },
    amountToPay() {
      // return this.product.amount + this.productFee;
      return Math.ceil(
        this.product.amount / (1 - this.selectedPaymentMethod.percentFee / 100)
      );
    },

    fee() {
      let fee = 0;
      if (this.product.addFeesToUser) {
        fee = 1.9;
      }
      return fee;
    },
    feeAmount() {
      const fee = (this.product.amount * this.fee) / 100;
      return Math.ceil(fee);
    },
    totalAmount() {
      const total = this.product.amount + this.feeAmount;
      return Math.ceil(total);
    },
  },
};
createApp(app).component("select-dropdown", SelectDropdown).mount("#app");
