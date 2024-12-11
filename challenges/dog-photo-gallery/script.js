const gallery = document.createElement("div");
gallery.classList.add("photo-gallery");
const btn1 = document.createElement('button')
btn1.textContent = 'button 1'
const btn2 = document.createElement('button')
btn2.textContent = 'button 2'
const ul = document.createElement('ul')

document.body.append(gallery, btn1, btn2, ul);
console.log(document.body);
