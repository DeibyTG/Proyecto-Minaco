
//accion carousel de mensaje de bienvenida


const contenedorSlider = document.querySelector('.movimiento_carousel');
const textoSlider=document.querySelectorAll('.mensaje_info_carousel')

let index_carousel_wc=0
let totalSlides=textoSlider.length



//vamos a crear una funcion arrow para el movimiento
//  luego haremos una mas grande para agrupar todo

const primerSlide=textoSlider[0].cloneNode(true);
contenedorSlider.appendChild(primerSlide);

const totalCon=totalSlides + 1;

function deslizar_mensajes(){

        index_carousel_wc ++;
        contenedorSlider.style.transition = 'transform 0.6s ease';
        contenedorSlider.style.transform = `translateX(-${index_carousel_wc * 100}%)`;

        if(index_carousel_wc===totalSlides){
            setTimeout(()=>{
                contenedorSlider.style.transition='none'
                contenedorSlider.style.transform='translateX(0%)';
                index_carousel_wc=0

                void contenedorSlider.offsetWidth;

                setTimeout(() => {
                contenedorSlider.style.transition = 'transform 0.6s ease';
                },20);
        },600);
    }

}

setInterval(deslizar_mensajes,3000);



//boton desplegable menu en producto

function f_desplegar_menu_categorias() {
    const activo = document.getElementById('deplegable_categorias');
    activo.classList.toggle('activo');

}

//accion para que el main de la pagina index aparezca cuando hagamos scroll hacia abajo

function f_ver_bestSeller(){
    const mainIndex=document.querySelector('.main-index');

    if(window.scrollY>100){
        mainIndex.classList.add('animacion-ver-bs');
    }else{
        return;
    }
}

window.addEventListener('scroll', f_ver_bestSeller);
  

