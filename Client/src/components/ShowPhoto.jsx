import url from '../constant';

const ShowPhoto = ({ showProfilePhoto }) => {
    return (
        <div onClick={showProfilePhoto} className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <img className="rounded-full size-[300px]" src={url + JSON.parse(localStorage.getItem('user')).profilePhoto} />
        </div>
    )
}

export default ShowPhoto;