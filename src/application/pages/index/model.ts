import {appDomain} from '../../store'
import axios from 'axios'

const indexPageDomain = appDomain.createDomain('index-page-domain')

const fetchUser = indexPageDomain.createEffect({
  async handler(id: string) {
    return axios(`https://jsonplaceholder.typicode.com/users/${id}`)
  }
})

const $userName = indexPageDomain.createStore('unknown')
