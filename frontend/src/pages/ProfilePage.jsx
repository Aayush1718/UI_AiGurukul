import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogto } from "@logto/react";
import { supabase } from "../lib/supabaseClient";
import Button from "../components/Button.jsx";
import { useUser } from "../context/UserContext";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { signOut } = useLogto();
  const { userName, userEmail, userId, phoneNumber, location, token, isProfileLoaded, refreshProfile } = useUser();

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [confirmText, setConfirmText] =
    useState("");

  const [profileData, setProfileData] =
    useState({
      name: "",
      email: "",
      userId: "",
      phoneNumber: "",
      location: "",
    });

  // Sync from context once loaded
  useEffect(() => {
    if (isProfileLoaded) {
      setProfileData({
        name: userName,
        email: userEmail,
        userId: userId,
        phoneNumber: phoneNumber,
        location: location,
      });
    }
  }, [isProfileLoaded, userName, userEmail, userId, phoneNumber, location]);

  const initials = profileData.name
    ? profileData.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const handleLogout = () => {
    signOut(`${window.location.origin}/`);
  };

  const handleDeleteAccount = async () => {
    try {
      if (profileData.userId) {
        await supabase
          .from("users")
          .delete()
          .eq("user_id", profileData.userId);
      }
      signOut(`${window.location.origin}/`);
    } catch (err) {
      console.error(err);
    }
  };

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    if (!profileData.userId) return;
    if (!token) {
      console.error("No cached token available");
      return;
    }
    try {
      setIsSaving(true);

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: profileData.name,
          phone_number: profileData.phoneNumber,
          location: profileData.location,
          email: profileData.email
        })
      });

      if (!res.ok) throw new Error("Update failed");
      await refreshProfile();
      setShowEditModal(false);
    } catch (err) {
      console.error("Failed to update profile", err);
    } finally {
      setIsSaving(false);
    }
  };





  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="
            mb-8
            text-sm
            text-zinc-400
            hover:text-white
            transition
          "
        >
          ← Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Account Settings
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage your account and preferences.
          </p>
        </div>

        {/* Desktop / Mobile Layout */}
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">

          {/* Profile Card */}
          <div
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              p-8
              h-fit
            "
          >
            <div className="flex flex-col items-center text-center">
              <div
                className="
                  flex
                  h-28
                  w-28
                  items-center
                  justify-center
                  rounded-full
                  bg-violet-600
                  text-4xl
                  font-bold
                "
              >
                {initials}
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                {profileData.name}
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                {profileData.email}
              </p>

              <span
                className="
                  mt-4
                  rounded-full
                  border
                  border-violet-500/30
                  bg-violet-500/10
                  px-3
                  py-1
                  text-xs
                  text-violet-300
                "
              >
                User
              </span>
            </div>
          </div>

          {/* Settings */}
          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
            "
          >
            <button
              onClick={() =>
                setShowEditModal(true)
              }
              className="
                flex
                w-full
                items-center
                justify-between
                border-b
                border-zinc-800
                px-6
                py-6
                hover:bg-zinc-800/50
                transition
              "
            >
              <div className="text-left">
                <p className="font-medium">
                  Edit Profile
                </p>

                <p className="text-sm text-zinc-500">
                  Update your personal information
                </p>
              </div>

              <span className="text-zinc-500">
                →
              </span>
            </button>

            <button
              onClick={() => {
                const endpoint = import.meta.env.VITE_LOGTO_ENDPOINT;
                window.location.href = `${endpoint}${endpoint.endsWith('/') ? '' : '/'}account`;
              }}
              className="
                flex
                w-full
                items-center
                justify-between
                border-b
                border-zinc-800
                px-6
                py-6
                hover:bg-zinc-800/50
                transition
              "
            >
              <div className="text-left">
                <p className="font-medium">
                  Manage Security & Password
                </p>

                <p className="text-sm text-zinc-500">
                  Update password & authentication
                </p>
              </div>

              <span className="text-zinc-500">
                ↗
              </span>
            </button>

            <button
              onClick={handleLogout}
              className="
                flex
                w-full
                items-center
                justify-between
                border-b
                border-zinc-800
                px-6
                py-6
                hover:bg-zinc-800/50
                transition
              "
            >
              <div className="text-left">
                <p className="font-medium">
                  Logout
                </p>

                <p className="text-sm text-zinc-500">
                  Sign out from your account
                </p>
              </div>

              <span className="text-zinc-500">
                →
              </span>
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="
                flex
                w-full
                items-center
                justify-between
                px-6
                py-6
                hover:bg-red-950/20
                transition
                text-red-500
              "
            >
              <div className="text-left">
                <p className="font-medium">
                  Delete Account
                </p>

                <p className="text-sm text-red-500/70">
                  Permanently delete your account and all data
                </p>
              </div>

              <span className="text-red-500/50">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/70
            p-4
          "
        >
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-zinc-800
              bg-[#111111]
              p-6
            "
          >
            <h2 className="text-xl font-semibold">
              Delete Account
            </h2>

            <p className="mt-3 text-zinc-400">
              This action cannot be undone.
              Your projects and account data
              will be permanently deleted.
            </p>

            <p className="mt-5 text-sm text-zinc-500">
              Type{" "}
              <span className="font-semibold text-red-400">
                DELETE
              </span>{" "}
              to continue.
            </p>

            <input
              value={confirmText}
              onChange={(e) =>
                setConfirmText(e.target.value)
              }
              className="
                mt-4
                w-full
                rounded-xl
                border
                border-zinc-800
                bg-zinc-950
                px-4
                py-3
                outline-none
                focus:border-violet-500
              "
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setConfirmText("");
                }}
                className="
                  rounded-xl
                  border
                  border-zinc-800
                  px-4
                  py-2
                "
              >
                Cancel
              </button>

              <button
                disabled={confirmText !== "DELETE"}
                onClick={handleDeleteAccount}
                className="
                  rounded-xl
                  border
                  border-red-900
                  px-4
                  py-2
                  text-red-400
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/70
            p-4
          "
        >
          <div
            className="
              w-full
              max-w-lg
              rounded-3xl
              border
              border-zinc-800
              bg-[#111111]
              p-6
            "
          >
            <h2 className="text-xl font-semibold">
              Edit Profile
            </h2>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Name
                </label>

                <input
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      name: e.target.value,
                    })
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-zinc-800
                    bg-zinc-950
                    px-4
                    py-3
                    outline-none
                    focus:border-violet-500
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Email
                </label>

                <input
                  value={profileData.email}
                  readOnly
                  disabled
                  className="
                    w-full
                    rounded-xl
                    border
                    border-zinc-800
                    bg-zinc-900/50
                    text-zinc-500
                    px-4
                    py-3
                    outline-none
                    cursor-not-allowed
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Phone Number
                </label>

                <input
                  value={profileData.phoneNumber}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-zinc-800
                    bg-zinc-950
                    px-4
                    py-3
                    outline-none
                    focus:border-violet-500
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Location
                </label>

                <input
                  value={profileData.location}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      location: e.target.value,
                    })
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-zinc-800
                    bg-zinc-950
                    px-4
                    py-3
                    outline-none
                    focus:border-violet-500
                  "
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() =>
                  setShowEditModal(false)
                }
                className="
                  rounded-xl
                  border
                  border-zinc-800
                  px-4
                  py-2
                "
              >
                Cancel
              </button>

              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="
                  rounded-xl
                  bg-violet-600
                  px-4
                  py-2
                  hover:bg-violet-500
                  disabled:opacity-50
                "
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}