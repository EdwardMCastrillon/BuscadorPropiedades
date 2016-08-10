import path from 'path'

// Debemos salir del directorio dist/ creado por el bundle de babel y buscar el archivo json en server/
const dataDirectory = path.join(__dirname, '../../../server/storage/data.json')
var data = require(dataDirectory)

export const findByCriteria = (criteria) => {
  let { ciudad, tipo, precio } = criteria
  let allResult = []

  allResult = data.filter((property) => {
    // Posibles combinaciones sobre los 3 parametros
    if (ciudad !== "" && tipo !== "" && precio !== "") {
      // Ciudad, Tipo y Precio
      if (property.Ciudad == ciudad && property.Tipo == tipo && property.Precio == precio) return property
    } else if (ciudad !== "" && tipo !== "" && precio == "") {
      // Ciudad y Tipo
      if (property.Ciudad == ciudad && property.Tipo == tipo) return property
    } else if (ciudad !== "" && tipo == "" && precio !== "") {
      // Ciudad y Precio
      if (property.Ciudad == ciudad && property.Precio == precio) return property
    } else if (ciudad == "" && tipo !== "" && precio == "") {
      // Tipo y Precio
      if (property.Tipo == tipo && property.Precio) return property
    } else if (ciudad !== "" && tipo == "" && precio == "") {
      // Ciudad
      if (property.Ciudad == ciudad) return property
    } else if (ciudad == "" && tipo !== "" && precio == "") {
      // Tipo
      if (property.Tipo == tipo) return property
    } else if (ciudad == "" && tipo == "" && precio !== "") {
      // Precio
      if (property.Precio == precio) return property
    }
  })

  return allResult
}

export const findAll = () => {
  return data
}
