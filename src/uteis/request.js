import axios from 'axios'

//Inclui a base da URL da API em todas as chamadas axios para a API
const API = axios.create({
  baseURL: process.env.URL_API
}),
API_CEP = axios.create({
  baseURL: process.env.URL_API_CEP
})

//Realiza a requisição axios
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
  catch (error)
  {
    return error.response
  }
}

export {
  API,
  API_CEP,
  request
}
