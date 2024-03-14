let numOctaves = 4;
const octWidthPx = 560;
const whiteKeyWidthPx = 80;
const whiteKeyHeightPx = 400;
const blackKeyWidthPx = 40;
const blackKeyHeightPx = 260;
const initBlackKeyOffsetPx = 60;

const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
const displayedNotesRange = ["C3", "B6"];


const kbSVG = `<svg 
width="100%" 
viewBox="0 0 ${ numOctaves * octWidthPx} 400"
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"
>
    <g id="octGroupContainer">
    </g>
</svg>`;

const kbContainer = document.getElementById("keyboardContainer");

const app = {
    setupPiano() 
    {
        // Add main SVG to keyboard container div
        kbContainer.innerHTML = kbSVG;
        const octGroupContainer = document.getElementById("octGroupContainer");

        // Create octave groups
        for (let i = 0; i < numOctaves; i++) {
            const octave = this.createOctave(i);

            // Add white keys to oct group
            for (let j = 0; j < 7; j++)
            {
                const whiteKey = this.createKey({ className: "whiteKey", width: whiteKeyWidthPx, height: whiteKeyHeightPx });
                whiteKey.setAttribute("x", (j * whiteKeyWidthPx));
                
                octave.appendChild(whiteKey);
            }

            // Add black keys to oct group
            for (let j = 0; j < 6; j++)
            {
                const blackKey = this.createKey({ className: "blackKey", width: blackKeyWidthPx, height: blackKeyHeightPx });
                
                if (j === 0)
                {
                    blackKey.setAttribute("x", initBlackKeyOffsetPx);
                }
                else if (j === 2)
                {
                    continue;
                }
                else
                {
                    blackKey.setAttribute("x", (initBlackKeyOffsetPx + (j * whiteKeyWidthPx)));
                }

                octave.appendChild(blackKey);
            }

            octGroupContainer.appendChild(octave);
        }
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

        const allNaturalNotes = [];
        for (let octNum = firstOctNum; octNum <= lastOctNum; octNum++)
        {
            if (octNum === firstOctNum)
            {
                const firstOct = naturalNotes.slice(firstNotePos).map((noteName) => {
                    return noteName + octNum;
                });
                allNaturalNotes.push(firstOct);
            }
            else if (octNum === lastOctNum)
            {
                const lastOct = naturalNotes.slice(0, lastNotePos + 1).map((noteName) => {
                    return noteName + octNum;
                });
                allNaturalNotes.push(lastOct);
            }
            else
            {
                const middleOct = naturalNotes.map((noteName) => {
                    return noteName + octNum;
                });
                allNaturalNotes.push(middleOct);
            }
        }
        return allNaturalNotes;
    },


}

const utils = {
    createSVGElement(el)
    {
        const element = document.createElementNS("http://www.w3.org/2000/svg", el);
        return element;
    }
}

app.setupPiano();
app.getAllNaturalNoteNames(displayedNotesRange);



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