# CareConnect — Clinic Appointment & Patient Services App

A mobile-first Progressive Web App (PWA) created as a student prototype for the **E-Business Management – Assignment 2**. It demonstrates clinic service discovery, appointment booking, simulated payment selection, booking history, a local profile and feedback.

## Features
- Searchable service catalogue with sample prices and durations
- Appointment request form with date, time and payment-option selection
- Booking confirmation and appointment history
- Cancel a demo booking
- Patient display profile saved locally
- Feedback form
- Responsive phone-friendly layout
- PWA manifest and service worker for installability/offline caching

## Run locally
1. Download or clone this repository.
2. Open the folder in Visual Studio Code.
3. Run `index.html` with a local server extension such as Live Server. Alternatively, use Python from the project folder: `python -m http.server 8000`, then open `http://localhost:8000`.
4. Test on a phone by opening the published HTTPS link.

## Publish with GitHub Pages
1. Create a public repository named `careconnect-clinic-app` on GitHub.
2. Upload all project files and folders to the repository root.
3. Open **Settings → Pages**.
4. Under build/deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Wait for the Pages deployment to finish. The URL will usually be `https://YOUR-USERNAME.github.io/careconnect-clinic-app/`.
6. Replace the placeholder in your assignment report with the actual published URL.

## APK packaging
This is a PWA/web app, not a prebuilt APK. Publish it over HTTPS first. Then use a compatible PWA-to-Android packaging service/tool (for example, PWABuilder) to create an Android package, following that tool's current signing and packaging instructions. Install and test the resulting APK on an Android phone before submission.

## Important demo limitations
- This is a demonstration, not a real clinic or medical service.
- Service names, fees and bookings are sample data.
- Booking/profile/feedback information is stored in the browser's local storage on the current device; it is not sent to a server.
- Payment choices are simulated. No payment is collected.
- Do not enter real patient medical information.
- This prototype does not provide medical advice or emergency support.

## Suggested test cases
1. Search for “dental” and verify the catalogue filters.
2. Try submitting the booking form empty; required fields should prevent submission.
3. Submit a complete demo booking and verify it appears under My appointments.
4. Cancel a booking and verify it disappears.
5. Save a profile and verify the name/email prefill the booking form.
6. Submit feedback and verify a confirmation message appears.
7. Check the layout on both a desktop browser and a phone-sized screen.

## Assignment evidence to add
- Screenshots of Home, Services, Booking, My Appointments, Profile and Feedback.
- Feedback from three real testers and the improvements made based on their comments.
- Your own business research/interview or survey findings.
- Completed assignment top sheet and plagiarism declaration.
