type Props = {
  newPin: string;
  confirmPin: string;
  setNewPin: (value: string) => void;
  setConfirmPin: (value: string) => void;
  savePin: () => void;
};

export default function PinSetup({
  newPin,
  confirmPin,
  setNewPin,
  setConfirmPin,
  savePin,
}: Props) {
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        textAlign: "center",
      }}
    >
      <h2>Create Your PIN</h2>

      <p>This is your first login. Please choose a new 4-digit PIN.</p>

      <input
        type="password"
        placeholder="New PIN"
        value={newPin}
        maxLength={4}
        onChange={(e) => setNewPin(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Confirm PIN"
        value={confirmPin}
        maxLength={4}
        onChange={(e) => setConfirmPin(e.target.value)}
      />

      <br />
      <br />

      <button onClick={savePin}>Save PIN</button>
    </div>
  );
}
