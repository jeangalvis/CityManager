import {
    getDepartments,
    postDepartments,
    deleteDepartments,
    updateDepartments,
    getCities,
    postCities,
    deleteMultipleCities,
    updateCities,
    deleteCities,
  } from '../requests.js';
  import {
    tableBody_Departments,
    tableBody_Cities,
    btn_AddDepartment,
    field_NameDepartment,
    btn_AddCity,
    field_NameCity,
    btn_UpdateDepartment,
    field_UpdateNameDepartment,
    cities,
    btn_UpdateCity,
    field_updateNameCity,
    field_Image,
    field_Lat,
    field_Lon,
    field_UpdateImage,
    field_UpdateLat,
    field_UpdateLon,
    claro,
    oscuro,
    bodyClass,
  } from '../selectors.js';
  class App {
    constructor() {
      this.initApp();
    }
    initApp() {

    function cambiarTema(miTema){
        if(miTema == 'bg-light'){
            bodyClass.classList.remove('bg-dark');
            bodyClass.classList.add('bg-light')
        }
        else if(miTema == 'bg-dark'){
            bodyClass.classList.remove('bg-light');
            bodyClass.classList.add('bg-dark');
        }
        localStorage.setItem('theme', JSON.stringify(miTema));
    }
    let savedTheme = JSON.parse(localStorage.getItem('theme')) || 'bg-dark';
    if (savedTheme) {
        cambiarTema(savedTheme);
      }

    claro.addEventListener('click', ()=>{
        cambiarTema('bg-light');
    });
    oscuro.addEventListener('click', ()=>{
        cambiarTema('bg-dark')
    });


      let tempId = 0;
      getDepartments();
      btn_AddDepartment.addEventListener('click', (e) => {
        e.preventDefault();
        let departamento = {
          nomDepartamento: field_NameDepartment.value,
        };
        postDepartments(departamento);
      });
  
      tableBody_Departments.addEventListener('click', (e) => {
        e.preventDefault();
        let tr = e.target.closest('tr');
        let nameDepartment = tr.getAttribute('nameDepartment');
        let button = e.target.closest('button');
        let id = tr.id;
        if (button != null) {
          let accion = button.dataset.accion;
          if (accion === 'Ver') {
            cities.classList.remove('d-none');
            tempId = id;
            getCities(id);
          } else if (accion === 'Eliminar') {
            deleteMultipleCities(id);
            deleteDepartments(id);
          } else if (accion === 'Actualizar') {
            field_UpdateNameDepartment.value = nameDepartment;
            btn_UpdateDepartment.addEventListener('click', (e) => {
              e.preventDefault();
              let departamento = {
                id: id,
                nomDepartamento: field_UpdateNameDepartment.value,
              };
              updateDepartments(departamento, id);
            });
          }
        }
      });
      btn_AddCity.addEventListener('click', (e) => {
        e.preventDefault();
        let ciudad = {
          nomCiudad: field_NameCity.value,
          departamentoId: parseInt(tempId),
          imagen: field_Image.value,
          coordenadas:{
            lat: parseFloat(field_Lat.value),
            lon: parseFloat(field_Lon.value)
          }
        };
        postCities(ciudad);
      });
      tableBody_Cities.addEventListener('click', (e) => {
        e.preventDefault();
        let tr = e.target.closest('tr');
        let namecities = tr.getAttribute('namecities');
        let button = e.target.closest('button');
        let id = tr.id;
        if (button != null) {
          let accion = button.dataset.accion;
          if (accion === 'Eliminar') {
            deleteCities(id);
          } else if (accion === 'Actualizar') {
            field_updateNameCity.value = namecities;
            btn_UpdateCity.addEventListener('click', (e) => {
              e.preventDefault();
              let ciudad = {
                id: id,
                nomCiudad: field_updateNameCity.value,
                departamentoId: parseInt(tempId),
                imagen: field_UpdateImage.value,
                coordenadas:{
                    lat: field_UpdateLat.value,
                    lon: field_UpdateLon.value
                }
              };
              updateCities(ciudad, id);
            });
          }
        }
      });


    }
  }
  
  export default App;