import ReactDOM from "react-dom";
import styled, { css } from "styled-components";

const Modal = ({
        content, 
        subContent, 
        closeModal, 
        onConfirm,
        children,
        modalType="default" 
    }) => {

    const type = {
        default: {
            modalStyle: css`
                width: 280px;
                height: 230px;
            `
        },
        profile: {
            modalStyle: css`
                width: 300px;
                height: 260px;
                gap: 20px;
            `
        },
    };

    const handleModal =  async () => {
        await onConfirm();
        closeModal();
    }
    
    const { modalStyle } = type[modalType]
    const confirmContent = modalType === "default" ? "확인" : "완료";

    return ReactDOM.createPortal(
        <ModalContainer>
           <ModalContent $modalStyle={modalStyle}>
                <Content $isSubContent={subContent}>{content}</Content>
                {subContent && <SubContent $isSubContent>{subContent}</SubContent> }
                {children}
                <ButtonWrapper>
                    <Button onClick={closeModal}>취소</Button>
                    <Button style={{color: "#b13b3b"}} onClick={handleModal}>{confirmContent}</Button>
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
    text-align: center;
    width: 280px;
    height: 230px;
    border: 2px solid #938585;
    border-radius: 10px;
    background-color: #FFFFFF;;
    box-shadow: 3px 3px 15px rgb(0,0,0,0.3);
    animation: scale-up-center 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    ${(props) => props.$modalStyle};

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
    top: ${({ $isSubContent }) => ($isSubContent ? "3rem" : "5rem")};
    font-size: 20px;
    font-weight: 700;
`;

const SubContent = styled.p`
    margin-top: 10px;
    font-size: 15px;
    color: #b13b3b;
`;

const ButtonWrapper = styled.div`
    position: relative;
    bottom: 2rem;
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

