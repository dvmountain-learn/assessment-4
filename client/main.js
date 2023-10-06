const complimentBtn = document.getElementById("complimentButton")
const productName = document.getElementById('product-name')
const quantity = document.getElementById('product-qty')
const unitPrice = document.getElementById('product-price')
const productStatus = document.getElementById('select-status')
const description = document.getElementById('product-desc')
const saveBtn = document.getElementById('save-btn')
const stocksItem = document.querySelector('.stocks-item')
const editBtn = document.getElementById('edit-btn')
const deleteBtn = document.getElementById('delete-btn')
const dataTable = document.createElement('table')

const baseUrl = 'http://localhost:4000'
const fortunes = [
    "A beautiful, smart, and loving person will be coming into your life.",
    "A lifetime of happiness lies ahead of you.",
    "A hunch is creativity trying to tell you something.",
    "A golden egg of opportunity falls into your lap this month.",
    "A good friendship is often more important than a passionate romance.",
    "Adventure can be real happiness.",
    "A feather in the hand is better than a bird in the air.",
    "A friend is a present you give yourself.",
    "A friend asks only for your time not your money."
]

const getCompliment = () => {
    axios.get(`${baseUrl}/api/compliment/`)
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

function randomFortunes() {
    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];
    alert(randomFortune)
}

// complimentBtn.addEventListener('click', getCompliment)
// Try to callback call front end function
complimentBtn.addEventListener('click', randomFortunes)

// Stocks
function getStocks() {
    axios.get(`${baseUrl}/api/stocks`)
        .then(res => {
            let stocks = res.data.stocks
            displayStocks(stocks)
        })
        .catch(error => {
            console.log(error)
        })
}

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function displayStocks(stocks) {
    
    let html = '<table border="1"></table><thead><tr><th>#</th><th>Name</th><th style="text-align: center">Quantity</th><th style="text-align: center">Unit Price</th><th style="text-align: center">Condition</th><th style="text-align: center">Action</th></tr>'
    html += '<tbody>'
    for (let item of stocks) {
        // console.log(item)
        html += `<tr>
        <td>${item.id} </td>
        <td>${item.name}</td>
        <td style="text-align: center">${item.quantity}</td>
        <td style="text-align: center">${USDollar.format(item.price)}</td>
        <td style="text-align: center">${item.status}</td>
        <td style="text-align: center; width: 15%;">
            <button id="edit-btn" onclick="updateProductInStock(${item.id})">Edit</button>
            <button id="delete-btn" onclick="deleteProductInStock(${item.id})">Delete</button>
        </td>
        </tr>`
    }
    html += '</tbody>'
    html += '</table>'
    dataTable.innerHTML = html
    stocksItem.appendChild(dataTable)
}

// Save
function createProductInStock(event) {
    event.preventDefault();
    if (productName.value === '') alert('Product name is required.')
    else if (quantity.value === '') alert('Quantity is required.')
    else if (unitPrice.value === '') alert('Unit Price is required.')
    else {
        const stockObj = {
            name: productName.value,
            quantity: quantity.value,
            price: unitPrice.value,
            status: productStatus.value,
            description: description.value
        }
        console.log(stockObj)
        axios.post(`${baseUrl}/api/stocks`, stockObj)
            .then(res => {
                let stocks = res.data.stocks
                displayStocks(stocks)
                clearForm()
            })
            .catch(error => {
                console.log(error)
            });
    }
};

function clearForm() {
    productName.value = ''
    quantity.value = ''
    unitPrice.value = ''
    productStatus.value = ''
    description.value = ''
}
saveBtn.addEventListener('click', createProductInStock)

function updateProductInStock(id) {
    let updateObj = {}
    let label = prompt('Enter label that you want to update: (eg: quantity or price)')
    if (label === 'quantity') {
        let qtyObj = prompt('Enter quantity to update: ')
        updateObj = {quantity: qtyObj}
    } else if (label === 'price') {
        let priceObj = prompt('Enter unit price to update: ')
        updateObj = {price: priceObj}
    }
    console.log(updateObj)
    axios.put(`${baseUrl}/api/stocks/${id}`, updateObj)
        .then(res => {
            // console.log(res.data.stocks)
            let stocks = res.data.stocks
            dataTable.remove()
            displayStocks(stocks)
        })
        .catch(error => {
            console.log(error)
        })
}

function deleteProductInStock(id) {
    let isConfirm = confirm(`Do you want to delete this item from stock?`)
    if (isConfirm) {
        axios.delete(`${baseUrl}/api/stocks/${id}`)
        .then(res => {
            // console.log(res.data.stocks)
            let stocks = res.data.stocks
            dataTable.remove()
            displayStocks(stocks)
        })
        .catch(error => {
            console.log(error)
        })
    }
}



// Load website
getStocks()
