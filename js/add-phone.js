document
  .getElementById("btnThemDienThoai")
  .addEventListener("click", openThemDienThoai);

function openThemDienThoai() {
  document.getElementsByClassName("modal-footer")[0].innerHTML = `
    <button class="btn btn-success" onclick="xuLyThemDienThoai()" data-dismiss="modal">Thêm Điện Thoại</button>
  `;
}

function xuLyThemDienThoai() {
  const tenDT = document.getElementById("TenDT").value;
  const hinhAnh = document.getElementById("HinhAnh").value;
  const hangDT = document.getElementById("HangDT").value;
  const giaTien = document.getElementById("GiaTien").value;
  const khoHang = document.getElementById("KhoHang").value;
  const moTa = document.getElementById("MoTa").value;

  const dienThoai = new Mobile1(
    tenDT,
    hinhAnh,
    hangDT,
    giaTien,
    khoHang,
    moTa
  );

  themDienThoai(dienThoai).then(function (result1) {
    xuLyLayDanhSachDienThoai();
  });
}


var danhSachDienThoai = [];
function xuLyLayDanhSachDienThoai() {
  layDanhSachDienThoai().then(function (result) {
    danhSachDienThoai = result.data;
    renderHTML();
  });
}
xuLyLayDanhSachDienThoai();

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
              <h3>
              ${dienThoai.description}
              </h3>
              <div class="price">
              ${numberWithCommas(dienThoai.price)}₫
              </div>
            </div>
            <button class="btn btn-success edit-phone" data-toggle="modal" data-target="#myModal" data-id="${
              dienThoai.id
            }">Sửa</button>

            <button class="btn btn-danger" onclick="chonXoaDienThoai(${
              dienThoai.id
            })">Xoá</button>
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

// phần chức năng xóa
// sau khi click, để id phone về function này, và bên service sẽ gửi lệnh DELETE lên mock api và xóa phone có id
function chonXoaDienThoai(id) {
  xoaDienThoai(id).then(function () {
    xuLyLayDanhSachDienThoai();
  });
}

document.getElementById("tblDanhSachDienThoai").addEventListener("click", handleClickEdit);

// nhận sự kiện click sửa, mở form thêm ra
function handleClickEdit(event){
  const selected = event.target;
  const id = selected.getAttribute("data-id");
  
  if(id){
    document.getElementsByClassName("modal-footer")[0].innerHTML = `
    <button class="btn btn-success" onclick="xuLySuaDienThoai(${id})" data-dismiss="modal">Sửa</button>
  `
  // đổ thông tin của phone tại vị trí có id 
  layThongTinDienThoai(id).then(function (result){
      const dienThoai = result.data;
      
      document.getElementById("TenDT").value = dienThoai.name;
      document.getElementById("HinhAnh").value = dienThoai.image;
      document.getElementById("HangDT").value = dienThoai.type;
      document.getElementById("GiaTien").value = dienThoai.price;
      document.getElementById("KhoHang").value = dienThoai.invetory;
      document.getElementById("MoTa").value = dienThoai.description;
    });
  }
}


function xuLySuaDienThoai(id){

  const tenDT = document.getElementById("TenDT").value;
  const hinhAnh = document.getElementById("HinhAnh").value;
  const hangDT = document.getElementById("HangDT").value;
  const giaTien = document.getElementById("GiaTien").value;
  const khoHang = document.getElementById("KhoHang").value;
  const moTa = document.getElementById("MoTa").value;

  const dienThoai = new Mobile1(
    tenDT,
    hinhAnh,
    hangDT,
    giaTien,
    khoHang,
    moTa
  );

  capNhatDienThoai(id, dienThoai).then(function (){
    xuLyLayDanhSachDienThoai();

  });
}


renderBTN();
