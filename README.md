# Formethica - Intelligent Form Builder

A modern, AI-powered forms application built with Next.js 15, Supabase, and Google Gemini AI. Create beautiful forms with intelligent field suggestions, manage submissions with advanced analytics, and share with automatic link shortening.

## ✨ Features

### 🎯 Core Features
- **AI-Powered Form Creation**: Get intelligent field suggestions using Google Gemini AI
- **Interactive Chatbot**: Built-in AI assistant to help with form building
- **User Authentication**: Secure user accounts with profile management
- **Form Builder**: Intuitive drag-and-drop interface with real-time preview
- **Response Management**: Advanced submission viewing with filtering and search
- **Link Shortening**: Automatic short URLs with click analytics
- **Data Export**: Export submissions to Excel (.xlsx) and CSV formats
- **Real-time Updates**: Live form updates powered by Supabase

### 🤖 AI Integration
- **Smart Field Suggestions**: AI analyzes your form context and suggests relevant fields
- **Intelligent Chatbot**: Get help with form creation, field types, and best practices
- **Context-Aware Assistance**: AI understands your form's purpose and provides targeted help
- **Powered by Gemini 1.5 Flash**: Latest Google AI model for fast, accurate responses

### 📝 Field Types Supported
- Text input with validation
- Email input with format checking
- Number input with min/max constraints
- Textarea for long-form responses
- Select dropdown with custom options
- Radio buttons for single selection
- Checkboxes for multiple selection
- Required field validation

### 🎨 Modern UI/UX
- **Dark Theme**: Beautiful glassmorphism design with emerald/orange accents
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Floating Navigation**: Clean, modern navigation that adapts to user state
- **Smooth Animations**: Polished interactions and transitions
- **Accessibility**: WCAG compliant with proper contrast and keyboard navigation

### 🔗 Advanced Link Management
- Automatic short URL generation (e.g., `/s/abc123`)
- Click tracking and analytics
- Custom domain support ready
- QR code generation for easy sharing
- Link expiration and access controls

### 👤 User Management
- **Anonymous Access**: Create forms without signing up
- **User Accounts**: Save and manage your forms with authentication
- **Profile Management**: Update user information and preferences
- **Random Username Generation**: Automatic unique usernames for new users
- **Form Ownership**: User-specific form management and permissions

## Getting Started

### Prerequisites
- Node.js 18+
- A Supabase account and project

### 1. Clone and Install

```bash
git clone <your-repo>
cd formethica
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. In the SQL Editor, run the schema from `supabase-schema.sql`
4. Enable Row Level Security (RLS) on all tables
5. Set up authentication providers if needed

#### Auth URLs and Email templates

- In Supabase Dashboard → Authentication → URL Configuration:
  - Site URL: set to your `NEXT_PUBLIC_APP_URL` (for local: `http://localhost:3000`)
  - Redirect URLs: add `http://localhost:3000/auth/callback` and your production `https://yourdomain.com/auth/callback`
- In Supabase Dashboard → Authentication → Email Templates, you can use the HTML templates provided in `supabase/templates/`:
  - `supabase/templates/confirm-account.html`
  - `supabase/templates/reset-password.html`

Both templates use the Supabase variables like `{{ .Email }}`, `{{ .ActionURL }}`, and `{{ .SiteURL }}`. Paste the content into the respective template editors in Supabase. The call-to-action automatically points to your configured redirect URL.

### 3. Set up Google Gemini AI

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create an API key for Gemini
3. Add the API key to your environment variables

### 4. Set up Web3Forms (for contact form)

1. Go to [Web3Forms](https://web3forms.com/)
2. Sign up for a free account
3. Get your access key from the dashboard
4. Add the access key to your environment variables

### 5. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App URL used by Supabase Auth email links
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Web3Forms (for contact form)
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key

# App Configuration
NEXTAUTH_SECRET=your_random_secret_key

# Optional: Custom domain for short URLs
NEXT_PUBLIC_SHORT_DOMAIN=yourdomain.com
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🚀 Usage Guide

### Getting Started

1. **Landing Page**: Visit the homepage to see featured forms and get started
2. **Sign Up/Login**: Create an account or use anonymous mode
3. **Dashboard**: Access your forms and create new ones

### Creating Forms with AI

1. **Start Creating**: Click "Create New Form" from the dashboard
2. **AI Assistance**: Use the floating chatbot for help and suggestions
3. **Smart Suggestions**: Click "Get AI Suggestions" for intelligent field recommendations
4. **Form Building**:
   - Add a compelling title and description
   - Use the field builder to add various input types
   - Configure validation rules and options
   - Preview your form in real-time
5. **Publish**: Save and get your shareable links instantly

### AI-Powered Features

#### Chatbot Assistant
- **Always Available**: Floating chat button in bottom-right corner
- **Context-Aware**: Understands what you're working on
- **Form Help**: Get suggestions for field types, validation, and best practices
- **Technical Support**: Ask questions about features and functionality

#### Smart Field Suggestions
- **Contextual Analysis**: AI analyzes your form title and existing fields
- **Relevant Suggestions**: Get field recommendations that make sense
- **One-Click Addition**: Add suggested fields with a single click
- **Continuous Learning**: Suggestions improve as you build your form

### Sharing and Distribution

Each form automatically gets:
- **Full URL**: `https://yourapp.com/form/[form-id]`
- **Short URL**: `https://yourapp.com/s/[short-code]`
- **QR Code**: Generate QR codes for offline sharing
- **Embed Code**: Embed forms in websites (coming soon)

### Advanced Submission Management

1. **View Submissions**: Access from form edit page or dashboard
2. **Advanced Filtering**: Filter by date, response content, or user
3. **Individual Review**: Click any submission to view detailed responses
4. **Bulk Actions**: Select multiple submissions for batch operations
5. **Export Options**:
   - **Excel (.xlsx)**: Full formatting with charts and analysis
   - **CSV**: Simple format for data processing
   - **JSON**: Raw data for developers

### Form Management Features

- **Edit Anytime**: Modify forms without losing existing submissions
- **Version Control**: Track changes and revert if needed
- **Access Control**: Set forms as public, private, or password-protected
- **Analytics Dashboard**: View submission trends and response rates
- **Duplicate Forms**: Clone successful forms as templates
- **Archive/Delete**: Organize your form library

### User Profile & Settings

- **Profile Management**: Update name, email, and preferences
- **Form Organization**: Organize forms into folders and categories
- **Notification Settings**: Configure email alerts for new submissions
- **API Access**: Generate API keys for custom integrations
- **Export Data**: Download all your forms and submissions

## 🏗️ Technical Architecture

### Database Schema

The application uses a robust PostgreSQL schema with three main tables:

#### `forms` Table
```sql
- id (uuid, primary key)
- title (text)
- description (text, optional)
- fields (jsonb) - Dynamic form field definitions
- is_active (boolean) - Form availability status
- created_at (timestamp)
- updated_at (timestamp)
- user_id (uuid, optional) - Links to authenticated users
```

#### `form_submissions` Table
```sql
- id (uuid, primary key)
- form_id (uuid, foreign key)
- responses (jsonb) - User responses in key-value format
- submitted_at (timestamp)
- ip_address (inet, optional) - For analytics
- user_agent (text, optional) - Browser information
```

#### `short_urls` Table
```sql
- id (uuid, primary key)
- form_id (uuid, foreign key)
- short_code (text, unique) - The short identifier
- clicks (integer, default 0) - Click tracking
- created_at (timestamp)
```

### Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with custom glassmorphism theme
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Supabase Auth with anonymous support
- **AI Integration**: Google Gemini 1.5 Flash API
- **State Management**: React Context + Hooks
- **Type Safety**: TypeScript with strict mode
- **Deployment**: Vercel-optimized with edge functions

### Key Libraries

```json
{
  "@supabase/supabase-js": "^2.39.0",
  "@google/generative-ai": "^0.1.3",
  "@radix-ui/react-*": "Latest", // UI components
  "lucide-react": "^0.263.1", // Icons
  "xlsx": "^0.18.5" // Excel export
}
```

## 🛠️ Customization Guide

### Styling & Theming

The app uses a custom dark theme with glassmorphism effects:

```css
/* Key CSS Variables in globals.css */
:root {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 142.1 76.2% 36.3%; /* Emerald */
  --secondary: 217.2 32.6% 17.5%; /* Dark blue */
}
```

**Customization Options**:
- Modify color scheme in `app/globals.css`
- Update glassmorphism effects in component styles
- Change typography in Tailwind config
- Add custom animations and transitions

### Adding New Field Types

1. **Update Type Definitions** (`lib/types.ts`):
```typescript
export interface FormField {
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'your-new-type';
  // ... other properties
}
```

2. **Add Rendering Logic** (`app/form/[id]/page.tsx`):
```typescript
case 'your-new-type':
  return <YourCustomFieldComponent key={field.id} field={field} />;
```

3. **Update Form Builder** (`app/create/page.tsx`):
```typescript
const fieldTypes = [
  // ... existing types
  { value: 'your-new-type', label: 'Your New Type' }
];
```

### AI Customization

**Modify AI Prompts** (`lib/gemini.ts`):
```typescript
const FIELD_SUGGESTION_PROMPT = `
  Your custom prompt for field suggestions...
`;

const CHATBOT_SYSTEM_PROMPT = `
  Your custom chatbot personality and instructions...
`;
```

**Add New AI Features**:
- Form validation suggestions
- Content optimization
- Accessibility recommendations
- Multi-language support

### Authentication Extensions

The app supports both anonymous and authenticated users:

**Anonymous Mode**:
- Forms stored without user association
- Limited to session-based access
- Perfect for quick form creation

**Authenticated Mode**:
- Full user profiles with random username generation
- Persistent form ownership
- Advanced analytics and management

**Adding OAuth Providers**:
```typescript
// In Supabase dashboard, enable providers like:
// - Google
// - GitHub
// - Discord
// - Apple
```

## 🚀 Deployment Guide

### Vercel (Recommended)

1. **Prepare Repository**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Add all environment variables from `.env.local`
   - Deploy with automatic builds on push

3. **Post-Deployment**:
   - Update `NEXT_PUBLIC_APP_URL` to your production domain
   - Test all features including AI and database connections
   - Set up custom domain if desired
   - In Supabase → Authentication → URL Configuration, update Site URL and Redirect URLs to your production domain

## Supabase Email Templates

This repo includes ready-to-use Supabase Auth email templates in `supabase/templates/`:

- `confirm-account.html`: Sent on sign-up to confirm the user's email
- `reset-password.html`: Sent when a user requests a password reset

How to use:

1. Open Supabase Dashboard → Authentication → Email Templates
2. Select the corresponding template type
3. Paste the HTML from the file into the editor
4. Save and send yourself a test email

Notes:

- The templates reference `{{ .ActionURL }}` which Supabase injects with the appropriate link.
- Ensure your Site URL and Redirect URLs are configured to include `/auth/callback`. This route is implemented in `app/auth/callback/route.ts` and exchanges the auth code for a session.

### Alternative Platforms

**Netlify**:
```bash
npm run build
# Deploy the .next folder
```

**Railway**:
```bash
railway login
railway init
railway up
```

**DigitalOcean App Platform**:
- Connect GitHub repository
- Configure build settings for Next.js
- Add environment variables

### Production Checklist

- [ ] All environment variables configured
- [ ] Supabase RLS policies tested
- [ ] AI API limits and billing configured
- [ ] Custom domain SSL certificate
- [ ] Analytics and monitoring setup
- [ ] Backup strategy for database
- [ ] Error tracking (Sentry recommended)

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

1. **Fork & Clone**:
   ```bash
   git clone https://github.com/yourusername/formethica.git
   cd formethica
   npm install
   ```

2. **Create Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Development Guidelines**:
   - Follow TypeScript strict mode
   - Use Tailwind for all styling
   - Write meaningful commit messages
   - Test on multiple devices/browsers
   - Update documentation for new features

4. **Testing**:
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

### Contribution Areas

- **AI Enhancements**: Improve field suggestions and chatbot responses
- **New Field Types**: Add specialized input types (date, file upload, etc.)
- **UI/UX**: Enhance the design and user experience
- **Performance**: Optimize loading times and responsiveness
- **Accessibility**: Improve WCAG compliance
- **Internationalization**: Add multi-language support
- **Analytics**: Enhanced form and submission analytics
- **Integrations**: Connect with popular tools (Zapier, Slack, etc.)

## 📊 Performance & Analytics

### Built-in Analytics
- Form view counts
- Submission rates
- Response time tracking
- User engagement metrics
- Popular field types analysis

### Performance Optimizations
- **Next.js 15**: Latest performance improvements
- **Edge Functions**: Fast global response times
- **Image Optimization**: Automatic WebP conversion
- **Code Splitting**: Lazy loading for optimal bundle size
- **Caching Strategy**: Intelligent caching for forms and submissions

### Monitoring Recommendations
- **Vercel Analytics**: Built-in performance monitoring
- **Supabase Metrics**: Database performance tracking
- **Google Analytics**: User behavior insights
- **Sentry**: Error tracking and performance monitoring

## 🔒 Security & Privacy

### Security Features
- **Row Level Security**: Database-level access control
- **Input Validation**: Client and server-side validation
- **Rate Limiting**: API protection against abuse
- **CSRF Protection**: Built-in Next.js security
- **Secure Headers**: Comprehensive security headers

### Privacy Compliance
- **GDPR Ready**: User data export and deletion
- **Anonymous Mode**: No personal data collection required
- **Data Encryption**: All data encrypted at rest and in transit
- **Audit Logs**: Track all data access and modifications

## 📚 API Documentation

### REST Endpoints

```typescript
// Get form by ID
GET /api/forms/[id]

// Create new form
POST /api/forms
Body: { title, description, fields }

// Submit form response
POST /api/forms/[id]/submit
Body: { responses }

// Get form submissions
GET /api/forms/[id]/submissions

// AI field suggestions
POST /api/ai/suggest-fields
Body: { title, description, existingFields }
```

### Webhook Support

```typescript
// Configure webhooks for form submissions
POST /api/webhooks/configure
Body: {
  formId,
  webhookUrl,
  events: ['submission.created', 'form.updated']
}
```

## 🆘 Troubleshooting

### Common Issues

**AI Not Working**:
- Check `GEMINI_API_KEY` in environment variables
- Verify API quota and billing in Google AI Studio
- Check network connectivity and firewall settings

**Database Connection Issues**:
- Verify Supabase URL and keys
- Check RLS policies are properly configured
- Ensure databasesed (free tier)

**Styling Issues**:
- Clear browser cache and hard refresh
- Check Tailwind CSS configuration
- Verify all CSS imports are correct

**Form Submissions Not Saving**:
- Check browser console for JavaScript errors
- Verify form validation is passing
- Check Supabase logs for database errors

### Getting Help

1. **Documentation**: Check this README and inline code comments
2. **GitHub Issues**: Search existing issues or create a new one
3. **Community**: Join our Discord server for real-time help
4. **Professional Support**: Contact us for enterprise support options

## 📄 License

Apache License 2.0 - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Supabase**: For the incredible backend-as-a-service platform
- **Google AI**: For the powerful Gemini AI models
- **Tailwind CSS**: For the utility-first CSS framework
- **Radix UI**: For accessible, unstyled UI components
- **Lucide**: For the beautiful icon library

---

**Built with ❤️ by developers, for developers**

*Formethica - Where intelligent form building meets beautiful design*
