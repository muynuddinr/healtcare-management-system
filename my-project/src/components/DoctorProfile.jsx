import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getDoctorProfile, updateDoctorProfile } from '../api/doctorApi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const TimeSlotManager = ({ day, slots, onUpdate, onDelete }) => {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  const handleAddSlot = () => {
    if (startTime && endTime) {
      onUpdate(day, startTime, endTime);
      setStartTime('09:00');
      setEndTime('17:00');
    }
  };

  return (
    <div className="p-4 border rounded-lg mb-4">
      <h3 className="font-semibold mb-2">{day}</h3>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Start Time</label>
          <TimePicker
            value={startTime}
            onChange={setStartTime}
            className="input-field"
            format="HH:mm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">End Time</label>
          <TimePicker
            value={endTime}
            onChange={setEndTime}
            className="input-field"
            format="HH:mm"
          />
        </div>
        <button
          type="button"
          onClick={handleAddSlot}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg self-end"
        >
          Add Slot
        </button>
      </div>
      
      <div className="space-y-2">
        {slots.map((slot, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
            <span>{slot.startTime} - {slot.endTime}</span>
            <button
              type="button"
              onClick={() => onDelete(day, index)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    department: '',
    specialization: [],
    experience: 0,
    fee: 0,
    availability: [],
    bio: '',
    phoneNumber: '',
    address: ''
  });

  const [selectedDay, setSelectedDay] = useState(null);
  const [availabilityMap, setAvailabilityMap] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getDoctorProfile();
        setProfile({
          ...data,
          specialization: data.specialization?.join(', ') || '',
        });
        formatAvailabilityForDisplay(data.availability);
      } catch (error) {
        toast.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile.availability) {
      const map = profile.availability.reduce((acc, slot) => {
        if (!acc[slot.day]) {
          acc[slot.day] = [];
        }
        acc[slot.day].push({ startTime: slot.startTime, endTime: slot.endTime });
        return acc;
      }, {});
      setAvailabilityMap(map);
    }
  }, [profile.availability]);

  const formatAvailabilityForDisplay = (availability) => {
    if (!availability || availability.length === 0) {
      return;
    }
    
    const formatted = availability.map(slot => 
      `${slot.day} ${slot.startTime}-${slot.endTime}`
    ).join('\n');
    
    // This function is now empty as the availability is managed by availabilityMap
  };

  const parseAvailability = (input) => {
    if (!input) return [];
    
    return input.split('\n').filter(line => line.trim()).map(line => {
      const parts = line.trim().split(/\s+/);
      if (parts.length < 2) return null;
      
      const day = parts[0];
      const times = parts[1].split('-');
      
      if (times.length !== 2) return null;
      
      return {
        day,
        startTime: times[0],
        endTime: times[1]
      };
    }).filter(item => item !== null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'availabilityInput') {
      // This input is now managed by the TimeSlotManager
    } else {
      setProfile({
        ...profile,
        [name]: value
      });
    }
  };

  const handleDayClick = (value) => {
    const day = value.toLocaleDateString('en-US', { weekday: 'long' });
    setSelectedDay(day);
  };

  const handleAddTimeSlot = (day, startTime, endTime) => {
    setAvailabilityMap(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), { startTime, endTime }]
    }));
  };

  const handleDeleteTimeSlot = (day, index) => {
    setAvailabilityMap(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const availability = Object.entries(availabilityMap).flatMap(([day, slots]) =>
        slots.map(slot => ({
          day,
          startTime: slot.startTime,
          endTime: slot.endTime
        }))
      );

      const updatedProfile = {
        ...profile,
        specialization: profile.specialization ? profile.specialization.split(',').map(item => item.trim()) : [],
        availability
      };
      
      await updateDoctorProfile(updatedProfile);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Doctor Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(false)}
            className="btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-secondary-700 mb-2">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p className="py-2">{profile.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-secondary-700 mb-2">Email</label>
            <p className="py-2">{profile.email}</p>
          </div>

          <div className="mb-4">
            <label className="block text-secondary-700 mb-2">Department</label>
            {isEditing ? (
              <select
                name="department"
                value={profile.department}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Oncology">Oncology</option>
                <option value="General Medicine">General Medicine</option>
              </select>
            ) : (
              <p className="py-2">{profile.department}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-secondary-700 mb-2">Experience (years)</label>
            {isEditing ? (
              <input
                type="number"
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p className="py-2">{profile.experience} years</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-secondary-700 mb-2">Consultation Fee</label>
            {isEditing ? (
              <input
                type="number"
                name="fee"
                value={profile.fee}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p className="py-2">₹{profile.fee}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-secondary-700 mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p className="py-2">{profile.phoneNumber}</p>
            )}
          </div>

          <div className="md:col-span-2 mb-4">
            <label className="block text-secondary-700 mb-2">Address</label>
            {isEditing ? (
              <textarea
                name="address"
                value={profile.address || ''}
                onChange={handleChange}
                className="input-field"
                rows="2"
              ></textarea>
            ) : (
              <p className="py-2">{profile.address || 'Not specified'}</p>
            )}
          </div>

          <div className="md:col-span-2 mb-4">
            <label className="block text-secondary-700 mb-2">Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={profile.bio || ''}
                onChange={handleChange}
                className="input-field"
                rows="3"
              ></textarea>
            ) : (
              <p className="py-2">{profile.bio || 'No bio provided'}</p>
            )}
          </div>

          <div className="md:col-span-2 mb-4">
            <label className="block text-secondary-700 mb-2">Specialization (comma separated)</label>
            {isEditing ? (
              <textarea
                name="specialization"
                value={profile.specialization || ''}
                onChange={handleChange}
                className="input-field"
                rows="2"
                placeholder="e.g. Heart Surgery, Cardiac Rehabilitation"
              ></textarea>
            ) : (
              <p className="py-2">
                {profile.specialization && profile.specialization.length > 0
                  ? typeof profile.specialization === 'string'
                    ? profile.specialization
                    : profile.specialization.join(', ')
                  : 'None'}
              </p>
            )}
          </div>

          <div className="md:col-span-2 mb-4">
            <label className="block text-secondary-700 mb-2">
              Availability Schedule
            </label>
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <Calendar
                    onChange={handleDayClick}
                    value={new Date()}
                    className="w-full"
                  />
                </div>
                <div className="border rounded-lg p-4">
                  {selectedDay && (
                    <TimeSlotManager
                      day={selectedDay}
                      slots={availabilityMap[selectedDay] || []}
                      onUpdate={handleAddTimeSlot}
                      onDelete={handleDeleteTimeSlot}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="py-2">
                {Object.entries(availabilityMap).map(([day, slots]) => (
                  <div key={day} className="mb-2">
                    <h3 className="font-semibold">{day}</h3>
                    <ul className="list-disc pl-5">
                      {slots.map((slot, index) => (
                        <li key={index}>
                          {slot.startTime} - {slot.endTime}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-6">
            <button type="submit" className="btn-primary w-full">
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}