(function () {
    var jsonFileName = './chapstick-1.json';
    var imageFileName = 'logo.png';

    var scene, camera, renderer;
    var mesh = null;

    var WIDTH  = window.innerWidth;
    var HEIGHT = window.innerHeight;
    var SPEED = 0.02;

    function init() {
        scene = new THREE.Scene();
        initMesh();
        initCamera();
        initRenderer();

        document.body.appendChild(renderer.domElement);
    }

    function initCamera() {
        camera = new THREE.PerspectiveCamera(100, WIDTH / HEIGHT, 1, 10);
        camera.position.set(0, 3.5, 5);
    }

    function initRenderer() {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(WIDTH, HEIGHT);
    }

    function initMesh() {
        var loader = new THREE.JSONLoader();

        loader.load(jsonFileName, function(geometry) {
            var texture = new THREE.ImageUtils.loadTexture(imageFileName);
            var material = new THREE.MeshBasicMaterial({map:texture});

            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
        });
    }

    //Note - just spinning it around to show full logo
    //but can uncomment below lines to rotate x,z to show bottom and curved top
    function rotateMesh() {
        if (!mesh) {
            return;
        }
        //mesh.rotation.x -= SPEED;
        mesh.rotation.y -= SPEED;
        //mesh.rotation.z -= SPEED;
    }

    function render() {
        requestAnimationFrame(render);
        rotateMesh();
        renderer.render(scene, camera);
    }

    init();
    render();
})();
