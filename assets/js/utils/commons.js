function setCookie(cname, cvalue, expiresMin) {
  const d = new Date();
  d.setTime(d.getTime() + expiresMin * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function cookieExists(cname) {
  const cookie = getCookie(cname);
  return !!cookie;
}

const stringCurrencies = `[{"name": "United Arab Emirates Dirham","code": "AED","symbol": "د.إ"},{"name": "Albanian Lek","code": "ALL","symbol": "L"},{"name": "Netherlands Antillean Guilder","code": "ANG","symbol": "ƒ"},{"name": "Argentine Peso","code": "ARS","symbol": "$"},{"name": "Australian Dollar","code": "AUD","symbol": "$"},{"name": "Aruban Florin","code": "AWG","symbol": "ƒ"},{"name": "Barbadian Dollar","code": "BBD","symbol": "$"},{"name": "Bangladeshi Taka","code": "BDT","symbol": "৳"},{"name": "Bulgarian Lev","code": "BGN","symbol": "лв"},{"name": "Bahraini Dinar","code": "BHD","symbol": ".د.ب"},{"name": "Burundian Franc","code": "BIF","symbol": "FBu"},{"name": "Bermudan Dollar","code": "BMD","symbol": "$"},{"name": "Brunei Dollar","code": "BND","symbol": "$"},{"name": "Bolivian Boliviano","code": "BOB","symbol": "$b"},{"name": "Bahamian Dollar","code": "BSD","symbol": "$"},{"name": "Bhutanese Ngultrum","code": "BTN","symbol": "Nu."},{"name": "Botswanan Pula","code": "BWP","symbol": "P"},{"name": "Belarusian Ruble","code": "BYN","symbol": "Br"},{"name": "Belize Dollar","code": "BZD","symbol": "BZ$"},{"name": "Canadian Dollar","code": "CAD","symbol": "$"},{"name": "Swiss Franc","code": "CHF","symbol": "CHF"},{"name": "Chilean Peso","code": "CLP","symbol": "$"},{"name": "Chinese Yuan","code": "CNY","symbol": "¥"},{"name": "Colombian Peso","code": "COP","symbol": "$"},{"name": "Costa Rican Colón","code": "CRC","symbol": "₡"},{"name": "Cuban Peso","code": "CUP","symbol": "₱"},{"name": "Cape Verdean Escudo","code": "CVE","symbol": "$"},{"name": "Czech Republic Koruna","code": "CZK","symbol": "Kč"},{"name": "Djiboutian Franc","code": "DJF","symbol": "Fdj"},{"name": "Danish Krone","code": "DKK","symbol": "kr"},{"name": "Dominican Peso","code": "DOP","symbol": "RD$"},{"name": "Algerian Dinar","code": "DZD","symbol": "دج"},{"name": "Egyptian Pound","code": "EGP","symbol": "£"},{"name": "Ethiopian Birr","code": "ETB","symbol": "Br"},{"name": "Euro","code": "EUR","symbol": "€"},{"name": "Fijian Dollar","code": "FJD","symbol": "$"},{"name": "Falkland Islands Pound","code": "FKP","symbol": "£"},{"name": "British Pound Sterling","code": "GBP","symbol": "£"},{"name": "Ghanaian Cedi","code": "GHS","symbol": "GH₵"},{"name": "Gambian Dalasi","code": "GMD","symbol": "D"},{"name": "Guinean Franc","code": "GNF","symbol": "FG"},{"name": "Guatemalan Quetzal","code": "GTQ","symbol": "Q"},{"name": "Guyanaese Dollar","code": "GYD","symbol": "$"},{"name": "Hong Kong Dollar","code": "HKD","symbol": "$"},{"name": "Honduran Lempira","code": "HNL","symbol": "L"},{"name": "Croatian Kuna","code": "HRK","symbol": "kn"},{"name": "Haitian Gourde","code": "HTG","symbol": "G"},{"name": "Hungarian Forint","code": "HUF","symbol": "Ft"},{"name": "Indonesian Rupiah","code": "IDR","symbol": "Rp"},{"name": "Israeli New Sheqel","code": "ILS","symbol": "₪"},{"name": "Indian Rupee","code": "INR","symbol": "₹"},{"name": "Iraqi Dinar","code": "IQD","symbol": "ع.د"},{"name": "Iranian Rial","code": "IRR","symbol": "﷼"},{"name": "Icelandic Króna","code": "ISK","symbol": "kr"},{"name": "Jordanian Dinar","code": "JOD","symbol": "JD"},{"name": "Japanese Yen","code": "JPY","symbol": "¥"},{"name": "Kenyan Shilling","code": "KES","symbol": "KSh"},{"name": "Kyrgystani Som","code": "KGS","symbol": "лв"},{"name": "Cambodian Riel","code": "KHR","symbol": "៛"},{"name": "Comorian Franc","code": "KMF","symbol": "CF"},{"name": "North Korean Won","code": "KPW","symbol": "₩"},{"name": "South Korean Won","code": "KRW","symbol": "₩"},{"name": "Kuwaiti Dinar","code": "KWD","symbol": "KD"},{"name": "Cayman Islands Dollar","code": "KYD","symbol": "$"},{"name": "Kazakhstani Tenge","code": "KZT","symbol": "лв"},{"name": "Laotian Kip","code": "LAK","symbol": "₭"},{"name": "Lebanese Pound","code": "LBP","symbol": "£"},{"name": "Sri Lankan Rupee","code": "LKR","symbol": "₨"},{"name": "Liberian Dollar","code": "LRD","symbol": "$"},{"name": "Lesotho Loti","code": "LSL","symbol": "M"},{"name": "Libyan Dinar","code": "LYD","symbol": "LD"},{"name": "Moroccan Dirham","code": "MAD","symbol": "MAD"},{"name": "Moldovan Leu","code": "MDL","symbol": "lei"},{"name": "Macedonian Denar","code": "MKD","symbol": "ден"},{"name": "Myanma Kyat","code": "MMK","symbol": "K"},{"name": "Mongolian Tugrik","code": "MNT","symbol": "₮"},{"name": "Macanese Pataca","code": "MOP","symbol": "MOP$"},{"name": "Mauritian Rupee","code": "MUR","symbol": "₨"},{"name": "Maldivian Rufiyaa","code": "MVR","symbol": "Rf"},{"name": "Malawian Kwacha","code": "MWK","symbol": "MK"},{"name": "Mexican Peso","code": "MXN","symbol": "$"},{"name": "Malaysian Ringgit","code": "MYR","symbol": "RM"},{"name": "Namibian Dollar","code": "NAD","symbol": "$"},{"name": "Nigerian Naira","code": "NGN","symbol": "₦"},{"name": "Nicaraguan Córdoba","code": "NIO","symbol": "C$"},{"name": "Norwegian Krone","code": "NOK","symbol": "kr"},{"name": "Nepalese Rupee","code": "NPR","symbol": "₨"},{"name": "New Zealand Dollar","code": "NZD","symbol": "$"},{"name": "Omani Rial","code": "OMR","symbol": "﷼"},{"name": "Panamanian Balboa","code": "PAB","symbol": "B/."},{"name": "Peruvian Nuevo Sol","code": "PEN","symbol": "S/."},{"name": "Papua New Guinean Kina","code": "PGK","symbol": "K"},{"name": "Philippine Peso","code": "PHP","symbol": "₱"},{"name": "Pakistani Rupee","code": "PKR","symbol": "₨"},{"name": "Polish Zloty","code": "PLN","symbol": "zł"},{"name": "Paraguayan Guarani","code": "PYG","symbol": "Gs"},{"name": "Qatari Rial","code": "QAR","symbol": "﷼"},{"name": "Romanian Leu","code": "RON","symbol": "lei"},{"name": "Russian Ruble","code": "RUB","symbol": "₽"},{"name": "Rwandan Franc","code": "RWF","symbol": "R₣"},{"name": "Saudi Riyal","code": "SAR","symbol": "﷼"},{"name": "Solomon Islands Dollar","code": "SBD","symbol": "$"},{"name": "Seychellois Rupee","code": "SCR","symbol": "₨"},{"name": "Swedish Krona","code": "SEK","symbol": "kr"},{"name": "Singapore Dollar","code": "SGD","symbol": "$"},{"name": "Saint Helena Pound","code": "SHP","symbol": "£"},{"name": "Sierra Leonean Leone","code": "SLL","symbol": "Le"},{"name": "Somali Shilling","code": "SOS","symbol": "S"},{"name": "São Tomé and Príncipe Dobra (pre-2018)","code": "STD","symbol": "Db"},{"name": "Salvadoran Colón","code": "SVC","symbol": "$"},{"name": "Syrian Pound","code": "SYP","symbol": "£"},{"name": "Thai Baht","code": "THB","symbol": "฿"},{"name": "Tunisian Dinar","code": "TND","symbol": "د.ت"},{"name": "Tongan Pa'anga","code": "TOP","symbol": "T$"},{"name": "Turkish Lira","code": "TRY","symbol": "₺"},{"name": "Trinidad and Tobago Dollar","code": "TTD","symbol": "TT$"},{"name": "New Taiwan Dollar","code": "TWD","symbol": "NT$"},{"name": "Tanzanian Shilling","code": "TZS","symbol": "TSh"},{"name": "Ukrainian Hryvnia","code": "UAH","symbol": "₴"},{"name": "Ugandan Shilling","code": "UGX","symbol": "USh"},{"name": "United States Dollar","code": "USD","symbol": "$"},{"name": "Uruguayan Peso","code": "UYU","symbol": "$U"},{"name": "Uzbekistan Som","code": "UZS","symbol": "лв"},{"name": "Venezuelan Bolívar Fuerte (Old)","code": "VEF","symbol": "Bs"},{"name": "Vietnamese Dong","code": "VND","symbol": "₫"},{"name": "Vanuatu Vatu","code": "VUV","symbol": "VT"},{"name": "Samoan Tala","code": "WST","symbol": "WS$"},{"name": "CFA Franc BEAC","code": "XAF","symbol": "FCFA"},{"name": "East Caribbean Dollar","code": "XCD","symbol": "$"},{"name": "CFA Franc BCEAO","code": "XOF","symbol": "CFA"},{"name": "CFP Franc","code": "XPF","symbol": "₣"},{"name": "Yemeni Rial","code": "YER","symbol": "﷼"},{"name": "South African Rand","code": "ZAR","symbol": "R"},{"name": "Zambian Kwacha","code": "ZMW"}]`;

class Commons {
  static isEmpty(data) {
    if (/number/.test(typeof data)) {
      return false;
    }
    if (!data) {
      return true;
    }
    if (Array.isArray(data)) {
      return data.length === 0;
    }
    const dataProperties = Object.values(data);
    return dataProperties && dataProperties.length == 0;
  }

  static isLiveEnv() {
    return process.env.NODE_ENV !== "development";
  }

  static initGlobalVariables() {
    window.chipdeals = {};
    window.chipdeals.mixpanel = {
      track: () => {
        console.error(new Error("Please, init analytics before"));
      },
    };
  }

  static setCookie(name, value, expireMin) {
    return setCookie(name, value, expireMin);
  }

  static getCookie(names) {
    return getCookie(names);
  }

  static cookieExists(name) {
    return cookieExists(name);
  }

  static buildDate(secondTimeStamp, { addHours = true } = { addHours: true }) {
    console.log(secondTimeStamp);
    const date = new Date(secondTimeStamp * 1000);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let displayDate = "";
    displayDate += `${monthNames[date.getUTCMonth()].replace(
      /^(.{3}).+/,
      "$1"
    )} `;
    // displayDate += ('0' + (date.getUTCMonth() + 1)).replace(/.+(.{2})$/, '$1') + '-';
    displayDate += `${`0${date.getUTCDate()}`.replace(/.+(.{2})$/, "$1")} `;
    displayDate += date.getUTCFullYear();
    if (addHours) {
      displayDate += ", ";
      displayDate += `${`0${date.getUTCHours()}`.replace(/.+(.{2})$/, "$1")}:`;
      displayDate += `${`0${date.getUTCMinutes()}`.replace(
        /.+(.{2})$/,
        "$1"
      )}:`;
      displayDate += `0${date.getUTCSeconds()}`.replace(/.+(.{2})$/, "$1");
    }
    return displayDate;
  }

  static getCurrencySymbolFrom(currencyCode) {
    const currencies = JSON.parse(stringCurrencies);
    const matchingCurrency = currencies.find((currency) =>
      new RegExp(currencyCode, "i").test(currency.code)
    );
    return matchingCurrency.symbol;
  }
}
