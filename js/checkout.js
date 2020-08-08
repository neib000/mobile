var cartList = [];
// console.log(cartList.length);
const deleteMB = function (id) {
  id = id.toString();
  const index = findById(id);
  console.log(index);
  if (index !== -1) {
    cartList.splice(index, 1);
    saveData();
    renderCheckout();
    renderPrices();
    renderBTN();
  }
};
const findById = function (id) {
  // console.log(id);
  for (var i = 0; i < cartList.length; i++) {
    if (cartList[i].id === id) {
      return i;
    }
  }
  return -1;
};
const renderBTN = function () {
  document.getElementById("btnAmount").innerHTML = cartList.length;
};
renderBTN();
const addCart = function (id) {
  id = id.toString();
  for (var i = 0; i < danhSachDienThoai.length; i++) {
    const currentMobile = danhSachDienThoai[i];
    currentMobile.invetory = 1;
    if (currentMobile.id === id) {
      // console.log(currentMobile.id);
      if (cartList.length <= 0) {
        console.log(cartList.length);
        cartList.push(currentMobile);
        console.log(cartList);
      } else {
        console.log(cartList.length);
        const index = findById(id);
        if (index !== -1) {
          cartList[index].invetory++;
          cartList[index] = new Mobile(
            cartList[index].id,
            cartList[index].name,
            cartList[index].image,
            cartList[index].description,
            cartList[index].price,
            cartList[index].invetory,
            cartList[index].type
          );
        } else {
          cartList.push(currentMobile);
        }
      }
    }
  }
  renderBTN();
  console.log(cartList);
  saveData();
};
const saveData = function () {
  localStorage.setItem("cartList", JSON.stringify(cartList));
};
const getData = function () {
  var cartListJSON = localStorage.getItem("cartList");
  //Kiểm tra tonnf tại dữ liệu
  if (!cartListJSON) return;
  const cartListFromLocal = JSON.parse(cartListJSON);
  for (var i = 0; i < cartListFromLocal.length; i++) {
    const currentMB = cartListFromLocal[i];

    const mb = new Mobile(
      currentMB.id,
      currentMB.name,
      currentMB.image,
      currentMB.description,
      currentMB.price,
      currentMB.invetory,
      currentMB.type
    );
    cartList.push(mb);
  }
  renderBTN();
};
getData();
//Page Checkout()
const renderCheckout = function () {
  let htmlcontentCart = "";
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
              <span class="qty-decrease">-</span>
              <p class="qty-input">${
                dienThoai.invetory
              }</p>
              <span class="qty-increase">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
          `;
  }
  document.getElementById("cardProductsList").innerHTML = htmlcontentCart;
  //   renderPrices();
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
  renderCheckout();
  renderPrices();
  renderBTN();
};
