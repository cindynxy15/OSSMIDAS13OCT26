import { PersonaDetails, PersonaKey, QuizQuestion, BlendedPersonaResult } from '../types/quiz';

export const MIDAS_GOLDEN_AVATAR = '/src/assets/images/midas_golden_avatar_1791263723464.jpg';

export const PERSONAS: Record<PersonaKey, PersonaDetails> = {
  mentor: {
    key: 'mentor',
    letter: 'A',
    title: 'The Mentor',
    statement: 'You believe student success starts with relationships, trust and encouragement.',
    midasConnection: 'Mentoring',
    superpower: 'Helping students feel supported, connected and confident.',
    howYouCollaborate: 'You frequently partner with SEN, Counselling, ECG and Internship teams to ensure students receive holistic support.',
    imageSrc: '/src/assets/images/persona_mentor_1791254058562.jpg',
    medallionImageSrc: '/src/assets/images/medallion_mentor_1791263736672.jpg',
    quote: '"Let\'s talk"',
    goldenTitle: 'The Golden Touch of Heart & Empathy',
    goldenTouchLore: 'Like the mythical touch that turns stone into gold, your genuine compassion turns student self-doubt and hesitation into golden confidence and resilience.',
    colorScheme: {
      bg: 'bg-amber-950/40',
      border: 'border-amber-500/50',
      text: 'text-amber-200',
      accent: 'amber',
      badgeBg: 'bg-amber-900/60 text-amber-200 border border-amber-500/40',
    },
    collaborations: [
      { partner: 'SEN (Special Educational Needs)', role: 'Coordinating personalized learning accommodations and emotional encouragement.' },
      { partner: 'Counselling Services', role: 'Providing safe psychological referrals when personal or mental health struggles emerge.' },
      { partner: 'ECG (Education & Career Guidance)', role: 'Aligning student personal strengths with long-term aspirations.' },
      { partner: 'Internship Teams', role: 'Supporting students with confidence and coping mechanisms during workplace attachments.' }
    ]
  },
  navigator: {
    key: 'navigator',
    letter: 'B',
    title: 'The Internship Navigator',
    statement: 'You enjoy creating opportunities and helping students bridge the gap between education and industry.',
    midasConnection: 'Student Internship',
    superpower: 'Connecting students, schools and employers for meaningful learning experiences.',
    howYouCollaborate: 'You work closely with Schools, ECG, employers and student support teams to ensure successful internship outcomes.',
    imageSrc: '/src/assets/images/persona_navigator_1791254071287.jpg',
    medallionImageSrc: '/src/assets/images/medallion_navigator_1791263748386.jpg',
    quote: '"Let\'s make it happen."',
    goldenTitle: 'The Golden Touch of Opportunity & Bridges',
    goldenTouchLore: 'You possess the Midas touch of enterprise—transforming classroom theory into golden bridges of industry experience and career launchpads.',
    colorScheme: {
      bg: 'bg-yellow-950/40',
      border: 'border-yellow-500/50',
      text: 'text-yellow-200',
      accent: 'yellow',
      badgeBg: 'bg-yellow-900/60 text-yellow-200 border border-yellow-500/40',
    },
    collaborations: [
      { partner: 'Academic Schools', role: 'Ensuring student course competencies match industry internship job scopes.' },
      { partner: 'Industry Employers & Mentors', role: 'Cultivating trusted internship opportunities and structured onboarding.' },
      { partner: 'ECG Counsellors', role: 'Matching students to sectors aligned with their skills and career goals.' },
      { partner: 'Student Support Teams', role: 'Intervening quickly if workplace friction or adjustment challenges arise.' }
    ]
  },
  detective: {
    key: 'detective',
    letter: 'C',
    title: 'The Data Detective',
    statement: 'You enjoy spotting trends, identifying risks and turning information into action.',
    midasConnection: 'Data & Analytics',
    superpower: 'Using evidence to improve decisions and student outcomes.',
    howYouCollaborate: 'You support all OSS teams by providing insights that help prioritise resources, identify students who may need support and evaluate impact.',
    imageSrc: '/src/assets/images/persona_detective_1791254082536.jpg',
    medallionImageSrc: '/src/assets/images/medallion_detective_1791263761123.jpg',
    quote: '"Show me the data."',
    goldenTitle: 'The Golden Touch of Insight & Clarity',
    goldenTouchLore: 'You transmute raw, scattered data points into pure golden insights—revealing early risks and illuminating the most effective paths for student interventions.',
    colorScheme: {
      bg: 'bg-amber-950/40',
      border: 'border-amber-400/50',
      text: 'text-amber-100',
      accent: 'amber',
      badgeBg: 'bg-amber-900/60 text-amber-100 border border-amber-400/40',
    },
    collaborations: [
      { partner: 'OSS Leadership', role: 'Providing cohort-level retention, internship placement, and wellness analytics.' },
      { partner: 'Mentoring & Pastoral Care', role: 'Highlighting early-warning attendance or engagement drop-offs for early check-ins.' },
      { partner: 'Internship Coordinators', role: 'Tracking industry partner fulfillment rates, satisfaction scores, and placement trends.' },
      { partner: 'Admin Operations', role: 'Evaluating the impact of student support programmes and streamline reporting.' }
    ]
  },
  builder: {
    key: 'builder',
    letter: 'D',
    title: 'The Ecosystem Builder',
    statement: 'You see connections that others may miss and thrive when bringing people together.',
    midasConnection: 'Admin Support & Cross-Functional Coordination',
    superpower: 'Creating alignment across stakeholders and processes.',
    howYouCollaborate: 'You help schools, OSS teams and external partners work together to support students effectively.',
    imageSrc: '/src/assets/images/persona_builder_1791254092670.jpg',
    medallionImageSrc: '/src/assets/images/medallion_builder_1791263772298.jpg',
    quote: '"Leave it to me"',
    goldenTitle: 'The Golden Touch of Unity & Harmony',
    goldenTouchLore: 'You bind disparate parts into a gilded whole—turning institutional silos into an interconnected golden ecosystem where every student is fully supported.',
    colorScheme: {
      bg: 'bg-amber-950/40',
      border: 'border-yellow-600/50',
      text: 'text-amber-200',
      accent: 'amber',
      badgeBg: 'bg-yellow-950/70 text-amber-200 border border-yellow-600/40',
    },
    collaborations: [
      { partner: 'Academic Schools & Chairs', role: 'Aligning institution-wide timelines, student handovers, and program logistics.' },
      { partner: 'OSS Cross-Unit Teams', role: 'Breaking down silos between Mentoring, Internships, Counselling, and SEN.' },
      { partner: 'External Community Partners', role: 'Synchronizing grant, venue, and community resource partnerships for student welfare.' },
      { partner: 'Central Registry & Admin', role: 'Ensuring seamless documentation, governance, and smooth student operations.' }
    ]
  }
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    prompt: 'A student suddenly stops responding to emails and messages.',
    subtext: 'What is your first instinct?',
    options: [
      { letter: 'A', text: 'Reach out and find out how the student is coping.', personaKey: 'mentor' },
      { letter: 'B', text: 'Check if the situation could affect internship outcomes.', personaKey: 'navigator' },
      { letter: 'C', text: 'Look for attendance or engagement patterns.', personaKey: 'detective' },
      { letter: 'D', text: 'Identify who should be brought together to support the student.', personaKey: 'builder' }
    ],
    botRemark: 'A very real scenario! Every response reflects a vital piece of the student support puzzle.',
    goldenPonder: 'When silence falls, where does your golden instinct reach first?'
  },
  {
    id: 2,
    prompt: 'You are given a new project.',
    subtext: 'What excites you most?',
    options: [
      { letter: 'A', text: 'Seeing someone grow, gain confidence and discover their potential.', personaKey: 'mentor' },
      { letter: 'B', text: 'Turning a promising opportunity into something real and impactful.', personaKey: 'navigator' },
      { letter: 'C', text: 'Discovering a pattern or insight that others have missed.', personaKey: 'detective' },
      { letter: 'D', text: 'Finding a better, faster or more organised way to get things done.', personaKey: 'builder' }
    ],
    botRemark: 'New initiatives thrive when passion and varied strengths come together!',
    goldenPonder: 'A blank slate! What turns this new endeavour into pure gold?'
  },
  {
    id: 3,
    prompt: 'A student shares that they are unsure about their future.',
    subtext: 'You would most likely:',
    options: [
      { letter: 'A', text: 'Have a meaningful conversation with the student.', personaKey: 'mentor' },
      { letter: 'B', text: 'Discuss possible industry exposure opportunities.', personaKey: 'navigator' },
      { letter: 'C', text: 'Understand trends and factors influencing the situation.', personaKey: 'detective' },
      { letter: 'D', text: 'Connect the student to the right support ecosystem.', personaKey: 'builder' }
    ],
    botRemark: 'Guiding student self-discovery takes both heart, industry foresight, and coordinated resources.',
    goldenPonder: 'Uncertainty awaits transformation. Which golden key unlocks their path?'
  },
  {
    id: 4,
    prompt: 'Which phrase describes you best?',
    options: [
      { letter: 'A', text: '"Let\'s talk"', personaKey: 'mentor' },
      { letter: 'B', text: '"Let\'s make it happen."', personaKey: 'navigator' },
      { letter: 'C', text: '"Show me the data."', personaKey: 'detective' },
      { letter: 'D', text: '"Leave it to me"', personaKey: 'builder' }
    ],
    botRemark: 'A motto says everything about how you make an impact in OSS.',
    goldenPonder: 'Four golden creeds etched into the foundation of Student Support.'
  },
  {
    id: 5,
    prompt: 'When working with stakeholders, you naturally focus on:',
    options: [
      { letter: 'A', text: 'Trust and rapport.', personaKey: 'mentor' },
      { letter: 'B', text: 'Partnerships and opportunities.', personaKey: 'navigator' },
      { letter: 'C', text: 'Insights and evidence.', personaKey: 'detective' },
      { letter: 'D', text: 'Structure and planning', personaKey: 'builder' }
    ],
    botRemark: 'We are halfway through! Your MIDAS strengths are coming into focus.',
    goldenPonder: 'Halfway through the golden crucible! Your MIDAS resonance is crystallizing.'
  },
  {
    id: 6,
    prompt: 'You discover an emerging student issue affecting many students.',
    subtext: 'Your first thought is:',
    options: [
      { letter: 'A', text: 'How are the students feeling?', personaKey: 'mentor' },
      { letter: 'B', text: 'Will this affect their workplace readiness?', personaKey: 'navigator' },
      { letter: 'C', text: 'What does the data tell us?', personaKey: 'detective' },
      { letter: 'D', text: 'Who should be involved in addressing this?', personaKey: 'builder' }
    ],
    botRemark: 'Complex systemic issues require multiple angles of empathy, evidence, and coordination.',
    goldenPonder: 'A widespread challenge calls for the alchemy of student support.'
  },
  {
    id: 7,
    prompt: 'At a team meeting, you are usually the one who:',
    options: [
      { letter: 'A', text: 'Gets everyone talking and makes sure people feel heard', personaKey: 'mentor' },
      { letter: 'B', text: 'Suggests practical solutions.', personaKey: 'navigator' },
      { letter: 'C', text: 'Brings useful statistics or trends.', personaKey: 'detective' },
      { letter: 'D', text: 'Keeps track of the details and makes sure nothing falls through the cracks', personaKey: 'builder' }
    ],
    botRemark: 'Meetings are productive precisely because diverse colleagues bring these exact four contributions!',
    goldenPonder: 'Around the collaborative table, what golden contribution do you bring to light?'
  },
  {
    id: 8,
    prompt: 'Which achievement would make you proud?',
    options: [
      { letter: 'A', text: 'Helping a student gain confidence, clarity or direction', personaKey: 'mentor' },
      { letter: 'B', text: 'Connecting a student with an opportunity that makes a real difference to their career.', personaKey: 'navigator' },
      { letter: 'C', text: 'Using insights to improve a process.', personaKey: 'detective' },
      { letter: 'D', text: 'Putting a process in place that makes everyone’s work easier', personaKey: 'builder' }
    ],
    botRemark: 'Celebrations in student support are sweetest when tied to lasting transformation.',
    goldenPonder: 'True gold is measured in student triumphs and transformed journeys.'
  },
  {
    id: 9,
    prompt: 'Your colleagues often come to you because:',
    options: [
      { letter: 'A', text: 'You’re a good listener and know how to talk things through.', personaKey: 'mentor' },
      { letter: 'B', text: 'You know how to navigate complex situations.', personaKey: 'navigator' },
      { letter: 'C', text: 'You can make sense of complicated information.', personaKey: 'detective' },
      { letter: 'D', text: 'You’re organised and somehow always know what needs to be done.', personaKey: 'builder' }
    ],
    botRemark: 'Almost at the finish line! Question 10 is coming right up.',
    goldenPonder: 'Your colleagues know your unique touch! One final scenario remains.'
  },
  {
    id: 10,
    prompt: 'Student success is best achieved when:',
    options: [
      { letter: 'A', text: 'We build meaningful relationships and help students grow', personaKey: 'mentor' },
      { letter: 'B', text: 'We connect students with opportunities to gain real-world experience', personaKey: 'navigator' },
      { letter: 'C', text: 'We use data to understand students, identify needs early and enable timely, targeted support.', personaKey: 'detective' },
      { letter: 'D', text: 'We keep things organised so that students and teams are well supported.', personaKey: 'builder' }
    ],
    botRemark: 'All questions completed! Computing your MIDAS persona...',
    goldenPonder: 'The final golden principle! Your MIDAS medallion is ready to be revealed.'
  }
];

export function calculatePersonaResult(scores: Record<PersonaKey, number>): BlendedPersonaResult {
  const maxScore = Math.max(...Object.values(scores));
  const topKeys = (Object.keys(scores) as PersonaKey[]).filter(key => scores[key] === maxScore);

  // Single winner (no tie)
  if (topKeys.length === 1) {
    const single = PERSONAS[topKeys[0]];
    return {
      isBlended: false,
      topKeys,
      title: single.title,
      statement: single.statement,
      midasConnection: single.midasConnection,
      superpower: single.superpower,
      howYouCollaborate: single.howYouCollaborate,
      quote: single.quote,
      goldenTitle: single.goldenTitle,
      goldenTouchLore: single.goldenTouchLore,
      medallionImageSrc: single.medallionImageSrc,
      primaryPersonas: [single]
    };
  }

  // Tie! Blended Persona logic
  const primaryPersonas = topKeys.map(k => PERSONAS[k]);

  // Two-way tie blends
  if (topKeys.length === 2) {
    const keySet = new Set(topKeys);

    if (keySet.has('mentor') && keySet.has('navigator')) {
      return {
        isBlended: true,
        topKeys,
        title: 'The Holistic Career Champion',
        statement: 'You unite personal care with professional ambition, ensuring students are both emotionally grounded and industry-ready.',
        midasConnection: 'Mentoring & Student Internship',
        superpower: 'Empowering students to discover their inner confidence while opening real doors to meaningful workplace experiences.',
        howYouCollaborate: 'You partner between Counselling/SEN and ECG/Industry teams, turning emotional resilience into practical workplace confidence.',
        quote: '"Empower the person, open the door."',
        goldenTitle: 'The Dual Golden Touch of Heart & Opportunity',
        goldenTouchLore: 'You possess the rare gift of nurturing student self-worth while simultaneously forging golden bridges into the working world.',
        medallionImageSrc: PERSONAS.mentor.medallionImageSrc,
        primaryPersonas
      };
    }

    if (keySet.has('mentor') && keySet.has('detective')) {
      return {
        isBlended: true,
        topKeys,
        title: 'The Empathetic Strategist',
        statement: 'You merge genuine heart with analytical precision, proving that data and human empathy are natural allies in student care.',
        midasConnection: 'Mentoring & Data & Analytics',
        superpower: 'Spotting quiet distress through engagement trends and intervening early with warm, individualized encouragement.',
        howYouCollaborate: 'You connect data leads with frontline mentors and counsellors to ensure student analytics trigger timely, compassionate support.',
        quote: '"Guided by data, driven by heart."',
        goldenTitle: 'The Dual Golden Touch of Heart & Insight',
        goldenTouchLore: 'You harmonize analytical rigor with empathetic care, reading between the numbers to offer timely, golden human warmth.',
        medallionImageSrc: PERSONAS.detective.medallionImageSrc,
        primaryPersonas
      };
    }

    if (keySet.has('mentor') && keySet.has('builder')) {
      return {
        isBlended: true,
        topKeys,
        title: 'The Relational Anchor',
        statement: 'You understand that it takes a dedicated village to nurture every student, seamlessly weaving 1-on-1 trust into wider collaborative networks.',
        midasConnection: 'Mentoring & Admin Support / Coordination',
        superpower: 'Listening deeply to individual student needs and orchestrating cross-team support networks so no student falls through the cracks.',
        howYouCollaborate: 'You link Academic Mentors, School Care teams, and OSS support leads to build a cohesive safety net around vulnerable students.',
        quote: '"Care deeply, connect broadly."',
        goldenTitle: 'The Dual Golden Touch of Care & Alignment',
        goldenTouchLore: 'You combine individual student devotion with community orchestration, building golden safety nets where every student is caught and uplifted.',
        medallionImageSrc: PERSONAS.builder.medallionImageSrc,
        primaryPersonas
      };
    }

    if (keySet.has('navigator') && keySet.has('detective')) {
      return {
        isBlended: true,
        topKeys,
        title: 'The Opportunity Architect',
        statement: 'You combine market intelligence with placement savvy to build high-impact career and internship pipelines for students.',
        midasConnection: 'Student Internship & Data & Analytics',
        superpower: 'Translating industry trends and student readiness data into strategic internship attachments and successful transitions.',
        howYouCollaborate: 'You provide Schools, ECG Counsellors, and Employer Liaison leads with data-driven sector insights to optimize student placement outcomes.',
        quote: '"Insights in mind, opportunity in sight."',
        goldenTitle: 'The Dual Golden Touch of Insight & Opportunity',
        goldenTouchLore: 'You turn market statistics and student competencies into golden career launchpads, matching talent to industry with surgical precision.',
        medallionImageSrc: PERSONAS.navigator.medallionImageSrc,
        primaryPersonas
      };
    }

    if (keySet.has('navigator') && keySet.has('builder')) {
      return {
        isBlended: true,
        topKeys,
        title: 'The Strategic Bridge-Builder',
        statement: 'You are an exceptional multi-stakeholder mobilizer who turns cross-functional coordination into vibrant student career pathways.',
        midasConnection: 'Student Internship & Admin Support / Coordination',
        superpower: 'Synchronizing academic schools, industry partners, and admin workflows into seamless, rewarding experiential learning.',
        howYouCollaborate: 'You bring Academic Chairs, Internship Coordinators, and corporate partners into shared alignment for frictionless student placement.',
        quote: '"Aligning partners, unlocking pathways."',
        goldenTitle: 'The Dual Golden Touch of Alliances & Pathways',
        goldenTouchLore: 'You orchestrate schools, external employers, and campus departments into seamless golden pathways for student experiential learning.',
        medallionImageSrc: PERSONAS.navigator.medallionImageSrc,
        primaryPersonas
      };
    }

    if (keySet.has('detective') && keySet.has('builder')) {
      return {
        isBlended: true,
        topKeys,
        title: 'The Insight Orchestrator',
        statement: 'You transform complex information into shared operational roadmaps, turning raw analytics into unified team momentum.',
        midasConnection: 'Data & Analytics & Admin Support',
        superpower: 'Framing actionable data into clear cross-departmental workflows that rally every stakeholder around shared evidence.',
        howYouCollaborate: 'You feed clear analytics into OSS leadership and cross-functional teams, helping everyone allocate student support resources with clarity.',
        quote: '"Evidence into action, together."',
        goldenTitle: 'The Dual Golden Touch of Insight & Harmony',
        goldenTouchLore: 'You convert complex institutional data into shared team conviction, mobilizing every unit around common evidence and clarity.',
        medallionImageSrc: PERSONAS.detective.medallionImageSrc,
        primaryPersonas
      };
    }
  }

  // 3-way or 4-way balanced tie
  return {
    isBlended: true,
    topKeys,
    title: 'The Versatile MIDAS Polymath',
    statement: 'You embody the entire spectrum of MIDAS—fluidly balancing mentoring heart, industry navigation, analytical rigor, and ecosystem alignment.',
    midasConnection: 'Mentoring, Internship, Data & Analytics, and Admin Support',
    superpower: 'Holistic problem-solving that addresses student care, industry readiness, data insights, and collaborative coordination simultaneously.',
    howYouCollaborate: 'You serve as a versatile multi-disciplinary bridge across all OSS and School teams, comfortably speaking the language of mentors, employers, data analysts, and coordinators.',
    quote: '"All four pillars, one student mission."',
    goldenTitle: 'The Complete Golden MIDAS Touch',
    goldenTouchLore: 'In you, all four golden touchstones of MIDAS converge—Mentoring empathy, Internship bridges, Analytical clarity, and Ecosystem harmony.',
    medallionImageSrc: PERSONAS.mentor.medallionImageSrc,
    primaryPersonas
  };
}
