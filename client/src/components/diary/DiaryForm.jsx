import React from 'react';
import styled from 'styled-components';

const DiaryForm = ({ diaryContent, setDiaryContent, isEditing }) => {
  return (
    <DiaryFormContainer>
      <TitleInput
        type="text"
        placeholder="제목"
        value={diaryContent.title}
        onChange={(e) => setDiaryContent({ ...diaryContent, title: e.target.value })}
        disabled={!isEditing}
      />
      <ContentTextarea
        placeholder="오늘 하루는 어떠셨나요?"
        value={diaryContent.content}
        onChange={(e) => setDiaryContent({ ...diaryContent, content: e.target.value })}
        disabled={!isEditing}
      />
    </DiaryFormContainer>
  );
};

export default DiaryForm;

const DiaryFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  background-color: #FFFF;
  height: 50%;
  margin-bottom: 20px;
  outline: 2px dashed #ccc;
  border-radius: 10px;
  
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  font-size: 24px;
  font-family: '빵구니맘';
  
  
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 150px;
  font-size: 20px;
  border: none;
  font-family : '금은보화';
  
  
`;