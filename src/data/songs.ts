export interface Song {
  id: string;
  slug: string;
  trackNumber: number;
  title: string;
  artist: string;
  artwork: string;
  duration: number; // in seconds
  audioSrc: string; // Master audio file stream endpoint
  hasMasterAudio: boolean; // Explicit indicator of whether master audio is verified
  audioFormat?: string; // e.g. "MP3 (320 kbps)"
  fileSize?: string; // e.g. "8.5 MB"
  downloadUrl?: string; // Verified direct download endpoint if available
  notes: string;
  year?: string;
  lyrics?: string;
}

export const SONGS_CATALOG: Song[] = [
  {
    id: "part-time-life",
    slug: "part-time-life",
    trackNumber: 1,
    title: "Part Time Life",
    artist: "Unbroken Kraft",
    artwork: "/images/part-time-life-cover.jpg",
    duration: 363,
    audioSrc: "/audio/unbroken-kraft-part-time-life.mp3",
    hasMasterAudio: true,
    audioFormat: "Lossless Master WAV (24-bit / 48kHz)",
    fileSize: "61.2 MB",
    downloadUrl: "https://github.com/utkarshkumar2207/unbroken-kraft/releases/download/v1.0.0/UNBROKEN.KRAFT.-.Part.Time.Life.wav",
    notes: "A reflection on the balance between daily necessity and creative devotion. Guitars layered over driving pulse.",
    year: "2026",
    lyrics: `I look around
What I can see
Just paintings
Beauty everywhere
And every scene
There is no soul
There is no being
There is no face
That I see who can feel

My golden hands
But golden cuffs
The golden prison
That we live in and rust
Slaving is real
Look in the mirror
We are the ones
Caging us in twenty-first
Alone

You and me
We all live the same
On the borderline
There is nothing to gain and
I cannot help but try
So I face everything I know
That I can never win
Gave up who I was inside
To take it on the chin

Because everything is forced
And I’m living on the side
That is everyone I know
And I am living part time
Everything is forced now I
I can’t see myself
When I stand in the crowd
I can’t be myself
I hate eating the cheese
But I repeat myself
I can’t think
Everything is forced

Slow down
I can’t feel my legs running
Show downs
Every moment I’m running
Empty towns
Lot of faces just for show
Trending sounds
But the art is feeling low
Slowing down
I can’t think of myself now
I’m proud
So I think about the times

Because everything is forced
And I’m living on the side
That is everyone I know
And I am living part time
Everything is forced now I
I can’t see myself
When I stand in the crowd
I can’t be myself
I hate eating the cheese
But I repeat myself
I can’t think
Everything is forced`
  },
  {
    id: "never-going-home",
    slug: "never-going-home",
    trackNumber: 2,
    title: "Never Going Home",
    artist: "Unbroken Kraft",
    artwork: "/images/never-going-home-cover.jpg",
    duration: 229,
    audioSrc: "/audio/unbroken-kraft-never-going-home.mp3",
    hasMasterAudio: true,
    audioFormat: "WAV Master (Lossless)",
    fileSize: "209.6 MB",
    downloadUrl: "https://github.com/utkarshkumar2207/unbroken-kraft/releases/download/v1.0.0/UNBROKEN.KRAFT.-.Never.Going.Home.wav",
    notes: "Driving alternative rock exploration of transitions, forward momentum, and irrevocable choices.",
    year: "2026",
    lyrics: `I fight again just to let you win
I can time myself to never let you win
I let go
‘cus I can let go
I hold myself I never let me in
I feel cold again I cannot let me win
I let go
‘cus I can let go

So I broke all the walls again
I run till I fall again
Don't mind me
I feel like a freak
But I made all the walls again
I feel like I'm lost again
Don't mind me
I feel like a freak

Never going home never going
I'm never going
Never going home never going
I'm never going
Never going home never going
I'm never going
Never going home never going
Never going home never going
I'm never going
Never going home never going
I'm never going
Never going home never going
I'm never going
Never going home never going

So I broke all the walls again
I run till I fall again
Don't mind me
I feel like a freak
But I made all the walls again
I feel like I'm lost again
Don't mind me
I feel like a freak

So I broke all the walls again
I run till I fall again
Don't mind me
I feel like a freak
But I made all the walls again
I feel like I'm lost again
Don't mind me
I feel like a freak`
  },
  {
    id: "falling-down",
    slug: "falling-down",
    trackNumber: 3,
    title: "Falling Down",
    artist: "Unbroken Kraft",
    artwork: "/images/falling-down-cover.jpg",
    duration: 247,
    audioSrc: "/audio/unbroken-kraft-falling-down.mp3",
    hasMasterAudio: true,
    audioFormat: "WAV Master (Lossless)",
    fileSize: "225.8 MB",
    downloadUrl: "https://github.com/utkarshkumar2207/unbroken-kraft/releases/download/v1.0.0/UNBROKEN.KRAFT.-.Falling.Down.wav",
    notes: "Raw guitars, contemplative vocal textures, and honest confrontation with vulnerability.",
    year: "2026",
    lyrics: `Yeah
So I’m goin’
So I’m

Shit I’m fixing this
Missing hits and I’m down
So I’m feeling mixed
No more
I’m losing in the finale
Blood filling up alleys
No one here to tally
No
I'm trying to play the part
But I break apart
I don’t make the cards

Can’t see my eyes filled
With blood and I’m falling down
And I can feel
This hate
Will keep me
On the ground
I can’t see
What is real
I’m confused
And I’m falling down

Shit
Yeah
Shit I’m feeling mixed
Losing my grip
I’m trying but the future fixed
There’s no
There’s no symbol of strength
Can’t defend so much hate
Maybe I need to bend
But I
But I can’t lose this time
The struggle don’t define
The future change in line

Can’t see my eyes filled
With blood and I’m falling down
And I can feel
This hate
Will keep me
On the ground
I can’t see
What is real
I’m confused
And I’m falling down

Maybe there is no meaning to life
We’re stuck finding things
That probably don’t exist
Maybe the only thing constant
Is the struggle
It’s the pain
Wait
Maybe the meaning of life
Is pain
Yeah
It’s the pain
Embrace the pain
Now
There’s nothing
To gain
There’s nothing
Don’t strain your brain
Let it go
Let it go

I can’t see
What is real
I’m confused
And I’m falling down`
  },
  {
    id: "fight-the-system",
    slug: "fight-the-system",
    trackNumber: 4,
    title: "Fight the System",
    artist: "Unbroken Kraft",
    artwork: "/images/fight-the-system-cover.jpg",
    duration: 265,
    audioSrc: "/audio/unbroken-kraft-fight-the-system.mp3",
    hasMasterAudio: true,
    audioFormat: "WAV Master (Lossless)",
    fileSize: "243.3 MB",
    downloadUrl: "https://github.com/utkarshkumar2207/unbroken-kraft/releases/download/v1.0.0/UNBROKEN.KRAFT.-.Fight.the.System.wav",
    notes: "Energetic rebellion against corporate homogeneity and formulaic expectations.",
    year: "2026",
    lyrics: `Run for your life I’m coming back now
I said run for your life I'm coming back now
I got five more with me we’re burning up grounds
This war
Now
You can feel all the rage that's coming out now
You can see all the flame that's burning you down
Revenge is a dish that’s best served hot
This is war
Now

Now I'm blinded by neon lights again
Now I can't see my future bright again

So let me go
I go
I cannot live in this hole
I go
To far extremes just to kill
The cog
And all its links
So I fight
I fight
I fight
I fight the system
So I can go fight the system
So I can go and kill the system
Now I go and fight the system
The system
The system

Go run and hide I'm coming for you now
I said go run and hide I'm coming for you now
No more slave of the tech I'm hunting you down
This is war
Now
You can’t win stop trying there's no more routes
No more tricks up your sleeves there's no one around
You can't save all this shit it's too late now
This is war
Now

Now I'm blinded by neon lights again
Now I can't see my future bright again

So let me go
I go
I cannot live in this hole
I go
To far extremes just to kill
The cog
And all its links
So I fight
I fight
I fight
I fight the system
So I can go fight the system
So I can go and kill the system
Now I go and fight the system
The system
The system

All this time I was lied
I can’t see what is right
I can't feel pain tonight
I know I have to fight

So let me go
I go
I cannot live in this hole
I go
To far extremes just to kill
The cog
And all its links
So I fight
I fight
I fight
I fight the system
So I can go fight the system
So I can go and kill the system
Now I go and fight the system
The system
The system`
  },
  {
    id: "wont-let-go",
    slug: "wont-let-go",
    trackNumber: 5,
    title: "Won't Let Go",
    artist: "Unbroken Kraft",
    artwork: "/images/wont-let-go-cover.jpg",
    duration: 250,
    audioSrc: "/audio/unbroken-kraft-wont-let-go.mp3",
    hasMasterAudio: true,
    audioFormat: "WAV Master (Lossless)",
    fileSize: "229.1 MB",
    downloadUrl: "https://github.com/utkarshkumar2207/unbroken-kraft/releases/download/v1.0.0/UNBROKEN.KRAFT.-.Won.t.Let.Go.wav",
    notes: "A steady, enduring anthem of creative perseverance through quiet solitude.",
    year: "2026",
    lyrics: `I’m not fine
I can't see myself
I can't hear your voice
I can't smell this life
Anymore
Anymore
Anymore
All this time
I can't feel my limbs
I can't feel my skin
I can't reach my dreams
I can't smell this life
Anymore
Anymore
Anymore

Can’t even fight this shit
Can't even think can't even breathe
Can’t even dive this pit
Can't even try risk it
I’ma fake my grit but I won't take shit
Whole life mistake and I ache
My head drive’s displaced
And I waste my time every day

Still I’m building back up
But I can only try so hard
I'm feeling my lungs
Giving up now feels right
But I won't let go
I won't let go

Static in my ways
Noble souls are gone
And all I see
Is artificial life
All the lights are gone

Now I'm gonna fight this shit
I don't really see how can I be
I cannot stop this guilt
I'm gonna mark this trip
Gonna use my gift till i won't exist
Whole life I lied to myself
My head thought I'm fine but I yelled
Called quits every time

Still I’m building back up
But I can only try so hard
I'm feeling my lungs
Giving up now feels right
But I won't let go
I won't let go

Still I’m building back up
But I can only try so hard
I'm feeling my lungs
Giving up now feels right
But I won't let go
I won't let go
‘cus I'm building back up
I can try hard
But my lungs
I won't give up`
  },
  {
    id: "leave-me",
    slug: "leave-me",
    trackNumber: 6,
    title: "Leave Me",
    artist: "Unbroken Kraft",
    artwork: "/images/leave-me-cover.jpg",
    duration: 260,
    audioSrc: "/audio/unbroken-kraft-leave-me.mp3",
    hasMasterAudio: true,
    audioFormat: "WAV Master (Lossless)",
    fileSize: "238.5 MB",
    downloadUrl: "https://github.com/utkarshkumar2207/unbroken-kraft/releases/download/v1.0.0/UNBROKEN.KRAFT.-.Leave.Me.wav",
    notes: "Sparse, intimate sonic atmosphere exploring the boundary between isolation and sanctuary.",
    year: "2026",
    lyrics: `Leave me I can’t be with you
(I know I know)
Believe me I can’t continue
(I know I know)
I’m left with no choice in this life
I’ve lived in the dark with no light

So leave me
Ugh
Now
Leave me
Now

Leave me I can’t compensate
For the things you did to me
You made me what I am today
Don’t come and talk to me
Let me go you can’t feel the pain I feel
No I don’t think these feelings time can heal

So leave me
Ugh
Now
Leave me
Now

Don’t say things that you don’t mean
That you don’t think
And you don’t feel
Maybe I’m done this time
I’ll try again
Hope I survive

Leave me
Ugh
Now
Leave me
Now`
  },
  {
    id: "love-me-no-more",
    slug: "love-me-no-more",
    trackNumber: 7,
    title: "Love Me No More",
    artist: "Unbroken Kraft",
    artwork: "/images/love-me-no-more-cover.jpg",
    duration: 180,
    audioSrc: "/audio/unbroken-kraft-love-me-no-more.mp3",
    hasMasterAudio: true,
    audioFormat: "WAV Master (Lossless)",
    fileSize: "30.3 MB",
    downloadUrl: "https://github.com/utkarshkumar2207/unbroken-kraft/releases/download/v1.0.0/UNBROKEN.KRAFT.-.Love.Me.No.More.wav",
    notes: "Melodic tension, melancholic guitars, and an honest reckoning with detachment and fading bonds.",
    year: "2026",
    lyrics: `I do what I wanna do 
But didn't walk away 'cus I wanted you
You don't really have to apologize 
I've been living bad since I learned I can die 
I don't see this as gain or loss 
I don't care if my point's across 
I done see a lot of hate I don't care 
Made me selfish down the boot with no ends     

Don't fight me 
I'm a knight inside don't spite me
Don't bite I might take the mic scene 
Incite insight you cannot strike me 
Wealthy wanna clog the food chain 
Few mains many names playing new games 
Too lame my aim is to boot the frame 
Young guns hiding home playing fame or shame 
You know I do I don't take the names 
People who doin' the shit would never take the blame 
People who wanna some change would never take the lane 
Sit back and take some pain
I'm comin' with four more this my folklore 
I'm going from floor to floor you cannot ignore 
My life I'm not so sure I'm gonna' endure 
My days feel like a war please come and restore 
Me and my fucked up peace of mind 
I'm not one of a kind I may go blind in the hindsight 
I don't even feel the drive I don't wanna thrive 
I just do this 'cus I took the dive

I failed to see what you really wanted out of me
Maybe you could try to calm down 
I don't really see I don't really see
I tried my best 
Best to map you out but I kinda suck at reading life 
I hope you know I hope you know

I stay up all night
Don't give a fuck if you're right 
My life ain't so bright but I'm tryna make it alright
I used to be shy but now I'm turning around
You thought I'll never pick up but now I'm making these sounds
My sleep luxury all my bosses been in robbery 
Wanted to be different but my mama came and fought with me 
Stuck in these four walls inside of these closed doors 
My heart ain't so clean it's so dark
Twenty four into seven I feel despised 
There may come a time where I won't even wanna rhyme 
Don't ask me how I'm doing 'cus I'll tell you I'll be fine 
I may look the part but to be honest I'll be lying 
I don't care how I feel when I meet you I'll be nice 
If I see you down I will gladly give my smile 
You will tell me all your troubles open up the file
I don't care how I feel if you're sad I'll be nice

I do what I wanna do 
But didn't walk away 'cus I wanted you
You don't really have to apologize 
I've been living bad since I learned I can die 
I don't see this as gain or loss 
I don't care if my point's across 
I done see a lot of hate I don't care 
Made me selfish down the boot with no ends`
  },
  {
    id: "anthem",
    slug: "anthem",
    trackNumber: 8,
    title: "Anthem",
    artist: "Unbroken Kraft",
    artwork: "/images/anthem-cover.jpg",
    duration: 189,
    audioSrc: "/audio/unbroken-kraft-anthem.mp3",
    hasMasterAudio: true,
    audioFormat: "WAV Master (Lossless)",
    fileSize: "32.0 MB",
    downloadUrl: "https://github.com/utkarshkumar2207/unbroken-kraft/releases/download/v1.0.0/UNBROKEN.KRAFT.-.Anthem.wav",
    notes: "A powerful, defiant crescendo of distorted guitars, driving percussion, and collective resilience.",
    year: "2026",
    lyrics: `You stick to your phone but I'm bigger than tech
Work eight plus people writing me cheques 
Mind what matters I'm taking this trek
Long ass journey you wait on the deck
Deck your shit rest get weak legs 
Don't test my patience it'll break your neck 
Take your time I'll run till I'm best 
Upgrade myself I'm missing all fests 
No time like yours updating your specs 
Wreak my way till I make myself 
If you cross my path don't stop yourself
I don't need human contact 
Life too tough shit I better combat 
Half of people want contacts 
All I really want is bunch of fuckin' contracts
Gives me little bit of context

Maybe I'm settling down in my life
Maybe I'm peddling down slow every night 
Maybe I'm not into meddling 
Maybe it's time to step away from the wildlife 
Maybe I no longer need the knife
Maybe this time I can try and build a life 
Maybe this time I can take it easy
No chip on my shoulder just nine to five
I came back just to make my name in the game 
But I got a new look and a whole new frame
Maybe not the same but a noble lane 
A lot of shit happened that I overcame
Peace with the fact that I'm not the main
When I think of past maybe I was lame
My best friend passed and I lost my aim
Y'all still fighting over caste and names

I feel I'm the focal point of game 
I feel vocals calling on my name
I live like I am local all the same 
I don't got tattoos I just got some aims
Get me some assets I can claim
And some peace of mind like I got no blames 
This big ass life that I gotta tame 
Even the weekends I got no shame 
As big as the Weeknd now that's my frame 
That's the life that I choose to make
Cash is fine but I need that lane
I won't cheat the sheet I'll look past the game
Take or leave I won't change me 
No chick can rearrange me but strangely
When I look at myself I'm the one who fuckin' blames me 

If shit goes south just wake me up
If you think you're shy just mail me up 
Big meal first then I fuckin' fix your shit
You won't even notice like it's quick sorted
High IQ game big forehead 
Beforehand I'm just big warhead 
Scared of death 'cus my friend is dead
But if I die please know just leave me dead

In the gym flexing pecs chicks checking these mess my thickening neck 
I'm never resting investing all my time and money then I'm testing 
Re-inventing shit that doesn't work well it's constant questioning 
Half of the mass putting in the work and the other half just protesting
Suggesting me to do all kinda shit but you guys sitting home digesting
I don't really fuck with folks who just nesting 
Never really making anything of your lists 
I do what I do with an iron fist lotta wrists tryna' hold I just call them gifts
Lot of failed days I just call them twists lot of fuck ups but I still exist

I'm living like a weapon don't be tryin' to step in I'm not thinking seconds
Shredded you can reckon wreck it before checking 
I'm not buying shit I'm just making 
You waste all your time on that joystick (huh) 
Two lines think you are poetic (huh)
One trip you fall like a toy clip (what)
Don't trip homeboy you not build for this
I can do anything like Chuck Norris
I build warships then I hit for six 
But I build the sticks before hands on grips
Hands on lips no one need your scripts
They will clap for you but then plot for tricks 
Don't mix it up and just act foolish 
They don't like me much 'cus I'm immaculate 
You should calculate all my aggregates`
  }
];
