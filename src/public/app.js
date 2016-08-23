/*
* Module dependencies
*/

class Buscador {
  constructor() {
    this.apiVersion = 'v1'
    this.URIBase = `/api/${this.apiVersion}/properties`
    this.customSearch = false
    this.setSearch()
    this.listenSearchButton()
    this.getAndSetInitialData()
    $("#rangoPrecio").ionRangeSlider({
      type: "double",
      grid: false,
      min: 0,
      max: 100000,
      from: 1000,
      to: 20000,
      prefix: "$"
    })
  }

  setSearch() {
    let busqueda = $('#checkPersonalizada')
    busqueda.on('change', (e) => {
      if (this.customSearch == false) {
        this.customSearch = true
      } else {
        this.customSearch = false
      }
      $('#personalizada').toggleClass('invisible')
    })
  }

  getAndSetInitialData() {
    this.ajaxRequest(`${this.URIBase}/data`, 'GET', {})
        .done((data) => {
          this.setSelectsData(data)
        })
        .fail((error) => {
          console.error(error)
        })
  }

  setSelectsData(data) {
    let ciudades = $('#ciudad')
    let tipos = $('#tipo')

    $.each(data.ciudades, (i, ciudad) => {
      ciudades.append(`<option value="${ciudad}">${ciudad}</option>`)
    })

    $.each(data.tipos, (i, tipo) => {
      tipos.append(`<option value="${tipo}">${tipo}</option>`)
    })

    $('select').material_select()
  }

  ajaxRequest(url, type, data) {
    return $.ajax({
      url: url,
      data: data,
      type: type,
      beforeSend: () => {

      },
      success: () => {

      }
    })
  }

  listenSearchButton() {
    let btn = $('#buscar')
    btn.on('click', (e) => {
      if (this.customSearch == false) {
        this.ajaxRequest(this.URIBase, 'GET', {})
            .done((data) => {
              this.renderProperties(data)
            })
            .fail((error) => {
              console.error(error)
            })
      } else {
        let precios = $('#rangoPrecio').val().split(';');
        let ciudad = $('#ciudad').val(),
            tipo   = $('#tipo').val(),
            precioUno = precios[0],
            precioDos = precios[1];

        let criteria = {
          ciudad: ciudad,
          tipo: tipo,
          precioUno: precioUno,
          precioDos: precioDos
        }
        this.ajaxRequest(`${this.URIBase}/search`, 'GET', criteria)
            .done((data) => {
              this.renderProperties(data)
            })
            .fail((error) => {
              console.error(error)
            })
      }
    })
  }

  renderProperties(properties) {
    let propertyList = $('.lista')
    propertyList.empty()
    properties.map((prop) => {
      let template = `<div class="card horizontal">
                        <div class="card-image">
                          <img src="img/home.jpg">
                        </div>
                        <div class="card-stacked">
                          <div class="card-content">
                            <div>
                              <b>Direccion: </b><span>${prop.Direccion}</span>
                            </div>
                            <div>
                              <b>Ciudad: </b><span>${prop.Ciudad}</span>
                            </div>
                            <div>
                              <b>Telefono: </b><span>${prop.Telefono}</span>
                            </div>
                            <div>
                              <b>Código postal: </b><span>${prop.Codigo_Postal}</span>
                            </div>
                            <div>
                              <b>Precio: </b><span>${prop.Precio}</span>
                            </div>
                            <div>
                              <b>Tipo: </b><span>${prop.Tipo}</span>
                            </div>
                          </div>
                        </div>
                      </div>`;
       propertyList.append(template)
    })
  }
}

const App = new Buscador()
