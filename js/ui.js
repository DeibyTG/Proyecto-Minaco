
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
  
// ahora vamos a hacer un funcion para que cuando hagamos click en uno de los productos nos abra otra pestaña con us informacion precio e imagen 

document.addEventListener("DOMContentLoaded",()=>{

    const pageId=document.body.id
    if(pageId==="producto"){


        const params=new URLSearchParams(window.location.search);
        const idProducto=params.get('id');

        fetch('../data/productos.json')
            .then(res=>res.json())
            .then(data=>{
                let producto=null;

                if(data.collares[idProducto]) producto=data.collares[idProducto];
                else if (data.anillos[idProducto]) producto=data.anillos[idProducto];
                else if(data.pulsera[idProducto]) producto=data.pulsera[idProducto];
                else if(data.pendientes[idProducto]) producto=data.pendientes[idProducto];


                if(producto){

                    const img=document.querySelector('.foto-producto-seleccionado');
                        img.src=producto.imagen;
                        img.alt=producto.nombre;

                    const info=document.querySelector(".info-producto-seleccionado");
                        info.innerHTML=`
                            <h2>${producto.nombre}</h2>
                            <p>Precio: ${producto.precio}${producto.moneda}</p>
                        `;
                }else{
                    document.querySelector(".contenedor-producto-seleccionado").textContent="producto no encontrado"
                }


            });

    }

});

        const botonPedido = document.querySelector(".boton-realizar-pedido");
    if (botonPedido) {
        botonPedido.addEventListener("click", () => {
        const params = new URLSearchParams(window.location.search);
        const idProducto = params.get("id"); 
        console.log("ID capturada antes de ir al carrito:", idProducto);

        window.location.href = `../view/generar_pedido_carrito.html?id=${idProducto}`;

        console.log(idProducto);

    });


    
}






// Aqui viene el nuevo js pendiente de testear 



// voy a intentar guardar la id de la foto que selecciona el cliente

document.addEventListener("DOMContentLoaded",()=>{

    const pageId=document.body.id

    if(pageId==="carrito"){


        
        

        const params=new URLSearchParams(window.location.search);
        const idProducto=params.get('id');

        fetch('../data/productos.json')
            .then(res=>res.json())
            .then(data=>{
                let producto=null;

                if(data.collares[idProducto]) producto=data.collares[idProducto];
                else if (data.anillos[idProducto]) producto=data.anillos[idProducto];
                else if(data.pulsera[idProducto]) producto=data.pulsera[idProducto];
                else if(data.pendientes[idProducto]) producto=data.pendientes[idProducto];


                if(producto){

                    const img=document.querySelector('.foto-producto-carrito');
                        img.src=producto.imagen;
                        img.alt=producto.nombre;

                    const info=document.querySelector(".cantidad-producto-carrito");
                        info.innerHTML=`
                            <h2>${producto.nombre}</h2>
                            <p>Precio: ${producto.precio}${producto.moneda}</p>
                        `;
                }else{
                    document.querySelector(".cantidad-producto-carrito").textContent="producto no encontrado"
                }


            });
    }
        
});


