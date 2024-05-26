import React, { useContext } from 'react'
import { assets } from '../pages/main/assets/assets'
import { Context } from '../config/context/context'
import styles from '../styles/Main.module.css'
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";

const Main = () => {
    const { onSent, recentprompt, showresult, loading, resultdata, setInput, input } = useContext(Context)
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSent();
        }
    };
    const [currentUser, setCurrentUser] = useRecoilState(userState);
    return (
        <div className={styles.main}>
            <div className={styles.main.container}>
                {!showresult ?
                    <><div className={styles.greet}>
                        <p><span></span></p>
                        <p><span>Hello,Dev!</span></p>
                        <p>How can i help you today?</p>
                    </div>
                    </> :
                    <div className={styles.result}>
                        <div className={styles.result.title}>
                            <img src={currentUser?.userImg} alt='user' />
                            <p>{recentprompt}</p>
                        </div>
                        <div className={styles.result.data}>
                            <img src={assets.gemini_icon} />
                            {loading ? <div className='loader'>
                                <hr />
                                <hr />
                                <hr />

                            </div> : <p dangerouslySetInnerHTML={{ __html: resultdata }}></p>}

                        </div>

                    </div>
                }

                <div className="main-bottom">
                    <div className="searchbox">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" onKeyDown={handleKeyPress} placeholder='Enter Prompt Here...' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Main