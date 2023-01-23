const taxRate = 0.18;
const shippingPrice = 15;
const shippingFreePrice = 300;

window.addEventListener("load",()=>{
    localStorage.setItem("taxRate",taxRate);
    localStorage.setItem("shippingPrice",shippingPrice);
    localStorage.setItem("shippingFreePrice",shippingFreePrice);

});
//👆sayfa yüklendiğinde local storag'e taxRate ,shippingPrice ,shippingFreePrice verilerini gönderdik.Local storage ile session storage arasındaki fark şu :session storage de telefonu veya bilgisayarı kapatınca depolanan veriler silinmiş oluyor.localde veriler her durumda browser da saklı kalıyor.Local storage: JavaScript sitelerinin ve uygulamalarının son kullanma tarihi olmadan, bir web tarayıcısında anahtar/değer değerlerinin kaydedilmesine izin veren.
// Session storage: Bir web tarayıcısında anahtar/değer değerleri yalnızca bir oturum süresi için tarayıcıya kaydedilmesine izin veren bir özelliktir. Yani sekme tarayıcısı kapatıldığında de yok eder
const productsDiv = document.querySelector(".products"); //👆query selector ile classı products olan divi seçtik ve bir değişkene atadık
productsDiv.addEventListener("click",(event)=>{
    if(event.target.className == "fa-solid fa-minus"){
        if(event.target.parentElement.querySelector(".quantity").innerText > 1){
event.target.parentElement.querySelector(".quantity").innerText--
        }else{
            if(confirm(
                `${
                    event.target.parentElement.parentElement.querySelector("h2").innerText
                } will be deleted`
                
            )){
                event.target.closest(".product").remove();
            }
        }
    }else if(event.target.className == "fa-solid fa-plus"){
        event.target.previousElementSibling.innerText++;
        // event.target.querySelector(".quantity").innerText++;


    }else if(event.target.className == "remove-product"){
        event.target.closest(".product").remove();

    }


   


});
//target demek tıkladığım yeri yakala demek.capturing dıştan içe yakalamaya deniyor.eğer quantity dediğim şey 1 den büyükse parentını yakala ve innerText i birer birer azalt.