function OrderDetail(id, name, price, qty, total) {
    this.itemId = id;
    this.itemName = name;
    this.itemPrice = price;
    this.itemQty = qty;
    this.total = total;

    this.getId = function () {
        return this.itemId;
    }
    this.setId = function (_id) {
        this.itemId = _id;
    }

    this.getName = function () {
        return this.itemName;
    }

    this.setName = function (_name) {
        this.itemName = _name;
    }
    this.getPrice = function () {
        return this.itemPrice;
    }

    this.setPrice = function (_price) {
        this.itemPrice = _price;
    }
    this.getQty = function () {
        return this.itemQty;
    }

    this.setQty= function (_qty) {
        this.itemQty = _qty;
    }

    this.getTotal = function () {
        return this.total;
    }

    this.setTotal= function (_total) {
        this.total = _total;
    }

}