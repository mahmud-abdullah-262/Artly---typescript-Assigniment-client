import { useCurrentSession } from "../../lib/action/useCurrentSession";
import { Mail, Pencil, ShieldCheck, ShieldAlert } from "lucide-react";

const Profile = () => {
  const { user, isPending } = useCurrentSession();

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-text-muted">
        User not found
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-bg-light px-4 py-12">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-bg-card shadow-sm">
        {/* Cover strip */}
        <div className="h-20 bg-gradient-to-r from-primary via-secondary to-accent" />

        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="-mt-10 mb-4 flex justify-center">
            <img
              src={user.image || "/default-avatar.png"}
              alt={user.name}
              className="h-20 w-20 rounded-full border-4 border-bg-card object-cover shadow-md"
            />
          </div>

          {/* Name + email */}
          <div className="text-center">
            <h1 className="text-lg font-semibold text-text-dark">
              {user.name}
            </h1>
            <div className="mt-1 flex items-center justify-center gap-1.5 text-sm text-text-muted">
              <Mail size={14} />
              <span>{user.email}</span>
            </div>
          </div>

          {/* Verification badge */}
          <div className="mt-4 flex justify-center">
            {user.emailVerified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <ShieldCheck size={13} />
                Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <ShieldAlert size={13} />
                Not verified
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="my-5 h-px bg-border" />

          {/* Meta */}
          <div className="space-y-2 text-sm text-text-muted">
            <div className="flex justify-between">
              <span>Joined</span>
              <span className="text-text-dark">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Edit button */}
          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            <Pencil size={15} />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;