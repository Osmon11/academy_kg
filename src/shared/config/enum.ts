export enum ELanguage {
  "RU" = "RU",
  "KG" = "KG",
}

export enum ERoute {
  "main" = "/",
  "aboutUs" = "/about-us",
  "supportUs" = "/support-us",
  "webinars" = "/webinars",
  "signIn" = "/authorization/login",
  "signUp" = "/authorization/registration",
  "accaunt" = "/personal-accaunt/main",
  "profile" = "/personal-accaunt/profile",
  "progress" = "/personal-accaunt/progress",
  "courses" = "/courses",
  "[course]" = "/courses/[course]",
  "study" = "/courses/[course]/study",
  "exam" = "/courses/[course]/exam/[level]",
  "searchCourses" = "/courses/search",
}

export enum EYouTubePlayerState {
  "BUFFERING" = 3,
  "CUED" = 5,
  "ENDED" = 0,
  "PAUSED" = 2,
  "PLAYING" = 1,
  "UNSTARTED" = -1,
}
