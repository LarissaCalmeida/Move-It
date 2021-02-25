import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {

    const { startNewChallenge } = useContext(ChallengesContext);


    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setisActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setisActive(true);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            },1000)
        } else if (isActive && time == 0) {
            setHasFinished(true);
            setisActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setisActive(false);
        setTime(0.1 * 60); 
    }

    return(
        <div>
            <div className = {styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button 
                    disabled
                    className = {styles.countdownButton}
                >
                    Ciclo Encerrado
                    <img src="icons/completed.svg" alt="" className={styles.imgButtonCompleted}/>          
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button 
                            type="button" 
                            className = {`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}
                        >
                            Abandonar ciclo
                            <img src="icons/close.svg" alt=""/>          
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className = {styles.countdownButton}
                            onClick={startCountdown}
                        >
                            Iniciar um ciclo
                            <img src="icons/play-arrow.svg" alt=""/>          
                        </button>
                    )}
                </>
            )}
           
        </div>
    );
}