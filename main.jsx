import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Home, Sparkles, MessageCircle, Mic2, Gamepad2, Wallet,
  User, Gift, Crown, ShieldCheck, Radio, Gem, Trophy, Heart,
  Moon, Search, Bell, Zap, Users, Star, Wand2
} from 'lucide-react';
import './styles.css';

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'match', label: 'Match', icon: Sparkles },
  { id: 'chat', label: 'Chat', icon: MessageCircle },
  { id: 'room', label: 'Room', icon: Mic2 },
  { id: 'games', label: 'Games', icon: Gamepad2 },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'profile', label: 'Profile', icon: User },
];

const people = [
  { name: 'Naya', vibe: 'Night Talk', online: true, score: '96%' },
  { name: 'Zean', vibe: 'Gamer', online: true, score: '91%' },
  { name: 'Mika', vibe: 'Music', online: false, score: '88%' },
];

const rooms = [
  { title: 'Chill Vibes Room', users: '1.2K', type: 'Voice', icon: Mic2 },
  { title: 'Karaoke Party', users: '804', type: 'Live', icon: Radio },
  { title: 'Deep Talk Midnight', users: '559', type: 'Safe', icon: Moon },
];

const games = [
  { title: 'Truth or Dare', reward: '+50 coin', desc: 'Main bareng teman baru.' },
  { title: 'Quiz Vibes', reward: '+40 coin', desc: 'Uji pengetahuan santai.' },
  { title: 'Duo Challenge', reward: '+60 coin', desc: 'Cocokkan vibe berdua.' },
];

const gifts = [
  { name: 'Heart', price: 20, emoji: '💜' },
  { name: 'Rose', price: 60, emoji: '🌹' },
  { name: 'Galaxy', price: 600, emoji: '🌌' },
  { name: 'Dragon', price: 1500, emoji: '🐉' },
];

function LogoMark() {
  return (
    <div className="logoMark" aria-label="Nooctara logo">
      <div className="moonArc" />
      <div className="chatOrb"><span /><span /></div>
      <div className="starOne">✦</div>
    </div>
  );
}

function App() {
  const [active, setActive] = useState('home');
  const ActiveIcon = useMemo(() => tabs.find(t => t.id === active)?.icon || Home, [active]);

  return (
    <main className="appShell">
      <section className="phoneFrame">
        <header className="topbar">
          <div className="brandRow">
            <LogoMark />
            <div>
              <h1>Nooctara</h1>
              <p>Find Your Night Vibe</p>
            </div>
          </div>
          <div className="topActions">
            <Search size={18} />
            <Bell size={18} />
          </div>
        </header>

        <section className="contentArea">
          <div className="pageTitle"><ActiveIcon size={18} /> {tabs.find(t => t.id === active)?.label}</div>
          {active === 'home' && <HomePage />}
          {active === 'match' && <MatchPage />}
          {active === 'chat' && <ChatPage />}
          {active === 'room' && <RoomPage />}
          {active === 'games' && <GamesPage />}
          {active === 'wallet' && <WalletPage />}
          {active === 'profile' && <ProfilePage />}
        </section>

        <nav className="bottomNav">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} className={active === id ? 'active' : ''} onClick={() => setActive(id)}>
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </section>

      <aside className="desktopPanel">
        <div className="heroCard">
          <LogoMark />
          <h2>Nooctara Foundation V1</h2>
          <p>Kerangka social comfort app: chat, vibe match, voice room, mini games, wallet, reward, creator hub, dan profile prestige.</p>
        </div>
        <div className="gridStats">
          <InfoCard icon={Gift} title="Gift Economy" text="Coin untuk gift, border, room effect, boost, sticker, dan mini game bonus." />
          <InfoCard icon={Gem} title="Creator Reward" text="Host dapat diamond dari gift paid coin, payout aman dengan verified creator." />
          <InfoCard icon={ShieldCheck} title="Safe Community" text="Report, block, anti-spam, moderation, dan safety rules sejak awal." />
          <InfoCard icon={Crown} title="VIP Upgrade" text="VIP sebagai enhancement, bukan pemaksaan untuk chat dasar." />
        </div>
        <div className="assetPreview">
          <img src="/assets/nooctara-logo-board.png" alt="Nooctara logo board" />
        </div>
      </aside>
    </main>
  );
}

function InfoCard({ icon: Icon, title, text }) {
  return <div className="infoCard"><Icon size={20}/><h3>{title}</h3><p>{text}</p></div>;
}

function HomePage() {
  return <>
    <div className="welcomeCard">
      <div><p>Good Night, Alex 🌙</p><h2>Temukan vibe baru malam ini.</h2></div>
      <button>Mulai</button>
    </div>
    <h3 className="sectionTitle">Live Spotlight</h3>
    <div className="roomList">{rooms.map((r) => <RoomMini key={r.title} {...r} />)}</div>
    <h3 className="sectionTitle">Recommended for you</h3>
    <div className="peopleGrid">{people.map(p => <PersonCard key={p.name} {...p} />)}</div>
  </>;
}

function MatchPage() {
  const vibes = ['Night Talk', 'Healing', 'Random Chat', 'Gamer', 'Music', 'Deep Talk', 'Funny People', 'Introvert'];
  return <>
    <div className="matchHero"><Wand2 /><h2>Pilih Vibe Kamu</h2><p>AI nanti akan bantu cari teman yang cocok.</p></div>
    <div className="vibeGrid">{vibes.map(v => <button key={v}>{v}</button>)}</div>
    <button className="primaryBtn">Mulai Match ✨</button>
  </>;
}

function ChatPage() {
  return <div className="chatMock">
    <div className="chatHeader"><div className="avatar">N</div><div><h3>Naya</h3><p>Online • Night Talk</p></div></div>
    <div className="bubble left">Hai! Kamu suka dengerin lagu genre apa?</div>
    <div className="bubble right">Aku suka lo-fi sama indie, kamu?</div>
    <div className="bubble left">Wih sama dong 😄</div>
    <div className="composer"><span>Type a message...</span><Gift size={18}/></div>
  </div>;
}

function RoomPage() {
  return <>
    <div className="liveCard"><Radio /><h2>Chill Vibes Room</h2><p>Host, speaker, gift, room effect, dan ranking supporter.</p></div>
    <div className="speakerGrid">{['Host','Mika','Zean','Naya','Raka','Lia'].map(x => <div key={x}><div className="avatar">{x[0]}</div><span>{x}</span></div>)}</div>
    <div className="giftStrip">{gifts.map(g => <button key={g.name}>{g.emoji} {g.price}</button>)}</div>
  </>;
}

function GamesPage() {
  return <div className="gameList">{games.map(g => <div className="gameCard" key={g.title}><Gamepad2 /><div><h3>{g.title}</h3><p>{g.desc}</p></div><strong>{g.reward}</strong></div>)}</div>;
}

function WalletPage() {
  return <>
    <div className="walletCard"><div><p>My Wallet</p><h2>1,500 Coin</h2></div><div><p>Diamond</p><h2>620</h2></div></div>
    <div className="actionGrid"><button>Top Up</button><button>Misi Harian</button><button>Reward</button><button>Creator Hub</button></div>
    <h3 className="sectionTitle">Paket Top Up</h3>
    <div className="priceList">{['Rp25K • 1.500', 'Rp50K • 3.300', 'Rp100K • 7.000'].map(x => <button key={x}>{x}</button>)}</div>
  </>;
}

function ProfilePage() {
  return <div className="profileCard"><div className="bigAvatar">A</div><h2>Alex</h2><p>Level 18 • Night Person • Indonesia</p><div className="badgeRow"><span>🏆 Top Listener</span><span>💎 VIP Preview</span><span>🌙 Night Vibe</span></div><button className="primaryBtn">Edit Profile</button></div>;
}

function RoomMini({ title, users, type, icon: Icon }) {
  return <div className="roomMini"><Icon size={18}/><div><h4>{title}</h4><p>{type} • {users}</p></div></div>;
}

function PersonCard({ name, vibe, online, score }) {
  return <div className="personCard"><div className="avatar">{name[0]}</div><h4>{name}</h4><p>{vibe}</p><span>{online ? 'Online' : 'Away'} • {score}</span></div>;
}

createRoot(document.getElementById('root')).render(<App />);
