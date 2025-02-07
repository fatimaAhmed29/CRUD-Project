
var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productDescription = document.getElementById("productDescription")
var btnAdd = document.getElementById("btnAdd")
var btnEdit = document.getElementById("btnEdit")
var btnClearForm = document.getElementById("btnClearForm")

var alertName = document.getElementById("alertName")
var alertPrice = document.getElementById("alertPrice")
var alertCategory = document.getElementById("alertCategory")


var current = 0
var containerProduct = []

if (localStorage.getItem("products") != null) {
    containerProduct = JSON.parse(localStorage.getItem("products"))
    display()
}
else {
    containerProduct = []
}

function addProduct() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        cat: productCategory.value,
        des: productDescription.value,
    }
    containerProduct.push(product)
    display()
    localStorage.setItem("products", JSON.stringify(containerProduct))
    clearProduct()
}

function display() {
    var cartona = ""
    for (var i = 0; i < containerProduct.length; i++) {
        cartona += `
         <tr>
      <th scope="row">`+ i + `</th>
      <td>`+ containerProduct[i].name + `</td>
      <td>${containerProduct[i].price}</td>
      <td>${containerProduct[i].cat}</td>
      <td>${containerProduct[i].des}</td>
      <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
      <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-danger">Delete</button></td>

    </tr>
     `
    }
    document.getElementById("myTable").innerHTML = cartona
}

function clearProduct() {
    productName.value = "",
        productPrice.value = "",
        productCategory.value = "",
        productDescription.value = ""
        productName.classList.remove("is-valid", "is-invalid");
        productPrice.classList.remove("is-valid", "is-invalid");
        productCategory.classList.remove("is-valid", "is-invalid");
        productDescription.classList.remove("is-valid", "is-invalid");
}

function deleteProduct(index) {
    containerProduct.splice(index, 1)
    localStorage.setItem("products", JSON.stringify(containerProduct))
    display()
}

function updateProduct(i) {
    current = i
    productName.value = containerProduct[i].name
    productPrice.value = containerProduct[i].price
    productCategory.value = containerProduct[i].cat
    productDescription.value = containerProduct[i].des
    document.getElementById("btnEdit").style.display = "inline-block"
    document.getElementById("btnClearForm").style.display = "none"
    document.getElementById("btnAdd").style.display = "none"

}

function editProduct(indexEdit = current) {
    console.log(indexEdit)
    containerProduct[indexEdit].name = productName.value
    containerProduct[indexEdit].price = productPrice.value
    containerProduct[indexEdit].cat = productCategory.value
    containerProduct[indexEdit].des = productDescription.value
    display()
    localStorage.setItem("products", JSON.stringify(containerProduct))
    document.getElementById("btnEdit").style.display = "none"
    document.getElementById("btnAdd").style.display = "inline-block"
    document.getElementById("btnClearForm").style.display = "inline-block"

    clearProduct()

}


function search() {
    var searchinput = document.getElementById("searchinput").value
    var cartona = ""
    for (var i = 0; i < containerProduct.length; i++) {
      if((containerProduct[i].name.toLowerCase()).includes(searchinput.toLowerCase()) )
            cartona += `
    <tr>
 <th scope="row">`+ i + `</th>
 <td>${containerProduct[i].name.replace(searchinput,`<span>`+searchinput+`</span>`)}</td>
 <td>${containerProduct[i].price}</td>
 <td>${containerProduct[i].cat}</td>
 <td>${containerProduct[i].des}</td>
 <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
 <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-danger">Delete</button></td>

</tr>
`
        }
        document.getElementById("myTable").innerHTML = cartona
    }


    function valideProductName() {
        var regex = /^[A-Za-z\s]{3,50}$/;
       if (regex.test(productName.value) == true) {
            productName.classList.add("is-valid")
            productName.classList.remove("is-invalid")
            alertName.classList.replace("d-block", "d-none")
        } else {
            productName.classList.add("is-invalid")
            productName.classList.remove("is-valid")
            alertName.classList.replace("d-none", "d-block")
        }
    }
    productName.addEventListener("blur", valideProductName)

    function validProductPrice() {
        var regex = /^([1-9]\d{0,5}|1000000)$/;
        if (regex.test(productPrice.value) == true) {
            productPrice.classList.add("is-valid")
            productPrice.classList.remove("is-invalid")
            alertPrice.classList.replace("d-block", "d-none")

        } else {
            productPrice.classList.add("is-invalid")
            productPrice.classList.remove("is-valid")
            alertPrice.classList.replace("d-none", "d-block")

        }
    }
    productPrice.addEventListener("blur", validProductPrice)

    function valideProductCategory() {
        var regex = /^[A-Za-z\s0-9]{3,30}$/;
    if (regex.test(productCategory.value) == true) {
            productCategory.classList.add("is-valid")
            productCategory.classList.remove("is-invalid")
            alertCategory.classList.replace("d-block", "d-none")
        } else {
            productCategory.classList.add("is-invalid")
            productCategory.classList.remove("is-valid")
            alertCategory.classList.replace("d-none", "d-block")
        }
    }
    productCategory.addEventListener("blur", valideProductCategory)

