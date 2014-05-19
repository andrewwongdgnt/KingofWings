#pragma strict

var dontSpawn:boolean;

private var obstacleMaster:GameObject;


function Start () {
		
	obstacleMaster = GameObject.Find("_Obstacle Master");
		
	


}

function FixedUpdate () {

	transform.rigidbody2D.velocity.x=GameMaster.gameSpeed;
}

function OnTriggerEnter2D(colInfo : Collider2D){
	
	if (colInfo.gameObject.name=="Player"){
		GameMaster.playerHit();
	}


}
function OnTriggerExit2D(colInfo : Collider2D){
	
	if (colInfo.gameObject.name=="Left"){
		Destroy (gameObject);

	}
	if (colInfo.gameObject.name=="Right" && !dontSpawn){
	
	
		
		var currentPosX = transform.position.x + renderer.bounds.size.x;
		
		var i = Random.Range(0, ObstacleMaster.obstacleCount);
		//var i = 0;
		if (i==0 || ObstacleMaster.mountainType==3 || ObstacleMaster.mountainType==4){
			//currentPosX = transform.position.x + renderer.bounds.size.x;
			if (ObstacleMaster.mountainType==1 || ObstacleMaster.mountainType==2){
				currentPosX+=GameMaster.obstacleSpread;
			} 		
			obstacleMaster.GetComponent(ObstacleMaster).SpawnObstacle(0, currentPosX);
		}else if (i==1 || i==2){
			//var box:BoxCollider2D = colInfo;
			//var rightBoxX = box.center.x - box.size.x/2+GameMaster.obstacleSpread;
			currentPosX +=GameMaster.obstacleSpread;
			obstacleMaster.GetComponent(ObstacleMaster).SpawnObstacle(i, currentPosX);
		}
	}


}