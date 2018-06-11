/* ---------- TITLE BREAKDOWN---------- */

const title = document.querySelector('.title');
title.innerHTML = breakdown(title.textContent);

function breakdown(word) {
  return [...word].map(letter => `<span>${letter}</span>`).join('');
}


/* ---------- NAVIGATION ---------- */

const nav = document.querySelector('#navigation');
const navItems = Array.from(document.querySelectorAll('[data-where]'));

let topOfNav = nav.offsetTop;

/* --- fixed strech --- */

function fixNav() {
  if (window.scrollY >= topOfNav) {
    nav.classList.add('fixed-nav');
  }
  else {
    nav.classList.remove('fixed-nav');
  }
}

window.addEventListener('scroll', fixNav);

/* --- navigating --- */

function navClicked(){
  let where = 0;
  if(this.dataset.where !== 'top')
  {
    const div = document.querySelector(`#${this.dataset.where}`);
    where = div.offsetTop-nav.offsetHeight;
  }
  window.scroll({
    top: where,
    behavior: "smooth"
  });
}

navItems.forEach(item => item.addEventListener('click', navClicked));




/* ---------- VARIETIES ---------- */

const slider = document.querySelector('#varieties .slider');
const points = Array.from(document.querySelectorAll('#varieties .nav-points span'));
let translate = 0;

const species = Array.from(document.querySelectorAll('#varieties .species p'));


/* --- slider --- */

function activePoint(){
  const pastPoint=document.querySelector('#varieties .nav-points .active');
  const pastSlide=document.querySelector('#varieties .slider .active');
  pastPoint.classList.remove('active');
  pastSlide.classList.remove('active');
  const matchingSlide = document.querySelector(`#${this.dataset.slide}`);
  this.classList.add('active');
  matchingSlide.classList.add('active');
  translate += pastSlide.getBoundingClientRect().y - matchingSlide.getBoundingClientRect().y;
  slider.style.transform = `translate(0px, ${translate}px)`;
}

points.forEach(point => point.addEventListener('click', activePoint))


/* --- species --- */

function activeSpecie(){
  const previous = document.querySelector('#varieties .species .active-specie');
  const img = this.dataset.image;
  const parent = this.parentElement.id.replace(/-/g, ' ');;
  const image = document.querySelector('#varieties .active .chosen img');
  const titlePlaceholder = document.querySelector('#varieties .active .chosen-title');
  previous.classList.remove('active-specie');
  this.classList.add('active-specie');
  image.src = img;
  titlePlaceholder.innerHTML=`<span>${this.textContent}</span> (${parent})`;
}

species.forEach(specie => specie.addEventListener('click', activeSpecie));



/* ---------- FAQ ---------- */

const cards = Array.from(document.querySelectorAll('#faq .card'));
const questions = Array.from(document.querySelectorAll('#faq .back .question'));

/* --- q&a --- */

function removeActive(question){
  const [span, a] = [question.querySelector('.q span'), question.querySelector('.a')];
  a.style.height='0px';
  span.innerHTML='&#9662;'
  question.classList.remove('active');
}

function toggleActive(){
  const [span, a] = [this.querySelector('.q span'), this.querySelector('.a')];
  const current = document.querySelector('#faq .question.active');
  if(!this.classList.contains('active')){
    const height = `${a.querySelector('p').offsetHeight}px`;
    a.style.height= height;
    span.innerHTML='&#9652;';
    this.classList.add('active');
  }
  if(current != null) {
    removeActive(current);
  }
}

questions.forEach(question => question.addEventListener('click', toggleActive));


/* --- flipping --- */
/*
function openCard(){
  this.classList.add('flipped');
}

function closeCard(){
  const activated = this.querySelector('#faq .question.active');
  if(activated !== null) { removeActive(activated);}
  this.classList.remove('flipped');
}

cards.forEach(card => {
  card.addEventListener('click', openCard);
  card.addEventListener('mouseleave', closeCard);
});*/

function openCard(card){
  card.classList.add('flipped');
}

function closeCard(card){
  const activated = card.querySelector('#faq .question.active');
  if(activated !== null) { removeActive(activated);}
  card.classList.remove('flipped');
}

function toggleCard(){
  const clicked = event.target.closest('.card');
  const flipped = document.querySelector('#faq .flipped');
  if(!clicked && flipped){
   closeCard(flipped);
  }
  else if(clicked && clicked !== flipped){
    if(flipped) {closeCard(flipped);}
    openCard(clicked);
  }
}

document.addEventListener('click', toggleCard)


/* ---------- GALLERY ---------- */

const gallery = document.querySelector('#gallery');
const galleryWrapper = document.querySelector('#gallery .wrapper');
const moveBtns = document.querySelectorAll('#gallery .move');

const translateValue = gallery.offsetWidth / 2.5;
const lastImg = Array.from(document.querySelectorAll('#gallery .wrapper img')).pop();

/* --- moving --- */

let translated = 0;

function galleryMove(){
  if(this.classList.contains('next')){
    let galleryEnd =  gallery.getBoundingClientRect().width;
    let imageEnd =  lastImg.getBoundingClientRect().x + lastImg.getBoundingClientRect().width;
    if(imageEnd - galleryEnd >= translateValue + translated){
      translated += translateValue;
      galleryWrapper.style.transform = `translate(-${translated}px, 0px)`;
    }
    else{
      translated += imageEnd - galleryEnd;
      galleryWrapper.style.transform = `translate(-${translated}px, 0px)`;
    }
  }
  else if(this.classList.contains('previous')){
    translated -= translateValue;
    if(translated > 0){
      galleryWrapper.style.transform = `translate(-${translated}px, 0px)`;
    }
    else{
      translated=0;
      galleryWrapper.style.transform = `translate(0px, 0px)`;
    }
  }
}

moveBtns.forEach(btn => btn.addEventListener('click', galleryMove));
