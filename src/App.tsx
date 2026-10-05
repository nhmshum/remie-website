import { useEffect, useMemo, useRef, useState, type ReactElement } from 'react';
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

function Landing({ enter }: { enter: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const worldRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const scenes = [
    { label:'Welcome home', eyebrow:'YOUR PEOPLE · YOUR RECIPES', title:'Good food.\nYour people.\nA little closer.', body:'A cozy place to cook, share, and keep up with the people you love.' },
    { label:'The kitchen', eyebrow:'A PRIVATE PLACE TO GATHER', title:'Always a seat\nat the table.', body:'Your closest people, together in one warm little kitchen—wherever they are.' },
    { label:'Family recipes', eyebrow:'KEEP WHAT MATTERS', title:'Recipes with\na story.', body:'Save the family favorites, every handwritten note, and the version that finally felt right.' },
    { label:'Cook together', eyebrow:'LESS SCROLLING · MORE SUPPER', title:'Make the everyday\nfeel together.', body:'Share what’s cooking, call from the counter, and celebrate the small wins.' },
    { label:'Come on in', eyebrow:'YOUR KITCHEN IS WAITING', title:'Pull up\na chair.', body:'Your people. Your recipes. Your little corner of home.', cta:true },
  ];
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const world = worldRef.current, video = videoRef.current;
      if (!world || !video) return;
      const max = world.offsetHeight - innerHeight;
      const progress = Math.max(0, Math.min(1, -world.getBoundingClientRect().top / Math.max(1, max)));
      const next = Math.min(scenes.length - 1, Math.floor(progress * scenes.length));
      setActive(next);
      if (video.duration && Number.isFinite(video.duration)) {
        const target = progress * Math.max(0, video.duration - .05);
        if (Math.abs(video.currentTime - target) > .025) video.currentTime = target;
      }
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    addEventListener('scroll', onScroll, { passive:true }); addEventListener('resize', onScroll); update();
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return <main className="landing scroll-landing">
    <header className="marketing-nav world-nav"><Logo /><nav><button className="world-sound" aria-label="Scroll to explore">Scroll to explore ↓</button><button className="button small" onClick={enter}>Enter Remie</button></nav></header>
    <section className="scroll-world" ref={worldRef}>
      <div className="world-stage">
        <img className="world-poster" src="/assets/remie-main-kitchen.png" alt="The Remie kitchen world"/>
        <video ref={videoRef} className="world-video" muted playsInline preload="auto" poster="/assets/remie-main-kitchen.png" aria-hidden="true"><source src="/assets/video/remie-scroll.mp4" type="video/mp4"/></video>
        <div className="world-vignette"/>
        <div className="world-copy" key={active}><p>{scenes[active].eyebrow}</p><h1>{scenes[active].title.split('\n').map((line,i)=><span key={i}>{line}</span>)}</h1><div className="world-body"><p>{scenes[active].body}</p>{scenes[active].cta&&<button onClick={enter}>Come into the kitchen <ChevronRight size={18}/></button>}</div></div>
        <div className="world-route">{scenes.map((scene,i)=><button key={scene.label} className={i===active?'active':''} onClick={()=>scrollTo({top:(worldRef.current?.offsetTop||0)+(i/(scenes.length-1))*((worldRef.current?.offsetHeight||innerHeight)-innerHeight),behavior:'smooth'})}><i/><span>{scene.label}</span></button>)}</div>
        <div className="world-progress"><i style={{width:`${((active+1)/scenes.length)*100}%`}}/></div>
      </div>
    </section>
    <section className="world-after"><p className="eyebrow">REMiE IS FOR REAL LIFE</p><h2>Less scrolling.<br/>More supper.</h2><div><span>🍲 Cook something good.</span><span>📜 Save the family favorites.</span><span>♥ Keep your people close.</span></div><button onClick={enter}>Explore the working demo <ChevronRight size={18}/></button></section>
    <footer className="marketing-footer"><Logo/><span>Made for people who feed each other.</span><nav><a href="#">Privacy</a><a href="#">Instagram</a></nav></footer>
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
  if(view==='landing') return <Landing enter={()=>setView('kitchen')}/>;
  const pages:Record<Exclude<View,'landing'>,ReactElement>={kitchen:<Kitchen openRecipe={setSelected} openFriend={setFriend} saved={saved} toggleSaved={id=>setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id])}/>,search:<SearchPage openRecipe={setSelected}/>,diary:<Diary openRecipe={setSelected}/>,saved:<Saved saved={saved} openRecipe={setSelected}/>,cookbook:<Cookbook openRecipe={setSelected}/>,me:<Me openFriend={setFriend}/>};
  return <div className="app-shell"><Nav view={view} setView={setView}/><main className="app-main">{pages[view]}</main>{selected&&<RecipeModal recipe={selected} close={()=>setSelected(null)}/>} {friend&&<FriendModal person={friend} close={()=>setFriend(null)}/>}</div>;
}
