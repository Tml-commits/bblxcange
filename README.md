# Wizcoin 🚀

**Your gateway to secure, code-driven trades and real earning potential.**

Wizcoin is a modern, full-stack cryptocurrency trading platform built with Next.js 15, TypeScript, and Tailwind CSS. It features a comprehensive user dashboard, admin panel, and real-time trading capabilities.

## 🌟 Features

### User Features

- **🏠 Landing Page**: Modern, responsive homepage with market data
- **👤 User Authentication**: Secure login/signup with KYC verification
- **📊 Trading Dashboard**: Real-time market data and trading interface
- **💰 Wallet Management**: Deposit, withdraw, and transfer funds
- **📈 Spot & Futures Trading**: Complete trading functionality
- **🔄 P2P Transfers**: User-to-user money transfers
- **👥 Referral System**: Earn rewards through referrals
- **📱 Mobile Responsive**: Optimized for all devices

### Admin Features

- **🛡️ Secure Admin Panel**: Protected admin dashboard
- **👥 User Management**: View and manage all users
- **✅ KYC Verification**: Approve/reject user verifications
- **💳 VIP Management**: Manage VIP tiers and benefits
- **💰 Wallet Management**: View and modify user balances
- **🏦 Deposit/Withdrawal Control**: Approve/reject transactions
- **📊 Analytics & Reports**: Comprehensive platform statistics
- **🎯 Trading Codes**: Manage spot and futures trading codes
- **🏪 Mass Operations**: Bulk deposit/withdrawal operations
- **📍 Wallet Addresses**: Manage custom deposit addresses
- **💬 Support Chat**: Handle user support requests

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Lucide React Icons
- **Animations**: Framer Motion
- **Charts**: Recharts, Lightweight Charts
- **HTTP Client**: Axios
- **Database**: Supabase (PostgreSQL)
- **Notifications**: Sonner (Toast notifications)
- **QR Codes**: qrcode.react

## 📁 Project Structure

```
Wizcoin-tradex/
├── public/                     # Static assets
│   └── assets/                # Images, icons, logos
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Authentication pages
│   │   │   ├── signin/       # Sign in page
│   │   │   ├── signup/       # Sign up page
│   │   │   ├── kyc/          # KYC verification
│   │   │   └── forgot-password/
│   │   ├── dashboard/        # User dashboard
│   │   │   ├── assets/       # Asset management
│   │   │   ├── deposit/      # Deposit functionality
│   │   │   ├── withdraw/     # Withdrawal functionality
│   │   │   ├── spot/         # Spot trading
│   │   │   ├── futures/      # Futures trading
│   │   │   ├── market/       # Market data
│   │   │   ├── transfer/     # P2P transfers
│   │   │   └── referrals/    # Referral system
│   │   ├── admin-secure-qte-nex-secured_000/  # Admin panel
│   │   │   ├── users/        # User management
│   │   │   ├── kyc/          # KYC management
│   │   │   ├── vip/          # VIP management
│   │   │   ├── wallets/      # Wallet management
│   │   │   ├── wallet-addresses/  # Address management
│   │   │   ├── transfers/    # Transfer management
│   │   │   ├── mass-operations/   # Bulk operations
│   │   │   ├── spot-codes/   # Spot trading codes
│   │   │   ├── futures-codes/     # Futures codes
│   │   │   └── support/      # Support chat
│   │   └── code/             # Trading code redemption
│   ├── components/           # Reusable components
│   │   ├── home/            # Landing page components
│   │   ├── shared/          # Shared components
│   │   └── ui/              # UI components
│   ├── services/            # API services
│   │   ├── auth/           # Authentication services
│   │   ├── admin/          # Admin API calls
│   │   ├── trading/        # Trading services
│   │   ├── ccpayment/      # Payment services
│   │   └── profile/        # User profile services
│   ├── context/            # React contexts
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilities and configs
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Helper functions
├── supabase-schema.sql     # Database schema
└── package.json            # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Wizcoin-tradex
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_API_BASE_URL=your_api_base_url
   ```

4. **Set up the database**

   ```bash
   # Run the SQL schema in your Supabase project
   # Import supabase-schema.sql into your Supabase database
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Accessing Admin Features

### Admin Panel Access

The admin panel is located at a secure, obfuscated URL for security:

```
http://localhost:3000/admin-secure-qte-nex-secured_000
```

### Admin Authentication

1. **Admin Login Page**

   ```
   http://localhost:3000/admin-login
   ```

2. **Admin Credentials**
   - Use admin credentials configured in your backend
   - Admin users must have `isAdmin: true` in the database

### Admin Features Overview

Once logged in as an admin, you can access:

- **Dashboard** (`/admin-secure-qte-nex-secured_000`)
  - Platform overview and statistics
- **User Management** (`/admin-secure-qte-nex-secured_000/users`)

  - View all users
  - Manage user accounts
  - Update user information

- **KYC Management** (`/admin-secure-qte-nex-secured_000/kyc`)

  - Review KYC submissions
  - Approve/reject verifications
  - View uploaded documents

- **VIP Management** (`/admin-secure-qte-nex-secured_000/vip`)

  - Create and manage VIP tiers
  - Assign users to VIP levels
  - Configure VIP benefits

- **Wallet Management** (`/admin-secure-qte-nex-secured_000/wallets`)

  - View user balances
  - Adjust account balances
  - Transaction history

- **Wallet Addresses** (`/admin-secure-qte-nex-secured_000/wallet-addresses`)

  - Manage custom deposit addresses
  - Add addresses for TRC20/ERC20 networks
  - Delete addresses as needed

- **Transfer Management** (`/admin-secure-qte-nex-secured_000/transfers`)

  - Monitor P2P transfers
  - Transaction oversight

- **Mass Operations** (`/admin-secure-qte-nex-secured_000/mass-operations`)

  - Bulk deposit operations
  - Mass withdrawal processing

- **Trading Codes**

  - Spot Codes (`/admin-secure-qte-nex-secured_000/spot-codes`)
  - Futures Codes (`/admin-secure-qte-nex-secured_000/futures-codes`)

- **Support Chat** (`/admin-secure-qte-nex-secured_000/support`)
  - Handle user support requests
  - Live chat management

## 📱 User Features

### Authentication

- **Sign Up**: `/signup` - Create new account
- **Sign In**: `/signin` - User login
- **KYC**: `/kyc` - Identity verification

### Dashboard

- **Main Dashboard**: `/dashboard` - Overview and quick actions
- **Assets**: `/dashboard/assets` - Portfolio management
- **Deposit**: `/dashboard/deposit` - Add funds with multiple address support
- **Withdraw**: `/dashboard/withdraw` - Withdraw funds
- **Spot Trading**: `/dashboard/spot` - Spot market trading
- **Futures Trading**: `/dashboard/futures` - Futures trading
- **Market Data**: `/dashboard/market` - Real-time market information
- **Transfers**: `/dashboard/transfer` - P2P transfers
- **Referrals**: `/dashboard/referrals` - Referral program

### Trading Code Redemption

- **Code Redemption**: `/code` - Redeem trading codes

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🔧 Configuration

### Environment Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Configuration
NEXT_PUBLIC_API_BASE_URL=your_backend_api_url

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Setup

1. Create a Supabase project
2. Import the provided SQL schema (`supabase-schema.sql`)
3. Configure Row Level Security (RLS) policies
4. Set up authentication providers

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support and questions:

- Check the `TROUBLESHOOTING.md` file
- Review the `CHAT_SETUP.md` for development setup
- Contact the development team

---

**Built with ❤️ by the Wizcoin Team**
