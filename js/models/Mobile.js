function Mobile(id, name, image, description, price, invetory, type){
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.price = price;
    this.invetory = invetory;
    this.type = type;
}
function Mobile1(tenDT, hinhAnh, hangDT, giaTien, khoHang, moTa){
    this.name = tenDT;
    this.image = hinhAnh;
    this.type = hangDT;
    this.price = giaTien;
    this.invetory = khoHang;
    this.description = moTa;
}