//variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
//variables para campos

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListener();
function eventListener(){
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded',iniciarApp);
   
    // Campos de formulario
    email.addEventListener('blur',validarFormulario);
    asunto.addEventListener('blur',validarFormulario);
    mensaje.addEventListener('blur',validarFormulario);

    //reset formulario

    btnReset.addEventListener('click', resetFormulario);

    //enviar fomrulario

    formulario.addEventListener('submit',enviarEmail);
}






//funciones
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

function validarFormulario(e){
    
    if(e.target.value.length > 0){

        //elimina los errores 
        const error = document.querySelector('form p.error');
        if(error){
        error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
        
    }else 
    {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError("Todos los campos son obligatorios");
    }

if(e.target.type === 'email'){
    

    
   
    if(er.test(e.target.value )){

        const error = document.querySelector('form p.error');
        if(error){
        error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

       
    }else 
    {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
         mostrarError("El email no es valido")
    }
}
if(er.test(email.value )!= "" && asunto.value != "" && mensaje.value != ""){
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
}

}

function mostrarError(mensaje){
 const mensajeError = document.createElement('p');

 mensajeError.textContent= mensaje;
 mensajeError.classList.add('border','border-red-500','bg-red-500','text-white','p-3','mt-5','text-center','error');

 const errores = document.querySelectorAll('.error');
 if(errores.length === 0){
     formulario.appendChild(mensajeError);
 }

}

// envia el email

function enviarEmail(e){
e.preventDefault();

// mostrar spinner
const spinner = document.querySelector('#spinner');
spinner.style.display="flex";

//despue de 3 segundos ocultar el spinner y mostrar mensaje

setTimeout( () => {
    spinner.style.display = "none";

    //mensaje enviado correctamente
    const parrafo = document.createElement('p');
    parrafo.textContent = "El mensaje fue enviado correctamente!";
    parrafo.classList.add('text-center','p-2','bg-green-500','text-white','my-10','font-bold','uppercase')

    // inserta el parrafo antes del spinner
    formulario.insertBefore( parrafo , spinner);

    setTimeout( () => {
        parrafo.remove();
        resetFormulario();
       },5000)


}, 3000);



}
function resetFormulario(){
    formulario.reset();
    iniciarApp();
}




