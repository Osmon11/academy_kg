<p align="center">
    <img width="100" height="100" src="https://ilimnuru-kg-front.vercel.app/favicon-96x96.png" alt="logo" style="border-radius: 8px">
</p>

<h1 align="center">Online Academy</h1>

A full-featured online learning platform that allows users to browse courses, watch video lessons, complete quizzes, and track their progress. Built with modern web technologies to provide a smooth and engaging learning experience for students and an easy-to-use course management system for instructors.

## Demo

https://ilimnuru-kg-front.vercel.app/

## Features

<details>

<summary>Google authentication</summary>

<img src="/doc/media/screenshots/google-auth.png" style="border-radius: 8px" />

</details>

<details>

<summary>Email & password sign in</summary>

<img src="/doc/media/screenshots/email&password-sign-in.png" style="border-radius: 8px" />

</details>

<details>

<summary>Sign up, confirm email and reset your password</summary>

<img src="/doc/media/screenshots/sign-up.png" style="border-radius: 8px" />
<img src="/doc/media/screenshots/password-reset_request-code.png" style="border-radius: 8px" />
<img src="/doc/media/screenshots/reset-password_new-password.png" style="border-radius: 8px" />

</details>

<details>

<summary>Edit profile</summary>

<img src="/doc/media/screenshots/edit-profile.png" style="border-radius: 8px" />

</details>

<details>

<summary>YouTube video player</summary>

<img src="/doc/media/screenshots/YT-player-1.png" style="border-radius: 8px" />
<img src="/doc/media/screenshots/YT-player-2.png" style="border-radius: 8px" />
<img src="/doc/media/screenshots/YT-player-3.png" style="border-radius: 8px" />
<img src="/doc/media/screenshots/YT-player-4.png" style="border-radius: 8px" />

</details>

<details>

<summary>Quizzes</summary>

<img src="/doc/media/screenshots/quizz-1.png" style="border-radius: 8px" />
<img src="/doc/media/screenshots/quizz-2.png" style="border-radius: 8px" />

</details>

<details>

<summary>Progress tracking</summary>

<img src="/doc/media/screenshots/progress-tracking.png" style="border-radius: 8px" />

</details>

<details>

<summary>Level system</summary>

<img src="/doc/media/screenshots/level-system-1.png" style="border-radius: 8px" />
<img src="/doc/media/screenshots/level-system-2.png" style="border-radius: 8px" />

</details>

<details>

<summary>Registration for upcoming webinars and access to past recordings</summary>

<img src="/doc/media/screenshots/webinars-1.png" style="border-radius: 8px" />
<img src="/doc/media/screenshots/webinars-2.png" style="border-radius: 8px" />

</details>

<details>

<summary>Localization(KG/RU)</summary>

<img src="/doc/media/screenshots/localization.png" style="border-radius: 8px" />

</details>

## Environment Variables

<details>

<summary>To run this project, you will need to add the following environment variables to your .env file:
</summary>

```env
NEXT_PUBLIC_API_BASE_URL
NEXT_PUBLIC_ACCESS_TOKEN_KEY
NEXTAUTH_URL
NEXTAUTH_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
APP_SITE_NAME
APP_TITLE
APP_DESCRIPTION
APP_IMAGE
```

</details>

## Run Locally

Clone using the web URL. Or use a password-protected SSH key.

```bash
  git clone https://github.com/Osmon11/academy_kg.git
```

Install dependencies

```bash
  cd academy_kg
  npm install
```

Start the server

```bash
  npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Usage/Examples

- Install all [recommended extentions](https://github.com/Osmon11/academy_kg/blob/main/.vscode/extensions.json) for VSCode
- Architectural methodology - [Feature-Sliced Design (FSD)](https://github.com/feature-sliced)
- Routing:

```javascript
const router = useAppRouter();
```

## Feedback

If you have any feedback, please reach out to me at [osmonabdimannan@gmail.com](mailto:osmonabdimannan@gmail.com)
