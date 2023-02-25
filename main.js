const form = document.querySelector('form');
const priceInput = document.getElementById('price');
const productInput = document.getElementById('product');
const categoryInput = document.querySelector('select');
const electronics = document.getElementById('electronics');
const food = document.getElementById('food');
const skincare = document.getElementById('skincare');


//axios get 
window.addEventListener('DOMContentLoaded', () => {
    axios
        .get('https://crudcrud.com/api/cbdf4d1e91d2417d9654e7e9bd5c9b8b/sellerOrders')
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                showOrdersOnScreen(res.data[i]);
            }
            console.log("Successfully Loaded", res.data)
        })
        .catch((err) => console.log(err));
});

//form add listener
form.addEventListener('submit', (e) => {
    e.preventDefault();

    //create obj
    let obj = {
        price: priceInput.value,
        product: productInput.value,
        category: categoryInput.value
    }

    //axios post
    axios
        .post('https://crudcrud.com/api/cbdf4d1e91d2417d9654e7e9bd5c9b8b/sellerOrders', obj)
        .then((res) => {
            showOrdersOnScreen(obj);
            console.log("Order is Created");
        })
        .catch((err) => {
            console.log(err);
        });

        //clear fields
        priceInput.value = ''
        productInput.value = ''
        categoryInput.value = obj.category;
});

function showOrdersOnScreen(orders) {
    //create li
    const li = document.createElement('li');

    const categories = orders.category;

    //create deleteBtn
    deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete Order';
    deleteBtn.className = 'delete';
    deleteBtn.addEventListener('click', () => {
        //remove from Dom
        li.remove();

        //axios delete
        axios
            .delete(`https://crudcrud.com/api/cbdf4d1e91d2417d9654e7e9bd5c9b8b/sellerOrders/${orders._id}`)
            .then((res) => {
                console.log("delete successful")
            })
            .catch((err) => {
                console.log(err)
            });
    });
    //create text node in li
    li.appendChild(document.createTextNode(`${orders.price} - ${orders.product} - ${orders.category}`));
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

