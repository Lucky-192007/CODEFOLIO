function ProfileForm({ profile, setProfile }) {
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">
        Profile Information
      </h2>

      <div className="space-y-4">

        <input type="file" accept="image/*" onChange={(e) => {
          const file = e.target.files[0];

         if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfile({
                     ...profile,
                        photo: imageUrl,
                      });
                    }
           }}
        />

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={profile.fullName}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="text"
          name="title"
          placeholder="Professional Title"
          value={profile.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <textarea
          name="bio"
          placeholder="Bio"
          rows="4"
          value={profile.bio}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <input
  type="text"
  name="location"
  placeholder="Location"
  value={profile.location}
  onChange={handleChange}
  className="w-full p-3 border rounded-lg"
/>

<input
  type="text"
  name="experience"
  placeholder="Years of Experience"
  value={profile.experience}
  onChange={handleChange}
  className="w-full p-3 border rounded-lg"
/>

        <input
          type="text"
          name="github"
          placeholder="GitHub URL"
          value={profile.github}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={profile.linkedin}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <input
         type="text"
         name="website"
         placeholder="Portfolio Website"
         value={profile.website}
         onChange={handleChange}
         className="w-full p-3 border rounded-lg"
        />

        <input
          type="text"
          name="resume"
          placeholder="Resume URL"
          value={profile.resume}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

      </div>
    </div>
  );
}

export default ProfileForm;