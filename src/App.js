import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApiConnect from './Component/ApiConnect';
import Header from './Component/Header';
import Button from 'react-bootstrap/Button';
import Loader from './Component/Loader';
import Savedprofile from './Component/Savedprofile';
import Searchrecord from './Component/Searchrecord';
import Savedrepo from './Component/Savedrepo';

function App() {

  const getPreviousProfile = () => {
    const previousProfile = localStorage.getItem('savedProfiles');
    return previousProfile ? JSON.parse(previousProfile) : [];
  };

  const getPreviousSearch = () => {
    const previousSearch = localStorage.getItem('searchHistory');
    return previousSearch ? JSON.parse(previousSearch) : [];
  };

  const getChildData = (data) => {
    setErrorData(data);
  };


  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedProfiles, setSavedProfiles] = useState(getPreviousProfile);
  const [searchHistory, setSearchHistory] = useState(getPreviousSearch);
  const [errorData, setErrorData] = useState(null);



  useEffect(() => {
    localStorage.setItem('savedProfiles', JSON.stringify(savedProfiles));
  }, [savedProfiles]);



  useEffect(() => {
    if (username && !searchHistory.includes(username)) {
      const updatedData = [...searchHistory, username];
      setSearchHistory(updatedData);
      localStorage.setItem('searchHistory', JSON.stringify(updatedData));
    }
  }, [username, searchHistory]);



  const handleSaveProfile = () => {
    if (username && !savedProfiles.includes(username)) {
      setSavedProfiles(prevProfiles => [...prevProfiles, username]);
    }
  };



  const handleChange = (event) => {
    setInput(event.target.value);
  };



  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setUsername(input);
      setLoading(false);
    }, 1000);
  };



  const handleReset = () => {
    setInput('');
    setUsername('');
  };



  const containerClass = username ? 'actionContainer expanded' : 'actionContainer default';


  const renderProfileComponent = () => (
    <div className='renderProfileComponentContainer'>
      <div className={containerClass}>
        <div>
          <input
            type="text"
            id="searchUser"
            className="inputBox"
            onChange={handleChange}
            value={input}
            placeholder="Search User Profile..."
          />
        </div>

        <div className="btnContainer">
          <Button className="actionBtn" variant="danger" onClick={handleReset}>
            Reset
          </Button>
          <Button className="actionBtn" variant="success" onClick={handleSubmit}>
            Search
          </Button>
          {username && !errorData && (
            <Button className="actionBtn" variant="secondary" onClick={handleSaveProfile}>
              Save Profile
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div>
          <Loader />
          <h6 className="noUserName">Please Enter User Name To Search...</h6>
        </div>
      ) : username ? (
        <ApiConnect username={username} getChildData={getChildData} />
      ) : (
        <h6 className="noUserName">Please Enter User Name To Search...</h6>
      )}
    </div>
  );


  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/saved-profile" element={<Savedprofile savedProfiles={savedProfiles} />} />
          <Route path="/search-history" element={<Searchrecord searchHistory={searchHistory} />} />
          <Route path="/saved-repository" element={<Savedrepo />} />
          <Route path="/" element={renderProfileComponent()} />
          {/* <Route path="/" element={<ProfileComponent />} /> */}
        </Routes>
      </div>

    </Router>
  );

}

export default App;