//--- Variables/Constantes ---//
const fs = require('fs');// agregado para manejo de archivos
const { question } = require("readline-sync");// obtener datos atravez de question
//--- Clase ---//
class User{
  constructor(){
    this.accounts = [];// arreglo que contiene cuentas creadas.
    this.dataPath = './data/user.json';// direccion donde se guardaran los datos de usarios.
  }
  //--- Metodos ---//
  createUser(){// metodo para crear un nuevo usuario.
    this.loadData();
    const id = question("\n Ingrese id de la cuenta: ");
    if(id < 0) return console.log('el id no puede ser un numero inferior a cero.');    
    const dato = this.listAccount({id});
    if(dato.length){
      console.log('Id Existente, intente con otro.\n');
      return this.createUser();
    }
    const type = question("\n Ingrese el tipo de cuenta: ");
    const name = question("\n Ingrese el nombre: ");
    const identification = question("\n Ingrese cedula/pasaporte: ");
    const tel = question("\n Ingrese telefono: ");
    const direction = question("\n Ingrese direccion: ");
    console.log('\nUsuario almacenado.');
    const account = {id, type, name, identification, tel, direction};
    this.accounts.push(account);
    this.saveData();
  }
  loadData(){// metodo que carga los usuarios guardados.
    if (!fs.existsSync(this.dataPath)) return;
    const accounts = JSON.parse(fs.readFileSync(this.dataPath));
    this.accounts = accounts;
  }
  saveData(){// metodo que guarda los datos almacenados en documento.
    fs.writeFileSync(this.dataPath, JSON.stringify(this.accounts));
  }
  findAccountDataById(id){//obtener el codigo buscado y datos.
    const byId = account => account.id === id;
    return [this.accounts.findIndex(byId)];
  }
  findIdExistence(id){//metodo para verificar
    const byId = account => account.id === id;
    const idTrue = this.accounts.findIndex(byId);
    return idTrue;
  }
  getUserData(id){//metodo que comprueba y devuelve datos de un objeto.  
    const [index] = this.findAccountDataById(id);        
    return this.accounts[index];
  } 
  listAccount(params){//metodo para agrupar cuentas por dato en comun.
    const search = Object.entries(params);
    return this.accounts.filter(account =>{
      for(let entry of search){
        const property = entry[0];
        const value = entry[1];
        if(account[property] !== value)return false;
      }
      return true;
    });
  }
  getDateTime(){//metodo que optiene el tiempo actual
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;//obtener hora
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;//obtener minutos
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;//obtener segundos
    var year = date.getFullYear();//obtener a;o
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;//obtener mes
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;//obtener dia
    return `Hora: ${hour}:${min}:${sec}\nFecha: ${day}/${month}/${year}`;
 }
}//--- Fin Clase --- //

//--- Exportar ---//
module.exports = User;