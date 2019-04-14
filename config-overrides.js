const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", libraryDirectory: "es", style: true }],
    config
  );
  config = injectBabelPlugin(
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
    config
  );
  config = injectBabelPlugin("@babel/plugin-proposal-class-properties", config);
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@body-background": "#282c34",
      "@component-background": "#282c34",
      "@text-color": "fade(#fff, 95%)",
      "@text-color-secondary": "fade(#fff, 85%)",
      "@btn-default-bg": "#282c34",
      "@primary-color": "#bd82ed",
      "@menu-item-active-border-width": "0px",
      "@heading-color": "#fff",
      "@layout-body-background": "#282c34",
      "@layout-header-background": "#2f3136",
      "@layout-header-padding": "0 0 0 0",
      "@layout-header-height": "52px",
      "@input-bg": "#2f333d ",
      "@input-placeholder-color": "#e6e6e6"
    },
    javascriptEnabled: true
  })(config, env);
  return config;
};
