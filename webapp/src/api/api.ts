import {User} from '../shared/shareddtypes';

//Obtenemos la url de la apirest de Heroku o utilizamos localhost por defecto
let apiEndPoint:string ='https://dede-es3a-restapi.herokuapp.com/'

export async function addUser(user:User):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'name':user.name, 'password':user.password})
      });
    if (response.status===200)
      return true;
    else
      return false;
}


/*
* Metodo que utilizaremos para comprobar si el usuario que intenta logearse, existe en base de datos.
*/
export async function getUser(username : string, password : string): Promise<User | null> {
  const apiPetition:string = apiEndPoint+'users/login/' + username + '/' + password;
  const response:Response = await fetch(apiPetition);
  if(response.status == 500) {
    return null;
  }
  return response.json();
}

export async function getUsers():Promise<User[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}