import type { Member } from "../types/member";

type LoginFormProps = {
  members: Member[];
  selectedMember: string;
  setSelectedMember: (value: string) => void;
  pin: string;
  setPin: (value: string) => void;
  handleLogin: () => void;
};

export default function LoginForm({
  members,
  selectedMember,
  setSelectedMember,
  pin,
  setPin,
  handleLogin,
}: LoginFormProps) {
  return (
    <>
      <h2>Login</h2>

      <select
        value={selectedMember}
        onChange={(e) => setSelectedMember(e.target.value)}
        style={{
          padding: "12px",
          width: "100%",
          borderRadius: "8px",
          fontSize: "16px",
          backgroundColor: "white",
          color: "black",
        }}
      >
        <option value="">Select your name</option>

        {members.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </select>

      <input
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter your 4-digit PIN"
        style={{
          marginTop: "15px",
          padding: "12px",
          width: "100%",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          backgroundColor: "#16a34a",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </>
  );
}