import React, { useState, useEffect } from 'react';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import '../Style/ApiConnect.css';
import axios from 'axios';

const ApiConnect = ({ username, getChildData, handleChangeCheckBox, saveRepo}) => {

  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (username) {
      const fetchUserData = async () => {
        try {
          const userResponse = await axios.get(`https://api.github.com/users/${username}`);
          setUserData(userResponse.data);

          const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
          setReposData(reposResponse.data);
        } catch (error) {
          setError(error);
        }
      };

      fetchUserData();
    }
  }, [username]);

  useEffect(() => {
    sendDataToParent();
  }, [error, userData]);

  const sendDataToParent = () => {
    getChildData(error ? true : !userData);
  };


  const isRepoChecked = (repo) => {
    return saveRepo.some(r => r.id === repo.id || r.name === repo.name || r.node_id === repo.node_id);
  };


  if (error) {
    return (
      <div className="errorContainer">
        <h6 className='errorMessage'>{error.message}</h6>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className='noDataContainer'>
        <h6 className='noDataMessage'>
          No Data Available For "{username}"
          <br />or<br />
          Enter Correct UserName
        </h6>
      </div>
    );
  }

  return (
    <div className='mainContainer'>
      <div className='userDetailMainContainer'>
        <div className='profileCard'>
          <div className='imgContainer'>
            <div className='imgBorder'>
              <img src={userData.avatar_url} alt="Profile" className='userImage' />
            </div>
          </div>

          <div className='userNameContainer'>
            <div className='infoContainer'>
              <h5 className='basicInfo'>{userData.name || 'No name available'}</h5>
              <h6 className='basicInfo'>{userData.location || 'No location available'}</h6>
            </div>
          </div>

          <div className='linkContainer'>
            <h6 className='basicInfo'>Link-1</h6>
            <h6 className='basicInfo'>Link-2</h6>
            <h6 className='basicInfo'>Link-3</h6>
          </div>
        </div>

        <div className='profileCard'>
          <div className='FollowersContainer'>
            <h6 className='profileDetailTitle'>Followers</h6>
            <h6 className='profileDetailTitleDetails'>{userData.followers || '0'}</h6>
          </div>

          <div className='FollowingsContainer'>
            <h6 className='profileDetailTitle'>Following</h6>
            <h6 className='profileDetailTitleDetails'>{userData.following || '0'}</h6>
          </div>

          <div className='RepoContainer'>
            <h6 className='profileDetailTitle'>Repositories</h6>
            <h6 className='profileDetailTitleDetails'>{userData.public_repos || '0'}</h6>
          </div>
        </div>
      </div>

      <div className='userRepoMainContainer'>
        <div className='Container'>
          {reposData.length > 0 ? (
            reposData.map(repo => (
              <div key={repo.id} className='repoContainer'>
                <div className='repoNameContainer'>
                  <div className='repoItem1'>
                    <h5 className='repoTitle'>{repo.name}</h5>
                    <div>
                      <Tooltip title="Save Repo">
                        <Checkbox
                          icon={<FavoriteBorder sx={{ color: 'red' }} />}
                          checkedIcon={<Favorite sx={{ color: 'red' }} />}
                          checked={isRepoChecked(repo)}
                          onChange={() => handleChangeCheckBox(repo)}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </div>

                <div className='repoDetailContainer'>
                  <div className='repoBio'>
                    <h6 className='repoBioTitle'>{repo.description || 'No description available'}</h6>
                  </div>

                  <div className='repoLinksContainer'>
                    <h6 className='repoLinks'>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">View Repo</a>
                    </h6>
                    {repo.homepage && (
                      <h6 className='repoLinks'>
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer">Preview Projects</a>
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No repositories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiConnect;
