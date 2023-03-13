//get form
const form = document.querySelector('form').addEventListener('submit', addProduct);

async function getdata() {
    try {
        //axios get 
        const response = await axios
            .get('https://crudcrud.com/api/6f58cec2a2164eddb4aa7c322d5b76d0/sellerOrders')
        if (response.status === 200) {
            for (let i = 0; i < response.data.length; i++) {
                showOrdersOnScreen(response.data[i]);
            }
            console.log("Successfully Loaded", response.data)
        }
    } catch (err) {
        console.log(err);
    }
}

//call the getData for showing the data
window.getdata();


//form add listener
async function addProduct(e) {
    e.preventDefault();
    const priceInput = document.getElementById('price');
    const productInput = document.getElementById('product');
    const categoryInput = document.querySelector('select');

    //create obj
    let obj = {
        price: priceInput.value,
        product: productInput.value,
        category: categoryInput.value
    }
    try {
        //axios post
        const response = await axios
            .post('https://crudcrud.com/api/6f58cec2a2164eddb4aa7c322d5b76d0/sellerOrders', obj)
        if (response.status === 201) {
            console.log(obj)
            showOrdersOnScreen(obj);
        }
    } catch (err) {
        console.log(err);
    }
    //clear fields
    priceInput.value = ''
    productInput.value = ''
    categoryInput.value = '';
}


function showOrdersOnScreen(orders) {
    //get the different categories
    const electronics = document.getElementById('electronics');
    const food = document.getElementById('food');
    const skincare = document.getElementById('skincare');

    //create li
    const li = document.createElement('li');

    //getting the category from user
    const categories = orders.category;

    // create editBtn
    editBtn = document.createElement('input');
    editBtn.type = 'button';
    editBtn.value = 'Edit';
    editBtn.className = 'buttons';
    editBtn.addEventListener('click', async () => {
        //visible in fields
        document.getElementById('price').value = orders.price
        document.getElementById('product').value = orders.product;
        document.querySelector('select').value = orders.category;

        //delete from dom
        li.remove();

        try {
            //axios delete
            const response = await axios
                .delete(`https://crudcrud.com/api/6f58cec2a2164eddb4aa7c322d5b76d0/sellerOrders/${orders._id}`)
            if (response.status === 200) {
                console.log("ok")
            }
        } catch (err) {
            console.log(err);
        }
    });

    //create deleteBtn
    deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete';
    deleteBtn.className = 'buttons';
    deleteBtn.onclick = async function deleteOrders() {

        //remove from Dom
        li.remove();

        try {
            //axios delete
            const response = await axios
                .delete(`https://crudcrud.com/api/6f58cec2a2164eddb4aa7c322d5b76d0/sellerOrders/${orders._id}`)
            if (response.status === 200) {
                console.log("delete successful")
            }
        } catch (err) {
            console.log(err);
        }
    }

    //create text node in li
    li.appendChild(document.createTextNode(`${orders.price} - ${orders.product} - ${orders.category}`));
    //append edit button to li
    li.appendChild(editBtn);
    //append delete button to li
    li.appendChild(deleteBtn);

    if (categories == 'Electronics') {
        electronics.appendChild(li);
    }
    else if (categories == 'Food') {
        food.appendChild(li);
    }
    else {
        skincare.appendChild(li);
    }
}

