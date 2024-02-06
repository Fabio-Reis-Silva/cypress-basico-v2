const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implemente os event listeners aqui
    },
  },
  component: {
    setupNodeEvents(on, config) {
      // implemente os event listeners aqui para a configuração de componente
    },
  },
  viewportHeight: 800,
  viewportWidth: 1280,
});
