# Mini-Proyecto-2022-(NodeJs)-Sistema de punto de venta en consola.

### El Mini Proyecto consiste en crear un sistema de punto de venta por consola el cual debe tener:
1. Un inventario que pueda agregar, eliminar, modificar y buscar articulos (por su nombre, tipo, precio, marca, cantidad, o codigo).
2. Poder realizar y guardar ventas, las ventas deben generar y almacenar facturas. 
5. Cuando se genere la factura debe contener el mensaje del dia.
4. Tiene que ser capaz de controlar el dinero que entra y sale de la caja.


## I. Crear un Usuario:
Para crear un usuario es necesario primero inicializar la clase "User" de esta manera: 

const User = require('./User'); //Para llamar/utilizar/inicializar la clase usuario.

const user = new User(); //Para usar funciones/metodos de la clase.

user.loadData(); //para cargar los datos de los usuarios creados. *Obligatorio*

// user.createUser();//crear usuario.

## II. Agregar Articulo:
Para agregar articulos es necesario primero inicializar la clase "Inventory" de esta manera: 

const Inventory = require('./Inventory'); //Para llamar/utilizar/inicializar la clase inventario.

const inv = new Inventory(); //Para usar funciones/metodos de la clase.

inv.loadData(); //para cargar los datos del inventario. *Obligatorio*

// inv.createItem();//agregar articulo.
// inv.listItems({ code: 'test' });// buscar articulo por marca.
// inv.updateItem("64125-116", {name:"prueba"});//modificar articulo.


## III. Generar Facturas:
Para generar facturas es necesario primero inicializar la clase "CashRegister" de esta manera: 

const CashRegister = require('./CashRegister'); //Para llamar/utilizar/inicializar la clase.

const cR = new CashRegister(); //Para usar funciones/metodos de la clase.

cR.loadData(); //para cargar facturas generadas. *Obligatorio*

// cR.createInvoice();//crear una factura

// cR.openCashBox();// abrir caja

// cR.closeCashBox();// cerrar caja

// cR.depositCashBox();// depositar dinero

// cR.getCashBox();// sacar dinero
