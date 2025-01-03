import ReactDOM from "react-dom";
import styled from "styled-components";

const Modal = ({content, closeModal, onDelete}) => {
    
    const handleModal =  () => {
        onDelete();
        closeModal();
    }

    return ReactDOM.createPortal(
        <ModalContainer>
           <ModalContent>
                <Content>{content}</Content>
                <ButtonWrapper>
                    <Button onClick={closeModal}>취소</Button>
                    <Button style={{color: "#b13b3b"}} onClick={handleModal}>확인</Button>
                </ButtonWrapper>
           </ModalContent>
        </ModalContainer>
    , document.getElementById("modal"));
};

export default Modal;

const ModalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0,0.3);
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 270px;
    height: 230px;
    text-align: center;
    border: 2px solid #938585;
    border-radius: 10px;
    background-color: #FFFFFF;;
    box-shadow: 3px 3px 15px rgb(0,0,0,0.3);
    animation: scale-up-center 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    @keyframes scale-up-center {
     0% {
        transform: scale(0.5);
     }
     100% {
        transform: scale(1);
     }
    }
`;

const Content = styled.p`
    position: relative;
    top: 4.5rem;
    font-size: 20px;
    font-weight: 700;
`;

const ButtonWrapper = styled.div`
    position: relative;
    bottom: 2.5rem;
    display: flex;
    justify-content: space-around;
`

const Button = styled.button`
    width: 100px;
    height: 35px;
    background: none;
    border: 2px dashed #a7a5a5;
    border-radius: 20px;
    font-family: inherit;
    font-size: 17.5px;
    font-weight: 600;
`;

