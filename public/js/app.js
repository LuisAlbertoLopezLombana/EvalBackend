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



Buscador = (function(document, window, $) {
  let checkP = false
  return {
    apiUrl: '/buscador',
    Init: function() {
      let self = this
      self.setSearch()
      self.customSearch = false
      let busqueda = $('#buscar')
      busqueda.on('click', (e) => {
        self.getBienesRaices();
      })
      self.getCiudadesTipos();
    },
    getBienesRaices: function() {
      let self = this
      let endpoint = self.apiUrl + '/bienes'
      self.ajaxRequest(endpoint, 'GET', {})
        .done(function(data) {
          if (self.customSearch) {
            let slider = $("#rangoPrecio").data("ionRangeSlider");
            let from = slider.result.from;
            let to = slider.result.to;

            if (from > 0 || to > 0) {
              data = self.getBienesPorRangoDePrecios(data, from, to);
            }
            let ciudad = $("#ciudad").val();
            if (ciudad !== "") {
              data = self.getBienesPorCiudad(data, ciudad)
            }

            let tipo = $("#tipo").val();
            if (tipo !== "") {
              data = self.getBienesPorTipo(data, tipo)
            }
            self.renderCardBienes(data);
          } else {
            self.renderCardBienes(data);
          }
        }).fail(function(err) {
          console.log('ERROR: ', err)
        })
    },
    getCiudadesTipos: function() {
      let self = this
      let endpoint = self.apiUrl + '/ciudades'
      let ciudades = [];
      self.ajaxRequest(endpoint, 'GET', {})
        .done(function(data) {
          self.renderCiudadesTipos(data);
        }).fail(function(err) {
          console.log('ERROR: ', err)
        })
    },
    getBienesPorRangoDePrecios: function(data, from, to) {
      return data.filter(function(v) {
        let precio = v.Precio.replace('$', '').replace(',', '');
        return precio >= from && precio <= to;
      });
    },
    getBienesPorCiudad: function(data, ciudad) {
      return data.filter(function(v) {
        return v.Ciudad === ciudad;
      });
    },
    getBienesPorTipo: function(data, tipo) {
      return data.filter(function(v) {
        return v.Tipo === tipo;
      });
    },
    ajaxRequest: function(url, type, data) {
      return $.ajax({
        url: url,
        type: type,
        data: data
      })
    },
    renderCardBienes: function(data) {
      $(".cardsbienes").remove();
      let cards = ''
      for (let key in data) {
        cards += `<div class="card horizontal cardsbienes">
          <div class="card-image">
            <img src="img/home.jpg">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <div>
                <b>Direccion: ${data[key].Direccion} </b><p></p>
              </div>
              <div>
                <b>Ciudad: ${data[key].Ciudad}</b><p></p>
              </div>
              <div>
                <b>Telefono: ${data[key].Telefono}</b><p></p>
              </div>
              <div>
                <b>Código postal: ${data[key].Codigo_Postal}</b><p></p>
              </div>
              <div>
                <b>Precio: ${data[key].Precio}</b><p></p>
              </div>
              <div>
                <b>Tipo: ${data[key].Tipo}</b><p></p>
              </div>
            </div>
          </div>
        </div>`
      }
      if (data.length > 0) {
        $(".lista").append(cards);
      }
    },
    renderCiudadesTipos: function(data) {
      let self = this
      let ciudades = []
      let tipos = []
      let ciudad = ''
      let tipo = ''
      for (let key in data) {
        ciudades.push(data[key].Ciudad)
        tipos.push(data[key].Tipo)
      }
      tipos = self.unique(tipos)
      ciudades = self.unique(ciudades)
      for (let key in ciudades) {
        ciudad += `<option value="${ciudades[key]}" >${ciudades[key]}</option>`
      }
      for (let key in tipos) {
        tipo += `<option value="${tipos[key]}" >${tipos[key]}</option>`
      }
      $("#ciudad").append(ciudad)
      $("#tipo").append(tipo)
    },
    unique: function(list) {
      var result = [];
      $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
      });
      return result;
    },
    setSearch: function() {
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
  }

})(document, window, $);

Buscador.Init();
