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
  { icon: "✦", label: "Match", action: "match" },
  { icon: "🎙", label: "Room", action: "room" },
  { icon: "🎮", label: "Game", action: "game" },
  { icon: "🎁", label: "Reward", action: "reward" }
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

const profileMenus = [
  ["◈", "Wallet & Top Up", "Coin, diamond, history", "wallet"],
  ["🎁", "Reward Center", "Daily mission & streak", "reward"],
  ["♛", "VIP Nooctara", "Glow, boost, premium tools", "vip"],
  ["🎙", "Creator Hub", "Gift stats & host tools", "creator"],
  ["⚙", "Settings & Safety", "Privacy, report, block", "settings"]
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
  const [panel, setPanel] = useState(null);

  const title = useMemo(
    () => navItems.find((item) => item.key === activeTab)?.label || "Home",
    [activeTab]
  );

  const openPanel = (type, data = {}) => setPanel({ type, ...data });

  const handleQuickAction = (action) => {
    if (action === "match") {
      setActiveTab("match");
      return;
    }
    if (action === "room") {
      setActiveTab("room");
      return;
    }
    if (action === "game") {
      openPanel("game");
      return;
    }
    if (action === "reward") {
      setRewardOpen(true);
    }
  };

  const sayHi = (person) => {
    setActiveTab("chat");
    openPanel("sayHi", { name: person.name, vibe: person.vibe, match: person.match });
  };

  const joinRoom = (room) => {
    setActiveTab("room");
    openPanel("joinRoom", { name: room.title, meta: room.meta, tag: room.tag });
  };

  return (
    <main className="app-frame">
      <div className="glow glow-a" />
      <div className="glow glow-b" />

      <AppHeader title={title} />

      <section className="screen">
        {activeTab === "home" && (
          <HomeScreen
            onReward={() => setRewardOpen(true)}
            onQuickAction={handleQuickAction}
            onSayHi={sayHi}
            onJoinRoom={joinRoom}
            onOpenPanel={openPanel}
          />
        )}
        {activeTab === "match" && <MatchScreen onSayHi={sayHi} onOpenPanel={openPanel} />}
        {activeTab === "chat" && <ChatScreen onOpenPanel={openPanel} />}
        {activeTab === "room" && <RoomScreen onJoinRoom={joinRoom} />}
        {activeTab === "profile" && <ProfileScreen onOpenPanel={openPanel} />}
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
      {panel && <UtilitySheet panel={panel} onClose={() => setPanel(null)} />}

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

function HomeScreen({ onReward, onQuickAction, onSayHi, onJoinRoom, onOpenPanel }) {
  return (
    <div className="stack">
      <section className="stories">
        <button className="story add-story" onClick={() => onOpenPanel("moment")}> 
          <div>+</div>
          <span>Your Vibe</span>
        </button>
        {storyMoments.map((story) => (
          <button className="story" key={story.name} onClick={() => onOpenPanel("momentView", story)}>
            <div className={story.active ? "story-ring active" : "story-ring"}>
              <strong>{story.avatar}</strong>
            </div>
            <span>{story.vibe}</span>
          </button>
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
          <button key={action.label} onClick={() => onQuickAction(action.action)}>
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
            <button onClick={() => onSayHi(person)}>Hi</button>
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
            <button onClick={() => onJoinRoom(room)}>Join</button>
          </article>
        ))}
      </section>

      <section className="mini-panels">
        <article className="mini-panel">
          <div>🎮</div>
          <strong>Mini Games</strong>
          <p>Truth or Dare • Quiz Vibe</p>
          <button onClick={() => onOpenPanel("game")}>Open</button>
        </article>
        <article className="mini-panel host">
          <div>♛</div>
          <strong>Top Host</strong>
          <p>Mika live di Music Lounge</p>
          <button onClick={() => onJoinRoom(rooms[1])}>Join</button>
        </article>
      </section>
    </div>
  );
}

function MatchScreen({ onSayHi, onOpenPanel }) {
  return (
    <div className="stack">
      <section className="hero-glass compact-hero">
        <p>Vibe Match</p>
        <h2>Match berdasarkan mood, minat, dan aktivitas.</h2>
        <button className="primary-btn" onClick={() => onOpenPanel("match")}>Start Matching</button>
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
            <button onClick={() => onSayHi(person)}>Say Hi</button>
          </article>
        ))}
      </section>
    </div>
  );
}

function ChatScreen({ onOpenPanel }) {
  return (
    <div className="stack">
      <section className="search-box">
        <span>⌕</span>
        <input placeholder="Search chat or vibe" />
      </section>

      <section className="chat-list">
        {chats.map((chat) => (
          <article className="chat-row" key={chat.name} onClick={() => onOpenPanel("chat", chat)}>
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
        <button onClick={() => onOpenPanel("iceBreaker")}>Try</button>
      </section>
    </div>
  );
}

function RoomScreen({ onJoinRoom }) {
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
            <button onClick={() => onJoinRoom(room)}>Join</button>
          </article>
        ))}
      </section>
    </div>
  );
}

function ProfileScreen({ onOpenPanel }) {
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
        {profileMenus.map(([icon, title, desc, type]) => (
          <button className="profile-menu-row" key={title} onClick={() => onOpenPanel(type)}>
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

function UtilitySheet({ panel, onClose }) {
  const content = getPanelContent(panel);

  return (
    <div className="sheet-backdrop">
      <section className="reward-sheet utility-sheet">
        <div className="sheet-handle" />
        <button className="sheet-close" onClick={onClose}>×</button>
        <div className="reward-icon">{content.icon}</div>
        <p>{content.label}</p>
        <h2>{content.title}</h2>
        <span>{content.description}</span>
        <div className="utility-grid">
          {content.items.map((item) => (
            <div className="utility-item" key={item.title}>
              <strong>{item.title}</strong>
              <small>{item.desc}</small>
            </div>
          ))}
        </div>
        <button className="claim-btn" onClick={onClose}>{content.primary}</button>
        <button className="later-btn" onClick={onClose}>Close</button>
      </section>
    </div>
  );
}

function getPanelContent(panel) {
  const fallback = {
    icon: "✦",
    label: "Nooctara Preview",
    title: "Fitur ini sudah disiapkan.",
    description: "Ini masih preview frontend. Backend dan Firebase akan masuk di tahap berikutnya.",
    primary: "Got it",
    items: [
      { title: "Preview", desc: "Flow sudah hidup" },
      { title: "Next", desc: "Database nanti" },
      { title: "Safe", desc: "Belum transaksi real" }
    ]
  };

  const panels = {
    game: {
      icon: "🎮",
      label: "Mini Games Hub",
      title: "Main santai sambil cari coin.",
      description: "Game awal: Truth or Dare, Quiz Vibe, Tebak Gambar. Reward tetap pakai daily cap.",
      primary: "Start Preview",
      items: [
        { title: "Truth/Dare", desc: "+30 coin" },
        { title: "Quiz Vibe", desc: "+20 coin" },
        { title: "Daily cap", desc: "Anti farming" }
      ]
    },
    sayHi: {
      icon: "💬",
      label: "Say Hi",
      title: `Mulai chat dengan ${panel.name}.`,
      description: `${panel.vibe || "Vibe"} • ${panel.match || "90%"} match. AI nanti bisa bantu ice breaker biar nggak awkward.`,
      primary: "Open Chat Preview",
      items: [
        { title: "Ice breaker", desc: "Halo, malam ini lagi vibe apa?" },
        { title: "Safe chat", desc: "Report & block siap" },
        { title: "Match reason", desc: "Mood cocok" }
      ]
    },
    joinRoom: {
      icon: "🎙",
      label: "Join Room",
      title: `Masuk ke ${panel.name}.`,
      description: `${panel.tag || "Room"} • ${panel.meta || "Live room"}. Voice/live engine real nanti masuk setelah Firebase/realtime siap.`,
      primary: "Join Preview",
      items: [
        { title: "Mic slots", desc: "Host + guests" },
        { title: "Gift", desc: "Coin support" },
        { title: "Moderation", desc: "Safe room" }
      ]
    },
    wallet: {
      icon: "◈",
      label: "Wallet",
      title: "Coin dan diamond center.",
      description: "Top up, gift history, diamond creator, dan transaksi akan masuk setelah billing/backend.",
      primary: "View Wallet",
      items: [
        { title: "Coin", desc: "1.5K balance" },
        { title: "Diamond", desc: "240 earned" },
        { title: "Top Up", desc: "Later billing" }
      ]
    },
    reward: {
      icon: "🎁",
      label: "Reward Center",
      title: "Daily mission dan streak.",
      description: "Reward gratis tetap ada limit supaya ekonomi coin aman dan nggak bisa difarming brutal.",
      primary: "Open Reward",
      items: [
        { title: "Login", desc: "+50 coin" },
        { title: "Room", desc: "+20 coin" },
        { title: "Games", desc: "+30 coin" }
      ]
    },
    vip: {
      icon: "♛",
      label: "VIP Nooctara",
      title: "VIP sebagai upgrade experience.",
      description: "VIP bukan paywall kasar. Benefit: profile glow, boost, AI premium, room perks.",
      primary: "Preview VIP",
      items: [
        { title: "Glow", desc: "Profile aura" },
        { title: "Boost", desc: "More visibility" },
        { title: "AI", desc: "Premium helper" }
      ]
    },
    creator: {
      icon: "🎙",
      label: "Creator Hub",
      title: "Host dan gift dashboard.",
      description: "Creator payout nanti dibuat aman: verified host, hold balance, dan gift paid-coin saja.",
      primary: "Open Hub",
      items: [
        { title: "Gift", desc: "History" },
        { title: "Diamond", desc: "Earnings" },
        { title: "Withdraw", desc: "Later" }
      ]
    },
    settings: {
      icon: "⚙",
      label: "Safety",
      title: "Settings dan keamanan.",
      description: "Privacy, report, block, anti-spam, dan moderation jadi pondasi wajib app social.",
      primary: "Open Settings",
      items: [
        { title: "Report", desc: "User/room" },
        { title: "Block", desc: "Safety" },
        { title: "Privacy", desc: "Control" }
      ]
    },
    match: {
      icon: "✦",
      label: "Vibe Match",
      title: "Matching bukan cuma foto.",
      description: "Nooctara mempertemukan user dari mood, interest, room behavior, dan chat intent.",
      primary: "Find Match",
      items: [
        { title: "Mood", desc: "Tonight vibe" },
        { title: "Interest", desc: "Music/game" },
        { title: "Score", desc: "Vibe match" }
      ]
    },
    moment: {
      icon: "🌙",
      label: "Vibe Moment",
      title: "Buat story vibe 24 jam.",
      description: "Nanti user bisa upload mood, foto, voice snippet, atau open-chat status.",
      primary: "Create Preview",
      items: [
        { title: "Mood", desc: "Night talk" },
        { title: "Voice", desc: "Snippet" },
        { title: "Open", desc: "Chat intent" }
      ]
    },
    momentView: {
      icon: "🌙",
      label: "Vibe Moment",
      title: `${panel.name || "User"} sedang ${panel.vibe || "aktif"}.`,
      description: "Story row bikin Home terasa hidup tanpa harus jadi feed berat seperti Instagram.",
      primary: "Say Hi",
      items: [
        { title: "Status", desc: panel.active ? "Online" : "Recent" },
        { title: "Vibe", desc: panel.vibe || "Night" },
        { title: "Action", desc: "Chat/room" }
      ]
    },
    chat: {
      icon: "○",
      label: "Chat Preview",
      title: panel.name ? `Chat dengan ${panel.name}` : "Chat preview",
      description: panel.message || "Realtime chat akan dihubungkan ke Firebase/realtime backend nanti.",
      primary: "Reply Preview",
      items: [
        { title: "DM", desc: "Realtime later" },
        { title: "Voice", desc: "Voice note" },
        { title: "Gift", desc: "Small gift" }
      ]
    },
    iceBreaker: {
      icon: "🤖",
      label: "AI Ice Breaker",
      title: "Obrolan lebih gampang dimulai.",
      description: "AI nanti bantu kasih pembuka chat sesuai mood dan vibe, tanpa terasa kaku.",
      primary: "Generate Preview",
      items: [
        { title: "Casual", desc: "Lagi vibe apa?" },
        { title: "Music", desc: "Lagu malam ini?" },
        { title: "Deep", desc: "Random thought?" }
      ]
    }
  };

  return panels[panel.type] || fallback;
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
