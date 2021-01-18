(function() {
    "use strict";

    // Shortcut to get elements
    var el = function(element) {
        if (element.charAt(0) === "#") { // If passed an ID...
            return document.querySelector(element); // ... returns single element
        }

        return document.querySelectorAll(element); // Otherwise, returns a nodelist
    };

    var viewer = el("#viewer"),
        equals = el("#equals"),
        nums = el(".num"),
        ops = el(".ops"),
        theNum = "",
        oldNum = "",
        resultNum,
        operator;

    // Als een nummer geklikt is. Haal huidige geselecteerde nummer op
    var setNum = function() {
        if (resultNum) { //Als een nummer gedisplayed wordt, reset het nummer
            theNum = this.getAttribute("data-num");
            resultNum = "";
        } else { //Anders voeg nummer toe aan vorig nummer (een string!)
            theNum += this.getAttribute("data-num");
        }

        viewer.innerHTML = theNum; // Laat huidig nummer zien

    };

    // When: Operator is clicked. Pass number to oldNum and save operator
    var moveNum = function() {
        oldNum = theNum;
        theNum = "";
        operator = this.getAttribute("data-ops");

        equals.setAttribute("data-result", ""); // Reset result in attr
    };

    // When: Equals is clicked. Calculate result
    var displayNum = function() {

        // Convert string input to numbers
        oldNum = parseFloat(oldNum);
        theNum = parseFloat(theNum);

        // Perform operation
        switch (operator) {
            case "plus":
                resultNum = oldNum + theNum;
                break;

            case "minus":
                resultNum = oldNum - theNum;
                break;

            case "times":
                resultNum = oldNum * theNum;
                break;

            case "divided by":
                resultNum = oldNum / theNum;
                break;

                // If equal is pressed without an operator, keep number and continue
            default:
                resultNum = theNum;
        }

        // Als NaN of infinity returned
        if (!isFinite(resultNum)) {
            if (isNaN(resultNum)) { // Als het resultaat geen nummer is, word dit weergegeven als er bijvoorbeeld dubbel op een operator geklikt wordt.
                resultNum = "You broke it!";
            } else { // Als het resultaat oneindig is. Wordt dit weergegeven als een getal door nul wordt gedeeld.
                resultNum = "Don't do that!";
                el('#calculator').classList.add("broken"); // Laat de calculator stuk gaan
                el('#reset').classList.add("show"); // Laat reset knop zien
            }
        }

        // Display result, finally!
        viewer.innerHTML = resultNum;
        equals.setAttribute("data-result", resultNum);

        // Now reset oldNum & keep result
        oldNum = 0;
        theNum = resultNum;

    };

    // Als de clear operator wordt geklikt, dan clear calculator.
    var clearAll = function() {
        oldNum = "";
        theNum = "";
        viewer.innerHTML = "0";
        equals.setAttribute("data-result", resultNum);
    };

    /* The click events */

    // Add click event to numbers
    for (var i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = setNum;
    }

    // Add click event to operators
    for (var i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = moveNum;
    }

    // Add click event to equal sign
    equals.onclick = displayNum;

    // Add click event to clear button
    el("#clear").onclick = clearAll;

    // Add click event to reset button
    el("#reset").onclick = function() {
        window.location = window.location;
    };

}());