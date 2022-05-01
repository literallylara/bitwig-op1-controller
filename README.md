Bitwig OP1 Controller Script (v0.1)
-----------------------------------

Special keys have been mapped to mimic the native behaviour on the OP1 as close as possible (see [Mapping](#mapping)).

**Note:**

- In order for the arrow keys to work you need to set the Midi channel to anything above 1 (shift + green knob).
- If the OP1 does not get recognized it may be necessary to unplug and it a few times while Bitwig Studio is running.

---

**Created by [@literallylara](https://twitter.com/literallylara)**

## Installation

Place `op1.control.js` into the following directory:

**Windows**  
> %USERPROFILE%\Documents\Bitwig Studio\Controller Scripts\teenage-engineering

**Mac**  
> ~/Documents/Bitwig Studio/Controller Scripts/teenage-engineering

**Linux**  
> ~/Bitwig Studio/Controller Scripts/teenage-engineering

## Mapping

### Panels
Key | Function
--- | --------
T1 | Toggle Detail Editor Panel
T2 | Toggle Automation Editor Panel
T3 | Toggle Device Panel
T4 | Toggle Mixer Panel
| | |
Help | Toggle Inspector Panel
Synthesizer | Toggle Device Panel
Mixer | Toggle Mixer Panel

### Arranger
Key | Function
--- | --------
Drum Mode | Toggle clip launcher
Tape Mode | Toggle timeline

### Transport
Key | Function
--- | --------
Record | Toggle transport record
Play | Toggle transport play
Stop | Stop transport
Metronome | Toggle metronome
| | |
Lift | Cut if applicable
Drop | Paste if applicable
| | |
Left | Move cursor 1 beat to the left
Right | Move cursor 1 beat to the right
| | |
Left (playing) | Fastforward
Right (playing) | Rewind
| | |
Shift + Left | Lower notes by an octave
Shift + Right | Raise notes by an octave
| | |
1 (in) | Toggle punch in
2 (out) | Toggle punch out
3 (loop) | Toggle arranger loop

### Miscellaneous

Key | Function
--- | --------
Mic/Input | Toggle browser
Arpeggiator | Toggle arpeggiator
Shift + Arpeggiator | Cycle arpeggiator modes
