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
  "courses" = "/personal-accaunt/courses",
  "[course]" = "/personal-accaunt/course/[course]",
  "study" = "/personal-accaunt/course/[course]/study",
  "exam" = "/personal-accaunt/course/[course]/[exam]/[level]",
  "searchCourses" = "/personal-accaunt/courses/search",
}

export enum EYouTubePlayerState {
  "BUFFERING" = 3,
  "CUED" = 5,
  "ENDED" = 0,
  "PAUSED" = 2,
  "PLAYING" = 1,
  "UNSTARTED" = -1,
}
