import { useState } from "react";

export default function CollaboratorsModal({
  open,
  onClose,
}) {
  const [activeTab, setActiveTab] =
    useState("collaborators");

  const [inviteRole, setInviteRole] =
    useState("Architect");

  if (!open) return null;

  const members = [
    {
      username: "aayush",
      role: "Client",
    },
    {
      username: "john",
      role: "Architect",
    },
    {
      username: "jane",
      role: "Reviewer",
    },
  ];

  const pendingInvites = [
    {
      username: "alex",
      role: "Architect",
    },
    {
      username: "sarah",
      role: "Reviewer",
    },
  ];

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70
        backdrop-blur-sm
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          h-[85vh]
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-950
          shadow-2xl
          overflow-hidden
        "
      >
        <div
          className="
            h-full
            flex
            flex-col
            p-6
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Project Team
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Manage collaborators and invitations.
              </p>
            </div>

            <button
              onClick={onClose}
              className="
                text-zinc-500
                transition
                hover:text-white
              "
            >
              ✕
            </button>
          </div>
          <div
            className="
              flex-1
              overflow-y-auto
              p-3
            "
          >
          {/* Tabs */}
          <div className="mt-6 flex gap-2 rounded-2xl bg-zinc-900 p-1">
            <button
              onClick={() =>
                setActiveTab("collaborators")
              }
              className={`
                flex-1
                rounded-xl
                py-2
                text-sm
                transition

                ${
                  activeTab === "collaborators"
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-500"
                }
              `}
            >
              Collaborators
            </button>

            <button
              onClick={() =>
                setActiveTab("invitations")
              }
              className={`
                flex-1
                rounded-xl
                py-2
                text-sm
                transition

                ${
                  activeTab === "invitations"
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-500"
                }
              `}
            >
              Invitations
            </button>
          </div>

          {/* Collaborators Tab */}
          {activeTab === "collaborators" && (
            <div className="mt-6 space-y-3">
              {members.map((member) => (
                <div
                  key={member.username}
                  className="
                    group
                    flex items-center justify-between
                    rounded-xl
                    border
                    border-zinc-800
                    bg-zinc-900
                    px-4
                    py-3
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex h-10 w-10
                        items-center justify-center
                        rounded-full
                        bg-zinc-800
                        text-sm
                        font-medium
                        text-white
                      "
                    >
                      {member.username[0].toUpperCase()}
                    </div>

                    <div>
                      <p className="text-white">
                        @{member.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className="
                        rounded-full
                        border
                        border-zinc-700
                        px-3
                        py-1
                        text-xs
                        text-zinc-300
                      "
                    >
                      {member.role}
                    </span>

                    {member.role !== "Client" && (
                      <button
                        className="
                          text-sm
                          text-zinc-500
                          opacity-0
                          transition
                          group-hover:opacity-100
                          hover:text-red-400
                        "
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Invitations Tab */}
          {activeTab === "invitations" && (
            <div className="mt-6">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Username
                </label>

                <input
                  placeholder="Enter username"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-zinc-800
                    bg-zinc-900
                    px-4
                    py-3
                    text-white
                    outline-none
                    focus:border-zinc-600
                  "
                />
              </div>

              <div className="mt-5">
                <label className="mb-3 block text-sm text-zinc-400">
                  Assign Role
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {["Architect", "Reviewer"].map(
                    (role) => (
                      <button
                        key={role}
                        onClick={() =>
                          setInviteRole(role)
                        }
                        className={`
                          rounded-2xl
                          border
                          p-4
                          text-left
                          transition

                          ${
                            inviteRole === role
                              ? "border-white bg-zinc-900"
                              : "border-zinc-800 hover:border-zinc-600"
                          }
                        `}
                      >
                        <h4 className="font-medium text-white">
                          {role}
                        </h4>

                        <p className="mt-1 text-xs text-zinc-500">
                          Invite as{" "}
                          {role.toLowerCase()}
                        </p>
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  className="
                    rounded-xl
                    bg-white
                    px-5
                    py-2
                    font-medium
                    text-black
                    hover:bg-zinc-200
                  "
                >
                  Send Invite
                </button>
              </div>

              <div className="mt-8">
                <label className="mb-3 block text-sm text-zinc-400">
                  Pending Invitations
                </label>

                <div className="space-y-3">
                  {pendingInvites.map((invite) => (
                    <div
                      key={invite.username}
                      className="
                        flex items-center justify-between
                        rounded-xl
                        border
                        border-zinc-800
                        bg-zinc-900
                        px-4
                        py-3
                      "
                    >
                      <p className="text-white">
                        @{invite.username}
                      </p>

                      <div className="flex items-center gap-3">
                        <span
                          className="
                            rounded-full
                            border
                            border-zinc-700
                            px-3
                            py-1
                            text-xs
                            text-zinc-300
                          "
                        >
                          {invite.role}
                        </span>

                        <span
                          className="
                            rounded-full
                            border
                            border-amber-500/20
                            bg-amber-500/10
                            px-3
                            py-1
                            text-xs
                            text-amber-400
                          "
                        >
                          Pending
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
