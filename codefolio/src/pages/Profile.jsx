import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "../layouts/DashboardLayout";
import { usePortfolio } from "../context/PortfolioContext";
import { useAuth } from "../context/AuthContext"; 
import { Upload, X, Link as LinkIcon, User } from "lucide-react";
import profilepic from "../assets/profilepic.jpeg";
import axios from "axios";

const API = import.meta.env.VITE_API;

function Profile() {
  const { profile, setProfile, theme } = usePortfolio();
  const { user, token, updateProfileState } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { register, watch, setValue, getValues } = useForm({
    defaultValues: {
      fullName: profile.fullName || user?.fullName || "",
      title: profile.title || user?.title || "",
      experience: profile.experience || user?.experience || "",
      email: profile.email || user?.email || "",
      location: profile.location || user?.location || "",
      github: profile.github || user?.githubUrl || "",
      linkedin: profile.linkedin || user?.linkedinUrl || "",
      website: profile.website || user?.websiteUrl || "",
      resume: profile.resume || "",
      bio: profile.bio || user?.bio || "",
      photo: profile.photo || ""
    }
  });

  const watchAllFields = watch();

  useEffect(() => {
    const subscription = watch((value) => {
      setProfile((prev) => ({
        ...prev,
        ...value,
      }));
    });
    return () => subscription.unsubscribe();
  }, [watch, setProfile]);

  const processFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.");
      return;
    }

    setUploadProgress(0);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      try {
        const res = await axios.post(
          `${API}/upload/image`,
          {
            image: reader.result,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },

            onUploadProgress: (progressEvent) => {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );

              setUploadProgress(percent);
            },
          }
        );

        setValue("photo", res.data.imageUrl);
        setUploadProgress(100);

        setTimeout(() => {
          setUploadProgress(0);
        }, 1000);

        setTimeout(() => {
          setUploadProgress(0);
        }, 800);
      } catch (err) {
        console.error(err);
        alert("Image upload failed.");
        setUploadProgress(0);
      }
    };
  };

  const removeProfilePhoto = () => {
    setValue("photo", "");
    setUploadProgress(0);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      processFile(file);
    }
  };

  const handleSaveProfile = async () => {
    // Modified validation check to ensure user ID object footprint matches
    const activeUserId = user?.id || user?._id;

    if (!activeUserId) {
      alert("Error: No authenticated user session found.");
      return;
    }

    setIsSaving(true);
    const formValues = getValues();

    try {
      const response = await fetch(`${API}/auth/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: activeUserId, // ◄--- Dynamic mapping to fix Bug 1
          fullName: formValues.fullName,
          email: formValues.email,
          title: formValues.title,
          experience: formValues.experience,
          location: formValues.location,
          bio: formValues.bio,
          github: formValues.github,
          linkedin: formValues.linkedin,
          website: formValues.website,
          resume: formValues.resume,
          photo: formValues.photo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to synchronize dataset layers.");
      }

      updateProfileState(data.user);
      alert("✨ Success! Portfolio data metrics synced securely to cloud cluster.");

    } catch (error) {
      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const isDark = theme === "dark";

  return (
    <DashboardLayout>
      <div className={`p-8 rounded-2xl border transition-all duration-300 shadow-sm ${
        isDark
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-slate-100 text-slate-900"
      }`}>
        <h2 className="text-2xl font-black mb-6 tracking-tight flex items-center gap-2">
          <User className="w-6 h-6 text-purple-500" />
          Profile Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName")}
            className={`border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition ${
              isDark
                ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500"
                : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500"
            }`}
          />

          <input
            type="text"
            placeholder="Job Title"
            {...register("title")}
            className={`border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition ${
              isDark
                ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500"
                : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500"
            }`}
          />

          <input
            type="text"
            placeholder="Years of Experience (e.g. 5+ Years)"
            {...register("experience")}
            className={`border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition ${
              isDark
                ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500"
                : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500"
            }`}
          />

          <input
            type="email"
            placeholder="Email Address"
            {...register("email")}
            className={`border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition ${
              isDark
                ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500"
                : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500"
            }`}
          />

          <input
            type="text"
            placeholder="Location"
            {...register("location")}
            className={`border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition ${
              isDark
                ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500"
                : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500"
            }`}
          />

          <input
            type="url"
            placeholder="GitHub URL"
            {...register("github")}
            className={`border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition ${
              isDark
                ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500"
                : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500"
            }`}
          />

          <input
            type="url"
            placeholder="LinkedIn URL"
            {...register("linkedin")}
            className={`border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition ${
              isDark
                ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500"
                : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500"
            }`}
          />

          <input
            type="url"
            placeholder="Website URL"
            {...register("website")}
            className={`border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition ${
              isDark
                ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500"
                : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500"
            }`}
          />

          <input
            type="url"
            placeholder="Resume URL (PDF Link)"
            {...register("resume")}
            className={`border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition ${
              isDark
                ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500"
                : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500"
            }`}
          />

          <div className={`col-span-1 md:col-span-2 border rounded-xl p-5 space-y-4 transition ${
            isDark
              ? "bg-slate-950/40 border-slate-800 text-slate-200"
              : "bg-slate-50 border-slate-100 text-slate-800"
          }`}>
            <label className="block text-xs font-bold uppercase tracking-wider flex items-center justify-between">
              <span className={isDark ? "text-slate-300" : "text-slate-600"}>Profile Photo</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setValue("photo", profilepic)}
                  className="text-[11px] text-purple-500 hover:text-purple-400 hover:underline flex items-center gap-1 font-bold focus:outline-none"
                >
                  ✨ Use Asset Photo (profilepic.jpeg)
                </button>
                {watchAllFields.photo && (
                  <button
                    type="button"
                    onClick={removeProfilePhoto}
                    className="text-[11px] text-rose-500 hover:text-rose-400 hover:underline flex items-center gap-1 font-bold focus:outline-none border-l pl-3 border-slate-300/40"
                  >
                    <X className="w-3.5 h-3.5" /> Remove Photo
                  </button>
                )}
              </div>
            </label>

            {watchAllFields.photo ? (
              <div className={`flex items-center gap-4 p-3 rounded-xl border transition ${
                isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
              }`}>
                <img
                  src={watchAllFields.photo}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border shadow"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className={`text-xs font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>Avatar Synced</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">uploaded successfully.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition group ${
                    dragActive
                      ? "border-purple-500 bg-purple-100"
                      : isDark
                      ? "border-slate-800 bg-slate-900/30 hover:border-purple-500 hover:bg-slate-800/10"
                      : "border-slate-200 bg-slate-50/50 hover:border-purple-500 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Upload className="w-5 h-5 text-slate-400 group-hover:text-purple-500 group-hover:scale-110 transition duration-150 mb-1.5" />
                  <span className={`text-xs font-bold ${isDark ? "text-slate-300 group-hover:text-slate-200" : "text-slate-600 group-hover:text-slate-850"}`}>Upload Photo File</span>
                  <span className="text-[10px] text-slate-400 mt-1">Browse computer for photo</span>
                </label>
                {uploadProgress > 0 && (
                  <div className="mt-4 w-full">
                    <div className="flex justify-between text-xs mb-1">
                      <span>
                        {uploadProgress === 100
                          ? "Upload Complete ✅"
                          : "Uploading Image..."}
                      </span>
                      <span>{uploadProgress}%</span>
                    </div>

                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                        style={{
                          width: `${uploadProgress}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col justify-center space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or paste public URL</p>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon className="h-3.5 w-3.5 text-slate-500" />
                    </div>
                    <input
                      type="url"
                      placeholder="https://images.com.c.."
                      value={watchAllFields.photo || ""}
                      onChange={(e) => setValue("photo", e.target.value)}
                      className={`w-full border pl-9 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-mono ${
                        isDark
                          ? "bg-slate-900 border-slate-800 text-white focus:border-purple-500 placeholder-slate-600"
                          : "bg-white border-slate-200 text-slate-900 focus:border-purple-500 placeholder-slate-400"
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <textarea
          placeholder="Write a charming bio for your developer portfolio..."
          {...register("bio")}
          className={`w-full border p-3 rounded-xl mt-4 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition font-sans ${
            isDark
              ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500"
              : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500"
          }`}
          rows="5"
        />

        <div className="mt-6 flex justify-end">
          <button 
            type="button"
            disabled={isSaving}
            onClick={handleSaveProfile}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Syncing Metrics..." : "Save Portfolio"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;