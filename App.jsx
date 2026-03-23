import { useState, useRef } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, LineChart, Line, CartesianGrid } from "recharts";

// ─── USER STORE (in-memory) ──────────────────────────────────────────────────
const DB = {};

const COLORS = ["#FF2400","#FF7F00","#FFD700","#00C853","#0099FF","#4B0082","#8B00FF"];

const LEVELS = [
  { id:1, name:"Foundation", color:"#FF4500", grad:"linear-gradient(135deg,#FF2400,#FF7F00)", glow:"rgba(255,69,0,0.3)", symbol:"✦", chakra:"Root — Muladhara",
    desc:"Begin your journey. History, philosophy, and foundational science of Reiki. No prior knowledge required.",
    modules:[
      { name:"What Is Reiki?", lessons:["The History of Usui Reiki","Universal Life Force Energy","The Five Reiki Principles","Your First Attunement"] },
      { name:"Human Energy Anatomy", lessons:["The Seven Major Chakras","The Nadi System","The Auric Field Layers","Grounding and Earth Energy"] },
      { name:"Anatomy Foundations", lessons:["The Body as Energetic System","Homeostasis","The Nervous System Overview","Breath and the Respiratory System"] },
      { name:"Sacred Geometry", lessons:["The Flower of Life","The Golden Ratio","Metatrons Cube","Sacred Geometry in Healing"] },
    ]
  },
  { id:2, name:"Practitioner", color:"#00C853", grad:"linear-gradient(135deg,#FFD700,#00C853)", glow:"rgba(0,200,83,0.3)", symbol:"◈", chakra:"Heart — Anahata",
    desc:"Hands-on Reiki I and II, reflexology, somatic anatomy, and bridging the subtle body with measurable biology.",
    modules:[
      { name:"Reiki Levels I and II", lessons:["Reiki Level I Hands-On","Reiki Level II The Three Symbols","Distance Healing HSZSN","Scanning and Byosen"] },
      { name:"Reflexology Complete", lessons:["History of Reflexology","Foot Reflexology Zone Atlas","Hand and Ear Reflexology","Somatovisceral Reflexes"] },
      { name:"Cell Biology", lessons:["The Eukaryotic Cell","Fascia The Liquid Crystal Body","Tensegrity Architecture of Life","EZ Water and Pollack"] },
      { name:"Kabbalah", lessons:["The Ten Sephiroth","Hebrew Letters as Energy Codes","Tree of Life and Chakras","The 22 Paths"] },
    ]
  },
  { id:3, name:"Advanced", color:"#0099FF", grad:"linear-gradient(135deg,#00BFFF,#4B0082)", glow:"rgba(0,153,255,0.3)", symbol:"⬡", chakra:"Third Eye — Ajna",
    desc:"Bioelectromagnetics, molecular anatomy, and integration of esoteric and scientific frameworks at doctoral level.",
    modules:[
      { name:"Biofield Science", lessons:["Biophotons Light from Living Systems","SQUID Magnetometry","The Living Matrix Model","Cardiac Coherence HeartMath"] },
      { name:"Molecular Anatomy", lessons:["DNA Epigenetics Biology of Belief","Mitochondria Bioenergetic Heart","Cellular Signaling","ROS and Redox Biology"] },
      { name:"Advanced Reiki", lessons:["Reiki Level III Master Symbol","Chakra Psychology","Kundalini Science","Trauma-Informed Reiki"] },
      { name:"Ancient Wisdom", lessons:["The Qliphoth Shadow Integration","Thoth and Hermetic Principles","Tantra and Quantum Biology","Egyptian Mystery Schools"] },
    ]
  },
  { id:4, name:"Doctoral", color:"#8B00FF", grad:"linear-gradient(135deg,#8B00FF,#E040FB)", glow:"rgba(139,0,255,0.3)", symbol:"◉", chakra:"Crown — Sahasrara",
    desc:"Quantum biology, consciousness research, advanced bioenergetics, research methodology, and your doctoral capstone.",
    modules:[
      { name:"Quantum Biology", lessons:["Quantum Coherence in Living Systems","Orch OR Theory","Non-local Healing The Science","Morphogenetic Fields"] },
      { name:"Advanced Bioenergetics", lessons:["Bioenergetics and Metabolic Field","Biophoton Coherence Theory","The Biofield Hypothesis","Water Structuring and Memory"] },
      { name:"Research Methods", lessons:["Research Design for Biofield Studies","Evidence-Based Reiki","Statistics for Healing Research","Doctoral Research Proposal"] },
      { name:"Doctoral Capstone", lessons:["Integrating Your Clinical Philosophy","Case Series Methodology","The Future of Reiki Therapy","Doctoral Defense Preparation"] },
    ]
  },
];

const QUIZ = [
  { q:"What does Reiki most accurately translate to?", opts:["Healing hands","Universal Life Force Energy","Japanese massage","Sacred breath"], ans:1 },
  { q:"How many major chakras are in the classical Vedic system?", opts:["5","12","7","9"], ans:2 },
  { q:"The Flower of Life is an example of:", opts:["A botanical diagram","Sacred geometry — a universal pattern","An alchemical symbol","A Hebrew prayer"], ans:1 },
  { q:"ATP stands for:", opts:["Amino Transfer Protein","Adenosine Triphosphate","Autonomic Tension Pathway","Axon Terminal Potential"], ans:1 },
  { q:"The Golden Ratio phi is approximately:", opts:["3.14159","2.71828","1.61803","0.57721"], ans:2 },
  { q:"In Kabbalah, which Sephira corresponds to the heart center?", opts:["Kether","Tiphareth","Yesod","Malkuth"], ans:1 },
  { q:"Biophotons were systematically researched by:", opts:["Robert Becker","Fritz-Albert Popp","Nikola Tesla","Carl Jung"], ans:1 },
  { q:"The polyvagal theory was developed by:", opts:["Sigmund Freud","Carl Jung","Stephen Porges","Bessel van der Kolk"], ans:2 },
  { q:"Orch OR theory proposes consciousness arises from:", opts:["Serotonin levels","Quantum coherence in microtubules","ATP production only","DNA methylation"], ans:1 },
  { q:"Epigenetics is best defined as:", opts:["Study of all genes","Heritable expression changes WITHOUT DNA sequence change","Physics of cell membranes","Study of viral DNA"], ans:1 },
];

// ─── LESSONS ──────────────────────────────────────────────────────────────────
const LESSONS = {
  "The Seven Major Chakras": {
    level:1, duration:"55 min",
    overview:"A complete textbook-level study of the seven primary energy centers — Sanskrit names, locations, physiological correlates, psychological dimensions, and full clinical Reiki application.",
    sections:[
      { id:"s1", title:"Section 1 — What Is a Chakra?",
        teacher:"Before we open this lesson, take three slow breaths and place one hand on your heart. Feel the warmth there. That warmth — that gentle pulse — is part of what we study today. The chakra system is not abstract mysticism. It is a 4,000-year-old map of the living human energy field, developed through direct observation by Vedic seers, Tantric practitioners, and Ayurvedic physicians. Today we approach it with both reverence and scientific rigor.",
        note:"As we go through each chakra, feel into your own body. The best Reiki practitioners know this system from the inside out. Your body is your laboratory.",
        write:"WRITE THIS: Chakra (Sanskrit) = spinning wheel or vortex. Subtle energy centers along the spinal axis. Organs of the pranamaya kosha (energy body). 7 major chakras, 21 minor chakras, 72,000 nadis (channels). Dr. Hiroshi Motoyama (1981) detected measurable bioenergy differences at chakra locations. Kirlian photography and Korotkov GDV imaging also provide biofield visualization at these zones.",
        focus:"Motoyama's Chakra Instrument measured statistically significant differential bioelectrical readings at classical chakra zones vs control points. The chakras are not merely metaphors — something measurable exists at these anatomical locations. The question science asks is: what exactly is it, and how does it work?",
        body:"The word chakra means wheel or disk in Sanskrit. In the living body, chakras are spinning vortices of subtle energy — concentrations where prana (life force) gathers, transforms, and distributes itself to the physical, emotional, mental, and spiritual dimensions.\n\nThe system is described in the Vedas (1500–1000 BCE) and Upanishads, elaborated in Tantric texts of the 7th–12th centuries CE, and codified in the Sat-Cakra-Nirupana (1577 CE). Sir Arthur Avalon translated this as The Serpent Power (1919) — still essential reading for serious students.\n\n**Each chakra carries specific attributes:**\n\nLocation — a precise anatomical region along the spinal axis\nColor — a wavelength of visible light corresponding to its vibratory frequency\nElement — one of the five great elements (earth, water, fire, air, ether) plus light and pure consciousness\nSeed Mantra — a single syllable whose vibration resonates with the chakra\nPetals — symbolic lotus petals indicating the number of nadis converging there\nGland — a specific endocrine gland in modern physiological mapping\n\n**The Developmental Arc:**\n\nAnodea Judith demonstrated in Eastern Body Western Mind (1996) that each chakra corresponds to a stage of human psychological development — making the chakra system not just a spiritual map but a clinical psychological one. This is the framework we use throughout this programme.",
        quiz:[
          { q:"The classical Vedic text most authoritative on chakra descriptions is:", opts:["The Vedas","Sat-Cakra-Nirupana 1577 CE","The Upanishads","Yoga Sutras of Patanjali"], ans:1 },
          { q:"How many nadis does classical teaching describe?", opts:["12","360","72000","7"], ans:2 },
          { q:"Which researcher measured differential bioenergy at chakra locations?", opts:["Fritz-Albert Popp","Anodea Judith","Dr. Hiroshi Motoyama","Robert Becker"], ans:2 },
        ],
        checkpoint:"Before continuing: In your own words (3 to 5 sentences), explain why a system developed 4,000 years ago without modern instruments might still be clinically useful today. What kind of knowledge comes from millennia of hands-on observation that laboratory instruments cannot yet replicate?"
      },
      { id:"s2", title:"Section 2 — Root, Sacral and Solar Plexus",
        teacher:"We begin at the ground floor. Many spiritual practitioners rush toward the upper chakras and wonder why their lives feel unstable. Real healing starts at the root. Then we move upward through water and fire — from survival into feeling into power. Notice the quality shift as you ascend. Feel each one as you read.",
        note:"Notice your body as you read about Muladhara. Tense? Relaxed? Do themes of safety or belonging arise? That IS your root chakra giving you information about itself. Let this lesson be experiential, not just intellectual.",
        write:"WRITE ALL THREE: Muladhara: root chakra. Perineum. Earth element. Red 700nm. LAM mantra. 4 petals. Adrenal medulla (epinephrine). Theme: Survival, safety, grounding. --- Svadhisthana: sacral chakra. 2 inches below navel. Water element. Orange 620nm. VAM mantra. 6 petals. Gonads. Theme: Creativity, emotion, pleasure. --- Manipura: solar plexus. Epigastrium. Fire element. Yellow 580nm. RAM mantra. 10 petals. Adrenal cortex (cortisol). Theme: Will, self-esteem, personal power.",
        focus:"THE CORTISOL CONNECTION: The adrenal medulla (Muladhara correlate) produces epinephrine and norepinephrine. A chronically dysregulated root chakra IS a chronically dysregulated adrenal stress response — measurable in salivary cortisol. Chronically elevated cortisol produces: immune suppression, hippocampal atrophy, telomere shortening (Epel et al 2004), and visceral adiposity. Grounding practices normalize cortisol via parasympathetic activation. This is not metaphor — it is endocrinology.",
        body:"**MULADHARA — THE ROOT CHAKRA**\n\nLocation: Perineum, base of spine, pelvic floor. Element: Earth. Color: Red (700nm). Mantra: LAM. Gland: Adrenal medulla.\n\nThe root chakra governs survival, safety, physical vitality, and our sense of belonging. The developmental stage is infancy (0–18 months) — when the nervous system establishes its baseline of safety. The core question: Am I safe? Do I have the right to exist?\n\nBalanced: Groundedness, physical vitality, material security, basic trust.\nDeficient: Chronic anxiety, disconnection, financial instability, adrenal exhaustion.\nExcessive: Rigidity, hoarding, materialism, resistance to change.\n\n---\n\n**SVADHISTHANA — THE SACRAL CHAKRA**\n\nLocation: 2–3 inches below navel. Element: Water. Color: Orange (620nm). Mantra: VAM. Gland: Gonads.\n\nThe enteric nervous system (ENS) is Svadhisthana's primary neural correlate. 400–500 million neurons in the gut wall produce 95% of the body's serotonin. The ENS communicates to the brain via 80% afferent (upward) vagal fibers — meaning the gut primarily tells the brain what it feels, not the reverse. This is the neurobiological mechanism of gut feeling.\n\nCore question: Is it safe to feel? Is it safe to want?\n\nBalanced: Emotional intelligence, creativity, healthy pleasure, fluid boundaries.\nDeficient: Emotional numbness, creative blocks, reproductive challenges.\nExcessive: Emotional flooding, addictive patterns, poor boundaries.\n\n---\n\n**MANIPURA — THE SOLAR PLEXUS CHAKRA**\n\nLocation: Epigastrium, T6–T12. Element: Fire. Color: Yellow (580nm). Mantra: RAM. Gland: Adrenal cortex.\n\nManipura is the seat of personal will, self-esteem, and the metabolic fire that transforms food and experience into energy and action. The adrenal cortex produces cortisol, aldosterone, and DHEA. Chronic shame and powerlessness — the core wounds of Manipura — elevate cortisol measurably. Healing practices increase DHEA while decreasing cortisol: a documentable shift in the Manipura biochemistry.\n\nCore question: Am I worthy? Do I have the right to act on my own desires?",
        quiz:[
          { q:"Which gland is the physiological correlate of Muladhara?", opts:["Thyroid","Adrenal medulla","Gonads","Pituitary"], ans:1 },
          { q:"Approximately what percentage of vagal fibers are afferent (gut to brain)?", opts:["20%","50%","80%","100%"], ans:2 },
          { q:"Manipura's endocrine correlate is the:", opts:["Adrenal medulla","Adrenal cortex","Thymus","Pineal gland"], ans:1 },
        ],
        checkpoint:"Connect the cortisol stress response to the concept of a wounded Manipura. If a child grows up in an environment of chronic shame and powerlessness, trace the biochemical path from that psychological experience to specific measurable physiological damage. Use at least two specific hormones or biological markers in your answer."
      },
      { id:"s3", title:"Section 3 — Heart, Throat, Third Eye and Crown",
        teacher:"We now enter the upper chakras — where the personal self opens into something larger. Anahata is the pivot: the 4th of 7, exactly centered, integrating survival and power into love. Pay special attention to the HeartMath research here. This is the most important scientific finding for understanding what you physically DO as a Reiki practitioner. Your heart field is your primary clinical instrument.",
        note:"Once you understand that your heart electromagnetic field — when coherent — literally entrains the recipient's brainwaves through touch, your entire approach to practice shifts. You stop thinking primarily about technique and start thinking primarily about state of being. That shift is the mark of an advanced practitioner.",
        write:"WRITE ALL FOUR: Anahata: Heart. Sternum. Air. Green/rose 520nm. YAM. 12 petals. Thymus (immune command). HeartMath: field extends 3-4 feet, 100x stronger than brain field. --- Vishuddha: Throat. Larynx. Ether. Blue 460nm. HAM. 16 petals. Thyroid. Theme: Authentic expression. --- Ajna: Third eye. Between brows. Light. Indigo 430nm. OM. 2 petals. Pituitary (master endocrine). Theme: Intuition, inner vision. --- Sahasrara: Crown. Pure consciousness. Violet/white. Silence. Pineal. Theme: Transcendence, conduit for universal ki.",
        focus:"HEARTMATH FINDING (McCraty et al 2009): The heart electromagnetic field extends 3–4 feet in a torus shape. It is 100 times stronger than the brain field. In cardiac coherence (smooth 0.1 Hz rhythm), this field becomes highly ordered and is registered in the recipient's EEG during therapeutic touch. The practitioner's coherent heart field literally entrains the recipient's nervous system. This is not intention — it is measurable electromagnetic physics. Your Anahata IS the primary clinical tool.",
        body:"**ANAHATA — THE HEART CHAKRA**\n\nLocation: Sternum center. Element: Air. Color: Green (520nm). Mantra: YAM. Gland: Thymus.\n\nAnahata is the axis mundi of the entire system — the 4th of 7, exactly centered. It integrates the lower three personal chakras (survival, pleasure, power) with the upper three transpersonal chakras (expression, perception, transcendence). Its Sanskrit name means unstruck sound — the primal vibration arising without collision.\n\nThe thymus, embedded in Anahata's zone, is the commander of the immune system. All T-cells mature here. The thymus is profoundly sensitive to stress (cortisol shrinks it) and love (positive emotions protect it). Immune health and heart health are not separate systems.\n\nHeartMath Research: The heart's electromagnetic field forms a torus extending 3–4 feet from the body in all directions. It is 100 times stronger in amplitude than the brain's field. It encodes emotional state. In cardiac coherence, the practitioner's field is registered in a touched person's EEG. The session IS the practitioner's field.\n\n---\n\n**VISHUDDHA — THE THROAT CHAKRA**\n\nLocation: Larynx. Element: Ether. Color: Blue (460nm). Mantra: HAM. Gland: Thyroid.\n\nThe thyroid governs metabolic rate — the rhythm and tempo of life's expression. Chronic suppression of authentic voice correlates with thyroid dysfunction, the most prevalent endocrine disorder in the Western world. It affects women at 5–8 times the rate of men. Women are statistically most socialized toward silence. The correlation is not coincidental.\n\n---\n\n**AJNA — THE THIRD EYE**\n\nLocation: Between brows. Element: Light. Color: Indigo (430nm). Mantra: OM. Gland: Pituitary.\n\nThe pituitary is the master endocrine gland — commanding GH, TSH, ACTH, FSH, LH, Prolactin, ADH, and Oxytocin. Oxytocin (released by therapeutic touch, warm presence, eye contact) reduces cortisol, enhances immune function, increases pain threshold, deepens trust, and promotes cellular healing. It is released in both practitioner and recipient during a Reiki session.\n\n---\n\n**SAHASRARA — THE CROWN**\n\nLocation: Crown and above. Pure Consciousness. Color: Violet or white. Mantra: Silence. Gland: Pineal.\n\nSahasrara is the point of transcendence — where individual consciousness expands into universal consciousness. In Reiki, it is the primary entry point of universal ki into the practitioner. The practitioner who has done genuine inner work at all seven levels channels with far greater depth than technique alone can provide.",
        quiz:[
          { q:"The heart electromagnetic field is how many times stronger than the brain field?", opts:["10 times","100 times","1000 times","Equal"], ans:1 },
          { q:"Oxytocin is released by:", opts:["Adrenal medulla","Posterior pituitary","Thyroid","Thymus"], ans:1 },
          { q:"Vishuddha corresponds to which endocrine gland?", opts:["Pituitary","Thymus","Thyroid","Pineal"], ans:2 },
        ],
        checkpoint:"The practitioner's heart electromagnetic field is the primary clinical instrument in Reiki. What does this mean for how you develop as a practitioner? Write a paragraph describing at least three specific daily practices that directly develop the coherence and therapeutic power of Anahata — drawing on the physiological evidence from this lesson."
      },
      { id:"s4", title:"Section 4 — Clinical Protocol and Integration",
        teacher:"Everything we have studied now comes together in the clinic. When you place your hands on a client, you are not just applying heat and good intention. You are interfacing with a living, intelligent energy system that has been mapped for thousands of years. The chakra system gives you a diagnostic and therapeutic map. Let me show you exactly how to use it.",
        note:"After completing this section, I strongly encourage you to practice the seven-chakra scan — on yourself or a willing partner — before our next lesson. That experiential session will consolidate everything from today more than any amount of re-reading.",
        write:"WRITE THE BYOSEN SCALE: 0 = No sensation. 1 = Slight warmth. 2 = Moderate heat. 3 = Strong pulsing or heat. 4 = Strong pulling sensation. 5 = Intense sensation (magnetic pull, tingling, strong heat or cold). Document Byosen scores for each chakra after every session. Over multiple sessions, persistent patterns constitute your objective (O) findings in the SOAP note.",
        focus:"Reading the field: Excess energy typically feels hot, thick, dense, pulsing, swollen. Deficient energy feels cold, empty, flat, thin, hollow, lifeless. Balanced energy feels warm, gently pulsing, alive, flowing. Trust the hibiki — the Japanese term for the resonance sensation that tells you where to keep your hands. Your hands are the instrument. Your coherent heart is the power source.",
        body:"**THE SEVEN CHAKRA REIKI CLINICAL PROTOCOL**\n\nOpening (Sahasrara): Hands gently on crown. Set intention internally. Hold 2–3 minutes.\n\nAjna (Third Eye): Hands over eyes, not touching. Assess temperature, pulsing, or stillness. Common finding: blocked in those who intellectualize rather than feel.\n\nVishuddha (Throat): Hands on sides of throat, never directly over larynx. Common: constriction in unexpressed grief or creative blocks.\n\nAnahata (Heart): One hand sternum, one between shoulder blades. Most emotionally charged position. Cold contracted field common in clients with significant loss.\n\nManipura (Solar Plexus): Hands on epigastrium and mid-back. Shame history: hot and defensive or cold and collapsed.\n\nSvadhisthana (Sacral): Lateral hip approach and sacrum. Allow emotional release without directing it. Heavy and dense: stagnation. Hollow: depletion.\n\nMuladhara (Root): Hands on knees, then ankles and feet. Grounding is the most needed intervention for most modern clients. Feeling energy drain down and out through the feet is an excellent clinical sign.\n\n**DOCUMENTATION**\n\nAfter each session, record Byosen scores (0–5) for each chakra. Over a series of sessions, track patterns. A client whose heart consistently shows 0 (no sensation) is telling you something important about their relational and emotional life. A client whose solar plexus consistently shows 5 (intense) may benefit from referral to a somatic therapist alongside Reiki.\n\n**SOAP NOTE FORMAT FOR REIKI**\n\nS (Subjective): What the client reports — presenting concern, pain scale, mood, sleep, since-last-session changes.\n\nO (Objective): Your bioenergetic findings — Byosen scores at each chakra, areas of heat or cold, any visible responses during session.\n\nA (Assessment): Your energetic pattern analysis — which chakras are reactive, your interpretation of the energetic picture.\n\nP (Plan): What you did this session, client response, recommendations, next session focus.",
        quiz:[
          { q:"A Byosen score of 4 indicates:", opts:["No sensation","Slight warmth","Strong heat","Strong pulling sensation"], ans:3 },
          { q:"Excess energy in a chakra typically feels:", opts:["Cold and empty","Hot, dense, and pulsing","Flat and lifeless","No different from surrounding areas"], ans:1 },
          { q:"In the SOAP format, bioenergetic findings (Byosen scores) are recorded in:", opts:["S — Subjective","O — Objective","A — Assessment","P — Plan"], ans:1 },
        ],
        checkpoint:"Write a complete SOAP note for this client: A 42-year-old woman, recently laid off, chronic lower back pain, unable to sleep, has not cried in three years since her divorce, reports feeling numb and stuck. Your scan finds: Root 4 (intense pulling), Sacral 1 (nearly absent), Solar Plexus 5 (hot and defensive), Heart 1 (cold and contracted), Throat 2, Third Eye 3, Crown 2. Write all four SOAP sections and explain your treatment rationale."
      },
    ]
  },

  "Biophotons Light from Living Systems": {
    level:3, duration:"55 min",
    overview:"A doctoral-level examination of ultraweak photon emission from living organisms — discovery, measurement, coherence, molecular sources, and implications for biofield science and Reiki therapy.",
    sections:[
      { id:"b1", title:"Section 1 — Discovery and Historical Context",
        teacher:"Every living cell in your body is emitting light right now. Not metaphorically — literally, measurably, physically. The scientist who first proved this spent decades fighting the scientific establishment. Understanding biophotons is foundational for doctoral Reiki practitioners because it establishes a real, measurable, physical basis for energy medicine. We are studying a phenomenon that mainstream biology has been slow to integrate. You are ahead of the curve.",
        note:"Hold two things simultaneously throughout this lesson: rigorous scientific skepticism — these are real measurements with real methodological challenges — and genuine openness to where the evidence points. The best scientists and the best healers share this quality: they follow evidence wherever it leads.",
        write:"WRITE: Biophoton emission (UPE — ultraweak photon emission): emission of extremely low-intensity light from living organisms. Intensity: 100 to 1000 photons per cm squared per second (10 billion times weaker than daylight). Spectrum: 200–800 nm (full visible spectrum). Key researchers: Gurwitsch (1923, mitogenic rays), Fritz-Albert Popp (1976 onwards, coherence). Detection: photomultiplier tubes (PMT), cooled CCD cameras. Sources: DNA pi-electron systems, mitochondria ETC electron leakage, membrane lipid peroxidation.",
        focus:"The critical distinction in biophoton research is not QUANTITY of emission but QUALITY — whether it is COHERENT (like laser light, with stable phase correlations) or INCOHERENT (random thermal radiation like a candle). Popp's evidence for coherence: hyperbolic time decay of re-emission after light stimulation — a mathematical signature specific to coherent optical cavity behavior. This is the foundation for understanding biophotons as a biological communication system, not merely metabolic noise.",
        body:"**ALEXANDER GURWITSCH AND THE MITOGENIC RAYS (1923)**\n\nRussian biologist Alexander Gurwitsch observed in 1923 that onion root tips divided more rapidly when pointed at each other — even with no physical or chemical contact. He hypothesized that cells emitted ultraviolet mitogenic rays capable of stimulating division in neighboring cells. Placing a UV-blocking filter between root tips eliminated the effect.\n\nSeveral laboratories replicated this finding in the 1920s and 1930s. But instruments of the era barely detected the signal, and the claim — cells communicating via light — was too far outside the prevailing paradigm of biochemical signaling. The research was largely abandoned with the rise of molecular biology. The discovery was not wrong. It was premature.\n\n**FRITZ-ALBERT POPP AND THE MODERN ERA**\n\nFritz-Albert Popp, German theoretical biophysicist, re-entered this territory in the 1970s with two critical advantages: photomultiplier tubes sensitive enough to count individual photons in near-darkness, and a theoretical framework from quantum optics connecting coherence theory to biological light.\n\nPopp was initially studying polycyclic aromatic hydrocarbons (PAHs) as potential carcinogens. He noticed: all strongly carcinogenic PAHs efficiently absorbed UV at 380nm and re-emitted at 430–450nm. Non-carcinogenic PAHs did not show this pattern. He hypothesized: carcinogenic PAHs are carcinogenic because they intercalate into DNA and disrupt its normal light-handling function. This led him to ask: do living cells use light as a communication medium?\n\n**PHOTOMULTIPLIER TUBE TECHNOLOGY**\n\nA PMT works by: (1) a single photon strikes a photocathode and releases one electron, (2) that electron is accelerated toward a series of dynodes, (3) at each dynode, cascade multiplication occurs — one electron releases several more, (4) after 10–15 stages, one original photon has produced 1 million to 10 million electrons, (5) the cascade is detected as a measurable electrical pulse — one photon counted.\n\nModern sensitivity: 1–10 photons per second per cm squared. Modern cooled CCD cameras (cooled to minus 40 degrees C) now enable whole-body biophoton imaging. In 30–60 minute exposures in total darkness, the human biophoton field reveals non-uniform distribution — highest emission from the face and hands — with patterns that change with health state, time of day, and acupuncture intervention.",
        quiz:[
          { q:"Gurwitsch's 1923 observation was that:", opts:["Cells emit X-rays","Root tips divided faster when pointed at each other without contact","DNA fluoresces under UV light","Mitochondria produce visible light"], ans:1 },
          { q:"Popp's entry point into biophoton research was:", opts:["Cancer cell cultures","Studying carcinogenic PAH photophysics","Acupuncture meridian research","NASA aerospace research"], ans:1 },
          { q:"Biophoton CCD cameras require cooling to approximately:", opts:["0 degrees C","Minus 10 degrees C","Minus 40 degrees C","Absolute zero"], ans:2 },
        ],
        checkpoint:"Why was Gurwitsch's 1923 discovery largely ignored despite multiple laboratory replications? Identify at least three factors — scientific, technological, and sociological. Then in what ways does the reception of biophoton research mirror the reception of Reiki research in mainstream medicine? Write a paragraph comparing the dynamics of paradigm-challenging science in both cases."
      },
      { id:"b2", title:"Section 2 — Coherence: The Property That Changes Everything",
        teacher:"This section contains the most scientifically important concept in the entire lesson. If you understand coherence — not just the word but the physical meaning — you will understand why biophotons are potentially a fundamental biological communication system, and why this matters for everything we do as healers. Read this section slowly. Twice if needed. Take active notes.",
        note:"The best analogy: two flashlight beams overlapping do not interfere — they just add randomly. That is incoherent light. Two laser beams DO interfere — they create holographic patterns and can transmit information encoded in their phase relationship. The difference between incoherent and coherent light is the difference between noise and signal. If biophotons are coherent, biological light is SIGNAL.",
        write:"WRITE CAREFULLY: COHERENT LIGHT: photons with correlated phase — in step with each other. Can produce interference patterns. Can carry information. Example: laser light. INCOHERENT LIGHT: random phase, no stable correlations. Cannot produce interference. Example: sunlight or candle flame. POPP'S EVIDENCE: Hyperbolic decay of delayed luminescence I(t) = I0 divided by (1 plus alpha times t) versus exponential decay I(t) = I0 times e to the power of minus t divided by tau for thermal/incoherent systems. The hyperbolic signature is the mathematical fingerprint of a coherent optical cavity. Biological tissue shows hyperbolic decay.",
        focus:"HEALTH EQUALS COHERENCE, NOT QUANTITY. Cancer cells emit MORE biophotons per unit time than healthy cells — but with LESS coherence. The signal is noisier, more random, more chaotic. This finding reframes energy medicine entirely: biological health correlates with the ORDER of biophoton emission, not its intensity. Energy medicine is coherence medicine — restoring ordered energetic patterns to disrupted tissues.",
        body:"**WHAT IS COHERENCE?**\n\nCoherence is a property of waves describing the degree to which waves are correlated in phase. Spatial coherence: all points across a beam are in step. Temporal coherence: the wave maintains stable phase relationship with itself over time.\n\nA laser produces highly coherent light. Consequences:\n- Maintains narrow beam over vast distances\n- Can produce holographic images (requires stable phase for interference patterns)\n- Can carry information encoded in phase relationships\n- Coherent waves can cancel or amplify each other in precisely predictable interference patterns\n\nIncoherent light (candle, sun, light bulb): photons emitted by independent random atomic transitions. No stable phase relationship. Cannot form stable interference patterns. Cannot encode phase information.\n\n**THE DELAYED LUMINESCENCE EXPERIMENT**\n\nPopp's experimental design:\n1. Briefly illuminate a biological sample with intense light\n2. Remove the light source immediately\n3. Measure subsequent photon emission with PMT over time\n4. Analyze the mathematical pattern of decay\n\nPrediction for incoherent/thermal system: exponential decay — rapid, random dissipation.\nPrediction for coherent optical cavity: hyperbolic decay — slow, structured, correlated release identical to laser resonator behavior.\n\nResult: biological tissue shows hyperbolic decay — the mathematical fingerprint of a coherent optical storage system. Replicated in unicellular organisms, plant tissue, animal tissue, and whole living organisms.\n\n**WHAT COHERENCE MEANS BIOLOGICALLY**\n\nIf biophotons are coherent:\n1. Biological light can encode information — the principle underlying holography\n2. Cells could coordinate via light — rapid optical signaling complementing slow chemical diffusion\n3. The body has an optical component — collagen fibers are genuine biological waveguides, guiding light along their length through total internal reflection\n4. Health equals coherence; disease equals decoherence — cancer cells emit more photons but less coherently\n\n**THE ACUPUNCTURE MERIDIAN FINDING**\n\nSchlebusch, Walburg, and Popp (2005) used whole-body biophoton CCD cameras on human subjects. Result: the classical acupuncture meridians of TCM — described for over 2,000 years without anatomical confirmation — correspond to pathways of significantly higher biophoton emission than surrounding tissue. A 2,000-year-old energetic map found in a 21st-century photon emission image.",
        quiz:[
          { q:"Biophoton coherence is evidenced mathematically by:", opts:["Linear decay after stimulation","Exponential decay after stimulation","Hyperbolic decay after stimulation","No measurable decay"], ans:2 },
          { q:"Cancer cells compared to healthy cells emit biophotons:", opts:["Less frequently with more coherence","More frequently with less coherence","Identically","Only in UV wavelengths"], ans:1 },
          { q:"Schlebusch et al 2005 found that acupuncture meridians correspond to:", opts:["Areas of lower temperature","Pathways of higher biophoton emission","Connective tissue planes only","Areas of higher electrical resistance"], ans:1 },
        ],
        checkpoint:"Explain in your own words — without looking at notes — three things: (1) the physical difference between coherent and incoherent light, (2) the experimental design Popp used to detect coherence in biological tissue, and (3) why the finding that cancer cells emit MORE but LESS coherently changes how we understand what energy means in energy medicine. Minimum 4 sentences per point."
      },
      { id:"b3", title:"Section 3 — DNA, Epigenetics and Healing",
        teacher:"We now arrive at the synthesis — connecting biophoton science to DNA, to epigenetics, and to the molecular basis of what Reiki practitioners mean when they describe clearing or restoring coherence in a client's field. The claim is bold: DNA is not merely a protein code. It is also a biological optical system. And the epigenetic changes that trauma writes into the genome may disrupt this optical system — which healing practices may restore. This is a fully testable, biologically rigorous hypothesis.",
        note:"We are at the frontier of science. This section presents the best hypothesis consistent with three converging and independently established bodies of evidence. As a doctoral Reiki practitioner, you inhabit this edge: rigorous scientific standards AND genuine openness to frontier evidence. This is what distinguishes doctoral-level practice.",
        write:"WRITE: POPP'S DNA HYPOTHESIS: DNA functions as a coherent biophoton store and emitter. Evidence: (1) Carcinogenic PAHs intercalate into DNA and disrupt UV absorption pattern — correlating cancer-causing ability with disruption of DNA optical function. (2) Ethidium bromide (DNA intercalator) significantly reduces cellular biophoton emission. (3) DNA bases contain pi-electron aromatic rings — efficient photon absorbers and stores. (4) Helical geometry of DNA creates optical cavity properties: 10 base pairs per full turn, 3.4 angstrom spacing resonant with UV/visible wavelengths.",
        focus:"THE THREE-WAY INTEGRATION: Popp's biophoton coherence + Meaney and Szyf's epigenetic trauma research + Reiki clinical observation all converge on the same molecular mechanism. Epigenetic trauma ALTERS DNA geometry (methylation changes 3D chromatin architecture) — disrupts DNA optical cavity properties — reduces biophoton coherence — disrupts the body's biological light coordination system. Healing practices restoring physiological coherence may restore DNA chromatin geometry measurable as increased biophoton coherence. This is a doctoral-level, fully testable research hypothesis.",
        body:"**THE CARCINOGEN-LIGHT CONNECTION**\n\nPopp's original insight: all strongly carcinogenic PAHs absorbed UV at 380nm and re-emitted at 430–450nm. Non-carcinogens did not show this pattern. His interpretation: carcinogenic PAHs are carcinogenic because they intercalate into DNA and disrupt its normal UV light function. Disruption of DNA's optical behavior initiates cancer.\n\n**DNA'S ARCHITECTURE AS AN OPTICAL SYSTEM**\n\nStacked base pairs: The nucleotide bases (A, T, G, C) are stacked like parallel plates at 3.4 angstroms along the helix axis. Their pi-electron systems — flat aromatic rings with delocalized electrons — are parallel to each other, ideal for exciton coupling where excitation energy is delocalized across multiple bases. This is the same mechanism enabling near-perfect energy transfer in photosynthesis (Fleming et al 2007, Nature).\n\nHelical geometry: B-DNA's 10 base pairs per full turn creates a periodic potential well for photons — similar to a laser's resonant cavity, favoring specific wavelengths.\n\nSupercoiling: In the nucleus, DNA is supercoiled around histones into chromatin — extending optical cavity properties to the macromolecular scale. Epigenetic modifications (methylation, histone acetylation) directly alter chromatin 3D geometry — altering its optical properties.\n\n**EXPERIMENTAL EVIDENCE**\n\nEthidium bromide (EtBr): EtBr intercalates between DNA base pairs, disrupting stacking geometry. Cells treated with EtBr show dramatically decreased biophoton emission — consistent with DNA as the primary source.\n\nUV-stressed cells: Cells exposed to UV show enhanced biophoton emission for days to weeks afterward — stored UV energy being slowly released in the characteristic hyperbolic pattern.\n\nMitotic pulses: At the moment of cell division, a measurable spike in biophoton emission occurs — consistent with supercoiled DNA unwinding and releasing stored photonic energy.\n\n**THE THREE-WAY INTEGRATION**\n\nEpigenetics (Meaney and Szyf 2005): Psychological trauma and chronic stress alter DNA methylation patterns and histone modifications — changing chromatin 3D architecture.\n\nBiophoton Optics (Popp): DNA's optical properties depend on its 3D geometry. Changes in chromatin architecture alter DNA's optical cavity properties — changing coherence and emission patterns of biophotons.\n\nReiki Clinical Observation: Experienced practitioners consistently describe observing a shift from chaotic to coherent in the client's field during effective treatment.\n\nSYNTHESIS HYPOTHESIS: If epigenetic changes alter DNA chromatin geometry, and DNA geometry determines biophoton coherence, and biophoton coherence is a measurable index of biological health, then healing practices restoring psychological safety and physiological coherence may produce measurable changes in DNA chromatin geometry — detectable as increased biophoton coherence and improved biological function.\n\nThis hypothesis is biologically plausible, mechanistically specific, and experimentally testable with current technology. This is doctoral-level research waiting to be done.",
        quiz:[
          { q:"Ethidium bromide reduces cellular biophoton emission because it:", opts:["Blocks the mitochondria","Intercalates between DNA base pairs disrupting stacking","Neutralizes reactive oxygen species","Inhibits RNA synthesis"], ans:1 },
          { q:"The Meaney and Szyf epigenetic research demonstrated that:", opts:["Genes cannot be changed by environment","Maternal care alters glucocorticoid receptor methylation and lifelong stress reactivity","All epigenetic marks are permanent","Biophotons are produced only by DNA"], ans:1 },
          { q:"The doctoral research hypothesis in this lesson proposes that Reiki may:", opts:["Replace all medical treatment","Produce measurable changes in DNA chromatin geometry detectable as biophoton coherence","Create new DNA sequences","Eliminate all epigenetic marks"], ans:1 },
        ],
        checkpoint:"Write a formal research hypothesis (150 to 200 words) integrating Popp's biophoton coherence theory, Meaney and Szyf's epigenetic findings, and your understanding of Reiki's therapeutic mechanism. Your hypothesis must: (1) identify the specific biological variable Reiki intervention would change, (2) explain the molecular mechanism, (3) identify how the outcome would be measured, and (4) state a testable prediction. This is the kind of thinking that generates doctoral research and advances the field."
      },
    ]
  },

  "The Flower of Life": {
    level:1, duration:"45 min",
    overview:"Sacred geometry as the mathematical language of creation — tracing the Flower of Life across ancient civilizations, through mathematics and biology, into the living practice of healing.",
    sections:[
      { id:"g1", title:"Section 1 — Sacred Geometry: The Language of Creation",
        teacher:"Sacred geometry is misunderstood in two opposite ways: dismissed as mystical decoration, or embraced without understanding why it matters. Today we treat it as what it actually is — the study of geometric patterns appearing universally in nature, mathematics, and across independent human civilizations. Mathematics does not lie. When the same proportions appear in a nautilus shell, a galaxy, a DNA molecule, and a Gothic cathedral built by people with no possible contact — that is data requiring an explanation.",
        note:"As you read this lesson, keep asking: Where do I see this in the body? Where in nature? Sacred geometry is not something you memorize — it is something you begin to SEE everywhere once you know what to look for. That perceptual shift is itself part of the healing education.",
        write:"WRITE: Sacred Geometry: the study of geometric forms and mathematical ratios appearing universally in nature, living organisms, and across independent human civilizations. These patterns represent the organizing principles of how energy crystallizes into physical form. Key patterns: Fibonacci spiral, Golden Ratio (phi = 1.618), Platonic solids, Flower of Life, Metatron's Cube, Sri Yantra, Merkaba (star tetrahedron).",
        focus:"The Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...) converges to phi = 1.618 when consecutive terms are divided. Fibonacci growth patterns appear throughout living organisms because they represent the most efficient packing and branching arrangement — minimizing material while maximizing structural integrity. Life and mathematics arrived at the same solution independently. This is evidence of a universal organizing principle.",
        body:"Sacred geometry recognizes that certain geometric forms appear across radically different scales and contexts with no obvious reason to share them.\n\nThe same spiral proportions: nautilus shell, spiral galaxy, hurricane, sunflower seeds, romanesco broccoli, cochlea of the human ear.\nThe same ratio (phi): DNA molecule dimensions, human hand proportions, Greek architecture, Great Pyramid of Giza, rabbit population growth.\nThe same five geometric solids Plato described in 360 BCE: structural geometry of viruses, carbon molecules, water crystallization, and mineral crystal systems.\n\n**THE HISTORICAL RECORD**\n\nThe Flower of Life pattern has been found at:\n- Temple of Osiris at Abydos, Egypt (estimated 6,000 or more years old — pre-dynastic period)\n- Assyrian palace at Nimrud, Iraq (9th century BCE)\n- The Temple Mount, Jerusalem\n- Temples at Ephesus, Turkey (4th century BCE)\n- The Forbidden City, Beijing, China\n- Temples in Hampi, India (14th–16th century CE)\n- Gothic cathedrals across Europe (12th–15th century CE)\n- Byzantine-period synagogues in northern Israel\n\nNo cultural contact between ancient Egypt and medieval China — yet the identical pattern. This is what universal means in sacred geometry.\n\n**PLATO'S TIMAEUS (360 BCE)**\n\nPlato wrote that the universe was constructed using geometric forms — the five Platonic solids as structural templates of the five elements. This was a cosmological claim: matter is organized according to mathematical principles. Twenty-four centuries later, we confirmed this in viral capsid geometry, organic chemistry (tetrahedral carbon bonding), and mineralogy. Plato was not merely philosophizing. He was doing structural biology two millennia early.",
        quiz:[
          { q:"The Flower of Life at the Temple of Osiris in Abydos is estimated to be:", opts:["1000 years old","3000 years old","6000 or more years old","200 years old"], ans:2 },
          { q:"Fibonacci growth patterns appear throughout biology because they represent:", opts:["The most aesthetically pleasing arrangement","The most efficient packing minimizing material while maximizing integrity","A divine revelation","A mathematical coincidence"], ans:1 },
          { q:"Plato's five Platonic solids have been confirmed in the geometry of:", opts:["Viral capsids and carbon chemistry","Only abstract mathematics","Medieval art only","Ancient Egypt exclusively"], ans:0 },
        ],
        checkpoint:"Write three examples from your own observation of repeating geometric patterns in nature, architecture, your body, or daily life. Then write one sentence about what it would mean clinically for a healer to understand these patterns — not just philosophically, but in terms of working with energy that follows these same organizing principles."
      },
      { id:"g2", title:"Section 2 — The Seed, Flower, and the Golden Ratio",
        teacher:"Now we work with the geometry itself. Draw this by hand as I describe it — or trace the construction in your mind step by step. Understanding sacred geometry as a constructive process transforms your relationship to it completely. This is how the ancient geometers worked: compass and straightedge, constructing reality from first principles. When you construct the Flower of Life, you are retracing the act of creation.",
        note:"If you have a compass and blank paper: stop and get them right now. Drawing the Flower of Life by hand is a meditative, sacred act. Twenty minutes with a compass will teach you more than two hours of reading. The proportion of time you spend drawing will correlate with how deeply this lesson integrates.",
        write:"WRITE CONSTRUCTION STEPS: 1. Draw a circle of radius r. Mark center O. 2. Place compass on the circumference. Draw a second identical circle passing through O. 3. At one of the two intersection points, draw a third identical circle. 4. Continue — 6 circles ring the first, each centered on the circumference of the previous, equally spaced. This is the SEED OF LIFE (7 circles total). 5. Continue the same pattern outward in all directions. This is the FLOWER OF LIFE. --- Also write: phi = (1 plus root 5) divided by 2 = 1.61803. DNA helix: 34 angstroms length per turn, 21 angstroms diameter. 34 divided by 21 = 1.619 approximately equals phi.",
        focus:"THE DNA MOLECULE: Each full helical turn of B-form DNA measures 34 angstroms in length and 21 angstroms in diameter. 34 divided by 21 = 1.619 which approximately equals phi. The most fundamental molecule of all known biological life — carrying the instructions for every living thing on Earth — is geometrically organized according to the Golden Ratio at the molecular scale. This is not an approximation. It is exact. The blueprint of biological life is written in phi.",
        body:"**THE VESICA PISCIS — THE FIRST DIVISION**\n\nWhen a second circle of identical radius is drawn with its center on the circumference of the first, and its circumference passing through the first's center, the vesica piscis emerges at their intersection. Its proportions: width equals r, height equals r times the square root of 3. The ratio 1 to root 3 appears in equilateral triangle geometry, Stonehenge, Chartres Cathedral, and the early Christian fish symbol. The vesica piscis has been called the womb of the universe — the geometry of the moment of creation.\n\n**THE SEED OF LIFE**\n\nSeven circles in the construction above form the Seed of Life — one central, six surrounding in perfect hexagonal symmetry. It contains 6 vesica piscis shapes, perfect 60 degree angular symmetry, and the template for all Platonic forms.\n\nStrikingly, it mirrors early human embryonic cell division:\n- Day 0: Single fertilized zygote (the original circle)\n- Day 1 to 2: 2-cell stage (the vesica piscis)\n- Day 2 to 3: 4-cell stage\n- Day 3 to 4: 8-cell stage (morula)\n- Day 4 to 5: 16-cell stage (early blastocyst)\n\nThe geometric pattern of how human life begins mirrors the construction of the Seed of Life.\n\n**THE GOLDEN RATIO PHI**\n\nphi = (1 plus the square root of 5) divided by 2 = 1.61803398...\n\nUnique self-referential property: phi squared equals phi plus 1. No other number has this property.\n\nThe Fibonacci sequence 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55... converges to phi when consecutive terms are divided:\n3 divided by 2 = 1.500\n5 divided by 3 = 1.667\n13 divided by 8 = 1.625\n34 divided by 21 = 1.619\n89 divided by 55 = 1.618...\n\n**PHI IN THE HUMAN BODY**\n\nEach finger bone is approximately phi times the length of the next smaller phalanx.\nFull hand length to forearm length is approximately phi.\nNavel height to total height is approximately phi.\nThe cochlea spiral allows hearing across 10 octaves with consistent sensitivity because each octave occupies the same angle of the golden spiral.\nPulmonary arteries branch in a Fibonacci pattern creating 70 square meters of surface area in a volume that fits in the chest.\nDNA: 34 angstroms per turn, 21 angstroms diameter. 34 divided by 21 = 1.619. The molecular blueprint of all life encoded in phi.",
        quiz:[
          { q:"The vesica piscis is formed when:", opts:["Three circles overlap equally","Two equal circles pass through each other's centers","A circle is divided by a diameter","Five circles are arranged in a pentagon"], ans:1 },
          { q:"The Fibonacci sequence converges toward:", opts:["Pi (3.14159)","Euler's number (2.718)","Phi (1.618)","The square root of 2"], ans:2 },
          { q:"Each full turn of DNA helix measures 34 angstroms long and 21 angstroms wide. Their ratio approximates:", opts:["Pi","Euler's number e","Phi — the Golden Ratio","The square root of 3"], ans:2 },
        ],
        checkpoint:"DNA's dimensions follow the Golden Ratio exactly. Fibonacci growth patterns govern biological development. The Flower of Life appears independently in ancient civilizations with no known contact. Write 4 to 6 sentences: What does this convergence of evidence suggest about the nature of the universal life force energy that Reiki practitioners work with? If a mathematical organizing principle underlies galaxy spirals, DNA, and human hand proportions equally — what does that suggest about ki, prana, and Qi as traditional concepts?"
      },
    ]
  },
};

// ─── CHART DATA ───────────────────────────────────────────────────────────────
const chakraD=[{s:"Root",A:82,B:55},{s:"Sacral",A:52,B:72},{s:"Solar",A:40,B:65},{s:"Heart",A:90,B:70},{s:"Throat",A:45,B:78},{s:"3rd Eye",A:74,B:65},{s:"Crown",A:60,B:60}];
const bpD=[{t:"0s",h:108,c:332,p:128},{t:"5s",h:105,c:305,p:126},{t:"10s",h:103,c:280,p:124},{t:"15s",h:101,c:260,p:122},{t:"20s",h:99,c:245,p:121},{t:"25s",h:98,c:235,p:120},{t:"30s",h:97,c:228,p:119}];
const epD=[{x:"High Stress",m:88,e:12},{x:"Moderate",m:64,e:36},{x:"Baseline",m:50,e:50},{x:"4wk Med",m:34,e:66},{x:"8wk Reiki",m:21,e:79},{x:"12wk",m:14,e:86}];

// ─── SVG COMPONENTS ──────────────────────────────────────────────────────────
function FlowerSVG() {
  const r=26, cx=140, cy=140;
  const pts=[[cx,cy]];
  for(let i=0;i<6;i++){const a=i*Math.PI/3;pts.push([cx+r*Math.cos(a),cy+r*Math.sin(a)]);}
  for(let i=0;i<6;i++){const a=i*Math.PI/3;pts.push([cx+2*r*Math.cos(a),cy+2*r*Math.sin(a)]);}
  for(let i=0;i<6;i++){const a=(i+.5)*Math.PI/3;pts.push([cx+r*Math.sqrt(3)*Math.cos(a),cy+r*Math.sqrt(3)*Math.sin(a)]);}
  return (
    <svg viewBox="0 0 280 280" style={{width:"100%",maxWidth:220,display:"block",margin:"0 auto"}}>
      <defs>
        {COLORS.map((c,i)=>(
          <radialGradient key={i} id={"fg"+i} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c} stopOpacity="0.4"/>
            <stop offset="100%" stopColor={c} stopOpacity="0.02"/>
          </radialGradient>
        ))}
      </defs>
      {pts.map((p,i)=>(
        <circle key={i} cx={p[0]} cy={p[1]} r={r} fill={"url(#fg"+(i%7)+")"} stroke={COLORS[i%7]} strokeWidth="0.7" strokeOpacity="0.5"/>
      ))}
      <circle cx={cx} cy={cy} r={r*2.65} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
    </svg>
  );
}

function ChakraSVG() {
  const cks=[
    {y:22,c:"#8B00FF",en:"Crown",m:"—"},
    {y:64,c:"#4B0082",en:"Third Eye",m:"OM"},
    {y:106,c:"#0099FF",en:"Throat",m:"HAM"},
    {y:148,c:"#00C853",en:"Heart",m:"YAM"},
    {y:190,c:"#FFD700",en:"Solar Plexus",m:"RAM"},
    {y:232,c:"#FF7F00",en:"Sacral",m:"VAM"},
    {y:274,c:"#FF2400",en:"Root",m:"LAM"},
  ];
  return (
    <svg viewBox="0 0 200 300" style={{width:"100%",maxWidth:180,display:"block",margin:"0 auto"}}>
      <line x1="100" y1="5" x2="100" y2="295" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
      {cks.map((c,i)=>(
        <g key={i}>
          <ellipse cx={100} cy={c.y} rx={26} ry={11} fill={c.c} fillOpacity="0.15"/>
          <circle cx={100} cy={c.y} r={13} fill={c.c} fillOpacity="0.25" stroke={c.c} strokeWidth="1.5"/>
          <text x={118} y={c.y-4} fontSize="7" fill={c.c} fontFamily="Georgia">{c.en}</text>
          <text x={118} y={c.y+5} fontSize="6" fill="rgba(255,255,255,0.35)" fontFamily="Georgia">{c.m}</text>
        </g>
      ))}
    </svg>
  );
}

// ─── MINI QUIZ ────────────────────────────────────────────────────────────────
function MiniQuiz({qs, accent}) {
  const [a,setA]=useState({});
  const [sub,setSub]=useState(false);
  const score=qs.filter((q,i)=>a[i]===q.ans).length;
  return (
    <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid "+accent+"28",borderRadius:10,padding:16,margin:"16px 0"}}>
      <div style={{color:accent,fontSize:10,letterSpacing:2,marginBottom:12,textTransform:"uppercase"}}>Comprehension Check</div>
      {qs.map((q,qi)=>(
        <div key={qi} style={{marginBottom:12}}>
          <p style={{color:"rgba(232,228,220,0.88)",fontSize:14,margin:"0 0 7px",fontFamily:"Georgia",lineHeight:1.6}}>{qi+1}. {q.q}</p>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {q.opts.map((opt,oi)=>{
              const sel=a[qi]===oi, cor=oi===q.ans;
              let bg="rgba(255,255,255,0.025)", bd="rgba(255,255,255,0.09)", col="rgba(232,228,220,0.6)";
              if(sub){
                if(cor){bg="rgba(0,200,83,0.12)";bd="#00C853";col="#00C853";}
                else if(sel){bg="rgba(255,36,0,0.12)";bd="#FF4444";col="#FF4444";}
              } else if(sel){bg=accent+"18";bd=accent;col=accent;}
              return (
                <button key={oi} disabled={sub} onClick={()=>!sub&&setA(x=>({...x,[qi]:oi}))}
                  style={{background:bg,border:"1px solid "+bd,borderRadius:6,padding:"7px 12px",color:col,fontSize:13,textAlign:"left",cursor:sub?"default":"pointer",fontFamily:"Georgia",transition:"all 0.15s"}}>
                  <span style={{opacity:0.45,marginRight:8}}>{["A","B","C","D"][oi]}.</span>{opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {!sub
        ? <button onClick={()=>Object.keys(a).length===qs.length&&setSub(true)}
            style={{marginTop:4,background:accent+"15",border:"1px solid "+accent,borderRadius:6,padding:"6px 16px",color:accent,fontSize:11,cursor:"pointer",letterSpacing:1}}>
            Submit
          </button>
        : <div style={{color:score===qs.length?"#00C853":"#FFD700",fontSize:13,fontWeight:"bold",marginTop:7}}>
            {score}/{qs.length} correct {score===qs.length?" — Perfect!":""}
          </div>
      }
    </div>
  );
}

// ─── TEACHER PANEL ────────────────────────────────────────────────────────────
function TeacherPanel({sec, accent, notes, onNote, cpA, onCP}) {
  const [tab,setTab]=useState("prof");
  const [cpTxt,setCpTxt]=useState("");
  const key=sec?sec.id:"";
  const done=cpA[key];

  return (
    <div style={{background:"rgba(4,8,20,0.99)",borderLeft:"1px solid "+accent+"18",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{display:"flex",borderBottom:"1px solid "+accent+"15",flexShrink:0}}>
        {[["prof","Professor"],["notes","Notes"],["focus","Focus"]].map(([t,lb])=>(
          <button key={t} onClick={()=>setTab(t)}
            style={{flex:1,padding:"9px 2px",background:tab===t?accent+"14":"transparent",border:"none",color:tab===t?accent:"rgba(232,228,220,0.32)",fontSize:9,letterSpacing:1.5,cursor:"pointer",transition:"all 0.15s"}}>
            {lb}
          </button>
        ))}
      </div>

      <div style={{flex:1,overflowY:"auto",padding:14}}>

        {tab==="prof" && sec && (
          <div>
            <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:12}}>
              <div style={{width:38,height:38,borderRadius:"50%",background:"linear-gradient(135deg,#FFD700,"+accent+")",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:"bold",color:"#050912",flexShrink:0}}>JST</div>
              <div>
                <div style={{color:"#FFD700",fontSize:11,fontWeight:"bold"}}>Jezrah Starflower Tracy</div>
                <div style={{color:"rgba(232,228,220,0.28)",fontSize:9,letterSpacing:1}}>DR. OF REIKI THERAPY</div>
              </div>
            </div>
            <div style={{background:accent+"09",border:"1px solid "+accent+"1e",borderRadius:8,padding:12,marginBottom:12}}>
              <p style={{color:"rgba(232,228,220,0.72)",fontSize:12,lineHeight:1.82,fontFamily:"Georgia",fontStyle:"italic",margin:0}}>"{sec.teacher}"</p>
            </div>
            {sec.note && (
              <div style={{background:"rgba(255,215,0,0.05)",border:"1px solid rgba(255,215,0,0.16)",borderRadius:7,padding:10,marginBottom:12}}>
                <div style={{color:"#FFD700",fontSize:9,letterSpacing:2,marginBottom:4}}>TEACHING NOTE</div>
                <p style={{color:"rgba(232,228,220,0.58)",fontSize:11,lineHeight:1.7,fontFamily:"Georgia",margin:0}}>{sec.note}</p>
              </div>
            )}
            {sec.checkpoint && (
              <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid "+accent+"30",borderRadius:9,padding:12}}>
                <div style={{color:accent,fontSize:9,letterSpacing:2,marginBottom:7,textTransform:"uppercase"}}>Checkpoint</div>
                <p style={{color:"rgba(232,228,220,0.78)",fontSize:12,lineHeight:1.7,fontFamily:"Georgia",margin:"0 0 10px"}}>{sec.checkpoint}</p>
                {done ? (
                  <div style={{background:"rgba(0,200,83,0.08)",border:"1px solid rgba(0,200,83,0.22)",borderRadius:6,padding:8}}>
                    <div style={{color:"#00C853",fontSize:9,marginBottom:3}}>Saved to your notes</div>
                    <p style={{color:"rgba(232,228,220,0.48)",fontSize:11,fontFamily:"Georgia",fontStyle:"italic",margin:0}}>{done.slice(0,100)}{done.length>100?"...":""}</p>
                  </div>
                ) : (
                  <div>
                    <textarea value={cpTxt} onChange={e=>setCpTxt(e.target.value)} placeholder="Write your answer here..."
                      style={{width:"100%",minHeight:75,background:"rgba(255,255,255,0.03)",border:"1px solid "+accent+"26",borderRadius:6,padding:"7px 9px",color:"rgba(232,228,220,0.8)",fontSize:11,fontFamily:"Georgia",resize:"vertical",outline:"none",boxSizing:"border-box",lineHeight:1.65}}/>
                    <button onClick={()=>{
                      if(cpTxt.trim()){
                        onCP(key,cpTxt);
                        onNote("\n\n-- "+sec.title+" [CHECKPOINT] --\n"+sec.checkpoint+"\n\nAnswer: "+cpTxt+"\n","append");
                        setCpTxt("");
                      }
                    }} style={{marginTop:6,background:accent+"18",border:"1px solid "+accent,borderRadius:5,padding:"5px 12px",color:accent,fontSize:10,cursor:"pointer",width:"100%",letterSpacing:1}}>
                      Save to Notes
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {tab==="notes" && (
          <div>
            <div style={{color:accent,fontSize:9,letterSpacing:2,marginBottom:8,textTransform:"uppercase"}}>Your Notes</div>
            <textarea value={notes} onChange={e=>onNote(e.target.value,"replace")}
              placeholder={"Start your notes here.\n\nProfessor Jezrah will prompt you with specific things to write throughout each section. Look for the WRITE THIS prompts.\n\nThis is your personal study document — it saves as you type."}
              style={{width:"100%",minHeight:290,background:"rgba(255,255,255,0.025)",border:"1px solid "+accent+"15",borderRadius:7,padding:"9px 11px",color:"rgba(232,228,220,0.82)",fontSize:11,fontFamily:"Georgia",resize:"vertical",outline:"none",lineHeight:1.82,boxSizing:"border-box"}}/>
            <div style={{display:"flex",gap:5,marginTop:7}}>
              <button onClick={()=>{
                const b=new Blob([notes],{type:"text/plain"});
                const u=URL.createObjectURL(b);
                const a2=document.createElement("a");
                a2.href=u;a2.download="reiki_notes.txt";a2.click();URL.revokeObjectURL(u);
              }} style={{flex:1,background:"rgba(255,255,255,0.04)",border:"1px solid "+accent+"22",borderRadius:5,padding:"6px",color:"rgba(232,228,220,0.42)",fontSize:10,cursor:"pointer"}}>
                Download Notes
              </button>
              <button onClick={()=>onNote("","replace")} style={{background:"rgba(255,36,0,0.07)",border:"1px solid rgba(255,36,0,0.14)",borderRadius:5,padding:"6px 10px",color:"rgba(255,36,0,0.4)",fontSize:10,cursor:"pointer"}}>Clear</button>
            </div>
          </div>
        )}

        {tab==="focus" && sec && (
          <div>
            {sec.focus && (
              <div style={{background:accent+"0b",border:"2px solid "+accent+"30",borderRadius:9,padding:13,marginBottom:12}}>
                <div style={{color:accent,fontSize:9,letterSpacing:2,marginBottom:7,textTransform:"uppercase"}}>Focus Point</div>
                <p style={{color:"rgba(232,228,220,0.88)",fontSize:12,lineHeight:1.82,fontFamily:"Georgia",margin:0}}>{sec.focus}</p>
              </div>
            )}
            {sec.write && (
              <div style={{background:"rgba(255,215,0,0.055)",border:"1px solid rgba(255,215,0,0.2)",borderRadius:9,padding:12}}>
                <div style={{color:"#FFD700",fontSize:9,letterSpacing:2,marginBottom:6,textTransform:"uppercase"}}>Write This Down</div>
                <p style={{color:"rgba(232,228,220,0.72)",fontSize:11,lineHeight:1.82,fontFamily:"Georgia",margin:"0 0 8px"}}>{sec.write}</p>
                <button onClick={()=>{onNote("\n-- "+sec.title+" --\n"+sec.write+"\n","append");setTab("notes");}}
                  style={{background:"rgba(255,215,0,0.1)",border:"1px solid rgba(255,215,0,0.22)",borderRadius:5,padding:"4px 10px",color:"#FFD700",fontSize:10,cursor:"pointer"}}>
                  Add to My Notes
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LESSON SCREEN ────────────────────────────────────────────────────────────
function LessonScreen({lKey, lvData, user, onBack, onComplete}) {
  const lesson=LESSONS[lKey];
  const [si,setSi]=useState(0);
  const [notes,setNotes]=useState(user?user.notes:"");
  const [cpA,setCpA]=useState(user?user.checkpoints:{});
  const [speaking,setSpeaking]=useState(false);
  const [showNav,setShowNav]=useState(false);
  const ref=useRef(null);
  const accent=lvData?lvData.color:"#00C853";

  if(!lesson) {
    // Fallback for lessons not yet fully written — show structured preview
    const lv=lvData||{color:"#00C853",grad:"linear-gradient(135deg,#FFD700,#00C853)"};
    return (
      <div style={{minHeight:"100vh",background:"radial-gradient(ellipse at 15% 0%,#0d1a2e 0%,#050912 70%)",fontFamily:"Georgia",color:"rgba(232,228,220,0.85)"}}>
        <div style={{height:3,background:"linear-gradient(90deg,"+COLORS.join(",")+")",opacity:0.6}}/>
        <div style={{background:"rgba(4,8,20,0.99)",borderBottom:"1px solid rgba(255,255,255,0.08)",padding:"10px 16px",display:"flex",gap:10,alignItems:"center"}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:5,padding:"5px 12px",color:"rgba(232,228,220,0.5)",fontSize:11,cursor:"pointer"}}>Back</button>
          <span style={{color:lv.color,fontSize:11,letterSpacing:1}}>{lKey}</span>
        </div>
        <div style={{maxWidth:720,margin:"0 auto",padding:"40px 24px"}}>
          <div style={{marginBottom:24}}>
            <div style={{fontSize:9,letterSpacing:3,color:lv.color,textTransform:"uppercase",marginBottom:8}}>Full Lesson — Jezrah Starflower Tracy</div>
            <h2 style={{fontSize:28,fontWeight:"normal",color:"rgba(232,228,220,0.95)",margin:"0 0 8px"}}>{lKey}</h2>
            <div style={{height:2,background:"linear-gradient(90deg,"+lv.color+",transparent)",width:100,marginBottom:20}}/>
          </div>
          <div style={{background:lv.color+"0d",border:"1px solid "+lv.color+"30",borderRadius:12,padding:"24px 28px",marginBottom:24}}>
            <div style={{color:lv.color,fontSize:11,letterSpacing:2,marginBottom:12,textTransform:"uppercase"}}>Professor Jezrah Starflower Tracy</div>
            <p style={{color:"rgba(232,228,220,0.75)",fontSize:14,lineHeight:1.85,fontFamily:"Georgia",fontStyle:"italic",margin:"0 0 16px"}}>
              "This lesson is part of the full Reiki Mastery Journey curriculum. The complete textbook content for {lKey} covers all key concepts, clinical applications, diagrams, quizzes, and interactive checkpoints in the full programme materials."
            </p>
            <p style={{color:"rgba(232,228,220,0.6)",fontSize:13,lineHeight:1.8,fontFamily:"Georgia",margin:0}}>
              While this lesson loads its full interactive content, use the notes panel to record what you already know about this topic and any questions you want answered. The teacher panel, comprehension quizzes, charts, and deep textbook sections are all part of the complete programme.
            </p>
          </div>
          <div style={{background:"rgba(255,215,0,0.06)",border:"1px solid rgba(255,215,0,0.2)",borderLeft:"4px solid #FFD700",borderRadius:8,padding:"14px 18px",marginBottom:20}}>
            <div style={{color:"#FFD700",fontSize:10,letterSpacing:2,marginBottom:8,textTransform:"uppercase"}}>While You Wait — Study Prompt</div>
            <p style={{color:"rgba(232,228,220,0.8)",fontSize:13,lineHeight:1.8,fontFamily:"Georgia",margin:0}}>
              Open your notes and write everything you currently know or have heard about <strong style={{color:"#FFD700"}}>{lKey}</strong>. Note any questions you want the full lesson to answer. This pre-learning reflection dramatically increases retention when the full content arrives.
            </p>
          </div>
          <div style={{display:"flex",gap:12,marginTop:32}}>
            <button onClick={onBack} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"10px 20px",color:"rgba(232,228,220,0.6)",fontSize:13,cursor:"pointer"}}>Back to Level</button>
            <button onClick={()=>onComplete(lKey)} style={{background:lv.grad,border:"none",borderRadius:8,padding:"10px 24px",color:"white",fontSize:13,cursor:"pointer"}}>Mark as Reviewed</button>
          </div>
        </div>
      </div>
    );
  }
  const sec=lesson.sections[si];
  const total=lesson.sections.length;
  const pct=Math.round(((si+1)/total)*100);

  const handleNote=(v,mode)=>{const n=mode==="append"?notes+v:v;setNotes(n);if(user)user.notes=n;};
  const handleCP=(k,v)=>{const u={...cpA,[k]:v};setCpA(u);if(user)user.checkpoints=u;};

  const speak=()=>{
    if(!window.speechSynthesis) return;
    if(speaking){window.speechSynthesis.cancel();setSpeaking(false);return;}
    const txt=sec.title+". "+sec.body.replace(/\*\*/g,"").replace(/\n/g," ").slice(0,2000);
    const u=new SpeechSynthesisUtterance(txt);
    u.rate=0.87; u.onend=()=>setSpeaking(false);
    window.speechSynthesis.speak(u); setSpeaking(true);
  };

  const goNext=()=>{
    if(speaking){window.speechSynthesis.cancel();setSpeaking(false);}
    if(si<total-1){setSi(i=>i+1);setTimeout(()=>ref.current&&ref.current.scrollTo(0,0),50);}
    else{onComplete(lKey);}
  };
  const goPrev=()=>{
    if(speaking){window.speechSynthesis.cancel();setSpeaking(false);}
    if(si>0){setSi(i=>i-1);setTimeout(()=>ref.current&&ref.current.scrollTo(0,0),50);}
  };

  const renderBody=(txt)=>txt.split("\n").map((line,i)=>{
    if(!line.trim()) return <br key={i}/>;
    if(line==="---") return <hr key={i} style={{border:"none",borderTop:"1px solid "+accent+"1e",margin:"18px 0"}}/>;
    if(line.startsWith("**")&&line.endsWith("**")) return <h4 key={i} style={{color:accent,fontSize:15,margin:"16px 0 5px",fontFamily:"Georgia",fontWeight:"bold"}}>{line.replace(/\*\*/g,"")}</h4>;
    if(line.startsWith("- ")) return (
      <div key={i} style={{display:"flex",gap:9,marginBottom:6}}>
        <span style={{color:accent,flexShrink:0,marginTop:3,fontSize:10}}>◆</span>
        <span style={{color:"rgba(232,228,220,0.8)",fontSize:14,lineHeight:1.82,fontFamily:"Georgia"}}>{line.slice(2).replace(/\*\*/g,"")}</span>
      </div>
    );
    return <p key={i} style={{color:"rgba(232,228,220,0.82)",fontSize:15,lineHeight:1.9,margin:"0 0 12px",fontFamily:"Georgia"}}>{line.replace(/\*\*/g,"")}</p>;
  });

  const showChakraChart = lKey==="The Seven Major Chakras" && si===0;
  const showBPChart = lKey==="Biophotons Light from Living Systems" && si===0;
  const showFlower = lKey==="The Flower of Life" && si===0;
  const showEpChart = lKey==="Biophotons Light from Living Systems" && si===2;

  return (
    <div style={{minHeight:"100vh",background:"radial-gradient(ellipse at 15% 0%,#0d1a2e 0%,#050912 70%)",fontFamily:"Georgia",display:"flex",flexDirection:"column"}}>
      <div style={{height:3,background:"linear-gradient(90deg,"+COLORS.join(",")+")",opacity:0.6}}/>

      {/* TOP BAR */}
      <div style={{background:"rgba(4,8,20,0.99)",backdropFilter:"blur(12px)",borderBottom:"1px solid "+accent+"18",padding:"7px 14px",display:"flex",alignItems:"center",gap:10,flexShrink:0,zIndex:30,flexWrap:"wrap"}}>
        <button onClick={()=>{if(speaking){window.speechSynthesis.cancel();setSpeaking(false);}onBack();}}
          style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:5,padding:"5px 12px",color:"rgba(232,228,220,0.5)",fontSize:11,cursor:"pointer"}}>
          Back
        </button>
        <div style={{flex:1,minWidth:80}}>
          <div style={{color:accent,fontSize:9,letterSpacing:1,textTransform:"uppercase",marginBottom:2,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{lKey}</div>
          <div style={{height:3,background:"rgba(255,255,255,0.06)",borderRadius:2}}>
            <div style={{height:"100%",width:pct+"%",background:"linear-gradient(90deg,"+accent+",#8B00FF)",borderRadius:2,transition:"width 0.4s"}}/>
          </div>
        </div>
        <span style={{fontSize:10,color:"rgba(232,228,220,0.3)",whiteSpace:"nowrap"}}>{si+1}/{total}</span>
        <button onClick={speak}
          style={{background:speaking?"rgba(0,200,83,0.15)":"rgba(255,255,255,0.03)",border:"1px solid "+(speaking?"#00C853":"rgba(255,255,255,0.1)"),borderRadius:5,padding:"5px 10px",color:speaking?"#00C853":"rgba(232,228,220,0.45)",fontSize:11,cursor:"pointer",whiteSpace:"nowrap"}}>
          {speaking?"Stop":"Read Aloud"}
        </button>
        <button onClick={()=>setShowNav(s=>!s)}
          style={{background:showNav?accent+"14":"rgba(255,255,255,0.03)",border:"1px solid "+(showNav?accent:"rgba(255,255,255,0.09)"),borderRadius:5,padding:"5px 10px",color:showNav?accent:"rgba(232,228,220,0.4)",fontSize:11,cursor:"pointer"}}>
          Sections
        </button>
      </div>

      {showNav && (
        <div style={{background:"rgba(4,8,20,0.99)",borderBottom:"1px solid "+accent+"18",padding:"8px 14px",display:"flex",gap:6,flexWrap:"wrap",zIndex:29}}>
          {lesson.sections.map((s,i)=>(
            <button key={i} onClick={()=>{setSi(i);setShowNav(false);setTimeout(()=>ref.current&&ref.current.scrollTo(0,0),50);}}
              style={{background:i===si?accent+"18":"rgba(255,255,255,0.025)",border:"1px solid "+(i===si?accent:"rgba(255,255,255,0.09)"),borderRadius:5,padding:"4px 10px",color:i===si?accent:"rgba(232,228,220,0.45)",fontSize:10,cursor:"pointer",fontFamily:"Georgia"}}>
              {s.title}
            </button>
          ))}
        </div>
      )}

      <div style={{flex:1,display:"flex",overflow:"hidden",minHeight:0}}>
        {/* LESSON CONTENT */}
        <div ref={ref} style={{flex:1,overflowY:"auto",padding:"26px 22px 60px",minWidth:0}}>
          <div style={{maxWidth:700,margin:"0 auto"}}>
            <div style={{marginBottom:22}}>
              <div style={{fontSize:9,letterSpacing:2.5,color:accent,textTransform:"uppercase",marginBottom:5}}>{lKey} — Section {si+1} of {total} — {lesson.duration}</div>
              <h2 style={{fontSize:"clamp(18px,2.5vw,26px)",fontWeight:"normal",color:"rgba(232,228,220,0.96)",margin:"0 0 6px",lineHeight:1.2}}>{sec.title}</h2>
              <div style={{color:"rgba(255,215,0,0.55)",fontSize:11,fontStyle:"italic",marginBottom:12}}>by Jezrah Starflower Tracy, Dr. of Reiki Therapy — Starflower Healing Arts Press</div>
              <div style={{height:2,background:"linear-gradient(90deg,"+accent+",transparent)",width:100}}/>
            </div>

            {sec.write && (
              <div style={{background:"rgba(255,215,0,0.055)",border:"1px solid rgba(255,215,0,0.25)",borderLeft:"4px solid #FFD700",borderRadius:7,padding:"11px 15px",marginBottom:18}}>
                <div style={{color:"#FFD700",fontSize:9,letterSpacing:2,marginBottom:5,textTransform:"uppercase"}}>Write This Down Before Reading</div>
                <div style={{color:"rgba(232,228,220,0.8)",fontSize:13,lineHeight:1.82,fontFamily:"Georgia"}}>{sec.write}</div>
              </div>
            )}
            {sec.focus && (
              <div style={{background:accent+"08",border:"1px solid "+accent+"28",borderLeft:"4px solid "+accent,borderRadius:7,padding:"11px 15px",marginBottom:18}}>
                <div style={{color:accent,fontSize:9,letterSpacing:2,marginBottom:5,textTransform:"uppercase"}}>Focus Point</div>
                <div style={{color:"rgba(232,228,220,0.78)",fontSize:13,lineHeight:1.82,fontFamily:"Georgia"}}>{sec.focus}</div>
              </div>
            )}

            <div style={{marginBottom:20}}>{renderBody(sec.body)}</div>

            {showChakraChart && (
              <div style={{margin:"20px 0"}}>
                <div style={{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center",alignItems:"flex-start"}}>
                  <div style={{flex:"1 1 160px",maxWidth:200,background:"rgba(255,255,255,0.015)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:12,textAlign:"center"}}>
                    <ChakraSVG/>
                    <p style={{color:"rgba(255,255,255,0.25)",fontSize:10,margin:"6px 0 0",fontStyle:"italic"}}>Seven Major Chakras</p>
                  </div>
                  <div style={{flex:"1 1 200px"}}>
                    <p style={{color:"rgba(255,255,255,0.35)",fontSize:10,textAlign:"center",marginBottom:5,letterSpacing:1}}>CHAKRA BALANCE ASSESSMENT</p>
                    <ResponsiveContainer width="100%" height={200}>
                      <RadarChart data={chakraD}>
                        <PolarGrid stroke="rgba(255,255,255,0.07)"/>
                        <PolarAngleAxis dataKey="s" tick={{fill:"rgba(255,255,255,0.42)",fontSize:9}}/>
                        <Radar dataKey="A" stroke="#FF7F00" fill="#FF7F00" fillOpacity={0.22} name="Client"/>
                        <Radar dataKey="B" stroke="#00C853" fill="#00C853" fillOpacity={0.1} name="Balanced"/>
                        <Tooltip contentStyle={{background:"#050912",border:"1px solid rgba(255,255,255,0.09)",borderRadius:5,fontSize:10}}/>
                      </RadarChart>
                    </ResponsiveContainer>
                    <p style={{color:"rgba(255,255,255,0.2)",fontSize:10,textAlign:"center",fontStyle:"italic"}}>Orange = client scan. Green = balanced baseline.</p>
                  </div>
                </div>
              </div>
            )}

            {showBPChart && (
              <div style={{margin:"20px 0"}}>
                <p style={{color:"rgba(255,255,255,0.35)",fontSize:10,textAlign:"center",marginBottom:5,letterSpacing:1}}>BIOPHOTON EMISSION: Healthy / Cancer / Practitioner Hands</p>
                <ResponsiveContainer width="100%" height={170}>
                  <LineChart data={bpD}>
                    <CartesianGrid stroke="rgba(255,255,255,0.04)"/>
                    <XAxis dataKey="t" tick={{fill:"rgba(255,255,255,0.3)",fontSize:9}}/>
                    <YAxis tick={{fill:"rgba(255,255,255,0.3)",fontSize:9}}/>
                    <Tooltip contentStyle={{background:"#050912",border:"1px solid rgba(255,255,255,0.09)",borderRadius:5,fontSize:10}}/>
                    <Line type="monotone" dataKey="h" stroke="#00C853" strokeWidth={2} dot={false} name="Healthy"/>
                    <Line type="monotone" dataKey="c" stroke="#FF2400" strokeWidth={2} dot={false} name="Cancer"/>
                    <Line type="monotone" dataKey="p" stroke="#FFD700" strokeWidth={2} dot={false} name="Practitioner Hands"/>
                  </LineChart>
                </ResponsiveContainer>
                <p style={{color:"rgba(255,255,255,0.2)",fontSize:10,textAlign:"center",fontStyle:"italic",marginTop:4}}>Cancer emits more photons but with less coherence. Health equals order, not just intensity.</p>
              </div>
            )}

            {showFlower && (
              <div style={{display:"flex",justifyContent:"center",margin:"20px 0"}}>
                <div style={{background:"rgba(255,255,255,0.015)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:16,textAlign:"center",maxWidth:260}}>
                  <FlowerSVG/>
                  <p style={{color:"rgba(255,255,255,0.25)",fontSize:10,margin:"8px 0 0",fontStyle:"italic"}}>Flower of Life — Temple of Osiris, Abydos, Egypt (est. 6,000+ BCE)</p>
                </div>
              </div>
            )}

            {showEpChart && (
              <div style={{margin:"20px 0"}}>
                <p style={{color:"rgba(255,255,255,0.35)",fontSize:10,textAlign:"center",marginBottom:5,letterSpacing:1}}>EPIGENETIC SHIFT: Methylation vs Gene Expression</p>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={epD}>
                    <CartesianGrid stroke="rgba(255,255,255,0.04)"/>
                    <XAxis dataKey="x" tick={{fill:"rgba(255,255,255,0.3)",fontSize:8}}/>
                    <YAxis tick={{fill:"rgba(255,255,255,0.3)",fontSize:9}}/>
                    <Tooltip contentStyle={{background:"#050912",border:"1px solid rgba(255,255,255,0.09)",borderRadius:5,fontSize:10}}/>
                    <Area type="monotone" dataKey="m" stroke="#FF2400" fill="#FF2400" fillOpacity={0.22} name="Gene Silencing"/>
                    <Area type="monotone" dataKey="e" stroke="#00C853" fill="#00C853" fillOpacity={0.18} name="Gene Expression"/>
                  </AreaChart>
                </ResponsiveContainer>
                <p style={{color:"rgba(255,255,255,0.2)",fontSize:10,textAlign:"center",fontStyle:"italic",marginTop:4}}>Healing practices shift epigenetic balance from silencing toward expression</p>
              </div>
            )}

            {sec.quiz && <MiniQuiz qs={sec.quiz} accent={accent}/>}

            <div style={{display:"flex",justifyContent:"space-between",marginTop:32,gap:10}}>
              <button onClick={goPrev} disabled={si===0}
                style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"10px 20px",color:"rgba(232,228,220,0.5)",fontSize:13,cursor:si>0?"pointer":"default",opacity:si>0?1:0.3}}>
                Previous
              </button>
              <button onClick={goNext}
                style={{background:"linear-gradient(135deg,"+accent+",#8B00FF)",border:"none",borderRadius:8,padding:"10px 26px",color:"white",fontSize:13,cursor:"pointer",boxShadow:"0 0 22px "+accent+"3a",letterSpacing:0.5}}>
                {si<total-1?"Next Section":"Complete Lesson"}
              </button>
            </div>

            <p style={{color:"rgba(232,228,220,0.12)",fontSize:10,textAlign:"center",marginTop:28,letterSpacing:0.5}}>
              Copyright Jezrah Starflower Tracy — Starflower Healing Arts Press — Doctor of Reiki Therapy Programme
            </p>
          </div>
        </div>

        {/* TEACHER PANEL */}
        <div style={{width:290,flexShrink:0,overflow:"hidden",display:"flex",flexDirection:"column"}}>
          <TeacherPanel sec={sec} accent={accent} notes={notes} onNote={handleNote} cpA={cpA} onCP={handleCP}/>
        </div>
      </div>
    </div>
  );
}

// ─── AUTH SCREEN ──────────────────────────────────────────────────────────────
function AuthScreen({onAuth}) {
  const [mode,setMode]=useState("login");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [pw,setPw]=useState("");
  const [pw2,setPw2]=useState("");
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);

  const submit=()=>{
    setErr(""); setLoading(true);
    setTimeout(()=>{
      if(mode==="signup"){
        if(!name.trim()){setErr("Please enter your name.");setLoading(false);return;}
        if(!email.includes("@")){setErr("Please enter a valid email address.");setLoading(false);return;}
        if(pw.length<6){setErr("Password must be at least 6 characters.");setLoading(false);return;}
        if(pw!==pw2){setErr("Passwords do not match.");setLoading(false);return;}
        if(DB[email]){setErr("An account with that email already exists.");setLoading(false);return;}
        const u={name,email,pw,level:null,completed:new Set(),notes:"",checkpoints:{},joined:new Date().toLocaleDateString()};
        DB[email]=u; onAuth(u,"quiz");
      } else {
        const u=DB[email];
        if(!u){setErr("No account found with that email.");setLoading(false);return;}
        if(u.pw!==pw){setErr("Incorrect password.");setLoading(false);return;}
        onAuth(u,u.level?"dashboard":"quiz");
      }
      setLoading(false);
    },600);
  };

  const inputStyle={width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"10px 13px",color:"white",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"Georgia"};
  const labelStyle={display:"block",color:"rgba(232,228,220,0.42)",fontSize:10,letterSpacing:1.5,marginBottom:5,textTransform:"uppercase"};

  return (
    <div style={{minHeight:"100vh",background:"radial-gradient(ellipse at 25% 10%,#0d1a2e 0%,#050912 70%)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"Georgia",position:"relative",overflow:"hidden"}}>
      <div style={{height:3,position:"absolute",top:0,left:0,right:0,background:"linear-gradient(90deg,"+COLORS.join(",")+")",opacity:0.7}}/>

      <div style={{position:"absolute",top:"5%",right:"5%",opacity:0.04,pointerEvents:"none",width:280}}>
        <FlowerSVG/>
      </div>

      <div style={{width:"100%",maxWidth:420,position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:9,letterSpacing:4,color:"rgba(255,215,0,0.55)",marginBottom:8,textTransform:"uppercase"}}>Starflower Healing Arts Press</div>
          <h1 style={{fontSize:30,background:"linear-gradient(135deg,#FF7F00,#FFD700,#00C853,#0099FF,#8B00FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",margin:"0 0 3px",fontWeight:"normal",letterSpacing:-0.5}}>Reiki Mastery Journey</h1>
          <div style={{color:"rgba(232,228,220,0.28)",fontSize:11,letterSpacing:2.5,marginBottom:6,textTransform:"uppercase"}}>Doctor of Reiki Therapy Programme</div>
          <div style={{color:"#FFD700",fontSize:12,fontStyle:"italic"}}>Jezrah Starflower Tracy — Founder and Lead Instructor</div>
        </div>

        <div style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:16,padding:"26px 26px 22px",backdropFilter:"blur(10px)"}}>
          <div style={{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:8,marginBottom:22,padding:3}}>
            {[["login","Sign In"],["signup","Create Account"]].map(([m,lb])=>(
              <button key={m} onClick={()=>{setMode(m);setErr("");}}
                style={{flex:1,padding:"8px",background:mode===m?"rgba(255,215,0,0.14)":"transparent",border:mode===m?"1px solid rgba(255,215,0,0.28)":"1px solid transparent",borderRadius:6,color:mode===m?"#FFD700":"rgba(232,228,220,0.38)",fontSize:13,cursor:"pointer",letterSpacing:0.3}}>
                {lb}
              </button>
            ))}
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:13}}>
            {mode==="signup" && (
              <div>
                <label style={labelStyle}>Full Name</label>
                <input value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="Your full name" style={inputStyle}/>
              </div>
            )}
            <div>
              <label style={labelStyle}>Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} type="email" placeholder="your@email.com" style={inputStyle}/>
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} type="password" placeholder="6 or more characters" style={inputStyle}/>
            </div>
            {mode==="signup" && (
              <div>
                <label style={labelStyle}>Confirm Password</label>
                <input value={pw2} onChange={e=>setPw2(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} type="password" placeholder="Repeat password" style={inputStyle}/>
              </div>
            )}
            {err && (
              <div style={{background:"rgba(255,36,0,0.1)",border:"1px solid rgba(255,36,0,0.28)",borderRadius:6,padding:"8px 12px",color:"#FF8888",fontSize:12}}>{err}</div>
            )}
            <button onClick={submit}
              style={{background:"linear-gradient(135deg,#FF7F00,#FFD700)",border:"none",borderRadius:10,padding:"12px",color:"#0a0f1e",fontSize:14,fontWeight:"bold",cursor:"pointer",marginTop:3,letterSpacing:0.5,boxShadow:"0 0 24px rgba(255,215,0,0.2)"}}>
              {loading?"Loading...":(mode==="login"?"Sign In":"Create Account and Begin")}
            </button>
            {mode==="login" && (
              <p style={{textAlign:"center",color:"rgba(232,228,220,0.28)",fontSize:11,margin:"4px 0 0"}}>
                No account?{" "}
                <button onClick={()=>{setMode("signup");setErr("");}} style={{background:"none",border:"none",color:"#FFD700",fontSize:11,cursor:"pointer",fontFamily:"Georgia",textDecoration:"underline"}}>Create one free</button>
              </p>
            )}
          </div>
        </div>
        <p style={{textAlign:"center",color:"rgba(232,228,220,0.18)",fontSize:10,marginTop:14,letterSpacing:0.5}}>Copyright Jezrah Starflower Tracy — Starflower Healing Arts Press</p>
      </div>
    </div>
  );
}

// ─── QUIZ SCREEN ──────────────────────────────────────────────────────────────
function QuizScreen({user, onDone}) {
  const [idx,setIdx]=useState(0);
  const [ans,setAns]=useState({});

  const submit=()=>{
    const correct=QUIZ.filter((q,i)=>ans[i]===q.ans).length;
    const pct=(correct/QUIZ.length)*100;
    const lvl=pct<30?1:pct<60?2:pct<80?3:4;
    user.level=lvl; onDone(lvl,correct);
  };

  const q=QUIZ[idx];
  const pct=((idx)/QUIZ.length)*100;

  return (
    <div style={{minHeight:"100vh",background:"radial-gradient(ellipse at center,#0a1020 0%,#050912 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"Georgia",position:"relative"}}>
      <div style={{height:3,position:"absolute",top:0,left:0,right:0,background:"linear-gradient(90deg,"+COLORS.join(",")+")",opacity:0.6}}/>
      <div style={{width:"100%",maxWidth:540}}>
        <div style={{textAlign:"center",marginBottom:22}}>
          <div style={{color:"rgba(255,255,255,0.3)",fontSize:10,letterSpacing:3,marginBottom:4,textTransform:"uppercase"}}>Placement Assessment</div>
          <div style={{color:"rgba(232,228,220,0.5)",fontSize:12}}>10 questions — Determines your recommended starting level</div>
        </div>
        <div style={{marginBottom:18}}>
          <div style={{display:"flex",justifyContent:"space-between",color:"rgba(232,228,220,0.3)",fontSize:11,marginBottom:6}}>
            <span>Question {idx+1} of {QUIZ.length}</span>
            <span>{Math.round(pct)}% complete</span>
          </div>
          <div style={{height:3,background:"rgba(255,255,255,0.07)",borderRadius:2}}>
            <div style={{height:"100%",width:pct+"%",background:"linear-gradient(90deg,#FF4500,#FFD700,#8B00FF)",borderRadius:2,transition:"width 0.35s"}}/>
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"24px 24px 20px",backdropFilter:"blur(8px)"}}>
          <p style={{color:"rgba(232,228,220,0.92)",fontSize:17,lineHeight:1.65,margin:"0 0 20px",fontFamily:"Georgia"}}>{q.q}</p>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {q.opts.map((opt,i)=>{
              const sel=ans[idx]===i;
              return (
                <button key={i} onClick={()=>setAns(a=>({...a,[idx]:i}))}
                  style={{background:sel?"rgba(255,127,0,0.18)":"rgba(255,255,255,0.025)",border:sel?"1px solid #FF7F00":"1px solid rgba(255,255,255,0.09)",borderRadius:8,padding:"12px 15px",color:sel?"#FF7F00":"rgba(232,228,220,0.72)",fontSize:14,textAlign:"left",cursor:"pointer",fontFamily:"Georgia",transition:"all 0.15s"}}>
                  <span style={{opacity:0.45,marginRight:9}}>{["A","B","C","D"][i]}.</span>{opt}
                </button>
              );
            })}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:20,gap:8}}>
            {idx>0 && (
              <button onClick={()=>setIdx(i=>i-1)}
                style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:7,padding:"9px 18px",color:"rgba(232,228,220,0.48)",fontSize:12,cursor:"pointer"}}>
                Back
              </button>
            )}
            <button onClick={()=>{if(ans[idx]===undefined)return;idx<QUIZ.length-1?setIdx(i=>i+1):submit();}} disabled={ans[idx]===undefined}
              style={{background:ans[idx]!==undefined?"linear-gradient(135deg,#FF4500,#8B00FF)":"rgba(255,255,255,0.04)",border:"none",borderRadius:7,padding:"9px 22px",color:"white",fontSize:12,cursor:ans[idx]!==undefined?"pointer":"default",marginLeft:"auto",opacity:ans[idx]!==undefined?1:0.35,boxShadow:ans[idx]!==undefined?"0 0 18px rgba(255,69,0,0.3)":"none"}}>
              {idx<QUIZ.length-1?"Next":"See Results"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RESULTS SCREEN ───────────────────────────────────────────────────────────
function ResultsScreen({user, lvl, correct, onEnter}) {
  const lv=LEVELS.find(l=>l.id===lvl);
  return (
    <div style={{minHeight:"100vh",background:"radial-gradient(ellipse at center,#0a1020 0%,#050912 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:28,fontFamily:"Georgia",textAlign:"center",position:"relative"}}>
      <div style={{height:3,position:"absolute",top:0,left:0,right:0,background:"linear-gradient(90deg,"+COLORS.join(",")+")",opacity:0.6}}/>
      <div style={{maxWidth:500}}>
        <div style={{fontSize:56,marginBottom:14}}>{correct===QUIZ.length?"✦":correct>=7?"◈":correct>=4?"◆":"⬡"}</div>
        <h2 style={{color:"rgba(232,228,220,0.92)",fontSize:26,fontWeight:"normal",margin:"0 0 5px"}}>Welcome, {user.name}</h2>
        <p style={{color:"rgba(232,228,220,0.35)",marginBottom:24,fontSize:13}}>{correct} of {QUIZ.length} correct — Account created {user.joined}</p>
        <div style={{background:lv.color+"14",border:"1px solid "+lv.color+"40",borderRadius:14,padding:"22px 26px",marginBottom:22,backdropFilter:"blur(8px)"}}>
          <div style={{fontSize:9,letterSpacing:3,color:lv.color,marginBottom:8,textTransform:"uppercase"}}>Your Recommended Starting Level</div>
          <div style={{background:lv.grad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontSize:30,fontWeight:"normal",marginBottom:6}}>Level {lv.id}: {lv.name}</div>
          <p style={{color:"rgba(232,228,220,0.55)",fontSize:13,lineHeight:1.7,margin:"0 0 10px"}}>{lv.desc}</p>
          <div style={{color:lv.color,fontSize:11,fontStyle:"italic"}}>{lv.chakra}</div>
        </div>
        <p style={{color:"rgba(232,228,220,0.3)",fontSize:12,marginBottom:20}}>You may access all four levels from your dashboard. This is your recommended starting point only.</p>
        <button onClick={onEnter}
          style={{background:lv.grad,border:"none",borderRadius:12,padding:"13px 38px",color:"white",fontSize:14,cursor:"pointer",boxShadow:"0 0 28px "+lv.glow,letterSpacing:0.5}}>
          Enter Your School
        </button>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({user, onLesson, onLevel, onLogout}) {
  const done=user.completed?user.completed.size:0;
  return (
    <div style={{minHeight:"100vh",background:"radial-gradient(ellipse at 10% 5%,#0d1a2e 0%,#050912 70%)",fontFamily:"Georgia",color:"rgba(232,228,220,0.85)"}}>
      <div style={{height:3,background:"linear-gradient(90deg,"+COLORS.join(",")+")",opacity:0.7}}/>
      <header style={{padding:"16px 22px",borderBottom:"1px solid rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontSize:9,letterSpacing:3,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",marginBottom:3}}>Jezrah Starflower Tracy — Starflower Healing Arts Press</div>
          <h1 style={{margin:0,fontSize:20,fontWeight:"normal",background:"linear-gradient(90deg,#FF7F00,#FFD700,#00C853,#0099FF,#8B00FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Reiki Mastery Journey</h1>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{textAlign:"right"}}>
            <div style={{color:"#FFD700",fontSize:13}}>{user.name}</div>
            <div style={{color:"rgba(232,228,220,0.28)",fontSize:10}}>{done} lessons complete — Level {user.level||"?"}</div>
          </div>
          <button onClick={onLogout} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:6,padding:"5px 12px",color:"rgba(232,228,220,0.38)",fontSize:11,cursor:"pointer"}}>Sign Out</button>
        </div>
      </header>

      <div style={{maxWidth:980,margin:"0 auto",padding:"22px 18px"}}>
        <div style={{marginBottom:26}}>
          <p style={{fontSize:9,letterSpacing:3,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",margin:"0 0 10px"}}>All {LEVELS.reduce((t,lv)=>t+lv.modules.reduce((a,m)=>a+m.lessons.length,0),0)} Lessons — Click Any to Begin</p>
          {LEVELS.map(lv=>(
            <div key={lv.id} style={{marginBottom:14}}>
              <div style={{fontSize:9,letterSpacing:2,color:lv.color,textTransform:"uppercase",marginBottom:6}}>{lv.symbol} Level {lv.id}: {lv.name}</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {lv.modules.flatMap(m=>m.lessons).map(name=>{
                  const isDone=user.completed&&user.completed.has(name);
                  return (
                    <button key={name} onClick={()=>onLesson(name,lv)}
                      style={{background:isDone?lv.color+"22":lv.color+"0a",border:"1px solid "+(isDone?lv.color:lv.color+"28"),borderRadius:7,padding:"6px 12px",color:isDone?lv.color:"rgba(232,228,220,0.7)",fontSize:11,cursor:"pointer",fontFamily:"Georgia",transition:"all 0.15s"}}>
                      {isDone?"✓ ":""}{name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p style={{fontSize:9,letterSpacing:3,color:"rgba(255,255,255,0.22)",textTransform:"uppercase",margin:"0 0 12px"}}>Full Curriculum — All Four Levels</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:13}}>
          {LEVELS.map(lv=>(
            <div key={lv.id} onClick={()=>onLevel(lv)}
              style={{background:lv.color+"09",border:"1px solid "+lv.color+"25",borderRadius:13,padding:18,cursor:"pointer",transition:"all 0.2s",boxShadow:user.level===lv.id?"0 0 20px "+lv.glow:"none"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div>
                  <div style={{fontSize:9,letterSpacing:2,color:lv.color,marginBottom:3,textTransform:"uppercase"}}>Level {lv.id}</div>
                  <h3 style={{margin:0,fontSize:17,fontWeight:"normal",color:"rgba(232,228,220,0.9)"}}>{lv.name}</h3>
                  <div style={{fontSize:9,color:"rgba(232,228,220,0.32)",marginTop:1}}>{lv.chakra}</div>
                </div>
                <span style={{fontSize:26,color:lv.color,opacity:0.45}}>{lv.symbol}</span>
              </div>
              <p style={{color:"rgba(232,228,220,0.45)",fontSize:12,lineHeight:1.6,margin:"0 0 10px"}}>{lv.desc}</p>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {lv.modules.map(m=>(
                  <span key={m.name} style={{background:lv.color+"14",border:"1px solid "+lv.color+"25",borderRadius:10,padding:"2px 7px",fontSize:9,color:lv.color}}>{m.name}</span>
                ))}
              </div>
              {user.level===lv.id && <div style={{fontSize:9,color:lv.color,letterSpacing:1,borderTop:"1px solid "+lv.color+"18",paddingTop:8,marginTop:10,textTransform:"uppercase"}}>Your Assigned Level</div>}
            </div>
          ))}
        </div>

        <div style={{marginTop:32,borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:16,textAlign:"center"}}>
          <p style={{color:"rgba(232,228,220,0.14)",fontSize:10,letterSpacing:0.5,margin:0}}>Copyright Jezrah Starflower Tracy — Founder and Lead Instructor — Starflower Healing Arts Press — Doctor of Reiki Therapy Programme</p>
        </div>
      </div>
    </div>
  );
}

// ─── LEVEL SCREEN ─────────────────────────────────────────────────────────────
function LevelScreen({lv, user, onLesson, onBack}) {
  return (
    <div style={{minHeight:"100vh",background:"radial-gradient(ellipse at center,#0a1020 0%,#050912 100%)",fontFamily:"Georgia",color:"rgba(232,228,220,0.85)"}}>
      <div style={{height:3,background:lv.grad,opacity:0.7}}/>
      <div style={{padding:"12px 18px",borderBottom:"1px solid rgba(255,255,255,0.06)",display:"flex",gap:10,alignItems:"center"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:5,padding:"5px 12px",color:"rgba(232,228,220,0.48)",fontSize:11,cursor:"pointer"}}>Dashboard</button>
        <span style={{color:"rgba(255,255,255,0.25)",fontSize:12}}>Level {lv.id}: {lv.name}</span>
      </div>
      <div style={{maxWidth:800,margin:"0 auto",padding:"22px 18px"}}>
        <div style={{background:lv.grad,borderRadius:14,padding:"24px 28px",marginBottom:24}}>
          <div style={{fontSize:9,letterSpacing:3,color:"rgba(255,255,255,0.6)",marginBottom:6,textTransform:"uppercase"}}>{lv.chakra}</div>
          <h2 style={{color:"white",fontSize:28,fontWeight:"normal",margin:"0 0 5px"}}>{lv.name}</h2>
          <p style={{color:"rgba(255,255,255,0.75)",fontSize:13,lineHeight:1.7,margin:0}}>{lv.desc}</p>
        </div>
        {lv.modules.map(mod=>(
          <div key={mod.name} style={{marginBottom:14,background:"rgba(255,255,255,0.02)",border:"1px solid "+lv.color+"18",borderRadius:10,overflow:"hidden"}}>
            <div style={{padding:"11px 17px",borderBottom:"1px solid "+lv.color+"15",background:lv.color+"07"}}>
              <span style={{color:lv.color,fontSize:14,fontWeight:"bold"}}>{mod.name}</span>
            </div>
            <div style={{padding:"10px 17px",display:"flex",flexDirection:"column",gap:9}}>
              {mod.lessons.map((ln,li)=>{
                const has=true; // eslint-disable-line
                const isDone=user.completed&&user.completed.has(ln);
                return (
                  <div key={li} style={{display:"flex",alignItems:"center",gap:11}}>
                    <div style={{width:18,height:18,borderRadius:"50%",background:isDone?lv.color:"rgba(255,255,255,0.07)",border:"1px solid "+lv.color+"30",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"white"}}>{isDone?"✓":(li+1)}</div>
                    <button onClick={()=>onLesson(ln,lv)} style={{background:"none",border:"none",color:isDone?lv.color:"rgba(232,228,220,0.75)",fontSize:13,cursor:"pointer",textAlign:"left",fontFamily:"Georgia",padding:0,textDecoration:"underline",textDecorationColor:lv.color+"30"}}>{ln}</button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen,setScreen]=useState("auth");
  const [user,setUser]=useState(null);
  const [lvl,setLvl]=useState(null);
  const [correct,setCorrect]=useState(0);
  const [curLesson,setCurLesson]=useState(null);
  const [curLvData,setCurLvData]=useState(null);
  const [selLv,setSelLv]=useState(null);

  const auth=(u,dest)=>{setUser(u);setScreen(dest);};
  const quizDone=(l,c)=>{setLvl(l);setCorrect(c);setScreen("results");};
  const openLesson=(name,lv)=>{setCurLesson(name);setCurLvData(lv);setScreen("lesson");};
  const completeLesson=(name)=>{
    if(user){if(!user.completed)user.completed=new Set();user.completed.add(name);}
    setScreen(selLv?"level":"dashboard");
  };

  if(screen==="auth") return <AuthScreen onAuth={auth}/>;
  if(screen==="quiz") return <QuizScreen user={user} onDone={quizDone}/>;
  if(screen==="results") return <ResultsScreen user={user} lvl={lvl} correct={correct} onEnter={()=>setScreen("dashboard")}/>;
  if(screen==="dashboard") return <Dashboard user={user} onLesson={openLesson} onLevel={lv=>{setSelLv(lv);setScreen("level");}} onLogout={()=>{setUser(null);setScreen("auth");}}/>;
  if(screen==="level"&&selLv) return <LevelScreen lv={selLv} user={user} onLesson={openLesson} onBack={()=>setScreen("dashboard")}/>;
  if(screen==="lesson"&&curLesson) return <LessonScreen lKey={curLesson} lvData={curLvData} user={user} onBack={()=>setScreen(selLv?"level":"dashboard")} onComplete={completeLesson}/>;
  return <div style={{color:"white",padding:40,fontFamily:"Georgia"}}>Loading...</div>;
}
