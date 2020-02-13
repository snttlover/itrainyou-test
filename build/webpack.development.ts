import * as merge from 'webpack-merge'
import {HotModuleReplacementPlugin} from 'webpack'
import * as commonConfig from './webpack.common'

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: ['webpack-hot-middleware/client', (commonConfig as any).entry as string],
  plugins: [
    new HotModuleReplacementPlugin()
  ]
})
