import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import ObjectsContainer from './Pages/Objects/ObjectsContainer';
import OneObjectContainer from './Pages/Objects/OneObject/OneObjectContainer';
import TechnicContainer from './Pages/Technic/TechnicContainer';
import OneTechnicContainer from './Pages/Technic/OneTechnic/OneTechnicContainer';
import ClientsContainer from './Pages/Clients/ClientsContainer';
import OneClientContainer from './Pages/Clients/OneClient/OneClientContainer';
import WorkerContainer from './Pages/Worker/WorkerContainer';
import EnterPageContainer from './Pages/EnterPage/EnterPageContainer';
import HeaderContainer from './Pages/Header/HeaderContainer';
import EmployeeInfoContainer from './Pages/EmployeeInfo/EmployeeInfoContainer';
import OneWorkerContainer from './Pages/Worker/OneWorker/OneWorkerContainer';
import EmployeeContainer from './Pages/Employee/EmployeeContainer'
import OneEmployeeContainer from './Pages/Employee/OneEmployee/OneEmployeeContainer';
import NeedTechnicContainer from './Pages/NeedTechnic/NeedTechnicContainer';
import NeedMaterialsContainer from './Pages/NeedMaterials/NeedMaterialsContainer';
import SuppliersContainer from './Pages/Suppliers/SuppliersContainer';
import MainPage from './Pages/InfoPages/MainPage/MainPage';
import Footer from './Pages/Footer/Footer';
import Docs from './Pages/InfoPages/Docs/Docs';
import FirstPage from './Pages/InfoPages/IETR/FirstPage';
import FirstProblemPage from './Pages/InfoPages/IETR/FirstProblemPage';
import SecondProblemPage from './Pages/InfoPages/IETR/SecondProblemPage';
import ThirdProblemPage from './Pages/InfoPages/IETR/ThirdProblemPage';
import FourthProblemPage from './Pages/InfoPages/IETR/FourthProblemPage';
import FirstRegWorks from './Pages/InfoPages/IETR/FirstRegWorks';
import SecondRegWorks from './Pages/InfoPages/IETR/SecondRegWorks';
import ThirdRegWorks from './Pages/InfoPages/IETR/ThirdRegWorks';
import FourthRegWorks from './Pages/InfoPages/IETR/FourthRegWorks';

function App() {
  return (
    <div className="App">
      <HeaderContainer></HeaderContainer>
      <Switch>
        <Route exact path="/" render={({ match, location }) => <MainPage></MainPage>}></Route>
        <Route exact path="/EnterPage" render={({ match, location }) => <EnterPageContainer></EnterPageContainer>}></Route>
        <Route exact path="/EnterPage/:ResetToken" render={({ match, location }) => <EnterPageContainer match ={match}></EnterPageContainer>}></Route>
        <Route exact path="/Objects" render={({ match, location }) => <ObjectsContainer></ObjectsContainer>}></Route>
        <Route exact path="/Workers" render={({ match, location }) => <WorkerContainer></WorkerContainer>}></Route>
        <Route exact path="/Employees" render={({ match, location }) => <EmployeeContainer></EmployeeContainer>}></Route>
        <Route exact path="/Clients" render={({ match, location }) => <ClientsContainer></ClientsContainer>}></Route>
        <Route exact path="/Technics" render={({ match, location }) => <TechnicContainer></TechnicContainer>}></Route>
        <Route exact path="/Object/:ObjectID" render={({ match, location }) => <OneObjectContainer match={match}></OneObjectContainer>}></Route>
        <Route exact path="/Technic/:TechnicID" render={({ match, location }) => <OneTechnicContainer match={match}></OneTechnicContainer>}></Route>
        <Route exact path="/Client/:ClientID" render={({ match, location }) => <OneClientContainer match={match}></OneClientContainer>}></Route>
        <Route exact path="/EmployeeInfo/:EmployeeID" render={({ match, location }) => <EmployeeInfoContainer match={match}></EmployeeInfoContainer>}></Route>
        <Route exact path="/Employee/:EmployeeID" render={({ match, location }) => <OneEmployeeContainer match={match}></OneEmployeeContainer>}></Route>
        <Route exact path="/Worker/:WorkerID" render={({ match, location }) => <OneWorkerContainer match={match}></OneWorkerContainer>}></Route>
        <Route exact path="/NeedTechnic" render={({ match, location }) => <NeedTechnicContainer match={match}></NeedTechnicContainer>}></Route>
        <Route exact path="/NeedMaterials" render={({ match, location }) => <NeedMaterialsContainer match={match}></NeedMaterialsContainer>}></Route>
        <Route exact path="/Suppliers" render={({ match, location }) => <SuppliersContainer match={match}></SuppliersContainer>}></Route>
        <Route exact path="/Guide" render={({ match, location }) => <FirstPage match={match}></FirstPage>}></Route>
        <Route exact path="/Docs" render={({ match, location }) => <Docs match={match}></Docs>}></Route>
        <Route exact path="/FirstProblemPage" render={() => <FirstProblemPage></FirstProblemPage>}></Route>
        <Route exact path="/SecondProblemPage" render={() => <SecondProblemPage></SecondProblemPage>}></Route>
        <Route exact path="/ThirdProblemPage" render={() => <ThirdProblemPage></ThirdProblemPage>}></Route>
        <Route exact path="/FourthProblemPage" render={() => <FourthProblemPage></FourthProblemPage>}></Route>
        <Route exact path="/FirstRegWorks" render={() => <FirstRegWorks></FirstRegWorks>}></Route>
        <Route exact path="/SecondRegWorks" render={() => <SecondRegWorks></SecondRegWorks>}></Route>
        <Route exact path="/ThirdRegWorks" render={() => <ThirdRegWorks></ThirdRegWorks>}></Route>
        <Route exact path="/FourthRegWorks" render={() => <FourthRegWorks></FourthRegWorks>}></Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
