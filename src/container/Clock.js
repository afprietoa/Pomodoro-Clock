import React, { useEffect, useRef, useState } from 'react'

export const Clock = () => {
    const audioTag = useRef()
    const [intvlValid, setIntvlValid] = useState(null)
    const [breakTime, setBreakTime] = useState(5 * 60)
    const [sessionTime, setSessionTime] = useState(25 * 60)
    const [sessionPlaying, setSessionPlaying] = useState(25 * 60)
    const [breakPlaying, setBreakPlaying] = useState(false)

    useEffect(() => {
        setSessionPlaying(sessionTime)

    }, [sessionTime])

    useEffect(() => {
        if (sessionPlaying === 0) {
            audioTag.current.currentTime = 0;
            audioTag.current.play()
            if (!breakPlaying) {
                setBreakPlaying(true)
                setSessionPlaying(breakTime)
            } else if (breakPlaying) {
                setBreakPlaying(false)
                setSessionPlaying(sessionTime)
            }
        }
    }, [sessionPlaying, breakPlaying, breakTime, sessionTime])

    const timerControl = () => {
        if (intvlValid == null) {
            const interval = setInterval(() => {
                setSessionPlaying((prevTime) => prevTime - 1)
            }, 1000)
            setIntvlValid(interval)
        } else {
            clearInterval(intvlValid)
            setIntvlValid(null)
        }
    }

    const resetTime = () => {
        audioTag.current.pause()
        audioTag.current.currentTime = 0;
        clearInterval(intvlValid)
        setIntvlValid(null)
        setSessionPlaying(25 * 60)
        setBreakTime(5 * 60)
        setSessionTime(25 * 60)
        setBreakPlaying(false)
    }

    const incrSessionTime = () => {
        setSessionTime(sessionTime >= 60 * 60 ? sessionTime : sessionTime + 60)
    }
    const decrSessionTime = () => {
        setSessionTime(sessionTime <= 60 ? sessionTime : sessionTime - 60)
    }

    const convToMinsPlay = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return (
            (minutes < 10 ? '0' + minutes : minutes) +
            ':' +
            (seconds < 10 ? '0' + seconds : seconds)
        )
    }
    const convToMinsInterval = (time) => {
        return time / 60
    }
    const incrBreakTime = () => {
        setBreakTime(breakTime >= 60 * 60 ? breakTime : breakTime + 60)
    }
    const decrBreakTime = () => {
        setBreakTime(breakTime <= 60 ? breakTime : breakTime - 60)
    }
    return (
        <>
        <h1 className="border-bottom text-center">25 + 5 Clock</h1>
        <div className="container">
            

            <div className="row text-center w-100">

                <div className="col-6">

                    <h5 id='session-label' >Session Length</h5>
                    <div className="btn-group">

                        <button id='session-decrement' onClick={decrSessionTime} className="btn btn-secondary">
                            -
                        </button>
                        <div id='session-length' className="length form-control text-right">{convToMinsInterval(sessionTime)}</div>
                        <button id='session-increment' onClick={incrSessionTime} className="btn btn-secondary">
                            +
                        </button>
                    </div>

                </div>

                <div className='col-6'>

                    <h5 id='break-label' >Break Length</h5>
                    <div className="btn-group">

                        <button id='break-decrement' onClick={decrBreakTime} className="btn btn-secondary">
                            -
                        </button>
                        <div id='break-length' className="length form-control text-right">{convToMinsInterval(breakTime)}</div>
                        <button id='break-increment' onClick={incrBreakTime} className="btn btn-secondary">
                            +
                        </button>
                    </div>
                </div>
            </div>



            <div className="col-sm-8 ">
                <div className="border p-2">
                    <h1 id='timer-label' className="h4 text-center">{breakPlaying ? 'Break' : 'Session'}</h1>
                    <h2 id='time-left' className="display-3 text-center">{convToMinsPlay(sessionPlaying)}</h2>

                    <div className="text-center">
                        <button id='start_stop' onClick={timerControl} className="btn btn-success ml-2">
                            Start_Stop
                        </button>
                        <button id='reset' onClick={resetTime} className="btn btn-danger">
                            Reset
                        </button>
                    </div>
                </div>
            </div>


            <audio
                src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
                id='beep'
                ref={audioTag}
            ></audio>


        </div>
        </>
    )
}
