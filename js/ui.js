
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
let f_ver_bestSeller; 

document.addEventListener("DOMContentLoaded", () => {

    const pageId = document.body.id;

    if(pageId === "index") {

        f_ver_bestSeller = function() {
            const mainIndex = document.querySelector('.main-index');
            if(mainIndex && window.scrollY > 100) {
                mainIndex.classList.add('animacion-ver-bs');
            }
        }

        window.addEventListener('scroll', f_ver_bestSeller);
    }

});

window.addEventListener('scroll', f_ver_bestSeller);
  
// ahora vamos a hacer un funcion para que cuando hagamos click en uno de los productos nos abra otra pestaña con us informacion precio e imagen 

document.addEventListener("DOMContentLoaded",()=>{





    const pageId=document.body.id
    if(pageId==="producto"){


        const params=new URLSearchParams(window.location.search);
        const idProducto=params.get('id');
        const color_contenedor=document.querySelector('.contenedor-producto-seleccionado');

        fetch('../data/productos.json')
            .then(res=>res.json())
            .then(data=>{
                let producto=null;

                if(data.collares[idProducto]){
                    producto=data.collares[idProducto];
                    color_contenedor.classList.add('color-collar');
                }
                else if(data.anillos[idProducto]){ 
                    producto=data.anillos[idProducto];
                    color_contenedor.classList.add('color-anillo');
                } 
                else if(data.pulsera[idProducto]){
                    producto=data.pulsera[idProducto];
                    color_contenedor.classList.add('color-pulsera');
                } 
                else if(data.pendientes[idProducto]){
                    producto=data.pendientes[idProducto];
                    color_contenedor.classList.add('color-pendientes');
                } 


                if(producto){

                const img=document.querySelector('.foto-producto-seleccionado');
                        img.src=producto.imagen;
                        img.alt=producto.nombre;

                    const info=document.querySelector(".info-producto-seleccionado");
                        info.innerHTML=`
                            <h2>${producto.nombre}</h2>
                            <p>${producto.descripcion}</p>
                        `;
                }else{
                    document.querySelector(".contenedor-producto-seleccionado").textContent="producto no encontrado"
                }


            });

    }

});

        const botonPedido = document.getElementById("boton-hacer-pedido");
    if (botonPedido) {
        botonPedido.addEventListener("click", () => {
        const params = new URLSearchParams(window.location.search);
        const idProducto = params.get("id"); // "collar-estrellado"
        console.log("ID capturada antes de ir al carrito:", idProducto);

        // Redirigir al carrito pasando la misma ID
        window.location.href = `../view/generar_pedido_carrito.html?id=${idProducto}`;

    });


    
}









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
                            <h2 class="nombre-articulo">${producto.nombre}</h2>
                            <p class="precio-articulo">Precio: ${producto.precio}${producto.moneda}</p>
                        
                        `;
                }else{
                    document.querySelector(".cantidad-producto-carrito").textContent="producto no encontrado"
                }


                const nombreArticulo = document.querySelector(".nombre-articulo");
                const articuloNombre = document.getElementById("articuloNombre");
                const cantidadArticulo=document.getElementById("cantidadArticulo");
                const articuloCantidad=document.getElementById("articuloCantidad");
        
                if(nombreArticulo) {
                    articuloNombre.innerText = nombreArticulo.innerHTML;
                }else{
                    alert("Nombre no encontrado");
                }

                if (cantidadArticulo && articuloCantidad) {
                    articuloCantidad.innerText = cantidadArticulo.value;
                    cantidadArticulo.addEventListener("input", () => {
                    articuloCantidad.innerText = cantidadArticulo.value;
                    document.getElementById('multiplicador_pedido').innerText=cantidadArticulo.value*valorElemento+"€";

                    });
                }

                

                const precioElemento=document.querySelector(".precio-articulo");
                const textoElemento = precioElemento.textContent; // "Precio: 7$"
                const match = textoElemento.match(/[\d,.]+/); // busca números y decimales
                const valorElemento = parseFloat(match[0].replace(',', '.'));
                let i=valorElemento;
                
                if(precioElemento){
                    
                        if (match) {
                            console.log("Precio:", valorElemento);
                            document.getElementById("multiplicador_pedido").innerText=valorElemento+"€";

                            
                        } else {
                            console.warn("No se encontró un número en el precio");
                        }
                    } else {
                        console.warn("Elemento .precio-articulo no encontrado");
                    }



            });

    }
});


document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".main_productos > .escaparate > div[id]");
    const navLinks = document.querySelectorAll(".cajon-categoria-productos a");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
  
            navLinks.forEach((link) => {
              link.parentElement.classList.remove("active");
              if (link.getAttribute("href") === `#${id}`) {
                link.parentElement.classList.add("active");
              }
            });
          }
        });
      },
      {
        threshold: 0.5, // cuando el 50% de la sección es visible
      }
    );
  
    sections.forEach((section) => observer.observe(section));
  });
  