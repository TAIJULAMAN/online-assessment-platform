# Online Assessment Platform 🚀

A high-performance, premium recruitment and assessment platform designed for employers to create, manage, and monitor online tests. 


## Key Features

### Employer Dashboard
- **Centralized Test Management**: View and track all published and draft online tests.
- **Candidate Overview**: At-a-glance metrics for total applicants, question sets, and exam slots.
- **Advanced Search & Filtering**: Quickly find tests by title or status.

### Seamless Test Creation & Editing
- **Multi-Step Flow**: Intuitive stepper-based interface (Basic Info -> Question Sets).
- **Draft Persistence**: Auto-saves your progress in a Redux-managed draft state.
- **Dynamic Routing**: URL-based step persistence (`?step=1`) ensures you never lose your place.

### High-Fidelity Question Builder
- **Universal Form**: A single, powerful `QuestionForm` for creating MCQ, Checkbox, and Text-based questions.
- **Visual Feedback**: Real-time preview of question cards with green checkmark indicators for correct answers.
- **Massive Flexibility**: Easily add, edit, or remove questions with professional-grade UI transitions.

### Candidate Monitoring
- **Performance Analytics**: Visualized test scores with color-coded progress bars (High/Medium/Low).
- **Status Pills**: Vibrant badges for tracking candidates (Shortlisted, Rejected, Pending).
- **Detailed Metadata**: Track candidate IDs, application categories, and test dates.

## Tech Stack

- **Core**: [Next.js 16 (App Router)](https://nextjs.org/), [React 19](https://react.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.stevenly.me/)


## Project Structure

```text
├── app/
│   ├── employer/           # Employer-specific views & logic
│   │   ├── create-test/    # Test creation flow (Step 1 & 2)
│   │   ├── edit-test/      # Editing existing tests
│   │   ├── candidates/     # Candidate monitoring & metrics
│   │   └── dashboard/      # Main employer overview
│   └── layout.tsx          # Global layout wrapper
├── components/
│   ├── layout/             # Header, Footer, Sidebar
│   └── ui/                 # Shadcn & custom UI components
├── store/
│   ├── slices/             # Redux state (Auth, Tests, Exam)
│   └── hooks.ts            # Typed Redux hooks
└── lib/                    # Shared utility functions
```

## Future Roadmap

- [ ] **Candidate-Side Portal**: Interactive test-taking environment with full-screen proctoring.
- [ ] **AI-Powered Analysis**: Automated scoring and behavioral analytics (tab-switching detection).
- [ ] **Robust Reporting**: Detailed PDF export for candidate performance reports.
- [ ] **Email Notifications**: Automated invites and result sharing for candidates.

## License

This project is private and intended for use by Akij Resource. Unauthorized copying or distribution is prohibited.

---
Built with ❤️ by Aman.
