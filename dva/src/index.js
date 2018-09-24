import dva, { connect } from 'dva'
import createLoading from 'dva-loading'
import './index.html'
import './index.less'

// Initialize
const app = dva()

// Plugin
app.use(createLoading())

// Model
app.model(require('./models/item/item'))
app.model(require('./models/user/user'))

// Router
app.router(require('./router'))

// Start
app.start('#root')
