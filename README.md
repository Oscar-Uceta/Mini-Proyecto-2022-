# Mini-Proyecto-2022-(NodeJs)-Sistema de punto de venta en consola.

<<<<<<< HEAD
### En que consiste el Mini Proyecto:
> Consiste en crear un sistema de punto de venta en consola el cual tiene las siguientes funciones:
1. Un inventario que pueda agregar, eliminar, modificar y buscar articulos (por su nombre, tipo, precio, marca, cantidad, o codigo).
2. Puede realizar y guardar ventas, las ventas deben generar y almacenar facturas. 
5. Cuando se genere la factura contiene nombre del vendedor, cliente, fecha y el mensaje del dia.
4. Controla el dinero que entra y sale de la caja.

## I. Crear un Usuario:
Para crear un usuario es necesario primero inicializar la clase "User" de esta manera:
- const User = require('./User');
- const user = new User();
- user.loadData();
=======
-------------------------------------------CREAR USUARIO-------------------------------------------

const User = require('./User'); //Para llamar/utilizar/inicializar la clase usuario.

const user = new User(); //Para usar funciones/metodos de la clase.

user.loadData(); //para cargar los datos de los usuarios creados. *Obligatorio*
>>>>>>> parent of 96bd836 (Mejora de ReadMe)

Luego utilizar el siguiente codigo para comenzar a crear el usuario:
- user.createUser();

<<<<<<< HEAD
## II. Agregar Articulo:
Para agregar articulos es necesario primero inicializar la clase "Inventory" de esta manera:
- const Inventory = require('./Inventory');
- const inv = new Inventory();
- inv.loadData();
=======
-------------------------------------------AGREGAR ARTICULOS---------------------------------------
>>>>>>> parent of 96bd836 (Mejora de ReadMe)

Para agregar un articulo se utiliza el codigo:
- inv.createItem();

Para buscar un articulo se utiliza:
- inv.listItems({ code: 'test' });
> Donde "code" es el tipo de dato por que el se buscara el articulo y "test" es el dato que buscara, aparte de "code" se puede usar(code, name, amount, type, tradeMark, price, itbis, discount).

<<<<<<< HEAD
Para Modificar un articulo se utiliza:
- inv.updateItem("64125-116", {name:"prueba"});
> Donde "64125-116" es el codigo del articulo a modificar y "name" es el dato que se cambiara en el articulo por el introducido o sea "prueba" tan bien se puede modificar los siguientes datos del articulo (code, name, amount, type, tradeMark, price, itbis, discount).

## III. Generar Facturas:
Para generar facturas es necesario primero inicializar la clase "CashRegister" de esta manera:
- const CashRegister = require('./CashRegister');
- const cR = new CashRegister();
- cR.loadData();

Para generar una factura se utiliza:
- cR.createInvoice(); > **crea una factura**

Los codigos para el manejo de la caja son:
1. cR.openCashBox(); > **Para abrir caja**
2. cR.closeCashBox(); > **Para cerrar caja**
3. cR.depositCashBox(); > **Para depositar dinero**
4. cR.getCashBox(); > **Para sacar dinero**
=======
-------------------------------------------GENERAR FACTURA------------------------------------------

const CashRegister = require('./CashRegister'); //Para llamar/utilizar/inicializar la clase.
# Mini-Proyecto-2022-(NodeJs)-Sistema de punto de venta en consola.

### En que consiste el Mini Proyecto:
> Consiste en crear un sistema de punto de venta en consola el cual tiene las siguientes funciones:
1. Un inventario que pueda agregar, eliminar, modificar y buscar articulos (por su nombre, tipo, precio, marca, cantidad, o codigo).
2. Puede realizar y guardar ventas, las ventas deben generar y almacenar facturas. 
5. Cuando se genere la factura contiene nombre del vendedor, cliente, fecha y el mensaje del dia.
4. Controla el dinero que entra y sale de la caja.

## I. Crear un Usuario:
Para crear un usuario es necesario primero inicializar la clase "User" de esta manera:
- const User = require('./User');
- const user = new User();
- user.loadData();

Luego utilizar el siguiente codigo para comenzar a crear el usuario:
- user.createUser();

## II. Agregar Articulo:
Para agregar articulos es necesario primero inicializar la clase "Inventory" de esta manera:
- const Inventory = require('./Inventory');
- const inv = new Inventory();
- inv.loadData();

Para agregar un articulo se utiliza el codigo:
- inv.createItem();

Para buscar un articulo se utiliza:
- inv.listItems({ code: 'test' });
> Donde "code" es el tipo de dato por que el se buscara el articulo y "test" es el dato que buscara, aparte de "code" se puede usar(code, name, amount, type, tradeMark, price, itbis, discount).

Para Modificar un articulo se utiliza:
- inv.updateItem("64125-116", {name:"prueba"});
> Donde "64125-116" es el codigo del articulo a modificar y "name" es el dato que se cambiara en el articulo por el introducido o sea "prueba" tan bien se puede modificar los siguientes datos del articulo (code, name, amount, type, tradeMark, price, itbis, discount).

## III. Generar Facturas:
Para generar facturas es necesario primero inicializar la clase "CashRegister" de esta manera:
- const CashRegister = require('./CashRegister');
- const cR = new CashRegister();
- cR.loadData();

Para generar una factura se utiliza:
- cR.createInvoice(); > **crea una factura**

Los codigos para el manejo de la caja son:
1. cR.openCashBox(); > **Para abrir caja**
2. cR.closeCashBox(); > **Para cerrar caja**
3. cR.depositCashBox(); > **Para depositar dinero**
4. cR.getCashBox(); > **Para sacar dinero**

const cR = new CashRegister(); //Para usar funciones/metodos de la clase.

cR.loadData(); //para cargar facturas generadas. *Obligatorio*

// cR.createInvoice();//crear una factura

// cR.openCashBox();// abrir caja

// cR.closeCashBox();// cerrar caja

// cR.depositCashBox();// depositar dinero

// cR.getCashBox();// sacar dinero
>>>>>>> parent of 96bd836 (Mejora de ReadMe)
