using UnityEngine;
using UnityEngine.SocialPlatforms;
using System.Collections;
using System.Collections.Generic;
using System.Net;
using com.shephertz.app42.paas.sdk.csharp;
using com.shephertz.app42.paas.sdk.csharp.game;
using AssemblyCSharp;
using System;
using System.Text;

public class MyScoreBoard : MonoBehaviour
{
	ServiceAPI sp = null;
	ScoreBoardService scoreBoardService = null; // Initializing ScoreBoard Service.
	public static Boolean isGlobalHS;
	public static int myRank;
	public static Boolean onSuccess;
	private IList<Game.Score> scoreList;
	ScoreBoardResponse callBack = new ScoreBoardResponse ();

	private string apiKey  ="8bb5daae72858ac50227e8061462379f57e507d0c45a7838bf91147e46663537";						// API key that you have receieved after the success of app creation from AppHQ
	private string secretKey ="ea8b34c1d7347a036dd90b7b34c87a6c97f17f5b0e70d4979ba95bb9e208a8e1";					// SECRET key that you have receieved after the success of app creation from AppHQ
	private string gameName ="High Score";	

	public GUIStyle myStyle;
	private int highscore;

	private Boolean refreshHighscore=true;

	public TextMesh rank;
	public TextMesh name;
	public TextMesh score;
	public TextMesh playerName;
	public GameObject textfield_background;
	public TextMesh playerRank;
	public TextMesh playerScore;
	public TextMesh totalScores;

	
	public TextMesh onSuccess_text;

	#if UNITY_EDITOR
	public static bool Validator (object sender, System.Security.Cryptography.X509Certificates.X509Certificate certificate, System.Security.Cryptography.X509Certificates.X509Chain chain, System.Net.Security.SslPolicyErrors sslPolicyErrors)
	{return true;}
	#endif
	void Start ()
	{
		#if UNITY_EDITOR
		ServicePointManager.ServerCertificateValidationCallback = Validator;
		#endif
		sp = new ServiceAPI (apiKey,secretKey);
	
		scoreBoardService = sp.BuildScoreBoardService (); // Initializing ScoreBoard Service.
		scoreBoardService.GetTopRankings (gameName, callBack);

		isGlobalHS = true;



		highscore = PlayerPrefs.GetInt("MyHighscore")	;

	}
	
	// Update is called once per frame
	void Update ()
	{
		StringBuilder ranks = new StringBuilder ("");
		StringBuilder names = new StringBuilder ("");  
		StringBuilder scores = new StringBuilder ("");  

		rank.text =
			name.text = 
				score.text = 
				playerName.text = 
				playerRank.text = 
				playerScore.text = 
				totalScores.text = "";
		
		
		textfield_background.renderer.enabled=false;

		onSuccess = callBack.getSuccessStatus ();

		onSuccess_text.renderer.enabled = !onSuccess;
		if (onSuccess) {
			if (scoreList != null && scoreList.Count <= 1) {
				scoreBoardService.GetTopRankings (gameName, callBack);
				refreshHighscore = false;
	
			}
			scoreList = callBack.getScoreList ();

			if (scoreList != null) {
	
	
				myRank = BinarySearch () + 1;
				int startIndex;
				int maxIndex;
				if (isGlobalHS || myRank <= 5) {
						startIndex = 0;
						maxIndex = 10;
				} else {
						startIndex = myRank - 5;
						maxIndex = myRank + 5;
				}
				for (int i = startIndex, num=i+1; i < scoreList.Count && i<maxIndex; i++,num++) {

						if (num > 2)
								ranks.Append (num + ".\n");
						else 
								ranks.Append ("\n");
						names.Append (scoreList [i].GetUserName () + "\n");
						scores.Append (scoreList [i].GetValue () + "\n");
				}

				//	ranks.Insert(0, myRank+".");
			}

			Vector3 temp = rank.transform.position;
			temp.x = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width/2, 0f, 0f)).x-4f;
			temp.y = Camera.main.ScreenToWorldPoint(new Vector3(0f, Screen.height, 0f)).y-2f;
			rank.transform.position = temp;
			rank.text = ranks.ToString ();
			
			temp.x +=5.8f;
			score.transform.position = temp;
			score.text = scores.ToString ();
			
			temp.x += -4.5f;
			name.transform.position = temp;
			name.text = names.ToString ();
			
			temp.y = Camera.main.ScreenToWorldPoint(new Vector3(0f, Screen.height, 0f)).y-4.6f;
			temp.x = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width/2, 0f, 0f)).x+5.5f;
			playerName.transform.position = temp;
			playerName.text = PlayerPrefs.GetString("playerName");
			
			temp.y += -.05f;
			temp.x -=0.05f;
			textfield_background.transform.position = temp;
			textfield_background.renderer.enabled=true;

			//temp.y += -.05f;
			temp.x -=1.2f;
			playerRank.transform.position = temp;
			playerRank.text = myRank+".";
			
			temp.y -=.8f;
			//temp.x +=0.5f;
			playerScore.transform.position = temp;
			playerScore.text = highscore+"";

			temp.y +=3.5f;
			totalScores.transform.position = temp;
			totalScores.text = "Out of "+scoreList.Count+"\nsubmissions";
		}




		//

	}

	public void refresh(){
		scoreBoardService.GetTopRankings (gameName, callBack);
	}

	public  int BinarySearch()
	{

		int lower = 0;
		int upper = scoreList.Count - 1;
		int middle = 0;
		while (lower <= upper)
		{
			middle = lower + (upper - lower) / 2;
			if (scoreList[middle].GetValue() == highscore){
				while (middle>=0 && scoreList[middle].GetValue()==highscore){
					middle--;
				}
				middle++;
				return middle;
			}
				
			else if (scoreList[middle].GetValue() < highscore)
				upper = middle - 1;
			else
				lower = middle + 1;
		}
		if (scoreList[middle].GetValue() > highscore) {
			middle++;
		}
		
		return middle;
	}

	public void submitScore(){

		int isHighScoreSubmitted = PlayerPrefs.GetInt("isHighScoreSubmitted");
		if ((isHighScoreSubmitted==null || isHighScoreSubmitted==0) && PlayerPrefs.GetInt("MyHighscore")>0){


			string playerName = PlayerPrefs.GetString("playerName")	;
			if (playerName==null || playerName.Trim().Length==0){
				playerName="<name>";
			}
			scoreBoardService.SaveUserScore (gameName, playerName, highscore, callBack);

			Debug.Log("submit score");
			Invoke("checkSuccess", 1);

			refreshHighscore = true;
		} else {
			Debug.Log("Highscore submitted already");
		}


	}



	public void checkSuccess(){
		if (callBack.getSuccessStatus ()){
			PlayerPrefs.SetInt("isHighScoreSubmitted",1);	
		}
	}



	public class ScoreBoardResponse : App42CallBack
	{
		private string result = "";
		private IList<Game.Score> scoreList;
		private Boolean isSuccess;

		public void OnSuccess (object obj)
		{
			if (obj is Game) {
				Game gameObj = (Game)obj;
				result = gameObj.ToString ();
				//Debug.Log ("GameName : " + gameObj.GetName ());
				if (gameObj.GetScoreList () != null) {
					scoreList = gameObj.GetScoreList ();
					//for (int i = 0; i < scoreList.Count; i++) {
						//Debug.Log (scoreList [i].GetUserName () + ": "+scoreList [i].GetValue ());
						//result += scoreList [i].GetUserName () + ": "+scoreList [i].GetValue ()+"\n";
						//Debug.Log ("CreatedOn is  : " + scoreList [i].GetCreatedOn ());
						//Debug.Log ("ScoreId is  : " + scoreList [i].GetScoreId ());
						//Debug.Log ("Value is  : " + scoreList [i].GetValue ());
					//}
				}
			} else {
				IList<Game> game = (IList<Game>)obj;
				result = game.ToString ();
				for (int j = 0; j < game.Count; j++) {
					Debug.Log ("GameName is   : " + game [j].GetName ());
					Debug.Log ("Description is  : " + game [j].GetDesription ());
				}
			}
			isSuccess = true;
			//Debug.Log (result);
			
		}
		
		public void OnException (Exception e)
		{
			result = e.ToString ();
			Debug.Log ("EXCEPTION : " + e);
			isSuccess = false;
			
		}
		
		public string getResult ()
		{
			return result;
		}

		public IList<Game.Score> getScoreList ()
		{
			return scoreList;
		}

		public Boolean getSuccessStatus ()
		{
			return isSuccess;
		}
		
	}


}


