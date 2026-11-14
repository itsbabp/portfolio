/* ============ YOUR CONTENT: edit everything on this page ============ */
const ME={
  logo:"Jacob's Photos",                 /* top-left name and loading screen */
  name:'Jacob',                          /* used in the footer */
  portrait:'images/gallery/stand.jpg',   /* photo of you in the About section ('' for a placeholder) */
  hero:'images/gallery/cash-lunch.jpg',  /* big photo under the headline ('' to hide it) */
  headline:'Some *moments* deserve to *stay.*',   /* *stars* = crimson words */
  highlight:'#e0405f',   /* colour of the *starred* words */
  accent:'#c01f48',      /* colour of the thin lines and the loading bar */
  repo:'itsbabp/portfolio',
  statement:'A few sentences about how you see things and what you care about capturing.',
  bio:['One line about you.','One line about what you shoot.'],
  links:[['github','https://github.com/itsbabp'],['instagram','https://instagram.com/itsbabpphotos'],['email','mailto:itsbabp@outlook.com']]
};
const CLIENTS='https://itsbabpphotos.pixieset.com';   /* your client gallery */
/* [label, value, optional description under it] */
const ABOUT=[
  ['shoots','Canon 200D II / Canon EF-S 55-250mm f/4-5.6 IS STM','I like to capture all sorts of photos ranging from landscapes & portraits to theatre productions.'],
  ['based','Adelaide / South Australia'],
  ['status','Commissions soon!']
];
/* Each project needs a "slug" that matches its folder name (japan-2025/ and ducks/).
   Photos for a project page go in "photos:[{src:'images/projects/japan-2025/01.jpg',title:'Nagoya Castle',exif:''}, ...]".
   Leave "photos" out and the page shows 20 empty landscape slots to fill. */
const PROJECTS=[
  {slug:'japan-2025',title:'Japan *2025*',desc:'A STEM trip to Japan with my school',tags:['Trips'],tag:'2025',location:'Japan',img:'images/gallery/land-castle.jpg',folder:'images/projects/japan-2025'},
  {slug:'ducks',title:'Ducks',desc:'A short description of this series.',tags:['Wildlife'],tag:'2026',location:'',img:''}
];
/* ratio only changes the placeholder shape; real photos keep their own proportions */
const PHOTOS=[
  {src:'images/gallery/cash-lunch.jpg',title:'Ruler Of My Heart',exif:'f/5.6 · 1/200 · ISO 100'},
  {src:'',title:'Photo title',exif:'f/4 · 1/500 · ISO 100',ratio:'3/2'},
  {src:'',title:'Photo title',exif:'f/8 · 1/250 · ISO 200',ratio:'4/3'}
];
