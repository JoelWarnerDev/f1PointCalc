
const rPositionPoints = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
const qPositionPoints = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];


function driverPoints() {
    let runningTotal = 0

    //--------------------for loop begin-----------------//
    for (i = 1; i < 6; i++){
        let predictions = document.getElementById("predictionsForm" + i);
        let qualifyPos = predictions.qualifyPos.value;
        let teammateQuali = predictions.teammateQuali.checked;
        let finishPos = predictions.finishPos.value;
        let teammatePos = predictions.teammateRace.checked;


        //document.getElementById("points").innerHTML = teammatePos; //for testing


    // ---------------------------- QUALIFYING--------------------------------------
        switch(true) {  //round of qualifying reached
            case (qualifyPos == 22): //DQQ
                qualifyPos = 20 //almost certainly
                runningTotal -= 10;
                break;
            case (qualifyPos == 21): //DNQ
                qualifyPos = 20 //most likely
                runningTotal -= 5;
                break;
            case (qualifyPos <= 10):
                runningTotal += 3;
                break;
            case (qualifyPos <=15):
                runningTotal += 2;
                break;
            default: 1
        }
        
        if (teammateQuali == true){ //outqualified teammate
            runningTotal +=2;
        }

        if (qualifyPos < 11){ //points for top 10 qualifying position
            runningTotal += qPositionPoints[(qualifyPos - 1)]
        }

    //---------------------------------RACE-------------------------------------

        if ((finishPos !== 22) && (finishPos !== 21)){  //finish race?
            runningTotal += 1;
        }

        if (teammatePos == true){ //beat teammate
            runningTotal += 3;
        }

        if (finishPos == 21){ //DNF exits function before calculating gains
            runningTotal -= 15;
            document.getElementById("points").innerHTML = runningTotal;
            return;
            //return runningTotal;
        }

        if (finishPos == 22){ //DQR exits function before calculating gains
            runningTotal -= 20;
            document.getElementById("points").innerHTML = runningTotal;
            return;
            //return runningTotal;
        }

    //-----positions gained points calculation---------
        let gains = (qualifyPos - finishPos)
            
        if (gains > 5){ //max gains 5
            gains = 5;
        }
        if (gains < -5){ //min gains -5
            gains = -5;
        }

        if (qualifyPos > 10 && gains < 0){ //determine multiplier for gains points (only 1 when quali outside top 10)
            gains = gains;
        }
        else{
            gains *= 2;
        }
    //----------------------------------------

        runningTotal += gains

        if (finishPos < 11){
            runningTotal += (rPositionPoints[(finishPos - 1)]); //add points for finishing posiion
        }
    }   //end of for loop
//------------------------------------------END OF FOR LOOP---------//
     console.log(runningTotal)
    document.getElementById("points").innerHTML = runningTotal + " points";

    //return runningTotal
}

console.log(driverPoints())

/* 

BUGS:
- position increase bonus incorrect when user DQQ or DNF in quali.  tempoary fix of setting qualifyPos to 20 should work for now.  adding a boolean value for disqualifications and DNFs should permanent fix
- position increase bonus inorrect when more than 1 DNF from quali (rare)

var finishingPos
var teammatePos
var qualifyingPos
var teammateQuali
var finishBoolean
var qualifyBooolean

    if (qualifyPos > 0 && qualifyPos < 21){
        runningTotal +=1;
    }
    if (qualifyPos > 0 && qualifyPos < 16){
        runningTotal +=1;
    }
    if (qualifyPos > 0 && qualifyPos < 11){
        runningTotal +=1;
    }
    
*/