import { User, Mail, Phone, Check, X } from "lucide-react"
import { useState } from "react"
import { useContacts } from "./ContactsContext"
import { useNavigate } from "react-router-dom"

const CreateContact = () => {
    const { contacts, setContacts } = useContacts();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState({});
    const getRandomColor = () => {
        const colors = ["bg-red-700", "bg-green-700", "bg-blue-700", "bg-yellow-700", "bg-purple-600"];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
            newErrors.phoneNumber = 'Phone number must be 10 digits';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const newContact = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            favourite: "No",
            color: getRandomColor()
        };

        setContacts([...contacts, newContact]);
        navigate('/');
    };

    const handleCancel = () => {
        navigate('/');
    };

    const displayLetter = formData.firstName ? formData.firstName.charAt(0).toUpperCase() : '?';
    const profileColor = formData.firstName ? getRandomColor() : 'bg-gray-400';
    
    return (
        <div className="w-full md:mt-20 px-4 md:px-8 py-6">
            {/* Profile Circle - Centered */}
            <div className="flex justify-center md:justify-start mb-8">
                <div className={`w-24 h-24 md:w-40 md:h-40 rounded-full flex ${profileColor} items-center justify-center shadow-lg`}>
                    <h1 className="text-5xl md:text-9xl text-white font-bold">{displayLetter}</h1>
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto md:mx-0">
                {/* Name Section */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
                    <div className="flex justify-center md:justify-start items-start pt-2">
                        <User className="text-gray-500 w-6 h-6 md:w-8 md:h-8"/>
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                        <div>
                            <input 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`w-full h-12 rounded-md outline-none placeholder:text-gray-400 px-4 border-2 transition-colors ${errors.firstName ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
                                type="text" 
                                placeholder="First Name"
                            />
                            {errors.firstName && <p className="text-red-500 text-sm mt-1 ml-1">{errors.firstName}</p>}
                        </div>
                        <div>
                            <input 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`w-full h-12 rounded-md outline-none placeholder:text-gray-400 px-4 border-2 transition-colors ${errors.lastName ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
                                type="text" 
                                placeholder="Last Name"
                            />
                            {errors.lastName && <p className="text-red-500 text-sm mt-1 ml-1">{errors.lastName}</p>}
                        </div>
                    </div>
                </div>

                {/* Email Section */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
                    <div className="flex justify-center md:justify-start items-start pt-2">
                        <Mail className="text-gray-500 w-6 h-6 md:w-8 md:h-8"/>
                    </div>
                    <div className="flex-1">
                        <input 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full h-12 rounded-md outline-none placeholder:text-gray-400 px-4 border-2 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
                            type="email" 
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>}
                    </div>
                </div>

                {/* Phone Section */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-8">
                    <div className="flex justify-center md:justify-start items-start pt-2">
                        <Phone className="text-gray-500 w-6 h-6 md:w-8 md:h-8"/>
                    </div>
                    <div className="flex-1">
                        <input 
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className={`w-full h-12 rounded-md outline-none placeholder:text-gray-400 px-4 border-2 transition-colors ${errors.phoneNumber ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
                            type="tel" 
                            placeholder="Phone Number"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1 ml-1">{errors.phoneNumber}</p>}
                    </div>
                </div>

                {/* Action Buttons - Centered */}
                <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start mt-10 mb-8">
                    <button
                        type="submit"
                        className="flex flex-row items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg w-full md:w-auto"
                    >
                        <Check className="w-5 h-5" />
                        <span className="font-medium">Save</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex flex-row items-center justify-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg w-full md:w-auto"
                    >
                        <X className="w-5 h-5" />
                        <span className="font-medium">Cancel</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateContact
