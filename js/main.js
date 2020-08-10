function xuLyLayDanhSachDienThoai() {
  // Services
  layDanhSachDienThoai().then(function (result) {
    danhSachDienThoai = result.data;
    console.log(danhSachDienThoai);
    renderHTML();
  });
}

xuLyLayDanhSachDienThoai();
// console.log(danhSachDienThoai);
getData(); 
renderBTN();
const renderHTML = function (arr) {
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
              <h4>
              ${dienThoai.description}
              </h4>
              <div class="price">
              ${numberWithCommas(dienThoai.price)}₫
              </div>
            </div>
            <button class="btnbuy" onclick="addCart(${dienThoai.id})" >
              Cart
            </button>
          </li>
          `;
  }
  document.getElementById("tblDanhSachDienThoai").innerHTML = htmlcontent;
};

//Hàm tìm kiếm
const findMobile = function () {
  const foundedMoblie = [];
  // 1. Lấy keyword người dùng nhaao vào (dom)
  const keyword = document
    .getElementById("txtSearch")
    .value.trim()
    .toLowerCase();
  // 2. Tìm theo mã: lập for, kiểm tra từng nhân viên trong mảng, cớ nhân viên nào
  // có id giống với kywword => push NV đó vào foundedMoblie
  //3. console.log(foundedMoblie)
  for (var i = 0; i < danhSachDienThoai.length; i++) {
    // console.log(danhSachDienThoai);
    const currentMobile = danhSachDienThoai[i];
    var fullName = currentMobile.name;

    fullName = fullName.toLowerCase();
    // console.log(currentMobile.id);
    if (currentMobile.id === keyword) {
      foundedMoblie.push(currentMobile);
      break;
    }
    if (fullName.indexOf(keyword) !== -1) {
      foundedMoblie.push(currentMobile);
    }
  }
  renderHTML(foundedMoblie);
};
const selectioneBrand = function () {
  const foundedMoblie = [];
  const sltBrand = document.getElementById("brandMobile").value.toLowerCase();
  console.log(sltBrand);
  for (var i = 0; i < danhSachDienThoai.length; i++) {
    const currentMobile = danhSachDienThoai[i];
    var nameBrand = currentMobile.type.toLowerCase();

    // console.log(currentMobile.id);
    if (sltBrand === nameBrand) {
      foundedMoblie.push(currentMobile);
    }
    if (sltBrand === "0") {
      foundedMoblie.push(currentMobile);
    }
  }
  renderHTML(foundedMoblie);
  
};
const sltSortBrand = function () {
  const sltBrand = document.getElementById("sortMobile").value.toLowerCase();
  var sapXepDT = [];
  sapXepDT = danhSachDienThoai;
  console.log(sltBrand);
  if (sltBrand === "0") {
    renderHTML(danhSachDienThoai);
  }
  if (sltBrand === "az") {
    sapXepDT.sort(function (a, b) {
      var nameA = a.name.toLowerCase(); // bỏ qua hoa thường
      var nameB = b.name.toLowerCase(); // bỏ qua hoa thường
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // name trùng nhau
      return 0;
    });
    renderHTML(sapXepDT);
  }
  if (sltBrand === "za") {
    sapXepDT.sort(function (a, b) {
      var nameA = a.name.toLowerCase(); // bỏ qua hoa thường
      var nameB = b.name.toLowerCase(); // bỏ qua hoa thường
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }

      // name trùng nhau
      return 0;
    });
    renderHTML(sapXepDT);
  }
  if (sltBrand === "tang") {
    sapXepDT.sort(function (a, b) {
      return a.price - b.price;
    });
    renderHTML(sapXepDT);
  }
  if (sltBrand === "giam") {
    sapXepDT.sort(function (a, b) {
      return b.price - a.price;
    });
    renderHTML(sapXepDT);
  }
};
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

