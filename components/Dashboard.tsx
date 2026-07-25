import type { Member } from "../types/member";

type DashboardProps = {
  loggedInMember: Member;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pagesRead: number;
  setPagesRead: (pages: number) => void;
  saveReading: () => void;
  logout: () => void;
};

export default function Dashboard({
  loggedInMember,
  currentPage,
  setCurrentPage,
  pagesRead,
  setPagesRead,
  saveReading,
  logout,
}: DashboardProps) {
  return (
    <main
      style={{
        maxWidth: "450px",
        margin: "40px auto",
        width: "100%",
        boxSizing: "border-box",
        padding: "30px",
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >

<h1
  style={{
    marginBottom: "5px",
    color: "#0F766E",
  }}
>
  🕌 KIMS Ukhties
</h1>

<p
  style={{
    marginTop: 0,
    color: "#666",
    marginBottom: "25px",
  }}
>
  Quran Journey
</p>

      <h2
  style={{
    fontSize: "22px",
    marginBottom: "20px",
  }}
>
  Assalamu'alaikum,
  <br />
  {loggedInMember.name} 🌸
</h2>
      <div
  style={{
    background: "#0F766E",
    color: "white",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "25px",
  }}
>
  <h3 style={{ margin: 0 }}>
    📖 Page {currentPage} / 604
  </h3>

  <div
    style={{
      background: "#ffffff55",
      height: "10px",
      borderRadius: "10px",
      marginTop: "15px",
    }}
  >
    <div
      style={{
        width: `${(currentPage / 604) * 100}%`,
        height: "100%",
        background: "#FFD54F",
        borderRadius: "10px",
      }}
    />
  </div>

  <p style={{ marginTop: "12px", marginBottom: 0 }}>
    {Math.round((currentPage / 604) * 100)}% of current Khatam
  </p>
  <p
  style={{
    marginTop: "8px",
    fontSize: "13px",
    opacity: 0.9,
  }}
  >
    Keep going! Every page brings you closer. 🌿
    </p>
</div>

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "25px",
  }}
>
  <div
    style={{
      flex: 1,
      background: "#F5F5F5",
      padding: "15px",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    <h3 style={{ margin: 0 }}>{loggedInMember.total_pages_read}</h3>
    <small>Total Pages</small>
  </div>

  <div
    style={{
      flex: 1,
      background: "#F5F5F5",
      padding: "15px",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    <h3 style={{ margin: 0 }}>{loggedInMember.khatam_count}</h3>
    <small>Khatam</small>
  </div>
</div>

      <hr style={{ margin: "20px 0" }} />

      <h3>Today's Reading</h3>

      <p>Current Page</p>

      <input
        type="number"
        value={currentPage}
        onChange={(e) => setCurrentPage(Number(e.target.value))}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "15px",
        }}
      />

      <p
      style={{
        fontWeight: "bold",
        marginBottom: "8px",
      }}
      >
        Current Page
      </p>
      
      <input
        type="number"
        value={pagesRead}
        onChange={(e) => setPagesRead(Number(e.target.value))}
        style={{
          padding: "12px",
          width: "100%",
          marginBottom: "18px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={saveReading}
        style={{
          padding: "12px",
          width: "100%",
          background: "#0F766E",
          cursor: "pointer",
          fontWeight: "bold",
          borderRadius: "10px",
          color: "white",
          border: "none",
          fontSize: "16px",
        }}
      >
        Save Today's Reading
      </button>

      <button
        onClick={logout}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "10px",
          background: "transparent",
          border: "1px solid #ccc",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </main>
  );
}