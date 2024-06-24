import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import { token } from "../../config";

const Profile = ({ user }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        photo: null,
        gender: '',
        bloodType: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        setFormData({
            name: user.name,
            email: user.email,
            photo: user.photo,
            gender: user.gender,
            bloodType: user.bloodType
        });
    }, [user]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        const data = await uploadImageToCloudinary(file);

        setSelectedFile(data.url);
        setFormData({ ...formData, photo: data.url });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            const { message } = await res.json();
            if (!res.ok) {
                throw new Error(message);
            }
            setLoading(false);
            toast.success(message);
            navigate('/users/profile/me');
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    return (
        <div className="mt-10">
            <form onSubmit={submitHandler}>
                <div className="mb-5">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                        required
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email "
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                        aria-readonly
                        readOnly
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        value={formData.password}
                        onChange={(e) => handleInputChange(e)}
                        className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="text"
                        name="bloodType"
                        placeholder="Blood Type"
                        value={formData.bloodType}
                        onChange={(e) => handleInputChange(e)}
                        className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                        required
                    />
                </div>
                <div className="mb-5 flex items-center justify-between">
                    <label className='text-headingColor font-bold text-[16px] leading-7'>
                        Gender:
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                </div>
                <div className="mb-5 flex items-center gap-3">
                    {formData.photo && <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                        <img src={formData.photo} alt="" className='w-full rounded-full' />
                    </figure>}
                    <div className='relative w-[130px] h-[50px]'>
                        <input
                            type="file"
                            name='photo'
                            id='customFile'
                            onChange={handleFileInputChange}
                            accept='.jpg, .png'
                            className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                        />
                        <label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>{selectedFile ?
                            selectedFile.name : "Upload Photo"}</label>
                    </div>
                </div>
                <div className="mt-7">
                    <button
                        disabled={loading && true}
                        className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                        type="submit"
                    >{loading ? <HashLoader size={25} color='#fff' /> : 'Update Profile'}</button>
                </div>
            </form>
        </div>
    )
}

export default Profile;