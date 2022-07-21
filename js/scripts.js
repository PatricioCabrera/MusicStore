class Album{
    constructor(band, name, price, year) {
      this.band = band;
      this.name = name;
      this.price = price;
      this.year = year;
      this.imgPath = `./img/albums/${band.replace(/\s+/g, '-').toLowerCase()}-${name.replace(/\s+/g, '-').toLowerCase()}.jpg`; //reemplazar espacios por guión con regex y convertir a minúscula.
      this.id = band.replace(/\s+/g, '-') + name.replace(/\s+/g, '-') + year;
    }
}

let isLoggedIn = false; //ya se inició sesión?

let albumArray = [];
let albumAddedToCart = [];

let totalPrice = 0;

albumArray.push(
    new Album("Angra", "Temple Of Shadows", 20, "2004"),
    new Album("Dark Moor", "Beyond The Sea", 5, "2004"),
    new Album("Galneryus", "Angel Of Salvation", 20, "2012"),
    new Album("Hizaki", "Rosario", 10, "2016"),
    new Album("Iorio", "Peso Argento", 40, "1997"),
    new Album("Kotipelto", "Coldness", 5, "2004"),
    new Album("Pagan's Mind", "God's Equation", 25, "2005"),
    new Album("Paladin", "Ascension", 20, "2019"),
    new Album("Sinergy", "Suicide By My Side", 15, "2002"),
    new Album("Stratovarius", "Elements", 30, "2014"),
    new Album("Stratovarius", "Infinite", 5, "2000"),
    new Album("Symphonity", "Voice From The Silence", 30, "2008"),
    );

let loadAlbums = () =>{
    for (album of albumArray){
        $('#card-container').append(`
        <div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" width="500" src="${album.imgPath}" alt="..." />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${album.name}</h5>
                        <h5 class="fw-bolder">${album.band}</h5>
                        <h6>${album.year}</h6>
                        $${album.price}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" onclick=addToCart("${album.id}") href="#">Comprar</a></div>
                </div>
            </div>
        </div>
        `)
    }
}


let toggleLogon = () => { //función para mostrar login modal
    if(isLoggedIn == false){
        $('#staticBackdrop').modal('toggle');
        checkLogOn();
    }
};

let checkLogOn = () => { //Si no se inició  sesión, mostrar botón para acceder.
    if (!isLoggedIn && $('#login-btn').length == 0 ) {
        $('#card-container').append('<button class="btn btn-primary" id="login-btn" onClick="toggleLogon()">Iniciar sesión</button>');
    }
    if (isLoggedIn) {
        $('#login-btn').remove();
        loadAlbums();
    }
}

let addToCart = (albumId) => {
    console.log("Llegue")
    let resultado = albumArray.find(obj => { //Filtramos el ID dentro del array de albums, lo agrego a un nuevo array que va a ir teniendo los items en el carrito.
        return obj.id == albumId;
    } )
    albumAddedToCart.push(resultado);
    sumPrices();

    $('.badge.bg-dark.text-white.ms-1.rounded-pill').html(albumAddedToCart.length);
    showToast(resultado);
}

let showToast = (resultado) => {
    if ($('#liveToast').length > 0) $('#liveToast').remove();

    $('body').append(
        `
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <img src="${resultado.imgPath}" class="rounded me-2" width="32" alt="...">
                    <strong class="me-auto">Producto añadido</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${resultado.band} -
                    ${resultado.name} -
                    ${resultado.year} <br>
                    $${resultado.price}
                </div>
            </div>
        </div>
        `
    )
    $(document).ready( $('#liveToast').toast("show") );
}

let showCart = () => {
    if ($('#cartModal').length > 0){
        $('#cartModal').remove();
    }
    
    $('body').append(
        `
        <div class="modal fade" id="cartModal" data-bs-keyboard="false" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Carrito</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="cartModalContainer">
                        <p>${totalPrice}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    ) 
    for(album of albumAddedToCart){
        $('#cartModalContainer').append(
            `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${album.imgPath}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${album.band} - ${album.name}</h5>
                            <p class="card-text">$${album.price}</p>
                        </div>
                    </div>
                </div>
            </div>
            `
        )
    }
    $('#cartModal').modal('toggle');
}

let sumPrices = () => {
    for (album of albumAddedToCart){
        totalPrice += album.price
    }
    return totalPrice
}

$(document).ready(toggleLogon); //ejecutar login modal tras carga del documento

$('#button-submit').click( function() { // detectar formulario y revisar la validez con los métodos de Bootstrap
    let form = $('#login-form');

    if (form[0].checkValidity() == false) {
        event.preventDefault();
        event.stopPropagation();
    }

    if (form[0].checkValidity() == true) {
        event.preventDefault();
        isLoggedIn = true;
        $('#staticBackdrop').modal('hide');
        checkLogOn();
    }

    form.addClass('was-validated')
})

$('#viewCart').click(showCart);
