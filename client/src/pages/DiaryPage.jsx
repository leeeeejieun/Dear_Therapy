import React, {useState, useEffect} from "react";
import DateNavigation from "components/diary/DateNavigation";
import ImageUploader from "components/diary/ImageUploader";
import DiaryForm from "components/diary/DiaryForm";
import SaveButton from "components/diary/SaveButton";
import BottomNavigation from "components/common/BottomNavigation";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { postDiary } from "api/diary";
import { putEdit } from "api/edit";

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
    const handleSave = async () => {
      try {
        const formData = new FormData();
        formData.append('user_id', 'admin');
        formData.append('date', currentDate);
        formData.append('title', diaryContent.title);
        formData.append('content', diaryContent.content);
        if (selectedImage) {
          formData.append('image', selectedImage);
        }

        const { accessToken } = response.data.success; 

        const response = await postDiary(formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`
          },
        });
  
        if (response.status === 201) {
          setIsSaved(true);
          setIsEditing(false);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

  
    // 수정 버튼 클릭 핸들러
    const handleEdit = () => {
      setIsEditing(true);
      setIsSaved(false);
    };
  
    // 수정 확인 버튼 클릭 핸들러
    const handleConfirmEdit = async () => {
      try{
        const formData = new FormData();
        formData.append('title', diaryContent.title);
        formData.append('content', diaryContent.content);
        if (selectedImage) {
          formData.append('image', selectedImage);
        }

        const { accessToken } = response.data.success;

        const response = await putEdit(formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`
          },
        });
        if (response.status === 201){
          setIsEditing(false);
          setIsSaved(true);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
  
    // 이미지 취소 핸들러
    const handleCancelImage = () => {
      setSelectedImage(null);
      setIsSaved(false);
      
  };
  
  return (
    <DiaryContainer>
      <DateNavigation currentDate={currentDate} />
      <ImageUploader image={selectedImage} handleImageUpload={handleImageUpload} isEditing={isEditing} handleCancelImage={handleCancelImage} isSaved={isSaved} />
      <DiaryForm diaryContent={diaryContent} setDiaryContent={setDiaryContent} isEditing={!isSaved} />
      <SaveButton handleSave={handleSave} isSaved={isSaved} handleEdit={handleEdit} handleConfirmEdit={handleConfirmEdit} isEditing={isEditing} />
      <BottomNavigation />
    </DiaryContainer>
  );
};

export default DiaryPage;

const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: ${props => props.theme.background};
`;
