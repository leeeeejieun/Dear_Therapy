import React from 'react';
import styled from 'styled-components';

const DiaryForm = () => {
    const [diaryContent, setDiaryContent] = useState({ title: '', content: '' });
  
    return (
      <DiaryFormContainer>
        <TitleInput
          type="text"
          placeholder="제목"
          value={diaryContent.title}
          onChange={(e) => setDiaryContent({ ...diaryContent, title: e.target.value })}
        />
        <ContentTextarea
          placeholder="오늘 하루는 어떠셨나요?"
          value={diaryContent.content}
          onChange={(e) => setDiaryContent({ ...diaryContent, content: e.target.value })}
        />
      </DiaryFormContainer>
    );
  };
  
  export default DiaryForm;
  
  const DiaryFormContainer = styled.div`
    margin-bottom: 20px;
  `;
  
  const TitleInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  `;
  
  const ContentTextarea = styled.textarea`
    width: 100%;
    padding: 10px;
    height: 150px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  `;