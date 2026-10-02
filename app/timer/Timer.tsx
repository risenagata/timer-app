'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export default function Timer(){
    const [totalSeconds,setTotalSeconds]=useState<number>(0)
    const [running,setRunning]=useState<boolean>(false)
    

    const hours=Math.floor(totalSeconds / 3600)
    const minutes=Math.floor((totalSeconds % 3600) /60)
    const seconds=totalSeconds % 60

    //マイナスボタン
    // 1時間マイナス
    const handleMinusHours=()=>{
        setTotalSeconds((prev)=>{
            if(prev < 3600){
                return 0
            }
            return prev - 3600
        })
    }
    // 1分マイナス
    const handleMinusMinutes=()=>{
        setTotalSeconds((prev)=>{
            const currentMinutes=Math.floor((prev % 3600) / 60)
            if(currentMinutes === 0){
                return prev + 59 * 60
            }
            return prev - 60
        })
    }
    // 1秒マイナス
    const handleMinusSeconds=()=>{
        setTotalSeconds((prev)=>{
            const currentSeconds=prev % 60
            if(currentSeconds === 0){
                return prev + 59
            }
            return prev - 1
        })
    }

    useEffect(()=>{
        if(!running)return
        if(totalSeconds === 0){
            setRunning(false)
            return
        }
        const startTimer=setInterval(()=>{
            setTotalSeconds((prev)=>{
                if(prev <= 1){
                    setRunning(false)
                    return 0
                }
                return prev -1
            })
        },1000)
        return ()=>clearInterval(startTimer)
    },[running])

    return(
        <>
           <div className={styles.container}>
                <div className={styles.button}>
                    <button className={styles.hours} onClick={()=>setTotalSeconds(totalSeconds + 3600)}>+</button>
                    <button className={styles.minutes} onClick={()=>setTotalSeconds(totalSeconds + 60)}>+</button>
                    <button className={styles.seconds} onClick={()=>setTotalSeconds(totalSeconds + 1)}>+</button>
                </div>
                <p className={styles.timer}>
                    {String(hours).padStart(2,'0')}:{String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}
                </p>
                <div className={styles.button}>
                    <button className={styles.hours} onClick={handleMinusHours}>-</button>
                    <button className={styles.minutes} onClick={handleMinusMinutes}>-</button>
                    <button className={styles.seconds} onClick={handleMinusSeconds}>-</button>
                </div>

            </div>
            <div className={styles.wrapper}>
                <button className={styles.timer_button} onClick={()=>setRunning(true)}>スタート</button>
                <button className={styles.timer_button} onClick={()=>setRunning(false)}>ストップ</button>
                <button className={styles.timer_button} onClick={()=>setTotalSeconds(0)}>リセット</button>
            </div>      
        </>
 
    )
}