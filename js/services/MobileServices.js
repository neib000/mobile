function layDanhSachDienThoai() {
    return axiosClient({
      method: "GET",
      url: "productmobile",
    });
  }

function themDienThoai(dienThoai) {
  return axiosClient({
    method: "POST",
    url: "productmobile",
    data: dienThoai,
  });
}

function xoaDienThoai(id) {
  return axiosClient({
    method: "DELETE",
    url: `productmobile/${id}`,
  });
}
  
function layThongTinDienThoai(id) {
  return axiosClient({
    method: "GET",
    url: `productmobile/${id}`,
  });
}
  
function capNhatDienThoai(id, dienThoai) {
  return axiosClient({
    method: "PUT",
    url: `productmobile/${id}`,
    data: dienThoai,
  });
}