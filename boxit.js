function max (myArray) {   
    let maximum = 0;
    for (let i=0; i<myArray.length; i++) {
        if (myArray[i].length > maximum) {
            maximum = myArray[i].length;
        }
    }
    return maximum;
}

function whiteSpace(myNum, myChar) {    
    let buff = '';                      
    for (let i = 0; i<myNum; i++) {
        buff += myChar;
    }
    return buff;
}

function drawLine(num) {         
    return whiteSpace(num, '━'); 
}

function drawAnyLine(char1, char2, num) { 
    return char1 + drawLine(num) + char2;
}

function drawTopBorder(num) {            
    return drawAnyLine('┏', '┓', num);
}

function drawMiddleBorder(num) {
    return drawAnyLine('┣', '┫', num);
}

function drawBottomBorder(num) {
    return drawAnyLine('┗', '┛', num);
}

function drawBarsAround(myString) {
    return '┃' + myString + '┃';
}

function boxIt(myArray) {
    let maximum = max(myArray);            
    let buff = drawTopBorder(maximum) + '\n';
    for (let i = 0; i<myArray.length; i++) {  
        
        buff += drawBarsAround(myArray[i] + whiteSpace(maximum-myArray[i].length, ' ')) + '\n';
        if (i < myArray.length - 1) {
            buff += drawMiddleBorder(maximum) + '\n';
        }
    }
    buff += drawBottomBorder(maximum);
    return buff;
}

let myArray = [];       
for (let i=2; i<process.argv.length; i++) {
    myArray.push(process.argv[i]);
} 
console.log(boxIt(myArray));