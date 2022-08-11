
class Empresa {
constructor(Business, Rating, Realizados,){
this.Business = Business;
this.Rating = Rating;
this.Realizados = Realizados;
    }
}
const Empresa1 = new Empresa ('Andreani', 6, 23600,);
const Empresa2 = new Empresa ('OCASA', 10, 90234,);
const Empresa3 = new Empresa ('CorreoARG', 8, 23145,);
const Empresa4 = new Empresa ('Carolo.srl', 2, 2340,);
const Empresa5 = new Empresa ('Traverso', 4, 12003,);
const Empresa6 = new Empresa ('Fedex', 9, 89030,);
const Empresa7 = new Empresa ('Express', 7, 23403,);

let Empresas = [];

Empresas.push(Empresa1);
Empresas.push(Empresa2);
Empresas.push(Empresa3);
Empresas.push(Empresa4);
Empresas.push(Empresa5);
Empresas.push(Empresa6);
Empresas.push(Empresa7);

let trip = [];

const tripDiv = document.getElementById('trip');
const addtrip = document.getElementById('addtrip');
const businessButton = document.getElementById('businesButton');
const trips = document.getElementById('trips');

function impInput() {
    tripDiv.innerHTML='';
    
    const userInp = document.createElement('input');
    userInp.setAttribute('placeholder', 'Descripcion de Envio')
    tripDiv.append(userInp);
    userInp.setAttribute('id', 'user')
    
    const destInp = document.createElement('input');
    destInp.setAttribute('placeholder','Destino: Ciudad, Provincia')
    tripDiv.append(destInp);
   
    const pesoInp = document.createElement ('input');
    pesoInp.setAttribute('type','number');
    pesoInp.setAttribute('placeholder','Peso en Kg')
     tripDiv.append(pesoInp);   
 
     
    function aggtrip(user, dest, Peso) {
        trip.push( {user, dest, Peso} )
        printTrip()
       
    }

    function printTrip() {
        tripDiv.innerHTML = ''
        trip.forEach( t => {
            const li = document.createElement('li')
             li.innerText = `Descripcion del Envio: ${t.user} 
             Destino: ${t.dest} 
             Peso: ${t.Peso}Kg

            Te notificaremos cual será la empresa responsable del envio.
            `
            tripDiv.append( li )
            
        })
   
    }

    const buttonTrip = document.createElement('button');
    tripDiv.append(buttonTrip);
    buttonTrip.setAttribute('id', 'buttonTrip');
    buttonTrip.innerHTML = 'ENVIAR'
    buttonTrip.addEventListener('click', () => {
    if (pesoInp.value > 100 ) {
        alert('El peso excede el maximo de 100 Kg.')
    }else{
     aggtrip(userInp.value, destInp.value, pesoInp.value); 
     localSync()  
    }})
    
    }
         function localSync() {
            localStorage.setItem('trip', JSON.stringify(trip))
        }     
    
     function storageLoad() {
            const tripJson = localStorage.getItem('trip');
            const tripLocalstorage = JSON.parse(tripJson);
           trip = trip.concat ( tripLocalstorage ); 
        }   


function impBusiness() {
    tripDiv.innerHTML='';
    Empresas.forEach(Empresa => {
        const div_Business = document.createElement('div');
           div_Business.classList.add("Business"); 
           tripDiv.append(div_Business);  
           div_Business.innerHTML= `
           <h3> ${Empresa.Business} </h3>
           <p><strong> Calificacion: ${Empresa.Rating}</strong></p>
           `;})
        
         
}


addtrip.addEventListener('click',  () => {
    console.log('boton add');
    impInput()
  
})

businessButton.addEventListener('click', () => {
    console.log('boton empresas');
    impBusiness()
});

// trips.addEventListener('click', () => {
//     console.log('trips');
// });
storageLoad()


