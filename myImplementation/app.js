const whiteKeyWidthPx = 80;
const whiteKeyHeightPx = 400;
const blackKeyWidthPx = whiteKeyWidthPx / 2;
const blackKeyHeightPx = 260;

const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
const sharpNotes = ["C", "D", "F", "G", "A"];
const flatNotes = ["D", "E", "G", "A", "B"];

const displayedNotesRange = ["B3", "B7"];

const kbContainer = document.getElementById("keyboardContainer");

const app = {
    setupPiano() 
    {
        const allNaturalNotes = this.getAllNaturalNoteNames(displayedNotesRange);
        const fullKBWidth = allNaturalNotes.length * whiteKeyWidthPx;

        const kbSVG = this.createMainSVG(fullKBWidth, whiteKeyHeightPx);

        let whiteKeyPosX = 0;
        
        // Add white keys
        allNaturalNotes.forEach((noteName) => {
            const whiteKeyGroup = utils.createSVGElement("g");
            const whiteKey = this.createKey({ className: "whiteKey", width: whiteKeyWidthPx, height: whiteKeyHeightPx });
            const text = utils.createSVGElement("text");

            utils.addTextContent(text, noteName);
            utils.setAttributes(whiteKeyGroup, {"width": whiteKeyWidthPx});
            utils.setAttributes(text, {
                "x": (whiteKeyPosX + (whiteKeyWidthPx / 2)),
                "y": 380,
                "text-anchor": "middle"
            });
            utils.setAttributes(whiteKey, {
                "x": whiteKeyPosX,
                "dataNoteName": noteName
            })

            text.classList.add("whiteKeyText");
            whiteKeyGroup.appendChild(whiteKey);
            whiteKeyGroup.appendChild(text);

            kbSVG.appendChild(whiteKeyGroup);

            whiteKeyPosX += whiteKeyWidthPx;
        });

        // Add black keys
        console.log("displayedNotesRange: ", displayedNotesRange[0][0])
        let blackKeyPosX = 60;
        if (displayedNotesRange[0][0] === "B")
        {
            blackKeyPosX = 140;
        }
        
        allNaturalNotes.forEach((eachNaturalNote, index, array) => {
            if (index === array.length - 1)
            {
                return;
            }

            const blackKeyGroup = utils.createSVGElement("g");
            const blackKey = this.createKey({ className: "blackKey", width: blackKeyWidthPx, height: blackKeyHeightPx });
            const flatNameText = utils.createSVGElement("text");
            const sharpNameText = utils.createSVGElement("text");

            utils.setAttributes(blackKeyGroup, { width: blackKeyWidthPx });


            for (let i = 0; i < sharpNotes.length; i++)
            {
                let sharpNoteName = sharpNotes[i];
                let flatNoteName = flatNotes[i];

                if (sharpNoteName === eachNaturalNote[0])
                {

                    utils.setAttributes(blackKey, {
                        "x": blackKeyPosX,
                        "dataSharpName": `${sharpNoteName}♯${eachNaturalNote[1]}`,
                        "dataFlatName": `${flatNoteName}♭${eachNaturalNote[1]}`
                    });

                    utils.setAttributes(sharpNameText, {
                        "text-anchor": "middle",
                        "x": blackKeyPosX + (blackKeyWidthPx / 2),
                        "y": 215
                    })

                    utils.setAttributes(flatNameText, {
                        "text-anchor": "middle",
                        "x": blackKeyPosX + (blackKeyWidthPx / 2),
                        "y": 240
                    })

                    utils.addTextContent(sharpNameText, `${sharpNoteName}♯${eachNaturalNote[1]}`);
                    utils.addTextContent(flatNameText, `${flatNoteName}♭${eachNaturalNote[1]}`);

                    flatNameText.classList.add("blackKeyText");
                    sharpNameText.classList.add("blackKeyText");

                    // Add double spacing between D# and A#
                    if (sharpNoteName === "D" || sharpNoteName === "A")
                    {
                        blackKeyPosX += (whiteKeyWidthPx * 2);
                    }
                    else
                    {
                        blackKeyPosX += whiteKeyWidthPx;
                    }

                    blackKeyGroup.appendChild(blackKey);
                    blackKeyGroup.appendChild(flatNameText);
                    blackKeyGroup.appendChild(sharpNameText);
                }
            }
            kbSVG.appendChild(blackKeyGroup);
        });

        // Add main SVG to container in HTML
        kbContainer.appendChild(kbSVG);
    },

    // createOctave(octQty)
    // {
    //     const octave = utils.createSVGElement("g");
    //     octave.classList.add("octave");
    //     octave.setAttribute("transform", `translate(${octQty * octWidthPx}, 0)`);
    //     return octave;
    // },

    createKey({ className, width, height })
    {
        const key = utils.createSVGElement("rect");
        key.classList.add(className);
        utils.setAttributes(key, {
            "width": width,
            "height": height
        })
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
        utils.setAttributes(kbSVG, {
            "width": "100%",
            "xmlns": "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            "width": "100%",
            "viewBox": `0 0 ${kbWidth} ${kbHeight}`
        });

        return kbSVG;
    }
}

const utils = {
    createSVGElement(el)
    {
        const element = document.createElementNS("http://www.w3.org/2000/svg", el);
        return element;
    },

    setAttributes(el, attrs)
    {
        for (let key in attrs)
        {
            el.setAttribute(key, attrs[key]);
        }
    },

    addTextContent(el, content)
    {
        el.textContent = content;
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