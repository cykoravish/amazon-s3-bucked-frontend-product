# Product Showcase - Frontend

A modern, responsive Next.js application for uploading and displaying products with images stored on Amazon S3 and delivered via CDN.

## Features

- **Product Gallery**: Browse products with beautiful card layouts
- **Image Upload**: Upload product images directly to Amazon S3
- **CDN Delivery**: Fast image loading via CloudFront CDN
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark Theme**: Eye-catching dark emerald theme with glowing effects
- **Real-time Preview**: See image previews before uploading

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Image Optimization**: Next.js Image component
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running (see backend README)
- Environment variables configured

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd product-showcase
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
pnpm install
# or
yarn install
\`\`\`

3. Create a `.env.local` file in the root directory:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_AMAZON_CDN_URL=https://your-cloudfront-url.cloudfront.net
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
# or
pnpm dev
# or
yarn dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Home page - Product gallery
│   ├── create/
│   │   └── page.tsx          # Create product page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   └── ui/                   # shadcn/ui components
├── public/                   # Static assets
└── README.md
\`\`\`

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000` |
| `NEXT_PUBLIC_AMAZON_CDN_URL` | CloudFront CDN URL | `https://d1234.cloudfront.net` |

## Features in Detail

### Product Gallery (Home Page)
- Displays all products in a responsive grid
- Hover effects with smooth animations
- Optimized image loading with Next.js Image
- Price display and product details
- "Create Product" button for easy navigation

### Create Product Page
- Form with product name, description, and price
- Drag-and-drop or click-to-upload image functionality
- Real-time image preview
- Direct upload to S3 using presigned URLs
- Loading states and error handling
- Responsive design with glowing emerald accents

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

\`\`\`bash
vercel --prod
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.
