const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create elements and render cafe
function renderCafe(doc) {
	let li = document.createElement('li');
	let name = document.createElement('span');
	let city = document.createElement('span');
	// setting data into our element/attribute
	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().name;
	city.textContent = doc.data().city;
	// append our elements
	li.appendChild(name);
	li.appendChild(city);
	//append to cafeList - document
	cafeList.appendChild(li);
}


// getting data from the db
db.collection('cafes').get().then((snapshot) => {
	// loop through each document
	snapshot.docs.forEach(doc => {
		//parse the data into our render function above
		renderCafe(doc);
	})
})

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });
    // crear out input fields after adding them
    form.name.value = '';
    form.city.value = '';
})