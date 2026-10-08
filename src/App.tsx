import { useMemo, useState, type ReactElement } from 'react';
import { Bell, BookOpen, Bookmark, Camera, ChevronLeft, ChevronRight, CircleUserRound, Heart, Home, MessageCircle, Mic, MoreHorizontal, Paperclip, Plus, Search, Send, Settings, Share2, Sparkles, Star, Users, Video, X } from 'lucide-react';

type View = 'landing' | 'kitchen' | 'search' | 'diary' | 'saved' | 'cookbook' | 'me';
type Person = { name: string; avatar: string; state: string; color: string };
type Recipe = { id: number; person: string; avatar: string; title: string; caption: string; ingredients: string[]; rating: number; likes: number; image: string; book: string; version?: number };

const people: Person[] = [
  { name: 'Maya', avatar: '/assets/maya.png', state: 'making dinner', color: '#e88b7f' },
  { name: 'Theo', avatar: '/assets/theo.png', state: 'down to call', color: '#8d79a7' },
  { name: 'Ari', avatar: '/assets/ari.png', state: 'cooking now', color: '#7ca985' },
  { name: 'Lena', avatar: '/assets/lena.png', state: 'quiet kitchen', color: '#d7a36f' },
  { name: 'Mum', avatar: '/assets/mum.png', state: 'baking', color: '#b88099' },
];

const recipes: Recipe[] = [
  { id: 1, person: 'Maya', avatar: '/assets/maya.png', title: 'Plum, arugula & goat cheese salad', caption: 'the little plums won. planning dinner around them now.', ingredients: ['4 ripe plums', '5 oz arugula', '4 oz goat cheese', 'toasted walnuts', 'olive oil'], rating: 5, likes: 12, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85', book: 'Weeknight comforts' },
  { id: 2, person: 'Theo', avatar: '/assets/theo.png', title: 'Miso butter udon', caption: 'ten minutes, one pan, exactly what tonight needed.', ingredients: ['udon noodles', 'white miso', 'butter', 'scallions'], rating: 4, likes: 18, image: 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?auto=format&fit=crop&w=1200&q=85', book: 'Noodles & rice' },
  { id: 3, person: 'Nicky', avatar: '/assets/nicky.png', title: 'Chocolate chip cookies', caption: 'v10: crisp edges, finally soft in the middle.', ingredients: ['flour', 'brown butter', 'dark chocolate', 'sea salt'], rating: 5, likes: 9, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=85', book: 'Bakes', version: 10 },
];

function Avatar({ person, size = 48 }: { person: Person | { name: string; avatar: string }; size?: number }) {
  return <img className="avatar" src={person.avatar} alt={`${person.name}'s pixel avatar`} style={{ width: size, height: size }} />;
}

function Logo() { return <button className="logo" onClick={() => location.reload()}><span className="logo-mark">♨</span><span>remie</span></button>; }

function Landing() {
  const [phone,setPhone] = useState('');
  const [waitlistNote,setWaitlistNote] = useState('');
  const formUrl = import.meta.env.VITE_WAITLIST_FORM_URL as string | undefined;
  const phoneField = (import.meta.env.VITE_WAITLIST_PHONE_ENTRY as string | undefined) || 'entry.0000000000';
  const joinWaitlist = (event: React.FormEvent<HTMLFormElement>) => {
    if (!/^\+?[\d\s().-]{7,20}$/.test(phone.trim())) {
      event.preventDefault();
      setWaitlistNote('Please enter a valid phone number.');
      return;
    }
    if (!formUrl) {
      event.preventDefault();
      setWaitlistNote('The waitlist connection is being finished now.');
      return;
    }
    setWaitlistNote('You’re on the list. Welcome to the kitchen.');
    window.setTimeout(()=>setPhone(''),250);
  };
  return <main className="landing remie-home">
    <header className="home-nav"><Logo/><nav><a href="#features">Features</a><a href="#how-it-works">How it works</a><a className="home-button home-button-small" href="#waitlist">Join the waitlist</a></nav></header>

    <section className="home-hero">
      <img src="/assets/remie-main-kitchen.png" alt="Friends and family cooking together in the Remie kitchen"/>
      <div className="home-hero-shade"/>
      <div className="home-hero-copy">
        <p className="home-kicker">YOUR PRIVATE KITCHEN CIRCLE</p>
        <h1>Food tastes better<br/>when it brings us home.</h1>
        <p>Remie is the cozy place where your people share recipes, cook together, and keep the stories behind every dish.</p>
        <div className="home-actions"><a className="home-button" href="#waitlist">Join the waitlist <ChevronRight size={18}/></a><a href="#features">See what’s inside</a></div>
      </div>
      <div className="home-trust"><span><i/>Private by default</span><span>Made for your closest people</span></div>
    </section>

    <section className="home-intro">
      <p className="home-kicker">MORE THAN A RECIPE APP</p>
      <h2>A shared kitchen for the people you love.</h2>
      <p>Not another feed to keep up with. Just a warm, useful place to know what everyone is cooking, save what matters, and make meals feel a little more connected.</p>
    </section>

    <section className="home-feature-grid" id="features">
      <article className="feature-large feature-circle">
        <div className="feature-copy"><span className="feature-number">01</span><p className="home-kicker">YOUR KITCHEN CIRCLE</p><h3>See who’s around the table.</h3><p>Set a kitchen mood, peek at what your people are making, and start a quiet call or cook-together session without the group-chat noise.</p><a href="#waitlist">Save me a seat <ChevronRight size={16}/></a></div>
        <div className="circle-preview"><div className="circle-top"><span>Tonight in the kitchen</span><b>4 online</b></div><img src="/assets/classic-cozy.png" alt="A cozy Remie kitchen room"/><div className="circle-people">{people.slice(0,4).map(p=><div key={p.name}><Avatar person={p} size={48}/><span>{p.name}</span></div>)}</div></div>
      </article>

      <article className="feature-card feature-recipes"><span className="feature-number">02</span><BookOpen/><p className="home-kicker">RECIPES WITH A HISTORY</p><h3>Keep every recipe—and every version.</h3><p>Save the original, add the tweaks that worked, and remember who taught you. Your family cookbook gets richer every time you cook.</p><div className="recipe-slip"><small>MUM’S KITCHEN · VERSION 7</small><strong>Sunday tomato sauce</strong><span>“A little more garlic than the card says.”</span></div></article>

      <article className="feature-card feature-personal"><span className="feature-number">03</span><Sparkles/><p className="home-kicker">PERSONAL, NOT GENERIC</p><h3>Recipes that know your table.</h3><p>Remie remembers your preferences, allergies, goals, and skill level—then explains every helpful substitution.</p><div className="preference-row"><span>Gluten-free</span><span>High protein</span><span>No tomato</span></div></article>

      <article className="feature-wide feature-cook">
        <div><span className="feature-number">04</span><p className="home-kicker">COOK TOGETHER</p><h3>Company, right from the counter.</h3><p>Turn any recipe into a shared cooking moment with video, clear steps, timers, voice notes, and hands-free guidance.</p><ul><li><Video size={18}/> Drop-in kitchen calls</li><li><Mic size={18}/> Voice-first cooking help</li><li><Camera size={18}/> Save the finished dish</li></ul></div>
        <div className="cook-call"><div className="call-head"><span><i/> Cooking with Mum</span><small>18:42</small></div><img src="/assets/mum.png" alt="Mum in a Remie cooking call"/><div className="call-step"><small>STEP 3 OF 6</small><strong>Stir gently until glossy.</strong><div><i/><i/><i/></div></div></div>
      </article>
    </section>

    <section className="home-steps" id="how-it-works">
      <div className="steps-heading"><p className="home-kicker">SET THE TABLE IN MINUTES</p><h2>Simple enough for everyone.</h2></div>
      <div className="steps-list"><article><span>1</span><h3>Invite your people</h3><p>Keep your circle small, private, and meaningful.</p></article><article><span>2</span><h3>Bring your recipes</h3><p>Type, paste, photograph, or speak them into Remie.</p></article><article><span>3</span><h3>Cook and remember</h3><p>Share the meal, save the story, improve it next time.</p></article></div>
    </section>

    <section className="home-closing" id="waitlist"><div className="closing-avatars">{people.map(p=><Avatar key={p.name} person={p} size={58}/>)}</div><p className="home-kicker">THERE’S ALWAYS ROOM FOR ONE MORE</p><h2>Save your seat at the table.</h2><p>Be one of the first to bring your people into Remie.</p><form className="waitlist-form" action={formUrl} method="POST" target="waitlist-response" onSubmit={joinWaitlist}><label htmlFor="waitlist-phone">Phone number</label><div><input id="waitlist-phone" name={phoneField} type="tel" autoComplete="tel" inputMode="tel" placeholder="(555) 123-4567" value={phone} onChange={e=>{setPhone(e.target.value);setWaitlistNote('')}} required/><button className="home-button" type="submit">Join the waitlist <ChevronRight size={18}/></button></div><small aria-live="polite">{waitlistNote || 'Just your phone number. No spam, ever.'}</small></form><iframe title="Waitlist form response" name="waitlist-response" className="waitlist-frame"/></section>
    <footer className="home-footer"><Logo/><span>Made for people who feed each other.</span><nav><a href="#features">Features</a><a href="#">Privacy</a></nav></footer>
  </main>;
}

function Nav({ view, setView }: { view: View; setView: (v: View) => void }) {
  const items: [View, string, typeof Home][] = [['kitchen','Kitchen',Home],['search','Search',Search],['diary','Diary',Star],['saved','Saved',Bookmark],['cookbook','Cookbook',BookOpen],['me','Me',CircleUserRound]];
  return <aside className="side-nav"><Logo /><div className="nav-items">{items.map(([id,label,Icon]) => <button key={id} className={view === id ? 'active' : ''} onClick={() => setView(id)}><Icon size={21}/><span>{label}</span></button>)}</div><div className="nav-foot"><Avatar person={{name:'Nicky',avatar:'/assets/nicky.png'}} size={42}/><div><strong>Nicky</strong><small>View profile</small></div><MoreHorizontal size={18}/></div></aside>;
}

function Topbar({ title }: { title: string }) { return <header className="topbar"><div><p className="eyebrow">NICKY'S KITCHEN</p><h1>{title}</h1></div><div><button className="icon-button"><Bell size={20}/><i /></button><button className="icon-button"><Settings size={20}/></button></div></header>; }

function ActionIcons({ liked, saved, onLike, onSave, onComment }: { liked: boolean; saved: boolean; onLike: () => void; onSave: () => void; onComment: () => void }) {
  return <div className="actions"><button onClick={onLike} className={liked?'selected':''}><Heart fill={liked?'currentColor':'none'}/></button><button onClick={onComment}><MessageCircle/></button><button><Send/></button><button onClick={onSave} className={`push ${saved?'selected':''}`}><Bookmark fill={saved?'currentColor':'none'}/></button></div>;
}

function RecipeCard({ recipe, open, saved, toggleSaved }: { recipe: Recipe; open: () => void; saved: boolean; toggleSaved: () => void }) {
  const [liked,setLiked] = useState(false); const [comments,setComments] = useState(false);
  return <article className="recipe-card"><div className="post-head"><Avatar person={{name:recipe.person,avatar:recipe.avatar}}/><div><strong>{recipe.person}</strong><small>45m ago</small></div><span className="stars">{'★'.repeat(recipe.rating)}</span></div><button className="photo-button" onClick={open}><img src={recipe.image} alt={recipe.title}/></button><div className="post-body"><button className="text-open" onClick={open}><h3>{recipe.title}</h3><p>{recipe.caption}</p><div className="chips">{recipe.ingredients.slice(0,3).map(x=><span key={x}>{x}</span>)}{recipe.ingredients.length>3&&<span>+{recipe.ingredients.length-3}</span>}</div><b>View full recipe <ChevronRight size={15}/></b></button><ActionIcons liked={liked} saved={saved} onLike={()=>setLiked(!liked)} onSave={toggleSaved} onComment={()=>setComments(!comments)}/>{comments&&<div className="comment-box"><p><strong>Lena</strong> this looks so cozy</p><div><input placeholder="Add a comment…"/><button><Send size={16}/></button></div></div>}</div></article>;
}

function Kitchen({ openRecipe, openFriend, saved, toggleSaved }: { openRecipe:(r:Recipe)=>void; openFriend:(p:Person)=>void; saved:number[]; toggleSaved:(id:number)=>void }) {
  return <><Topbar title="Welcome home."/><div className="dashboard-grid"><section><div className="status-card"><div><p className="eyebrow">YOUR STATUS</p><h2>Quiet kitchen</h2><p>Here, but doing my own thing.</p></div><button>Edit</button></div><div className="kitchen-room"><img src="/assets/classic-cozy.png" alt="Nicky's pixel kitchen"/>{people.slice(0,4).map((p,i)=><button key={p.name} className={`room-person rp${i}`} onClick={()=>openFriend(p)}><Avatar person={p} size={62}/><span>{p.name}</span></button>)}</div><div className="section-row"><div><p className="eyebrow">YOUR PEOPLE</p><h2>In the kitchen <small>· {people.length}</small></h2></div><button className="round-add"><Plus/></button></div><div className="people-row">{people.map(p=><button key={p.name} onClick={()=>openFriend(p)}><Avatar person={p} size={58}/><span>{p.name}</span><small>{p.state}</small></button>)}</div></section><aside className="feed-column"><div className="section-row"><div><p className="eyebrow">FROM YOUR CIRCLE</p><h2>What’s cooking</h2></div></div>{recipes.slice(0,2).map(r=><RecipeCard key={r.id} recipe={r} open={()=>openRecipe(r)} saved={saved.includes(r.id)} toggleSaved={()=>toggleSaved(r.id)}/>)}</aside></div></>;
}

function SearchPage({ openRecipe }: { openRecipe:(r:Recipe)=>void }) { const [q,setQ]=useState(''); return <><Topbar title="What would feel good?"/><div className="single"><div className="search-hero"><Sparkles/><h2>Tell Remie what you’re craving.</h2><p>Search by mood, ingredient, memory, dietary need, or whose cooking you miss.</p><div className="big-search"><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Japanese protein-rich dinners like my friends make"/><button><ChevronRight/></button></div><div className="prompt-row">{['Something cozy from Mum','High-protein weeknight dinner','Use the mushrooms I have'].map(x=><button onClick={()=>setQ(x)} key={x}>{x}</button>)}</div></div><p className="eyebrow result-label">PERSONAL TO YOUR CIRCLE</p><div className="result-grid">{recipes.filter(r=>!q||(`${r.title} ${r.ingredients}`).toLowerCase().includes(q.toLowerCase().split(' ')[0])).map(r=><button className="result-card" key={r.id} onClick={()=>openRecipe(r)}><img src={r.image}/><div><small>FROM {r.person.toUpperCase()}</small><h3>{r.title}</h3><p>Fits your preferences and comes from someone at your table.</p></div></button>)}</div></div></> }

function Diary({ openRecipe }: { openRecipe:(r:Recipe)=>void }) { const own=recipes[2]; return <><Topbar title="Your diary"/><div className="single narrow"><div className="diary-hero"><div className="utensils">🍴</div><Avatar person={{name:'Nicky',avatar:'/assets/nicky.png'}} size={112}/><h2>Nicky’s Kitchen</h2><p>Meals, experiments, and little things worth remembering.</p></div><button className="add-dish"><Plus/><div><strong>Add your completed dish</strong><small>Finished meal or process photos welcome.</small></div></button><article className="diary-card"><div><small>SEPTEMBER 29 · DINNER</small><span className="stars">★★★★★</span></div><button onClick={()=>openRecipe(own)}><h2>{own.title}</h2></button><img src={own.image}/><p>{own.caption}</p><button className="version"><Sparkles size={16}/> Version {own.version} · See every version <ChevronRight size={16}/></button><div className="actions"><button><Share2/></button><button><Bookmark/></button><button className="edit">Edit entry</button></div></article></div></> }

function Saved({ saved, openRecipe }: { saved:number[]; openRecipe:(r:Recipe)=>void }) { const list=recipes.filter(r=>saved.includes(r.id)); return <><Topbar title="Saved for later"/><div className="single"><p className="page-copy">Recipes from your people, kept close and personalized for you.</p><div className="saved-grid">{list.length?list.map(r=><button className="saved-card" key={r.id} onClick={()=>openRecipe(r)}><img src={r.image}/><div><small>SAVED FROM {r.person.toUpperCase()}</small><h3>{r.title}</h3><p><Sparkles size={14}/> Adapted to your food profile</p></div><ChevronRight/></button>):<div className="empty"><Bookmark/><h3>Nothing saved yet.</h3><p>Bookmark a recipe from your circle and it will live here.</p></div>}</div></div></> }

function Cookbook({ openRecipe }: { openRecipe:(r:Recipe)=>void }) { const [mode,setMode]=useState<'shelf'|'list'>('shelf'); const [query,setQuery]=useState(''); const books=useMemo(()=>['Weeknight comforts','Noodles & rice','Bakes'],[]); return <><Topbar title="My cookbook"/><div className="single"><div className="cookbook-tools"><div className="big-search compact"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search recipes or books…"/></div><button className="add-recipe"><Plus/><span>Add a recipe</span><Mic/><Paperclip/></button><div className="toggle"><button className={mode==='shelf'?'active':''} onClick={()=>setMode('shelf')}>Bookshelf</button><button className={mode==='list'?'active':''} onClick={()=>setMode('list')}>List</button></div></div>{mode==='shelf'?<div className="bookshelf">{books.map((b,i)=><article className={`book b${i}`} key={b}><span>{recipes.filter(r=>r.book===b).length} RECIPES</span><h2>{b}</h2><BookOpen/></article>)}</div>:<div className="book-list">{books.map(b=><section key={b}><div><BookOpen/><h2>{b}</h2><button>Latest added</button></div>{recipes.filter(r=>r.book===b&&r.title.toLowerCase().includes(query.toLowerCase())).map(r=><button key={r.id} onClick={()=>openRecipe(r)}><Sparkles size={16}/><span>{r.title}</span><ChevronRight/></button>)}</section>)}</div>}</div></> }

function Me({ openFriend }: { openFriend:(p:Person)=>void }) { const [editing,setEditing]=useState(false); return <><Topbar title="Nicky’s Kitchen"/><div className="single narrow me"><section className="table-card"><div><p className="eyebrow">YOUR TABLE</p><span>closest people</span><b>5/16</b></div><div className="table-rail">{people.map(p=><button key={p.name} onClick={()=>openFriend(p)}><Avatar person={p} size={58}/><span>{p.name}</span></button>)}<button><i><Plus/></i><span>Add</span></button></div></section><p className="eyebrow standalone">PERSONAL TO YOU</p><h3 className="field-title">Your goals</h3><div className="chips goals"><span>High protein</span><span>Eat more often</span></div><button className="tell"><i>●</i><div className="wave">▂▅▃▇▂</div><strong>Tell Remie</strong><span>Update anything by voice</span></button><section className="profile-section"><div className="profile-heading"><p className="eyebrow">FOOD PROFILE</p><button onClick={()=>setEditing(!editing)}>{editing?'Done':'Edit'}</button></div>{[['Diet','Gluten-free'],['I like','Indian'],['I avoid','Korean · Italian · Japanese'],['Ingredients I avoid','Tomato'],['Allergies','None']].map(([a,b])=><div className="profile-row" key={a}><b>{a}</b>{editing?<input defaultValue={b}/>:<span>{b}</span>}</div>)}</section><section className="profile-section"><div className="profile-heading"><p className="eyebrow">COOKING LEVEL</p><button>Edit</button></div><h3>Just starting · Level 1</h3><div className="level"><i/></div><div className="level-labels"><span>Beginner</span><span>Expert</span></div></section><p className="eyebrow standalone">COMING TO REMIE</p><section className="coming"><h3>Something’s cooking...</h3><div>Partiful ? &nbsp;&nbsp; Luma ?</div><span>🔒 Coming soon</span></section></div></> }

function RecipeModal({ recipe, close }: { recipe:Recipe; close:()=>void }) { const [saved,setSaved]=useState(false); return <div className="modal-backdrop"><article className="detail modal"><header><button onClick={close}><ChevronLeft/></button><div/><button><Share2/></button><button onClick={()=>setSaved(!saved)} className={saved?'selected':''}><Bookmark fill={saved?'currentColor':'none'}/></button></header><div className="detail-grid"><div className="detail-photo"><img src={recipe.image}/><p>FROM {recipe.person.toUpperCase()}’S KITCHEN · ★ {recipe.rating}</p></div><div className="detail-copy"><p className="eyebrow">FULL RECIPE</p><h1>{recipe.title}</h1><p className="lead">{recipe.caption}</p><h3>Ingredients</h3><ul>{recipe.ingredients.map((x,i)=><li key={x}><span>{i+1}</span>{x}</li>)}</ul><h3>How to make it</h3><ol><li>Prepare and measure all ingredients.</li><li>Cook gently, tasting and adjusting as you go.</li><li>Finish, plate, and share with your kitchen circle.</li></ol><aside className="adapt"><Sparkles/><div><strong>Made personal to you</strong><p>Any meaningful substitutions will show the original ingredient, replacement amount, and reason here.</p></div></aside></div></div></article></div> }

function FriendModal({ person, close }: { person:Person; close:()=>void }) { const [poked,setPoked]=useState(false); return <div className="modal-backdrop"><article className="friend-modal modal"><button className="close" onClick={close}><X/></button><Avatar person={person} size={116}/><h1>{person.name}</h1><p className="presence"><i style={{background:person.color}}/>{person.state}</p><div className="friend-actions"><button><Video/>Video call</button><button onClick={()=>setPoked(true)}><Sparkles/>{poked?'Poked!':'Poke'}</button><button><Users/>Cook together</button></div><section><p className="eyebrow">IN {person.name.toUpperCase()}’S KITCHEN</p><h3>Taking it slow and making something warm.</h3></section><section className="compat"><Sparkles/><div><p className="eyebrow">COOKING COMPATIBILITY</p><h3>You + {person.name}</h3><p>You both love comfort food and recipes that leave room to improvise.</p></div></section><button className="explore">View {person.name}’s feed <ChevronRight/></button><button className="explore">View {person.name}’s cookbook <ChevronRight/></button></article></div> }

export default function App() {
  const [view,setView]=useState<View>('landing'); const [selected,setSelected]=useState<Recipe|null>(null); const [friend,setFriend]=useState<Person|null>(null); const [saved,setSaved]=useState<number[]>([1,2]);
  if(view==='landing') return <Landing/>;
  const pages:Record<Exclude<View,'landing'>,ReactElement>={kitchen:<Kitchen openRecipe={setSelected} openFriend={setFriend} saved={saved} toggleSaved={id=>setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id])}/>,search:<SearchPage openRecipe={setSelected}/>,diary:<Diary openRecipe={setSelected}/>,saved:<Saved saved={saved} openRecipe={setSelected}/>,cookbook:<Cookbook openRecipe={setSelected}/>,me:<Me openFriend={setFriend}/>};
  return <div className="app-shell"><Nav view={view} setView={setView}/><main className="app-main">{pages[view]}</main>{selected&&<RecipeModal recipe={selected} close={()=>setSelected(null)}/>} {friend&&<FriendModal person={friend} close={()=>setFriend(null)}/>}</div>;
}
