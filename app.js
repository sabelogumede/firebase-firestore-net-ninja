const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create elements and render cafe
function renderCafe(doc) {
	let li = document.createElement('li');
	let name = document.createElement('span');
	let city = document.createElement('span');
	let cross = document.createElement('div');
	// setting data into our element/attribute
	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().name;
	city.textContent = doc.data().city;
	cross.textContent = 'x';
	// append our elements
	li.appendChild(name);
	li.appendChild(city);
	li.appendChild(cross);
	//append to cafeList - document
	cafeList.appendChild(li);

	//delete data by Id from firestore db
	cross.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
        //console.log(id);
        db.collection('cafes').doc(id).delete();
	})
}

// ------------ Firebase Queries -- == ----- get all data from db --- by category or value with logic ' ===>< '--------Ordering data 'big to samll, alphabetic, ----------------------------------------------------------

// getting data from the db

// db.collection('cafes').get().then((snapshot) => {

// getting city by category/value "using .where(with three parameters!! )"
//db.collection('cafes').where('city', '==', 'Johannesburg').get().then((snapshot) => {

// Ordering Data - by property name = .orderBy('property name') (in firebase when ordering by alphabetes - capital letters come before small letters )
//db.collection('cafes').orderBy('city').get().then((snapshot) => {

// using multiple-dot-chain-queries in firebase (NOTE!! this might give you an error - 'create index' click on the error link to create)
//db.collection('cafes').where('city', '==', 'Johannesburg').orderBy('name').get().then((snapshot) => {


// get data - we are now getting "real-time" data below "saving data"
// db.collection('cafes').where('city', '==', 'Johannesburg').orderBy('name').get().then((snapshot) => {
// 	snapshot.docs.forEach(doc => {
// 		renderCafe(doc);
// 	})
// })


// --------------------Firebase Queries--------------------------------------------------------------------

// saving data
form.addEventListener('submit', (e) => {
	e.preventDefault();
	db.collection('cafes').add({
		name: form.name.value,
		city: form.city.value,
	});
	// crear out input fields after adding them
	form.name.value = '';
	form.city.value = '';
})

// "reactive" = get real-time data listerner ".onSnapshot(this is when something changes)"
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		//console.log(change.doc.data())

		// check for type of change
		if(change.type == 'added'){
			renderCafe(change.doc)
		} else if (change.type == 'removed'){
			let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
			cafeList.removeChild(li);
		}
	})
})
