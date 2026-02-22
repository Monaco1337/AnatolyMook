// Hochkomplexer Typisierungs-Algorithmus für Anamnesebogen
// Berechnet Primary Type, Secondary Type, Tension Profile und Coaching Focus

export interface AnamnesisData {
  // Section 1
  inquiry_type: string;
  life_situation: string[];
  primary_role: string;

  // Section 2
  inner_clarity: number;
  inner_stability: number;
  decision_capability: number;
  energy_level: number;
  inner_peace_vs_pressure: number;

  // Section 3
  stress_reaction: string;
  conflict_experience: string;
  daily_feelings: string[];

  // Section 4
  decision_style: string;
  self_trust_level: number;
  uncertainty_reaction: string;

  // Section 5
  closeness_difficulty: string;
  external_appearance: string;
  feedback_from_others: string[];

  // Section 6
  on_my_path: number;
  change_is_coming: number;
  functioning_vs_living: number;
  seeking_clarity: number;
}

export interface TypologyResult {
  primary_type: string;
  primary_type_label: string;
  primary_type_description: string;
  primary_type_color: string;
  secondary_type: string | null;
  secondary_type_label: string | null;
  tension_profile: {
    pressure_vs_peace: number;
    action_vs_reflection: number;
    external_vs_internal: number;
  };
  coaching_focus: string;
  typology_scores: {
    structureSeeker: number;
    performanceDriven: number;
    meaningSeeker: number;
    exhaustedFunctioner: number;
  };
  how_to_speak: string;
  what_to_avoid: string;
  where_to_start: string;
}

const TYPES = {
  structure_seeker: {
    label: 'Struktursucher',
    color: '#3B82F6', // Blue
    description: 'Sucht nach klaren Strukturen, Ordnung und verlässlichen Rahmen. Braucht Klarheit in Prozessen.',
    howToSpeak: 'Klar, strukturiert, mit konkreten Schritten',
    whatToAvoid: 'Chaos, Unklarheit, zu viel Offenheit',
    whereToStart: 'Ordnung im Denken, dann im Handeln'
  },
  performance_driven: {
    label: 'Leistungsgetriebener',
    color: '#F59E0B', // Gold
    description: 'Fokussiert auf Ergebnisse, Erfolg und Wirksamkeit. Gefahr: Ausb rennen durch permanenten Druck.',
    howToSpeak: 'Direkt, ergebnisorientiert, mit messbaren Zielen',
    whatToAvoid: 'Langsamkeit, Ineffizienz, "nur Theorie"',
    whereToStart: 'Innere Ruhe vor äußerer Leistung'
  },
  meaning_seeker: {
    label: 'Sinn- & Beziehungstyp',
    color: '#10B981', // Green
    description: 'Sucht Tiefe, Verbindung und authentische Beziehungen. Sinn ist wichtiger als Erfolg.',
    howToSpeak: 'Einfühlsam, tiefgehend, verbindend',
    whatToAvoid: 'Oberflächlichkeit, reiner Pragmatismus',
    whereToStart: 'Eigene Wahrheit, dann Beziehungen'
  },
  exhausted_functioner: {
    label: 'Erschöpfter Funktionierer',
    color: '#8B5CF6', // Violet
    description: 'Funktioniert mehr als er lebt. Hohe Belastung, wenig innere Ressourcen. Braucht dringend Entlastung.',
    howToSpeak: 'Verständnisvoll, entlastend, ressourcenorientiert',
    whatToAvoid: 'Mehr Druck, weitere Anforderungen',
    whereToStart: 'Regeneration, dann Neuausrichtung'
  }
};

export function calculateTypology(data: AnamnesisData): TypologyResult {
  // Initialize scores for each type
  const scores = {
    structureSeeker: 0,
    performanceDriven: 0,
    meaningSeeker: 0,
    exhaustedFunctioner: 0
  };

  // SECTION 2: Baseline Analysis (weighted heavily)
  const baselineScore = (data.inner_clarity + data.inner_stability + data.decision_capability + data.energy_level) / 4;
  const pressureLevel = data.inner_peace_vs_pressure;

  // Low baseline + high pressure = Exhausted Functioner
  if (baselineScore < 5 && pressureLevel > 60) {
    scores.exhaustedFunctioner += 30;
  }

  // High pressure but decent clarity = Performance Driven
  if (pressureLevel > 70 && data.inner_clarity >= 6) {
    scores.performanceDriven += 25;
  }

  // High stability seeking = Structure Seeker
  if (data.inner_stability <= 5 || data.decision_capability <= 5) {
    scores.structureSeeker += 20;
  }

  // SECTION 3: Stress & Reaction Patterns
  if (data.stress_reaction === 'activism') {
    scores.performanceDriven += 15;
  } else if (data.stress_reaction === 'withdrawal') {
    scores.exhaustedFunctioner += 15;
    scores.meaningSeeker += 10;
  } else if (data.stress_reaction === 'control') {
    scores.structureSeeker += 20;
    scores.performanceDriven += 10;
  } else if (data.stress_reaction === 'adaptation') {
    scores.exhaustedFunctioner += 12;
  }

  if (data.conflict_experience === 'burdensome') {
    scores.exhaustedFunctioner += 10;
  } else if (data.conflict_experience === 'clarifying') {
    scores.meaningSeeker += 15;
  } else if (data.conflict_experience === 'avoidant') {
    scores.exhaustedFunctioner += 8;
  } else if (data.conflict_experience === 'paralyzing') {
    scores.structureSeeker += 10;
  }

  // SECTION 4: Decision & Action Logic (critical for typing)
  if (data.decision_style === 'intuitive') {
    scores.meaningSeeker += 20;
  } else if (data.decision_style === 'rational') {
    scores.structureSeeker += 15;
    scores.performanceDriven += 10;
  } else if (data.decision_style === 'duty_driven') {
    scores.exhaustedFunctioner += 18;
  } else if (data.decision_style === 'fear_driven') {
    scores.exhaustedFunctioner += 22;
  }

  // Self-trust level
  if (data.self_trust_level >= 7) {
    scores.performanceDriven += 10;
    scores.meaningSeeker += 8;
  } else if (data.self_trust_level <= 4) {
    scores.exhaustedFunctioner += 12;
    scores.structureSeeker += 10;
  }

  if (data.uncertainty_reaction === 'thinking') {
    scores.structureSeeker += 12;
  } else if (data.uncertainty_reaction === 'acting') {
    scores.performanceDriven += 15;
  } else if (data.uncertainty_reaction === 'waiting') {
    scores.exhaustedFunctioner += 10;
  } else if (data.uncertainty_reaction === 'distraction') {
    scores.exhaustedFunctioner += 14;
  }

  // SECTION 5: Relationship & External Impact
  if (data.closeness_difficulty === 'easy') {
    scores.meaningSeeker += 15;
  } else if (data.closeness_difficulty === 'situationally_difficult') {
    scores.performanceDriven += 8;
  } else if (data.closeness_difficulty === 'permanently_difficult') {
    scores.exhaustedFunctioner += 12;
  }

  if (data.external_appearance === 'sovereign') {
    scores.performanceDriven += 12;
  } else if (data.external_appearance === 'adapted') {
    scores.exhaustedFunctioner += 15;
  } else if (data.external_appearance === 'high_performing') {
    scores.performanceDriven += 18;
  } else if (data.external_appearance === 'exhausted') {
    scores.exhaustedFunctioner += 20;
  }

  // SECTION 6: Meaning, Truth, Direction (deep level)
  const meaningScore = (data.on_my_path + (10 - data.functioning_vs_living) + data.seeking_clarity + data.change_is_coming) / 4;

  if (meaningScore >= 7) {
    scores.meaningSeeker += 20;
  }

  if (data.functioning_vs_living >= 8) {
    scores.exhaustedFunctioner += 18;
  }

  if (data.seeking_clarity >= 8) {
    scores.structureSeeker += 12;
    scores.meaningSeeker += 10;
  }

  // Find primary and secondary types
  const sortedTypes = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primaryTypeKey = sortedTypes[0][0] as keyof typeof scores;
  const secondaryTypeKey = sortedTypes[1][1] > sortedTypes[0][1] * 0.6 ? sortedTypes[1][0] as keyof typeof scores : null;

  // Map to type info
  const typeKeyMap = {
    structureSeeker: 'structure_seeker',
    performanceDriven: 'performance_driven',
    meaningSeeker: 'meaning_seeker',
    exhaustedFunctioner: 'exhausted_functioner'
  };

  const primaryType = typeKeyMap[primaryTypeKey];
  const secondaryType = secondaryTypeKey ? typeKeyMap[secondaryTypeKey] : null;

  const primaryTypeInfo = TYPES[primaryType as keyof typeof TYPES];
  const secondaryTypeInfo = secondaryType ? TYPES[secondaryType as keyof typeof TYPES] : null;

  // Calculate tension profile
  const tensionProfile = {
    pressure_vs_peace: pressureLevel,
    action_vs_reflection: data.decision_style === 'intuitive' || data.decision_style === 'fear_driven' ? 30 : 70,
    external_vs_internal: data.external_appearance === 'sovereign' || data.external_appearance === 'high_performing' ? 70 : 30
  };

  // Determine coaching focus
  let coachingFocus = '';
  if (primaryType === 'exhausted_functioner') {
    coachingFocus = 'Regeneration & innere Stabilität aufbauen, dann Neuausrichtung';
  } else if (primaryType === 'performance_driven') {
    coachingFocus = 'Von Leistungsdruck zu innerer Klarheit – Erfolg ohne Erschöpfung';
  } else if (primaryType === 'structure_seeker') {
    coachingFocus = 'Ordnung im Denken, dann Handlungsfähigkeit aus Klarheit';
  } else {
    coachingFocus = 'Eigene Wahrheit finden, authentische Beziehungen leben';
  }

  return {
    primary_type: primaryType,
    primary_type_label: primaryTypeInfo.label,
    primary_type_description: primaryTypeInfo.description,
    primary_type_color: primaryTypeInfo.color,
    secondary_type: secondaryType,
    secondary_type_label: secondaryTypeInfo?.label || null,
    tension_profile: tensionProfile,
    coaching_focus: coachingFocus,
    typology_scores: scores,
    how_to_speak: primaryTypeInfo.howToSpeak,
    what_to_avoid: primaryTypeInfo.whatToAvoid,
    where_to_start: primaryTypeInfo.whereToStart
  };
}
