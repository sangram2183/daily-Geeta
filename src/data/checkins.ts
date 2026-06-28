// Daily check-in questions — application, not knowledge.
// One question per shloka that makes the user think about
// how it applies to their actual life today.
// Any answer counts toward streak — reflection is the goal.

export type CheckInQuestion = {
  shlokaId: string
  question: string
  options: string[]
  followUp?: string  // shown after answering — deepens the insight
}

export const CHECKIN_QUESTIONS: Record<string, CheckInQuestion> = {
  '2.47': {
    shlokaId: '2.47',
    question: 'This shloka says: do your duty, release the outcome. Where in your life right now are you most attached to results?',
    options: [
      'Work — I need things to go a certain way',
      'A relationship — I keep expecting something back',
      'A personal goal — the wait is making me anxious',
      'I\'m not attached anywhere right now',
    ],
    followUp: 'Krishna isn\'t saying results don\'t matter. He\'s saying your peace shouldn\'t depend on them.',
  },
  '2.14': {
    shlokaId: '2.14',
    question: 'Something difficult is passing through your life right now. How are you meeting it?',
    options: [
      'Resisting it — I can\'t accept it yet',
      'Pretending it\'s not there',
      'Tolerating it, but barely',
      'I\'m at peace with it',
    ],
    followUp: 'The Gita doesn\'t say don\'t feel pain. It says: witness it without becoming it.',
  },
  '6.5': {
    shlokaId: '6.5',
    question: 'The Gita says you are your own best friend — and worst enemy. Which are you being to yourself this week?',
    options: [
      'My own enemy — self-critical, harsh',
      'Somewhere in between',
      'A fair friend — honest but kind',
      'My best friend — supportive and clear',
    ],
    followUp: 'The mind that disciplines itself with love is the mind that rises. Not the one that punishes itself.',
  },
  '6.35': {
    shlokaId: '6.35',
    question: 'Your mind wanders — that\'s normal. What pulls it away most often?',
    options: [
      'Worries about the future',
      'Regrets about the past',
      'Phone, social media, noise',
      'Other people\'s opinions of me',
    ],
    followUp: 'Krishna says practice and dispassion are the two tools. You\'ve just identified what to practice releasing.',
  },
  '4.7': {
    shlokaId: '4.7',
    question: 'Where do you most need righteousness to "show up" in your life right now?',
    options: [
      'In how I treat people close to me',
      'In my work — I\'ve been cutting corners',
      'In how I speak — more truth, less comfort',
      'Things feel balanced right now',
    ],
    followUp: 'Dharma begins inside. Not in grand acts — in the small choices nobody sees.',
  },
  '12.13': {
    shlokaId: '12.13',
    question: 'Who in your life is hardest to feel compassion for right now?',
    options: [
      'Someone who hurt me',
      'Someone who annoys or irritates me',
      'Myself, honestly',
      'No one — I\'m feeling compassionate',
    ],
    followUp: 'Compassion without exception is the hardest practice. But it begins with the one person you resist.',
  },
  '9.22': {
    shlokaId: '9.22',
    question: 'Do you actually trust that you are being taken care of — even when things feel uncertain?',
    options: [
      'Not really — I feel on my own',
      'Sometimes, but doubt creeps in',
      'Most of the time, yes',
      'Fully — I feel held',
    ],
    followUp: 'Krishna says: for those who think of me always, I carry what they lack. Surrender isn\'t weakness. It\'s the deepest trust.',
  },
  '18.66': {
    shlokaId: '18.66',
    question: 'What is the one thing you most need to let go of right now — the thing you\'re still holding too tightly?',
    options: [
      'Control over an outcome',
      'Fear of what others think',
      'Guilt or shame from the past',
      'The need to have everything figured out',
    ],
    followUp: 'The final teaching of the Gita is surrender. Not giving up — giving over. There\'s a difference.',
  },
  '5.18': {
    shlokaId: '5.18',
    question: 'Who do you find it hardest to see as equal to yourself?',
    options: [
      'Someone I consider "below" me',
      'Someone I envy or resent',
      'Someone very different from me',
      'I genuinely try to see everyone equally',
    ],
    followUp: 'Equal vision doesn\'t mean pretending everyone is the same. It means seeing the same soul in different forms.',
  },
  '3.21': {
    shlokaId: '3.21',
    question: 'Someone is watching how you behave right now — maybe your team, a younger sibling, your child. Are you living the example you\'d want them to follow?',
    options: [
      'Not really — I\'m struggling right now',
      'In some areas yes, others no',
      'Mostly — I try to be consistent',
      'Yes — I feel aligned',
    ],
    followUp: 'You don\'t need a title to lead. Your behaviour is already setting a standard someone is learning from.',
  },
}

// Fallback generic check-in when no specific question exists for a shloka
export const GENERIC_CHECKINS: CheckInQuestion[] = [
  {
    shlokaId: 'generic',
    question: 'After reading this shloka, what is your honest inner state right now?',
    options: [
      'Unsettled — it touched something I avoid',
      'Inspired — I want to apply this',
      'Peaceful — it confirmed something I know',
      'Confused — I need more reflection',
    ],
    followUp: 'Every honest reaction to the Gita is the right reaction. The text is a mirror, not a lecture.',
  },
  {
    shlokaId: 'generic',
    question: 'If you had to act on this shloka\'s teaching today, what would be the first small thing you\'d do differently?',
    options: [
      'Pause before reacting to something',
      'Let go of one expectation I\'m holding',
      'Be kinder to someone I\'ve been hard on',
      'Focus on the action, not the result',
    ],
    followUp: 'The Gita is lived one small choice at a time. That small thing you identified — start there.',
  },
  {
    shlokaId: 'generic',
    question: 'How honest are you being with yourself right now?',
    options: [
      'I\'m avoiding something I know I should face',
      'I\'m being fair with myself',
      'I\'m being too hard on myself',
      'I feel clear and honest',
    ],
    followUp: 'The Gita always begins with self-knowledge. Arjuna\'s confusion was honest — and that honesty opened the teaching.',
  },
]

export function getCheckInForShloka(shlokaId: string): CheckInQuestion {
  if (CHECKIN_QUESTIONS[shlokaId]) return CHECKIN_QUESTIONS[shlokaId]
  // Pick a random generic based on day
  const day = Math.floor(Date.now() / 86400000) % GENERIC_CHECKINS.length
  return { ...GENERIC_CHECKINS[day], shlokaId }
}
