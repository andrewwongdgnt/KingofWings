#pragma strict

var start:AudioSource;
var loop:AudioSource;
var anim:Animator;

function Start () {

	
}

	
function Update () {
	var pitchFactor = 4f;
	var pitch = (GameMaster.gameSpeed/GameMaster.gameSpeed_start)/pitchFactor - 1/pitchFactor+1; 
	loop.pitch = pitch;
	start.pitch = pitch;
	
	if (GameMaster.gameOver){
		anim.SetInteger("State",0);
	} else {
		anim.SetInteger("State",1);
	}
}

function PlayStartMusic(){
	if (!loop.isPlaying && !start.isPlaying)
		start.Play();
}

function PlayLoopMusic(){
	if (!start.isPlaying && !loop.isPlaying)
		loop.Play();
}
/*function OnApplicationPause(pauseStatus: boolean) {
	if (pauseStatus){
		if (isLooping)loop.Pause();
		else start.Pause();
	} else {
		if (isLooping) loop.Play();
		else start.Play();
	}
	
}*/
