import { tableBody_Departments, tableBody_Cities } from './selectors.js';
import { getTemp } from './requests.js';



function renderDepartments(result) {
  tableBody_Departments.innerHTML = '';
  result.forEach((element) => {
    let tr = document.createElement('tr');
    tr.setAttribute('id', `${element.id}`);
    tr.setAttribute('class', 'tr');
    tr.setAttribute('nameDepartment', `${element.nomDepartamento}`);
    tr.innerHTML = `
    <td>${element.id}</td>
    <td>${element.nomDepartamento}</td>
    <td>
      <div class="d-flex gap-3">
        <button class="btn btn-warning" type="button" data-accion="Ver" value="Ver" >
          <i class="fa-solid fa-eye" style="color: #ffffff"></i>
        </button>
        <button class="btn btn-primary" type="button" data-accion="Actualizar" value="Actualizar" data-bs-toggle="modal" data-bs-target="#updateDepartmentModal">
          <i class="fa-solid fa-pen-to-square" style="color: #ffffff"></i>
        </button>
        <button class="btn btn-danger" type="submit" data-accion="Eliminar" value="Eliminar">
          <i class="fa-solid fa-trash-can" style="color: #ffffff"></i>
        </button>
      </div>
    </td>
    `;
    tableBody_Departments.appendChild(tr);
  });
}

async function renderCities(result) {
  tableBody_Cities.innerHTML = '';
  result.forEach(async(element) => {
    const temperature = await getTemp(element.coordenadas.lat, element.coordenadas.lon);
    let tr = document.createElement('tr');
    tr.setAttribute('id', `${element.id}`);
    tr.setAttribute('class', 'tr');
    tr.setAttribute('nameCities', `${element.nomCiudad}`);
    tr.innerHTML = `
    <td>${element.id}</td>
    <td>${element.nomCiudad}</td>
    <td><img src="${element.imagen}" alt="" width="100px" height="100px"</td>
    <td>${temperature} °C</td>
    <td>
      <div class="d-flex gap-3">
        <button class="btn btn-primary" type="button" data-accion="Actualizar" value="Actualizar" data-bs-toggle="modal" data-bs-target="#updateCityModal">
          <i class="fa-solid fa-pen-to-square" style="color: #ffffff"></i>
        </button>
        <button class="btn btn-danger" type="submit" data-accion="Eliminar" value="Eliminar">
          <i class="fa-solid fa-trash-can" style="color: #ffffff"></i>
        </button>
      </div>
    </td>
    `;
    tableBody_Cities.appendChild(tr);
  });
}



export { renderDepartments, renderCities };