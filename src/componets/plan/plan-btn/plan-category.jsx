import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopPlanCategory from './top-plan-category';
import '../../../css/plan/plan-btn/top-plan-category.css';

const PlanCategory = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleButtonClick = (category, image) => {
    // 이미지 변수와 함께 콘솔에 출력
    console.log('Selected category:', category);
    console.log('Selected image:', image);

    setSelectedCategories((prevState) =>
      prevState.find(cat => cat.name === category)
        ? prevState.filter(cat => cat.name !== category)
        : [...prevState, { name: category, image }]
    );
  };

  const handleNextButtonClick = () => {
    if (selectedCategories.length > 0) {
      navigate('/plan/plan-detail', { state: { selectedCategories, image: selectedCategories[0].image } });
    }
  };
  

  return (
    <div className="plan-category">
      <div className="plan-category-name">카테고리를 선택해주세요</div>
      <TopPlanCategory
        handleButtonClick={handleButtonClick}
        clickedButtons={Object.fromEntries(selectedCategories.map(cat => [cat.name, true]))}
      />
      <div className="plan-category-next-button">
        <button
          className={selectedCategories.length > 0 ? 'mint-button' : 'grey-button'}
          onClick={handleNextButtonClick}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default PlanCategory;

