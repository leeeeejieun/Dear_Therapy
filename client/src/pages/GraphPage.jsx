import GraphHeader from "components/graph/GraphHeader";
import GraphBody from "components/graph/GraphBody";
import BottomNavigation from "components/common/BottomNavigation";
import useCalender from "hooks/useCalender";
import styled from "styled-components";

const GraphPage = () => {
    const { currentDate, currentYear, dispatch} = useCalender();

    return (
        <GraphContainer>
            <GraphHeader currentYear={currentYear} dispatch={dispatch}/>
            <GraphBody currentDate={currentDate}/>
            <BottomNavigation />
        </GraphContainer>
        
    );
};

export default GraphPage;

const GraphContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
`;
