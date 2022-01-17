//--variables, constantes--//
const fs = require('fs');// agregado para interactuar con el sistema de archivos.
const { question } = require("readline-sync");// agregado para obtener datos atravez de question.
//-- constructor --//
class Inventory {
  constructor() {
    this.items = [];// arreglo de articulos
    this.dataPath = './data/inventory.json';// direccion donde se guardan los articulos
    this.dataPathSave = './data/inventorySave.json';
  }
  //--- Metodos ---//
  loadData() {// metodo que carga los articulos guardados.
    if (!fs.existsSync(this.dataPath)) return;
    const items = JSON.parse(fs.readFileSync(this.dataPath));
    this.items = items;
  }
  saveData() {// metodo que guarda los articulos creados.
    fs.writeFileSync(this.dataPath, JSON.stringify(this.items));
  }
  loadDataSave() {//guardar datos de seguridad
    if (!fs.existsSync(this.dataPathSave)) return;
    const items = JSON.parse(fs.readFileSync(this.dataPathSave));
    this.items = items;
  }
  saveDataBackup() {//metodo para guardar facturas generadas
    fs.writeFileSync(this.dataPathSave, JSON.stringify(this.items));
  }
  backupDataInventory(){
    this.loadData();
    this.saveDataBackup();
  }
  loadBackupDataInventory(){
    this.loadDataSave();
    this.saveData();
  }
  createItem() {// metodo que Obtiene los datos del articulo a agregar.
    this.loadData();
    const code = question("\nIngrese codigo del articulo: ");//obtener codigo    
    if(code < 0)return console.log('Codigo incorrecto.');//verificar que no es inferior
    const dato = this.listItems({code});
    if(dato.length){
      console.log('Codigo Existente, intete con otro.');
      return this.createItem();
    }
    const name = question("\nIngrese nombre del articulo: ");
    const amount = question("\nIngrese cantidad del articulo: ");
    if(amount <= 0)return console.log('debe ingresar una cantidad mayor a cero en la cantidad.');
    const type = question("\nIngrese tipo del articulo: ");
    const tradeMark = question("\nIngrese marca del articulo: ");
    const price = question("\nIngrese precio del articulo: ");
    if(price <= 0)return console.log('debe ingresar una cantidad mayor a cero en el precio.');
    const itbis = ((parseInt(price)*18)/100);//obtener itbis del articulo por su precio
    const discount = question("\nIngrese descuento del articulo: ");
    if(discount < 0)return console.log('no puede ser inferior a cero.');
    console.log("Articulo almacendo.");
    //-- guardar datos --//
    const item = {code, name, amount, type, tradeMark, price, itbis, discount};
    this.items.push(item);
    this.saveData();
  }
  listItems(params) {//metodo para buscar nombre/cantidad/codigo etc //listItems({type:'Implemented'});
    const search = Object.entries(params);
    return this.items.filter(item => {
      for (let entry of search) {
        const property = entry[0];
        const value = entry[1];
        if (item[property] !== value) return false;
      }
      return true;
    });
  }
  findItemByCode(code) {//metodo que compara y obtiene valores
    const byCode = item => item.code === code;
    return [this.items.find(byCode), this.items.findIndex(byCode)];
  }
  findItemDataByCode(code) {// metodo que comprueba el codigo existente.
    const byCode = item => item.code === code;
    return [this.items.findIndex(byCode)];
  }
  findItemCodeExistence(code){//metodo utilizado para comparacion
    const byCode = item => item.code === code;
    const codeTrue = this.items.findIndex(byCode);
    console.log(codeTrue)
    return codeTrue;
  }
  getItemData(code){//metodo para consumir los datos del codigo ingresado.
    const [index] = this.findItemDataByCode(code);
    return this.items[index];
  }
  updateItemAmount(code, newData) {//metodo modificado para alterar la cantidad del articulo
    const [item, index] = this.findItemByCode(code);
    this.items[index] = {
      ...item,
      ...newData,
      code: item.code,
      amount: item.amount - newData
    };
    this.saveData();
    return this.items[index];
  }
  updateItem(code, newData) {// metodo para modificar los datos del articulo
    const [item, index] = this.findItemByCode(code);
    this.items[index] = {
      ...item,
      ...newData,
      code: item.code,
      itbis: ((parseInt(item.price)*18)/100)
    };
    this.saveData();
    return this.items[index];
  }
}//clase
module.exports = Inventory;// exportar clase Inventario para consumir.