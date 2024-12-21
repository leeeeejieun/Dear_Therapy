import React, { useState, useContext, useEffect, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from "styled-components";
import UserContext from "contexts/UserContext";
import { getScore } from "api/graph";

const GraphBody = ({currentDate}) => {
  const [scores, setScores] = useState([]);
  const { user } =  useContext(UserContext);
  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월","10월","11월","12월"];

  const getScores = useCallback (async () => {
      try {
        const response = await getScore({user_id: user, date: currentDate});
          setScores(response.data.success);
      } catch(err) {
        setScores([]);
        console.log(err.response.data.error);       
      }
  },[user, currentDate]);
  
  useEffect(() => {
      getScores();
  }, [getScores]);

  const monthData = months.map((month) => {
      const found = scores.find(score => score.month === parseInt(month));
      if(found) {
        return {name: month, score: parseFloat(found.score)};
      }
      else {
        return {name: month, score: 0};
      }
  });
  
  return (
    <GraphContainer>
        <ResponsiveContainer width="100%" height={380}>
          <LineChart data={monthData} margin={{ right: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis 
              dataKey="name"
              interval={0}      // x축 데이터 모두 제공  
              tick={{ fontSize: "13px" }} 
              tickSize={5}      // 눈금선과 타이틀 간격 조절(px 단위)
              tickLine={false}  // 축 눈금선 제거
            />
            <YAxis 
              ticks={[0, 2, 4, 6, 8, 10]}  // y축 눈금값 설정 
              tickLine={false}  // 축 눈금선 제거
              domain={[0, 6]}   // y축에 표시될 데이터 범위 설정
            />
            <Tooltip 
              
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#696666" 
              dot={{ r: 3 }} 
              activeDot={{ r: 5 }}
              />
          </LineChart>
      </ResponsiveContainer>
    </GraphContainer>
    
  );
};

export default GraphBody;

const GraphContainer = styled.div`
  transform: translate(-7.5%, 7%);
`

