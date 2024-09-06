import React from "react";
import '../Style/Searchrecord.css';
import Button from 'react-bootstrap/Button';

const Searchrecord = ({ searchHistory }) => {

    const reversedSearchHistory = [...searchHistory].reverse();

    const deleteUserName = (item) => {
        console.log("Deleting item: ", item);
        const updatedHistory = reversedSearchHistory.filter(entry => entry !== item);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }

    return (
        <div className="recordContainer">
            {
                reversedSearchHistory && reversedSearchHistory.length > 0 ? (
                    <div className="searchRecordContainer">
                        {reversedSearchHistory.map((item, index) => (
                            <div key={index} className="record">
                                <h6 className="index">{index + 1}.</h6>
                                <h6 className="recordText">{item}</h6>
                                <Button className="deletebtn" variant="danger" onClick={() => deleteUserName(item)}>
                                    DELETE
                                </Button>
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
