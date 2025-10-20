/**
 * Teenage Engineering OP1
 * Control Script for Bitwig Studio
 *
 * Version: 0.1
 * Author: @literallylara
 * Website: https://github.com/literallylara/bitwig-op1-controller
 */

var API     = 10
var NAME    = "OP1"
var VENDOR  = "Teenage Engineering"
var VERSION = 0.1
var UUID    = "93d9a4f6-693d-0000-e040-8c2b8b885d4a"
var AUTHOR  = "@literallylara"
var DEBUG   = false

loadAPI(API)

DEBUG && host.setShouldFailOnDeprecatedUse(true)
host.defineController(VENDOR, NAME, VERSION, UUID, AUTHOR)
host.defineMidiPorts(1, 0)

// objects
var _transport   = null
var _interface   = null
var _arranger    = null
var _input       = null
var _app         = null
var _arpeggiator = null

// states
var _shift    = false
var _playing  = false

// indices
var _arpeggiatorIndex = 0
var _octaveShift      = 0

var ARPEGGIATOR_MODES =
[
    "all",
    "up",
    "up-down",
    "up-then-down",
    "down",
    "down-up",
    "down-then-up",
    "flow",
    "random",
    "converge-up",
    "converge-down",
    "diverge-up",
    "diverge-down",
    "thumb-up",
    "thumb-down",
    "pinky-up",
    "pinky-down"
]

function init()
{
	_app       = host.createApplication() 
	_interface = host.getMidiInPort(0)
	_transport = host.createTransport()
	_arranger  = host.createArranger() 

	_interface.setMidiCallback(onMidi)

	_input = host.getMidiInPort(0).createNoteInput("OP1", "??????")
	_input.setShouldConsumeEvents(false)

	_arpeggiator = _input.arpeggiator()

	_transport.isPlaying().addValueObserver(function(v)
	{
		_playing = v
	})

	DEBUG && host.println("OP1 initialized")
}

function onMidi(status, data1, data2)
{
	var data = data1.toString() + " " + data2.toString()

	DEBUG && host.println(status.toString() + " " + data)

	switch(data)
	{
		// info/metronome/synth
		case  "5 0": _app.toggleInspector(); break
		case  "6 0": _transport.isMetronomeEnabled().toggle(); break
		case  "7 0": _app.toggleDevices(); break

		// drum/tape
		case  "8 0": _arranger.isClipLauncherVisible().toggle(); break
		case  "9 0": _arranger.isTimelineVisible().toggle(); break

		// 1/2/3/4/Mixer
		case "10 0": _app.toggleMixer(); break
		case "11 0": _app.toggleNoteEditor(); break
		case "12 0": _app.toggleAutomationEditor(); break
		case "13 0": _app.toggleDevices(); break
		case "14 0": _app.toggleMixer(); break

		// cut/paste
		case "15 0": _app.cut(); break
		case "16 0": _app.paste(); break

		// record/play/stop
		case "38 0": _transport.record(); break
		case "39 0": _transport.togglePlay(); break
		case "40 0": _transport.stop(); break

		// loop
		case "50 0": _transport.isPunchInEnabled().toggle(); break
		case "51 0": _transport.isPunchOutEnabled().toggle(); break
		case "52 0": _transport.isArrangerLoopEnabled().toggle(); break

		// shift
		case "43 0": _shift = false; break
		case "43 127": _shift = true; break

		// input
		case "48 0": _app.toggleBrowserVisibility(); break

		// arpeggiator
		case "26 0":
			if (_shift)
			{
				_arpeggiatorIndex += 1
				_arpeggiatorIndex %= ARPEGGIATOR_MODES.length

				var v = ARPEGGIATOR_MODES[_arpeggiatorIndex]

				_arpeggiator.mode().set(_arpeggiatorIndex)
			}
			else
			{
				_arpeggiator.isEnabled().toggle()
			}
			break

		// arrow left
		case "41 0":
			if (_shift)
			{
				_octaveShift = Math.max(_octaveShift-1,-3)
				setTranslationTable()
			}
			else
			{
				if (_playing)
				{
					_transport.rewind()
				}
				else
				{
					_transport.getPosition().inc(-1)
				}
			}
			break

		// arrow right
		case "42 0":
			if (_shift)
			{
				_octaveShift = Math.min(_octaveShift+1,+3)
				setTranslationTable()
			}
			else
			{
				if (_playing)
				{
					_transport.fastForward()
				}
				else
				{
					_transport.getPosition().inc(+1)
				}
			}
			break
	}
}

function setTranslationTable()
{
	var table = new Array(128)

	for (var i = 0; i < table.length; i++)
	{
		var v = i + _octaveShift * 12

		table[i] = Math.max(Math.min(v,127),0)
	}

	_input.setKeyTranslationTable(table)
}

function flush()
{
}

function exit()
{
}