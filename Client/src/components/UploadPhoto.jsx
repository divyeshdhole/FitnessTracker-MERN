import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import url from '../constant';
import { Alert, Snackbar } from "@mui/material";
const UploadPhoto = ({ handleProfileClick }) => {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null); // Store the actual file
    const [alertOpen, setAlertOpen] = useState(false);  // For Snackbar visibility
    const [alertMessage, setAlertMessage] = useState(""); // For custom alert message
    const [alertType, setAlertType] = useState("success");
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file); // Store the file here
            setProfilePhoto(URL.createObjectURL(file)); // Preview the image
        }
    };
    const handleCloseSnackbar = () => {
        setAlertOpen(false);
    };
    const handleUpload = async () => {
        if (!selectedFile) {
            setAlertMessage("Pleas Select a photo!");
            setAlertType("error");
            setAlertOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append('profilePhoto', selectedFile); // Send the actual file, not URL
        const token = Cookies.get('token');
        try {
            const response = await fetch(url + '/upload-profile', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Include token in Authorization header
                },
                body: formData

            });
            const result = await response.json();
            //save image in local storage
            const user = JSON.parse(localStorage.getItem('user'));

            // Check if the user object exists and if profilePhoto is null
            if (user) {
                // Update the profilePhoto if it's null
                user.profilePhoto = result.filePath;
                console.log('profilePhoto updated', result.filePath);
                // Save the updated user object back to localStorage
                localStorage.setItem('user', JSON.stringify(user));

                console.log('Profile photo updated successfully.');
                setAlertMessage("Photo uploaded successfully!");
                setAlertType("success");
                setAlertOpen(true);
                handleProfileClick(); // Close the modal and update the profile photo in the navigation bar
            } else {
                console.log('No update needed, profile photo is already set.');
            }

            console.log('Server Response:', result);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-[400px] flex flex-col items-center">
                {/* Close Button */}
                <IoClose
                    className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-600 hover:text-black"
                    onClick={handleProfileClick}
                />

                <h2 className="text-2xl font-bold mb-6 text-center">Upload Profile Picture</h2>

                {/* Profile Picture Preview */}
                <label className="w-40 h-40 border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all">
                    {profilePhoto ? (
                        <img
                            src={profilePhoto}
                            alt="Profile Preview"
                            className="w-full h-full object-cover rounded-full"
                        />
                    ) : (
                        <FaCamera className="text-4xl text-gray-400" />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all"
                >
                    Upload Photo
                </button>

                {/* Cancel Button */}
                <button
                    onClick={handleProfileClick}
                    className="mt-3 text-red-500 underline hover:text-red-700"
                >
                    Cancel
                </button>
            </div>
            <Snackbar className="z-[100]"
                open={alertOpen}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Alert positioned at the top center
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={alertType}
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default UploadPhoto;
