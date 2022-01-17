# Mini-Proyecto-2022-(NodeJs)-Sistema de punto de venta en consola.

--------------------------------------------------------------------CREAR USUARIO--------------------------------------------------------------
const User = require('./User'); //Para llamar/utilizar/inicializar la clase usuario.
const user = new User(); //Para usar funciones/metodos de la clase.
user.loadData(); //para cargar los datos de los usuarios creados. *Obligatorio*

// user.createUser();//crear usuario.

-------------------------------------------------------------------AGREGAR ARTICULOS-----------------------------------------------------------
const Inventory = require('./Inventory'); //Para llamar/utilizar/inicializar la clase inventario.
const inv = new Inventory(); //Para usar funciones/metodos de la clase.
inv.loadData(); //para cargar los datos del inventario. *Obligatorio*

// inv.createItem();//agregar articulo.
// inv.listItems({ code: 'test' });// buscar articulo por marca.
// inv.updateItem("64125-116", {name:"prueba"});//modificar articulo.

------------------------------------------------------------------GENERAR FACTURA---------------------------------------------------------------
const CashRegister = require('./CashRegister'); //Para llamar/utilizar/inicializar la clase.
const cR = new CashRegister(); //Para usar funciones/metodos de la clase.
cR.loadData(); //para cargar facturas generadas. *Obligatorio*

// cR.createInvoice();//crear una factura

// cR.openCashBox();// abrir caja

// cR.closeCashBox();// cerrar caja

// cR.depositCashBox();// depositar dinero

// cR.getCashBox();// sacar dinero
