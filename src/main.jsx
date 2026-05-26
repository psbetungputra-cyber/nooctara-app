import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const storyMoments = [
  { name: "Naya", vibe: "Night", avatar: "N", active: true },
  { name: "Mika", vibe: "Music", avatar: "M", active: true },
  { name: "Zean", vibe: "Game", avatar: "Z", active: false },
  { name: "Luna", vibe: "Heal", avatar: "L", active: true },
  { name: "Raka", vibe: "Talk", avatar: "R", active: false }
];

const moods = ["Deep Talk", "Random", "Music", "Gamer", "Healing"];

const quickActions = [
  { icon: "✦", label: "Match" },
  { icon: "🎙", label: "Room" },
  { icon: "🎮", label: "Game" },
  { icon: "🎁", label: "Reward" }
];

const people = [
  { name: "Naya", vibe: "Night Talk", match: "94%", status: "Online", avatar: "N", tone: "pink" },
  { name: "Mika", vibe: "Music", match: "91%", status: "Live", avatar: "M", tone: "violet" },
  { name: "Zean", vibe: "Gamer", match: "88%", status: "Online", avatar: "Z", tone: "cyan" }
];

const rooms = [
  { icon: "🌙", title: "Midnight Chill", meta: "Voice • 1.2K", tag: "Safe Talk" },
  { icon: "🎧", title: "Music Lounge", meta: "Live • 864", tag: "Karaoke" },
  { icon: "🎮", title: "Game & Laugh", meta: "Room • 413", tag: "Party" },
  { icon: "💬", title: "Deep Talk Safe", meta: "Room • 527", tag: "Comfort" }
];

const chats = [
  { name: "Naya", message: "Join room deep talk malam ini?", time: "2m", unread: 2, avatar: "N" },
  { name: "Mika", message: "Karaoke room sudah mulai.", time: "18m", unread: 1, avatar: "M" },
  { name: "Raka", message: "GG game tadi bro haha", time: "1h", unread: 0, avatar: "R" }
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
  const [rewardOpen, setRewardOpen] = useState(false);
  const [giftHidden, setGiftHidden] = useState(false);
  const title = useMemo(
    () => navItems.find((item) => item.key === activeTab)?.label || "Home",
    [activeTab]
  );

  return (
    <main className="app-frame">
      <div className="glow glow-a" />
      <div className="glow glow-b" />

      <AppHeader title={title} />

      <section className="screen">
        {activeTab === "home" && <HomeScreen onReward={() => setRewardOpen(true)} />}
        {activeTab === "match" && <MatchScreen />}
        {activeTab === "chat" && <ChatScreen />}
        {activeTab === "room" && <RoomScreen />}
        {activeTab === "profile" && <ProfileScreen />}
      </section>

      {!giftHidden && (
        <div className="floating-gift-wrap">
          <button className="floating-gift" onClick={() => setRewardOpen(true)} aria-label="Open daily reward">
            <span>🎁</span>
            <em>1</em>
          </button>
          <button className="gift-dismiss" onClick={() => setGiftHidden(true)} aria-label="Hide reward gift">×</button>
        </div>
      )}

      {rewardOpen && <RewardSheet onClose={() => setRewardOpen(false)} />}

      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </main>
  );
}

function AppHeader({ title }) {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-mark"><span /></div>
        <div>
          <h1>Nooctara</h1>
          <p>{title === "Home" ? "Find Your Night Vibe" : title}</p>
        </div>
      </div>

      <div className="header-tools">
        <button className="coin-chip">🪙 1.5K</button>
        <button className="notif-btn">⌁</button>
      </div>
    </header>
  );
}

function HomeScreen({ onReward }) {
  return (
    <div className="stack">
      <section className="stories">
        <div className="story add-story">
          <div>+</div>
          <span>Your Vibe</span>
        </div>
        {storyMoments.map((story) => (
          <div className="story" key={story.name}>
            <div className={story.active ? "story-ring active" : "story-ring"}>
              <strong>{story.avatar}</strong>
            </div>
            <span>{story.vibe}</span>
          </div>
        ))}
      </section>

      <section className="hero-glass">
        <div>
          <p>Tonight Vibe</p>
          <h2>Lagi pengen ngobrol apa malam ini?</h2>
        </div>
        <div className="mood-scroll">
          {moods.map((mood, index) => (
            <button className={index === 0 ? "active" : ""} key={mood}>{mood}</button>
          ))}
        </div>
      </section>

      <section className="quick-strip">
        {quickActions.map((action) => (
          <button key={action.label} onClick={action.label === "Reward" ? onReward : undefined}>
            <span>{action.icon}</span>
            <small>{action.label}</small>
          </button>
        ))}
      </section>

      <SectionTitle title="People Near Your Vibe" action="Refresh" />
      <section className="people-compact">
        {people.map((person) => (
          <article className="person-compact" key={person.name}>
            <div className={`avatar ${person.tone}`}>{person.avatar}</div>
            <div>
              <h3>{person.name}</h3>
              <p>{person.vibe} • {person.match} match</p>
              <span>{person.status}</span>
            </div>
            <button>Hi</button>
          </article>
        ))}
      </section>

      <SectionTitle title="Live Rooms" action="See all" />
      <section className="room-scroll">
        {rooms.map((room) => (
          <article className="room-mini" key={room.title}>
            <div className="room-icon">{room.icon}</div>
            <span>{room.tag}</span>
            <h3>{room.title}</h3>
            <p>{room.meta}</p>
            <button>Join</button>
          </article>
        ))}
      </section>

      <section className="mini-panels">
        <article className="mini-panel">
          <div>🎮</div>
          <strong>Mini Games</strong>
          <p>Truth or Dare • Quiz Vibe</p>
        </article>
        <article className="mini-panel host">
          <div>♛</div>
          <strong>Top Host</strong>
          <p>Mika live di Music Lounge</p>
        </article>
      </section>
    </div>
  );
}

function MatchScreen() {
  return (
    <div className="stack">
      <section className="hero-glass compact-hero">
        <p>Vibe Match</p>
        <h2>Match berdasarkan mood, minat, dan aktivitas.</h2>
        <button className="primary-btn">Start Matching</button>
      </section>

      <section className="tag-cloud">
        {["Night Talk", "Introvert", "Funny", "Music", "Gamer", "Healing", "Random"].map((tag, index) => (
          <button className={index === 0 ? "active" : ""} key={tag}>{tag}</button>
        ))}
      </section>

      <section className="people-compact">
        {people.map((person) => (
          <article className="person-compact large" key={person.name}>
            <div className={`avatar ${person.tone}`}>{person.avatar}</div>
            <div>
              <h3>{person.name}</h3>
              <p>{person.vibe} • {person.match} Vibe Match</p>
              <span>{person.status}</span>
            </div>
            <button>Say Hi</button>
          </article>
        ))}
      </section>
    </div>
  );
}

function ChatScreen() {
  return (
    <div className="stack">
      <section className="search-box">
        <span>⌕</span>
        <input placeholder="Search chat or vibe" />
      </section>

      <section className="chat-list">
        {chats.map((chat) => (
          <article className="chat-row" key={chat.name}>
            <div className="avatar cyan">{chat.avatar}</div>
            <div>
              <h3>{chat.name}</h3>
              <p>{chat.message}</p>
            </div>
            <aside>
              <span>{chat.time}</span>
              {chat.unread > 0 && <strong>{chat.unread}</strong>}
            </aside>
          </article>
        ))}
      </section>

      <section className="soft-banner">
        <div>
          <p>AI Ice Breaker</p>
          <h3>Buka obrolan tanpa awkward.</h3>
        </div>
        <button>Try</button>
      </section>
    </div>
  );
}

function RoomScreen() {
  return (
    <div className="stack">
      <section className="tag-cloud room-tags">
        {["All", "Voice", "Live", "Game", "Safe"].map((tag, index) => (
          <button className={index === 0 ? "active" : ""} key={tag}>{tag}</button>
        ))}
      </section>

      <section className="room-list">
        {rooms.map((room) => (
          <article className="room-wide" key={room.title}>
            <div className="room-icon">{room.icon}</div>
            <div>
              <h3>{room.title}</h3>
              <p>{room.tag} • {room.meta}</p>
            </div>
            <button>Join</button>
          </article>
        ))}
      </section>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="stack">
      <section className="profile-card">
        <div className="profile-orb">A</div>
        <h2>Alex Noct</h2>
        <p>Night Walker • Level 12</p>
        <div className="stats">
          <span><strong>1.5K</strong>Coin</span>
          <span><strong>240</strong>Diamond</span>
          <span><strong>7</strong>Badge</span>
        </div>
      </section>

      <section className="profile-menu">
        {[
          ["◈", "Wallet & Top Up", "Coin, diamond, history"],
          ["🎁", "Reward Center", "Daily mission & streak"],
          ["♛", "VIP Nooctara", "Glow, boost, premium tools"],
          ["🎙", "Creator Hub", "Gift stats & host tools"],
          ["⚙", "Settings & Safety", "Privacy, report, block"]
        ].map(([icon, title, desc]) => (
          <button className="profile-menu-row" key={title}>
            <span>{icon}</span>
            <div>
              <strong>{title}</strong>
              <small>{desc}</small>
            </div>
            <em>›</em>
          </button>
        ))}
      </section>
    </div>
  );
}

function RewardSheet({ onClose }) {
  return (
    <div className="sheet-backdrop">
      <section className="reward-sheet">
        <div className="sheet-handle" />
        <button className="sheet-close" onClick={onClose}>×</button>
        <div className="reward-icon">🎁</div>
        <p>Daily Reward</p>
        <h2>Claim 50 coin hari ini</h2>
        <span>Streak Day 3 • Bonus besar di Day 7</span>
        <div className="mission-list">
          <div><strong>+20</strong><small>Join room 5 menit</small></div>
          <div><strong>+30</strong><small>Main mini game</small></div>
          <div><strong>+15</strong><small>Kirim 3 chat sehat</small></div>
        </div>
        <button className="claim-btn" onClick={onClose}>Claim Now</button>
        <button className="later-btn" onClick={onClose}>Later</button>
      </section>
    </div>
  );
}

function SectionTitle({ title, action }) {
  return (
    <div className="section-title">
      <h3>{title}</h3>
      <button>{action}</button>
    </div>
  );
}

function BottomNav({ activeTab, onChange }) {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          className={activeTab === item.key ? "active" : ""}
          key={item.key}
          onClick={() => onChange(item.key)}
        >
          <span>{item.icon}</span>
          <small>{item.label}</small>
        </button>
      ))}
    </nav>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
