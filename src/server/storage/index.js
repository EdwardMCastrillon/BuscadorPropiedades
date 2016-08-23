import path from 'path'

// Debemos salir del directorio dist/ creado por el bundle de babel y buscar el archivo json en server/
const dataDirectory = path.join(__dirname, '../../../../src/server/storage/data.json')

var data = require(dataDirectory)

export const findByCriteria = (criteria) => {
  let { ciudad, tipo, precioUno, precioDos } = criteria
  let precio1 = Number(precioUno)
  let precio2 = Number(precioDos)
  let allResult = []
  allResult = data.filter((property) => {
    let precioCompleto = property.Precio.split(',')
    let precio = precioCompleto[0] + precioCompleto[1]
    let precioReal = Number(precio.split('$')[1])
    // Posibles combinaciones sobre los 3 parametros
    if (ciudad !== "" && tipo !== "" && precio1 !== "") {
      // Busqueda por: Ciudad, Tipo y Precio
      if (property.Ciudad == ciudad && property.Tipo == tipo &&
          precioReal> precio1 && precioReal< precio2) return property
    } else if (ciudad !== "" && tipo !== "" && precio1 == "") {
      // Busqueda por: Ciudad y Tipo
      if (property.Ciudad == ciudad && property.Tipo == tipo) return property
    } else if (ciudad !== "" && tipo == "" && precio1 !== "") {
      // Busqueda por: Ciudad y Precio
      if (property.Ciudad == ciudad && precioReal> precio1 && precioReal< precio2) return property
    } else if (ciudad == "" && tipo !== "" && precio1 == "") {
      // Busqueda por: Tipo y Precio
      if (property.Tipo == tipo && precioReal> precio1 && precioReal< precio2) return property
    } else if (ciudad !== "" && tipo == "" && precio1 == "") {
      // Busqueda por: Ciudad
      if (property.Ciudad == ciudad) return property
    } else if (ciudad == "" && tipo !== "" && precio1 == "") {
      // Busqueda por: Tipo
      if (property.Tipo == tipo) return property
    } else if (ciudad == "" && tipo == "" && precio1 !== "") {
      // Busqueda por: Precio
      if (precioReal> precio1 && precioReal< precio2) return property
    }
  })

  return allResult.length > 0 ? allResult : { mensaje: 'No se encontraron propiedades con estas caracteristicas'}

}

export const findAll = () => {
  return data
}


export const getInitialData = () => {
  let currentData = {
    ciudades: [],
    tipos: []
  }
  data.map((prop) => {
    if (currentData.ciudades.indexOf(prop.Ciudad) == -1) {
      currentData.ciudades.push(prop.Ciudad)
    }

    if (currentData.tipos.indexOf(prop.Tipo) == -1) {
      currentData.tipos.push(prop.Tipo)
    }
  })
  return currentData
}
