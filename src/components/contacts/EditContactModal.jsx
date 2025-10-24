import { User, Mail, Phone, Check, X, Star, Plus, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useContacts } from "../context/ContactsContext"
import { findDuplicateContacts } from "../../contacts"
import MergeContactsModal from "./MergeContactsModal"

const EditContactModal = ({ isOpen, onClose, contact }) => {
    const { contacts, setContacts } = useContacts();
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emails: [''],
        phoneNumbers: ['']
    });

    const [errors, setErrors] = useState({});
    const [contactNotFound, setContactNotFound] = useState(false);
    const [originalContact, setOriginalContact] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [duplicateContacts, setDuplicateContacts] = useState([]);
    const [showMergeModal, setShowMergeModal] = useState(false);

    useEffect(() => {
        if (isOpen && contact) {
            const foundContact = contacts.find(c => c.name === contact.name);
            if (foundContact) {
                const [first, ...rest] = foundContact.name.split(' ');
                setFormData({
                    firstName: first || '',
                    lastName: rest.join(' ') || '',
                    emails: foundContact.emails && foundContact.emails.length > 0 ? foundContact.emails : [''],
                    phoneNumbers: foundContact.phoneNumbers && foundContact.phoneNumbers.length > 0 ? foundContact.phoneNumbers : ['']
                });
                setIsFavorite(foundContact.favourite === "Yes");
                setOriginalContact(foundContact);
                setContactNotFound(false);
            } else {
                setContactNotFound(true);
            }
        }
    }, [isOpen, contact, contacts]);

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

    const handleEmailChange = (index, value) => {
        const newEmails = [...formData.emails];
        newEmails[index] = value;
        setFormData(prev => ({
            ...prev,
            emails: newEmails
        }));
    };

    const handlePhoneChange = (index, value) => {
        const newPhoneNumbers = [...formData.phoneNumbers];
        newPhoneNumbers[index] = value;
        setFormData(prev => ({
            ...prev,
            phoneNumbers: newPhoneNumbers
        }));
    };

    const addEmail = () => {
        setFormData(prev => ({
            ...prev,
            emails: [...prev.emails, '']
        }));
    };

    const removeEmail = (index) => {
        if (formData.emails.length > 1) {
            const newEmails = formData.emails.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                emails: newEmails
            }));
        }
    };

    const addPhone = () => {
        setFormData(prev => ({
            ...prev,
            phoneNumbers: [...prev.phoneNumbers, '']
        }));
    };

    const removePhone = (index) => {
        if (formData.phoneNumbers.length > 1) {
            const newPhoneNumbers = formData.phoneNumbers.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                phoneNumbers: newPhoneNumbers
            }));
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
        
        // Validate emails
        const validEmails = formData.emails.filter(email => email.trim());
        validEmails.forEach((email, index) => {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                newErrors[`email_${index}`] = 'Invalid email format';
            }
        });
        
        // Validate phone numbers
        const validPhones = formData.phoneNumbers.filter(phone => phone.trim());
        if (validPhones.length === 0) {
            newErrors.phoneNumbers = 'At least one phone number is required';
        }
        validPhones.forEach((phone, index) => {
            if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
                newErrors[`phone_${index}`] = 'Phone number must be 10 digits';
            }
        });
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const newName = `${formData.firstName} ${formData.lastName}`;
        const index = contacts.findIndex(c => c.name === originalContact.name);
        
        if (index !== -1) {
            const updatedContacts = [...contacts];
            updatedContacts[index] = {
                ...originalContact,
                name: newName,
                emails: formData.emails.filter(email => email.trim()),
                phoneNumbers: formData.phoneNumbers.filter(phone => phone.trim()),
                favourite: isFavorite ? "Yes" : "No",
                color: originalContact.color || getRandomColor()
            };
            setContacts(updatedContacts);
            handleClose();
        }
    };

    const handleClose = () => {
        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            emails: [''],
            phoneNumbers: ['']
        });
        setIsFavorite(false);
        setErrors({});
        setContactNotFound(false);
        setDuplicateContacts([]);
        setShowMergeModal(false);
        onClose();
    };

    if (!isOpen) return null;

    if (contactNotFound) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div 
                    className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={handleClose}
                ></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Contact Not Found</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">The contact you're trying to edit doesn't exist.</p>
                    <button
                        onClick={handleClose}
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    const displayLetter = formData.firstName ? formData.firstName.charAt(0).toUpperCase() : '?';
    const profileColor = originalContact?.color || 'bg-gray-400';
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
                                <div className="space-y-2">
                                    {formData.emails.map((email, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input 
                                                value={email}
                                                onChange={(e) => handleEmailChange(index, e.target.value)}
                                                className={`flex-1 h-12 rounded-md outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 border-2 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 [&:-webkit-autofill]:bg-white dark:[&:-webkit-autofill]:bg-gray-800 [&:-webkit-autofill]:text-gray-900 dark:[&:-webkit-autofill]:text-gray-100 ${errors[`email_${index}`] ? 'border-red-500 dark:border-red-400' : 'border-gray-400 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'}`}
                                                type="email" 
                                                placeholder={index === 0 ? "Email (Optional)" : "Additional Email"}
                                            />
                                            {formData.emails.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeEmail(index)}
                                                    className="w-12 h-12 flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addEmail}
                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Email
                                    </button>
                                </div>
                                {errors.phoneNumbers && <p className="text-red-500 dark:text-red-400 text-sm mt-1 ml-1">{errors.phoneNumbers}</p>}
                            </div>
                        </div>

                        {/* Phone Section */}
                        <div className="flex gap-4 mb-8">
                            <Phone className="text-gray-500 dark:text-gray-400 w-6 h-6 mt-3"/>
                            <div className="flex-1">
                                <div className="space-y-2">
                                    {formData.phoneNumbers.map((phone, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input 
                                                value={phone}
                                                onChange={(e) => handlePhoneChange(index, e.target.value)}
                                                className={`flex-1 h-12 rounded-md outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 border-2 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 [&:-webkit-autofill]:bg-white dark:[&:-webkit-autofill]:bg-gray-800 [&:-webkit-autofill]:text-gray-900 dark:[&:-webkit-autofill]:text-gray-100 ${errors[`phone_${index}`] ? 'border-red-500 dark:border-red-400' : 'border-gray-400 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'}`}
                                                type="tel" 
                                                placeholder={index === 0 ? "Phone Number" : "Additional Phone"}
                                            />
                                            {formData.phoneNumbers.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removePhone(index)}
                                                    className="w-12 h-12 flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addPhone}
                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Phone
                                    </button>
                                </div>
                                {errors.phoneNumbers && <p className="text-red-500 dark:text-red-400 text-sm mt-1 ml-1">{errors.phoneNumbers}</p>}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="w-full flex flex-row items-center justify-center gap-4 mt-6">
                            <button
                                type="submit"
                                className="w-[30%] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
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
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone Numbers</p>
                                <div className="space-y-1">
                                    {(formData.phoneNumbers && formData.phoneNumbers.length > 0 && formData.phoneNumbers[0]) ? (
                                        formData.phoneNumbers.slice(0, 2).map((phone, index) => (
                                            <p key={index} className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                {phone}
                                            </p>
                                        ))
                                    ) : (
                                        <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">-</p>
                                    )}
                                    {formData.phoneNumbers && formData.phoneNumbers.length > 2 && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            +{formData.phoneNumbers.length - 2} more
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Emails</p>
                                <div className="space-y-1">
                                    {(formData.emails && formData.emails.length > 0 && formData.emails[0]) ? (
                                        formData.emails.slice(0, 2).map((email, index) => (
                                            <p key={index} className="text-lg font-semibold text-gray-900 dark:text-gray-100 break-all">
                                                {email}
                                            </p>
                                        ))
                                    ) : (
                                        <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">-</p>
                                    )}
                                    {formData.emails && formData.emails.length > 2 && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            +{formData.emails.length - 2} more
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form Panel */}
                    <div className="bg-gray-50 w-full dark:bg-gray-800 rounded-3xl p-8 shadow-md border border-gray-200 dark:border-gray-700 flex flex-col">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">Edit Contact</h2>
                        
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
                                        Emails
                                    </label>
                                    <div className="space-y-2">
                                        {formData.emails.map((email, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input 
                                                    value={email}
                                                    onChange={(e) => handleEmailChange(index, e.target.value)}
                                                    className={`flex-1 h-11 rounded-lg outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 border-2 transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 [&:-webkit-autofill]:bg-white dark:[&:-webkit-autofill]:bg-gray-900 [&:-webkit-autofill]:text-gray-900 dark:[&:-webkit-autofill]:text-gray-100 ${errors[`email_${index}`] ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'}`}
                                                    type="email" 
                                                    placeholder={index === 0 ? "Enter email (optional)" : "Additional email"}
                                                />
                                                {formData.emails.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeEmail(index)}
                                                        className="w-11 h-11 flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addEmail}
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add Email
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Phone Numbers *
                                    </label>
                                    <div className="space-y-2">
                                        {formData.phoneNumbers.map((phone, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input 
                                                    value={phone}
                                                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                                                    className={`flex-1 h-11 rounded-lg outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 border-2 transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 [&:-webkit-autofill]:bg-white dark:[&:-webkit-autofill]:bg-gray-900 [&:-webkit-autofill]:text-gray-900 dark:[&:-webkit-autofill]:text-gray-100 ${errors[`phone_${index}`] ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'}`}
                                                    type="tel" 
                                                    placeholder={index === 0 ? "Enter 10-digit phone number" : "Additional phone"}
                                                />
                                                {formData.phoneNumbers.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removePhone(index)}
                                                        className="w-11 h-11 flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addPhone}
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add Phone
                                        </button>
                                    </div>
                                    {errors.phoneNumbers && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.phoneNumbers}</p>}
                                </div>
                            </div>

                            {/* Buttons at Bottom */}
                            <div className="flex gap-4 mt-4 pt-2 border-t border-gray-300 dark:border-gray-600">
                                <button
                                    type="submit"
                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-3.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium text-base"
                                >
                                    <Check className="w-5 h-5" />
                                    <span>Save Contact</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gray-400 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-8 py-3.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium text-base"
                                >
                                    <X className="w-5 h-5" />
                                    <span>Cancel</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditContactModal;

