import React from "react";
import '../Style/Searchrecord.css';
import Button from 'react-bootstrap/Button';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const Searchrecord = ({ searchHistory, deleteUserName }) => {

    const reversedSearchHistory = [...searchHistory].reverse();

    return (
        <div className="recordContainer">
            {
                reversedSearchHistory && reversedSearchHistory.length > 0 ? (
                    <div className="searchRecordContainer">
                        {reversedSearchHistory.map((item, index) => (
                            <div key={index} className="record">
                                <div className="historyInfo">
                                    <h6 className="index">{index + 1}.</h6>
                                    <h6 className="recordText">{item}</h6>
                                </div>
                                

                                <DeleteRoundedIcon 
                                    className="deleteBtn"
                                    sx={{ color: 'red', cursor: 'pointer', fontSize: '2rem' }}
                                    onClick={() => deleteUserName(item)}
                                />

                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="noRecordContainer">
                        <h6 className="recordText">No search history available</h6>
                    </div>
                )
            }
        </div>
    );
};

export default Searchrecord;
