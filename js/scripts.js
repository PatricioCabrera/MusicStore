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

albumArray.push(
    new Album("Angra", "Temple Of Shadows", "20", "2004"),
    new Album("Dark Moor", "Beyond The Sea", "5", "2004"),
    new Album("Galneryus", "Angel Of Salvation", "20", "2012"),
    new Album("Hizaki", "Rosario", "10", "2016"),
    new Album("Iorio", "Peso Argento", "40", "1997"),
    new Album("Kotipelto", "Coldness", "5", "2004"),
    new Album("Pagan's Mind", "God's Equation", "25", "2005"),
    new Album("Paladin", "Ascension", "20", "2019"),
    new Album("Sinergy", "Suicide By My Side", "15", "2002"),
    new Album("Stratovarius", "Elements", "30", "2014"),
    new Album("Stratovarius", "Infinite", "5", "2000"),
    new Album("Symphonity", "Voice From The Silence", "30", "2008"),
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

    showToast(resultado);
}

let showToast = (resultado) => {

    var toast = document.getElementById("liveToast");
    toast.className = "mostrar";
    setTimeout(function(){ toast.className = toast.className.replace("mostrar", ""); }, 5000);

    $('body').append(
        `
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <img src="..." class="rounded me-2" alt="...">
                    <strong class="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${resultado.band}
                </div>
            </div>
        </div>
        `
    )
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