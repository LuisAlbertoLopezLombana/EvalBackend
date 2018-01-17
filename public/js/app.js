//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
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

Buscador = (function(document, window, $) {

    return {
      apiUrl: '/buscador',
      Init: function() {
        let self = this
        setSearch()
        let busqueda = $('#buscar')
        busqueda.on('click', (e) => {
          if(this.customSearch) self.getBienesRaices();
        })


      },
      getBienesRaices: function() {
        let self = this
        let endpoint = self.apiUrl + '/bienes'
        self.ajaxRequest(endpoint, 'GET', {})
          .done(function(data) {
            let cards = ''
            for (i = 0; i < data.length; i++) {
              cards += `<div class="card horizontal">
                <div class="card-image">
                  <img src="img/home.jpg">
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                    <div>
                      <b>Direccion: ${data[i].Direccion} </b><p></p>
                    </div>
                    <div>
                      <b>Ciudad: ${data[i].Ciudad}</b><p></p>
                    </div>
                    <div>
                      <b>Telefono: ${data[i].Telefono}</b><p></p>
                    </div>
                    <div>
                      <b>Código postal: ${data[i].Codigo_Postal}</b><p></p>
                    </div>
                    <div>
                      <b>Precio: ${data[i].Precio}</b><p></p>
                    </div>
                    <div>
                      <b>Tipo: ${data[i].Tipo}</b><p></p>
                    </div>
                  </div>
                </div>
              </div>`
            }
            $(".lista").append(cards);
          }).fail(function(err) {
            console.log('ERROR: ',err)
          })
      },
      ajaxRequest: function(url, type, data) {
        return $.ajax({
          url: url,
          type: type,
          data: data
        })
      }
    }

})(document, window, $);

Buscador.Init();
