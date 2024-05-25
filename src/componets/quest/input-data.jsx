import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../../css/comm/index.css"
import styles from "../../css/quest/input-data.module.css"

const InputData = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [content, setContent] = useState('');
    const [inputValue, setInputValue] = useState('');

    const category = location.state ? location.state.category : null;
    const lastPathSegment = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

    useEffect(() => {
        if (lastPathSegment === "content") {
            switch (category) {
                case '가방': setContent('핸드백 사기'); break;
                case '옷': setContent('AA브랜드 옷 사기'); break;
                case '악세사리': setContent('목걸이 사기'); break;
                case '전자기기': setContent('노트북 사기'); break;
                case '집': setContent('원룸 얻기'); break;
                case '여행': setContent('미국 가기'); break;
                case '차': setContent('자가용 뽑기'); break;
                case '문화생활': setContent('콘서트 티켓 가기'); break;
                case '기타': setContent('기부하기'); break;
                default: setContent('목표 설정');
            }
        } 
        else if (lastPathSegment === "price") {
            setContent('500,000원');
        }
    }, [lastPathSegment]);

    useEffect(() => {
        const inputBox = document.querySelector(`.${styles['input-btn']}`);
        if (inputValue) {
            inputBox.style.backgroundColor = '#5EDCC4';
        }
    }, [inputValue]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleButtonClick = () => {
        if (inputValue) {
            if (lastPathSegment === "content") {
                navigate('/quest/input/price');
            } 
            else if (lastPathSegment === "price") {
                navigate('/quest');
            }
        } 
        else {
            alert(lastPathSegment === "content" ? '목표를 입력해주세요' : '가격을 입력해주세요');
        }
    };

    return (
        <div className={styles['input-container']}>
            <div className={styles['title']}>{props.title}</div>
            <div className={styles['input-box']}>
                <div className={styles['input-title']}>{props.inputTitle}</div>
                <input
                    type="text"
                    className={styles['input']}
                    placeholder={`${content}`}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles['input-btn']} onClick={handleButtonClick}>  {props.btn}</div>
        </div>
    )
}

export default InputData;