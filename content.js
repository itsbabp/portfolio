/* ============ YOUR CONTENT: edit everything on this page ============ */
const ME={
  logo:"Jacob's Photos",                 /* short mark in the top-left header (separate from your name below) */
  name:'Jacob',          /* full name: shown on the ID card and in the footer */
  portrait:'images/gallery/stand.jpg',   /* your portrait for the ID card, e.g. 'images/portrait.jpg' (leave '' for a placeholder) */
  role:'Photographer',
  base:'Adelaide / South Australia',
  headline:'A great photo captures both a *moment* and a *feeling.*',
  statement:'Loreum Ispum Loreum Ispum Loreum Ispum Loreum Ispum Loreum Ispum',
  bio:['One line about you.','One line about what you shoot.'],
  links:[['github','https://github.com/itsbabp'],['instagram','https://instagram.com/itsbabpphotos'],['email','mailto:itsbabp@outlook.com']],
  words:['photography','写真','portfolio','commissions soon!']   /* the scrolling band under the intro */
};
const CLIENTS='https://itsbabpphotos.pixieset.com';           /* your client gallery address */
const ABOUT=[
  ['shoots','Canon 200D II / Canon EF-S 55-250mm f/4-5.6 IS STM','I like to capture all sorts of photos ranging from landscapes & portraits to theatre productions.'],
  ['status','Commissions soon!']
];
/* img / src = image path, e.g. 'images/projects/one.jpg'. Leave '' for a placeholder. */
const PROJECTS=[
  {title:'Japan 2025',desc:'A STEM trip to Japan with my school',tags:['Trips'],tag:'2025',img:'images/gallery/land-castle.jpg',link:''},
  {title:'Project two',desc:'A couple of sentences about this one.',tags:['photo','series'],tag:'2025',img:'',link:''},
  {title:'Project three',desc:'Short and honest works best.',tags:['street'],tag:'2025',img:'',link:''}
];
/* ratio only changes the placeholder shape; real photos keep their own proportions */
const PHOTOS=[
  {src:'images/gallery/cash-lunch.jpg',title:'Ruler Of My Heart',exif:'f/5.6 · 1/200 · ISO 100',ratio:'4/5'},
  {src:'',title:'Photo title',exif:'f/4 · 1/500 · ISO 100',ratio:'3/2'},
  {src:'',title:'Photo title',exif:'f/8 · 1/250 · ISO 200',ratio:'4/3'}
];