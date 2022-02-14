function getHistory() {
    return document.getElementById("history-value").innerText;
}

function printHistory(history) {
    document.getElementById("history-value").innerText = history;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function printOutput(output) {
    if(output == '') {
        document.getElementById("output-value").innerText = output;
    } else {
        document.getElementById("output-value").innerText = getFormattedNumber(output);
    }
}

function getFormattedNumber(number) {
    if(number == '') {
        return "";
    }
    var num = Number(number);
    var value = num.toLocaleString("en");
    return value;
}

function getUnformattedNumber(formattedNumber) {
    return Number(formattedNumber.replace(/,/g,""))
}

function clearOutput() {

}

var operators = document.getElementsByClassName("operator");
for(var i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click',function(){
        if(this.id == 'clear') {
            printHistory("");
            printOutput("");
        }
        else if(this.id == 'backspace') {
            var output = getUnformattedNumber(getOutput()).toString();
            if (output) {
                output = output.substring(0, output.length-1);
                printOutput(output);
            }
        } else {
            var output = getOutput();
            var history = getHistory();
            if(output == '' && history!= ''){
                if(isNaN(history[history.length-1])){
                    history = history.substring(0, history.length-1)
                }
            }
            if(output != '' || history != '') {
                output = output==""?output:getUnformattedNumber(output);
                history = history + output;
                if(this.id == 'equals') {
                    var result = eval(history);
                    printOutput(result);
                    printHistory("");
                } else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

var numbers = document.getElementsByClassName("number");
for(var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click',function(){
        var output = getUnformattedNumber(getOutput());
        if(output != NaN) {
            output = output + document.getElementById(this.id).innerText;
            printOutput(output);
        }
    });
}