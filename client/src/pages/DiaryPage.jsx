import React, {useState, useEffect, useContext} from "react";
import DateNavigation from "components/diary/DateNavigation";
import ImageUploader from "components/diary/ImageUploader";
import DiaryForm from "components/diary/DiaryForm";
import SaveButton from "components/diary/SaveButton";
import BottomNavigation from "components/common/BottomNavigation";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { postDiary, getView, putEdit } from "api/diary";
import UserContext from "contexts/UserContext";

const DiaryPage = () => {

  const [currentDate, setCurrentDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [diaryContent, setDiaryContent] = useState({ title: '', content: '' });
  const [isSaved, setIsSaved] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();

    // 로그인된 사용자 아이디 가져오기
    const { user } = useContext(UserContext);

    // 초기 렌더링 시 일기 조회
    useEffect(() => {
      const selectedDate = location.state?.selectedDate;
      console.log(selectedDate)
      if (selectedDate) {
        setCurrentDate(selectedDate);
        getDiary(selectedDate); 
      }
    }, [location.state]);

    // 이미지 선택 핸들러
    const handleImageUpload = (img) => {
      setSelectedImage(img);
    };
    
    // 저장 버튼 클릭 핸들러
    const handleSave = async () => {
      try {
        const diaryData = new FormData();
        diaryData.append('user_id', user);
        diaryData.append('date', currentDate);
        diaryData.append('title', diaryContent.title);
        diaryData.append('content', diaryContent.content);
        diaryData.append('image', selectedImage);

        const response = await postDiary(diaryData);
    
        if (response.status === 201) {
          setIsSaved(true);
          setIsEditing(false);
        }
      } catch (error) {
        console.log(error.response.data.error);
      }
    };
  
    // 수정 버튼 클릭 핸들러
    const handleEdit = async () => {
      setIsSaved(false);
      setIsEditing(true);
    };
  
    // 수정 확인 버튼 클릭 핸들러
    const handleConfirmEdit = async () => {
      try {
        const diaryData = new FormData();
        diaryData.append('title', diaryContent.title);
        diaryData.append('content', diaryContent.content);
        diaryData.append('image', selectedImage);
        const userInfo = {user_id: user, date: currentDate}
        const response = await putEdit(diaryData, userInfo);

        if (response.status === 201) {
          setIsSaved(true);
          setIsEditing(false);
        }
      } catch (error) {
        console.log(error.response.data.error);
      }
    };
  
    // 특정 날짜의 일기를 조회하는 함수
    const getDiary = async (currentDate) => {
      try {
        const response = await getView(
          {
            user_id: user,
            date: currentDate,
          },
        );
    
        if (response.status === 200) {
          const diaryData = response.data.success.diary;
          setDiaryContent({
            title: diaryData.title,
            content: diaryData.content,
          });
          setSelectedImage(diaryData.image);
          setIsSaved(true);
        }
      } catch (error) {
        console.log(error.response.data.error);
      }
    };
  
  return (
    <DiaryPageContainer>
        <DiaryContainer>
            <DateNavigation currentDate={currentDate} />
            <ImageUploader image={selectedImage} handleImageUpload={handleImageUpload} isEditing={isEditing} isSaved={isSaved} />
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