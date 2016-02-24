/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Morph = class Morph extends WHS.Shape {

	constructor( params ) {

		super( params, "morph" );

		api.extend(params.geometry, {

            path: ""

        });

        console.log(this);

        var scope = this;

        this._loading = new Promise(function(resolve, reject) {

            api.JSONLoader().load(params.geometry.path, function(data) {

                var material = new THREE.MeshLambertMaterial( {
                    color: 0xffaa55,
                    morphTargets: true,
                    vertexColors: THREE.FaceColors
                } );

                data.computeFaceNormals();
                data.computeVertexNormals();

                // Visualization.
                scope.mesh = new THREE.Mesh( data, material );
                scope.mesh.speed = params.morph.speed;

                scope.mesh.mixer = new THREE.AnimationMixer( scope.mesh );
                scope.mesh.mixer.addAction( new THREE.AnimationAction( data.animations[ 0 ] ).warpToDuration( 0.5 ) );

                scope.mesh.mixer.update( 600 * Math.random() );

                scope._rot.y = Math.PI / 2;

                resolve();

            });

        });

        super.build("wait");

	}

}

WHS.init.prototype.Morph = function( params ) {
	return ( new WHS.Morph(  params ) ).addTo( this, "wait" );
}
