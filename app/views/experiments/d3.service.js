const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://ergast.com/api/f1/circuits.json", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
