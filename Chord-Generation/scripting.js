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

function generateChord() {
    // get the root note and chord type from user input
    var rootNote = document.getElementById("rootNote").value;
    var chordType = document.getElementById("chordType").value;
    // define the notes of the chromatic scale
    var chromaticScale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
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
    var chord = [];
    for (var i = 0; i < intervals.length; i++) {
        chord.push(chromaticScale[(rootIndex + intervals[i]) % 12]);
    }

    replace();

    const { Factory, EasyScore, System } = Vex.Flow;

    const vf = new Factory({
    renderer: { elementId: 'musicStaff', width: 500, height: 200 },
    });

    const score = vf.EasyScore();
    const system = vf.System();

    system
    .addStave({
        voices: [
        score.voice(score.notes('(' + chord.join("4 ") + '4' + ')' + '/q, B4, A4, G#4', { stem: 'up' })),
        //score.voice(score.notes('C#4/h, C#4', { stem: 'down' })),
        ],
    })
    .addClef('treble')
    .addTimeSignature('4/4');

    vf.draw();
}