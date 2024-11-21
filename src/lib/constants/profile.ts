export interface Option {
  value: string
  label: string
  allowCustom?: boolean // For options that allow custom input
}

export const SEXUAL_ORIENTATION: Option[] = [
  { value: "straight", label: "Straight" },
  { value: "gay", label: "Gay" },
  { value: "lesbian", label: "Lesbian" },
  { value: "bisexual", label: "Bisexual" },
  { value: "pansexual", label: "Pansexual" },
  { value: "queer", label: "Queer" },
  { value: "asexual", label: "Asexual" },
  { value: "demisexual", label: "Demisexual" },
  { value: "fluid", label: "Fluid" },
  { value: "questioning", label: "Questioning" },
  { value: "heteroflexible", label: "Heteroflexible" },
  { value: "homoflexible", label: "Homoflexible" },
  { value: "graysexual", label: "Graysexual" },
  { value: "aromantic", label: "Aromantic" },
  { value: "skoliosexual", label: "Skoliosexual" },
  { value: "androphilic", label: "Androphilic" },
  { value: "gynephilic", label: "Gynephilic" },
  { value: "prefer_not_to_say", label: "Prefer not to say" }
]

export const SEXUAL_POSITION: Option[] = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "versatile", label: "Versatile" },
  { value: "vers_top", label: "Vers Top" },
  { value: "vers_bottom", label: "Vers Bottom" },
  { value: "side", label: "Side (non-penetrative)" },
  { value: "power_bottom", label: "Power Bottom" },
  { value: "power_top", label: "Power Top" },
  { value: "submissive", label: "Submissive" },
  { value: "dominant", label: "Dominant" },
  { value: "switch", label: "Switch" },
  { value: "not_applicable", label: "Not applicable" },
  { value: "prefer_not_to_say", label: "Prefer not to say" }
]

export const INTERESTED_IN: Option[] = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "trans_men", label: "Trans Men" },
  { value: "trans_women", label: "Trans Women" },
  { value: "non_binary", label: "Non-Binary People" },
  { value: "genderqueer", label: "Genderqueer People" },
  { value: "agender", label: "Agender People" },
  { value: "cis_men", label: "Cisgender Men" },
  { value: "cis_women", label: "Cisgender Women" },
  { value: "transgender", label: "Transgender People" },
  { value: "gender_non_conforming", label: "Gender Non-Conforming People" },
  { value: "two_spirit", label: "Two-Spirit People" },
  { value: "intersex", label: "Intersex People" },
  { value: "everyone", label: "Everyone" },
  { value: "prefer_not_to_say", label: "Prefer not to say" }
]

export const RELATIONSHIP_STATUS: Option[] = [
  { value: "single", label: "Single" },
  { value: "in_relationship", label: "In a Relationship" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "separated", label: "Separated" },
  { value: "widowed", label: "Widowed" },
  { value: "its_complicated", label: "It's Complicated" },
  { value: "open_relationship", label: "Open Relationship" },
  { value: "polyamorous", label: "Polyamorous" },
  { value: "ethically_non_monogamous", label: "Ethically Non-Monogamous" },
  { value: "partnered", label: "Partnered" },
  { value: "cohabiting", label: "Cohabiting" },
  { value: "engaged", label: "Engaged" },
  { value: "casually_dating", label: "Casually Dating" },
  { value: "prefer_not_to_say", label: "Prefer not to say" }
]

export const LOOKING_FOR: Option[] = [
  { value: "chat", label: "Chat" },
  { value: "dates", label: "Dates" },
  { value: "friends", label: "Friends" },
  { value: "relationships", label: "Relationships" },
  { value: "hookups", label: "Hookups" },
  { value: "networking", label: "Networking" },
  { value: "long_term_partnership", label: "Long-term Partnership" },
  { value: "casual_dating", label: "Casual Dating" },
  { value: "short_term_fun", label: "Short-term Fun" },
  { value: "platonic_connections", label: "Platonic Connections" },
  { value: "activity_partners", label: "Activity Partners" },
  { value: "travel_companions", label: "Travel Companions" },
  { value: "cuddle_buddies", label: "Cuddle Buddies" },
  { value: "sexting", label: "Sexting" },
  { value: "online_flirting", label: "Online Flirting" },
  { value: "marriage", label: "Marriage" },
  { value: "co_parenting", label: "Co-parenting" },
  { value: "prefer_not_to_say", label: "Prefer not to say" }
]

// Gender options for profile setup
export const GENDER: Option[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non_binary", label: "Non-Binary" },
  { value: "prefer_not_to_say", label: "Prefer not to say" }
]

// Pronouns options for profile setup
export const PRONOUNS: Option[] = [
  { value: "he_him", label: "He/Him" },
  { value: "she_her", label: "She/Her" },
  { value: "they_them", label: "They/Them" },
  { value: "prefer_not_to_say", label: "Prefer not to say" }
]
