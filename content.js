/* ============ YOUR CONTENT ============
   Written by the Site Editor, and you can still edit it by hand.
   *stars* around words in a headline or title = highlighted words.
   slug = the folder name of a project page (japan-2025/)   folder = where that project's photos live */
const ME={
  logo:'Jacob\'s Photos',
  name:'Jacob',
  portrait:'images/gallery/stand.jpg',
  hero:'images/gallery/cash-lunch.jpg',
  headline:'Some *moments* deserve to *stay.*',
  highlight:'#e0405f',
  accent:'#c01f48',
  repo:'itsbabp/portfolio',
  statement:'A few sentences about how you see things and what you care about capturing.',
  bio:['Hi, I\'m Jacob','I like take photos for fun'],
  links:[
    ['github','https://github.com/itsbabp'],
    ['instagram','https://instagram.com/itsbabpphotos'],
    ['email','mailto:itsbabp@outlook.com']
  ]
};
const CLIENTS='https://itsbabpphotos.pixieset.com';   /* your client gallery */
/* [label, value, optional description] */
const ABOUT=[
  ['shoots','Canon 200D II / Canon EF-S 55-250mm f/4-5.6 IS STM','I like to capture all sorts of photos ranging from landscapes & portraits to theatre productions.'],
  ['based','Adelaide / South Australia'],
  ['status','Probably taking photos']
];
const PROJECTS=[
  {
    slug:'japan-2025',
    title:'Japan *2025*',
    desc:'A STEM trip to Japan with my school',
    tags:['Trips'],
    tag:'2025',
    location:'Japan',
    img:'images/gallery/land-castle.jpg',
    folder:'images/projects/japan-2025'
  },
  {
    slug:'ducks',
    title:'Ducks',
    desc:'A short description of this series.',
    tags:['Wildlife'],
    tag:'2026',
    location:'Pond',
    img:'images/gallery/9-11 2_80per_srgb-07.jpg',
    folder:'images/projects/ducks'
  }
];
/* home page gallery. ratio only changes an empty slot's shape */
const PHOTOS=[
  {
    src:'images/gallery/cash-lunch.jpg',
    title:'Ruler Of My Heart',
    exif:'f/5.6 · 1/200 · ISO 100'
  },
  {
    src:'images/gallery/New York New York-04.jpg',
    title:'New York, New York',
    exif:'f/4 · 1/500 · ISO 100',
    ratio:'3/2'
  },
  {
    src:'',
    title:'Photo title',
    exif:'f/8 · 1/250 · ISO 200',
    ratio:'4/3'
  }
];
