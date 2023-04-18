function hideAndShowElements(){
    var x = document.getElementById("hidden");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function replace(){
    const para = document.createElement("div");
    para.setAttribute("id", "musicStaff");
    const element = document.getElementById("forDeleting");
    element.appendChild(para);
    document.getElementById("musicStaff").remove();
    element.appendChild(para);
}


function chordBuilder(isFirstCall){
    
    var chordType;
    var chord = [];
    // define the notes of the chromatic scale
    var chromaticScale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    var chordTypes = [
        "Major",
        "Minor",
        "Augmented",
        "Diminished",
        "Major 7th",
        "Minor 7th",
        "Dominant 7th",
        "Diminished 7th",
        "Augmented 7th"
    ];

    if(isFirstCall === true)    
        chord = [];

 // get the root note and chord type from user input
 var rootNote; 
 rootNote = document.getElementById("rootNote").value;
 
 if(isFirstCall === true)
    chordType = document.getElementById("chordType").value;
 else{
    rootNote = chromaticScale[Math.floor(Math.random() * 12)]
    chordType = chordTypes[Math.floor(Math.random() * 9)];
}
// find the index of the root note in the chromatic scale
 var rootIndex = chromaticScale.indexOf(rootNote);
 // define the intervals for each chord type
 var chordIntervals = {
     "Major": [0, 4, 7],
     "Minor": [0, 3, 7],
     "Augmented": [0, 4, 8],
     "Diminished": [0, 3, 6],
     "Major 7th": [0, 4, 7, 11],
     "Minor 7th": [0, 3, 7, 10],
     "Dominant 7th": [0, 4, 7, 10],
     "Diminished 7th": [0, 3, 6, 9],
     "Augmented 7th": [0, 4, 8, 10]
 };
 // find the intervals for the selected chord type
 var intervals = chordIntervals[chordType];
 // generate the notes for the chord
 for (var i = 0; i < intervals.length; i++) {
     chord.push(chromaticScale[(rootIndex + intervals[i]) % 12]);
 }
 //creates string used in VexFlow
 var chordString = '(' + chord.join("4 ") + '4' + ')';
 return chordString;
}

function generateChord() {
    
    var chord1 = chordBuilder(true);
    var chord2 = chordBuilder(false);
    var chord3 = chordBuilder(false);
    var chord4 = chordBuilder(false);

    var chordString = chord1 + '/q, ' + chord2 + ", " 
    + chord3 + ", " + chord4;

    const { Factory, EasyScore, System } = Vex.Flow;
    const vf = new Factory({
    renderer: { elementId: 'musicStaff', width: 500, height: 200 },
    });
    const score = vf.EasyScore();
    const system = vf.System();

    system
    .addStave({
        voices: [
        score.voice(score.notes(
        chordString, { stem: 'up' })),
        ],
    })
    .addClef('treble')
    .addTimeSignature('4/4');

    vf.draw();
}