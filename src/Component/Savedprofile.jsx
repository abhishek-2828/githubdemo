import React, { useEffect, useState } from "react";
import '../Style/Savedprofile.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; // Ensure axios is installed and imported

const Savedprofile = ({ savedProfiles }) => {

    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (savedProfiles.length === 0) return;

        const fetchUserData = async () => {
            try {
                const fetchPromises = savedProfiles.map(async (username) => {
                    const response = await axios.get(`https://api.github.com/users/${username}`);
                    return response.data;
                });

                const users = await Promise.all(fetchPromises);
                setUserData(users);
            } catch (error) {
                setError(error);
                // console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [savedProfiles]);


    if (error) {
        return (
            <div className="errorMsgContainer">
                <h5 className="errorMsg">OOPS! <br></br>Something Wrong....Please Try After Some Time!!!</h5>
            </div>
        )

    } else {
        return (
            <div className="savedProfileContainer">

                <div className="userContainer">
                    {userData.length > 0 ? (
                        userData.map((user) => (
                            <div key={user.id} className="dataContainer">

                                <div className="userData">
                                    <img src={user.avatar_url} alt={user.login} className="userImg" />
                                </div>
                                <div className="userData">{user.login}</div>
                                <div className="userData">{user.bio}</div>
                            </div>
                        ))
                    ) : (
                        <h5 className="saved-profile__title">It Seems Like You Haven't Saved Any Profile Yet!!!</h5>
                    )}

                </div>
                <div className="backBTnContainer">
                    <Button className="actionBtn" variant="success">
                        Go to Search Profile
                    </Button>
                </div>
            </div>

        );
    }
};

export default Savedprofile;
