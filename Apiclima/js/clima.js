const contenedor = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load',()=>{
    formulario.addEventListener('submit',buscarClima);

})

function buscarClima(e){
    e.preventDefault();
    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    //console.log(ciudad);
    //console.log(pais);

    if(ciudad ===''|| pais ===''){
        console.log('los campos son obligatorios');
        mostrarError('Ambos campos son obligatorios');
        return;

    }else{
       // console.log('campos llenos');
        consultarAPI(ciudad,pais);
    }

}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        const alertaMsj = document.createElement('div');
        alertaMsj.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','relative','max-w-md','mx-auto','mt-6','text-center');
        alertaMsj .innerHTML = `
        <strong class="'font-bold'">Error </strong>
        <span class="block sm:inline">${mensaje} </span>
        `;
        contenedor.appendChild(alertaMsj)

        setTimeout(()=>{
            alertaMsj.remove()
        },3000);

    }
}

function consultarAPI(ciudad,pais){
    //url
    //imprimir resultado extraemos el appid de la pagina
    const appId ='619e7b9ca9c97a2e8f2ffbe8e3050076';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

spinner();

    fetch(url)
    .then(respuesta =>{
        return respuesta.json();
    })
.then(datos =>{
    //console.log(datos);
    limpiarHTML()


    if(datos.cod === '404'){
        mostrarError('La ciudad ingresada no ha sido encontrada');
    }else{
        mostrarClima(datos);
    }
})
.catch(error=>{
    console.log(error);
})

}

function mostrarClima(datos){
    console.log('mostrar datos clima');

    const{name,main:{temp,temp_max,temp_min}} = datos; //de esta forma se puede extraer datos de un arreglo

    const grados = kelvinAcent(temp);
    //console.log(grados);
    const min = kelvinAcent(temp_min);
    const max = kelvinAcent(temp_max);

    //armar estrucutra html
    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML =`Clima en :${name}`;
    nombreCiudad.classList.add('font-bold','text-2x1');

    const tempActual = document.createElement('p');
    tempActual.innerHTML =`${grados} &#8451`;
    tempActual.classList.add('font-bold','text-6x1');

    const tempMinima =document.createElement('p');
   tempMinima.innerHTML = `${min} &#8451`;
   tempMinima.classList.add('text-xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451`;
    tempMaxima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white');

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(tempActual);
    resultadoDiv.appendChild(tempMinima);  
    resultadoDiv.appendChild(tempMaxima);

    resultado.appendChild(resultadoDiv);
}

function kelvinAcent(grados){
    return parseInt(grados-273.15);
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner(){
    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-cicle"><div></div>
 <div class="sk-circle2 sk-cicle"><div></div>
 <div class="sk-circle3 sk-cicle"><div></div>
 <div class="sk-circle4 sk-cicle"><div></div>
 <div class="sk-circle5 sk-cicle"><div></div> 
 <div class="sk-circle6 sk-cicle"><div></div>
 <div class="sk-circle7 sk-cicle"><div></div>
 <div class="sk-circle8 sk-cicle"><div></div>
 <div class="sk-circle9 sk-cicle"><div></div> 
 <div class="sk-circle10 sk-cicle"><div></div> 
 <div class="sk-circle11 sk-cicle"><div></div>
 <div class="sk-circle12 sk-cicle"><div></div>
    `

    resultado.appendChild(divSpinner);

}

