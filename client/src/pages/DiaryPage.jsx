import React, {useState, useEffect, useContext} from "react";
import DateNavigation from "components/diary/DateNavigation";
import ImageUploader from "components/diary/ImageUploader";
import DiaryForm from "components/diary/DiaryForm";
import SaveButton from "components/diary/SaveButton";
import BottomNavigation from "components/common/BottomNavigation";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { postDiary } from "api/diary";
import { getView } from "api/diary";
import { putEdit } from "api/diary";
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

    // 날짜 가져오기
    useEffect(() => {
      const selectedDate = location.state?.selectedDate;
      const [year, month, day] = selectedDate.split("-");
      const formattedDay = day.padStart(2, '0');
       setCurrentDate(`${year}-${month}-${formattedDay}`); // YYYY-MM-DD 형식
      }, [location.state]);

    // 이미지 선택 핸들러
    const handleImageUpload = (img, file) => {
      setSelectedImage(img);
    };
  
    // 저장 버튼 클릭 핸들러
    const handleSave = async () => {
      try {
        const formData = new FormData();
        formData.append('user_id', user);
        formData.append('date', currentDate);
        formData.append('title', diaryContent.title);
        formData.append('content', diaryContent.content);
        if (selectedImage) {
          formData.append('image', selectedImage);
        }

        for (let pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }

        const response = await postDiary(formData);
    
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
    const handleConfirmEdit = () => {
       setIsEditing(false);
       setIsSaved(true);
    };
  
    // 이미지 취소 핸들러
    const handleCancelImage = () => {
      setSelectedImage(null);
      setIsSaved(false);    
    };

    // 날짜 변경 시 해당 날짜의 일기 조회
    useEffect(() => {
      if (currentDate && user) {
        fetchDiary(currentDate);
      }
    }, [currentDate, user]);

    // 특정 날짜의 일기를 조회하는 함수
    const fetchDiary = (async () => {
      try {
        const response = await getView({
          params: {
            user_id: user,
            date: currentDate,
          },
        });
    
        if (response.status === 200 && response.data) {
          setDiaryContent({
            title: response.data.title,
            content: response.data.content,
          });
          setSelectedImage(response.data.image || null);
          setIsSaved(true);
        } else {
          setDiaryContent({ title: '', content: '' });
          setSelectedImage(null);
          setIsSaved(false);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }, [user]);
  
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
