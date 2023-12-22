import {ReactNode} from "react";
import s from './header-post.module.scss'

type PostHeaderProps = {
    leftButton:{title:string | ReactNode,callback:()=>void}
    modalTitle:string
    rightButton:{title:string | ReactNode ,callback:()=>void}
}
export const PostHeader = (
    {
        leftButton,
        rightButton,
        modalTitle
    }:PostHeaderProps
)=>{

    const onLeftBtnHandler = ()=> leftButton.callback()
    const onRightBtnHandler = () => rightButton.callback()

    return (
        <>
            <button onClick={onLeftBtnHandler}>{leftButton.title}</button>
            <p className={s.modalTitle}>{modalTitle}</p>
            <button className={s.rightButton} onClick={onRightBtnHandler}>{rightButton.title}</button>
        </>
    )

}
