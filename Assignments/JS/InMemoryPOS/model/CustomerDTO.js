function CustomerDTO(id, name, address, tel) {
    this.cusId = id;
    this.cusName = name;
    this.cusAddress = address;
    this.cusTel = tel;

    this.getId = function () {
        return this.cusId;
    }
    this.setId = function (_id) {
        this.cusId = _id;
    }

    this.getName = function () {
        return this.cusName;
    }

    this.setName = function (_name) {
        this.cusName = _name;
    }
    this.getAddress = function () {
        return this.cusAddress;
    }

    this.setAddress = function (_address) {
        this.cusAddress = _address;
    }
    this.getTel = function () {
        return this.cusTel;
    }

    this.setTel = function (_tel) {
        this.cusTel = _tel;
    }


}