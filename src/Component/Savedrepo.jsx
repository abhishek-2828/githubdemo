import React, { useState } from "react";
import '../Style/Savedrepo.css';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const Savedrepo = ({ saveRepo, deleteSavedRepo }) => {

  return (
    <div className="savedRepo_container">
      <div className='Container'>
        {saveRepo.length > 0 ? (
          saveRepo.map(repo => (
            <div key={repo.id} className='repoContainer'>
              <div className='repoNameContainer'>
                <div className='repoItem1'>
                  <h5 className='repoTitle'>{repo.name}</h5>
                  <DeleteRoundedIcon 
                    sx={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => deleteSavedRepo(repo)}
                    />
                </div>
              </div>

              <div className='repoDetailContainer'>
                <div className='repoBio'>
                  <h6 className='repoBioTitle'>
                    {repo.description || 'No description available'}
                  </h6>
                </div>

                <div className='repoLinksContainer'>
                  <h6 className='repoLinks'>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      View Repo
                    </a>
                  </h6>
                  {repo.homepage && (
                    <h6 className='repoLinks'>
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                        Preview Projects
                      </a>
                    </h6>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No repositories saved.</p>
        )}
      </div>
    </div>
  );
}

export default Savedrepo;
