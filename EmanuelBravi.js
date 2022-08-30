// clase contructora de las empresas.
class Empresa {
constructor(Business, Rating, Realizados,){
this.Business = Business;
this.Rating = Rating;
this.Realizados = Realizados;
    }
}
//declaracion para api
const Url = 'https://jsonplaceholder.typicode.com/users'


// creacion de la empresa
const Empresa1 = new Empresa ('Andreani', 6, 23600,);
const Empresa2 = new Empresa ('OCASA', 10, 90234,);
const Empresa3 = new Empresa ('CorreoARG', 8, 23145,);
const Empresa4 = new Empresa ('Carolo.srl', 2, 2340,);
const Empresa5 = new Empresa ('Traverso', 4, 12003,);
const Empresa6 = new Empresa ('Fedex', 9, 89030,);
const Empresa7 = new Empresa ('Express', 7, 23403,);

//destructuracion del objeto Empresa
const {Business, Rating, Realizados} = Empresa2;


let Empresas = [];
// push de empresas
Empresas.push(Empresa1);
Empresas.push(Empresa2);
Empresas.push(Empresa3);
Empresas.push(Empresa4);
Empresas.push(Empresa5);
Empresas.push(Empresa6);
Empresas.push(Empresa7);

let trip = [];
// const globales de la primer vista de la app
const tripDiv = document.getElementById('trip');
const addtrip = document.getElementById('addtrip');
const businessButton = document.getElementById('businesButton');
const trips = document.getElementById('trips');


 //creacion de campos input para el ingreso de datos del trip y su respectivo div contenedor.
function impInput() {
   
    tripDiv.innerHTML='';
    const inpDiv = document.createElement('div');
    tripDiv.append(inpDiv);
    inpDiv.setAttribute('id', 'inpContainer')
    inpDiv.innerHTML= ' * obligatorios. <br>'

    const userInp = document.createElement('input');
    userInp.setAttribute('placeholder', 'Titular del envio *')
    inpDiv.append(userInp);
    userInp.setAttribute('id', 'user')
    
    const destInp = document.createElement('input');
    destInp.setAttribute('placeholder','Destino: Ciudad, Provincia ')
    inpDiv.append(destInp);
   
    const numInp = document.createElement ('input');
    numInp.setAttribute('placeholder', 'Numero telefonico *')
    numInp.setAttribute('type','number');
    numInp.setAttribute('id', 'num')
    inpDiv.append(numInp);

    const pesoInp = document.createElement ('input');
    pesoInp.setAttribute('type','number');
    pesoInp.setAttribute('placeholder','Peso en Kg *')
    inpDiv.append(pesoInp);  

 

       //button para cargar los datos del input
    const buttonTrip = document.createElement('button');
    inpDiv.append(buttonTrip);
    buttonTrip.setAttribute('id', 'buttonTrip');
    buttonTrip.innerHTML = 'ENVIAR'
    buttonTrip.addEventListener('click', () => {
    pesoInp.value > 100  ?  Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El peso excede el Maximo de 100Kg permitido!',
        showConfirmButton: false,
        timer: 2500,
}) : aggtrip(userInp.value, destInp.value, pesoInp.value, numInp.value)});

    // button para ir a la lista de solicitudes 
    const btnList = document.createElement ('button')
    inpDiv.append(btnList);
    btnList.setAttribute('id', 'btnList');
    btnList.innerHTML = 'SOLICITUDES'
    btnList.addEventListener('click', () => {
        printTrip();  
    })
  
    // button para ir a la pantalla principal
    const btnInit = document.createElement ('button')
    inpDiv.append(btnInit);
    btnInit.setAttribute('id', 'btnInit');
    btnInit.innerHTML = 'INICIO'
    btnInit.addEventListener('click', () => {
        tripDiv.innerHTML= '';
    })
  
}
// push a el array trip
function aggtrip(user, dest, Peso, num, importe) {
if ( user == '' || num == '' || Peso == '' ) {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hay campos obligatorios sin completar!',
        showConfirmButton: false,
        timer: 2500,
})
    impInput() 
}else{
 trip.push( {user, dest, Peso, num, } ); localSync(); 
 printTrip();
 Toastify({
    text: "Tu solicitud de envio fue entregada con exito a nuestras empresas, en el plazo de 4hs habiles la encargada de la entrega se contactara contigo ",
    duration: 10000,
    position: 'left',
    }).showToast();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Envio correcto!',
        showConfirmButton: false,
        timer: 1000,
})}};
 
//function para imprimir en pantalla los datos cargados en el input
    function printTrip() {
        tripDiv.innerHTML= '';
        trip.forEach( t => {
           const li = document.createElement('li') 
             li.innerText = 
             `titular del Envio: ${t.user} 
             Destino: ${t.dest} 
             Peso: ${t.Peso}Kg
             numero telefonico: ${t.num}
             Tarifa : $ ${(t.Peso * 15)}
            `
            tripDiv.append( li )
        })
        
        const btn = document.createElement('button')
        btn.innerText = 'Eliminar Historial'
        btn.setAttribute('id', 'btne')
        btn.addEventListener('click', () => {
           localStorage.removeItem("trip");
           location.reload();
        })  
        tripDiv.append( btn )
    }

//funciones de almacenamiento en localstorage

function localSync() {
    localStorage.setItem('trip', JSON.stringify(trip))
}     

function storageLoad() {
    let tripJson = localStorage.getItem('trip');
    tripJson = tripJson === null ? [] : JSON.parse(tripJson);
    trip = trip.concat ( tripJson );
}   


// function de imporesion de empresas 
function impBusiness() {
    tripDiv.innerHTML='';

    Empresas.forEach(Empresa => {
        const div_Business = document.createElement('div');
           div_Business.classList.add("Business"); 
           tripDiv.append(div_Business);  
           div_Business.innerHTML= `
           <h3> ${Empresa.Business} </h3>
           <p><strong> Calificacion: ${Empresa.Rating}</strong></p>
           <p>Entregas Realizadas: ${Empresa.Realizados}`})
        
         
}
//function para imprimir el listado de empleados consumidos de la api jsonplaceholder
function impEmp() {
    tripDiv.innerHTML= "";
    fetch(Url)
    .then(res => res.json())
    .then(data => {
        data.forEach(usuario => {  
            const div_Emp = document.createElement('div');
            div_Emp.classList.add("Emp"); 
            tripDiv.append(div_Emp);  
            div_Emp.innerHTML= `<h3>Empleado: ${usuario.name}</h3>
            <p>Contacto: ${usuario.email}</p>
            <p>Ubicacion: ${usuario.address.city}</p> `
         })
    })

}

//button nuevo viaje
addtrip.onclick  = () => {
    Toastify({
        text: "cambiaste a la seccion para crear nuevo viaje",
        duration: 4000,
        position: 'left',
        }).showToast();
    impInput()
  
}
//button empresas
businessButton.onclick  = () => {
    Toastify({
        text: "cambiaste a la seccion de Empresas",
        duration: 4000,
        position: 'left',
        }).showToast();

    impBusiness()
};
Emp.addEventListener('click', () => {
    Toastify({
        text: "cambiaste a la seccion para ver los Empleados",
        duration: 4000,
        position: 'left',
        }).showToast();
    impEmp()
 });
storageLoad()


