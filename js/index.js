window.addEventListener('load', function() {
    console.log('All assets are loaded');

    let btnTop = document.getElementById("btnTop");

    window.onscroll = function() {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
            btnTop.style.display = "block";
        } else {
            btnTop.style.display = "none";
        }
    };
    btnTop.addEventListener('click', () => { 
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    let sushirollList = [
        {nombre: 'California Roll', imagen: './assets/img/californiaroll.png', precio: 180, cantidad: 1, id: 'sushiroll-menu'},
        {nombre: 'Philadelphia Roll', imagen: './assets/img/philadelphiaroll.png', precio: 180, cantidad: 1, id: 'sushiroll-menu'},
        {nombre: 'Pennsylvania Roll', imagen: './assets/img/pennsylvaniaroll.png', precio: 200, cantidad: 1, id: 'sushiroll-menu'},
        {nombre: 'Tijuana Roll', imagen: './assets/img/tijuanaroll.png', precio: 250, cantidad: 1, id: 'sushiroll-menu'},
        {nombre: 'Feel Roll', imagen: './assets/img/feelroll.png', precio: 220, cantidad: 1, id: 'sushiroll-menu'},
        {nombre: 'Green Roll', imagen: './assets/img/greenroll.png', precio: 220, cantidad: 1, id: 'sushiroll-menu'},
        {nombre: 'Passion Roll', imagen: './assets/img/passionroll.png', precio: 220, cantidad: 1, id: 'sushiroll-menu'},
        {nombre: 'Sake Nigiri', imagen: './assets/img/sakenigiri.png', precio: 270, cantidad: 1, id: 'sushiroll-menu'},
        {nombre: 'Ebi Nigiri', imagen: './assets/img/ebinigiri.png', precio: 270, cantidad: 1, id: 'sushiroll-menu'},
        {nombre: 'Tuna Nigiri', imagen: './assets/img/tunanigiri.png', precio: 270, cantidad: 1, id: 'sushiroll-menu'},
        {nombre: 'Gyozas de Pollo x3', imagen: './assets/img/gyozas.png', precio: 520, cantidad: 1, id: 'sushiroll-menu'},
        {nombre: 'Siao Pao de Gambas x6', imagen: './assets/img/siaopao.png', precio: 640, cantidad: 1, id: 'sushiroll-menu'},  
    ];
    let pokebowlList = [
        {nombre: 'Poke Veggie', imagen: './assets/img/pokeveggie.png', precio: 520, cantidad: 1, id: 'pokebowl-menu'},
        {nombre: 'Poke Tuna', imagen: './assets/img/poketuna.png', precio: 570, cantidad: 1, id: 'pokebowl-menu'},
        {nombre: 'Poke Salmón Teriyaki', imagen: './assets/img/pokesalmonteriyaki.png', precio: 710, cantidad: 1, id: 'pokebowl-menu'},
    ];
    let wokList = [
        {nombre: 'Yakimeshi de Cerdo y Vegetales', imagen: './assets/img/yakimeshiwok.png', precio: 620, cantidad: 1, id: 'wok-menu'},
        {nombre: 'Yakisoba de Pollo', imagen: './assets/img/yakisobawok.png', precio: 780, cantidad: 1, id: 'wok-menu'},    
    ];
    let beverageList = [
        {nombre: 'Lata de Sprite', imagen: './assets/img/sprite.png', precio: 200, cantidad: 1, id: 'beverage-menu'},
        {nombre: 'Lata de Mirinda', imagen: './assets/img/mirinda.png', precio: 200, cantidad: 1, id: 'beverage-menu'},
        {nombre: 'Lata de Coca Cola Zero', imagen: './assets/img/cocacolazero.png', precio: 200, cantidad: 1, id: 'beverage-menu'},
        {nombre: 'Lata de Coca Cola', imagen: './assets/img/cocacola.png', precio: 220, cantidad: 1, id: 'beverage-menu'},
        {nombre: 'Agua sin gas Evian de 1L', imagen: './assets/img/evian.png', precio: 150, cantidad: 1, id: 'beverage-menu'}
    ];

    let emptyList = [];

    let allProducts = sushirollList.concat(pokebowlList).concat(wokList).concat(beverageList);

    const greeting = () => {
        this.document.getElementById('greeting').innerHTML =
        `
            <h2>Bienvenidxs a Oishi! Sushi</h2>
            <p>¡Checkea nuestra carta!</p>
        `;
    };

    greeting();

    let btnSushiRoll = document.getElementById("sushiroll-btn");
    let btnPokeBowl = document.getElementById("pokebowl-btn");
    let btnWok = document.getElementById("wok-btn");
    let btnBeverage = document.getElementById("beverage-btn");

    const removeButtonStyle = () => {
        btnSushiRoll.classList.remove("btn-sushiroll-active");
        btnPokeBowl.classList.remove("btn-pokebowl-active");
        btnWok.classList.remove("btn-wok-active");
        btnBeverage.classList.remove("btn-beverage-active");
    };

    let notificationText = document.getElementById("notification");
    let notificationTextWarningAdd = document.getElementById("notification-warning-add");
    let notificationTextWarningMinus= document.getElementById("notification-warning-minus");

    const notification = (textId) => {
        textId.classList.add("show");
        textId.animate([{transform: 'translateX(330px)'}, {transform: 'translateX(0px)'}], 
        {duration: 300});
        setTimeout(function(){
            textId.animate([{transform: 'translateX(0px)'}, {transform: 'translateX(330px)'}], 
            {duration: 300});
        }, 1800);
        setTimeout(function(){
            textId.classList.remove("show");
        }, 2100); 
    };


    let notificationTextDelete = document.getElementById("notification-delete");
    const notificationDelete = () => {
        notificationTextDelete.classList.add("show");
        notificationTextDelete.animate([{transform: 'translateY(75px)'}, {transform: 'translateY(0px)'}], 
        {duration: 300});
        setTimeout(function(){
            notificationTextDelete.animate([{transform: 'translateY(0px)'}, {transform: 'translateY(75px)'}], 
            {duration: 300});
        }, 1000);
        setTimeout(function(){
            notificationTextDelete.classList.remove("show");
        }, 1300); 
    };

    let iconShopCounter = document.getElementById("icon-shop-count");
    let order = [];
    let orderItems = [];
    
    let count = order.length;
    iconShopCounter.innerHTML = count;
    
    let searchIcon = document.getElementById("search-icon");
    let searchInput = document.getElementById("search-input");
    let searchWord = searchInput.value;


    function showLists (list, id){
        document.getElementById("order-section").style.display = "none";
        let acu =  ``;
        for(let i = 0; i < list.length; i++){
            acu += `
            <div class="menu-items-box">
                <div class="menu-items" id="item-${list[i].id}${i}">
                    <div class="item-img">
                        <img src="${list[i].imagen}" alt="${list[i].nombre}">
                    </div>
                    <div class="item-text">
                        <p>${list[i].nombre}</p>
                        <p>$ ${list[i].precio}</p>
                    </div>
                    <div class="list-quantity" id="list-quantity${i}">
                        <span id="less-list${i}" class="plus-list list-quantity-icon"><i class="fas fa-minus"></i></span>
                        <span class="list-quantity-number" id="quantity-list${i}"> ${list[i].cantidad} </span>
                        <span id="plus-list${i}" class="plus-list list-quantity-icon"><i class="fas fa-plus"></i></span> 
                    </div>
                    <div class="item-add" id="${list[i].id}${i}"><i class="fas fa-plus item-add-icon"></i></div>
                    
                </div>
                <p class="quantity-notification" id="quantity-notification${i}"></p>
            </div>
            `;
            
        };
        
        document.getElementById(id).innerHTML = acu;
        
        orderItems.forEach(item => {
            let findOrderItem = list.find(list => list.nombre == item);
            let indexFindOrderItem = list.indexOf(findOrderItem);

            if(findOrderItem != null){
                document.getElementById(`list-quantity${indexFindOrderItem}`).classList.add("list-quantity-active");
                document.getElementById(`${list[indexFindOrderItem].id}${indexFindOrderItem}`).style.display = "none";
                document.getElementById(`quantity-notification${indexFindOrderItem}`).style.display = "block";
                document.getElementById(`item-${list[indexFindOrderItem].id}${indexFindOrderItem}`).classList.add("menu-item-added"); 

                if(list[indexFindOrderItem].cantidad == 1){
                    document.getElementById(`quantity-notification${indexFindOrderItem}`).innerHTML = `Hay ${list[indexFindOrderItem].cantidad} unidad en tu carrito`;
                }else{
                    document.getElementById(`quantity-notification${indexFindOrderItem}`).innerHTML = `Hay ${list[indexFindOrderItem].cantidad} unidades en tu carrito`;
                }
            };

        });

        addingToOrder(list);

        addList(list);

        minusList(list);

    };

    const addList = (list) => {
        for (let i = 0; i < list.length; i++){

            document.getElementById(`plus-list${i}`).addEventListener('click', ()=>{
                if (list[i].cantidad < 50){
                    list[i].cantidad += 1;
                    
                    this.document.getElementById(`quantity-list${i}`).innerHTML = `${list[i].cantidad}`;
                    this.document.getElementById(`quantity-notification${i}`).innerHTML = `Hay ${list[i].cantidad} unidades en tu carrito`;
                    this.document.getElementById(`quantity-notification${i}`).style.display = "block";
                    this.document.getElementById(`${list[i].id}${i}`).style.display = "none"; 


                    let findItem = order.find(order => order.nombre == list[i].nombre);
                    let indexItemOrder = order.indexOf(findItem);
                    
                    order[indexItemOrder].cantidad = list[i].cantidad;

                    notificationTextWarningAdd.innerHTML = `
                    <p><i class="fas fa-exclamation"></i> Se agregó 1 unidad más de ${order[indexItemOrder].nombre}</p>`;
                    notification(notificationTextWarningAdd);
                    
                }else{
                    swal("Ouch!...", "No se puede agregar más, hay escasez de stock", "warning");
                };
                
            });
        };
    };

    const minusList = (list) => {
        for (let i = 0; i < list.length; i++){

            document.getElementById(`less-list${i}`).addEventListener('click', ()=>{
                if (list[i].cantidad > 1){
                    list[i].cantidad -= 1;
                    
                    this.document.getElementById(`quantity-list${i}`).innerHTML = `${list[i].cantidad}`;
                    this.document.getElementById(`quantity-notification${i}`).style.display = "block";
                    this.document.getElementById(`${list[i].id}${i}`).style.display = "none"; 
                    if(list[i].cantidad >= 2){
                        this.document.getElementById(`quantity-notification${i}`).innerHTML = `Hay ${list[i].cantidad} unidades en tu carrito`;
                    }else{
                        this.document.getElementById(`quantity-notification${i}`).innerHTML = `Hay ${list[i].cantidad} unidad en tu carrito`;
                    }

                    let findItem = order.find(order => order.nombre == list[i].nombre);
                    let indexItemOrder = order.indexOf(findItem);
                    

                    order[indexItemOrder].cantidad = list[i].cantidad;

                    notificationTextWarningMinus.innerHTML = `
                    <p><i class="far fa-times-circle"></i> Se eliminó 1 unidad de ${order[indexItemOrder].nombre}</p>`;
                    notification(notificationTextWarningMinus);
                    
                }else{
                    swal("Ouch!...", "La cantidad no puede ser menor a 1", "warning");
                };
                
            });
        };
    };


    const addingToOrder = (list) => {
        
        for(let i = 0; i < list.length; i++){
        
            document.getElementById(`${list[i].id}${i}`).addEventListener('click', ()=>{

                document.getElementById(`list-quantity${i}`).classList.add("list-quantity-active");
                document.getElementById(`${list[i].id}${i}`).style.display = "none";
                document.getElementById(`quantity-notification${i}`).innerHTML = `Hay 1 unidad en tu carrito`;
                document.getElementById(`quantity-notification${i}`).style.display = "block";
                document.getElementById(`item-${list[i].id}${i}`).classList.add("menu-item-added");

                order.push(list[i]);
                orderItems.push(list[i].nombre);
                
                count = order.length;
                iconShopCounter.innerHTML = count;
                
                notificationText.innerHTML = `
                <p><i class="fas fa-check"></i> Producto agregado a tu carrito </p>`;
                notification(notificationText);
            });
        };
    };


    const removeInputAnimation = () => {
        searchInput.classList.remove("input-animation-in");
        searchInput.classList.add("input-animation-out");
        setTimeout(function (){
            searchInput.style.display = "none";
        }, 300);
        searchWord = "";
    };

    const addInputAnimation = () => {
        searchInput.classList.remove("input-animation-out");
        searchInput.style.display = "inline-block";
        searchInput.classList.add("input-animation-in");
    };


    btnSushiRoll.addEventListener('click', () =>{
        showLists(sushirollList, "menu");
        removeInputAnimation();
        document.getElementById("order-sent").classList.remove("show");
        document.getElementById("header").style.display = "grid";
        document.getElementById("search-result-list").classList.remove("show");
        document.getElementById("order-section").style.display = "none";
        document.getElementById("no-order").classList.remove("show");
        document.getElementById("no-search-result").classList.remove("show");
        document.getElementById('greeting').classList.add("hide");
        document.getElementById("menu").classList.add("show");
        document.getElementById("header-text").style.color = "rgb(241, 237, 206)";
        removeButtonStyle();
        btnSushiRoll.classList.add("btn-sushiroll-active");  
        document.getElementById("icon-header").innerHTML = `<header-icon class="fas fa-sushi-roll" style="color: #000000; header-icon" id="sushiroll-icon"></fas>`;
        document.getElementById("sushiroll-icon").style.backgroundImage = "url('../img/bg-sushiroll.png')";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
    btnPokeBowl.addEventListener('click', () =>{
        showLists(pokebowlList, "menu");
        removeInputAnimation();
        document.getElementById("order-sent").classList.remove("show");
        document.getElementById("header").style.display = "grid";
        document.getElementById("search-result-list").classList.remove("show");
        document.getElementById("order-section").style.display = "none";
        document.getElementById("no-order").classList.remove("show");
        document.getElementById("no-search-result").classList.remove("show");
        document.getElementById('greeting').classList.add("hide");
        document.getElementById("menu").classList.add("show");
        document.getElementById("header-text").style.color = "rgb(245, 245, 196)";
        removeButtonStyle();
        btnPokeBowl.classList.add("btn-pokebowl-active");
        document.getElementById("icon-header").innerHTML = `<i class="fas fa-soup" style="color: #000000; header-icon" id="pokebowl-icon"></i>`;
        document.getElementById("pokebowl-icon").style.backgroundImage = "url('../img/bg-pokebowl.png')";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
    btnWok.addEventListener('click', () =>{
        showLists(wokList, "menu");
        removeInputAnimation();
        document.getElementById("order-sent").classList.remove("show");
        document.getElementById("header").style.display = "grid";
        document.getElementById("search-result-list").classList.remove("show");
        document.getElementById("order-section").style.display = "none";
        document.getElementById("no-order").classList.remove("show");
        document.getElementById("no-search-result").classList.remove("show");
        document.getElementById('greeting').classList.add("hide");
        document.getElementById("menu").classList.add("show");
        document.getElementById("header-text").style.color = "rgb(239, 190, 192)";
        removeButtonStyle();
        btnWok.classList.add("btn-wok-active");
        document.getElementById("icon-header").innerHTML = `<i class="fas fa-soup" style="color: #000000; header-icon" id="wok-icon"></i>`;
        document.getElementById("wok-icon").style.backgroundImage = "url('../img/bg-wok.png')";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
    btnBeverage.addEventListener('click', () =>{
        showLists(beverageList, "menu");
        removeInputAnimation();
        document.getElementById("order-sent").classList.remove("show");
        document.getElementById("header").style.display = "grid";
        document.getElementById("search-result-list").classList.remove("show");
        document.getElementById("order-section").style.display = "none";
        document.getElementById("no-order").classList.remove("show");
        document.getElementById("no-search-result").classList.remove("show");
        document.getElementById('greeting').classList.add("hide");
        document.getElementById("menu").classList.add("show");
        document.getElementById("header-text").style.color = "rgb(193, 223, 192)";
        removeButtonStyle();
        btnBeverage.classList.add("btn-beverage-active");
        document.getElementById("icon-header").innerHTML = `<i class="<i class="fas fa-glass-citrus" style="color: #000000 header-icon" id="beverage-icon"></i>`;
        document.getElementById("beverage-icon").style.backgroundImage = "url('../assets/img/bg-beverage.png')";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });


    let searchResult;

    searchIcon.addEventListener('click', () => {
        document.getElementById("search-input").value = "";
        removeButtonStyle();
        showLists(emptyList, "menu");
        addingToOrder(emptyList);
        document.getElementById('greeting').classList.add("hide");
        document.getElementById("search-result-list").classList.remove("show");
        document.getElementById("no-search-result").classList.add("show");
        document.getElementById("header").style.display = "none";
        document.getElementById("no-search-result").innerHTML = `
            <p class="search-result box-notification">busca algo que podría haber en nuestra carta</p>`;
        document.getElementById("no-order").classList.remove("show");
        document.getElementById("order-sent").classList.remove("show");
        if (searchInput.style.display === "none") {
            addInputAnimation();
            searchInput.focus();
        } else {
            removeInputAnimation();
            document.getElementById("header").style.display = "grid";
            document.getElementById("icon-header").innerHTML = `<i class="fas fa-sushi-roll header-icon" id="header-icon"></i>`;
            document.getElementById("header-text").style.color = "rgb(245, 245, 245)";
            document.getElementById("no-order").classList.add("show");
            document.getElementById("no-search-result").classList.remove("show");
        }
    });

    
    searchInput.addEventListener('input', ()=>{
        
        searchWord = searchInput.value;
        
        searchResult = allProducts.filter((allProducts) => allProducts.nombre.toLowerCase().includes(searchWord.toLowerCase().trim()));
        
        document.getElementById("menu").classList.remove("show");
        document.getElementById("header").style.display = "none";
        if(document.getElementById("search-input").value == ""){
            document.getElementById("no-search-result").innerHTML = `
            <p class="search-result box-notification">Busca en nuestro Menú </p>
                `;
            document.getElementById("no-order").classList.remove("show");
            document.getElementById("search-result-list").classList.remove("show");
        }else{
            if(searchResult.length == 0){
                document.getElementById("search-result-list").classList.remove("show");
                document.getElementById("no-search-result").classList.add("show");
                document.getElementById("no-search-result").innerHTML = `
                <p class="search-result box-notification">No se encontraron resultados a tu búsqueda <i class="far fa-sad-cry"></i></p>`;
            }else{
                document.getElementById("search-result-list").classList.add("show");
                document.getElementById("no-search-result").classList.add("show");
                document.getElementById("no-search-result").innerHTML = `
                <p class="search-result-list-text box-notification">Estos podrían interesarte: </p> `;
                document.getElementById("no-order").classList.remove("show");

                showLists(searchResult, "search-result-list");
            };
        };
        
    });


    function removeItems(){
        if(order.length > 0){
            for (let i = 0; i < order.length; i++){
                
                document.getElementById(`cancel${i}`).addEventListener('click', ()=>{
                    if(count == 1){
                        order[i].cantidad = 1;
                        order.splice(i, 1);
                        orderItems = [];
                        count--;
                        iconShopCounter.innerHTML = count;
                        createOrder();
                    }else{
                        document.getElementById(`order-text${i}`).style.backgroundColor = "rgb(247,135,138)";
                        document.getElementById(`order-text${i}`).style.color = "rgb(247,135,138)";
                        document.getElementById(`plus${i}`).style.color = "rgb(247,135,138)";
                        document.getElementById(`less${i}`).style.color = "rgb(247,135,138)";
                        document.getElementById(`order-text${i}`).animate([{transform: 'translateX(0px)'}, {transform: 'translateX(830px)'}], 
                        {duration: 500});
                        setTimeout(function(){
                            notificationTextDelete.innerHTML = `
                            <p><i class="far fa-times-circle"></i> Eliminaste ${order[i].nombre} del carrito`;
                            notificationDelete();
                            order[i].cantidad = 1;
                            order.splice(i, 1);
                            orderItems.splice(i, 1);
                            count--;
                            iconShopCounter.innerHTML = count;
                            createOrder();
                        }, 500);
                    }
                    
                });
            };
        }else{
            document.getElementById("icon-header").innerHTML = `<i class="fas fa-sushi-roll header-icon" id="header-icon"></i>`;
            document.getElementById("order-section").style.display = "none";
            swal("No hay nada en tu carrito", "¡Checkea nuestra carta!", "error");
            document.getElementById("no-order").classList.add("show");

        };
    };

    const add = () => {
        for (let i = 0; i < order.length; i++){
            document.getElementById(`plus${i}`).addEventListener('click', ()=>{
                if (order[i].cantidad < 50){
                    order[i].cantidad += 1;
                    notificationTextWarningAdd.innerHTML = `
                    <p><i class="fas fa-exclamation"></i> Se agrego 1 unidad más de ${order[i].nombre}</p>`;
                    notification(notificationTextWarningAdd);

                    createOrder();
                }else{
                    swal("Ouch!...", "No se puede agregar más, hay escasez de stock", "warning");
                };
                
            });
        };
    };
    
    const minus = () => {
        for (let i = 0; i < order.length; i++){
            document.getElementById(`less${i}`).addEventListener('click', ()=>{
                if (order[i].cantidad > 1){
                    order[i].cantidad -= 1;
                    notificationTextWarningMinus.innerHTML = `
                    <p><i class="far fa-times-circle"></i> Se eliminó 1 unidad de ${order[i].nombre}</p>`;
                    notification(notificationTextWarningMinus);

                    createOrder();
                }else{
                    swal("Oops...", "La cantidad no puede ser menor a 1", "warning");
                };
                
            });
        };
    };
    

    function createOrder(){
        let orderList = `
            <h4>Tu Carrito:</h4>
            <div class="order-text" id="order-text">
                <p class="order-text-cantidad"></p>
                <p class="order-text-price">$190 el envío</p>
                <p class="order-text-cancel"></p>
            </div>
        `;
        let total = 0;
        
        for(let i = 0; i < order.length; i++){
            let price = order[i].precio * order[i].cantidad;
            orderList += `
                <div class="order-text" id="order-text${i}">
                    <p class="order-text-cantidad">
                        <span id="plus${i}" class="quantity-icon"><i class="fas fa-caret-up"></i></span> 
                        <span class="quantity"> ${order[i].cantidad} </span>
                        <span id="less${i}" class="quantity-icon"><i class="fas fa-caret-down"></i></span>
                    </p>
                    <p class="order-text-name">${order[i].nombre}</p>
                    <p class="order-text-price">$ ${price}</p>
                    <p class="order-text-cancel" id="cancel${i}"><i class="far fa-times-circle"></i></p>
                </div>
            `;
            total += price;
            
        };
        
        document.getElementById("order-section").style.display = "block";
        document.getElementById("order-list").innerHTML = orderList;
        document.getElementById("order-total").innerHTML = 
        `
            <p class="order-total">Total: $ ${total+190}</p>
        `;

        removeItems();
        
        add();
        
        minus();
        
        let orderWhatsapp = ``;
        for (let i = 0; i< order.length; i++){
            orderWhatsapp += `${order[i].cantidad} ${order[i].nombre}, ` ;
        }
        
        document.getElementById("order-whatsapp").innerHTML = `
        <a class="order-btn wapp" id="wapp-order" href="https://api.whatsapp.com/send?phone=542215692366&text=*Hola Oishi! Sushi* Me gustaría pedir: ${orderWhatsapp} Total: $ ${total+190}. Gracias" target="_blank"><i class="fab fa-whatsapp"></i> Enviar por Whatsapp</a>
        `;

        deleteOrder();

        orderSent()
    };

    function orderSent(){
        document.getElementById("wapp-order").addEventListener('click', ()=>{
            for(let i = 0; i < order.length; i++){
                order[i].cantidad = 1;
            };
            order = [];
            orderItems = [];
            count = 0;
            iconShopCounter.innerHTML = count;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            document.getElementById("order-section").style.display = "none";
            document.getElementById("order-sent").classList.add("show");
            document.getElementById("order-sent").innerHTML = `
            <p class="box-notification"> Tu pedido ha sido enviado, en breve te avisamos por Whatsapp <i class="far fa-smile-beam smile-icon"></i></p>
            `;
        });
    };

    function deleteOrder(){
        document.getElementById("order-delete").innerHTML = `<p class="order-btn delete"><i class="fas fa-times-circle"></i> Borrar el pedido </p>`;
        document.getElementById("order-delete").addEventListener('click', ()=>{
            for(let i = 0; i < order.length; i++){
                order[i].cantidad = 1;
            };
            order = [];
            orderItems = [];
            count = 0;
            iconShopCounter.innerHTML = count;
            document.getElementById("icon-header").innerHTML = `<i class="fas fa-sushi-roll header-icon" id="header-icon"></i>`;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            document.getElementById("order-section").style.display = "none";
            document.getElementById("no-order").classList.add("show");
            document.getElementById("no-order").style.marginBottom = "1rem";
            swal("No hay nada en tu carrito", "¡Checkea nuestra carta!", "error");
        });
    };
    

    document.getElementById("icon-shop").addEventListener(('click'), ()=>{
        removeInputAnimation();
        document.getElementById("no-search-result").classList.remove("show");
        document.getElementById("menu").classList.remove("show");
        removeButtonStyle();
        document.getElementById("header-text").style.color = "rgb(255, 255, 255)";
        document.getElementById("order-sent").classList.remove("show");
        if(count == 0){
            swal("No hay nada en tu carrito", "¡Checkea nuestra carta!", "error");
            document.getElementById("icon-header").innerHTML = `<i class="fas fa-sushi-roll header-icon" id="header-icon"></i>`;
            document.getElementById("no-order").classList.add("show");
            document.getElementById('greeting').classList.add("hide");
            document.getElementById("header").style.display = "grid";
        }else{
            document.getElementById("icon-header").innerHTML = `<i class="fas fa-tasks header-icon" id="checkout-icon"></i>`;
            document.getElementById("checkout-icon").style.backgroundImage = "url('../img/bg.png')";
            document.getElementById("no-order").classList.remove("show");
            document.getElementById("order-section").style.display = "block";
            document.getElementById("search-result-list").classList.remove("show");
            document.getElementById("header").style.display = "grid";
            document.getElementById("search-input").value = "";      
            createOrder();
        };
    });
});