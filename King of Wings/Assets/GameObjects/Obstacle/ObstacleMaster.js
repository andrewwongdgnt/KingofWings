#pragma strict

var landscapeHolder:GameObject;
var airborneHolder:GameObject;
var ceilingHolder:GameObject;

var mountain_arr:GameObject[];
var mountain_arr2:GameObject[];
var mountain_arr3:GameObject[];
var mountain_arr4:GameObject[];

var robin_arr:GameObject[];

var spikes_arr:GameObject[];

static var mountainType=1;
//1 = stand alone
//2 = continued from left, end on right
//3 = continued from left and to right
//4 = continued to right and end from left
static var obstacleCount:int=2;

function Start () {



}

function Update () {

}

function SpawnObstacle(obstacleID:int, x:float){
	if (!GameMaster.gameOver){
		
		
		if (obstacleID==0){
		
			var thePosition = new Vector2(x, -Camera.main.ScreenToWorldPoint (new Vector3(0f, Screen.height, 0f)).y);
			//mountainType=1;
			if (mountainType==1 || mountainType==2){
				var mountainTypeRandom = Random.Range(0, mountain_arr.length+mountain_arr4.length);
				if (//false && 
				0<=mountainTypeRandom && mountainTypeRandom<mountain_arr.length ){
					mountainType=1;
					var rInt = Random.Range(0, mountain_arr.length);
					Instantiate(mountain_arr[rInt], thePosition, Quaternion.identity ).name = mountain_arr[rInt].name;
				}
				else if (//true ||
				mountain_arr.length<=mountainTypeRandom && mountainTypeRandom<mountain_arr.length+mountain_arr4.length){
					mountainType=4;
					rInt = Random.Range(0, mountain_arr4.length);
				//	rInt=4;
					Instantiate(mountain_arr4[rInt], thePosition, Quaternion.identity ).name = mountain_arr4[rInt].name;
				}
			}
			else if (mountainType==4 || mountainType==3){
				mountainTypeRandom = Random.Range(0, mountain_arr2.length+mountain_arr3.length);
				if (0<=mountainTypeRandom && mountainTypeRandom<mountain_arr2.length){
					mountainType=2;
					rInt = Random.Range(0, mountain_arr2.length);
					Instantiate(mountain_arr2[rInt], thePosition, Quaternion.identity ).name = mountain_arr2[rInt].name;
				}
				else if (mountain_arr2.length<=mountainTypeRandom && mountainTypeRandom<mountain_arr2.length+mountain_arr3.length){
					mountainType=3;
					rInt = Random.Range(0, mountain_arr3.length);
					Instantiate(mountain_arr3[rInt], thePosition, Quaternion.identity ).name = mountain_arr3[rInt].name;
				}
			}
		
		
		}
	
	
		else if (obstacleID==1){
				var randomY = Random.Range(-Camera.main.ScreenToWorldPoint (new Vector3(0f, Screen.height, 0f)).y+10,Camera.main.ScreenToWorldPoint (new Vector3(0f, Screen.height, 0f)).y-10);
				rInt = Random.Range(0, robin_arr.length);
				//rInt = 8;
				Instantiate(robin_arr[rInt], new Vector2(x, randomY), Quaternion.identity ).name = robin_arr[rInt].name;
		
		}else if (obstacleID==2){
				thePosition = new Vector2(x, Camera.main.ScreenToWorldPoint (new Vector3(0f, Screen.height, 0f)).y);
				rInt = Random.Range(0, spikes_arr.length);
				Instantiate(spikes_arr[rInt], thePosition, Quaternion.identity ).name = spikes_arr[rInt].name;
		
		}
	}
}