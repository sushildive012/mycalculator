//Modular Program For CALCULATOR

// Accessing DOM Elements
const display = document.querySelector(".display");
const btnPanel = document.querySelector(".btn-panel");



// For animating continously instructions for keyboard
const keyboardInstruction = document.querySelector(".keyboard-alternatives");

// Automatically toggles opacity every 2 secs
setInterval(() =>{
    // 1. Check if the screen is wider than a tablet (desktop view)
    const isDesktop = window.innerWidth > 768;


    //2. Only animate if its desktop and user not hovering
    if(isDesktop && !keyboardInstruction.matches(':hover')){
        keyboardInstruction.classList.toggle("fade-out");
    }
}, 1500)



//--------4 MAIN Variables------------
// EVERYTHING WRAPS AROUND THESE VARIABLES
let runningTotal = 0; //Holds actual math answer, after each operation
let currentNumber = ""; //Holds the digits typing right now/OR say Current operand, 
let currentExpression = "";
let activeOperator = null; //holds waiting operator symbol(+,-,/,*) to be calculated

// NOTE:
// 1. runningTotal---> mostly holds operand-1 and again calculated answer into itself
//2. currentNumber---> mostly holds operand-2
//3. currentExpression----> used for showing content on screen, appending to string or making it to base value 




// ------------Calculate MATH Engine------------
function calculate(a ,oper, b){
        n1 = parseFloat(a) //as values can be float
        n2 = parseFloat(b) //as values can be float
    switch(oper){
        case "+": return n1 + n2;
        case "-": return n1 - n2;
        case "*": return n1 * n2;
        case "/": return n1 / n2;
  
    }
}


// ------------RESET ALL, used in case of "AC"------------
function resetAll(){
    runningTotal = 0;
    currentNumber = "";
    activeOperator = null;
    currentExpression = "";
    display.textContent = "0";
}
// Reset on load
resetAll();


//------------Handle DELETE Button Operation------------
function handleDeleteButton(){

    if(runningTotal !== "0" || currentNumber !==""){
    
        //delete number from memory, initially as currentNumber
        currentNumber = currentNumber.slice(0,-1);
    
        // Update Running Total in memory also when we have some calculations already done
        if(runningTotal>0 && activeOperator==null){ //if there is no active operator in string at last
    
            // get deleted running total as string
            let slicedResult = runningTotal.toString().slice(0, -1);
    
            // If empty then make it 0
            if (slicedResult === "") {
                runningTotal = 0;
            } else {
                // else keep whatever left after sliced(deleted) and parse string
                runningTotal = parseFloat(slicedResult); // Keep it as a real number!
            }
        }
    
    
    }
    // Chop the last character off the string
    currentExpression = currentExpression.slice(0, -1); //delete from display
    
    // if expression becomes empty completely at last digit deletion, it shows "0"
    if(currentExpression === ""){
        display.textContent = "0";
        return;
    }
    
    display.textContent = currentExpression;
    return; //Avoids appending "delete" in expression, in below if(operator) block
}


//------------HANDLE OPERAND function------------
function handleOperand(btn){


    // Needed as a local scope, cant just access eventListener's local variables
    const clickedValue = btn.value;

    // START FRESH after '='
    // When equal to key pressed"="(runningTotal is not 0 )so always start fresh
    if(activeOperator === null && runningTotal!== 0){
        resetAll();
    }

    // Handle decimals( if repeated)
    if(currentNumber.includes(".") && clickedValue == ".") return;

    // 1. FIX POSITION: Check for leading zero BEFORE appending
    if(currentNumber === "0"){
        if(clickedValue === "0" || clickedValue === "00") 
            return; // Stops 000
        
        if(clickedValue !== "."){
            // If it's a number like 5, strip the single old '0' from both memory and screen strings
            currentNumber = "";
            currentExpression = currentExpression.slice(0, -1);
        }
    }

    // 2. Now append values safely
    currentNumber += clickedValue;
    currentExpression += clickedValue;   
    display.textContent = currentExpression;
    return;

}


//------------Handle " % " PERCENTAGE operator function------------
function handlePercentage(){
    
    // SEPERATELY HANDLED %
    if (currentNumber !== "") {
        // Divide the current number by 100 and save it back as a string
        // currentNumber = (parseFloat(currentNumber) / 100).toString();
        
        // Rebuild the expression so the screen displays the percentage result
        if (activeOperator !== null) {
            // seewwhat it prints
            if(activeOperator === "/"){
                
                runningTotal = (runningTotal/parseFloat(currentNumber))*100;
                // console.log("this ran Sushil after that");
                // console.log(`Running total ${runningTotal}`);
                // console.log(`Active operator ${activeOperator}`);
                // console.log(`Current Number ${currentNumber}`);
            }
            else if(["*", "-", "+"].includes(activeOperator)){
                
                let partialAns = (runningTotal*parseFloat(currentNumber))/100;
    
                switch(activeOperator){
                    case "+": runningTotal = runningTotal+partialAns;//Adds b% of 'a' into 'a' and puts into 'a', displays final answer(runningTotal)
                                break;
                    case "-": runningTotal = runningTotal-partialAns; //Subtracts b% of 'a' from 'a' and puts into 'a', displays final answer(runningTotal)
                                break;
                    case "*": runningTotal = runningTotal*partialAns; //Multiplies b% of a and puts into a, displays final answer(runningTotal
                                break;
                }
    
            }
            
        } 
        // NO ACTIVE OPERATOR
        else {  //If no previous operator active
    
                runningTotal += parseFloat(currentNumber);
                runningTotal = parseFloat(runningTotal/100);
            
        }
        currentNumber = runningTotal.toString();
        activeOperator = null;
        currentExpression = runningTotal.toString();
        display.textContent = currentExpression;
    }
    return; // Exit right away so it doesn't run regular operator logic!
}


//------------HANDLE OPERATOR function------------
function handleOperator(btn){
    
    // Necessary as its a local scope here
    const clickedValue = btn.value;

    
    // SIMPLE PERCENTAGE LOGIC handled seperately
    if (clickedValue === "percent") {
        handlePercentage(); //defined just above this, even if functions in JS are hoisted
        return;
    }

    // Process typed inputs before storing the new operator symbol
    if(currentNumber!== ""){
        
        
        // first time operator clicked
        if(activeOperator === null){
            
            runningTotal = parseFloat(currentNumber);
            
        }
        else{ //second time operator clicked

            runningTotal = calculate(runningTotal, activeOperator, currentNumber);
            
        }
        currentNumber = "";
        
        
        
    }
    
    // IF EQUAL TO OPERATOR " = " 
    //NO NEED TO HANDLE IN DIFFERENT FUNCTION
    if(clickedValue === "="){
        
        activeOperator = null;
        currentExpression = runningTotal.toString();
        
    }
    else{
        activeOperator = clickedValue;
        
        // just to display X on display not *
        if(activeOperator === "*"){
            
            currentExpression = runningTotal.toString() + "x";
        }
        // just to display ÷ on display not '/'
        else if(activeOperator === "/"){

            currentExpression = runningTotal.toString() + "\u00f7";
        }
        else{
            currentExpression = runningTotal.toString() + activeOperator;
        }


    }
    
    // Display Expression on SCREEN
    display.textContent = currentExpression;


}


// MAIN------------- INPUT HANDLER FUNCTION --------------
function handleInput(btn){
    
    const clickedValue = btn.value;

    // IF AC, CLEAR ALL
    if(clickedValue === "AC"){
        resetAll(); 
        return; //Avoids appending "AC" in expression, in below if(operator) block
        
    }
    // DELETE
    if( clickedValue === "delete"){

        handleDeleteButton();
        return;// see if really needed
    }
    // OPERAND
    if( btn.classList.contains("operand")){
        handleOperand(btn);
        return;
    }
    // OPERATOR
    if(btn.classList.contains("operator")){

        handleOperator(btn);
        return;
    }


    // NOTE: as we used 'return' statement in every block here, no need of if-else type block.....just 'if' is enough


}


// SINGLE BUTTON EVENT LISTENER on Parent of buttons( Event Delegation)
btnPanel.addEventListener('click', (e) =>{
    
    // GET WHICH BUTTON CLICKED
    const btn = e.target;
    
    // If clicked on gap it should not work only allowed on button
    // Safety: Ignores clicks on gap
    if(!btn.classList.contains("btn")) return;
    
    // Button Press Effect
    btn.classList.add("btnClickedEffect");
    setTimeout(()=>{
        btn.classList.remove("btnClickedEffect");
        
    },50)
    
    // MAIN function called for particular button
    handleInput(btn);
    
    
    // Call this every time a user presses a number or operator
    display.scrollLeft = display.scrollWidth;
    
    
});


// TO SCROLLL HORIZONTALLY BY MOUSE WHEEL
display.addEventListener('wheel', (event) => {
    // Stops the main web page from scrolling up/down
    event.preventDefault(); 
    
    // Converted: Moving mouse wheel UP/DOWN now moves display LEFT/RIGHT
    display.scrollLeft += event.deltaY; 
});



// For direct keyboard
// SINGLE KEYBOARD EVENT LISTENER (Added feature - leaves existing code untouched)
window.addEventListener('keydown', (e) => {
    let key = e.key;

    // 1. Map standard keyboard keys to your HTML button values
    if (key === "Enter") key = "=";
    if (key === "Escape") key = "AC";
    if (key === "Backspace") key = "delete";
    if (key === "%") key = "percent";
    if (key === "x" || key === "X") key = "*"; // Support typing 'x' for multiplication

    // 2. Query the button panel to find the button that has this exact value attribute
    const matchingBtn = btnPanel.querySelector(`button[value="${key}"]`);

    // 3. If a matching button exists, route it straight into your main engine!
    if (matchingBtn) {
        // Prevent default browser actions (like page scrolling when pressing space or arrow keys)
        e.preventDefault(); 
        
        // Trigger your click visual effect if you want, then process the inputs
        handleInput(matchingBtn);

        // EXTRA: Also shows active-click effect on buttons when keyboard used
        matchingBtn.classList.add("btnClickedEffect");
        setTimeout(() => {
            matchingBtn.classList.remove("btnClickedEffect");
        }, 80);
    }
});









