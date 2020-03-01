import React, {useEffect, useState} from 'react';
import s from './Modals.module.css'

const Modal = (props: any) => {
    const {title, isOpen, onSubmit, children} = props;
    return (
        <>
            {isOpen &&
            <div className={s.modalOverlay}>
                <div className={s.modalWindow}>
                    <div className="modalHeader">
                        <p className="modalHeader">{title}</p>
                        {children}
                    </div>
                </div>
            </div>
            }
        </>
    )
}

const Modals = () => {
    console.log('render');
    const [modal, setModal] = useState(false);
    //const [titleModal, setTitleModal] = useState('');
    const [text, setText] = useState('');
    const [children, setChildren] = useState<any>(null);
    const [visibly, setVisibly] = useState(false);

    const onCancel = (e : any) => {
        setModal(false);
    };

    const onYes = (e : any) => {
        setModal(false);
        setText('Yas');
    };


    const onShowModal1 = (e : React.MouseEvent<HTMLButtonElement>) => {
        let a = e.currentTarget.getAttribute('data-modal');
        setChildren(<button onClick={onCancel}>Close!</button>);
        setModal(true);
    };

    const handelScroll=(e  : any)=>{
        let positionY = e.currentTarget.pageYOffset;

          if (positionY > 100){
              setVisibly(true);
              console.log('state')
          } else {
              setVisibly(false);
          }

    };
    const scrollTop=()=>{
        window.scrollTo(0,0);
    };

    useEffect(()=>{
        window.addEventListener('scroll', handelScroll);
        return ()=>{
            window.removeEventListener('scroll',handelScroll)
        }
    },[]);


    return (
        <div className={s.modalPage}>
            <div>
                <button onClick={onShowModal1} data-modal={'simple-modal'}>show simple Modal</button>
            </div>
            <div>
                <button onClick={() => setModal(true)}>show question Modal</button>
                {text && <span>{text}</span>}
            </div>

            <div className={s.up} >
               { visibly && <button onClick={scrollTop}>Up</button>}
            </div>

            <Modal isOpen={modal} title={'Show simple Modal'}>
                {children}
            </Modal>

            {/*<Modal isOpen={modal} title={'question Modal'}>*/}
            {/*    <button onClick={onYes}>Yes</button>*/}
            {/*    <button onClick={onCancel}>Now</button>*/}
            {/*</Modal>*/}

            {/*<div style={{height: '400px', backgroundColor: 'red'}}>1</div>*/}
            {/*<div style={{height: '400px', backgroundColor: 'green'}}>2</div>*/}
            {/*<div style={{height: '400px', backgroundColor: 'blue'}}>3</div>*/}
            {/*<div style={{height: '400px', backgroundColor: 'gold'}}>4</div>*/}
        </div>
    )
};
export default Modals;