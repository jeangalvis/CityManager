import { renderDepartments, renderCities } from './functions.js';

const url = 'http://localhost:3000';
const headers = new Headers({ 'Content-Type': 'application/json' });

async function getDepartments() {
  try {
    const response = await fetch(`${url}/Departamentos`);
    const result = await response.json();
    renderDepartments(result);
  } catch (error) {
    console.log(error);
  }
}

async function postDepartments(data) {
  let config = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`${url}/Departamentos`, config);
    const result = await response.json();
  } catch (error) {
    console.log(error);
  }
}
async function updateDepartments(data, id) {
  let config = {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`${url}/Departamentos/${id}`, config);
  } catch (error) {
    console.log(error);
  }
}

async function deleteDepartments(id) {
  let config = {
    method: 'DELETE',
    headers: headers,
  };
  try {
    const response = await fetch(`${url}/Departamentos/${id}`, config);
    const result = await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function getCities(id) {
  try {
    const response = await fetch(`${url}/Ciudades?departamentoId=${id}`);
    const result = await response.json();
    renderCities(result);
  } catch (error) {
    console.log(error);
  }
}

async function postCities(data) {
  let config = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`${url}/Ciudades`, config);
    const result = await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function deleteMultipleCities(id) {
  try {
    const response = await fetch(`${url}/Ciudades?departamentoId=${id}`);
    const result = await response.json();
    console.log(result);
    if (result != null || result != []) {
      result.map((city) => deleteCities(city.id));
    }
  } catch (error) {
    console.log(error);
  }
}
async function updateCities(data, id) {
  let config = {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`${url}/Ciudades/${id}`, config);
  } catch (error) {
    console.log(error);
  }
}

async function deleteCities(id) {
  let config = {
    method: 'DELETE',
  };
  try {
    const response = await fetch(`${url}/Ciudades/${id}`, config);
    const result = await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function getTemp(lat,lon){
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=726abd215276cbf061b8885ce5cce61d&units=metric`);
    const result = await response.json();
    const temperature = result.main.temp
    return temperature
  } catch (error) {
    console.log(error);
  }
}






export {
    getDepartments,
    postDepartments,
    deleteDepartments,
    updateDepartments,
    getCities,
    postCities,
    deleteMultipleCities,
    updateCities,
    deleteCities,
    getTemp
};