import { User, Mail, Phone, Check, X, Star } from "lucide-react"
import { useState } from "react"
import { useContacts } from "../context/ContactsContext"

const CreateContactModal = ({ isOpen, onClose }) => {
    const { contacts, setContacts } = useContacts();
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    const [isFavorite, setIsFavorite] = useState(false);
    const [errors, setErrors] = useState({});
    
    // Generate color once when component mounts
    const [profileColor] = useState(() => {
        const colors = ["bg-red-700", "bg-green-700", "bg-blue-700", "bg-yellow-700", "bg-purple-600"];
        return colors[Math.floor(Math.random() * colors.length)];
    });

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
        
        // Email is optional, but validate format if provided
        if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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
            favourite: isFavorite ? "Yes" : "No",
            color: profileColor
        };

        setContacts([...contacts, newContact]);
        handleClose();
    };

    const handleClose = () => {
        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: ''
        });
        setIsFavorite(false);
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    const displayLetter = formData.firstName ? formData.firstName.charAt(0).toUpperCase() : '?';
    const fullName = formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}`.trim() : '-';
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={handleClose}
            ></div>
            
            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fadeIn transition-colors duration-300">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2 transition-colors z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Mobile Layout */}
                <div className="md:hidden p-6">
                    <div className="flex justify-center mb-8 relative">
                        <div className={`w-32 h-32 rounded-full flex ${profileColor} items-center justify-center shadow-lg`}>
                            <h1 className="text-5xl text-white font-bold">{displayLetter}</h1>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsFavorite(prev => !prev)}
                            className={`absolute bottom-0 right-1/2 translate-x-16 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isFavorite 
                                    ? 'bg-yellow-500 hover:bg-yellow-600 shadow-md' 
                                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                            }`}
                        >
                            <Star className={`w-5 h-5 transition-all ${isFavorite ? 'text-white fill-white' : 'text-gray-600 dark:text-gray-300'}`} />
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        {/* Name Section */}
                        <div className="flex flex-col gap-4 mb-6">
                            <div className="flex gap-4">
                                <User className="text-gray-500 dark:text-gray-400 w-6 h-6 mt-3"/>
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <input 
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className={`w-full h-12 rounded-md outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 border-2 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${errors.firstName ? 'border-red-500 dark:border-red-400' : 'border-gray-400 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'}`}
                                            type="text" 
                                            placeholder="First Name"
                                        />
                                        {errors.firstName && <p className="text-red-500 dark:text-red-400 text-sm mt-1 ml-1">{errors.firstName}</p>}
                                    </div>
                                    <div>
                                        <input 
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className={`w-full h-12 rounded-md outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 border-2 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${errors.lastName ? 'border-red-500 dark:border-red-400' : 'border-gray-400 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'}`}
                                            type="text" 
                                            placeholder="Last Name"
                                        />
                                        {errors.lastName && <p className="text-red-500 dark:text-red-400 text-sm mt-1 ml-1">{errors.lastName}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Email Section */}
                        <div className="flex gap-4 mb-6">
                            <Mail className="text-gray-500 dark:text-gray-400 w-6 h-6 mt-3"/>
                            <div className="flex-1">
                                <input 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full h-12 rounded-md outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 border-2 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-400 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'}`}
                                    type="email" 
                                    placeholder="Email (Optional)"
                                />
                                {errors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-1 ml-1">{errors.email}</p>}
                            </div>
                        </div>

                        {/* Phone Section */}
                        <div className="flex gap-4 mb-8">
                            <Phone className="text-gray-500 dark:text-gray-400 w-6 h-6 mt-3"/>
                            <div className="flex-1">
                                <input 
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className={`w-full h-12 rounded-md outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 border-2 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${errors.phoneNumber ? 'border-red-500 dark:border-red-400' : 'border-gray-400 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'}`}
                                    type="tel" 
                                    placeholder="Phone Number"
                                />
                                {errors.phoneNumber && <p className="text-red-500 dark:text-red-400 text-sm mt-1 ml-1">{errors.phoneNumber}</p>}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="w-full flex justify-center mt-6">
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg min-w-[120px]"
                            >
                                <Check className="w-5 h-5" />
                                <span className="font-medium">Save</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Desktop Layout - Two Columns */}
                <div className="hidden md:grid md:grid-cols-[1fr_3fr] md:gap-2 md:w-full">
                    {/* Left Column - Profile Preview */}
                    <div className="flex flex-col p-8">
                        <div className="relative mb-8">
                            <div className={`w-52 h-52 rounded-full flex ${profileColor} items-center justify-center shadow-xl`}>
                                <h1 className="text-9xl text-white font-bold">{displayLetter}</h1>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsFavorite(prev => !prev)}
                                className={`absolute bottom-2 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                                    isFavorite 
                                        ? 'bg-yellow-500 hover:bg-yellow-600' 
                                        : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                                }`}
                            >
                                <Star className={`w-7 h-7 transition-all ${isFavorite ? 'text-white fill-white' : 'text-gray-500 dark:text-gray-400'}`} />
                            </button>
                        </div>
                        
                        {/* Info Preview */}
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Name</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {fullName}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone Number</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {formData.phoneNumber || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 break-all">
                                    {formData.email || '-'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form Panel */}
                    <div className="bg-gray-50 w-full dark:bg-gray-800 rounded-3xl p-8 shadow-md border border-gray-200 dark:border-gray-700 flex flex-col">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">Create New Contact</h2>
                        
                        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                            <div className="space-y-2">
                                {/* Name Fields */}
                                <div className="flex flex-row w-full items-center justify-center gap-2">
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            First Name *
                                        </label>
                                        <input 
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className={`w-full h-11 rounded-lg outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 border-2 transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${errors.firstName ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'}`}
                                            type="text" 
                                            placeholder="Enter first name"
                                        />
                                        {errors.firstName && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.firstName}</p>}
                                    </div>

                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Last Name *
                                        </label>
                                        <input 
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className={`w-full h-11 rounded-lg outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 border-2 transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${errors.lastName ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'}`}
                                            type="text" 
                                            placeholder="Enter last name"
                                        />
                                        {errors.lastName && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.lastName}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <input 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full h-11 rounded-lg outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 border-2 transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'}`}
                                        type="email" 
                                        placeholder="Enter email (optional)"
                                    />
                                    {errors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Phone Number *
                                    </label>
                                    <input 
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className={`w-full h-11 rounded-lg outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 border-2 transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${errors.phoneNumber ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'}`}
                                        type="tel" 
                                        placeholder="Enter 10-digit phone number"
                                    />
                                    {errors.phoneNumber && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.phoneNumber}</p>}
                                </div>
                            </div>

                            {/* Buttons at Bottom */}
                            <div className="flex justify-center mt-4 pt-2 border-t border-gray-300 dark:border-gray-600">
                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-3.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium text-base min-w-[140px]"
                                >
                                    <Check className="w-5 h-5" />
                                    <span>Save Contact</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateContactModal;

