import { useNavigate } from "react-router-dom";

interface UserMetadata {
  full_name: string;
  email?: string;
}

interface User {
  user_metadata: UserMetadata;
}

interface Session { // Capitalized interface name
  user: User;
}

interface ProfileProps {
  token: Session | null;
}

export default function Profile({ token }: ProfileProps) {
  if (!token) {
    return <div>No user data available</div>;
  }

  const { full_name, email } = token.user.user_metadata || {}; // Optional chaining

  return (
    <div>
      <h1>Welcome, {full_name || "User"}</h1> {/* Fallback name */}
      {email && <p>Email: {email}</p>}
    </div>
  );
};
