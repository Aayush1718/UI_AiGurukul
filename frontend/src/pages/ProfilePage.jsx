import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [confirmText, setConfirmText] =
    useState("");

  const [profileData, setProfileData] =
    useState({
      name: "Aayush Aggarwal",
      email: "aayush@example.com",
    });

  const initials = profileData.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const handleDeleteAccount = async () => {
    try {
      // await api.delete("/users/me");

      localStorage.clear();
      navigate("/signup");
    } catch (err) {
      console.error(err);
    }
  };

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [passwordData, setPasswordData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const handlePasswordChange = async () => {
    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    try {
      setShowPasswordModal(false);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      alert("Password updated");
    } catch (err) {
      console.error(err);
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
              onClick={() =>
                setShowPasswordModal(true)
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
                  Change Password
                </p>

                <p className="text-sm text-zinc-500">
                  Secure your account
                </p>
              </div>

              <span className="text-zinc-500">
                →
              </span>
            </button>

            <button
              onClick={handleLogout}
              className="
                flex
                w-full
                items-center
                justify-between
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
          </div>
        </div>

        {/* Delete Account */}
        <div className="mt-10">
          <button
            onClick={() =>
              setShowDeleteModal(true)
            }
            className="
              text-sm
              text-red-400
              hover:text-red-300
              transition
            "
          >
            Delete Account
          </button>
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
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      email: e.target.value,
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
                onClick={() =>
                  setShowEditModal(false)
                }
                className="
                  rounded-xl
                  bg-violet-600
                  px-4
                  py-2
                  hover:bg-violet-500
                "
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {showPasswordModal && (
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
              Change Password
            </h2>

            <p className="mt-2 text-zinc-400">
              Choose a strong password to keep
              your account secure.
            </p>

            <div className="mt-6 space-y-4">

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Current Password
                </label>

                <input
                  type="password"
                  value={
                    passwordData.currentPassword
                  }
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword:
                        e.target.value,
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
                  New Password
                </label>

                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword:
                        e.target.value,
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
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={
                    passwordData.confirmPassword
                  }
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword:
                        e.target.value,
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
                onClick={() => {
                  setShowPasswordModal(false);

                  setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
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
                onClick={handlePasswordChange}
                className="
                  rounded-xl
                  bg-violet-600
                  px-4
                  py-2
                  hover:bg-violet-500
                "
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}