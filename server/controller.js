let stockDatabase = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        quantity: 10,
        price: 15000,
        status: "New",
        description: "iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system."
    },
    {
        id: 2,
        name: "MacBook Pro 15 Inc",
        quantity: 5,
        price: 35000,
        status: "New",
        description: "Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM."
    },
    {
        id: 3,
        name: "Galaxy Book3 Ultra",
        quantity: 40,
        price: 2999.99,
        status: "New",
        description: "The Samsung Galaxy Book is a 2-in-1 PC that runs on Windows 10. It's available in two models: a 10.6-inch model and a 12-inch model. The Galaxy Book is available in two configurations, with either Wi-Fi or LTE connectivity."
    },
    {
        id: 4,
        name: "Galaxy Z Fold5        ",
        quantity: 25,
        price: 1919.99,
        status: "New",
        description: "The Samsung Galaxy Z Fold5 is a foldable phone that was released in July 2023. It has a 7.6 inch display with a 120Hz refresh rate. The phone is powered by a Qualcomm Snapdragon 8 Gen 2 processor and has 12GB of RAM. It also has a 4400mAh battery."
    },
    {
        id: 5,
        name: "iPhone 15 Pro Max",
        quantity: 10,
        price: 15000,
        status: "New",
        description: "iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system."
    },
    {
        id: 6,
        name: "MacBook Pro 15 Inc",
        quantity: 5,
        price: 35000,
        status: "New",
        description: "Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM."
    },
    {
        id: 7,
        name: "Galaxy Book3 Ultra",
        quantity: 40,
        price: 2999.99,
        status: "New",
        description: "The Samsung Galaxy Book is a 2-in-1 PC that runs on Windows 10. It's available in two models: a 10.6-inch model and a 12-inch model. The Galaxy Book is available in two configurations, with either Wi-Fi or LTE connectivity."
    },
    {
        id: 8,
        name: "Galaxy Z Fold5        ",
        quantity: 25,
        price: 1919.99,
        status: "New",
        description: "The Samsung Galaxy Z Fold5 is a foldable phone that was released in July 2023. It has a 7.6 inch display with a 120Hz refresh rate. The phone is powered by a Qualcomm Snapdragon 8 Gen 2 processor and has 12GB of RAM. It also has a 4400mAh battery."
    },
    {
        id: 9,
        name: "iPhone 15 Pro Max",
        quantity: 10,
        price: 15000,
        status: "New",
        description: "iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system."
    },
    {
        id: 10,
        name: "MacBook Pro 15 Inc",
        quantity: 5,
        price: 35000,
        status: "New",
        description: "Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM."
    },
    {
        id: 11,
        name: "Galaxy Book3 Ultra",
        quantity: 40,
        price: 2999.99,
        status: "New",
        description: "The Samsung Galaxy Book is a 2-in-1 PC that runs on Windows 10. It's available in two models: a 10.6-inch model and a 12-inch model. The Galaxy Book is available in two configurations, with either Wi-Fi or LTE connectivity."
    },
    {
        id: 12,
        name: "Galaxy Z Fold5        ",
        quantity: 25,
        price: 1919.99,
        status: "New",
        description: "The Samsung Galaxy Z Fold5 is a foldable phone that was released in July 2023. It has a 7.6 inch display with a 120Hz refresh rate. The phone is powered by a Qualcomm Snapdragon 8 Gen 2 processor and has 12GB of RAM. It also has a 4400mAh battery."
    },
]
let autoId = stockDatabase.length + 1

let fortunes = [
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

module.exports = {

    getCompliment: (req, res) => {
        const compliments = fortunes;
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getStocks: (req, res) => {
        if (stockDatabase.length > 0) 
            res.status(200).send({code: true, stocks: stockDatabase})
        else 
            res.status(200).send({code: true, message: 'Don\'t have product in stock.'})
    },
    createStock: (req, res) => {
        const {name, quantity, price, status, description} = req.body 
        const stockObj = {
            id: autoId,
            name: name,
            quantity: quantity,
            price: price,
            status: status,
            description: description
        }
        stockDatabase.push(stockObj)
        res.status(200).send({code: true, stocks: stockDatabase})
    },
    updateStock: (req, res) => {
        const index = stockDatabase.findIndex((item) => item.id === +req.params.id)
        console.log(stockDatabase[index])
        const {quantity} = req.body 
        stockDatabase[index].quantity = quantity
        // stockDatabase[index].price = price
        // stockDatabase[index].status = status
        // stockDatabase[index].description = description
        res.status(200).send({code: true, stocks: stockDatabase})
    },
    deleteStock: (req, res) => {
        const index = stockDatabase.findIndex(item => item.id === +req.params.id)
        stockDatabase.splice(index, 1)
        res.status(200).send({code: true, stocks: stockDatabase})
    }
}