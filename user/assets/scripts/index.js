"use strict";
var props = {
    shrinkedNavBarActive: false,
    notificationActive: false,
    modalOpened: false
}

window.addEventListener("load", ()=>{

    var navDropDownLink = All(".nav-link .link .link-container .dropdown-btn"),
        navChangePosBtn = Ele(".nav-header .adjust-nav-btn"),
        openMobileMenuBtn = Ele("header .open-menu-btn"),
        closeMobileMenuBtn = Ele(".mobile-nav-container .close-mobile-nav-btn"),
        notificationNextButton = Ele(".right-notif-nav-btn"),
        notificationPrevButton = Ele(".left-notif-nav-btn"),
        transactionNextBtn = Ele(".right-transaction-btn"),
        transactionPrevBtn = Ele(".left-transaction-btn"),
        totalTransactionCountElement = Ele(".transaction-list-content span.total"),
        notificationBtn = All("header .link-btn li button"),
        closeNotifBtn = Ele(".main-notification .notification-header .close-notification-button"),
        transactionLinkBtn = All(".transaction-link-btn"),
        modalCloseBtn = Ele(".cancel-modal-btn");

    closeNotifBtn.addEventListener("click", ()=>{
        actions("close-notif");
    })

    modalCloseBtn.addEventListener("click", ()=>{

        closeModal()

    })


    navDropDownLink.forEach(element => {

        element.addEventListener("click", ()=>{

            if(element.getAttribute("data-id")){
                // console.log(element);

                openNavDropDown(element.getAttribute("data-id"));

            }

        })
        
    });

    notificationBtn.forEach(element => {
        
        if(element.getAttribute("data-action")){
            element.addEventListener("click",  ()=>{
                actions(element.getAttribute("data-action"));
            
            })
            // console.log(element)

        }
    })

    transactionLinkBtn.forEach(element => {

        if(element.hasAttribute("data-id")){

            var id = element.getAttribute("data-id");

            element.addEventListener("click", ()=> {
                openTransModal(id)

            });
        }

    })

    navChangePosBtn.addEventListener("click", changeNavPos);
    openMobileMenuBtn.addEventListener("click", openMobileMenu)
    closeMobileMenuBtn.addEventListener("click", closeMobileMenu);

    notificationNextButton.addEventListener("click", nextNotificationList);
    notificationPrevButton.addEventListener("click", PrevNotificationList);
    transactionNextBtn.addEventListener("click", nextTransactionList);
    transactionPrevBtn.addEventListener("click", PrevTransactionList);
    totalTransactionCountElement.innerText = All(".transaction-list-content .transaction-list-container .transactions").length;


})

function actions(act){
    var notificationContainer = Ele(".main-notification");
   

    switch (act) {

        case "notification":
            notificationContainer.style.right = "10px";
            break;
        case "close-notif":
            notificationContainer.style.right = "-350px";
            break;
        default:
            return;
    }
}

function openModal(){

    const modal = Ele(".dashboard-modal");

    return new Promise((resolve, reject) => {

        try {
            
            modal.style.display = "flex";
    
            setTimeout(()=>{
    
                modal.style.opacity = "1";
    
            }, 50)

            resolve({
                response: "Modal Opened"
            })

        } catch (error) {

            reject({
                response: "Error encountered why opening modal"
            })
            
        }

        
    })


}

function closeModal(){

    const modal = Ele(".dashboard-modal");
    var tansHistoryContainer = Ele(".dashboard-transaction-history-modal"),
        loader = Ele(".dashboard-modal-loader");

    return new Promise((resolve, reject) => {

        try {

            tansHistoryContainer.style.display = "none";
            loader.style.display = "flex";
            
            modal.style.opacity = "0";
            
            setTimeout(()=>{

                modal.style.display = "none";
    
    
            }, 1000)

            resolve({
                response: "Modal Closed"
            })

        } catch (error) {

            reject({
                response: "Error encountered why closing modal"
            })
            
        }

        
    })


}

function openTransModal(id){
    var tansHistoryContainer = Ele(".dashboard-transaction-history-modal"),
        loader = Ele(".dashboard-modal-loader");

    if(id){

        openModal().then(()=>{

            setTimeout(()=>{

                tansHistoryContainer.style.display = "flex";
                loader.style.display = "none";

            }, [1000])

        });

    }

}

function openNavDropDown(id){
    var navDropDown = All(".nav-link .link .dropdown-container"),
        navDropDownLink = All(".nav-link .link .link-container .dropdown-btn");

    if(props.shrinkedNavBarActive){
        unShrinkedNavBar();
    }
    

    navDropDown.forEach(element => {
        
        if(element.getAttribute("data-id") === id){

            if(element.getBoundingClientRect().height !== element.scrollHeight){

                element.style.height = element.scrollHeight + "px";
                // code to change the icon

                navDropDownLink.forEach(element=>{
                    if(element.getAttribute("data-id") === id){
            
                        var childrenElement = [...element.children];
            
                        childrenElement.forEach(ele => {
                            if(ele.classList.contains("link-icon")){
            
                                var finalChildren = [...ele.children];
            
                                finalChildren.forEach(elem => {
                                    if(elem.classList.contains("open-icon")){
                                        elem.style.display = "none";
                                    }else{
            
                                        elem.style.display = "block";
                                    }
                                })
                            }
                        })
                    }
                })
            }else{
                element.style.height = "0px";
                // code to change the icon

                navDropDownLink.forEach(element=>{
                    if(element.getAttribute("data-id") === id){
            
                        var childrenElement = [...element.children];
            
                        childrenElement.forEach(ele => {
                            if(ele.classList.contains("link-icon")){
            
                                var finalChildren = [...ele.children];
            
                                finalChildren.forEach(elem => {
                                    if(elem.classList.contains("open-icon")){
                                        elem.style.display = "block";
                                    }else{
            
                                        elem.style.display = "none";
                                    }
                                })
                            }
                        })
                    }
                })
                
            }
            // console.dir(element.getBoundingClientRect().height)
            // console.dir(element.scrollHeight)
            
        }else{

            element.style.height = "0px";
        }


    })

}

function changeNavPos(){
    if(props.shrinkedNavBarActive){
        unShrinkedNavBar()

    }else{
        shrinkedNavBar();
    }
}


function shrinkedNavBar(){
    var navBar = Ele(".main-body .nav-side"),
        PageContent = Ele(".main-body .main-side");

    navBar.style.width = "60px";
    navBar.style.minWidth = "0px";
    navBar.classList.add("shrinked");
    PageContent.style.width = "calc(100% - 60px)";

    openNavDropDown();

    props.shrinkedNavBarActive = true;
}

function unShrinkedNavBar(){
    var navBar = Ele(".main-body .nav-side"),
    PageContent = Ele(".main-body .main-side");
    
    navBar.style.width = "25%";
    navBar.style.minWidth = "250px";
    
    PageContent.style.width = "calc(75%)";
    props.shrinkedNavBarActive = false;



    setTimeout(()=>{

        if(navBar.classList.contains("shrinked")){
            
            navBar.classList.remove("shrinked");
        }
    }, 150)
}

function openMobileMenu(){

    var menuModal = Ele(".mobile-nav-container"),
        mobileMenu = Ele(".mobile-nav-container .mobile-nav")

    menuModal.style.display = "block";

    setTimeout(()=>{
        menuModal.style.opacity = "1";
        mobileMenu.style.left ="0px";


    }, 50)
}

function closeMobileMenu(){

    var menuModal = Ele(".mobile-nav-container"),
        mobileMenu = Ele(".mobile-nav-container .mobile-nav");

        mobileMenu.style.left ="-350px";
        
        setTimeout(()=>{

            menuModal.style.opacity = "0";

            setTimeout(()=>{

                menuModal.style.display = "none";
            }, 600)

        }, 600)
}

function nextNotificationList(){
    var notificationContent = All(".notification-list-container .notification-content"),
        totalNotifContainer = notificationContent.length,
        parentElement = Ele(".notification-list-container"),
        scrollLength = notificationContent[0].getBoundingClientRect().width,
        totalNotifLength = (scrollLength * totalNotifContainer),
        presentScrolledLength = ((-1 * notificationContent[0].offsetLeft) + parentElement.getBoundingClientRect().width);

    if(presentScrolledLength >=  totalNotifLength - 10){

        notificationContent[0].style.marginLeft = (-1 * (totalNotifLength - parentElement.getBoundingClientRect().width)) + "px";
        
    }else{

        notificationContent[0].style.marginLeft = (notificationContent[0].offsetLeft + (-1 * scrollLength)) + "px";

    }

    // console.log(presentScrolledLength + "===" + totalNotifLength);

    
}

function PrevNotificationList(){
    var notificationContent = All(".notification-list-container .notification-content"),
        scrollLength = notificationContent[0].getBoundingClientRect().width,
        presentScrolledLength = notificationContent[0].offsetLeft,
        neededScrollLength = (notificationContent[0].offsetLeft + scrollLength);

    if(presentScrolledLength >=  0){

        notificationContent[0].style.marginLeft = "0px";
        
    }else{

        if(neededScrollLength > 0 || ((-1 * neededScrollLength )< (scrollLength - 10))){

            notificationContent[0].style.marginLeft = "0px";
        }else{

            notificationContent[0].style.marginLeft = neededScrollLength + "px";
        }


    }

    // console.log((-1 * neededScrollLength) + "===" + (scrollLength));

    
}

function nextTransactionList(){
    var notificationContent = All(".transaction-list-content .transaction-list-container .transactions"),
        totalNotifContainer = notificationContent.length,
        presentTransactionCountElement = Ele(".transaction-list-content span.present"),
        parentElement = Ele(".transaction-list-content .transaction-list-container"),
        scrollLength = notificationContent[0].getBoundingClientRect().width,
        totalNotifLength = (scrollLength * totalNotifContainer),
        presentScrolledLength = ((-1 * notificationContent[0].offsetLeft) + parentElement.getBoundingClientRect().width);

    if(presentScrolledLength >=  totalNotifLength - 10){

        notificationContent[0].style.marginLeft = (-1 * (totalNotifLength - parentElement.getBoundingClientRect().width)) + "px";
        
    }else{

        notificationContent[0].style.marginLeft = (notificationContent[0].offsetLeft + (-1 * scrollLength)) + "px";

    }

    // presentTransactionCountElement.innerText = (((-1 * (notificationContent[0].offsetLeft - 50) )/ scrollLength) + 2)

    // console.log(presentScrolledLength + "===" + totalNotifLength);

    
}

function PrevTransactionList(){
    var notificationContent = All(".transaction-list-content .transaction-list-container .transactions"),
        scrollLength = notificationContent[0].getBoundingClientRect().width,
        presentScrolledLength = notificationContent[0].offsetLeft,
        neededScrollLength = (notificationContent[0].offsetLeft + scrollLength);

    if(presentScrolledLength >=  0){

        notificationContent[0].style.marginLeft = "0px";
        
    }else{

        if(neededScrollLength > 0 || ((-1 * neededScrollLength )< (scrollLength - 10))){

            notificationContent[0].style.marginLeft = "0px";
        }else{

            notificationContent[0].style.marginLeft = neededScrollLength + "px";
        }


    }

    // console.log((-1 * neededScrollLength) + "===" + (scrollLength));

    
}
