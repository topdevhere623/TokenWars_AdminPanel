const config = {
  dev: {
    api: "http://34.247.193.168:6601/mystery-web-admin",
  },
  test: {
    api: "http://34.247.193.168:6601/mystery-web-admin",
  },
  pre: {
    api: "http://34.247.193.168:6601/mystery-web-admin",
  },
  pro: {
    api: "http://34.247.193.168:6601/mystery-web-admin",
  },
};

export default {
  ENV: process.env.VUE_APP_DOMAIN_CONFIG,
  ...config[process.env.VUE_APP_DOMAIN_CONFIG],
};
