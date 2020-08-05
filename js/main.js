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

function renderHTML() {
  var htmlcontent = "";
  for (var i = 0; i < danhSachDienThoai.length; i++) {
    var dienThoai = danhSachDienThoai[i];
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