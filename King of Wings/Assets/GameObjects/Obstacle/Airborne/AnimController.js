#pragma strict

var animState:int;
var anim:Animator;
function Start () {

}

function Update () {
	anim.SetInteger("State", animState);
}