const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  publicPath: '/vue-todo-app/',
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  }
}
