import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const response = axios.get(baseUrl)

  return response.then(response => response.data)
}

const create = (newObject) => {
  const response = axios.post(baseUrl, newObject)
  
  return response.then(response => response.data)
}

const update = (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject)

  return response.then(response => response.data)
}

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const exportObject = {
  getAll,
  create,
  update,
  deleteContact
};

export default exportObject