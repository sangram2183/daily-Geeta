import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import { QUIZ_QUESTIONS } from '../data/gamification'
import { useAppStore } from '../store/useAppStore'

type Phase = 'intro' | 'quiz' | 'result'

export function QuizPage() {
  const navigate = useNavigate()
  const { quizCompleted, quizScore, quizUnlocked, setQuizCompleted, streak } = useAppStore()

  const [phase, setPhase] = useState<Phase>(quizCompleted ? 'result' : 'intro')
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUIZ_QUESTIONS.length).fill(null))
  const [showExplanation, setShowExplanation] = useState(false)

  const q = QUIZ_QUESTIONS[current]
  const score = quizCompleted ? (quizScore ?? 0) : answers.filter((a, i) => a === QUIZ_QUESTIONS[i].correct).length

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    setShowExplanation(true)
    const updated = [...answers]
    updated[current] = idx
    setAnswers(updated)
  }

  const handleNext = () => {
    setSelected(null)
    setShowExplanation(false)
    if (current < QUIZ_QUESTIONS.length - 1) {
      setCurrent(current + 1)
    } else {
      const finalScore = answers.filter((a, i) => a === QUIZ_QUESTIONS[i]?.correct).length
      setQuizCompleted(finalScore)
      setPhase('result')
    }
  }

  const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100)
  const grade = pct >= 90 ? 'Enlightened' : pct >= 70 ? 'Devoted Seeker' : pct >= 50 ? 'Sincere Student' : 'Keep Studying'
  const gradeEmoji = pct >= 90 ? '☀️' : pct >= 70 ? '🏹' : pct >= 50 ? '🙏' : '🌱'

  if (!quizUnlocked && !quizCompleted) {
    return (
      <div style={{ minHeight:'100vh', background:'#faf8f4', padding:'80px 20px 20px' }}>
        <button onClick={() => navigate(-1)} style={{ background:'none', border:'none', color:'#a08050', fontSize:14, cursor:'pointer', marginBottom:20 }}>
          ← Back
        </button>
        <div style={{ textAlign:'center', padding:'40px 20px' }}>
          <div style={{ fontSize:64, marginBottom:16 }}>🔒</div>
          <h2 style={{ fontSize:20, fontWeight:600, color:'#1a1208', marginBottom:8 }}>Gita Knowledge Test</h2>
          <p style={{ fontSize:14, color:'#a08050', lineHeight:1.7 }}>
            Complete a 30-day streak to unlock the Gita Knowledge Test and earn your Arjuna badge + certificate.
          </p>
          <div style={{ marginTop:20, background:'#fff3e0', borderRadius:12, padding:'12px 20px', display:'inline-block' }}>
            <span style={{ fontSize:13, color:'#c07800' }}>
              You're on day {streak} — {30 - streak} more days to unlock
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight:'100vh', background:'#faf8f4', paddingBottom:40 }}>
      <div style={{ padding:'60px 16px 12px', display:'flex', alignItems:'center', gap:12 }}>
        <button onClick={() => navigate(-1)} style={{
          width:36, height:36, borderRadius:'50%', background:'#fff',
          border:'0.5px solid #f0e8d8', display:'flex', alignItems:'center',
          justifyContent:'center', cursor:'pointer', flexShrink:0,
        }}>
          <ArrowLeft size={16} color="#666" />
        </button>
        <div>
          <h1 style={{ fontSize:17, fontWeight:600, color:'#1a1208' }}>Gita Knowledge Test</h1>
          <p style={{ fontSize:11, color:'#a08050' }}>30-day milestone reward</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div key="intro" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} style={{ padding:'0 16px' }}>
            <div style={{ background:'#fff', borderRadius:20, border:'0.5px solid #f0e8d8', padding:24, textAlign:'center', marginBottom:16 }}>
              <div style={{ fontSize:56, marginBottom:12 }}>🏹</div>
              <h2 style={{ fontSize:18, fontWeight:600, color:'#1a1208', marginBottom:8 }}>You've earned this!</h2>
              <p style={{ fontSize:13, color:'#a08050', lineHeight:1.7, marginBottom:20 }}>
                30 days of daily reading — now test your knowledge with 10 questions from across all 18 chapters.
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:20 }}>
                {[
                  ['10', 'questions'],
                  ['All 18', 'chapters covered'],
                  ['70%+', 'to pass'],
                  ['🏅', 'certificate on pass'],
                ].map(([v, l]) => (
                  <div key={l} style={{ background:'#fdf8f0', borderRadius:10, padding:'10px', border:'0.5px solid #f5e8cc' }}>
                    <div style={{ fontSize:16, fontWeight:700, color:'#c07800' }}>{v}</div>
                    <div style={{ fontSize:11, color:'#a08050' }}>{l}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setPhase('quiz')}
                style={{ background:'#7f77dd', color:'#fff', border:'none', borderRadius:14, padding:'14px 32px', fontSize:15, fontWeight:600, cursor:'pointer', width:'100%' }}
              >
                Start the test
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'quiz' && (
          <motion.div key={`q-${current}`} initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-30 }} style={{ padding:'0 16px' }}>
            {/* Progress */}
            <div style={{ marginBottom:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'#a08050', marginBottom:6 }}>
                <span>Question {current + 1} of {QUIZ_QUESTIONS.length}</span>
                <span>Shloka {q.shloka}</span>
              </div>
              <div style={{ height:4, background:'#f5f0e8', borderRadius:2 }}>
                <div style={{ height:'100%', borderRadius:2, background:'#7f77dd', width:`${((current + 1) / QUIZ_QUESTIONS.length) * 100}%`, transition:'width 0.4s' }}/>
              </div>
            </div>

            {/* Question */}
            <div style={{ background:'#fff', borderRadius:18, border:'0.5px solid #f0e8d8', padding:20, marginBottom:12 }}>
              <p style={{ fontSize:15, fontWeight:500, color:'#1a1208', lineHeight:1.7, marginBottom:20 }}>{q.question}</p>

              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {q.options.map((opt, i) => {
                  const isCorrect = i === q.correct
                  const isSelected = selected === i
                  const revealed = selected !== null

                  let bg = '#fafaf8', border = '0.5px solid #eee', color = '#3d3020'
                  if (revealed) {
                    if (isCorrect) { bg = '#EAF3DE'; border = '0.5px solid #C0DD97'; color = '#27500A' }
                    else if (isSelected) { bg = '#FCEBEB'; border = '0.5px solid #F7C1C1'; color = '#A32D2D' }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      style={{
                        background:bg, border, borderRadius:12,
                        padding:'12px 14px', textAlign:'left',
                        fontSize:13, color, cursor: revealed ? 'default' : 'pointer',
                        display:'flex', alignItems:'center', gap:10,
                        transition:'all 0.2s',
                      }}
                    >
                      <span style={{
                        width:22, height:22, borderRadius:'50%', flexShrink:0,
                        background: revealed && isCorrect ? '#27500A' : revealed && isSelected ? '#A32D2D' : '#f0ebe0',
                        color: revealed && (isCorrect || isSelected) ? '#fff' : '#a08050',
                        fontSize:11, fontWeight:600,
                        display:'flex', alignItems:'center', justifyContent:'center',
                      }}>
                        {revealed && isCorrect ? '✓' : revealed && isSelected ? '✗' : String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  style={{ background: selected === q.correct ? '#EAF3DE' : '#FFF8E1', border:`0.5px solid ${selected === q.correct ? '#C0DD97' : '#FAC775'}`, borderRadius:14, padding:14, marginBottom:12, display:'flex', gap:10, alignItems:'flex-start' }}
                >
                  {selected === q.correct
                    ? <CheckCircle size={16} color="#27500A" style={{ flexShrink:0, marginTop:1 }} />
                    : <XCircle size={16} color="#c07800" style={{ flexShrink:0, marginTop:1 }} />}
                  <p style={{ fontSize:12, color: selected === q.correct ? '#27500A' : '#633806', lineHeight:1.6 }}>
                    {q.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {selected !== null && (
              <button
                onClick={handleNext}
                style={{ background:'#7f77dd', color:'#fff', border:'none', borderRadius:14, padding:'14px', fontSize:14, fontWeight:600, cursor:'pointer', width:'100%' }}
              >
                {current < QUIZ_QUESTIONS.length - 1 ? 'Next question →' : 'See my results'}
              </button>
            )}
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div key="result" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} style={{ padding:'0 16px' }}>
            {/* Score card */}
            <div style={{ background:'#fff', borderRadius:20, border:'0.5px solid #f0e8d8', padding:28, textAlign:'center', marginBottom:14 }}>
              <div style={{ fontSize:52, marginBottom:8 }}>{gradeEmoji}</div>
              <div style={{ fontSize:40, fontWeight:700, color: pct >= 70 ? '#1d9e75' : '#c07800', marginBottom:4 }}>
                {score}/{QUIZ_QUESTIONS.length}
              </div>
              <div style={{ fontSize:15, fontWeight:600, color:'#1a1208', marginBottom:4 }}>{grade}</div>
              <div style={{ fontSize:13, color:'#a08050', marginBottom:20 }}>{pct}% score</div>

              {pct >= 70 ? (
                <div style={{ background:'#EAF3DE', border:'0.5px solid #C0DD97', borderRadius:14, padding:16, marginBottom:16 }}>
                  <div style={{ fontSize:13, color:'#27500A', fontWeight:600, marginBottom:4 }}>🏅 Certificate unlocked!</div>
                  <div style={{ fontSize:12, color:'#3B6D11', lineHeight:1.6 }}>
                    Your Gita Knowledge Certificate has been earned. Share it on LinkedIn to show your 30-day dedication.
                  </div>
                  <button style={{ marginTop:12, background:'#27500A', color:'#fff', border:'none', borderRadius:10, padding:'10px 20px', fontSize:12, fontWeight:600, cursor:'pointer' }}>
                    Download certificate
                  </button>
                </div>
              ) : (
                <div style={{ background:'#FFF8E1', border:'0.5px solid #FAC775', borderRadius:14, padding:14, marginBottom:16 }}>
                  <div style={{ fontSize:12, color:'#633806', lineHeight:1.6 }}>
                    You need 70% to earn the certificate. Keep reading, revisit the shlokas, and try again in 7 days!
                  </div>
                </div>
              )}

              {/* Answer breakdown */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:6 }}>
                {QUIZ_QUESTIONS.map((q, i) => (
                  <div key={i} style={{
                    background: answers[i] === q.correct ? '#EAF3DE' : '#FCEBEB',
                    borderRadius:8, padding:'6px 0',
                    fontSize:11, fontWeight:600,
                    color: answers[i] === q.correct ? '#27500A' : '#A32D2D',
                  }}>
                    Q{i + 1} {answers[i] === q.correct ? '✓' : '✗'}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              style={{ background:'#f5a020', color:'#fff', border:'none', borderRadius:14, padding:'14px', fontSize:14, fontWeight:600, cursor:'pointer', width:'100%', marginBottom:10 }}
            >
              Back to daily reading
            </button>
            {pct < 70 && (
              <button
                onClick={() => { setPhase('intro'); setCurrent(0); setSelected(null); setAnswers(Array(QUIZ_QUESTIONS.length).fill(null)); setShowExplanation(false) }}
                style={{ background:'transparent', color:'#a08050', border:'0.5px solid #f0e8d8', borderRadius:14, padding:'12px', fontSize:13, cursor:'pointer', width:'100%' }}
              >
                Try again
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
