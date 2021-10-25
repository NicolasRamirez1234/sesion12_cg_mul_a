
var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado){
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material)
    {
     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    scene.add(cube);
    return(cube);
}
function init() {

   var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(new THREE.Color(0xFFFFFF));
    renderer.setSize(window.innerWidth, window.innerHeight);
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);
   
    Cubo = []; //define un array unidimensional
    dim = 10; //valor inicial de las dimensiones de los cubos

    Cubo.push(cubo(dim, dim, dim, 0x105B01, 'Physical', false));
    Cubo.push(cubo(dim, dim, dim, 0x105B01, 'Physical', false));
    Cubo.push(cubo(dim, dim, dim, 0x105B01, 'Physical', false));

    //un ciclo for para optimizar la creación de los cubos y hacer sus respectivas transformaciones
    for(i=0; i < 3; i++){
        Cubo[i].translateX(dim/2); //translada el cubo en el eje x  
        Cubo[i].translateY(dim/2); //translada el cubo en el eje y  
        Cubo[i].translateZ(dim/2); //translada el cubo en el eje z  
    }

    for(i=0; i < 3; i++)
        if(i==1 || i==2){
            escala=1/(2*i);//valor del porcentaje de escala a reducir
            unidades=(dim/2)+(dim/4)+((((dim/2)+(dim/4))/2))*(i-1);//da la posición respectiva a cada cubo
            Cubo[i].scale.set(escala, escala, escala); //cambia la posición de los cubos respectivamente
            Cubo[i].translateY(unidades); //translada el cubo en el eje y para que quede arriba del cubo anterior
        }
  
    light = new THREE.PointLight(0xFFFFFF);                                       
    light.position.set(-10, 50, 10);
    scene.add( light );
    camera.position.set(20, 25, 40);
    camera.lookAt(scene.position);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    renderer.render(scene, camera);
}