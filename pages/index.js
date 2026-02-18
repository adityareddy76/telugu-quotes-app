import { useState } from 'react';
import Head from 'next/head';
import {
  BookOpen, Smile, Heart, Zap, Coffee,
  ArrowLeft, RefreshCw, Share2, Copy,
  Sparkles, MessageCircle, Check
} from 'lucide-react';

const CATEGORIES = [
  { id: 'funny',      label: 'Funny',       teluguLabel: 'హాస్యం',        icon: Smile,    color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', prompt: 'funny and humorous' },
  { id: 'life',       label: 'Life',        teluguLabel: 'జీవిత సత్యాలు', icon: BookOpen, color: '#3B82F6', bg: 'rgba(59,130,246,0.12)', prompt: 'deep life lessons and philosophy' },
  { id: 'motivation', label: 'Motivation',  teluguLabel: 'ప్రేరణ',         icon: Zap,      color: '#F97316', bg: 'rgba(249,115,22,0.12)', prompt: 'motivation, success and hard work' },
  { id: 'love',       label: 'Love',        teluguLabel: 'ప్రేమ',          icon: Heart,    color: '#EF4444', bg: 'rgba(239,68,68,0.12)',  prompt: 'love and relationships' },
  { id: 'friendship', label: 'Friendship',  teluguLabel: 'స్నేహం',         icon: Coffee,   color: '#14B8A6', bg: 'rgba(20,184,166,0.12)', prompt: 'friendship and bonding' },
  { id: 'wisdom',     label: 'Wisdom',      teluguLabel: 'వివేకం',         icon: Sparkles, color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', prompt: 'wisdom and knowledge' },
];

export default function Home() {
  const [view, setView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quoteData, setQuoteData] = useState({ telugu: '', english: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const generateQuote = async (category) => {
    setLoading(true);
    setError('');
    setQuoteData({ telugu: '', english: '' });
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: category.prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setQuoteData({ telugu: data.telugu, english: data.english });
    } catch (err) {
      setError('కోట్ జనరేట్ చేయడంలో సమస్య ఉంది.\nPlease try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setView('quote');
    generateQuote(cat);
  };

  const handleBack = () => {
    setView('home');
    setSelectedCategory(null);
    setQuoteData({ telugu: '', english: '' });
    setError('');
  };

  const copyToClipboard = async () => {
    if (!quoteData.telugu) return;
    await navigator.clipboard.writeText(`${quoteData.telugu}\n\n${quoteData.english}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!quoteData.telugu) return;
    const text = `${quoteData.telugu}\n\n${quoteData.english}`;
    if (navigator.share) {
      await navigator.share({ title: 'Telugu Quote', text });
    } else {
      await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const accent = selectedCategory?.color || '#F97316';

  return (
    <>
      <Head><title>Telugu Quotes AI — తెలుగు కోట్స్</title></Head>
      <style>{`
        .shell {
          min-height: 100vh; background: #0f0f13;
          display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .phone {
          width: 390px; background: #13131a; border-radius: 44px;
          overflow: hidden; display: flex; flex-direction: column;
          min-height: 780px;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 40px 100px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.08);
          position: relative;
        }
        @media (max-width: 430px) {
          .shell { padding: 0; align-items: stretch; }
          .phone { width: 100%; border-radius: 0; min-height: 100vh; box-shadow: none; }
        }
        .notch {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 126px; height: 36px; background: #13131a;
          border-radius: 0 0 22px 22px; z-index: 30;
        }
        /* Header */
        .hdr {
          padding: 50px 22px 18px; display: flex; align-items: center; gap: 10px;
          background: linear-gradient(160deg, #1d1d28 0%, #13131a 100%);
          border-bottom: 1px solid rgba(255,255,255,0.05); flex-shrink: 0; z-index: 10;
        }
        .back-btn {
          width: 36px; height: 36px; border-radius: 11px;
          background: rgba(255,255,255,0.07); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; color: #fff;
          transition: background .2s; flex-shrink: 0;
        }
        .back-btn:hover { background: rgba(255,255,255,0.12); }
        .hdr-mid { flex: 1; text-align: center; }
        .hdr-mid h1 { font-family:'Playfair Display',serif; font-size:17px; color:#fff; font-weight:700; }
        .hdr-mid .sub { font-size:10px; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:.6px; margin-top:2px; }
        .spacer { width: 36px; flex-shrink: 0; }
        /* Body */
        .body { flex: 1; overflow-y: auto; }
        /* Home */
        .intro { padding: 26px 22px 14px; text-align: center; }
        .intro .big { font-family:'Playfair Display',serif; font-size:25px; color:#fff; line-height:1.35; font-weight:700; }
        .intro .big span { background:linear-gradient(90deg,#F97316,#EF4444); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .intro p { font-size:12px; color:rgba(255,255,255,0.35); margin-top:5px; }
        .grid { display:grid; grid-template-columns:1fr 1fr; gap:11px; padding:6px 18px 28px; }
        .cat-card {
          background:#1c1c26; border:1px solid rgba(255,255,255,0.06); border-radius:20px;
          padding:20px 14px; display:flex; flex-direction:column; align-items:center;
          gap:9px; cursor:pointer; text-align:center;
          transition: transform .25s cubic-bezier(.34,1.56,.64,1), border-color .2s;
        }
        .cat-card:hover { transform:scale(0.96); border-color:rgba(255,255,255,0.11); }
        .cat-card:active { transform:scale(0.93); }
        .icon-wrap { width:50px; height:50px; border-radius:15px; display:flex; align-items:center; justify-content:center; transition:transform .3s; }
        .cat-card:hover .icon-wrap { transform: scale(1.1) rotate(-5deg); }
        .tel-label { font-family:'Ramabhadra',sans-serif; font-size:14px; color:#fff; font-weight:600; }
        .en-label { font-size:10px; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:.7px; font-weight:500; }
        /* Quote view */
        .qbody { padding:20px 18px; display:flex; flex-direction:column; gap:16px; min-height: 100%; }
        .cat-pill {
          display:inline-flex; align-items:center; gap:5px;
          padding:5px 13px 5px 9px; border-radius:30px;
          font-size:11px; font-weight:700; align-self:center;
          text-transform:uppercase; letter-spacing:.4px;
        }
        /* Loader */
        .loader { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; padding:60px 0; }
        .ring { width:52px; height:52px; border-radius:50%; border:3px solid rgba(255,255,255,0.07); border-top-color:#F97316; animation:spin .85s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg); } }
        .loader .writ { font-family:'Ramabhadra',sans-serif; font-size:15px; color:rgba(255,255,255,0.55); animation:pulse 1.4s ease-in-out infinite; }
        .loader .sub2 { font-size:12px; color:rgba(255,255,255,0.25); }
        @keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:1} }
        /* Error */
        .err { display:flex; flex-direction:column; align-items:center; gap:14px; padding:50px 0; text-align:center; }
        .err p { color:#f87171; font-size:13px; white-space:pre-line; line-height:1.6; }
        .retry { padding:9px 22px; background:rgba(239,68,68,0.12); border:1px solid rgba(239,68,68,0.25); color:#f87171; border-radius:12px; font-size:13px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; }
        /* Quote card */
        .qcard {
          background:#1c1c26; border:1px solid rgba(255,255,255,0.07); border-radius:24px;
          padding:26px 22px 22px; position:relative; overflow:hidden;
        }
        .accent-bar { position:absolute; top:0; left:0; right:0; height:3px; border-radius:24px 24px 0 0; }
        .bg-icon { position:absolute; bottom:-10px; right:-10px; opacity:.035; pointer-events:none; }
        .open-q { font-family:'Playfair Display',serif; font-size:60px; line-height:.55; display:block; margin-bottom:6px; }
        .tel-quote { font-family:'Ramabhadra',sans-serif; font-size:21px; color:#f0f0f8; line-height:1.75; text-align:center; padding:4px 0 10px; }
        .divider { height:1px; background:rgba(255,255,255,0.06); margin:14px 0; }
        .en-trans { font-size:12px; color:rgba(255,255,255,0.32); text-align:center; font-style:italic; line-height:1.65; }
        .actions { display:flex; justify-content:center; gap:10px; margin-top:18px; padding-top:14px; border-top:1px solid rgba(255,255,255,0.06); }
        .act-btn {
          width:42px; height:42px; border-radius:13px;
          border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.04);
          cursor:pointer; display:flex; align-items:center; justify-content:center;
          color:rgba(255,255,255,0.45); transition:all .2s;
        }
        .act-btn:hover { background:rgba(255,255,255,0.08); color:rgba(255,255,255,0.8); }
        .act-btn.done { color:#4ade80; background:rgba(74,222,128,0.1); border-color:rgba(74,222,128,0.2); }
        /* New quote btn */
        .new-btn {
          width:100%; padding:15px; border-radius:18px; border:none;
          font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700; color:#fff;
          cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
          transition:opacity .2s, transform .15s; letter-spacing:.2px;
        }
        .new-btn:hover { opacity:.88; }
        .new-btn:active { transform:scale(.98); }
        /* Home indicator */
        .home-ind { height:26px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .home-bar { width:120px; height:4px; background:rgba(255,255,255,0.13); border-radius:2px; }
      `}</style>

      <div className="shell">
        <div className="phone">
          <div className="notch" />

          {/* Header */}
          <div className="hdr">
            {view === 'quote'
              ? <button className="back-btn" onClick={handleBack}><ArrowLeft size={17} /></button>
              : <div className="spacer" />}
            <div className="hdr-mid">
              <h1>{view === 'home' ? 'Telugu Quotes AI' : selectedCategory?.teluguLabel}</h1>
              {view === 'home' && <div className="sub">AI Powered · తెలుగు కోట్స్</div>}
            </div>
            <div className="spacer" />
          </div>

          {/* Body */}
          <div className="body">

            {/* HOME */}
            {view === 'home' && (
              <>
                <div className="intro">
                  <div className="big">మీకు <span>ఆనందాన్ని</span><br />అందించే కోట్స్</div>
                  <p>Pick a category to generate a quote</p>
                </div>
                <div className="grid">
                  {CATEGORIES.map(cat => {
                    const Icon = cat.icon;
                    return (
                      <button key={cat.id} className="cat-card" onClick={() => handleCategorySelect(cat)}>
                        <div className="icon-wrap" style={{ background: cat.bg }}>
                          <Icon size={23} color={cat.color} />
                        </div>
                        <div>
                          <div className="tel-label">{cat.teluguLabel}</div>
                          <div className="en-label">{cat.label}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* QUOTE */}
            {view === 'quote' && (
              <div className="qbody">
                {selectedCategory && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="cat-pill" style={{ background: selectedCategory.bg, color: selectedCategory.color }}>
                      {(() => { const I = selectedCategory.icon; return <I size={12} />; })()}
                      {selectedCategory.label}
                    </div>
                  </div>
                )}

                {loading && (
                  <div className="loader">
                    <div className="ring" style={{ borderTopColor: accent }} />
                    <span className="writ">కోట్ రాస్తున్నాం...</span>
                    <span className="sub2">Generating your quote</span>
                  </div>
                )}

                {error && !loading && (
                  <div className="err">
                    <p>{error}</p>
                    <button className="retry" onClick={() => generateQuote(selectedCategory)}>Try Again</button>
                  </div>
                )}

                {!loading && !error && quoteData.telugu && (
                  <>
                    <div className="qcard">
                      <div className="accent-bar" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
                      <div className="bg-icon"><MessageCircle size={110} color="#fff" /></div>

                      <span className="open-q" style={{ color: accent + '44' }}>"</span>
                      <p className="tel-quote">{quoteData.telugu}</p>
                      <div className="divider" />
                      <p className="en-trans">{quoteData.english}</p>

                      <div className="actions">
                        <button className={`act-btn ${copied ? 'done' : ''}`} onClick={copyToClipboard} title="Copy">
                          {copied ? <Check size={17} /> : <Copy size={17} />}
                        </button>
                        <button className={`act-btn ${shared ? 'done' : ''}`} onClick={handleShare} title="Share">
                          {shared ? <Check size={17} /> : <Share2 size={17} />}
                        </button>
                      </div>
                    </div>

                    <button
                      className="new-btn"
                      style={{ background: `linear-gradient(135deg, ${accent}bb, ${accent})` }}
                      onClick={() => generateQuote(selectedCategory)}
                    >
                      <RefreshCw size={16} />
                      మరో కోట్ చూపించు
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="home-ind"><div className="home-bar" /></div>
        </div>
      </div>
    </>
  );
}
