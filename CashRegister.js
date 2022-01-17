//--variables, constantes, llamada de clases/metodos--//
const fs = require('fs');// agregado para guardar datos.
const { question } = require("readline-sync");// agregado para obtener datos atravez de question.
const fetch = require('sync-fetch');// agregado para obtener datos de pagina.
const User = require('./User');//agregado para obtener datos de cuentas
const user = new User();
const Inventory = require('./Inventory');//obtener datos de inventario
const inv = new Inventory();
//-- clase --//
class CashRegister{
  constructor(){
    this.dataPath = './data/billing.json';
    this.records = [];//registro de ventas
    this.cashLog = [];
    this.articleTotal = [];   
    this.isTheBoxOpen = false;//
    this.messageOfDay = this.getMessage();//this.getMessageOfDay();
  }
  //-- metodos --//
  loadData() {//metodo para cargar facturas generadas
    if (!fs.existsSync(this.dataPath)) return;
    const records = JSON.parse(fs.readFileSync(this.dataPath));
    this.records = records;// cargar datos de ventas facturadas.
    this.clearCashBox();// limpiar caja.
  }
  saveData() {//metodo para guardar facturas generadas
    fs.writeFileSync(this.dataPath, JSON.stringify(this.records));
  }
  createInvoice(){//metodo que crea y guarda una factura
    const items = [];
    inv.loadData();
    user.loadData();
    //-- backup inventario --//
    inv.backupDataInventory();
    const slogan = 'Ferreteria el Exito, La que te conviene.';//nombre - slogan
    const accountId = question('\n Ingrese Id Usuario: ');
    if(user.findIdExistence(accountId) < 0)return console.log('Id incorrecto.');
    const accountName = user.getUserData(accountId).name;// extraer nombre del usuario "activo"
    const time = user.getDateTime();
    const client = question("\nIngrese nombre cliente: ");
    //-- inicio While -- //
    while(true){//bucle para continuar agregando articulos.
      console.log('\nPara dejar de agregar articulos presione enter cuando le pida ingresar el codigo del articulo, luego de tener almenos un articulo ingresado.');
      // 
      const article = question("\n Ingrese el codigo del articulo: ");
      if(article === '') break;//para romper/salir el bucle while.
      if(inv.findItemCodeExistence(article) < 0){
        inv.loadBackupDataInventory();
        return console.log('codigo incorrecto.');
      }
      if(inv.getItemData(article).code === article){//comprobar si existe
        if (inv.getItemData(article).amount === "0"){
          inv.loadBackupDataInventory();
          return console.log("Introduzca otro articulo, no cuenta con existencias.");
        }else if(inv.getItemData(article).amount === 0){
            inv.loadBackupDataInventory();
            return console.log("Introduzca otro articulo, no cuenta con existencias.");
        }else{
          const articleName = inv.getItemData(article).name;//Obtiene el nombre del articulo.
          const amount = question("\n El articulo: "+articleName+", tiene "+inv.getItemData(article).amount+" en existencia cuanto desea agregar: ");
          if(amount <= 0){
            inv.loadBackupDataInventory();
            return console.log('La cantidad no puede ser inferior o igual a cero');//verificar si la cantidad es inferior
          }
          if(inv.getItemData(article).amount >= parseInt(amount)){
            //-- Extraer Datos del articulo --//
            const price = inv.getItemData(article).price;
            const itbis = inv.getItemData(article).itbis;
            const discount = inv.getItemData(article).discount;
            const total = this.totalArticle(amount, price, itbis, discount);
            //-- guardar y modificar datos extraidos del articulo --//
            items.push({article, articleName, amount, price, itbis, discount, total});
            inv.updateItemAmount(article, amount);//actualizar cantidad articulo
          }else{
            inv.loadBackupDataInventory();
            return console.log('la cantidad introducida exede la existencia actual del articulo.');
          }
        }
      }else{
        inv.loadBackupDataInventory();
        return console.log('Codigo incorrecto, introdusca otro codigo.')
      }
    }//--Fin While --//
    if(items.length === 0) return;//confirmar que tiene almenos un articulo agregado.
    this.isTheBoxOpen = true;
    const totalAll = this.totalArticleInvoice();// extraer ganancia total de la factura.
    this.setCashBox(totalAll);// agregar total de la factura al dinero actual en caja.    
    console.log(`Dinero de venta ingresado: ${totalAll}, Actualmente la caja cuenta con: ${this.cashLog}`);
    const message = this.messageOfDay;// extraer mensaje del dia.
    //-- almacenar datos e imprimir factura --//
    const record = {slogan, client, items, totalAll, accountName, time, message};    
    this.records.push(record);
    this.printInvoice(record);
    this.saveData();
  }//--- Fin createInvoice --//
  totalArticle(amount, price, itbis, discount){//metodo que obtiene el valor de articulo en facturar.
    itbis = ((parseInt(price)*18)/100);
    const priceItbis = itbis;
    const netPrice = parseInt(price,10) + parseInt(priceItbis,10) - parseInt(discount,10);
    const total = parseInt(netPrice,10) * parseInt(amount,10);
    this.articleTotal.push(total);
    return total;
  }
  totalArticleInvoice(){//metodo que obtiene el total de la factura
    const totalInvoice = this.articleTotal.reduce((a,b) => a + b);//, 0
    return totalInvoice;
  }
  getMessage() {//metodo que obtiene e almacena mensaje del dia de pagina en linea.
    const jsonResponse = fetch('http://quotes.rest/bible/vod.json').json();
    // console.log(jsonResponse)
    try{
      const { contents: { book, chapter, number, verse } } = jsonResponse;
      return `${book} ${chapter}:${number}\n${verse}`;
      // console.log(jsonResponse);
    }
    catch{
      const {error:{code,message}} = jsonResponse;
      // console.log(jsonResponse);
      return `\nErroral obtener datos:\n Codigo: ${code}\n Razón:\n${message}`;
    }
  }
  openCashBox(){//metodo para abrir caja
    if(this.isTheBoxOpen === true)return console.log('La caja esta abierta.');
    user.loadData();
    const account = question('\nIngrese Id Cuenta: ');
    if(user.findIdExistence(account) < 0)return console.log('Id incorrecto.');
    if(user.getUserData(account).type != 'admin')return console.log('La cuenta debe ser de tipo admin.');
    console.log('Caja abierta.');
    this.isTheBoxOpen = true;
  }
  closeCashBox(){//metodo para cerra caja
    if(this.isTheBoxOpen === false)return console.log('La caja esta cerrada.');
    console.log('Caja cerrada.');
    this.isTheBoxOpen = false;
  }
  depositCashBox(){//metodo para depositar en caja
    if(this.isTheBoxOpen === false)return console.log('La caja esta cerrada.');
    user.loadData();
    const account = question('\nIngrese Id Cuenta: ');
    if(user.findIdExistence(account) < 0)return console.log('Id incorrecto.');
    if(user.getUserData(account).type != 'admin')return console.log('La cuenta debe ser de tipo admin.');
    const cash = question(`Efectivo en caja actual: ${this.cashLog}, Cuanto desea depositar: `);
    if(cash <= 0)return console.log('Cantidad incorrecta o inferior a cero.');
    this.cashLog.push(cash);
    const totalCash = this.cashLog.reduce((a, b) => a + b);
    console.log(`\nIngreso exitoso, la caja cuenta actualmente con: ${totalCash}`);
  }
  setCashBox(cash){//metodo que almacena las ganancias generadas
    if (this.isTheBoxOpen === false) return console.log('la caja se encuentra cerrada.');
    if(cash <= 0) return console.log('ingresos inferiores o igual a cero.');
    this.cashLog.push(cash);
  }
  getCashBox(){// metodo para extraer dinero en caja.
    if (this.isTheBoxOpen === false) return console.log('la caja se encuentra cerrada.');
    user.loadData();
    const accountActive = question('Ingrese Id Cuenta: ');
    if(accountActive < 0)return console.log('Id no puede ser inferior a cero.');
    if(user.findIdExistence(accountActive) < 0)return console.log('id incorrecto.');
    if (user.getUserData(accountActive).type != 'admin') return console.log('No es administrador');    
    if(this.cashLog === 0) return console.log('No hay efectivo para sacar.');
      const totalCash = this.cashLog.reduce((a, b) => a + b);
      if(totalCash === 0)return console.log('No hay efectivo en caja.');
      const cashAmount = question("Ganacia actual es: "+totalCash+"\n ingrese cuanto desea extaer: ");
      if(cashAmount <= 0)return console.log('la cantidad debe ser superior a cero.');
      if(parseInt(cashAmount) > parseInt(totalCash))return console.log('el monto es superior al actual.');
      const remainingCash = parseInt(totalCash) - parseInt(cashAmount);
      this.clearCashBox();
      this.cashLog.push(remainingCash);
      return console.log('Dinero extraido actualmente queda: '+this.cashLog+' en caja.');
  }
  clearCashBox(){// metodo para limpiar dinero en caja "almacendo"
    this.cashLog = [];
    console.clear();
    console.log('Se a restablecido el efectivo en caja.');
  }
  printInvoice(data){//metodo que "genera una factura impresa".
    console.clear();    
    console.log(`                     ${data.slogan}
    Cliente: ${data.client}
    ${data.time}`);
    //
    data.items.forEach(({article, articleName, amount, price, itbis, total}) => {
      console.log(`
        Codigo Articulo: ${article} | Descripción: ${articleName} | Cantidad: ${amount} | Precio: ${price} | itbis: ${itbis} | Total: ${total}
      `)});
    //
    console.log(`Total: ${data.totalAll} 
    Asistido por: ${data.accountName}
        Mensaje del dia:
     ${data.message} `);
  }
}//-- fin clase --//

//-- exportar --//
module.exports = CashRegister;