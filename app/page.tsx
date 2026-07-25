"use client";
import Dashboard from "../components/Dashboard";
import LoginForm from "../components/LoginForm";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Member } from "../types/member";
import PinSetup from "../components/PinSetup";
export default function Home() {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState ("");
  const [pin, setPin] = useState ("");
  const [loggedInMember, setLoggedInMember] = useState<Member | null>(null);
  const [needsPinSetup, setNeedsPinSetup] = useState(false);
  const [firstLoginMember, setFirstLoginMember] = useState<Member | null>(null);
  const [pagesRead, setPagesRead] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState('');
  useEffect(() => {
  async function loadMembers() {
    const { data, error } = await supabase
      .from("members")
      .select("*");

    if (error) {
      console.error(error);
    } else {
      setMembers(data);
      console.log(data);
    }
  }

  loadMembers();
}, []);
async function handleLogin() {
  if (!selectedMember || !pin) {
    alert("Please select your name and enter your PIN.");
    return;
}

  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("id", selectedMember)
    .eq("pin", pin)
    .single();

  if (error || !data) {
    alert("Incorrect PIN.");
    return;
  }

  if (data.pin === "0000") {
    setFirstLoginMember(data);
    setNeedsPinSetup(true);
    return;
  }
  setLoggedInMember(data);
  setCurrentPage(data.last_page);
  }
  async function savePin() {
  if (!firstLoginMember) return;

  if (newPin.length !== 4) {
    alert("PIN must be exactly 4 digits.");
    return;
  }

  if (newPin !== confirmPin) {
    alert("PINs do not match.");
    return;
  }

  const { error } = await supabase
    .from("members")
    .update({ pin: newPin })
    .eq("id", firstLoginMember.id);

  if (error) {
    alert("Failed to save PIN.");
    return;
  }

  alert("PIN saved successfully!");

  const updatedMember = {
    ...firstLoginMember,
    pin: newPin,
  };

  setLoggedInMember(updatedMember);
  setCurrentPage(updatedMember.last_page);
  setNeedsPinSetup(false);
  setFirstLoginMember(null);
  setNewPin("");
  setConfirmPin("");
}
async function saveReading() {
  const today = new Date().toISOString().split("T")[0];
  console.log("Today:", today);
  console.log("Member ID:", loggedInMember.id);

const { data: existingReading } = await supabase
  .from("reading_logs")
  .select("id")
  .eq("member_id", loggedInMember.id)
  .eq("reading_date", today)
  .maybeSingle();
  console.log("Existing reading:", existingReading);

if (existingReading) {
  alert("You have already submitted today's reading.");
  return;
}
    const { error } = await supabase
  .from("reading_logs")
  .insert({
    member_id: loggedInMember.id,
    reading_date:new Date().toISOString().split("T")[0],
    pages_read: pagesRead,
    ending_page: currentPage + pagesRead,
  });

if (error) {
  alert("Failed to save reading.");
  alert(JSON.stringify(error));
  return;
}

alert("Reading saved successfully!");
const newPage = currentPage + pagesRead;

const completedKhatam = newPage > 604;

await supabase
.from("members")
.update({
  last_page: completedKhatam ? 1 : newPage,
  total_pages_read: loggedInMember.total_pages_read + pagesRead,
  khatam_count: completedKhatam
  ? loggedInMember.khatam_count + 1
  : loggedInMember.khatam_count,
})
.eq("id", loggedInMember.id);
setCurrentPage(completedKhatam? 1 : newPage);

  setLoggedInMember({
    ...loggedInMember,
    last_page: completedKhatam ? 1 : newPage,
    total_pages_read:
    loggedInMember.total_pages_read + pagesRead,
    khatam_count: completedKhatam
    ? loggedInMember.khatam_count + 1
    : loggedInMember.khatam_count,
  });

  if (completedKhatam) {
    alert("Masya Allah Ukhti! Congratulations on completing a Khatam!");
  }
}
if (needsPinSetup && firstLoginMember) {
  return (
    <PinSetup
    newPin={newPin}
    confirmPin={confirmPin}
    setNewPin={setNewPin}
    setConfirmPin={setConfirmPin}
    savePin={savePin}
    />
  );
}
if (loggedInMember) {
  return (
    <Dashboard
    loggedInMember={loggedInMember}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
    pagesRead={pagesRead}
    setPagesRead={setPagesRead}
    saveReading={saveReading}
    logout={() => setLoggedInMember(null)}
    />
  );
}
return (
  <main
    style={{
      minHeight: "100vh",
      background: "#F8F6F1",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "450px",
        background: "white",
        borderRadius: "24px",
        padding: "35px",
        boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
      }}
    >
      <h1
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "8px",
          color: "#0F766E",
        }}
      >
        🕌 KIMS Ukhties Quran Journey
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#777",
          marginTop: 0,
          marginBottom: "30px",
        }}
      >
        Growing Together Through the Quran
    </p>

    <p
      style={{
        textAlign: "center",
        color: "#555",
        fontSize: "16px",
        lineHeight: "1,6",
      }}
    >
      Assalamu'alaikum, Ukhties 🌙
      <br />
      Please sign in to continue your Quran Journey.
    </p>


      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "12px",
        }}
      >
        <LoginForm
          members={members}
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
          pin={pin}
          setPin={setPin}
          handleLogin={handleLogin}
        />
      </div>
    </div>
  </main>
);
}