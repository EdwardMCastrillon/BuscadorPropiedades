import path from 'path'

// Debemos salir del directorio dist/ creado por el bundle de babel y buscar el archivo json en server/
const dataDirectory = path.join(__dirname, '../../../../src/server/storage/data.json')
const data = require(dataDirectory)

export const findByCriteria = (criteria) => {
  let { ciudad, tipo, precio1, precio2 } = criteria
  let allResult = []

  allResult = data.filter((property) => {
    // Posibles combinaciones sobre los 3 parametros
    if (ciudad !== "" && tipo !== "" && precio1 !== "") {
      // Busqueda por: Ciudad, Tipo y Precio
      if (property.Ciudad == ciudad && property.Tipo == tipo &&
          property.Precio > precio1 && property.Precio < precio2) return property
    } else if (ciudad !== "" && tipo !== "" && precio1 == "") {
      // Busqueda por: Ciudad y Tipo
      if (property.Ciudad == ciudad && property.Tipo == tipo) return property
    } else if (ciudad !== "" && tipo == "" && precio1 !== "") {
      // Busqueda por: Ciudad y Precio
      if (property.Ciudad == ciudad && property.Precio > precio1 && property.Precio < precio2) return property
    } else if (ciudad == "" && tipo !== "" && precio1 == "") {
      // Busqueda por: Tipo y Precio
      if (property.Tipo == tipo && property.Precio > precio1 && property.Precio < precio2) return property
    } else if (ciudad !== "" && tipo == "" && precio1 == "") {
      // Busqueda por: Ciudad
      if (property.Ciudad == ciudad) return property
    } else if (ciudad == "" && tipo !== "" && precio1 == "") {
      // Busqueda por: Tipo
      if (property.Tipo == tipo) return property
    } else if (ciudad == "" && tipo == "" && precio1 !== "") {
      // Busqueda por: Precio
      if (property.Precio > precio1 && property.Precio < precio2) return property
    }
  })

  return allResult
}

export const findAll = () => {
  return data
}
