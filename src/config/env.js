const config = {
  dev: {
    api: "https://dev.tokenwars.org/mystery-web-admin",
  },
  test: {
    api: "https://dev.tokenwars.org/mystery-web-admin",
  },
  pre: {
    api: "https://dev.tokenwars.org/mystery-web-admin",
  },
  pro: {
    api: "https://dev.tokenwars.org/mystery-web-admin",
  },
};

export default {
  ENV: process.env.VUE_APP_DOMAIN_CONFIG,
  ...config[process.env.VUE_APP_DOMAIN_CONFIG],
};
