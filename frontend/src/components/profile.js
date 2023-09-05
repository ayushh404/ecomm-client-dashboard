import React from 'react';

const Profile = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-semibold mb-4">Profile</h1>
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
                <div className="mr-4">

                    <img
                        src="https://via.placeholder.com/100" // Replace with the actual image URL or use a dynamic source
                        alt="User"
                        className="rounded-full w-16 h-16"
                    />
                </div>
                <div>
                    <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Name:</span> {userData.name}
                    </p>
                    <p className="text-gray-800 text-lg">
                        <span className="font-semibold">Email:</span> {userData.email}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
