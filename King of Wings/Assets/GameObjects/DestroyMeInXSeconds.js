#pragma strict
static var seconds:int = 10;
function Start () {
yield WaitForSeconds(seconds);
Destroy(gameObject);
}

function Update () {

}