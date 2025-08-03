# NoteVault

A modern, full-featured Note taking app built with Next.js 15, featuring real-time collaboration, document editing, and file management.

## ✨ Features

- **📝 Rich Text Editor** - Powered by BlockNote for advanced document editing
- **👥 Real-time Collaboration** - Live editing with Convex backend
- **🔐 Authentication** - Secure user management with Clerk
- **📁 File Management** - Upload and manage images with EdgeStore
- **🎨 Beautiful UI** - Modern design with Tailwind CSS and Radix UI
- **🌙 Dark/Light Mode** - Theme switching with next-themes
- **📱 Responsive Design** - Works perfectly on all devices
- **🔍 Search Functionality** - Find documents quickly
- **📤 Document Publishing** - Share documents publicly
- **🗑️ Trash Management** - Safe document deletion and recovery

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Convex (real-time database)
- **Authentication**: Clerk
- **File Storage**: EdgeStore
- **Editor**: BlockNote
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: Zustand
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Convex account
- Clerk account
- EdgeStore account (optional)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/matoliya-shubham/NoteVault.git
   cd NoteVault
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Public keys (safe to expose)
   NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key

   # Private keys (keep secret)
   CLERK_SECRET_KEY=sk_test_your_clerk_secret_key
   CONVEX_DEPLOY_KEY=your_convex_deploy_key
   ```

4. **Set up Convex**

   ```bash
   npx convex dev
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

### Public Variables (Client-side)

- `NEXT_PUBLIC_CONVEX_URL` - Your Convex deployment URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk's publishable key

### Private Variables (Server-side only)

- `CLERK_SECRET_KEY` - Clerk's secret key
- `CONVEX_DEPLOY_KEY` - Convex deployment key
- `EDGESTORE_ACCESS_KEY` - EdgeStore access key (optional)
- `EDGESTORE_SECRET_KEY` - EdgeStore secret key (optional)

## 📁 Project Structure

```
notion-clone/
├── app/                    # Next.js app directory
│   ├── (main)/            # Main app routes
│   ├── (marketing)/       # Marketing pages
│   ├── (public)/          # Public document preview
│   └── api/               # API routes
├── components/             # Reusable components
│   ├── ui/                # UI components
│   ├── modals/            # Modal components
│   └── providers/         # Context providers
├── convex/                # Convex backend
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── public/                # Static assets
```

## 🎯 Key Features Explained

### Real-time Collaboration

Documents update in real-time across all connected users using Convex's reactive queries.

### Rich Text Editor

Powered by BlockNote, providing a Notion-like editing experience with:

- Block-based editing
- Markdown support
- Image embedding
- Code blocks
- Tables and lists

### Authentication & Authorization

Secure user management with Clerk:

- Email/password authentication
- Social login options
- User profiles and settings
- Role-based access control

### File Management

Seamless file uploads with EdgeStore:

- Drag & drop interface
- Image optimization
- Secure file storage
- Public/private file access

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `NEXT_PUBLIC_CONVEX_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CONVEX_DEPLOY_KEY`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Convex](https://convex.dev/) - Real-time backend
- [Clerk](https://clerk.com/) - Authentication
- [BlockNote](https://blocknotejs.org/) - Rich text editor
- [EdgeStore](https://edgestore.dev/) - File storage
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI components
