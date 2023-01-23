const taxtRate = 0.18;
const shippingPrice = 20;
const shippingFreePrice = 300;

window.addEventListener("load",()=>{
    localStorage.setItem("taxtRate", taxtRate);
    localStorage.setItem("shippingPrice",shippingPrice);
    localStorage.setItem("shippingFreePrice",shippingFreePrice);

});//set item göndermek get item çağırmak
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
                
            ))//confirm tamam ve iptaliçeren uyarı
            {
                event.target.closest(".product").remove();//closest yakaladığım yerin en yakınında classı product olan yapıyı silecek.
            }
        }
    }
    else if(event.target.className == "fa-solid fa-plus"){
        // event.target.previousElementSibling.innerText++;
        // event.target.querySelector(".quantity").innerText++;
       event.target.parentElement.querySelector(".quantity").innerText++;



    }else if(event.target.className == "remove-product"){
        event.target.closest(".product").remove();

    }
    calculateProductPrice(event.target);
    calculateCartPrice();

});
//target demek tıkladığım yeri yakala demek.capturing dıştan içe yakalamaya deniyor.eğer quantity dediğim şey 1 den büyükse parentını yakala ve innerText i birer birer azalt.

const calculateProductPrice = (btn) =>{
const productInfoDiv = btn.parentElement.parentElement;
const price =Number( productInfoDiv.querySelector(".product-price strong").innerText);
const quantity =Number( productInfoDiv.querySelector(".quantity").innerText);
const productTotalDiv = productInfoDiv.querySelector(".price")

productTotalDiv.innerText = (price * quantity).toFixed(2);
}

const calculateCartPrice = () =>{
    const productsTotalPricesDiv = document.querySelectorAll(".price");
    const subtotal = [...productsTotalPricesDiv].reduce((acc,price)=>acc + Number(price.innerText),0);
    const taxtPrice = subtotal * localStorage.getItem("taxtRate")
   const shippingPrice =  parseFloat(subtotal > 0 && subtotal < localStorage.getItem("shippingFreePprice") ?
   localStorage.getItem("shippingPrice") :
   0)
    const totalCart = subtotal + taxtPrice + shippingPrice;

    document.querySelector("#subtotalCart").innerText = subtotal.toFixed(2);
    document.querySelector("#taxtRateCart").innerText = taxtPrice.toFixed(2);
    document.querySelector("#shippingCart").innerText = shippingPrice.toFixed(2);
    document.querySelector("#totalCart").innerText = totalCart.toFixed(2);
}