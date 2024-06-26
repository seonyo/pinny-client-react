import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../../css/comm/index.css"
import styles from "../../css/quest/quest-select-btn.module.css";
import { type } from "@testing-library/user-event/dist/type";

const QuestSelectBtn = () => {
    const items = [
        { type: '가방', img: 'bag-icon.svg', },
        { type: '옷', img: 'clothes-icon.svg', },
        { type: '악세사리', img: 'ring-icon.svg', },
        { type: '전자기기', img: 'laptop-icon.svg', },
        { type: '여행', img: 'airplane-icon.svg', },
        { type: '집', img: 'house-icon.svg', },
        { type: '차', img: 'car-icon.svg', },
        { type: '문화생활', img: 'ticket-icon.svg', },
        { type: '기타', img: 'etc-icon.svg', }
    ];

    const [select, setSelect] = useState('');
    const [path, setPath] = useState("input");

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(location.pathname.endsWith("/update/select"))
            setPath("/quest/update/price");
    })

    const handleClick = (type) => {
        setSelect(type);
    };
    const handleNextBtn = () => {
        if (select !== '') {
            localStorage.setItem("unit", select);
            console.log(path)
            if(path === "input"){
                navigate('/quest/input/content', {state : {category:select}});
            }
            else{
                navigate('/quest/update/content', {state : {category:select}});
            }
        }
    }

    return (
        <>
            <div className = {styles['container']}>
                {items.map((item, index) => (
                    <div>
                        <div
                            key={index}
                            onClick={() => handleClick(item.type)}
                            className={`${select === item.type ? styles['selected-box'] : styles['box']}`}
                        >
                            <img src={`${process.env.PUBLIC_URL}/img/quest/${item.img}`} className="quest-btn-icon" />
                        </div>
                        <div className={styles['text']}>{item.type}</div>
                    </div>

                ))}

            </div>
            <div className={`${select !== '' ? styles['done'] : styles['next']}`} onClick={() => handleNextBtn()}>다음</div>
        </>

    )
}

export default QuestSelectBtn;