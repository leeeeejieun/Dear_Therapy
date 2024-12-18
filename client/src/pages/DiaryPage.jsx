import React, {useState, useEffect} from "react";
import DateNavigation from "components/diary/DateNavigation";
import ImageUploader from "components/diary/ImageUploader";
import DiaryForm from "components/diary/DiaryForm";
import SaveButton from "components/diary/SaveButton";
import BottomNavigation from "components/common/BottomNavigation";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const DiaryPage = () => {

  const [currentDate, setCurrentDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [diaryContent, setDiaryContent] = useState({ title: '', content: '' });
  const [isSaved, setIsSaved] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();

    useEffect(() => {
      const selectedDate = location.state?.selectedDate;
      const [year, month, day] = selectedDate.split("-");
      setCurrentDate(`${year}년 ${month}월 ${day}일`);
    }, [location.state]);
    

    // 이미지 선택 핸들러
    const handleImageUpload = (img, file) => {
      setSelectedImage(img);
    };
  
    // 저장 버튼 클릭 핸들러
    const handleSave = () => {
      setIsSaved(true);
      setIsEditing(false);
  };

  
    // 수정 버튼 클릭 핸들러
    const handleEdit = () => {
      setIsEditing(true);
      setIsSaved(false);
    };
  
    // 수정 확인 버튼 클릭 핸들러
    const handleConfirmEdit = () => {
      setIsEditing(false);
      setIsSaved(true);
    };
  
    // 이미지 취소 핸들러
    const handleCancelImage = () => {
      setSelectedImage(null);
      setIsSaved(false);
      
  };
  
  return (
    <DiaryPageContainer>
        <DiaryContainer>
            <DateNavigation currentDate={currentDate} />
            <ImageUploader image={selectedImage} handleImageUpload={handleImageUpload} isEditing={isEditing} handleCancelImage={handleCancelImage} isSaved={isSaved} />
            <DiaryForm diaryContent={diaryContent} setDiaryContent={setDiaryContent} isEditing={!isSaved} />
            <SaveButton handleSave={handleSave} isSaved={isSaved} handleEdit={handleEdit} handleConfirmEdit={handleConfirmEdit} isEditing={isEditing} />
        </DiaryContainer>
      <BottomNavigation />
    </DiaryPageContainer>
    
  );
};

export default DiaryPage;

const DiaryContainer = styled.div`
    flex-grow: 1;
`

const DiaryPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`