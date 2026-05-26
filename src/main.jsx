import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const moods = ["Deep Talk", "Random", "Music", "Gamer", "Healing"];
const quickActions = [
  { icon: "✦", label: "Vibe Match", desc: "Cari vibe cocok" },
  { icon: "🎙", label: "Join Room", desc: "Room aktif" },
  { icon: "🎮", label: "Play Game", desc: "Earn coins" },
  { icon: "◈", label: "Reward", desc: "Claim harian" }
];

const rooms = [
  { icon: "🌙", name: "Midnight Chill", type: "Voice Room", online: "1.2K", accent: "violet" },
  { icon: "🎧", name: "Music Lounge", type: "Live Room", online: "864", accent: "cyan" },
  { icon: "💬", name: "Deep Talk Safe", type: "Comfort Room", online: "527", accent: "pink" },
  { icon: "🎮", name: "Game & Laugh", type: "Mini Party", online: "413", accent: "green" }
];

const people = [
  { name: "Naya", vibe: "Night Talk", status: "Online", level: 12, avatar: "N", tone: "pink" },
  { name: "Zean", vibe: "Gamer", status: "Online", level: 9, avatar: "Z", tone: "cyan" },
  { name: "Mika", vibe: "Music", status: "Live", level: 18, avatar: "M", tone: "violet" }
];

const chats = [
  { name: "Naya", message: "Malam ini join room deep talk?", time: "2m", unread: 2, avatar: "N" },
  { name: "Raka", message: "GG game tadi wkwk", time: "18m", unread: 0, avatar: "R" },
  { name: "Mika", message: "Karaoke room mulai jam 22.00", time: "1h", unread: 1, avatar: "M" }
];

const navItems = [
  { key: "home", label: "Home", icon: "⌂" },
  { key: "match", label: "Match", icon: "✦" },
  { key: "chat", label: "Chat", icon: "○" },
  { key: "room", label: "Room", icon: "🎙" },
  { key: "profile", label: "Profile", icon: "◉" }
];

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const title = useMemo(() => navItems.find((item) => item.key === activeTab)?.label || "Home", [activeTab]);

  return (
    <main className="phone-app">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <AppHeader title={title} />
      <section className="screen">
        {activeTab === "home" && <HomeScreen />}
        {activeTab === "match" && <MatchScreen />}
        {activeTab === "chat" && <ChatScreen />}
        {activeTab === "room" && <RoomScreen />}
        {activeTab === "profile" && <ProfileScreen />}
      </section>
      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </main>
  );
}

function AppHeader({ title }) {
  return (
    <header className="app-header">
      <div className="brand-mini">
        <div className="logo-mini"><span /></div>
        <div>
          <h1>Nooctara</h1>
          <p>{title === "Home" ? "Find Your Night Vibe" : title}</p>
        </div>
      </div>
      <div className="header-actions">
        <button className="coin-pill" aria-label="Coin balance"><span>🪙</span>1,500</button>
        <button className="icon-button" aria-label="Notifications">⌁</button>
      </div>
    </header>
  );
}

function HomeScreen() {
  return (
    <div className="page-stack">
      <section className="tonight-card">
        <div className="card-glow" />
        <p className="eyebrow">Tonight Vibe</p>
        <h2>Lagi pengen vibe apa malam ini?</h2>
        <div className="mood-row">
          {moods.map((mood, index) => <button className={index === 0 ? "mood-chip active" : "mood-chip"} key={mood}>{mood}</button>)}
        </div>
      </section>

      <section className="quick-grid">
        {quickActions.map((action) => (
          <button className="quick-card" key={action.label}>
            <span>{action.icon}</span><strong>{action.label}</strong><small>{action.desc}</small>
          </button>
        ))}
      </section>

      <SectionHeader title="Live Now" action="See all" />
      <div className="horizontal-scroll">{rooms.map((room) => <RoomCard room={room} key={room.name} />)}</div>

      <SectionHeader title="People Near Your Vibe" action="Refresh" />
      <div className="people-row">{people.map((person) => <PersonCard person={person} key={person.name} />)}</div>

      <section className="split-cards">
        <article className="feature-card"><p>Mini Games</p><h3>Truth or Dare malam ini</h3><span>Earn up to 120 coin</span><button>Play</button></article>
        <article className="feature-card reward"><p>Daily Reward</p><h3>Claim 50 coin</h3><span>Streak day 3</span><button>Claim</button></article>
      </section>

      <section className="host-spotlight">
        <div className="host-avatar">M</div>
        <div><p>Top Host Tonight</p><h3>Mika sedang live di Music Lounge</h3><span>427 supporter • Karaoke vibe</span></div>
        <button>Join</button>
      </section>
    </div>
  );
}

function MatchScreen() {
  return (
    <div className="page-stack">
      <section className="match-hero"><p className="eyebrow">Vibe Match</p><h2>Match berdasarkan mood, bukan cuma foto.</h2><button>Start Matching</button></section>
      <div className="filter-cloud">{["Night Talk", "Introvert", "Funny", "Music", "Gamer", "Healing", "Random"].map((tag) => <button key={tag}>{tag}</button>)}</div>
      <div className="match-list">
        {people.map((person) => (
          <article className="match-card" key={person.name}>
            <div className={`profile-orb ${person.tone}`}>{person.avatar}</div>
            <div><h3>{person.name}</h3><p>{person.vibe} • Level {person.level}</p><span>{person.status}</span></div>
            <button>Say Hi</button>
          </article>
        ))}
      </div>
    </div>
  );
}

function ChatScreen() {
  return (
    <div className="page-stack">
      <section className="search-card"><span>⌕</span><input placeholder="Search chat, room, or vibe" /></section>
      <section className="chat-list">
        {chats.map((chat) => (
          <article className="chat-item" key={chat.name}>
            <div className="chat-avatar">{chat.avatar}</div>
            <div><h3>{chat.name}</h3><p>{chat.message}</p></div>
            <aside><span>{chat.time}</span>{chat.unread > 0 && <strong>{chat.unread}</strong>}</aside>
          </article>
        ))}
      </section>
      <section className="ai-helper"><div><p>AI Ice Breaker</p><h3>Bantu mulai obrolan tanpa awkward.</h3></div><button>Try</button></section>
    </div>
  );
}

function RoomScreen() {
  return (
    <div className="page-stack">
      <section className="room-hero"><h2>Rooms</h2><p>Voice, live, games, dan comfort room dalam satu tempat.</p></section>
      <div className="room-category-row">{["All", "Voice", "Live", "Game", "Safe"].map((item, index) => <button className={index === 0 ? "active" : ""} key={item}>{item}</button>)}</div>
      <div className="room-grid-full">{rooms.map((room) => <RoomWideCard room={room} key={room.name} />)}</div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="page-stack">
      <section className="profile-card">
        <div className="profile-main-avatar">A</div><h2>Alex Noct</h2><p>Night Walker • Level 12</p>
        <div className="profile-stats"><span><strong>1,500</strong>Coin</span><span><strong>240</strong>Diamond</span><span><strong>7</strong>Badges</span></div>
      </section>
      <section className="profile-menu">
        {[["◈", "Wallet & Top Up", "Coin, diamond, history"], ["✦", "Reward Center", "Daily mission & streak"], ["♛", "VIP Nooctara", "Glow, boost, premium tools"], ["🎙", "Creator Hub", "Host dashboard & gift stats"], ["⚙", "Settings & Safety", "Privacy, report, block"]].map(([icon, title, desc]) => (
          <button className="profile-row" key={title}><span>{icon}</span><div><strong>{title}</strong><small>{desc}</small></div><em>›</em></button>
        ))}
      </section>
    </div>
  );
}

function SectionHeader({ title, action }) { return <div className="section-header"><h3>{title}</h3><button>{action}</button></div>; }
function RoomCard({ room }) { return <article className={`room-card ${room.accent}`}><div className="room-symbol">{room.icon}</div><p>{room.type}</p><h3>{room.name}</h3><span>🎙 {room.online} online</span><button>Join</button></article>; }
function RoomWideCard({ room }) { return <article className="room-wide-card"><div className={`room-wide-icon ${room.accent}`}>{room.icon}</div><div><h3>{room.name}</h3><p>{room.type} • {room.online} online</p></div><button>Join</button></article>; }
function PersonCard({ person }) { return <article className="person-card"><div className={`profile-orb ${person.tone}`}>{person.avatar}</div><h3>{person.name}</h3><p>{person.vibe}</p><span>{person.status}</span><button>Say Hi</button></article>; }
function BottomNav({ activeTab, onChange }) { return <nav className="bottom-nav" aria-label="Main navigation">{navItems.map((item) => <button className={activeTab === item.key ? "active" : ""} key={item.key} onClick={() => onChange(item.key)}><span>{item.icon}</span><small>{item.label}</small></button>)}</nav>; }

ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
