generateCustomerId();

var regExCustomerId = /^(C-)[0-9]{3}$/;
var regExPersonName = /^([A-z\s. ]{3,80})$/;
var regExAddress = /^([A-z0-9/,\s]{3,})$/;
var regExTel = /^([0][0-9]{9}|[0][0-9]{2}[-\s][0-9]{7})$/;


function validateCusId(e){
    if (regExCustomerId.test($("#cusId").val())) {
        $("#cusId").css('border-color', 'Blue');
        $("#errorCustomerId").css('display', 'none');
        if (e == "Enter") {
            $("#name").focus();
        }

    } else {
        $("#cusId").css('border-color', 'Red');
        $("#errorCustomerId").css('display', 'block');

    }
}

function validateCusName(e){
    if (regExPersonName.test($("#name").val())) {
        $("#name").css('border-color', 'Blue');
        $("#errorCustomerName").css('display', 'none');
        if (e == "Enter") {
            $("#address").focus();
        }

    } else {
        $("#name").css('border-color', 'Red');
        $("#errorCustomerName").css('display', 'block');

    }

}

function validateCusAddress(e){
    if (regExAddress.test($("#address").val())) {
        $("#address").css('border-color', 'Blue');
        $("#errorCustomerAddress").css('display', 'none');
        if (e == "Enter") {
            $("#tel").focus();
        }

    } else {

        $("#address").css('border-color', 'Red');
        $("#errorCustomerAddress").css('display', 'block');
    }
}

function validateCusTel(e){
    if (regExTel.test($("#tel").val())) {
        $("#tel").css('border-color', 'Blue');
        $("#errorCustomerTel").css('display', 'none');

        if ($('#AddCustomer').is(':enabled') && e == "Enter") {
            addCustomer();
            $("#cusId").focus();
        }

    } else {

        $("#tel").css('border-color', 'Red');
        $("#errorCustomerTel").css('display', 'block');
    }
}

function enableAddCustomer() {
    if (customerNotExist() && regExCustomerId.test($("#cusId").val()) && regExPersonName.test($("#name").val()) && regExAddress.test($("#address").val()) && regExTel.test($("#tel").val())) {
        $("#AddCustomer").attr('disabled', false);
    } else {
        $("#AddCustomer").attr('disabled', true);
    }
}


$("#cusId").keyup(function (e) {
    enableAddCustomer();
   validateCusId(e.key);
});

$("#name").keyup(function (e) {
    enableAddCustomer();
    validateCusName(e.key);

});

$("#address").keyup(function (e) {
    enableAddCustomer();
  validateCusAddress(e.key);
});

$("#tel").keyup(function (e) {
    enableAddCustomer();
    validateCusTel(e.key);

});




function addCustomer() {
    let saveCustomer = confirm("Do you want to save this customer?");
    if (saveCustomer.valueOf()) {
        let cusName = $("#name").val();
        let cusId = $("#cusId").val();
        let cusAddress = $("#address").val();
        let cusTel = $("#tel").val();


        customers.push(new CustomerDTO(cusId, cusName, cusAddress, cusTel));

        loadAllCustomers();

        clearCustomer();
        generateCustomerId();
        loadAllCustomerIds();
    }


}

function updateCustomer() {
    let updateCustomer = confirm("Do you want to update this customer?");
    if (updateCustomer.valueOf()) {
        customers.find(function (e) {
            if (e.getId() == $("#cusId").val()) {
                e.setName($("#name").val());
                e.setAddress($("#address").val());
                e.setTel($("#tel").val());
            }
        });

        loadAllCustomers();
        clearCustomer();
        generateCustomerId();
    }
}

function findCustomer() {
    customers.find(function (e) {
        if (e.getId() == $("#CustomerID").val()) {
            $("#cusId").val(e.getId());
            $("#name").val(e.getName());
            $("#address").val(e.getAddress());
            $("#tel").val(e.getTel());
        }
    });
}

function deleteCustomer() {
    let deleteCustomer = confirm("Do you want to delete this customer?");
    if (deleteCustomer.valueOf()) {
        customers.find(function (e) {
            if (e.getId() == $("#cusId").val()) {
                customers.splice(customers.indexOf(e), 1);
            }
        });

        loadAllCustomers();
        clearCustomer();
        generateCustomerId();
        loadAllCustomerIds();
    }
}


function generateCustomerId() {
    var tempId;
    if (customers.length != 0) {

        var id = customers[customers.length - 1].getId();
        var temp = id.split("-")[1];
        temp++;
        tempId = (temp < 10) ? "C-00" + temp : (temp < 100) ? "C-0" + temp : "C-" + temp;

    } else {
        tempId = "C-001";
    }
    $("#cusId").val(tempId);
}


function loadAllCustomers() {
    $("#cusTbl>tr").remove();

    for (let customer of customers) {
        let row = `<tr><td>${customer.getId()}</td><td>${customer.getName()}</td><td>${customer.getAddress()}</td><td>${customer.getTel()}</td></tr>`;
        $("#cusTbl").append(row)
    }

    /*To unbind click events added to rows*/
    $("#cusTbl>tr").off('click');
    $("#cusTbl>tr").off('dblclick');

    $("#cusTbl>tr").click(function () {
        let id = $(this).children(':first-child').html();
        let name = $(this).children(':nth-child(2)').html();
        let address = $(this).children(':nth-child(3)').html();
        let tel = $(this).children(':nth-child(4)').html();

        $("#cusId").val(id);
        $("#name").val(name);
        $("#address").val(address);
        $("#tel").val(tel);
    });

    $("#cusTbl>tr").dblclick(function () {
        let deleteCustomer = confirm("Do you want to delete this customer?");
        if (deleteCustomer.valueOf()) {
            let rowCusId = $(this).children(':first-child').html();
            customers.find(function (e) {
                if (e.getId() == rowCusId) {

                    customers.splice(customers.indexOf(e), 1);
                }
            });

            loadAllCustomers();
            clearCustomer();
            loadAllCustomerIds();
        }
    });
}

function customerNotExist(){
    for (let customer of customers) {
        if (customer.getId()==$("#cusId").val()){
            return false;
        }
    }
    return true;
}

function clearCustomer() {
    $("#cusId").val("");
    $("#cusId").css('border-color', 'Silver');
    $("#name").val("");
    $("#name").css('border-color', 'Silver');
    $("#address").val("");
    $("#address").css('border-color', 'Silver');
    $("#tel").val("");
    $("#tel").css('border-color', 'Silver');
    enableAddCustomer();
}



$("#AddCustomer").click(function () {
    addCustomer();
});

$("#UpdateCustomer").click(function () {
    updateCustomer();
});

$("#DeleteCustomer").click(function () {
    deleteCustomer();
});

$("#searchCustomer").click(function () {
    findCustomer();

});

$("#cancelCustomer").click(function () {
    clearCustomer();
    generateCustomerId();
});

