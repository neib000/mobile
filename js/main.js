function xuLyLayDanhSachDienThoai() {
  // Services
  layDanhSachDienThoai().then(function (result) {
    danhSachDienThoai = result.data;
    console.log(danhSachDienThoai);
    renderHTML();
  });
}
xuLyLayDanhSachDienThoai();
var danhSachDienThoai = [];

const renderHTML = function(arr) {

  arr = arr || danhSachDienThoai;
  var htmlcontent = "";
  for (var i = 0; i < arr.length; i++) {
    var dienThoai = arr[i];
    htmlcontent += `
          <li class="item">
            <div class="item__info">
              <img
                src="${dienThoai.image}"
                alt=""
              />
              <h3>
              ${dienThoai.name}
              </h3>
              <div class="price">
              ${numberWithCommas(dienThoai.price)}₫
              </div>
            </div>
            <button class="btnbuy">
              Card
            </button>
          </li>
          `;
  }
  document.getElementById("tblDanhSachDienThoai").innerHTML = htmlcontent;
}
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(".");
}
//Hàm tìm kiếm
const findMobile = function () {
  const foundedEmpl = [];
  // 1. Lấy keyword người dùng nhaao vào (dom)
  const keyword = document
    .getElementById("txtSearch")
    .value.trim()
    .toLowerCase();
  // 2. Tìm theo mã: lập for, kiểm tra từng nhân viên trong mảng, cớ nhân viên nào
  // có id giống với kywword => push NV đó vào foundedEmpl
  //3. console.log(foundedEmpl)
  for (var i = 0; i < danhSachDienThoai.length; i++) {
    const currentEmp = danhSachDienThoai[i];
    var fullName = currentEmp.name;

    fullName = fullName.toLowerCase();
    // console.log(currentEmp.id);
    if (currentEmp.id === keyword) {
      foundedEmpl.push(currentEmp);
      break;
    }
    if (fullName.indexOf(keyword) !== -1) {
      foundedEmpl.push(currentEmp);
    }
  }
  renderHTML(foundedEmpl);
}
