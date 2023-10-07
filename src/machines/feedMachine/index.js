import machine from './machine'
import * as actions from './actions'
import * as services from './services'

export default machine.withConfig({
    actions, 
    services
})