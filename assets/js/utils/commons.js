function setCookie(cname, cvalue, expiresMin) {
  const d = new Date();
  d.setTime(d.getTime() + expiresMin * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function cookieExists(cname) {
  const cookie = getCookie(cname);
  return !!cookie;
}

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
    return process.env.NODE_ENV !== 'development';
  }

  static initGlobalVariables() {
    window.chipdeals = {};
    window.chipdeals.mixpanel = {
      track: () => {
        console.error(new Error('Please, init analytics before'));
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
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let displayDate = '';
    displayDate += `${monthNames[date.getUTCMonth()].replace(/^(.{3}).+/, '$1')} `;
    // displayDate += ('0' + (date.getUTCMonth() + 1)).replace(/.+(.{2})$/, '$1') + '-';
    displayDate += `${(`0${date.getUTCDate()}`).replace(/.+(.{2})$/, '$1')} `;
    displayDate += date.getUTCFullYear();
    if (addHours) {
      displayDate += ', ';
      displayDate += `${(`0${date.getUTCHours()}`).replace(/.+(.{2})$/, '$1')}:`;
      displayDate += `${(`0${date.getUTCMinutes()}`).replace(/.+(.{2})$/, '$1')}:`;
      displayDate += (`0${date.getUTCSeconds()}`).replace(/.+(.{2})$/, '$1');
    }
    return displayDate;
  }
}
