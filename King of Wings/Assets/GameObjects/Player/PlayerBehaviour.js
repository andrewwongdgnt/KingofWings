#pragma strict

var anim:Animator;
var maxSpeed : float;

static var flashInterval:int = 0;
private var flashInterval_end:int = 105;
static var isHit:boolean=false;
static var isFlashing:boolean=false;


var hitSound:AudioSource;
function Start () {

}





function FixedUpdate () {
	var halfMaxSpeed = maxSpeed*2/3;

    var dir : Vector3 = Vector3.zero;
    dir.y = Input.acceleration.y*halfMaxSpeed;
    if (dir.y>0) dir.y=0;
    dir.y = dir.y+(halfMaxSpeed*(1-(dir.y/-halfMaxSpeed)));
    
    
	rigidbody2D.velocity.y = Mathf.Clamp( dir.y, -maxSpeed, maxSpeed );

    dir.x = Input.acceleration.x*20;
	rigidbody2D.velocity.x = Mathf.Clamp( dir.x, -maxSpeed, maxSpeed );
	
	
	
	if (isFlashing){
		flashInterval++;
	
		if (flashInterval%10<5){
		 //renderer.enabled=false;
		 GetComponent(SpriteRenderer).color.a=0;
		} else {
		
		// renderer.enabled=true;
		 GetComponent(SpriteRenderer).color.a=1.0;
		}
		
		if (flashInterval>flashInterval_end){
			isFlashing=false;
		}
	}
	

	anim.SetBool("hit", isHit);
	
	
	if (!renderer.isVisible){
		transform.position = new Vector2(0f,0f);
	}
}


function setFlashing(){
	if (GameMaster.playerLives>0)
 	isFlashing=true;
 	isHit=false;
}

function playHitSound(){
	if (!hitSound.isPlaying)
	hitSound.Play();
}

function OnCollisionEnter2D(colInfo : Collision2D){


}

function OnCollisionExit2D(colInfo : Collision2D){

}
