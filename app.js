const cafeList = document.querySelector('#cafe-list');

// create elements and render cafe
function renderCafe(doc){
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
    cafeList.appendChild(li)
}


// get data from the db
db.collection('cafes').get().then((snapshot) => {
	// loop through each document
	snapshot.docs.forEach(doc => {
		//parse the data into our render function above
		renderCafe(doc);
	})
})
