function xuLyLayDanhSachDienThoaiCheckout() {
  // Services
  layDanhSachDienThoai().then(function (result) {
    danhSachDienThoai = result.data;
    console.log(danhSachDienThoai);
  });
}
xuLyLayDanhSachDienThoaiCheckout();
// console.log(cartList.length);
const deleteMB = function (id) {
  id = id.toString();
  const index = findById(id);
  console.log(index);
  if (index !== -1) {
    cartList.splice(index, 1);
    saveData();
    renderBTN();
    renderCheckout();
    // renderPrices();
  }
};
getData();
//Page Checkout()
const renderCheckout = function () {
  let htmlcontentCart = "";
  if (cartList.length <= 0) {
    htmlcontentCart += `   
<div class="empty">

<i class="fa fa-shopping-cart empty__img"></i>
<p class="empty__note">Không có sản phẩm nào trong giỏ hàng của bạn.</p>
<a href="/" class="empty__btn">Tiếp tục mua sắm</a>
</div>
    `;
    document.getElementById("tblCheckout").innerHTML = htmlcontentCart;
  } else {
    for (let i = 0; i < cartList.length; i++) {
      let dienThoai = cartList[i];
      htmlcontentCart += `
      <li class="cart-products__products">
      <div class="cart-products__inner">
        <div class="cart-products__img">
          <img
            src="${dienThoai.image}"
            alt=""
          />
        </div>
        <div class="cart-products__content">
          <div class="cart-products__desc">
            <div class="cart-products__name">${dienThoai.name}</div>
            <div class="cart-products__actions">
              <span class="cart-products__del" onclick="deleteMB(${
                dienThoai.id
              })">Xóa</span>
            </div>
          </div>
          <div class="cart-products__details">
            <div class="cart-products__pricess">
              <p class="cart-products__real-prices">${numberWithCommas(
                dienThoai.price
              )}₫</p>
            </div>
            <div class="cart-products__qty">
              <div class="CartQty__StyledCartQty-o1bx97-0 iaIXXn">
                <span class="qty-decrease" onclick="decreaseAmount(${
                  dienThoai.id
                })">-</span>
                <p class="qty-input" id="inputAmount()">${
                  dienThoai.invetory
                }</p>
                <span class="qty-increase" onclick="increaseAmount(${
                  dienThoai.id
                })">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
            `;
    }
    document.getElementById("cardProductsList").innerHTML = htmlcontentCart;
    // renderPrices();
  }
};
renderCheckout();
const renderPrices = function () {
  sum = 0;
  let htmlcontent = "";
  for (let i = 0; i < cartList.length; i++) {
    let dienThoai = cartList[i];
    sum += dienThoai.price * dienThoai.invetory;
  }
  htmlcontent = `${numberWithCommas(sum)}₫`;
  document.getElementById("priceValue").innerHTML = htmlcontent;
};
renderPrices();

const payMB = function () {
  cartList.splice(0, cartList.length);
  saveData();
  renderBTN();
  renderCheckout();
};
const decreaseAmount = function (id) {
  id = id.toString();
  const index = findById(id);
  console.log(index);
  if (index !== -1) {
    cartList[index].invetory--;
    if (cartList[index].invetory < 1) {
      deleteMB(cartList[index].id);
    } else {
      cartList[index] = new Mobile(
        cartList[index].id,
        cartList[index].name,
        cartList[index].image,
        cartList[index].description,
        cartList[index].price,
        cartList[index].invetory,
        cartList[index].type
      );
      saveData();
      renderCheckout();
      renderPrices();
    }

    // renderBTN();
    // document.getElementById("inputAmount").innerHTML =  htmlcontent;
  }
};
const increaseAmount = function (id) {
  id = id.toString();
  const index = findById(id);
  const indexApi = findByIdApi(id);
  // console.log(danhSachDienThoai[indexApi]);
  console.log(danhSachDienThoai[indexApi].invetory);
  console.log(index);
  if (index !== -1) {
    cartList[index].invetory++;
    if(cartList[index].invetory > danhSachDienThoai[indexApi].invetory){
      alert( "Sản phẩm " + danhSachDienThoai[indexApi].invetory +" chỉ còn " + danhSachDienThoai[indexApi].invetory);
    }else{
      cartList[index] = new Mobile(
        cartList[index].id,
        cartList[index].name,
        cartList[index].image,
        cartList[index].description,
        cartList[index].price,
        cartList[index].invetory,
        cartList[index].type
      );
      saveData();
      renderCheckout();
      renderPrices();
    }
    // renderBTN();
    // document.getElementById("inputAmount").innerHTML = htmlcontent;
  }
};
