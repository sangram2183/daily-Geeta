export type Badge = {
  id: string
  name: string
  nameHi: string
  emoji: string
  description: string
  condition: string
  streakRequired?: number
  totalRequired?: number
  special?: boolean
}

export type Milestone = {
  days: number
  title: string
  titleHi: string
  reward: string
  rewardType: 'badge' | 'quiz' | 'certificate' | 'wallpaper'
  badgeId?: string
  color: string
  emoji: string
}

export type QuizQuestion = {
  id: string
  question: string
  options: string[]
  correct: number
  shloka: string
  explanation: string
}

export const BADGES: Badge[] = [
  {
    id: 'first_read',
    name: 'First light',
    nameHi: 'पहली ज्योति',
    emoji: '🪔',
    description: 'Read your first shloka',
    condition: 'Read 1 shloka',
    totalRequired: 1,
  },
  {
    id: 'seeker_3',
    name: 'Seeker',
    nameHi: 'जिज्ञासु',
    emoji: '🌱',
    description: '3 days in a row — the journey begins',
    condition: '3-day streak',
    streakRequired: 3,
  },
  {
    id: 'devoted_7',
    name: 'Devoted',
    nameHi: 'साधक',
    emoji: '🙏',
    description: 'A full week of daily reading',
    condition: '7-day streak',
    streakRequired: 7,
  },
  {
    id: 'steady_14',
    name: 'Steady mind',
    nameHi: 'स्थिरचित्त',
    emoji: '🧘',
    description: 'Two weeks — your practice is taking root',
    condition: '14-day streak',
    streakRequired: 14,
  },
  {
    id: 'warrior_21',
    name: 'Karma warrior',
    nameHi: 'कर्मयोगी',
    emoji: '⚔️',
    description: '21 days — habits form at this point',
    condition: '21-day streak',
    streakRequired: 21,
  },
  {
    id: 'arjuna_30',
    name: 'Arjuna',
    nameHi: 'अर्जुन',
    emoji: '🏹',
    description: '30 days of unwavering daily practice',
    condition: '30-day streak',
    streakRequired: 30,
    special: true,
  },
  {
    id: 'krishna_60',
    name: 'Krishna\'s student',
    nameHi: 'कृष्ण का शिष्य',
    emoji: '🦚',
    description: '60 days — true dedication',
    condition: '60-day streak',
    streakRequired: 60,
    special: true,
  },
  {
    id: 'enlightened_100',
    name: 'Enlightened',
    nameHi: 'ज्ञानी',
    emoji: '☀️',
    description: '100 days — you are the Gita',
    condition: '100-day streak',
    streakRequired: 100,
    special: true,
  },
  {
    id: 'explorer',
    name: 'Explorer',
    nameHi: 'अन्वेषक',
    emoji: '🗺️',
    description: 'Read shlokas from all 18 chapters',
    condition: 'All 18 chapters',
  },
  {
    id: 'reflector',
    name: 'Reflector',
    nameHi: 'चिंतक',
    emoji: '📝',
    description: 'Wrote 10 personal reflections',
    condition: '10 reflections',
    totalRequired: 10,
  },
]

export const MILESTONES: Milestone[] = [
  {
    days: 3,
    title: '3-day streak!',
    titleHi: '3 दिन की साधना!',
    reward: 'Seeker badge unlocked',
    rewardType: 'badge',
    badgeId: 'seeker_3',
    color: '#EAF3DE',
    emoji: '🌱',
  },
  {
    days: 7,
    title: 'One full week!',
    titleHi: 'एक पूरा सप्ताह!',
    reward: 'Devoted badge + 3 bonus AI questions',
    rewardType: 'badge',
    badgeId: 'devoted_7',
    color: '#E1F5EE',
    emoji: '🙏',
  },
  {
    days: 14,
    title: 'Two weeks strong!',
    titleHi: 'दो सप्ताह!',
    reward: 'Steady Mind badge + exclusive wallpaper pack',
    rewardType: 'wallpaper',
    badgeId: 'steady_14',
    color: '#FAEEDA',
    emoji: '🧘',
  },
  {
    days: 21,
    title: '21 days — a habit is born!',
    titleHi: '21 दिन — संस्कार बना!',
    reward: 'Karma Warrior badge unlocked',
    rewardType: 'badge',
    badgeId: 'warrior_21',
    color: '#FAECE7',
    emoji: '⚔️',
  },
  {
    days: 30,
    title: '30 days! Take the Gita test!',
    titleHi: '30 दिन! गीता परीक्षा दें!',
    reward: 'Arjuna badge + Gita Knowledge Certificate',
    rewardType: 'quiz',
    badgeId: 'arjuna_30',
    color: '#EEEDFE',
    emoji: '🏹',
  },
  {
    days: 60,
    title: '60 days of devotion!',
    titleHi: '60 दिन की भक्ति!',
    reward: 'Krishna\'s Student badge + 1 month Pro free',
    rewardType: 'certificate',
    badgeId: 'krishna_60',
    color: '#FBE8F3',
    emoji: '🦚',
  },
  {
    days: 100,
    title: '100 days — you are enlightened!',
    titleHi: '100 दिन — आप ज्ञानी हैं!',
    reward: 'Enlightened badge + lifetime Pro access',
    rewardType: 'certificate',
    badgeId: 'enlightened_100',
    color: '#FFF8E1',
    emoji: '☀️',
  },
]

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'According to the Gita (2.47), what is your right?',
    options: [
      'The fruits of your actions',
      'To perform your duty only',
      'To choose your karma',
      'To avoid action',
    ],
    correct: 1,
    shloka: '2.47',
    explanation: 'Krishna says: "You have a right to perform your duties, but never to the fruits of your actions."',
  },
  {
    id: 'q2',
    question: 'In Chapter 6, what two things does Krishna say control the restless mind?',
    options: [
      'Prayer and fasting',
      'Knowledge and devotion',
      'Practice and dispassion',
      'Silence and meditation',
    ],
    correct: 2,
    shloka: '6.35',
    explanation: 'Krishna says the mind is brought under control by abhyasa (practice) and vairagya (dispassion).',
  },
  {
    id: 'q3',
    question: 'What does Krishna say about the Self in Chapter 2?',
    options: [
      'It is born with the body',
      'It can be destroyed by weapons',
      'It is never born and never dies',
      'It sleeps when the body sleeps',
    ],
    correct: 2,
    shloka: '2.20',
    explanation: 'The Self is eternal — never born, never dying, ancient, and not slain when the body is slain.',
  },
  {
    id: 'q4',
    question: 'In Chapter 4, Krishna says he manifests on earth when:',
    options: [
      'People pray to him',
      'Dharma declines and adharma rises',
      'A great war is about to happen',
      'The universe needs to be reset',
    ],
    correct: 1,
    shloka: '4.7',
    explanation: '"Whenever righteousness declines and unrighteousness rises, I manifest myself." — Chapter 4, Verse 7.',
  },
  {
    id: 'q5',
    question: 'What does Chapter 18, Verse 66 — the final teaching — say?',
    options: [
      'Keep reading the Gita daily',
      'Fight for dharma always',
      'Surrender to Me alone, I will free you from all sin',
      'Offer all fruits to God',
    ],
    correct: 2,
    shloka: '18.66',
    explanation: '"Abandon all varieties of dharma and surrender unto Me alone. I shall deliver you from all sin — do not fear."',
  },
  {
    id: 'q6',
    question: 'Which chapter is called the "Yoga of Devotion"?',
    options: ['Chapter 7', 'Chapter 9', 'Chapter 12', 'Chapter 15'],
    correct: 2,
    shloka: '12.1',
    explanation: 'Chapter 12 is Bhakti Yoga — the Yoga of Devotion, where Krishna describes the qualities of his dearest devotees.',
  },
  {
    id: 'q7',
    question: 'According to the Gita, how does the wise person see all beings?',
    options: [
      'As different and separate',
      'With equal vision — in a Brahmin, an elephant, a dog',
      'Only through the lens of karma',
      'As illusions of the mind',
    ],
    correct: 1,
    shloka: '5.18',
    explanation: 'Chapter 5.18: The truly wise see with equal vision a learned Brahmin, a cow, an elephant, a dog, and an outcaste.',
  },
  {
    id: 'q8',
    question: 'What does Krishna call himself in Chapter 10, Verse 20?',
    options: [
      'The creator of the universe',
      'The destroyer of evil',
      'The Self seated in the hearts of all beings',
      'The master of all karma',
    ],
    correct: 2,
    shloka: '10.20',
    explanation: '"I am the Self, O Gudakesha, seated in the hearts of all creatures — the beginning, middle, and end of all beings."',
  },
  {
    id: 'q9',
    question: 'The Gita has how many chapters and shlokas in total?',
    options: [
      '14 chapters, 500 shlokas',
      '18 chapters, 700 shlokas',
      '21 chapters, 800 shlokas',
      '18 chapters, 900 shlokas',
    ],
    correct: 1,
    shloka: '18.78',
    explanation: 'The Bhagavad Gita has 18 chapters and 700 shlokas (verses), set on the battlefield of Kurukshetra.',
  },
  {
    id: 'q10',
    question: 'What is the Sanskrit word for "duty" or "righteousness" central to the Gita?',
    options: ['Karma', 'Dharma', 'Moksha', 'Yoga'],
    correct: 1,
    shloka: '1.1',
    explanation: 'Dharma — the field where the Gita begins is called Dharmakshetra (the field of dharma). It is the Gita\'s central theme.',
  },
]

export function getNextMilestone(streak: number): Milestone | null {
  return MILESTONES.find(m => m.days > streak) || null
}

export function getJustReachedMilestone(streak: number): Milestone | null {
  return MILESTONES.find(m => m.days === streak) || null
}

export function getEarnedBadges(streak: number, totalRead: number, reflectionCount: number): Badge[] {
  return BADGES.filter(b => {
    if (b.streakRequired) return streak >= b.streakRequired
    if (b.totalRequired) return totalRead >= b.totalRequired
    return false
  })
}

export function getStreakMessage(streak: number): string {
  if (streak === 0) return 'Start your journey today 🙏'
  if (streak === 1) return 'Great start! Come back tomorrow ✨'
  if (streak < 3) return `${streak} days — keep going!`
  if (streak < 7) return `${streak} days — you're building a habit 🌱`
  if (streak < 14) return `${streak} days — your dedication is showing 🙏`
  if (streak < 21) return `${streak} days — the Gita is becoming part of you 🧘`
  if (streak < 30) return `${streak} days — almost to the 30-day test! 🏹`
  if (streak === 30) return '30 days! Take your Gita knowledge test! 🎉'
  if (streak < 60) return `${streak} days — you are a true sadhak ⚔️`
  if (streak < 100) return `${streak} days — Krishna's devoted student 🦚`
  return `${streak} days — enlightened! ☀️`
}
