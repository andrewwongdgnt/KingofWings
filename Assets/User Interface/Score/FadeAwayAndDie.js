#pragma strict

private var time:int;
var fadeOff:int;
function Start () {
	time = Time.time*1000;
}

private var i:float = 1;
function Update () {
		
			var diff:int=Time.time*1000-time;
	
	if (diff>fadeOff){
		i-=Time.deltaTime*3;
		GetComponent(TextMesh).color.a = i;

		
	}
	if (i<0) Destroy(gameObject);
}