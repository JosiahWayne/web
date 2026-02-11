
document.getElementById('b1').addEventListener('click', function(){


	console.log('CLICKED!');
	const newImage = document.createElement('img');
    newImage.src= './images/cat.jpg';
    newImage.alt = 'a reclining striped cat'; // Add an alt attribute for accessibility

    document.getElementById('imageContainer').appendChild(newImage);




})


