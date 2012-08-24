/// <summary>Gets the largest lengths of the parts of a number string before and after the decimal point.</summary>
/// <param name="numberStrings" type="Object">jQuery selected elements containing numbers.</param>
/// <returns type="Number[]" />
function getLargestLengths(numberStrings) {
    var re = /,/;
    var largestPreDec = 0;
    var largestPostDec = 0;

    var numString;
    var parts;
    for (var i = 0, l = numberStrings.length; i < l; i++) {
        numString = numberStrings[i].text();
        parts = numberStrings.split(re);
        if (parts[0].length > largestPreDec) { largestPreDec = parts[0].length; }
        if (parts[1].length > largestPostDec) { largestPostDec = parts[1].length; }
    }

    return [largestPreDec, largestPostDec];
}

/// <summary>Pads all strings with additional zeros after the decimal point so that decimal points will line up when right aligned.</summary>
/// <param name="jQueryColumnSelector" type="Object">A jQuery selection set.</param>
function formatNumbers(jQueryColumnSelector) {
    var lengths = getLargestLengths(jQueryColumnSelector);
    var largestPostDecLen = lengths[1];
    jQueryColumnSelector.each(function (index, element) {
        var currentText = element.text();
        for (var i = currentText.length, l = largestPostDecLen; i < l; i++) {

        }

    });
}