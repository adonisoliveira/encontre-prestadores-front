import axios from 'axios'

const API = axios.create({
  baseURL: process.env.URL_API
}),
API_CEP = axios.create({
  baseURL: process.env.URL_API_CEP
})

async function request(...params) {
  const api = params[0]
  const method = params[1]

  params.splice(0, 2)

  try
  {
    switch(method.toLowerCase())
    {
      case 'post':
        return await api.post(...params)

      case 'put':
        return await api.put(...params)

      case 'patch':
        return await api.patch(...params)

      case 'delete':
        return await api.delete(...params)

      default:
        return await api.get(...params)
    }
  }
  catch(error)
  {
    return error.response
  }
}

export {
  API,
  API_CEP,
  request
}
