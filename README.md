# QR Code Dashboard

A modern, responsive QR code management dashboard built with Next.js 16, Supabase, and Tailwind CSS.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

*   **User Authentication:** Secure login integration (currently configured for Kakao via Supabase Auth).
*   **Dashboard:** Intuitive interface to view, create, edit, and delete personal QR codes.
*   **Real-time Storage:** specific user data persistence using Supabase Database with Row Level Security (RLS).
*   **Responsive UI:** Polished mobile-first design using [shadcn/ui](https://ui.shadcn.com/) components and Tailwind CSS v4.
*   **Dynamic QR Generation:** Instant QR code rendering for any URL.

## 🛠 Tech Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Lucide Icons)
*   **Backend & Auth:** [Supabase](https://supabase.com/)
*   **State Management:** Custom React hooks with `useSyncExternalStore`

## 🏁 Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   [pnpm](https://pnpm.io/) (v9 or higher)
*   A [Supabase](https://supabase.com/) account and project

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory and add your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

### Database Setup

1.  Go to your Supabase project dashboard.
2.  Navigate to the **SQL Editor**.
3.  Copy the contents of `supabase/schema.sql` from this repository and run it. This script will:
    *   Enable the `uuid-ossp` extension.
    *   Create the `qr_codes` table.
    *   Enable Row Level Security (RLS).
    *   Set up secure access policies (CRUD operations limited to the data owner).

### Running the Application

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📂 Project Structure

```
├── app/                  # Next.js App Router pages and layouts
├── components/           # React components (UI and Feature-specific)
│   ├── ui/               # Reusable shadcn/ui components
│   └── ...               # Feature components (Dashboard, QR Card, etc.)
├── lib/                  # Utilities, Supabase client, and Stores
├── supabase/             # Database schema and SQL scripts
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
