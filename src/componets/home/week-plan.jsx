import React, { useState, useEffect } from "react";
import axios from 'axios';
import Modal from "./Modal";
import PlanButton from "../plan/plan-btn/plan-buton"; // Corrected the import path

import "../../css/home/week-plan.css";

const WeekPlan = () => {
  const [showModal, setShowModal] = useState(false);
  const [plans, setPlans] = useState([]);
  const [budgetAmount, setBudgetAmount] = useState(0); // State to hold the budget amount

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('http://localhost:8082/plans');
      const plansWithImages = response.data
        .filter(plan => plan.plan !== null && plan.plan.trim() !== '') 
        .map(plan => {
          const category = plan.category || 'undefined';
          return {
            ...plan,
          };
        });
      setPlans(plansWithImages);
      console.log('Fetched week plans:', plansWithImages);
    } catch (error) {
      console.error('Error fetching week plans:', error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmBudget = (amount) => {
    setBudgetAmount(amount);
    setShowModal(false);
  };

  const handleButtonClick = (index, plan) => {
    console.log(`Button clicked: ${index}, ${plan.planId}, ${plan.plan}`);
    // Add your click handling logic here
  };

  return (
    <div className="bottom-plan">
      <div className="week-plan">
        {budgetAmount > 0 ? (
          <>
            <div className="week-plan-name">
              남은 <span className="week-budget">일주일 예산</span>을
              <br />
              확인해보세요!
            </div>
            <div className="budget-amount">{budgetAmount.toLocaleString()}원</div>
          </>
        ) : (
          <div className="week-plan-button">
            <div className="week-plan-name">
              <span className="week-budget">일주일 예산</span>을
              <br /> 
              세워보세요!
            </div>
            <button onClick={handleShowModal}>예산 세우기</button>
          </div>
        )}
      </div>
      <hr />
      <div className="career">
        <div className="career-name">
          오늘 <span className="action-plan">실천한 계획</span>을
          <br />
          체크해주세요!
        </div>
        <div className="career-button">
          {plans.map((plan, index) => (
            <PlanButton
              key={index}
              index={index}
              plan={plan}
              isChecked={false} // You can implement click state logic if needed
              context="view" // Specify the context or pass as prop
              image={plan.image} // Pass the image to PlanButton
              handleButtonClick={handleButtonClick}
            />
          ))}
        </div>
      </div>
      <Modal show={showModal} handleClose={handleCloseModal} handleConfirm={handleConfirmBudget} />
    </div>
  );
};

export default WeekPlan;
