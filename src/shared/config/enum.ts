export enum ELanguage {
  "KG" = "KG",
  "RUS" = "RUS",
}

export enum ERoute {
  "main" = "/",
  "aboutUs" = "/about-us",
  "supportUs" = "/support-us",
  "webinars" = "/webinars",
  "signIn" = "/authorization/login",
  "signUp" = "/authorization/registration",
  "accaunt" = "/personal-accaunt/main",
  "courses" = "/personal-accaunt/courses",
  "[course]" = "/personal-accaunt/courses/[id]",
  "study" = "/personal-accaunt/courses/[id]/study",
  "exam" = "/personal-accaunt/courses/[id]/exam",
}

export enum EYouTubePlayerState {
  "BUFFERING" = 3,
  "CUED" = 5,
  "ENDED" = 0,
  "PAUSED" = 2,
  "PLAYING" = 1,
  "UNSTARTED" = -1,
}
