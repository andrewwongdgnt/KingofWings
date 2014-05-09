#pragma strict

static var start: float = 1;
static var interval: float = start;

var leftWall:BoxCollider2D;
var rightWall:BoxCollider2D;
var bottomWall:BoxCollider2D;

var cloud_arr:GameObject[];
function Start () {

}

function Update () {

	leftWall.size = new Vector2(2f, Camera.main.ScreenToWorldPoint(new Vector3(0f, Screen.height* 2f, 0f)).y);
	leftWall.center = new Vector2(Camera.main.ScreenToWorldPoint (new Vector3(0f, 0f, 0f)).x-1f,0f);
	
	rightWall.size = new Vector2(2f, Camera.main.ScreenToWorldPoint(new Vector3(0f,Screen.height * 2f, 0f)).y);
	rightWall.center = new Vector2(Camera.main.ScreenToWorldPoint (new Vector3(Screen.width, 0f, 0f)).x+1f,0f);
	
		
	bottomWall.size = new Vector2(Camera.main.ScreenToWorldPoint(new Vector3(Screen.width * 2f, 0f, 0f)).x, 2f);
	bottomWall.center = new Vector2(0f, Camera.main.ScreenToWorldPoint (new Vector3(0f, 0f, 0f)).y-1f);
	
	interval -= Time.deltaTime;
	if (interval<=0){
		start = Random.Range(5,10);
		interval=start;
		var randNum = Random.Range(0,cloud_arr.length);
 		var cloud:GameObject = Instantiate(cloud_arr[randNum], new Vector2(rightWall.center.x+cloud_arr[randNum].renderer.bounds.size.x/2,Random.Range(0f,4f)), Quaternion.identity);
 		var sc = Random.Range(0.5,1.5);
 		cloud.transform.localScale= new Vector3(sc,sc,sc);
 		cloud.rigidbody2D.velocity.x = -1*sc;
 		
 		cloud.transform.position.z -= sc;
 	}
		
}