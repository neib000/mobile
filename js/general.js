var danhSachDienThoai = [];
var cartList = [];
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(".");
}

const findById = function (id) {
  // console.log(id);
  for (var i = 0; i < cartList.length; i++) {
    if (cartList[i].id === id) {
      return i;
    }
  }
  return -1;
};
const findByIdApi = function (id) {
  // console.log(id);
  for (var i = 0; i < danhSachDienThoai.length; i++) {
    if (danhSachDienThoai[i].id === id) {
      return i;
    }
  }
  return -1;
};
const renderBTN = function () {
  document.getElementById("btnAmount").innerHTML = cartList.length;
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
