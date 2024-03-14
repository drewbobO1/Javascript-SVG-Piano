const whiteKeyWidthPx = 80;
const whiteKeyHeightPx = 400;
const blackKeyWidthPx = 40;
const blackKeyHeightPx = 260;
const initBlackKeyOffsetPx = 60;

const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
const sharpNotes = ["C", "D", "F", "G", "A"];
const flatNotes = ["D", "E", "G", "A", "B"];

const displayedNotesRange = ["G3", "A7"];

const kbContainer = document.getElementById("keyboardContainer");

const app = {
    setupPiano() 
    {
        const allNaturalNotes = this.getAllNaturalNoteNames(displayedNotesRange);
        const fullKBWidth = allNaturalNotes.length * whiteKeyWidthPx;

        const kbSVG = this.createMainSVG(fullKBWidth, whiteKeyHeightPx);
        kbContainer.appendChild(kbSVG);

        // Add white keys
        for (let i = 0; i < allNaturalNotes.length; i++)
        {
            const whiteKey = this.createKey({ className: "whiteKey", width: whiteKeyWidthPx, height: whiteKeyHeightPx });
            whiteKey.setAttribute("x", i * whiteKeyWidthPx);
            whiteKey.setAttribute("dataNoteName", allNaturalNotes[i]);

            kbSVG.appendChild(whiteKey);
        }

        // Add black keys
        allNaturalNotes.forEach((naturalNote, index, array) => {
            const blackKey = this.createKey({ className: "blackKey", width: blackKeyWidthPx, height: blackKeyHeightPx });
            
        })
    },

    createOctave(octQty)
    {
        const octave = utils.createSVGElement("g");
        octave.classList.add("octave");
        octave.setAttribute("transform", `translate(${octQty * octWidthPx}, 0)`);
        return octave;
    },

    createKey({ className, width, height })
    {
        const key = utils.createSVGElement("rect");
        key.classList.add(className);
        key.setAttribute("width", width);
        key.setAttribute("height", height);
        return key;
    },

    getAllNaturalNoteNames([firstNote, lastNote])
    {
        // Assign octave number, notes, and positions to variables
        const firstNoteName = firstNote[0];
        const firstOctNum = parseInt(firstNote[1]);

        const lastNoteName = lastNote[0];
        const lastOctNum = parseInt(lastNote[1]);

        const firstNotePos = naturalNotes.indexOf(firstNoteName);
        const lastNotePos = naturalNotes.indexOf(lastNoteName);

        const allNaturalNotesInFunc = [];
        for (let octNum = firstOctNum; octNum <= lastOctNum; octNum++)
        {
            if (octNum === firstOctNum)
            {
                naturalNotes.slice(firstNotePos).forEach((noteName) => {
                    allNaturalNotesInFunc.push(noteName + octNum);
                });
            }
            else if (octNum === lastOctNum)
            {
               naturalNotes.slice(0, lastNotePos + 1).forEach((noteName) => {
                    allNaturalNotesInFunc.push(noteName + octNum);
                });
            }
            else
            {
                naturalNotes.forEach((noteName) => {
                    allNaturalNotesInFunc.push(noteName + octNum);
                });
            }
        }
        return allNaturalNotesInFunc;
    },

    createMainSVG(kbWidth, kbHeight)
    {
        const kbSVG = utils.createSVGElement("svg");
        kbSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        kbSVG.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
        kbSVG.setAttribute("width", "100%");
        kbSVG.setAttribute("viewBox", `0 0 ${kbWidth} ${kbHeight}`);

        return kbSVG;
    }


}

const utils = {
    createSVGElement(el)
    {
        const element = document.createElementNS("http://www.w3.org/2000/svg", el);
        return element;
    }
}

app.setupPiano();
console.log(app.getAllNaturalNoteNames(displayedNotesRange));



// const octKeysSVGList = 
//     `<rect class="pianoKey whiteKey" x="0" y="0" width="80" height="400"></rect>
//     <rect class="pianoKey whiteKey" x="80" y="0" width="80" height="400"></rect>
//     <rect class="pianoKey whiteKey" x="160" y="0" width="80" height="400"></rect>
//     <rect class="pianoKey whiteKey" x="240" y="0" width="80" height="400"></rect>
//     <rect class="pianoKey whiteKey" x="320" y="0" width="80" height="400"></rect>
//     <rect class="pianoKey whiteKey" x="400" y="0" width="80" height="400"></rect>
//     <rect class="pianoKey whiteKey" x="480" y="0" width="80" height="400"></rect>

//     <rect class="pianoKey blackKey" x="60" y="0" width="40" height="260"></rect>
//     <rect class="pianoKey blackKey" x="140" y="0" width="40" height="260"></rect>
//     <rect class="pianoKey blackKey" x="300" y="0" width="40" height="260"></rect>
//     <rect class="pianoKey blackKey" x="380" y="0" width="40" height="260"></rect>
//     <rect class="pianoKey blackKey" x="460" y="0" width="40" height="260"></rect>`;


// const kbContainer = document.getElementById("keyboardContainer");
// kbContainer.innerHTML = kbSVG;
// const octGroupContainer = document.getElementById("octGroupContainer");

// for (let i = 0; i < numOctaves; i++) {
//     const octave = document.createElementNS("http://www.w3.org/2000/svg", "g");
//     octave.classList.add("octave");
//     octave.setAttribute("transform", `translate(${i * octWidthPx}, 0)`);
//     octave.innerHTML = octKeysSVGList;
//     octGroupContainer.appendChild(octave);
// }