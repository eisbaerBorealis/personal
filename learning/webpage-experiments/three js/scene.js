const colorMetalGre = '#0e6947';
const colorMetalOra = '#e65a09';

var greenBeamGeometry = new THREE.BoxGeometry( .2, 5, .2 );
// var greenBeamMaterial = new THREE.MeshBasicMaterial( { color: colorMetalGre } );
var greenBeamMaterial = new THREE.MeshLambertMaterial( { color: colorMetalGre, side: THREE.DoubleSide } );
var cube = new THREE.Mesh( greenBeamGeometry, greenBeamMaterial );

var ambLight = new THREE.AmbientLight(0xffffff, 1);

var dirLight = new THREE.DirectionalLight(0xffffff, .5);
dirLight.position.set(1, 2, 3);

var hemLight = new THREE.HemisphereLight(0xffffff, 0x999999, 5);

scene.add( cube );
scene.add(ambLight);
scene.add(dirLight);
// scene.add(hemLight);
cube.position.x = 2;
cube.position.y = 1;