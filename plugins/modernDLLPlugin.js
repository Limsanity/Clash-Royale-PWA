class ModernDLLPlugin {
  constructor(isModule) {
    this.isModule = isModule
  }

  apply(compiler) {
    const id = 'ModernDLLPlugin'
    compiler.hooks.compilation.tap(id, compilation => {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(id, data => {
        data.html = data.html.replace(/<script type=module src=\/dll/, '<script src=/dll')
        data.html = data.html.replace(/<script src=\/dll\/vendor\.\w*\.js nomodule><\/script>/, '')
      })
    })
  }
}

module.exports = ModernDLLPlugin
